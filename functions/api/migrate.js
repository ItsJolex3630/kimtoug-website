import { query, jsonResponse, errorResponse } from './_db.js';

export async function onRequestGet(context) {
  try {
    const logs = [];

    // 1. Asegurar columna group_name
    try {
      await query('ALTER TABLE dishes ADD COLUMN group_name TEXT');
      logs.push('Columna group_name añadida a dishes');
    } catch (e) {
      logs.push('Columna group_name ya existe o no se pudo alterar: ' + e.message);
    }

    // 2. Renombrar categoría Arroces a Arroz si existe
    await query("UPDATE categories SET name = 'Arroz', slug = 'arroz' WHERE slug = 'arroces' OR name = 'Arroces'");
    await query("UPDATE categories SET name = 'Chop suey (vegetales)' WHERE slug = 'chop-suey'");
    logs.push('Categorias actualizadas');

    // 3. Asignar subgrupos de Platos
    const platoUpdates = [
      ['Agridulce', '%agridulce%'],
      ['Fuyoung (tortillas)', '%Fu yong%'],
      ['Fuyoung (tortillas)', '%Fuyoung%'],
      ['Carnes', '%con vegetales%'],
      ['Salsa de miel', '%miel%'],
      ['Salsa de curry', '%curry%'],
      ['Plato caliente', '%Ocho sabores%']
    ];

    for (const [group, pattern] of platoUpdates) {
      await query(
        `UPDATE dishes SET group_name = ? WHERE category_id = (SELECT id FROM categories WHERE slug = 'platos') AND name LIKE ?`,
        [group, pattern]
      );
    }
    logs.push('Subgrupos de platos asignados');

    // 4. Actualizar Lumpias
    await query("UPDATE dishes SET description = 'Crujientes rollos primavera rellenos de vegetales y jamón' WHERE name LIKE '%Lumpia%'");

    // 5. Limpiar descripciones de Bebidas y ajustar precios
    await query("UPDATE dishes SET description = '' WHERE category_id = (SELECT id FROM categories WHERE slug = 'bebidas')");
    await query("UPDATE dishes SET price = '$1' WHERE name = 'Refresco botella'");
    await query("UPDATE dishes SET price = '$2' WHERE name LIKE 'Refresco 1%' AND name NOT LIKE 'Refresco 1.5%' AND name NOT LIKE 'Refresco 1,5%'");
    await query("UPDATE dishes SET price = '$2,50' WHERE name LIKE 'Refresco 1.5%' OR name LIKE 'Refresco 1,5%'");
    await query("UPDATE dishes SET price = '$3' WHERE name LIKE 'Refresco 2%'");
    await query("UPDATE dishes SET price = '$1,50' WHERE name LIKE 'Agua 600%'");
    logs.push('Bebidas actualizadas');

    // 6. Actualización quirúrgica de descripciones del menú
    const dishDescriptionUpdates = [
      ['Chop suey con cerdo', 'Cerdo en tiras con vegetales salteados'],
      ['Chop suey con jamón', 'Jamón en cubos y pimiento rojo con vegetales'],
      ['Chop suey con vegetales', 'Brócoli, zanahoria y pimiento salteados al wok'],
      ['Tallarín especial', 'Fideos con pollo, jamón y vegetales'],
      ['Tallarín con pollo', 'Fideos suaves con pollo y vegetales'],
      ['Tallarín con cerdo', 'Fideos con cerdo en tiras y cebolla'],
      ['Tallarín con camarones', 'Fideos con camarones, pimentón y cebolla'],
      ['Tallarín con carne', 'Fideos con ternera salteada y vegetales'],
      ['Pollo agridulce', 'Pollo rebozado crujiente en salsa agridulce'],
      ['Fuyoung especial', 'Tortilla esponjosa con pollo, jamón y vegetales'],
      ['Fuyoung con pollo', 'Tortilla china con pollo y vegetales al wok'],
      ['Carne con vegetales', 'Tiras de ternera salteadas con vegetales frescos'],
      ['Pollo con vegetales', 'Trozos de pollo salteados con vegetales frescos'],
      ['Cerdo con vegetales', 'Cerdo salteado con vegetales frescos al wok'],
      ['Pollo con salsa de miel', 'Pollo crujiente en salsa de miel con ajonjolí'],
      ['Costillas con salsa de miel', 'Costillas glaseadas en salsa de miel con crutones y ajonjolí'],
      ['Carne al curry', 'Ternera salteada al curry con pimentón y cebolla'],
      ['Pollo al curry', 'Pollo al curry con pimentón y cebolla'],
      ['Ocho sabores', 'Pollo, cerdo, camarones, carne y todos los vegetales']
    ];
    for (const [name, desc] of dishDescriptionUpdates) {
      await query('UPDATE dishes SET description = ? WHERE name = ?', [desc, name]);
    }
    logs.push('Descripciones de platos actualizadas');

    // 7. Asegurar tabla users y cuenta de admin
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        name TEXT,
        google_id TEXT UNIQUE,
        role TEXT DEFAULT 'customer',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await query(`
      INSERT INTO users (email, name, role) VALUES ('jolex3630@gmail.com', 'Joel (Admin)', 'admin')
      ON CONFLICT(email) DO UPDATE SET role = 'admin'
    `);
    await query(`
      INSERT INTO users (email, name, role) VALUES ('barrestaurantkimtougca@gmail.com', 'Kimtoug Restaurant (Admin)', 'admin')
      ON CONFLICT(email) DO UPDATE SET role = 'admin'
    `);
    logs.push('Tabla users y usuarios admin (Joel y Kimtoug Restaurant) verificados');

    return jsonResponse({ success: true, logs });
  } catch (e) {
    return errorResponse(e.message, 500);
  }
}