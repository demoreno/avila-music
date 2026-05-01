-- =============================================
-- 002_products.sql — 27 products mapped to subcategories
-- =============================================

-- Guitarra Clásica
INSERT INTO products (name, slug, subcategory_id, cost_usd, price_usd, stock_minimum, stock_total) VALUES
('Cuerdas Alice Clasica A106',          'cuerdas-alice-clasica-a106',          (SELECT id FROM categories WHERE slug='guitarra-clasica'),     1.21,  5.49, 40, 80),
('Clavijas Guitarra Clasica Doradas',   'clavijas-guitarra-clasica-doradas',   (SELECT id FROM categories WHERE slug='guitarra-clasica'),     2.50,  9.99,  5, 14),
('Clavijas Guitarra Clasica Plateadas', 'clavijas-guitarra-clasica-plateadas', (SELECT id FROM categories WHERE slug='guitarra-clasica'),     2.50, 12.99,  5, 10),
('Cejilla/Cejuela',                     'cejilla-cejuela',                     (SELECT id FROM categories WHERE slug='guitarra-clasica'),     0.01,  5.00, 20, 50);

-- Guitarra Eléctrica
INSERT INTO products (name, slug, subcategory_id, cost_usd, price_usd, stock_minimum, stock_total) VALUES
('Cuerdas Alice Electrica SL',          'cuerdas-alice-electrica-sl',          (SELECT id FROM categories WHERE slug='guitarra-electrica'),   1.21,  5.49, 20, 69),
('Cuerdas Alice Electrica L',           'cuerdas-alice-electrica-l',           (SELECT id FROM categories WHERE slug='guitarra-electrica'),   1.21,  5.49, 20, 55),
('Daddario 10-46 Electrica',            'daddario-10-46-electrica',            (SELECT id FROM categories WHERE slug='guitarra-electrica'),   6.00, 14.00,  3,  0),
('Daddario 09-44 Electrica',            'daddario-09-44-electrica',            (SELECT id FROM categories WHERE slug='guitarra-electrica'),   6.00, 14.00,  3,  0),
('Ernie Ball Power Slinky',             'ernie-ball-power-slinky',             (SELECT id FROM categories WHERE slug='guitarra-electrica'),   5.00, 14.00,  2,  0),
('Ernie Ball Super Slinky',             'ernie-ball-super-slinky',             (SELECT id FROM categories WHERE slug='guitarra-electrica'),   5.00, 14.00,  2,  0),
('Ernie Ball Regular Slinky',           'ernie-ball-regular-slinky',           (SELECT id FROM categories WHERE slug='guitarra-electrica'),   5.00, 14.00,  2,  0);

-- Guitarra Acústica
INSERT INTO products (name, slug, subcategory_id, cost_usd, price_usd, stock_minimum, stock_total) VALUES
('Cuerdas Alice Folk 11-52',            'cuerdas-alice-folk-11-52',            (SELECT id FROM categories WHERE slug='guitarra-acustica'),    1.21,  5.49, 20, 59),
('Pickguard Negro Guitarra Acustica',   'pickguard-negro-acustica',            (SELECT id FROM categories WHERE slug='guitarra-acustica'),    0.50,  5.00,  5,  0);

-- Accesorios de Guitarra
INSERT INTO products (name, slug, subcategory_id, cost_usd, price_usd, stock_minimum, stock_total) VALUES
('Correa Guitarra/Bajo',                'correa-guitarra-bajo',                (SELECT id FROM categories WHERE slug='accesorios-guitarra'),  0.20,  5.49, 10, 21),
('Base pared Guitarra/Bajo',            'base-pared-guitarra-bajo',            (SELECT id FROM categories WHERE slug='accesorios-guitarra'),  0.50,  4.99, 20, 58),
('Capotraste',                          'capotraste',                          (SELECT id FROM categories WHERE slug='accesorios-guitarra'),  0.65,  6.99, 10, 21),
('Pines de Correa',                     'pines-de-correa',                     (SELECT id FROM categories WHERE slug='accesorios-guitarra'),  0.01,  5.00, 20, 40),
('Cable Pedales',                       'cable-pedales',                       (SELECT id FROM categories WHERE slug='accesorios-guitarra'),  2.30, 14.00,  5,  0);

-- Bajo Eléctrico
INSERT INTO products (name, slug, subcategory_id, cost_usd, price_usd, stock_minimum, stock_total) VALUES
('Cuerdas Bajo 4C Alice',               'cuerdas-bajo-4c-alice',               (SELECT id FROM categories WHERE slug='bajo-electrico'),       3.03, 12.99, 10, 13);

-- Accesorios de Bajo
INSERT INTO products (name, slug, subcategory_id, cost_usd, price_usd, stock_minimum, stock_total) VALUES
('Clavijas de Bajo Mariposa Detallado', 'clavijas-bajo-mariposa',              (SELECT id FROM categories WHERE slug='accesorios-bajo'),      2.00, 10.00,  4,  0);

-- Violín
INSERT INTO products (name, slug, subcategory_id, cost_usd, price_usd, stock_minimum, stock_total) VALUES
('Cuerdas de Violin 4/4',               'cuerdas-violin-44',                   (SELECT id FROM categories WHERE slug='violin'),               1.06,  4.99, 10, 40);

-- Accesorios de Violín
INSERT INTO products (name, slug, subcategory_id, cost_usd, price_usd, stock_minimum, stock_total) VALUES
('Hombrera Violin 3/4 4/4',             'hombrera-violin-34-44',               (SELECT id FROM categories WHERE slug='accesorios-violin'),    2.69, 11.00, 20, 32);

-- Viola
INSERT INTO products (name, slug, subcategory_id, cost_usd, price_usd, stock_minimum, stock_total) VALUES
('Cuerdas de Viola A90',                'cuerdas-viola-a90',                   (SELECT id FROM categories WHERE slug='viola'),                1.48,  6.00,  5,  6);

-- Accesorios de Batería
INSERT INTO products (name, slug, subcategory_id, cost_usd, price_usd, stock_minimum, stock_total) VALUES
('Baqueta Bateria 5A',                  'baqueta-bateria-5a',                  (SELECT id FROM categories WHERE slug='accesorios-bateria'),   0.71,  5.00,  5,  0),
('Baqueta Bateria 7A',                  'baqueta-bateria-7a',                  (SELECT id FROM categories WHERE slug='accesorios-bateria'),   0.71,  5.00,  5,  0),
('Baqueta Bateria 5B',                  'baqueta-bateria-5b',                  (SELECT id FROM categories WHERE slug='accesorios-bateria'),   0.71,  5.00,  5,  0);

-- Cables
INSERT INTO products (name, slug, subcategory_id, cost_usd, price_usd, stock_minimum, stock_total) VALUES
('Cable Hebikuo XA03',                  'cable-hebikuo-xa03',                  (SELECT id FROM categories WHERE slug='cables'),               1.91, 10.00, 10, 13);
