import { query, jsonResponse, errorResponse } from './_db.js';

export async function onRequestGet(context) {
  try {
    const categories = await query(
      'SELECT id, name, slug, image_key, sort_order FROM categories WHERE is_active = 1 ORDER BY sort_order'
    );
    
    const dishes = await query(
      'SELECT id, category_id, name, description, price, sort_order, is_active FROM dishes ORDER BY sort_order'
    );

    const menu = {};
    for (const cat of categories) {
      menu[cat.name] = {
        im: cat.image_key || '',
        g: [{
          t: cat.name,
          r: dishes
            .filter(d => d.category_id === cat.id && d.is_active === 1)
            .map(d => ({
              n: d.name,
              d: d.description,
              p: d.price
            }))
        }]
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
