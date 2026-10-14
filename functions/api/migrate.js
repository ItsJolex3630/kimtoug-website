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

    return jsonResponse({ success: true, logs });
  } catch (e) {
    return errorResponse(e.message, 500);
  }
}