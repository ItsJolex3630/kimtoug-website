import { query, jsonResponse, errorResponse, checkAdminAuth } from '../../_db.js';

export async function onRequestGet(context) {
  if (!checkAdminAuth(context.request)) {
    return errorResponse('Unauthorized', 401);
  }

  try {
    const categories = await query(
      'SELECT * FROM categories ORDER BY sort_order'
    );
    return jsonResponse(categories);
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
    const { name, slug, image_key, sort_order, is_active } = body;

    if (!name || !slug) {
      return errorResponse('name and slug are required', 400);
    }

    const result = await query(
      `INSERT INTO categories (name, slug, image_key, sort_order, is_active) 
       VALUES (?, ?, ?, ?, ?) RETURNING *`,
      [name, slug, image_key || '', sort_order ?? 0, is_active ?? 1]
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
    if (!id) return errorResponse('Category ID required', 400);
    const body = await context.request.json();
    const { name, slug, image_key, sort_order, is_active } = body;

    const result = await query(
      `UPDATE categories 
       SET name = ?, slug = ?, image_key = ?, sort_order = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ? RETURNING *`,
      [name, slug, image_key, sort_order, is_active, id]
    );

    if (!result.length) return errorResponse('Category not found', 404);
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
    if (!id) return errorResponse('Category ID required', 400);
    await query('DELETE FROM categories WHERE id = ?', [id]);
    return jsonResponse({ success: true });
  } catch (e) {
    return errorResponse(e.message, 500);
  }
}

export async function onRequestOptions() {
  return jsonResponse({});
}
