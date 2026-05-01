-- =============================================================
-- 004_sales.sql — Ventas históricas Avila Music (Feb-Abr 2026)
-- Generado automáticamente desde Avila_Music_v12.xlsx
-- 206 ventas | 21 productos | 3 meses
-- =============================================================

-- Los precios (unit_price_usd, unit_cost_usd) están congelados
-- al valor vigente en la fecha de la venta. NO modificar.

-- ─────────────────────────────────────────
-- Febrero 2026 (37 ventas)
-- ─────────────────────────────────────────

DO $$ DECLARE sale_id UUID := '4f3b0d20-5044-4fc3-9186-9a44658da8f1'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('6cb82bdd-db01-442f-8790-569a4f13be95', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'e2202d5d-c8cd-48fe-a403-641ac5bec2a9'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('752f3cd5-dcb1-409c-a07c-1e270316acdc', sale_id,
    (SELECT id FROM products WHERE slug='clavijas-guitarra-clasica-doradas'),
    9.99, 2.5, 1, 1.0989, 1.3, 7.5911, 5.0911, 0.50962);
END $$;

DO $$ DECLARE sale_id UUID := 'f06b4506-60ee-4f13-b6f6-e29ac481ec40'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('6bdc90d8-7dc7-48af-8f88-2c6d03101c24', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-l'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '7167b124-fedb-4879-94db-407cc9c97c6b'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('7b57b233-873c-4653-a832-6589383b35c8', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '9b447ef5-3e7c-4ba3-ad3f-ef0cdb7a7d54'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('d4065900-3c15-42ee-ba5b-9eafc0b2553b', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-l'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '626a5970-829f-480a-a9ed-2ef481ec75ea'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('7a24d220-8d0b-4b96-b83e-95c05ef00936', sale_id,
    (SELECT id FROM products WHERE slug='hombrera-violin-34-44'),
    11.0, 2.69, 1, 1.21, 1.3, 8.49, 5.8, 0.527273);
END $$;

DO $$ DECLARE sale_id UUID := '2b44e56e-be96-43ed-aefa-b187f6102215'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('bd58b17e-2f63-4c8a-8199-a9a2fd49eb85', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'a5183069-52ad-4f7b-98d2-dcaa4aa05af3'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('c8181e27-d652-49f7-8536-6aeb9ea1042d', sale_id,
    (SELECT id FROM products WHERE slug='clavijas-guitarra-clasica-doradas'),
    9.99, 2.5, 1, 1.0989, 1.3, 7.5911, 5.0911, 0.50962);
END $$;

DO $$ DECLARE sale_id UUID := '70b2bc1f-0351-4129-a547-0ae8366a90bf'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('4659ae48-9010-45c5-b521-e99ebba4cc83', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '7268cbda-1ad5-47f8-bc65-6506fa5aeafe'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('0beb3c79-7203-4f68-b2f9-e00b972a117d', sale_id,
    (SELECT id FROM products WHERE slug='correa-guitarra-bajo'),
    5.49, 0.2, 1, 0.6039, 1.3, 3.5861, 3.3861, 0.616776);
END $$;

DO $$ DECLARE sale_id UUID := '7838da05-598a-4390-9afb-9aa26b6c56b8'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('b1918150-eddc-477d-951d-b52ceaebe9ec', sale_id,
    (SELECT id FROM products WHERE slug='hombrera-violin-34-44'),
    11.0, 2.69, 1, 1.21, 1.3, 8.49, 5.8, 0.527273);
END $$;

DO $$ DECLARE sale_id UUID := 'b18176ed-ffe3-49a0-a88e-4fc41cdc5dc6'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('e9ed9929-4be7-44ec-8b90-c7a952ee6b6e', sale_id,
    (SELECT id FROM products WHERE slug='correa-guitarra-bajo'),
    5.49, 0.2, 1, 0.6039, 1.3, 3.5861, 3.3861, 0.616776);
END $$;

DO $$ DECLARE sale_id UUID := 'd4e1e9dc-1e47-4706-a45d-fe7084a72261'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('ad5465fd-edee-4284-a873-c0398ea8ed48', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-violin-44'),
    4.99, 1.06, 1, 0.5489, 1.3, 3.1411, 2.0811, 0.417054);
END $$;

DO $$ DECLARE sale_id UUID := '1c4acc1c-876b-4ccd-b888-34402cdcd0b5'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('2cb3d566-0775-4b92-a68a-7f186aea7c50', sale_id,
    (SELECT id FROM products WHERE slug='cejilla-cejuela'),
    5.0, 0.01, 1, 0.55, 1.3, 3.15, 3.14, 0.628);
END $$;

DO $$ DECLARE sale_id UUID := '50b1e173-0127-4bf9-bcec-eda02d67df98'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('a7239675-7c51-4cbd-9a89-854f6d42a60c', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'b31020e9-4781-4b7f-88c2-f2dfe11011a3'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('a38494e2-ec88-4bf0-8eae-433b2ab6c279', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-l'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'c86b1ef8-ba08-4592-87a4-bb9b68abbe6f'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('b12da357-6cf1-4ce0-9874-bda6eda314fc', sale_id,
    (SELECT id FROM products WHERE slug='capotraste'),
    6.99, 0.65, 1, 0.7689, 1.3, 4.9211, 4.2711, 0.61103);
END $$;

DO $$ DECLARE sale_id UUID := '283bc0b6-f2f7-42b4-9924-4312439d9a6a'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('1d1f0968-410f-4a34-9aa6-15563431f333', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'e7a73403-84b7-48c8-b394-84a14bbccee2'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('fc27bf39-aee7-4d12-9c87-c77087eb9ea5', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-l'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '581eacbc-a929-476a-b2d2-370e5599cc2d'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('b72c1ac1-6525-4c03-a945-b50cef51c517', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '0ecf594d-b920-460f-a898-315000aa3dc6'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('61ce53bb-acdf-4205-89fc-6033a49e71ae', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-l'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '4eb1dc74-281e-4c49-8e9b-e26176fa17de'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('1b181c1c-b08a-4d6c-9684-21cbd7acc86e', sale_id,
    (SELECT id FROM products WHERE slug='base-pared-guitarra-bajo'),
    4.99, 0.5, 1, 0.5489, 1.3, 3.1411, 2.6411, 0.529279);
END $$;

DO $$ DECLARE sale_id UUID := '941b76b2-3ba9-42a3-997b-8953944295a9'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('9c824a43-a462-4101-8117-dec1d86e3538', sale_id,
    (SELECT id FROM products WHERE slug='cejilla-cejuela'),
    5.0, 0.01, 1, 0.55, 1.3, 3.15, 3.14, 0.628);
END $$;

DO $$ DECLARE sale_id UUID := '374b374a-770c-4e1d-91df-46abf22b3813'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('7716d4d0-b5ed-4c98-9184-d9dd656418cf', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'a84ddcc9-b28c-4e03-85c4-25d492114e04'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('829ae3b8-30cf-4c31-a26b-9c5a7073d3c9', sale_id,
    (SELECT id FROM products WHERE slug='correa-guitarra-bajo'),
    5.49, 0.2, 1, 0.6039, 1.3, 3.5861, 3.3861, 0.616776);
END $$;

DO $$ DECLARE sale_id UUID := '481bd05c-13d4-4350-8fdc-ced9b4e02d2f'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('6e7dfd2a-36f8-45c0-a7f9-5e8257763390', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-bajo-4c-alice'),
    12.99, 3.03, 1, 1.4289, 1.3, 10.2611, 7.2311, 0.556667);
END $$;

DO $$ DECLARE sale_id UUID := 'ab16f514-7ac6-4765-85e3-ef820275e09b'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('4622cc7a-fff0-4947-9106-cbf5af761458', sale_id,
    (SELECT id FROM products WHERE slug='correa-guitarra-bajo'),
    5.49, 0.2, 1, 0.6039, 1.3, 3.5861, 3.3861, 0.616776);
END $$;

DO $$ DECLARE sale_id UUID := '3359cf59-f94b-4ab8-b0a4-34043afb1b1d'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('9d20053b-8c19-4610-9647-6ed76f7e855e', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-bajo-4c-alice'),
    12.99, 3.03, 1, 1.4289, 1.3, 10.2611, 7.2311, 0.556667);
END $$;

DO $$ DECLARE sale_id UUID := 'e5828504-ec35-43c4-9cef-7a145ecd9f55'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('75e41441-bbb2-40b7-96d5-6f6b066f268a', sale_id,
    (SELECT id FROM products WHERE slug='cable-pedales'),
    14.0, 2.3, 1, 1.54, 1.3, 11.16, 8.86, 0.632857);
END $$;

DO $$ DECLARE sale_id UUID := 'd3be5f63-2b7a-4dfc-a48e-c13ff2e986d3'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('a97ed836-8c2b-4cc5-befe-cba7fc52e444', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '46ddf54c-d2b2-4eb3-a5a9-faebd506d217'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('51086f76-bf3f-4651-8509-246a36f58936', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-bajo-4c-alice'),
    12.99, 3.03, 1, 1.4289, 1.3, 10.2611, 7.2311, 0.556667);
END $$;

DO $$ DECLARE sale_id UUID := 'e0dc0118-02f9-4e70-bf41-ef92680cafce'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('18b2e5f5-00d0-41ba-9411-66b96c40c50d', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-bajo-4c-alice'),
    12.99, 3.03, 1, 1.4289, 1.3, 10.2611, 7.2311, 0.556667);
END $$;

DO $$ DECLARE sale_id UUID := '4186d71c-886c-468c-b149-ebde9361a186'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('2778aacc-4c56-4d89-80da-afb5dbfbaedf', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-l'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'c0c91a3e-530f-49df-b9c5-3c25a865aa0a'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('c33d2df6-d394-46b1-a2fb-2d18140109ae', sale_id,
    (SELECT id FROM products WHERE slug='clavijas-guitarra-clasica-doradas'),
    9.99, 2.5, 1, 1.0989, 1.3, 7.5911, 5.0911, 0.50962);
END $$;

DO $$ DECLARE sale_id UUID := '72e8da57-1fe0-4e61-a727-4f14caaccad5'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('ac9beb73-bd95-41e8-ac9c-506bc66ba5c0', sale_id,
    (SELECT id FROM products WHERE slug='pines-de-correa'),
    5.0, 0.01, 1, 0.55, 1.3, 3.15, 3.14, 0.628);
END $$;

DO $$ DECLARE sale_id UUID := '688f25a0-a230-494a-a3a6-7c3c1e55c9ec'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('eb2478b7-33a8-4746-a437-70e71600fdad', sale_id,
    (SELECT id FROM products WHERE slug='correa-guitarra-bajo'),
    5.49, 0.2, 1, 0.6039, 1.3, 3.5861, 3.3861, 0.616776);
END $$;

DO $$ DECLARE sale_id UUID := '930d510d-8b49-4cd2-949d-01879d985d49'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('499c45cb-4f01-43d2-83c7-540af2e3c2c1', sale_id,
    (SELECT id FROM products WHERE slug='clavijas-bajo-mariposa'),
    10.0, 2.0, 1, 1.1, 1.3, 7.6, 5.6, 0.56);
END $$;

-- ─────────────────────────────────────────
-- Marzo 2026 (59 ventas)
-- ─────────────────────────────────────────

DO $$ DECLARE sale_id UUID := '26253280-4db7-48c6-80d1-4860c365d7af'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-23', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('26596968-0449-427c-8e2a-63d95e271da8', sale_id,
    (SELECT id FROM products WHERE slug='base-pared-guitarra-bajo'),
    4.99, 0.5, 1, 0.5489, 1.3, 3.1411, 2.6411, 0.529279);
END $$;

DO $$ DECLARE sale_id UUID := 'f79505d6-d790-441f-9179-e6e98ff67c6c'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-23', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('716d825e-37df-45a2-a5d4-4690984ef29e', sale_id,
    (SELECT id FROM products WHERE slug='capotraste'),
    6.99, 0.65, 1, 0.7689, 1.3, 4.9211, 4.2711, 0.61103);
END $$;

DO $$ DECLARE sale_id UUID := '1fc96518-5fb4-4417-a55e-ea480d936e21'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-23', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('396fb143-e23c-43bb-9e8d-bc693b017ca5', sale_id,
    (SELECT id FROM products WHERE slug='correa-guitarra-bajo'),
    5.49, 0.2, 1, 0.6039, 1.3, 3.5861, 3.3861, 0.616776);
END $$;

DO $$ DECLARE sale_id UUID := '9a121bbb-b922-4b3d-a129-a2669619e005'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-23', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('1f7ce634-4121-4008-9033-f113c9443001', sale_id,
    (SELECT id FROM products WHERE slug='correa-guitarra-bajo'),
    5.49, 0.2, 1, 0.6039, 1.3, 3.5861, 3.3861, 0.616776);
END $$;

DO $$ DECLARE sale_id UUID := '8499f622-17e2-4e5c-b293-f17e3982885b'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-23', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('5d4978ca-6369-4086-82c3-844598d44285', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-violin-44'),
    4.99, 1.06, 1, 0.5489, 1.3, 3.1411, 2.0811, 0.417054);
END $$;

DO $$ DECLARE sale_id UUID := '261c031e-e8a7-4264-a865-47b0d8f107f9'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-23', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('8a4d851a-2aae-42c0-a336-2d2ce56700da', sale_id,
    (SELECT id FROM products WHERE slug='cable-hebikuo-xa03'),
    10.0, 1.91, 1, 1.1, 1.3, 7.6, 5.69, 0.569);
END $$;

DO $$ DECLARE sale_id UUID := '0f7c1214-f4c5-4bf6-9301-8c0e68d1da16'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-24', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('23ade869-73ee-4be5-ac33-b827339406e4', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '2c256eac-3139-46ae-8bf0-b6420c339632'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('7558034d-c094-4428-ba78-c0e1542c57ef', sale_id,
    (SELECT id FROM products WHERE slug='correa-guitarra-bajo'),
    5.49, 0.2, 1, 0.6039, 1.3, 3.5861, 3.3861, 0.616776);
END $$;

DO $$ DECLARE sale_id UUID := '0702a955-b96f-425b-ad8b-aa061983c32b'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('f403a751-89d1-4daa-8b87-31726a7b4564', sale_id,
    (SELECT id FROM products WHERE slug='cable-hebikuo-xa03'),
    10.0, 1.91, 1, 1.1, 1.3, 7.6, 5.69, 0.569);
END $$;

DO $$ DECLARE sale_id UUID := 'abbf174f-8037-431f-9f2a-0bee39b1c4ac'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('d459f26c-ca49-47dd-a8e0-a0dc1c8d4b2d', sale_id,
    (SELECT id FROM products WHERE slug='cable-hebikuo-xa03'),
    10.0, 1.91, 1, 1.1, 1.3, 7.6, 5.69, 0.569);
END $$;

DO $$ DECLARE sale_id UUID := '8f717f83-a015-4f65-9fde-5d4b0c9dee9f'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('bff40f89-c8ff-4260-a521-1154344ef323', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'ba7680fc-4154-4d6e-ab99-960500bf1e90'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('6e6fec72-7935-494e-be46-dbf3c97703a1', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-violin-44'),
    4.99, 1.06, 1, 0.5489, 1.3, 3.1411, 2.0811, 0.417054);
END $$;

DO $$ DECLARE sale_id UUID := '3f764016-fae4-426d-bf4b-2bbb4520a4a8'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('55fd1293-bd03-44dd-9df8-69e1d7ff548e', sale_id,
    (SELECT id FROM products WHERE slug='hombrera-violin-34-44'),
    11.0, 2.69, 1, 1.21, 1.3, 8.49, 5.8, 0.527273);
END $$;

DO $$ DECLARE sale_id UUID := 'b14173d6-7582-4c71-9a23-4c3e8c9c04ca'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('467079c0-a1de-4a8e-8e04-6fbeb2a438ee', sale_id,
    (SELECT id FROM products WHERE slug='cable-hebikuo-xa03'),
    10.0, 1.91, 1, 1.1, 1.3, 7.6, 5.69, 0.569);
END $$;

DO $$ DECLARE sale_id UUID := '087c59c8-89bb-429e-9012-296bc8667585'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('1e3c4cb0-d78f-446c-84ac-3c88eead42a3', sale_id,
    (SELECT id FROM products WHERE slug='cable-hebikuo-xa03'),
    10.0, 1.91, 1, 1.1, 1.3, 7.6, 5.69, 0.569);
END $$;

DO $$ DECLARE sale_id UUID := '842bb517-04f6-48b0-a24d-83bca5ee15a6'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('a2074d34-3624-4818-b7f8-1a1d18627671', sale_id,
    (SELECT id FROM products WHERE slug='cable-hebikuo-xa03'),
    10.0, 1.91, 1, 1.1, 1.3, 7.6, 5.69, 0.569);
END $$;

DO $$ DECLARE sale_id UUID := 'a9f4d22b-9c89-4f18-8941-75ec37492960'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('615f6cb8-01c0-4303-9ecb-0db79f03c368', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '2ef18672-970d-4e9c-b0e3-55c94b2e25a7'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('ebac852f-eded-4804-8e0b-a867014df312', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-l'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '2baf0a34-1c5e-4039-91a6-0d3aaa59dbc6'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('259de6be-4c3b-4d1b-8ffe-77bbcb7e9e7e', sale_id,
    (SELECT id FROM products WHERE slug='correa-guitarra-bajo'),
    5.49, 0.2, 1, 0.6039, 1.3, 3.5861, 3.3861, 0.616776);
END $$;

DO $$ DECLARE sale_id UUID := '793a2891-c2d6-46ba-9be9-f14865ad0b58'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('b0d98467-bfc8-47dc-af38-a03af8676eba', sale_id,
    (SELECT id FROM products WHERE slug='correa-guitarra-bajo'),
    5.49, 0.2, 1, 0.6039, 1.3, 3.5861, 3.3861, 0.616776);
END $$;

DO $$ DECLARE sale_id UUID := 'b95c6b05-7472-4220-8ff7-f18ff8963bfe'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('cc0c89fb-4a90-43b2-836e-aab02bc80421', sale_id,
    (SELECT id FROM products WHERE slug='cable-hebikuo-xa03'),
    10.0, 1.91, 1, 1.1, 1.3, 7.6, 5.69, 0.569);
END $$;

DO $$ DECLARE sale_id UUID := '505c52a0-3c53-40ea-8500-25ac3e1058a3'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('0e567ed0-df67-4025-b95d-6e8b0ef814cb', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'a6ec1d45-fdb0-40e2-ac3b-35080d689dac'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('ca03a8e4-598d-48ef-a67f-9fdf2a88b0b4', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '4ecf6bd7-b41a-4f81-8c2f-255657ce11fb'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('4adad8b3-357a-401f-b888-9836f5dab002', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '3c701d46-cbec-484c-855c-712b0c0e9ac8'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('e4ba1342-b796-4809-9b77-ef3d54154d1f', sale_id,
    (SELECT id FROM products WHERE slug='cable-hebikuo-xa03'),
    10.0, 1.91, 1, 1.1, 1.3, 7.6, 5.69, 0.569);
END $$;

DO $$ DECLARE sale_id UUID := 'b57b8cfa-8f03-43cc-b49a-957fb00f88ff'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('6e623d8c-e55c-421b-b09f-a21858cfeb80', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-violin-44'),
    4.99, 1.06, 1, 0.5489, 1.3, 3.1411, 2.0811, 0.417054);
END $$;

DO $$ DECLARE sale_id UUID := 'b1a541ed-8560-427c-9e27-4e7beeda82c5'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('1b4bf9d4-fcd5-4105-b0a1-52d53f138910', sale_id,
    (SELECT id FROM products WHERE slug='correa-guitarra-bajo'),
    5.49, 0.2, 1, 0.6039, 1.3, 3.5861, 3.3861, 0.616776);
END $$;

DO $$ DECLARE sale_id UUID := 'e01d05c7-4d30-4704-bb4f-52345c17a6b9'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('963e3bef-3290-4086-a501-86ddb9bca7fe', sale_id,
    (SELECT id FROM products WHERE slug='clavijas-guitarra-clasica-doradas'),
    9.99, 2.5, 1, 1.0989, 1.3, 7.5911, 5.0911, 0.50962);
END $$;

DO $$ DECLARE sale_id UUID := 'e813dc28-14fd-4e15-be04-8629609558ea'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('60bf311d-522a-40f8-9a29-902babc5739e', sale_id,
    (SELECT id FROM products WHERE slug='correa-guitarra-bajo'),
    5.49, 0.2, 1, 0.6039, 1.3, 3.5861, 3.3861, 0.616776);
END $$;

DO $$ DECLARE sale_id UUID := '64728347-45bf-405d-b381-d5dab5d93e84'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('4c3dc49d-2d73-49dc-bc3c-b8788d6a0ea5', sale_id,
    (SELECT id FROM products WHERE slug='correa-guitarra-bajo'),
    5.49, 0.2, 1, 0.6039, 1.3, 3.5861, 3.3861, 0.616776);
END $$;

DO $$ DECLARE sale_id UUID := '1862c780-8401-4cc9-a964-3cc53bc82073'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('038f0751-8ee2-47a9-bc63-ef4e50c9f346', sale_id,
    (SELECT id FROM products WHERE slug='cable-hebikuo-xa03'),
    10.0, 1.91, 1, 1.1, 1.3, 7.6, 5.69, 0.569);
END $$;

DO $$ DECLARE sale_id UUID := '6db69621-d90c-4858-b1fd-588d411e4efa'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('75eec418-5873-4f78-87f9-4b442aa52d76', sale_id,
    (SELECT id FROM products WHERE slug='cable-hebikuo-xa03'),
    10.0, 1.91, 1, 1.1, 1.3, 7.6, 5.69, 0.569);
END $$;

DO $$ DECLARE sale_id UUID := '0ae5c708-48c5-4a3a-b4fe-2b54022fa3de'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('584408af-955c-4cca-9c41-02adb4972a20', sale_id,
    (SELECT id FROM products WHERE slug='base-pared-guitarra-bajo'),
    4.99, 0.5, 1, 0.5489, 1.3, 3.1411, 2.6411, 0.529279);
END $$;

DO $$ DECLARE sale_id UUID := '8fc2554c-04ee-404d-bbd3-fcac98a3a4a7'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('f5e145fd-e724-4582-9483-65e080fb35ee', sale_id,
    (SELECT id FROM products WHERE slug='cejilla-cejuela'),
    5.0, 0.01, 1, 0.55, 1.3, 3.15, 3.14, 0.628);
END $$;

DO $$ DECLARE sale_id UUID := 'b9884e19-88d9-4fc9-a686-6431be5c796a'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('7c349b98-7ab9-4d1e-9777-3afe0c66a42d', sale_id,
    (SELECT id FROM products WHERE slug='base-pared-guitarra-bajo'),
    4.99, 0.5, 1, 0.5489, 1.3, 3.1411, 2.6411, 0.529279);
END $$;

DO $$ DECLARE sale_id UUID := '2e9fdea4-c64e-4f70-a26c-62605373c78e'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('e87c3013-965c-4f63-a7e0-70df9208a590', sale_id,
    (SELECT id FROM products WHERE slug='pines-de-correa'),
    5.0, 0.01, 1, 0.55, 1.3, 3.15, 3.14, 0.628);
END $$;

DO $$ DECLARE sale_id UUID := 'd56e044d-0105-4292-8515-ed0cce2de797'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('40b3695e-0661-4a99-b930-d930acbdfbee', sale_id,
    (SELECT id FROM products WHERE slug='cable-pedales'),
    14.0, 2.3, 1, 1.54, 1.3, 11.16, 8.86, 0.632857);
END $$;

DO $$ DECLARE sale_id UUID := 'f53d345e-a25b-4bd7-b8a2-af04f8b93e0c'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('98aa0d5c-9e8e-46c9-850a-258f26f0f182', sale_id,
    (SELECT id FROM products WHERE slug='cable-hebikuo-xa03'),
    10.0, 1.91, 1, 1.1, 1.3, 7.6, 5.69, 0.569);
END $$;

DO $$ DECLARE sale_id UUID := '98327a16-c439-4dd2-91eb-6878c8239dad'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-02-03', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('04577e72-afe4-4a66-b83e-cbb87ca77da7', sale_id,
    (SELECT id FROM products WHERE slug='pines-de-correa'),
    5.0, 0.01, 1, 0.55, 1.3, 3.15, 3.14, 0.628);
END $$;

DO $$ DECLARE sale_id UUID := '65df4e16-5b50-431b-94a5-645694e7d468'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-24', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('42b80a35-a355-4432-8074-5a7fc1ab7b63', sale_id,
    (SELECT id FROM products WHERE slug='cable-pedales'),
    14.0, 2.3, 1, 1.54, 1.3, 11.16, 8.86, 0.632857);
END $$;

DO $$ DECLARE sale_id UUID := 'fb51731e-c589-4cff-9139-eb9771f55951'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-24', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('8cf550ad-aa54-483a-98f1-5fdbf654dbab', sale_id,
    (SELECT id FROM products WHERE slug='clavijas-guitarra-clasica-doradas'),
    9.99, 2.5, 1, 1.0989, 1.3, 7.5911, 5.0911, 0.50962);
END $$;

DO $$ DECLARE sale_id UUID := 'f9d6a4f6-d4af-45fa-92c8-5913861469dc'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-24', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('a1cf55d5-37ed-4283-8887-2c2b751505ce', sale_id,
    (SELECT id FROM products WHERE slug='clavijas-guitarra-clasica-doradas'),
    9.99, 2.5, 1, 1.0989, 1.3, 7.5911, 5.0911, 0.50962);
END $$;

DO $$ DECLARE sale_id UUID := '3eaf5257-ef51-4518-a73e-2ce6f6450e11'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-25', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('7b847401-83a6-4898-bedc-edbb822a30df', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-folk-11-52'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '190b3f7e-a187-4153-bddd-69d43389e74a'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-25', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('ccd303db-024f-4b16-ad81-9d129aa6e6a5', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 0, 4.8861, 3.6761, 0.669599);
END $$;

DO $$ DECLARE sale_id UUID := '512e1b7e-7202-4430-9d88-d1bc637f2bdf'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-25', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('e696d447-be19-471a-859a-10a7a3a5e539', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 0, 4.8861, 3.6761, 0.669599);
END $$;

DO $$ DECLARE sale_id UUID := 'b5e04ef1-6724-4e85-862b-1a542bbfe4b1'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-25', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('f430fe9e-ee98-44a1-b25f-4046fc6b7742', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-bajo-4c-alice'),
    12.99, 3.03, 1, 1.4289, 0, 11.5611, 8.5311, 0.656744);
