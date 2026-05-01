-- =============================================
-- 003_config.sql — Business configuration
-- =============================================

INSERT INTO app_config (key, value, description) VALUES
('ml_commission_rate',  '0.11', 'Porcentaje de comisión de MercadoLibre'),
('shipping_cost_usd',   '1.30', 'Costo de envío gratis por venta (USD)'),
('lead_time_months',    '4',    'Meses de lead time del proveedor'),
('safety_stock_months', '1',    'Meses de colchón de seguridad mínimo'),
('reinvestment_pct',    '0.70', 'Porcentaje de ganancia neta para reinversión'),
('personal_salary_pct', '0.30', 'Porcentaje de ganancia neta como sueldo');
