-- Seed data for Kimtoug menu (Actualizado según reunión con cliente)

-- 1. ENTRADAS
INSERT INTO categories (name, slug, image_key, sort_order) VALUES ('Entradas', 'entradas', 'lum', 0);
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Lumpias (2 uds)', 'Crujientes rollos primavera rellenos de vegetales y jamón', '$3', NULL, 0 FROM categories WHERE slug = 'entradas';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Papas fritas', 'Papas doradas corte rústico con sal marina', '$4', NULL, 1 FROM categories WHERE slug = 'entradas';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Costillas sal y pimienta', 'Costillas de cerdo marinadas, fritas crujientes', '$8', NULL, 2 FROM categories WHERE slug = 'entradas';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Cerdo asado', 'Cerdo laqueado estilo cantonés, tierno y jugoso', '$12', NULL, 3 FROM categories WHERE slug = 'entradas';

-- 2. ARROZ (En singular)
INSERT INTO categories (name, slug, image_key, sort_order) VALUES ('Arroz', 'arroz', 'arr', 1);
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Arroz especial', 'Pollo, jamón y vegetales salteados al wok', '$5', NULL, 0 FROM categories WHERE slug = 'arroz';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Arroz con pollo', 'Trozos de pollo jugoso con vegetales frescos', '$6', NULL, 1 FROM categories WHERE slug = 'arroz';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Arroz pollo y camarones', 'Pollo tierno y camarones salteados con salsa de soja', '$7', NULL, 2 FROM categories WHERE slug = 'arroz';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Arroz pollo y cerdo', 'Pollo y cerdo asado con vegetales mixtos', '$7', NULL, 3 FROM categories WHERE slug = 'arroz';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Arroz con cerdo asado', 'Cerdo laqueado en cubos con cebolleta', '$7', NULL, 4 FROM categories WHERE slug = 'arroz';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Arroz con camarones', 'Camarones salteados con cebollín', '$7,50', NULL, 5 FROM categories WHERE slug = 'arroz';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Arroz con jamón', 'Jamón en cubos con huevo revuelto', '$5', NULL, 6 FROM categories WHERE slug = 'arroz';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Arroz con huevo', 'Huevo batido y cebollín', '$5', NULL, 7 FROM categories WHERE slug = 'arroz';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Arroz carne y lechuga', 'Ternera salteada y lechuga fresca', '$7', NULL, 8 FROM categories WHERE slug = 'arroz';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Arroz cantonesa', 'Pollo y cerdo', '$7', NULL, 9 FROM categories WHERE slug = 'arroz';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Arroz especial de la casa', 'Pollo, jamón, cerdo, camarón y vegetales', '$7,50', NULL, 10 FROM categories WHERE slug = 'arroz';

-- 3. CHOP SUEY (Vegetales)
INSERT INTO categories (name, slug, image_key, sort_order) VALUES ('Chop suey (vegetales)', 'chop-suey', 'cho', 2);
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Chop suey especial', 'Pollo, jamón y vegetales crujientes en salsa', '$6', NULL, 0 FROM categories WHERE slug = 'chop-suey';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Chop suey con pollo', 'Pollo en tiras con brotes de soya y zanahoria', '$7', NULL, 1 FROM categories WHERE slug = 'chop-suey';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Chop suey pollo y camarones', 'Pollo y camarones con vegetales al dente', '$7,50', NULL, 2 FROM categories WHERE slug = 'chop-suey';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Chop suey pollo y cerdo', 'Pollo y cerdo asado con vegetales mixtos', '$7,50', NULL, 3 FROM categories WHERE slug = 'chop-suey';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Chop suey con cerdo', 'Cerdo en tiras con vegetales al wok (sin col ni champiñones)', '$7,50', NULL, 4 FROM categories WHERE slug = 'chop-suey';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Chop suey con camarones', 'Camarones jugosos con vegetales al wok', '$8', NULL, 5 FROM categories WHERE slug = 'chop-suey';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Chop suey con jamón', 'Jamón y pimiento (sin brotes de soya)', '$6', NULL, 6 FROM categories WHERE slug = 'chop-suey';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Chop suey con carne', 'Ternera en tiras finas con vegetales frescos', '$7', NULL, 7 FROM categories WHERE slug = 'chop-suey';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Chop suey con vegetales', 'Salteado de vegetales frescos (sin col ni brotes de soya)', '$6', NULL, 8 FROM categories WHERE slug = 'chop-suey';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Chop suey especial casa', 'Pollo, jamón, cerdo, camarón y vegetales', '$8', NULL, 9 FROM categories WHERE slug = 'chop-suey';

-- 4. TALLARINES
INSERT INTO categories (name, slug, image_key, sort_order) VALUES ('Tallarines', 'tallarines', '', 3);
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Tallarín especial', 'Fideos con pollo, jamón y vegetales (sin huevo)', '$7,50', NULL, 0 FROM categories WHERE slug = 'tallarines';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Tallarín con pollo', 'Fideos con pollo y vegetales frescos', '$7,50', NULL, 1 FROM categories WHERE slug = 'tallarines';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Tallarín pollo y camarones', 'Fideos con pollo y camarones con vegetales', '$8', NULL, 2 FROM categories WHERE slug = 'tallarines';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Tallarín pollo y cerdo', 'Fideos con pollo y cerdo asado en salsa negra', '$8', NULL, 3 FROM categories WHERE slug = 'tallarines';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Tallarín con cerdo', 'Fideos con cerdo en tiras y cebolla (sin cebollín)', '$8', NULL, 4 FROM categories WHERE slug = 'tallarines';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Tallarín con camarones', 'Fideos con camarones, pimentón y cebolla (sin jengibre ni huevo)', '$9', NULL, 5 FROM categories WHERE slug = 'tallarines';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Tallarín con carne', 'Fideos con ternera salteada y vegetales (sin pimientos)', '$8', NULL, 6 FROM categories WHERE slug = 'tallarines';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Tallarín tres carnes', 'Fideos con carne, cerdo y pollo en salsa especial', '$9', NULL, 7 FROM categories WHERE slug = 'tallarines';