END $$;

DO $$ DECLARE sale_id UUID := '29dc3c96-e61b-45ae-b303-42c7aeb14644'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-25', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('56b0dd99-136f-4be3-abcc-899b13e27e57', sale_id,
    (SELECT id FROM products WHERE slug='capotraste'),
    6.99, 0.65, 1, 0.7689, 1.3, 4.9211, 4.2711, 0.61103);
END $$;

DO $$ DECLARE sale_id UUID := '3aec2aa1-1a17-432e-b901-5869cdd329c6'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-27', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('a36c2dc5-8fad-4f7e-bf51-d482d15105ce', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-l'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'c37dbebb-13cb-4fad-9467-fea9f2ae9e5a'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-27', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('b70ba759-f6b4-4f2f-80e0-c677d691895a', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-folk-11-52'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '8c58c5fe-cd2f-4935-be52-95dd99eb3613'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-29', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('6fa7361e-75e8-48c6-b20b-a99d83807244', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-bajo-4c-alice'),
    12.99, 3.03, 1, 1.4289, 1.3, 10.2611, 7.2311, 0.556667);
END $$;

DO $$ DECLARE sale_id UUID := '96cad83d-6331-4e0b-bb1b-950958ff97c6'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-29', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('b988b2ef-9cc5-43c4-9f99-0a7db319a89a', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-l'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '0b3702a9-c10c-46a0-a75e-7d716aefbec9'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-30', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('9c90bed6-a853-4d79-ac12-0703cca3518f', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '273cdadf-d55c-40c1-b1dc-8b4837a417ff'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-30', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('90af4cf7-63de-4e7c-8f09-90bee726a22c', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 0, 4.8861, 3.6761, 0.669599);
END $$;

