export async function fetchNotifications() {
  try {
    // Use a relative path so local dev servers can proxy the request
    const res = await fetch('/evaluation-service/notifications', {
      headers: { Accept: 'application/json' },
      // include credentials if cookies/session auth are used
      credentials: 'include',
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`${res.status} ${text}`);
    }

    const data = await res.json();
    // If the endpoint returns an array, normalize to { notifications: [...] }
    if (Array.isArray(data)) return { notifications: data };
    return data;
  } catch (err) {
    // Re-throw to let callers handle presentation of errors
    throw err;
  }
}
