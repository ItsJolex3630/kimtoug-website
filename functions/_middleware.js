export async function onRequest(context) {
  // Asegurar compatibilidad de process.env en Cloudflare Pages Edge Runtime
  if (typeof globalThis.process === 'undefined') {
    globalThis.process = { env: context.env || {} };
  } else {
    globalThis.process.env = { ...(globalThis.process.env || {}), ...(context.env || {}) };
  }
  return context.next();
}