DO $$ DECLARE sale_id UUID := 'bce8ae6c-cfed-4119-8ba0-c54895461113'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-30', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('c202bdbe-5eab-474c-8032-2185e4bbfad2', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-folk-11-52'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'a9887f26-ecb4-4531-9160-c1bf4ba0d3bd'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-30', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('01e9f9a4-11c7-4fb8-9664-21abbc9387a6', sale_id,
    (SELECT id FROM products WHERE slug='pickguard-negro-acustica'),
    5.0, 0.5, 1, 0.55, 1.3, 3.15, 2.65, 0.53);
END $$;

DO $$ DECLARE sale_id UUID := '453a7899-3fc3-4904-a1b0-dda9e5b88100'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-31', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('7bcf1e84-7f1c-4ec3-8eee-f6432e8cac39', sale_id,
    (SELECT id FROM products WHERE slug='clavijas-guitarra-clasica-doradas'),
    9.99, 2.5, 1, 1.0989, 0, 8.8911, 6.3911, 0.63975);
END $$;

DO $$ DECLARE sale_id UUID := 'ef541890-be1c-4701-9d5b-6d2f8b8466ff'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-31', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('bfd29c13-1b90-4bbf-9a33-cc88825121da', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-bajo-4c-alice'),
    12.99, 3.03, 1, 1.4289, 1.3, 10.2611, 7.2311, 0.556667);