-- 5. PLATOS (Organizados en 6 subsecciones con group_name)
INSERT INTO categories (name, slug, image_key, sort_order) VALUES ('Platos', 'platos', 'agr', 4);

-- 5.1 Agridulce
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Pollo agridulce', 'Pollo rebozado crujiente bañado en salsa agridulce', '$8', 'Agridulce', 0 FROM categories WHERE slug = 'platos';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Costillas agridulces', 'Costillas tiernas glaseadas en salsa agridulce', '$8', 'Agridulce', 1 FROM categories WHERE slug = 'platos';

-- 5.2 Fuyoung (tortillas) - 4 platos
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Fuyoung especial', 'Tortilla esponjosa con pollo, jamón y vegetales', '$8', 'Fuyoung (tortillas)', 2 FROM categories WHERE slug = 'platos';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Fuyoung con pollo', 'Tortilla china con pollo y vegetales salteados al wok', '$8', 'Fuyoung (tortillas)', 3 FROM categories WHERE slug = 'platos';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Fuyoung con pollo y camarones', 'Tortilla rellena de pollo tierno y camarones', '$9', 'Fuyoung (tortillas)', 4 FROM categories WHERE slug = 'platos';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Fuyoung con pollo y cerdo asado', 'Tortilla con pollo, cerdo laqueado y vegetales', '$9', 'Fuyoung (tortillas)', 5 FROM categories WHERE slug = 'platos';

-- 5.3 Carnes
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Carne con vegetales', 'Ternera en tiras con vegetales frescos salteados al wok', '$15', 'Carnes', 6 FROM categories WHERE slug = 'platos';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Pollo con vegetales', 'Pechuga de pollo en trozos con vegetales frescos', '$15', 'Carnes', 7 FROM categories WHERE slug = 'platos';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Cerdo con vegetales', 'Cerdo asado con vegetales al wok', '$16', 'Carnes', 8 FROM categories WHERE slug = 'platos';

-- 5.4 Salsa de miel
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Pollo con salsa de miel', 'Pollo crujiente glaseado en salsa de miel y ajonjolí', '$9', 'Salsa de miel', 9 FROM categories WHERE slug = 'platos';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Costillas con salsa de miel', 'Costillas glaseadas en miel acompañadas de crutones y ajonjolí', '$9', 'Salsa de miel', 10 FROM categories WHERE slug = 'platos';

-- 5.5 Salsa de curry
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Carne al curry', 'Ternera salteada al curry con pimentón y cebolla', '$15', 'Salsa de curry', 11 FROM categories WHERE slug = 'platos';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Pollo al curry', 'Pollo salteado al curry con pimentón y cebolla', '$15', 'Salsa de curry', 12 FROM categories WHERE slug = 'platos';

-- 5.6 Plato caliente
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Ocho sabores', 'Combinación especial: pollo, cerdo, camarones, carne y vegetales frescos', '$18', 'Plato caliente', 13 FROM categories WHERE slug = 'platos';

-- 6. COMBOS (Sin cambios)
INSERT INTO categories (name, slug, image_key, sort_order) VALUES ('Combos', 'combos', 'com', 5);
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Combo N°1', 'Arroz frito + lumpia + costilla frita', '$7', NULL, 0 FROM categories WHERE slug = 'combos';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Combo N°2', 'Arroz frito + lumpia + chop suey', '$7', NULL, 1 FROM categories WHERE slug = 'combos';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Combo N°3', 'Arroz frito + lumpia + pollo agridulce', '$7', NULL, 2 FROM categories WHERE slug = 'combos';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Combo N°4', 'Arroz frito + papas fritas + pollo agridulce', '$7,50', NULL, 3 FROM categories WHERE slug = 'combos';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Combo N°5', 'Arroz frito + chop suey + costilla frita', '$7,50', NULL, 4 FROM categories WHERE slug = 'combos';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Combo N°6', 'Arroz frito + chop suey + pollo agridulce', '$7,50', NULL, 5 FROM categories WHERE slug = 'combos';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Kimtoug Kids', 'Pollo frito tierno + papas fritas doradas', '$6', NULL, 6 FROM categories WHERE slug = 'combos';

-- 7. BEBIDAS (Sin descripciones, precios actualizados)
INSERT INTO categories (name, slug, image_key, sort_order) VALUES ('Bebidas', 'bebidas', '', 6);
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Refresco botella', '', '$1', NULL, 0 FROM categories WHERE slug = 'bebidas';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Refresco 1 litro', '', '$2', NULL, 1 FROM categories WHERE slug = 'bebidas';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Refresco 1,5 litros', '', '$2,50', NULL, 2 FROM categories WHERE slug = 'bebidas';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Refresco 2 litros', '', '$3', NULL, 3 FROM categories WHERE slug = 'bebidas';
INSERT INTO dishes (category_id, name, description, price, group_name, sort_order) 
  SELECT id, 'Agua 600ml', '', '$1,50', NULL, 4 FROM categories WHERE slug = 'bebidas';