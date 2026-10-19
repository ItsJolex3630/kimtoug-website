import { query, jsonResponse, errorResponse, checkAdminAuth } from './_db.js';

// Contador de pedidos del día. Se reinicia cada día a las 00:00 (hora de Venezuela, UTC-4).
function today() {
  return new Date(Date.now() - 4 * 3600 * 1000).toISOString().slice(0, 10);
}

async function ensureTable() {
  await query('CREATE TABLE IF NOT EXISTS daily_orders (day TEXT PRIMARY KEY, count INTEGER NOT NULL DEFAULT 0)');
}

// Registrar un pedido enviado (+1 al contador de hoy)
export async function onRequestPost() {
  try {
    await ensureTable();
    await query(
      'INSERT INTO daily_orders (day, count) VALUES (?, 1) ON CONFLICT(day) DO UPDATE SET count = count + 1',
      [today()]
    );
    return jsonResponse({ ok: true });
  } catch (e) {
    return errorResponse(e.message, 500);
  }
}

// Consultar pedidos de hoy (solo admin)
export async function onRequestGet(context) {
  if (!checkAdminAuth(context.request)) {
    return errorResponse('Unauthorized', 401);
  }
  try {
    await ensureTable();
    const rows = await query('SELECT count FROM daily_orders WHERE day = ?', [today()]);
    return jsonResponse({ day: today(), count: rows.length ? rows[0].count : 0 }, 200, { 'Cache-Control': 'no-store' });
  } catch (e) {
    return errorResponse(e.message, 500);
  }
}

export async function onRequestOptions() {
  return jsonResponse({});
}