END $$;

DO $$ DECLARE sale_id UUID := 'a6f8f21d-c7ac-42c1-b027-03e0926e1574'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-31', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('0c49ce6a-b515-4ee3-a52b-75619f4a4df5', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '107c86dd-9463-4f10-bc69-fbd466dbce78'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-03-30', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('b75367cf-7c48-4f39-be6f-3a054487b713', sale_id,
    (SELECT id FROM products WHERE slug='capotraste'),
    6.99, 0.65, 1, 0.7689, 1.3, 4.9211, 4.2711, 0.61103);
END $$;

-- ─────────────────────────────────────────
-- Abril 2026 (110 ventas)
-- ─────────────────────────────────────────

DO $$ DECLARE sale_id UUID := '3efb511f-06a2-40e6-a846-033c4fbf5a77'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-01', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('ecabd179-9555-4631-872c-1dd8cdcdce7b', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-violin-44'),
    4.99, 1.06, 1, 0.5489, 1.3, 3.1411, 2.0811, 0.417054);
END $$;

DO $$ DECLARE sale_id UUID := '43a03f91-f952-4771-8507-82d35967682b'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-01', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('6b121f20-d7c7-47c7-b9ee-fd81271d1c2c', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'ed89b75c-ddda-4f32-ae50-c2602237731f'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-01', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('03439061-2919-4e91-a235-00135ca25539', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 0, 4.8861, 3.6761, 0.669599);
END $$;

DO $$ DECLARE sale_id UUID := '31f82c5c-402a-4abd-9339-49c04cc1f85c'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-02', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('7490e202-576b-470a-a084-bfab6a2e10f5', sale_id,
    (SELECT id FROM products WHERE slug='cable-hebikuo-xa03'),
    10.0, 1.91, 1, 1.1, 1.3, 7.6, 5.69, 0.569);
END $$;

DO $$ DECLARE sale_id UUID := 'f63c3f74-989d-4536-a8af-1177064addf3'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-02', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('76364928-fc47-455b-bd08-d15fe7a2f24e', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'ef8e55f4-2c20-41b9-9214-35dc70fe67fa'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-02', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('a07902ca-3f71-4e40-8a69-73b0a16622e0', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '1efccca5-dd3d-4999-ad99-99e0aff6dad7'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-02', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('cd9a9728-0e0d-4321-ae86-fbef0cac3bed', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 0, 4.8861, 3.6761, 0.669599);
END $$;

DO $$ DECLARE sale_id UUID := '4c00ef95-3d71-46c5-9635-9356492e4233'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('e1adf0ac-e832-4b1c-a5e6-3de59258f51b', sale_id,
    (SELECT id FROM products WHERE slug='base-pared-guitarra-bajo'),
    4.99, 0.5, 1, 0.5489, 1.3, 3.1411, 2.6411, 0.529279);
END $$;

DO $$ DECLARE sale_id UUID := '3e645536-d290-42bc-9f4e-f5cd8151da55'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-04', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('dd45628b-d084-4fee-8be2-b82ce31f17fd', sale_id,
    (SELECT id FROM products WHERE slug='base-pared-guitarra-bajo'),
    4.99, 0.5, 1, 0.5489, 1.3, 3.1411, 2.6411, 0.529279);
