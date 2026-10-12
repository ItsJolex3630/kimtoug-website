// Turso database helper using HTTP API
const TURSO_URL = () => {
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) throw new Error('TURSO_DATABASE_URL not set');
  return url.replace(/^libsql:\/\//, 'https://') + '/v2/pipeline';
};

const TURSO_TOKEN = () => {
  const token = process.env.TURSO_AUTH_TOKEN;
  if (!token) throw new Error('TURSO_AUTH_TOKEN not set');
  return token;
};

function encodeArg(value) {
  if (value === null || value === undefined) return { type: 'null' };
  if (typeof value === 'number') {
    if (Number.isInteger(value)) return { type: 'integer', value: String(value) };
    return { type: 'float', value: String(value) };
  }
  if (typeof value === 'boolean') return { type: 'integer', value: value ? '1' : '0' };
  return { type: 'text', value: String(value) };
}

function decodeValue(value, type) {
  if (value === null || value === undefined) return null;
  if (type === 'integer') return parseInt(value, 10);
  if (type === 'float') return parseFloat(value);
  if (type === 'text') return value;
  if (type === 'blob') return value;
  return value;
}

export async function query(sql, args = []) {
  const body = {
    requests: [
      {
        type: 'execute',
        stmt: {
          sql,
          args: args.map(encodeArg)
        }
      }
    ]
  };

  const res = await fetch(TURSO_URL(), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TURSO_TOKEN()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Turso API error: ${res.status} ${text}`);
  }

  const data = await res.json();

  if (!data.results || !data.results.length) {
    return [];
  }

  const result = data.results[0];
  if (result.type !== 'ok' || !result.response?.result) {
    throw new Error('Turso query failed: ' + JSON.stringify(result));
  }

  const { cols, rows } = result.response.result;
  return rows.map(row => {
    const obj = {};
    for (let i = 0; i < cols.length; i++) {
      obj[cols[i].name] = decodeValue(row[i].value, row[i].type);
    }
    return obj;
  });
}

export async function execute(sql, args = []) {
  return query(sql, args);
}

export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}

export function errorResponse(message, status = 500) {
  return jsonResponse({ error: message }, status);
}

export function checkAdminAuth(request) {
  const auth = request.headers.get('Authorization') || '';
  const expected = `Bearer ${process.env.ADMIN_API_KEY || ''}`;
  if (!process.env.ADMIN_API_KEY) return false;
  return auth === expected;
}
