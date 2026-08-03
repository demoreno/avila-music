-- A purchase order in status 'pendiente' is just a planning draft — nothing has
-- actually been placed with the supplier yet. It must NOT reduce suggested_order_qty
-- or remove the product from restock alerts. Only 'en_proceso', 'procesado', and
-- 'en_camino' represent a real commitment with the supplier and should count as
-- already covering the need. 'pendiente' units are still surfaced separately
-- (draft_pending_units) so the owner can see a draft already exists.

DROP VIEW IF EXISTS v_reorder_intelligence;

CREATE OR REPLACE VIEW v_reorder_intelligence AS
WITH config AS (
  SELECT
    (SELECT value::numeric FROM app_config WHERE key = 'lead_time_months')      AS lead_time,
    (SELECT value::numeric FROM app_config WHERE key = 'safety_stock_months')   AS safety_stock,
    (SELECT value::numeric FROM app_config WHERE key = 'target_stock_months')   AS target_months
),
-- Monthly sales per product over last 6 months (enough window for seasonal variation)
monthly_sales AS (
  SELECT
    si.product_id,
    DATE_TRUNC('month', s.sale_date) AS month,
    SUM(si.quantity)                 AS units_sold
  FROM sale_items si
  JOIN sales s ON si.sale_id = s.id
  WHERE s.sale_date >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '6 months'
  GROUP BY si.product_id, DATE_TRUNC('month', s.sale_date)
),
-- Count how many distinct months had ANY sale in the window (to know the active range)
active_months AS (
  SELECT COUNT(DISTINCT month) AS total_months
  FROM monthly_sales
),
velocity AS (
  SELECT
    p.id AS product_id,
    -- Total units sold in the window
    COALESCE(SUM(ms.units_sold), 0) AS units_sold_period,
    -- Number of months the product actually sold (0 = never sold)
    COUNT(DISTINCT ms.month)        AS months_with_sales,
    -- Avg monthly velocity: divide by total active months in the system, not just months this product sold.
    -- This way, a product that sold 2 units in 1 out of 6 months gets 0.33/mo, not 2/mo.
    CASE
      WHEN am.total_months > 0
      THEN ROUND(COALESCE(SUM(ms.units_sold), 0)::numeric / am.total_months, 2)
      ELSE 0
    END AS avg_monthly_velocity
  FROM products p
  CROSS JOIN active_months am
  LEFT JOIN monthly_sales ms ON p.id = ms.product_id
  WHERE p.is_active = true
  GROUP BY p.id, am.total_months
),
-- Units in purchase orders actually being worked with the supplier — genuinely
-- reduce what's still needed.
committed_orders AS (
  SELECT
    poi.product_id,
    COALESCE(SUM(poi.quantity), 0) AS committed_units
  FROM purchase_order_items poi
  JOIN purchase_orders po ON poi.purchase_order_id = po.id
  WHERE po.status IN ('en_proceso', 'procesado', 'en_camino')
  GROUP BY poi.product_id
),
-- Units in 'pendiente' (draft/scheduled) purchase orders — informational only,
-- must NOT reduce suggested_order_qty since nothing has been placed yet.
draft_orders AS (
  SELECT
    poi.product_id,
    COALESCE(SUM(poi.quantity), 0) AS draft_units
  FROM purchase_order_items poi
  JOIN purchase_orders po ON poi.purchase_order_id = po.id
  WHERE po.status = 'pendiente'
  GROUP BY poi.product_id
),
-- Projected stock when the order arrives (stock now - what you'll sell during lead time)
projections AS (
  SELECT
    v.product_id,
    v.avg_monthly_velocity,
    v.units_sold_period,
    v.months_with_sales,
    p.stock_total,
    -- Stock you'll have when the order arrives
    GREATEST(p.stock_total - CEIL(c.lead_time * v.avg_monthly_velocity), 0) AS stock_at_arrival,
    -- How many units you need to have target_months of stock AFTER arrival
    CEIL(c.target_months * v.avg_monthly_velocity) AS target_units
  FROM velocity v
  JOIN products p ON v.product_id = p.id
  CROSS JOIN config c
)
SELECT
  p.id,
  p.name                          AS product_name,
  p.supplier_code,
  sub.name                        AS subcategory_name,
  parent.name                     AS category_name,
  p.stock_total,
  p.stock_minimum,
  p.cost_usd,
  CASE
    WHEN p.stock_total <= 0               THEN 'sin_stock'
    WHEN p.stock_total <= p.stock_minimum THEN 'bajo'
    ELSE 'ok'
  END                             AS stock_status,
  v.units_sold_period,
  v.months_with_sales,
  v.avg_monthly_velocity,
  -- Months of stock remaining at current velocity
  CASE
    WHEN v.avg_monthly_velocity > 0
    THEN ROUND(p.stock_total::numeric / v.avg_monthly_velocity, 1)
    ELSE NULL
  END                             AS months_of_stock,
  -- Reorder point: when you should order (lead_time + safety buffer in units)
  CASE
    WHEN v.avg_monthly_velocity > 0
    THEN CEIL((c.lead_time + c.safety_stock) * v.avg_monthly_velocity)
    ELSE 0
  END                             AS reorder_point,
  COALESCE(co.committed_units, 0) AS pending_in_orders,
  COALESCE(dro.draft_units, 0)    AS draft_pending_units,
  -- Suggested order qty: target_units - projected_stock_at_arrival - committed (NOT draft)
  -- Formula: enough to have target_months of stock AFTER order arrives
  GREATEST(
    CASE
      WHEN v.avg_monthly_velocity > 0
      THEN proj.target_units - proj.stock_at_arrival - COALESCE(co.committed_units, 0)
      ELSE 0
    END,
    0
  )::integer                      AS suggested_order_qty,
  -- Estimated cost for the suggested order
  GREATEST(
    CASE
      WHEN v.avg_monthly_velocity > 0
      THEN proj.target_units - proj.stock_at_arrival - COALESCE(co.committed_units, 0)
      ELSE 0
    END,
    0
  ) * p.cost_usd                  AS suggested_order_cost,
  -- Urgency: how critical is this reorder?
  CASE
    WHEN p.stock_total <= 0 AND v.avg_monthly_velocity > 0
      THEN 'sin_stock_vende'       -- Out of stock but has demand → MOST URGENT
    WHEN v.avg_monthly_velocity > 0
         AND (p.stock_total::numeric / v.avg_monthly_velocity) < c.lead_time
      THEN 'critico'               -- Stock runs out before next order arrives
    WHEN v.avg_monthly_velocity > 0
         AND (p.stock_total::numeric / v.avg_monthly_velocity) < (c.lead_time + c.safety_stock)
      THEN 'pedir_pronto'          -- Stock covers lead time but not safety buffer
    WHEN v.avg_monthly_velocity = 0 AND p.stock_total > 0
      THEN 'sin_movimiento'        -- Has stock but doesn't sell → DON'T reorder
    WHEN v.avg_monthly_velocity = 0 AND p.stock_total = 0
      THEN 'inactivo'              -- No stock, no sales → ignore
    ELSE 'ok'                      -- Enough stock for lead_time + safety
  END                             AS urgency
FROM products p
CROSS JOIN config c
JOIN velocity v             ON p.id = v.product_id
JOIN projections proj       ON p.id = proj.product_id
LEFT JOIN committed_orders co ON p.id = co.product_id
LEFT JOIN draft_orders dro  ON p.id = dro.product_id
LEFT JOIN categories sub    ON p.subcategory_id = sub.id
LEFT JOIN categories parent ON sub.parent_id    = parent.id
WHERE p.is_active = true
ORDER BY
  -- Priority: sin_stock_vende first, then critico, then pedir_pronto, etc.
  CASE
    WHEN p.stock_total <= 0 AND v.avg_monthly_velocity > 0 THEN 1
    WHEN v.avg_monthly_velocity > 0
         AND (p.stock_total::numeric / v.avg_monthly_velocity) < c.lead_time THEN 2
    WHEN v.avg_monthly_velocity > 0
         AND (p.stock_total::numeric / v.avg_monthly_velocity) < (c.lead_time + c.safety_stock) THEN 3
    WHEN v.avg_monthly_velocity = 0 AND p.stock_total = 0 THEN 6
    WHEN v.avg_monthly_velocity = 0 AND p.stock_total > 0 THEN 5
    ELSE 4
  END,
  v.avg_monthly_velocity DESC NULLS LAST;