END $$;

DO $$ DECLARE sale_id UUID := '8acdb5b3-7dab-4d61-8f4a-7613f48a6e91'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-05', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('04ef02fe-1451-42dd-a113-18418b6e92c1', sale_id,
    (SELECT id FROM products WHERE slug='base-pared-guitarra-bajo'),
    4.99, 0.5, 1, 0.5489, 0, 4.4411, 3.9411, 0.7898);
END $$;

DO $$ DECLARE sale_id UUID := '62e55937-0a5e-4fa2-b69b-9493519b172e'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-06', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('46dea6bd-5eb9-442c-9e28-708f077413fa', sale_id,
    (SELECT id FROM products WHERE slug='capotraste'),
    6.99, 0.65, 1, 0.7689, 1.3, 4.9211, 4.2711, 0.61103);
END $$;

DO $$ DECLARE sale_id UUID := '27a012d0-1bae-4592-ad1e-e349a271d542'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-06', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('543558dc-4bb2-4b26-8f9a-4d9da6f92995', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-l'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '4665d75e-11df-49ce-b138-767ce9a0d86a'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-07', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('a07939d9-881d-4493-bfbe-d326a5fdd2b1', sale_id,
    (SELECT id FROM products WHERE slug='base-pared-guitarra-bajo'),
    4.99, 0.5, 1, 0.5489, 1.3, 3.1411, 2.6411, 0.529279);
END $$;

DO $$ DECLARE sale_id UUID := 'e1d5eb4b-d087-4225-8b33-8c100b58ded9'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-07', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('322549bf-3bfe-4ae4-9241-7ab36e71bb37', sale_id,
    (SELECT id FROM products WHERE slug='cable-hebikuo-xa03'),
    10.0, 1.91, 1, 1.1, 1.3, 7.6, 5.69, 0.569);
END $$;

DO $$ DECLARE sale_id UUID := '5e6fe3c3-e81b-404c-a595-78c24a5f5ba3'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-07', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('62a5cc93-f8d3-4e0a-aaed-772950ee1a9a', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-bajo-4c-alice'),
    12.99, 3.03, 1, 1.4289, 1.3, 10.2611, 7.2311, 0.556667);
END $$;

DO $$ DECLARE sale_id UUID := 'a3b81f03-1179-4e19-83eb-d4170fc5cf0b'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-07', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('62f262b0-286b-4b7e-a05e-1a1e8054c2fd', sale_id,
    (SELECT id FROM products WHERE slug='pickguard-negro-acustica'),
    5.0, 0.5, 1, 0.55, 1.3, 3.15, 2.65, 0.53);
END $$;

DO $$ DECLARE sale_id UUID := '140d99e5-1837-4050-976c-0fe032cd0dff'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-07', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('76993ba3-d27e-47f7-8c05-8cdf2c3ca747', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '64f6b98a-15f2-4137-a014-824585fa8df4'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-07', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('24c75343-3881-4c79-bd55-750b4cc69440', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-l'),
    5.49, 1.21, 1, 0.6039, 0, 4.8861, 3.6761, 0.669599);
END $$;

DO $$ DECLARE sale_id UUID := 'a0114fd3-6233-411e-a6a8-6501747bab37'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-07', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('ce02d646-3419-466f-a82c-804d4c02e7d1', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-l'),
    5.49, 1.21, 1, 0.6039, 0, 4.8861, 3.6761, 0.669599);
END $$;

DO $$ DECLARE sale_id UUID := 'f377ffbd-e43e-49e8-ad8a-c28179bd27fc'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-07', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('7478c804-2cfa-4822-97c5-d3d0477e88f7', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '772578ed-fa3c-439d-96d4-bc21ea33f8d1'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-07', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('11ab0efb-02ea-454f-99f7-46ce55771d87', sale_id,
    (SELECT id FROM products WHERE slug='hombrera-violin-34-44'),
    11.0, 2.69, 1, 1.21, 1.3, 8.49, 5.8, 0.527273);
END $$;

DO $$ DECLARE sale_id UUID := '7d52b6fd-e922-485b-a753-6bbf7378edab'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-07', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('52c47e63-dc16-47bf-ab3d-05658f24c205', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'f859cfad-ba01-495d-b1be-37f678ad6389'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-07', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('b4176dc6-1e74-45dc-9fbb-cc03822fac92', sale_id,
    (SELECT id FROM products WHERE slug='hombrera-violin-34-44'),
    11.0, 2.69, 1, 1.21, 1.3, 8.49, 5.8, 0.527273);
END $$;

DO $$ DECLARE sale_id UUID := 'a251c525-476d-4ee7-b197-7f2981d7cd87'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-07', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('40296fc0-f613-4021-a329-baee801c2e33', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 0, 4.8861, 3.6761, 0.669599);
END $$;

DO $$ DECLARE sale_id UUID := 'f9a54173-449b-459d-9ca4-46d49d53fa6d'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-07', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('b9eab714-b39e-4904-b051-e7df49467512', sale_id,
    (SELECT id FROM products WHERE slug='baqueta-bateria-5b'),
    5.0, 0.71, 1, 0.55, 0, 4.45, 3.74, 0.748);
END $$;

DO $$ DECLARE sale_id UUID := '36795f82-b1e5-4da0-81c9-66fc7f8e8d00'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-07', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('9d7a0da8-9030-41ac-a060-1a76db4ed208', sale_id,
    (SELECT id FROM products WHERE slug='cable-hebikuo-xa03'),
    10.0, 1.91, 1, 1.1, 1.3, 7.6, 5.69, 0.569);
END $$;

DO $$ DECLARE sale_id UUID := '0bd68e22-bc4d-4500-81b2-21b88dfa98fd'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-07', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('1ac107cc-70cd-4360-849e-caf8da8d3354', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-bajo-4c-alice'),
    12.99, 3.03, 1, 1.4289, 1.3, 10.2611, 7.2311, 0.556667);
END $$;

DO $$ DECLARE sale_id UUID := '0c1465c4-b5e9-471d-9a6a-06e464a44a24'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-07', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('b15d9821-a1ac-4798-89c1-779b4ea473ba', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '59d552a2-4257-4e70-abbc-b082cc2b6041'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-08', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('ba5c1e41-5ea1-41a0-90ec-cdaee19d3b6e', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '831ac9fa-2069-482f-8534-13374b39d9e3'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-08', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('2cf5e107-83fa-4503-a45e-d5974a58baec', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 0, 4.8861, 3.6761, 0.669599);
END $$;

DO $$ DECLARE sale_id UUID := 'cefdc036-bc4c-434e-93d8-ce93ec2e9bd8'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-08', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('369d6e55-6b97-46c3-aa67-e68816ffcb1e', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-l'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '391bb2f5-029f-400e-9e1b-7a920ad19e97'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-08', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('bd7b9c4b-6770-4a54-9c3c-6175c7e0e993', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-bajo-4c-alice'),
    12.99, 3.03, 1, 1.4289, 0, 11.5611, 8.5311, 0.656744);
END $$;

DO $$ DECLARE sale_id UUID := 'e8151506-a489-457f-a07c-d660a4a92eac'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-08', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('b53fc8b5-5e28-48f7-8fdd-0229036a0c3a', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-bajo-4c-alice'),
    12.99, 3.03, 1, 1.4289, 0, 11.5611, 8.5311, 0.656744);
END $$;

DO $$ DECLARE sale_id UUID := '0594c328-c002-4e5d-846d-6c9ff2ab7df0'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-08', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('39126390-44ea-43f5-be31-3d9417ae4e84', sale_id,
    (SELECT id FROM products WHERE slug='pines-de-correa'),
    5.0, 0.01, 1, 0.55, 1.3, 3.15, 3.14, 0.628);
END $$;

