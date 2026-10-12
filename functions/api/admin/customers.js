import { query, jsonResponse, errorResponse, checkAdminAuth } from '../_db.js';

export async function onRequestGet(context) {
  if (!checkAdminAuth(context.request)) {
    return errorResponse('Unauthorized', 401);
  }

  try {
    const customers = await query(
      'SELECT * FROM customers ORDER BY created_at DESC'
    );
    return jsonResponse(customers);
  } catch (e) {
    return errorResponse(e.message, 500);
  }
}

export async function onRequestPost(context) {
  // Public endpoint to register customers (no auth required)
  try {
    const body = await context.request.json();
    const { name, email, phone, address, notes } = body;

    if (!name) {
      return errorResponse('name is required', 400);
    }

    const result = await query(
      `INSERT INTO customers (name, email, phone, address, notes) 
       VALUES (?, ?, ?, ?, ?) RETURNING *`,
      [name, email || '', phone || '', address || '', notes || '']
    );

    return jsonResponse(result[0], 201);
  } catch (e) {
    return errorResponse(e.message, 500);
  }
}

export async function onRequestOptions() {
  return jsonResponse({});
}
