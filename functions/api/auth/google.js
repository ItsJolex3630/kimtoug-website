import { query, jsonResponse, errorResponse } from '../_db.js';

const GOOGLE_CLIENT_ID = '368451259646-lvkp7q372m712rsj2adbidam4d72g4m0.apps.googleusercontent.com';
const ADMIN_EMAILS = [
  'jolex3630@gmail.com',
  'barrestaurantkimtougca@gmail.com'
];

export async function onRequestPost(context) {
  try {
    const body = await context.request.json().catch(() => ({}));
    const credential = body.credential;

    if (!credential) {
      return errorResponse('Token de Google no proporcionado', 400);
    }

    // 1. Validar el token directamente con los servidores de Google
    const verifyUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`;
    const googleRes = await fetch(verifyUrl);

    if (!googleRes.ok) {
      return errorResponse('Token de Google inválido o expirado', 401);
    }

    const payload = await googleRes.json();

    // 2. Verificar la audiencia (Client ID) y que el correo esté verificado
    if (payload.aud !== GOOGLE_CLIENT_ID) {
      return errorResponse('Audiencia del token no coincide con Kimtoug', 403);
    }

    if (payload.email_verified !== 'true' && payload.email_verified !== true) {
      return errorResponse('El correo de Google no está verificado', 403);
    }

    const email = (payload.email || '').toLowerCase().trim();
    const name = payload.name || 'Usuario';
    const googleId = payload.sub;
    const picture = payload.picture || '';

    // 3. Asegurar que la tabla users exista
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

    // 4. Buscar usuario en Turso
    const users = await query('SELECT id, email, name, role FROM users WHERE email = ?', [email]);
    let user;

    const isAdminEmail = ADMIN_EMAILS.includes(email);

    if (!users.length) {
      // Si es el correo del dueño/admin, otorgar rol 'admin'
      const initialRole = isAdminEmail ? 'admin' : 'customer';
      await query(
        'INSERT INTO users (email, name, google_id, role) VALUES (?, ?, ?, ?)',
        [email, name, googleId, initialRole]
      );
      user = { email, name, role: initialRole };
    } else {
      user = users[0];
      // Si es el correo admin pero no tenía rol admin, ascenderlo
      if (isAdminEmail && user.role !== 'admin') {
        await query('UPDATE users SET role = ? WHERE id = ?', ['admin', user.id]);
        user.role = 'admin';
      }
      // Actualizar google_id y nombre
      await query('UPDATE users SET google_id = ?, name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [googleId, name, user.id]);
    }

    const isAdmin = user.role === 'admin';
    const adminKey = isAdmin ? (context.env?.ADMIN_API_KEY || (typeof globalThis !== 'undefined' && globalThis.process?.env?.ADMIN_API_KEY) || '') : null;

    return jsonResponse({
      ok: true,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
        picture,
        isAdmin,
        adminKey
      }
    });
  } catch (err) {
    return errorResponse('Error interno al autenticar con Google: ' + err.message, 500);
  }
}
