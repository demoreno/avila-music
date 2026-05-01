-- =============================================
-- 001_categories.sql
-- Root categories first, then subcategories (FK order)
-- =============================================

-- LEVEL 1: Root categories (parent_id = NULL)
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
('Guitarras',            'guitarras',           NULL, 1),
('Bajo',                 'bajo',                NULL, 2),
('Violín & Cuerdas',     'violin-cuerdas',      NULL, 3),
('Batería & Percusión',  'bateria-percusion',   NULL, 4),
('Electrónica & Cables', 'electronica-cables',  NULL, 5);

-- LEVEL 2: Subcategories (parent_id references root slugs above)

-- Guitarras
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
('Guitarra Clásica',       'guitarra-clasica',      (SELECT id FROM categories WHERE slug='guitarras'), 1),
('Guitarra Eléctrica',     'guitarra-electrica',    (SELECT id FROM categories WHERE slug='guitarras'), 2),
('Guitarra Acústica',      'guitarra-acustica',     (SELECT id FROM categories WHERE slug='guitarras'), 3),
('Accesorios de Guitarra', 'accesorios-guitarra',   (SELECT id FROM categories WHERE slug='guitarras'), 4);

-- Bajo
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
('Bajo Eléctrico',         'bajo-electrico',        (SELECT id FROM categories WHERE slug='bajo'), 1),
('Accesorios de Bajo',     'accesorios-bajo',       (SELECT id FROM categories WHERE slug='bajo'), 2);

-- Violín & Cuerdas
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
('Violín',                 'violin',                (SELECT id FROM categories WHERE slug='violin-cuerdas'), 1),
('Viola',                  'viola',                 (SELECT id FROM categories WHERE slug='violin-cuerdas'), 2),
('Accesorios de Violín',   'accesorios-violin',     (SELECT id FROM categories WHERE slug='violin-cuerdas'), 3);

-- Batería & Percusión
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
('Batería',                'bateria',               (SELECT id FROM categories WHERE slug='bateria-percusion'), 1),
('Accesorios de Batería',  'accesorios-bateria',    (SELECT id FROM categories WHERE slug='bateria-percusion'), 2);

-- Electrónica & Cables
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
('Cables',                 'cables',                (SELECT id FROM categories WHERE slug='electronica-cables'), 1),
('Pedales & Efectos',      'pedales-efectos',       (SELECT id FROM categories WHERE slug='electronica-cables'), 2);