DO $$ DECLARE sale_id UUID := 'd602c858-781e-48b9-862f-3be9baabca66'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-08', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('7927823b-1b5b-442c-bb01-2979a6057f8f', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'd7b34f39-a4ff-4bf0-b528-a9dd1936fded'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-08', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('f41e3f75-8db8-4b27-bc8f-b78e8851c788', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '02f7bc7a-b6d0-486d-a8ad-db5966046dc6'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-08', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('c5d49f3d-5843-40db-b7e0-3907efe1a397', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'dd1e1b45-3a77-42d4-ba17-afe759ded505'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-08', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('bc84e6c9-0bf1-4bd7-bbd8-052dbe8bca6d', sale_id,
    (SELECT id FROM products WHERE slug='hombrera-violin-34-44'),
    11.0, 2.69, 1, 1.21, 1.3, 8.49, 5.8, 0.527273);
END $$;

DO $$ DECLARE sale_id UUID := '2b2036b6-585a-4248-8e3e-dbda6a1ca4e4'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-09', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('0885c8dd-81e6-433b-a51e-ea4ce0211cbe', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'b66d9987-dea1-4924-821b-decad5053c47'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-09', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('47cbdb72-19fb-4476-b2ec-0c14ccc67cb4', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'bd7874e6-3429-4958-a663-efb4ce499312'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-09', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('2b5359fc-f608-4257-a9d7-87e93bf2836f', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-folk-11-52'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '43bab910-7308-40d4-9d0c-d6a558756dfa'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-09', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('95883e5c-a331-4bbe-bd79-389d32a68f73', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-bajo-4c-alice'),
    12.99, 3.03, 1, 1.4289, 1.3, 10.2611, 7.2311, 0.556667);
END $$;

DO $$ DECLARE sale_id UUID := 'ed0ca9e5-a6ad-4c7f-9844-516c0aac120a'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-11', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('56aaf6dd-bb39-413d-a090-ab1c1fcd5fae', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 0, 4.8861, 3.6761, 0.669599);
END $$;

DO $$ DECLARE sale_id UUID := 'ffdb26b3-3657-4559-8481-84dd66baa5da'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-12', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('a9e351c6-ff5d-4109-a5cc-111ab02c45a0', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'f426c1e9-1c60-44e2-a139-1ac38795c768'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-12', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('8318a1f8-23fd-4784-b103-58d834d27acd', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '69123f68-614a-4d10-9d44-9e9c81bf3140'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-12', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('e740f79c-b490-4307-bbc0-05397bcb7cfb', sale_id,
    (SELECT id FROM products WHERE slug='base-pared-guitarra-bajo'),
    4.99, 0.5, 1, 0.5489, 1.3, 3.1411, 2.6411, 0.529279);
END $$;

DO $$ DECLARE sale_id UUID := '97f1741f-0919-4c71-a46e-dc244e467e23'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-13', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('3359fe90-6ce8-4a4a-9443-1d6fbd1cb603', sale_id,
    (SELECT id FROM products WHERE slug='base-pared-guitarra-bajo'),
    4.99, 0.5, 1, 0.5489, 1.3, 3.1411, 2.6411, 0.529279);
END $$;

DO $$ DECLARE sale_id UUID := '3117f370-486a-41a6-af87-07e735808632'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-13', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('13804061-812e-444e-999d-e29302c2b3a7', sale_id,
    (SELECT id FROM products WHERE slug='correa-guitarra-bajo'),
    5.49, 0.2, 1, 0.6039, 1.3, 3.5861, 3.3861, 0.616776);
END $$;

DO $$ DECLARE sale_id UUID := '043cd147-1b11-41f5-8bd2-1bad5c8a7dd0'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-13', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('2b1a019f-7917-4f6e-901b-2f1ac91b16e8', sale_id,
    (SELECT id FROM products WHERE slug='clavijas-guitarra-clasica-plateadas'),
    9.99, 2.5, 1, 1.0989, 1.3, 7.5911, 5.0911, 0.50962);
END $$;

DO $$ DECLARE sale_id UUID := 'f078b091-2ec4-44d4-ac0f-e41106a21172'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-13', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('a5df0263-a514-4eb7-baf5-cf8afcc853a3', sale_id,
    (SELECT id FROM products WHERE slug='cable-hebikuo-xa03'),
    10.0, 1.91, 1, 1.1, 1.3, 7.6, 5.69, 0.569);
END $$;

DO $$ DECLARE sale_id UUID := '46559430-c85b-4aa0-8094-99abf16009aa'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-13', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('317171e6-95f3-4a1d-b611-6db785748dab', sale_id,
    (SELECT id FROM products WHERE slug='cejilla-cejuela'),
    5.0, 0.01, 1, 0.55, 0, 4.45, 4.44, 0.888);
END $$;

DO $$ DECLARE sale_id UUID := '680e1f9e-83a8-444b-9865-8e3b771a0659'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-13', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('2d735fe5-6f6d-461f-a82e-335acf43224e', sale_id,
    (SELECT id FROM products WHERE slug='base-pared-guitarra-bajo'),
    4.99, 0.5, 1, 0.5489, 1.3, 3.1411, 2.6411, 0.529279);
END $$;

DO $$ DECLARE sale_id UUID := '17964149-66c3-42dc-af6f-461f7726a8dc'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-13', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('1a3fefeb-60b2-4c34-bd26-529414f36a2d', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-bajo-4c-alice'),
    12.99, 3.03, 1, 1.4289, 1.3, 10.2611, 7.2311, 0.556667);
END $$;

DO $$ DECLARE sale_id UUID := '7dbf0289-88ef-48f2-8260-460a42cefcbf'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-14', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('275c2467-762e-431e-bb3b-a5d5706bb19a', sale_id,
    (SELECT id FROM products WHERE slug='base-pared-guitarra-bajo'),
    4.99, 0.5, 1, 0.5489, 1.3, 3.1411, 2.6411, 0.529279);
END $$;

DO $$ DECLARE sale_id UUID := '115c2adc-29b7-4e95-ba08-cc4d7a48dbca'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-14', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('6f835472-38c5-4f82-b361-3496c5fccb3e', sale_id,
    (SELECT id FROM products WHERE slug='base-pared-guitarra-bajo'),
    4.99, 0.5, 1, 0.5489, 0, 4.4411, 3.9411, 0.7898);
END $$;

DO $$ DECLARE sale_id UUID := 'b4638683-1f88-44af-953a-9000fb601bcf'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-14', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('63dd6934-3436-4dc7-b91e-02d4b658e7f7', sale_id,
    (SELECT id FROM products WHERE slug='capotraste'),
    6.99, 0.65, 1, 0.7689, 1.3, 4.9211, 4.2711, 0.61103);
END $$;

DO $$ DECLARE sale_id UUID := 'dfc3bfbb-f669-47f5-9c7c-db6aeee8a80a'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-14', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('48d5cebb-d5e5-4ee5-81a5-935b2966728b', sale_id,
    (SELECT id FROM products WHERE slug='capotraste'),
    6.99, 0.65, 1, 0.7689, 0, 6.2211, 5.5711, 0.79701);
END $$;

DO $$ DECLARE sale_id UUID := '7e461fb7-05d9-4871-9e03-f7971cc25cd7'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-14', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('0e80c313-8fc5-45eb-9bed-7fe202433567', sale_id,
    (SELECT id FROM products WHERE slug='clavijas-guitarra-clasica-plateadas'),
    9.99, 2.5, 1, 1.0989, 0, 8.8911, 6.3911, 0.63975);
END $$;

DO $$ DECLARE sale_id UUID := '240a90fe-326b-4789-931c-ba6b63b8b5fe'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-14', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('1a7396cf-9c02-4c79-b0d3-d820048f8729', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '13ac5bbf-219c-4c74-8f79-3cae4ab4ece5'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-14', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('43e0d0ee-3515-4cbb-898d-2f056e1ce4aa', sale_id,
    (SELECT id FROM products WHERE slug='cejilla-cejuela'),
    5.0, 0.01, 1, 0.55, 1.3, 3.15, 3.14, 0.628);
END $$;

DO $$ DECLARE sale_id UUID := '01b0be2b-0914-473b-a20f-80ef6be38811'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-14', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('09b17e76-eee9-4d18-bd9f-f7b50b1b3cbc', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'c98614f7-8350-44b8-8156-61883410a31a'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-14', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('397dc29d-0713-4fca-9217-e8610a9caf05', sale_id,
    (SELECT id FROM products WHERE slug='clavijas-guitarra-clasica-plateadas'),
    12.99, 2.5, 1, 1.4289, 0, 11.5611, 9.0611, 0.697544);
END $$;

DO $$ DECLARE sale_id UUID := 'ac4df683-036f-4024-819b-82ad4786cc8c'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-15', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('93562d9c-13c5-4edc-818f-7b6f8e1b205f', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-l'),
    5.49, 1.21, 1, 0.6039, 0, 4.8861, 3.6761, 0.669599);
