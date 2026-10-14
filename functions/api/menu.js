import { query, jsonResponse, errorResponse } from './_db.js';

export async function onRequestGet(context) {
  try {
    const categories = await query(
      'SELECT id, name, slug, image_key, sort_order FROM categories WHERE is_active = 1 ORDER BY sort_order'
    );
    
    const dishes = await query(
      'SELECT id, category_id, name, description, price, group_name, sort_order, is_active FROM dishes ORDER BY sort_order'
    );

    const menu = {};
    for (const cat of categories) {
      const catDishes = dishes.filter(d => d.category_id === cat.id && d.is_active === 1);
      
      // Agrupar por group_name preservando el orden de aparición
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