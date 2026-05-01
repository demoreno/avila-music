# Avila Music — Database Schema

Supabase project: `thorcnvqeidunltecynr`

---

## Tables

### `categories`

Stores root categories and subcategories using a self-referential hierarchy (2 levels max).

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | auto-generated |
| parent_id | uuid nullable FK → categories.id | NULL = root category |
| name | text NOT NULL | Display name |
| slug | text NOT NULL UNIQUE | URL-safe identifier |
| description | text nullable | Optional description |
| sort_order | int NOT NULL DEFAULT 0 | Display ordering |
| is_active | bool NOT NULL DEFAULT true | Controls storefront visibility |
| created_at | timestamptz | Auto-set on insert |

**Rules:**
- Root categories: `parent_id IS NULL` (e.g. Guitarras, Bajo, Violín & Cuerdas, Batería & Percusión, Electrónica & Cables)
- Subcategories: `parent_id IS NOT NULL` (leaf nodes)
- Products always link to subcategories, never to root categories

---

### `products`

Main product catalog.

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | auto-generated |
| name | text NOT NULL | Product name |
| slug | text NOT NULL UNIQUE | URL-safe identifier |
| subcategory_id | uuid NOT NULL FK → categories.id | Must reference a leaf/subcategory |
| cost_usd | numeric NOT NULL | Current cost (mutable, does not affect past sales) |
| price_usd | numeric NOT NULL | Current sale price (mutable) |
| stock_total | int NOT NULL DEFAULT 0 | Current stock count |
| stock_minimum | int NOT NULL DEFAULT 0 | Minimum stock threshold for alerts |
| notes | text nullable | Product notes/description |
| is_active | bool NOT NULL DEFAULT true | Controls storefront visibility |
| created_at | timestamptz | Auto-set on insert |
| updated_at | timestamptz | Auto-updated via trigger |

---

### `product_images`

Images stored in Supabase Storage bucket `products`.

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | auto-generated |
| product_id | uuid NOT NULL FK → products.id CASCADE DELETE | |
| storage_path | text NOT NULL | Path in storage bucket |
| sort_order | int NOT NULL DEFAULT 0 | Display ordering |
| is_primary | bool NOT NULL DEFAULT false | Primary/featured image |
| created_at | timestamptz | Auto-set on insert |

**Image URL pattern:** `https://thorcnvqeidunltecynr.supabase.co/storage/v1/object/public/products/{product_id}/{filename}`

---

### `sales`

Sale header record (one per transaction).

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | auto-generated |
| sale_date | date NOT NULL | Date of sale |
| channel | text NOT NULL DEFAULT 'mercadolibre' | Sales channel |
| ml_free_shipping | bool NOT NULL DEFAULT false | Whether seller absorbed shipping |
| discount_usd | numeric NOT NULL DEFAULT 0 | Discount applied |
| notes | text nullable | Optional notes |
| ml_commission_rate | numeric NOT NULL | Commission rate at time of sale |
| shipping_cost_usd | numeric NOT NULL DEFAULT 0 | Shipping cost at time of sale |
| created_at | timestamptz | Auto-set on insert |

---

### `sale_items`

Line items per sale. **Critical: `unit_price_usd` and `unit_cost_usd` are frozen write-once fields.**

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | auto-generated |
| sale_id | uuid NOT NULL FK → sales.id | |
| product_id | uuid NOT NULL FK → products.id | |
| unit_price_usd | numeric NOT NULL | **FROZEN** — price at time of sale |
| unit_cost_usd | numeric NOT NULL | **FROZEN** — cost at time of sale |
| quantity | int NOT NULL | Units sold |
| ml_commission_usd | numeric NOT NULL | Commission amount (price × rate) |
| shipping_cost_usd | numeric NOT NULL | Shipping cost (0 if not free shipping) |
| net_income_usd | numeric NOT NULL | price − commission − ship_cost |
| gross_profit_usd | numeric NOT NULL | net_income − cost |
| margin_pct | numeric NOT NULL | gross_profit / price |
| created_at | timestamptz | Auto-set on insert |