END $$;

DO $$ DECLARE sale_id UUID := 'f312d21b-45d0-474c-b9f9-027b023836e1'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-16', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('9f60400d-9d85-4a1b-993c-5b0865bbff5b', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-bajo-4c-alice'),
    12.99, 3.03, 1, 1.4289, 1.3, 10.2611, 7.2311, 0.556667);
END $$;

DO $$ DECLARE sale_id UUID := '9635cc04-eb80-43b7-949b-0435f97f0d9f'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-16', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('ed6ec7b0-e568-4e23-87f2-832fbb16e969', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    19.99, 1.21, 1, 2.1989, 0, 17.7911, 16.5811, 0.82947);
END $$;

DO $$ DECLARE sale_id UUID := 'a4bad4e6-2898-40ca-8abf-36ae66490363'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-16', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('92589872-66d0-4505-aad0-4d7967b1b6db', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'be444fc6-c166-4a5b-b7af-0e69566c6bd2'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-16', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('95d39222-ddb6-4a65-a607-295b09bf2f45', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-bajo-4c-alice'),
    12.99, 3.03, 1, 1.4289, 1.3, 10.2611, 7.2311, 0.556667);
END $$;

DO $$ DECLARE sale_id UUID := '014132bb-4cb7-4220-b117-c522a8152ae9'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-16', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('f8639d10-656d-4ebd-8b2d-1e0feae5401a', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '69e463b0-f0a8-4a62-ad05-9a8dbdfdf19f'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-18', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('3fa7f2c0-1f0c-48df-928f-d8c9870700c5', sale_id,
    (SELECT id FROM products WHERE slug='hombrera-violin-34-44'),
    11.0, 2.69, 1, 1.21, 1.3, 8.49, 5.8, 0.527273);
END $$;

DO $$ DECLARE sale_id UUID := '55b6087c-b18f-4a25-91f4-7b20cf725c20'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-18', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('560b2465-681d-4fdd-96b5-44a5bbbdfde9', sale_id,
    (SELECT id FROM products WHERE slug='hombrera-violin-34-44'),
    11.0, 2.69, 1, 1.21, 1.3, 8.49, 5.8, 0.527273);
END $$;

DO $$ DECLARE sale_id UUID := '05e544c3-28a7-44f8-8273-98f0d03975f6'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-19', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('a5c04b48-f27a-4eff-aa56-40ca1cca7d5f', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '8b2276b8-d291-4fa0-8b62-3eb158743550'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-19', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('14cbef1b-9ba2-4cad-9bc7-62b53f2389a4', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-l'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'ba5393e9-61d6-4d7b-9f6c-00c88dfa532b'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-19', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('91f07908-0ece-48c6-a5ea-e1f4967f85f4', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 0, 4.8861, 3.6761, 0.669599);
END $$;

DO $$ DECLARE sale_id UUID := 'b6526eab-3184-47d4-8c3e-5727963616ce'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-19', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('34bebcd9-b8a8-4290-9de5-865dc3881ca4', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-folk-11-52'),
    5.49, 1.21, 1, 0.6039, 0, 4.8861, 3.6761, 0.669599);
END $$;

DO $$ DECLARE sale_id UUID := 'df0f75bf-228a-41e3-82d1-2d1cea00198e'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-20', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('4e2719cf-02f1-446b-8965-14f9bc6b6002', sale_id,
    (SELECT id FROM products WHERE slug='cable-hebikuo-xa03'),
    10.0, 1.91, 1, 1.1, 0, 8.9, 6.99, 0.699);
END $$;

DO $$ DECLARE sale_id UUID := 'cc42c32f-7b7d-476b-8e2c-f446711cdcdb'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-20', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('fbac6469-fd99-48a4-a767-4895d2bcf7c1', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-violin-44'),
    4.99, 1.06, 1, 0.5489, 1.3, 3.1411, 2.0811, 0.417054);
END $$;

DO $$ DECLARE sale_id UUID := '17115b3d-17fc-449f-93b6-911b9ef0a873'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-20', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('0003152f-cbad-4d15-822e-12126bf7bd5c', sale_id,
    (SELECT id FROM products WHERE slug='cable-hebikuo-xa03'),
    10.0, 1.91, 1, 1.1, 0, 8.9, 6.99, 0.699);
END $$;

DO $$ DECLARE sale_id UUID := '4c47a3fd-f70c-4392-b9df-eb6ffe441214'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-20', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('96003350-1a7b-4f79-989b-b18610703c8f', sale_id,
    (SELECT id FROM products WHERE slug='clavijas-guitarra-clasica-doradas'),
    9.99, 2.5, 1, 1.0989, 0, 8.8911, 6.3911, 0.63975);
END $$;

DO $$ DECLARE sale_id UUID := '34cef0b7-94ae-4940-a50c-e04c91871fdc'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-20', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('8128e359-964e-4bc2-b5cf-b682bdc8c994', sale_id,
    (SELECT id FROM products WHERE slug='hombrera-violin-34-44'),
    11.0, 2.69, 1, 1.21, 1.3, 8.49, 5.8, 0.527273);
END $$;

DO $$ DECLARE sale_id UUID := '7aae4132-5467-48e2-b6eb-cefc0b3666c3'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-20', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('064dd287-61dc-46bd-9894-23a880e0f74e', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-l'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'afb1a166-33b5-4563-bb2a-aa297629e21c'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-20', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('c8f9a3b0-6646-407b-9711-f80ac1337b09', sale_id,
    (SELECT id FROM products WHERE slug='hombrera-violin-34-44'),
    11.0, 2.69, 1, 1.21, 1.3, 8.49, 5.8, 0.527273);
END $$;

DO $$ DECLARE sale_id UUID := '62975be4-fba3-4b3e-97e7-3814d538aeb1'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-20', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('587d954f-eb96-4394-a122-b570294fa821', sale_id,
    (SELECT id FROM products WHERE slug='clavijas-guitarra-clasica-plateadas'),
    12.99, 2.5, 1, 1.4289, 1.3, 10.2611, 7.7611, 0.597467);
END $$;

DO $$ DECLARE sale_id UUID := '31f2113c-4394-4e03-9987-90417eeaa607'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-20', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('51a64d15-1146-49cf-9879-399397810e89', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 0, 4.8861, 3.6761, 0.669599);
END $$;

DO $$ DECLARE sale_id UUID := '9a364db1-9225-4f70-b206-f9405ff3f552'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-20', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('ebdaa969-45b9-4170-b779-5bc11312c652', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '61c67a2c-4dea-4db9-a8d4-260ed76444f7'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-20', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('6893f835-f97c-414b-b437-f5bf1d803abb', sale_id,
    (SELECT id FROM products WHERE slug='pines-de-correa'),
    5.0, 0.01, 1, 0.55, 1.3, 3.15, 3.14, 0.628);
END $$;

DO $$ DECLARE sale_id UUID := 'cd22eb48-5366-43fc-928c-b5b393b0d7af'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-21', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('13da2391-d289-45c8-93c3-2037cddd5c79', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '0c824ed5-8fc6-4689-bbf1-9ca0af975dd3'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-21', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('472b5c9d-bebd-4747-abb8-191e7b5253b2', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-sl'),
    5.49, 1.21, 1, 0.6039, 0, 4.8861, 3.6761, 0.669599);
END $$;

DO $$ DECLARE sale_id UUID := '45573645-838d-42ec-9a68-5b09f21604e1'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-21', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('0c3a8abb-6449-4efd-868a-0a4c87e7e97a', sale_id,
    (SELECT id FROM products WHERE slug='base-pared-guitarra-bajo'),
    4.99, 0.5, 1, 0.5489, 1.3, 3.1411, 2.6411, 0.529279);
END $$;

DO $$ DECLARE sale_id UUID := '4d89ff7d-6232-4e7b-bc38-f1e93f75fec0'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-21', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('0b26efe6-a642-40c0-a6fa-246c1c65c943', sale_id,
    (SELECT id FROM products WHERE slug='base-pared-guitarra-bajo'),
    4.99, 0.5, 1, 0.5489, 0, 4.4411, 3.9411, 0.7898);
END $$;

