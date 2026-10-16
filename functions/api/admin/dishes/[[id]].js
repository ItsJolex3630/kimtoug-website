import { query, jsonResponse, errorResponse, checkAdminAuth } from '../../_db.js';

export async function onRequestGet(context) {
  if (!checkAdminAuth(context.request)) {
    return errorResponse('Unauthorized', 401);
  }

  try {
    const dishes = await query(
      `SELECT d.*, c.name AS category_name, c.slug AS category_slug 
       FROM dishes d 
       JOIN categories c ON d.category_id = c.id 
       ORDER BY c.sort_order, d.sort_order`
    );
    return jsonResponse(dishes);
  } catch (e) {
    return errorResponse(e.message, 500);
  }
}

export async function onRequestPost(context) {
  if (!checkAdminAuth(context.request)) {
    return errorResponse('Unauthorized', 401);
  }

  try {
    const body = await context.request.json();
    const { category_id, name, description, price, sort_order, is_active } = body;

    if (!category_id || !name || !price) {
      return errorResponse('category_id, name and price are required', 400);
    }

    const result = await query(
      `INSERT INTO dishes (category_id, name, description, price, sort_order, is_active) 
       VALUES (?, ?, ?, ?, ?, ?) RETURNING *`,
      [category_id, name, description || '', price, sort_order ?? 0, is_active ?? 1]
    );

    return jsonResponse(result[0], 201);
  } catch (e) {
    return errorResponse(e.message, 500);
  }
}

export async function onRequestPut(context) {
  if (!checkAdminAuth(context.request)) {
    return errorResponse('Unauthorized', 401);
  }

  try {
    const id = context.params.id;
    if (!id) return errorResponse('Dish ID required', 400);
    const body = await context.request.json();
    const { category_id, name, description, price, sort_order, is_active } = body;

    const result = await query(
      `UPDATE dishes 
       SET category_id = ?, name = ?, description = ?, price = ?, sort_order = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ? RETURNING *`,
      [category_id, name, description, price, sort_order, is_active, id]
    );

    if (!result.length) return errorResponse('Dish not found', 404);
    return jsonResponse(result[0]);
  } catch (e) {
    return errorResponse(e.message, 500);
  }
}

export async function onRequestDelete(context) {
  if (!checkAdminAuth(context.request)) {
    return errorResponse('Unauthorized', 401);
  }

  try {
    const id = context.params.id;
    if (!id) return errorResponse('Dish ID required', 400);
    await query('DELETE FROM dishes WHERE id = ?', [id]);
    return jsonResponse({ success: true });
  } catch (e) {
    return errorResponse(e.message, 500);
  }
}

export async function onRequestOptions() {
  return jsonResponse({});
}