> **Never update `unit_price_usd` or `unit_cost_usd`** — these capture historical values and updating them corrupts KPI calculations.

---

### `app_config`

Key-value configuration store.

| Column | Type | Notes |
|---|---|---|
| key | text PK | Configuration key |
| value | text NOT NULL | Configuration value (parse as needed) |
| description | text nullable | Human-readable description |
| updated_at | timestamptz | Auto-updated |

**Keys:**

| Key | Default | Meaning |
|---|---|---|
| `ml_commission_rate` | 0.11 | MercadoLibre commission (11%) |
| `shipping_cost_usd` | 1.30 | Cost absorbed per free-shipping sale |
| `lead_time_months` | 4 | Supplier lead time for reorder planning |
| `safety_stock_months` | 1 | Buffer stock target in months |
| `reinvestment_pct` | 0.70 | Share of net profit to reinvest |
| `personal_salary_pct` | 0.30 | Share of net profit as owner salary |

---

### `inventory_movements`

Audit log of stock changes.

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | auto-generated |
| product_id | uuid NOT NULL FK → products.id | |
| movement_type | text NOT NULL | e.g. 'sale', 'restock', 'adjustment' |
| quantity_delta | int NOT NULL | Positive = added, negative = removed |
| reference_id | uuid nullable | Optional FK to related record |
| notes | text nullable | Optional notes |
| created_at | timestamptz | Auto-set on insert |
| created_by | uuid nullable | Auth user who made the change |

---

### `price_history`

Audit log of price/cost changes.

| Column | Type | Notes |
|---|---|---|
| id | uuid PK | auto-generated |
| product_id | uuid NOT NULL FK → products.id | |
| old_cost_usd | numeric nullable | Previous cost |
| new_cost_usd | numeric nullable | New cost |
| old_price_usd | numeric nullable | Previous price |
| new_price_usd | numeric nullable | New price |
| changed_at | timestamptz | When the change was made |
| changed_by | uuid nullable | Auth user who made the change |

---

## Views

### `v_monthly_kpis`

Aggregated KPIs grouped by month.

| Column | Type |
|---|---|
| month | date |
| total_units_sold | bigint |
| total_sales | bigint |
| gross_revenue_usd | numeric |
| total_ml_commissions_usd | numeric |
| total_shipping_usd | numeric |
| net_income_usd | numeric |
| total_cost_usd | numeric |
| gross_profit_usd | numeric |
| avg_margin_pct | numeric |

---

### `v_product_ranking`

Products ranked by units sold.

| Column | Type |
|---|---|
| id | uuid |
| product_name | text |
| subcategory_name | text |
| category_name | text |
| stock_total | int |
| stock_minimum | int |
| stock_status | text |
| total_units_sold | bigint |
| total_net_income_usd | numeric |
| total_gross_profit_usd | numeric |
| avg_margin_pct | numeric |

---

### `v_category_tree`

Storefront navigation tree.

| Column | Type |
|---|---|
| category_id | uuid |
| category_name | text |
| category_slug | text |
| category_sort_order | int |
| subcategory_id | uuid |
| subcategory_name | text |
| subcategory_slug | text |
| subcategory_sort_order | int |
| product_count | bigint |

---

### `v_sale_items_detail`

Full join of sale_items + sales + products + categories for reporting.

Contains all columns from sale_items, plus sale header fields, product name/slug, subcategory name, and category name.

---

## RLS Policies

All tables use Row Level Security (RLS).

**Admin access (authenticated users):** Full read/write access on all tables via `auth.role() = 'authenticated'`.

**Public storefront (anonymous users):** Read-only access limited to:
- `categories` where `is_active = TRUE`
- `products` where `is_active = TRUE`

All other tables (sales, sale_items, inventory_movements, price_history, app_config) are admin-only — no public read access.