DO $$ DECLARE sale_id UUID := '3a1e94e8-fb04-451b-9fbd-198a2fd29312'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-21', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('fb8f614d-6c49-4516-b411-e4919ba54128', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-l'),
    39.99, 1.21, 1, 4.3989, 0, 35.5911, 34.3811, 0.859742);
END $$;

DO $$ DECLARE sale_id UUID := '94e1afc4-1fab-491f-976e-3a020a80a9eb'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-21', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('9f3bc66b-9f6c-40e6-89cb-d4de1f4aa054', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := 'cb52b598-a2df-4e15-a37e-d5eab8c3bd87'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-21', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('cb49c59c-0b19-469e-a923-60dc705ad691', sale_id,
    (SELECT id FROM products WHERE slug='clavijas-guitarra-clasica-doradas'),
    9.99, 2.5, 1, 1.0989, 1.3, 7.5911, 5.0911, 0.50962);
END $$;

DO $$ DECLARE sale_id UUID := '6d6d8dbe-5cc7-4685-8b7e-36f6b5c054c2'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-21', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('f78b5a06-3a4b-4a47-8945-4524752459d3', sale_id,
    (SELECT id FROM products WHERE slug='cable-hebikuo-xa03'),
    10.0, 1.91, 1, 1.1, 1.3, 7.6, 5.69, 0.569);
END $$;

DO $$ DECLARE sale_id UUID := '398102cb-3d84-49a9-8afa-c1cba1301e8d'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-21', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('92d2a5ce-5d3a-4c72-86a1-39aa05240338', sale_id,
    (SELECT id FROM products WHERE slug='pines-de-correa'),
    5.0, 0.01, 1, 0.55, 1.3, 3.15, 3.14, 0.628);
END $$;

DO $$ DECLARE sale_id UUID := '52e61e60-9afa-4790-9ad6-d9505b2ec63c'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-22', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('81f6074f-622d-49ab-b998-407c773e1db0', sale_id,
    (SELECT id FROM products WHERE slug='cable-hebikuo-xa03'),
    10.0, 1.91, 1, 1.1, 1.3, 7.6, 5.69, 0.569);
END $$;

DO $$ DECLARE sale_id UUID := 'fec1ded9-0018-4121-8b8c-93cf4a821745'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-22', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('8fbf023b-3a93-44ad-8b45-4fd4d32a7404', sale_id,
    (SELECT id FROM products WHERE slug='base-pared-guitarra-bajo'),
    4.99, 0.5, 1, 0.5489, 1.3, 3.1411, 2.6411, 0.529279);
END $$;

DO $$ DECLARE sale_id UUID := '1359c609-f3c8-4c02-80ee-04d693f71267'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-22', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('92cd63c7-5ae0-4818-8423-22ca77a53b06', sale_id,
    (SELECT id FROM products WHERE slug='base-pared-guitarra-bajo'),
    4.99, 0.5, 1, 0.5489, 0, 4.4411, 3.9411, 0.7898);
END $$;

DO $$ DECLARE sale_id UUID := '30f67f7c-5372-4d89-9766-74eb1fc322d5'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-22', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('d3aa98cf-947a-4b03-b2ef-a36750292c93', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-electrica-l'),
    5.49, 1.21, 1, 0.6039, 0, 4.8861, 3.6761, 0.669599);
END $$;

DO $$ DECLARE sale_id UUID := '1c83dbd2-ab79-49d9-9228-3ccb8cd47ff9'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-22', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('67a0ecea-5f50-478d-b642-bde90535af6e', sale_id,
    (SELECT id FROM products WHERE slug='base-pared-guitarra-bajo'),
    4.99, 0.5, 1, 0.5489, 1.3, 3.1411, 2.6411, 0.529279);
END $$;

DO $$ DECLARE sale_id UUID := 'd6286440-380e-4769-8145-fbb37095d50b'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-22', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('834c97eb-5f71-4fbd-b673-b6e792506ce6', sale_id,
    (SELECT id FROM products WHERE slug='base-pared-guitarra-bajo'),
    4.99, 0.5, 1, 0.5489, 0, 4.4411, 3.9411, 0.7898);
END $$;

DO $$ DECLARE sale_id UUID := '07e5c4f9-161d-4920-b5ff-40f4c63ff9ce'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-22', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('e388d5a1-0e4c-4549-b434-7df3e000ad82', sale_id,
    (SELECT id FROM products WHERE slug='base-pared-guitarra-bajo'),
    4.99, 0.5, 1, 0.5489, 0, 4.4411, 3.9411, 0.7898);
END $$;

DO $$ DECLARE sale_id UUID := 'f4cc0673-b41f-4319-90c2-2966c6336f1f'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-22', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('1637db23-1167-4418-8b4a-92841fd523d0', sale_id,
    (SELECT id FROM products WHERE slug='base-pared-guitarra-bajo'),
    4.99, 0.5, 1, 0.5489, 0, 4.4411, 3.9411, 0.7898);
END $$;

DO $$ DECLARE sale_id UUID := 'd231ac25-ab58-454f-8d0a-45fe53fe9faa'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-22', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('51f2f898-f21d-4e58-9960-44b2b89cb38b', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 1.3, 3.5861, 2.3761, 0.432805);
END $$;

DO $$ DECLARE sale_id UUID := '830d6b31-04f7-4808-8263-ed223912e029'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-22', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('8ce2a02e-c4e4-4edd-b3ef-a7ea1efe547f', sale_id,
    (SELECT id FROM products WHERE slug='cejilla-cejuela'),
    5.0, 0.01, 1, 0.55, 1.3, 3.15, 3.14, 0.628);
END $$;

DO $$ DECLARE sale_id UUID := '5cc3ef52-fb4d-4c5d-ac33-7bf949bea7d2'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-22', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('229928ab-5446-495b-88b4-cc576ba618dd', sale_id,
    (SELECT id FROM products WHERE slug='hombrera-violin-34-44'),
    11.0, 2.69, 1, 1.21, 1.3, 8.49, 5.8, 0.527273);
END $$;

DO $$ DECLARE sale_id UUID := '3a019542-2992-4a15-ba06-5c847cd8789f'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-23', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('2e1304e2-0101-4b54-bbdf-2461c1b5b4c4', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-alice-clasica-a106'),
    5.49, 1.21, 1, 0.6039, 0, 4.8861, 3.6761, 0.669599);
END $$;

DO $$ DECLARE sale_id UUID := '012d673a-02ca-4637-bb55-141a01f21f50'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-23', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('aeb85cf3-b367-4dea-a609-3aa109e6566e', sale_id,
    (SELECT id FROM products WHERE slug='baqueta-bateria-5a'),
    5.0, 0.71, 1, 0.55, 1.3, 3.15, 2.44, 0.488);
END $$;

DO $$ DECLARE sale_id UUID := 'bf3d29f1-f2f6-43fd-bd67-58201edf3d95'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-23', 'mercadolibre', FALSE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('e93756da-1114-478f-864f-4187ec30011e', sale_id,
    (SELECT id FROM products WHERE slug='baqueta-bateria-7a'),
    5.0, 0.71, 1, 0.55, 0, 4.45, 3.74, 0.748);
END $$;

DO $$ DECLARE sale_id UUID := '571f9624-33a9-4056-a3f4-30bdb3a84ac5'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-23', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('234b0a1e-dfb0-4ac5-8427-e8deaa01b845', sale_id,
    (SELECT id FROM products WHERE slug='hombrera-violin-34-44'),
    11.0, 2.69, 1, 1.21, 1.3, 8.49, 5.8, 0.527273);
END $$;

DO $$ DECLARE sale_id UUID := '4a3fee9d-29cf-41c2-bbfb-1a4af5861089'; BEGIN
  INSERT INTO sales (id, sale_date, channel, ml_free_shipping, ml_commission_rate, shipping_cost_usd)
  VALUES (sale_id, '2026-04-23', 'mercadolibre', TRUE, 0.11, 1.3);

  INSERT INTO sale_items (id, sale_id, product_id, unit_price_usd, unit_cost_usd, quantity, ml_commission_usd, shipping_cost_usd, net_income_usd, gross_profit_usd, margin_pct)
  VALUES ('343cbc85-934b-4cf2-b1a6-456f9fc2d5a2', sale_id,
    (SELECT id FROM products WHERE slug='cuerdas-violin-44'),
    4.99, 1.06, 1, 0.5489, 1.3, 3.1411, 2.0811, 0.417054);
END $$;