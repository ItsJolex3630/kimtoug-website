import { query, jsonResponse, errorResponse } from './_db.js';

export async function onRequestGet(context) {
  try {
    const categories = await query(
      'SELECT id, name, slug, image_key, sort_order FROM categories WHERE is_active = 1 ORDER BY sort_order'
    );
    
    let dishes;
    try {
      dishes = await query(
        'SELECT id, category_id, name, description, price, group_name, sort_order, is_active FROM dishes ORDER BY sort_order'
      );
    } catch (dbErr) {
      // Si la columna group_name no existe aún en Turso, intentar añadirla automáticamente
      if (dbErr.message && dbErr.message.includes('group_name')) {
        try {
          await query('ALTER TABLE dishes ADD COLUMN group_name TEXT');
          dishes = await query(
            'SELECT id, category_id, name, description, price, group_name, sort_order, is_active FROM dishes ORDER BY sort_order'
          );
        } catch (alterErr) {
          // Si falla el alter, consultar con group_name como NULL
          dishes = await query(
            'SELECT id, category_id, name, description, price, NULL as group_name, sort_order, is_active FROM dishes ORDER BY sort_order'
          );
        }
      } else {
        throw dbErr;
      }
    }

    const menu = {};
    for (const cat of categories) {
      const catDishes = dishes.filter(d => d.category_id === cat.id && d.is_active === 1);
      
      const groupsMap = new Map();
      for (const d of catDishes) {
        const groupTitle = d.group_name || cat.name;
        if (!groupsMap.has(groupTitle)) {
          groupsMap.set(groupTitle, []);
        }
        groupsMap.get(groupTitle).push({
          n: d.name,
          d: d.description || '',
          p: d.price
        });
      }

      const gList = Array.from(groupsMap.entries()).map(([t, r]) => ({ t, r }));

      menu[cat.name] = {
        im: cat.image_key || '',
        g: gList.length > 0 ? gList : [{ t: cat.name, r: [] }]
      };
    }

    return jsonResponse(menu);
  } catch (e) {
    return errorResponse(e.message, 500);
  }
}

export async function onRequestOptions() {
  return jsonResponse({});
}