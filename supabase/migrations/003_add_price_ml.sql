-- Add MercadoLibre price field to products (defaults to 0, user sets manually)
ALTER TABLE products ADD COLUMN price_ml_usd NUMERIC(10,4) NOT NULL DEFAULT 0;

COMMENT ON COLUMN products.price_ml_usd IS 'Manual ML selling price set by admin. Not shown on storefront.';
