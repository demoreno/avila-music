-- =============================================
-- 001_initial_schema.sql
-- =============================================

-- CATEGORIES (self-referencing: root = parent_id IS NULL, leaf = subcategory)
CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id   UUID REFERENCES categories(id) ON DELETE RESTRICT,
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order  INTEGER DEFAULT 0,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_name_per_parent UNIQUE (parent_id, name)
);

CREATE INDEX idx_categories_parent_id ON categories(parent_id);

-- PRODUCTS (always reference a subcategory, i.e. categories with parent_id NOT NULL)
CREATE TABLE products (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT NOT NULL,
  slug           TEXT NOT NULL UNIQUE,
  subcategory_id UUID NOT NULL REFERENCES categories(id),
  cost_usd       NUMERIC(10,4) NOT NULL,
  price_usd      NUMERIC(10,4) NOT NULL,
  stock_total    INTEGER NOT NULL DEFAULT 0,
  stock_minimum  INTEGER NOT NULL DEFAULT 0,
  notes          TEXT,
  is_active      BOOLEAN DEFAULT TRUE,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_subcategory_id ON products(subcategory_id);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- PRICE HISTORY (audit log for product price/cost changes)
CREATE TABLE price_history (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id     UUID REFERENCES products(id),
  old_cost_usd   NUMERIC(10,4),
  new_cost_usd   NUMERIC(10,4),
  old_price_usd  NUMERIC(10,4),
  new_price_usd  NUMERIC(10,4),
  changed_at     TIMESTAMPTZ DEFAULT NOW(),
  changed_by     UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_price_history_product_id ON price_history(product_id);
CREATE INDEX idx_price_history_changed_by  ON price_history(changed_by);

-- SALES (one row per transaction)
CREATE TABLE sales (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_date          DATE NOT NULL,
  channel            TEXT NOT NULL DEFAULT 'mercadolibre',
  ml_free_shipping   BOOLEAN DEFAULT TRUE,
  discount_usd       NUMERIC(10,4) DEFAULT 0,
  notes              TEXT,
  ml_commission_rate NUMERIC(6,4) NOT NULL,
  shipping_cost_usd  NUMERIC(10,4) NOT NULL,
  created_at         TIMESTAMPTZ DEFAULT NOW()
);

-- SALE ITEMS — unit_price_usd and unit_cost_usd are frozen snapshots; never update them
CREATE TABLE sale_items (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id           UUID REFERENCES sales(id) ON DELETE CASCADE,
  product_id        UUID REFERENCES products(id),
  unit_price_usd    NUMERIC(10,4) NOT NULL,  -- snapshot at time of sale
  unit_cost_usd     NUMERIC(10,4) NOT NULL,  -- snapshot at time of sale
  quantity          INTEGER NOT NULL DEFAULT 1,
  ml_commission_usd NUMERIC(10,4),
  shipping_cost_usd NUMERIC(10,4),
  net_income_usd    NUMERIC(10,4),
  gross_profit_usd  NUMERIC(10,4),
  margin_pct        NUMERIC(6,4),
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sale_items_sale_id    ON sale_items(sale_id);
CREATE INDEX idx_sale_items_product_id ON sale_items(product_id);

-- INVENTORY MOVEMENTS
CREATE TABLE inventory_movements (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id     UUID REFERENCES products(id),
  movement_type  TEXT NOT NULL CHECK (movement_type IN ('sale', 'purchase', 'adjustment', 'return')),
  quantity_delta INTEGER NOT NULL,
  reference_id   UUID,
  notes          TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  created_by     UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_inventory_movements_product_id  ON inventory_movements(product_id);
CREATE INDEX idx_inventory_movements_created_by  ON inventory_movements(created_by);

-- APP CONFIG (key-value store for business parameters)
CREATE TABLE app_config (
  key         TEXT PRIMARY KEY,
  value       TEXT NOT NULL,
  description TEXT,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- VIEWS
-- =============================================

-- Full sale item detail with category hierarchy
CREATE VIEW v_sale_items_detail AS
SELECT
  si.id,
  s.sale_date,
  DATE_TRUNC('month', s.sale_date) AS sale_month,
  s.channel,
  p.name           AS product_name,
  sub.name         AS subcategory_name,
  parent.name      AS category_name,
  si.quantity,
  si.unit_price_usd,
  si.unit_cost_usd,
  si.net_income_usd,
  si.gross_profit_usd,
  si.margin_pct,
  si.ml_commission_usd,
  si.shipping_cost_usd
FROM sale_items si
JOIN sales s             ON si.sale_id      = s.id
JOIN products p          ON si.product_id   = p.id
LEFT JOIN categories sub    ON p.subcategory_id = sub.id
LEFT JOIN categories parent ON sub.parent_id    = parent.id;

-- Monthly KPIs aggregated
CREATE VIEW v_monthly_kpis AS
SELECT
  DATE_TRUNC('month', s.sale_date)       AS month,
  COUNT(si.id)                            AS total_units_sold,
  COUNT(DISTINCT s.id)                    AS total_sales,
  SUM(si.unit_price_usd * si.quantity)    AS gross_revenue_usd,
  SUM(si.ml_commission_usd)               AS total_ml_commissions_usd,
  SUM(si.shipping_cost_usd)               AS total_shipping_usd,
  SUM(si.net_income_usd * si.quantity)    AS net_income_usd,
  SUM(si.unit_cost_usd * si.quantity)     AS total_cost_usd,
  SUM(si.gross_profit_usd * si.quantity)  AS gross_profit_usd,
  ROUND(AVG(si.margin_pct), 4)            AS avg_margin_pct
FROM sale_items si
JOIN sales s ON si.sale_id = s.id
GROUP BY DATE_TRUNC('month', s.sale_date)
ORDER BY month;

-- Product ranking with sales metrics and stock status
CREATE VIEW v_product_ranking AS
SELECT
  p.id,
  p.name           AS product_name,
  sub.name         AS subcategory_name,
  parent.name      AS category_name,
  p.stock_total,
  p.stock_minimum,
  CASE
    WHEN p.stock_total <= 0               THEN 'sin_stock'
    WHEN p.stock_total <= p.stock_minimum THEN 'bajo'
    ELSE 'ok'
  END                               AS stock_status,
  COUNT(si.id)                      AS total_units_sold,
  SUM(si.net_income_usd)            AS total_net_income_usd,
  SUM(si.gross_profit_usd)          AS total_gross_profit_usd,
  ROUND(AVG(si.margin_pct), 4)      AS avg_margin_pct
FROM products p
LEFT JOIN categories sub    ON p.subcategory_id = sub.id
LEFT JOIN categories parent ON sub.parent_id    = parent.id
LEFT JOIN sale_items si     ON p.id             = si.product_id
GROUP BY p.id, p.name, sub.name, parent.name, p.stock_total, p.stock_minimum
ORDER BY total_units_sold DESC NULLS LAST;

-- Category tree for storefront navigation (5 roots, ~13 subcategories)
CREATE VIEW v_category_tree AS
SELECT
  parent.id           AS category_id,
  parent.name         AS category_name,
  parent.slug         AS category_slug,
  parent.sort_order   AS category_sort_order,
  sub.id              AS subcategory_id,
  sub.name            AS subcategory_name,
  sub.slug            AS subcategory_slug,
  sub.sort_order      AS subcategory_sort_order,
  COUNT(p.id)         AS product_count
FROM categories parent
JOIN categories sub  ON sub.parent_id    = parent.id
LEFT JOIN products p ON p.subcategory_id = sub.id AND p.is_active = TRUE
WHERE parent.parent_id IS NULL
  AND parent.is_active = TRUE
  AND sub.is_active    = TRUE
GROUP BY parent.id, parent.name, parent.slug, parent.sort_order,
         sub.id, sub.name, sub.slug, sub.sort_order
ORDER BY parent.sort_order, sub.sort_order;

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE categories          ENABLE ROW LEVEL SECURITY;
ALTER TABLE products            ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales               ENABLE ROW LEVEL SECURITY;
ALTER TABLE sale_items          ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_config          ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_history       ENABLE ROW LEVEL SECURITY;

-- Authenticated users (admin) have full access
CREATE POLICY "auth_full_access" ON categories          FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_full_access" ON products            FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_full_access" ON sales               FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_full_access" ON sale_items          FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_full_access" ON inventory_movements FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_full_access" ON app_config          FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_full_access" ON price_history       FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Public storefront: read-only access to active records
CREATE POLICY "public_read_categories" ON categories FOR SELECT TO anon USING (is_active = TRUE);
CREATE POLICY "public_read_products"   ON products   FOR SELECT TO anon USING (is_active = TRUE);
