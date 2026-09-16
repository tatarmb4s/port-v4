let pending;
const fields = ['ip', 'hostname', 'location', 'connection', 'company', 'carrier', 'security', 'time_zone', 'currency', 'user_agent'];

export function collectVisitorGeolocation() {
  if (!pending) pending = lookup();
  return pending;
}

async function lookup() {
  const key = process.env.REACT_APP_IPREGISTRY_API_KEY;
  if (!key) return { status: 'disabled' };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    // Origin lookup runs in the visitor's browser, outside our Docker proxy chain.
    const response = await fetch(`https://api.ipregistry.co/?key=${encodeURIComponent(key)}&hostname=true`, {
      signal: controller.signal, credentials: 'omit', referrerPolicy: 'origin',
    });
    if (!response.ok) return { status: 'unavailable' };
    const raw = await response.json();
    if (typeof raw?.ip !== 'string') return { status: 'unavailable' };
    const result = { status: 'ok' };
    for (const field of fields) if (raw[field] !== undefined) result[field] = raw[field];
    return JSON.stringify(result).length <= 16384 ? result : { status: 'unavailable' };
  } catch {
    return { status: 'unavailable' };
  } finally {
    clearTimeout(timer);
  }
}

export async function reportVisit(backendUrl, path) {
  const geolocation = await collectVisitorGeolocation();
  try {
    await fetch(backendUrl + '/visit', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path, geolocation }),
    });
  } catch { /* Analytics must not prevent browsing or chatting. */ }
}
