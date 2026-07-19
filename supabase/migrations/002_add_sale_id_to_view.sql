-- Add sale_id to v_sale_items_detail for grouping items by sale
CREATE OR REPLACE VIEW v_sale_items_detail AS
SELECT
  si.id,
  s.id             AS sale_id,
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
