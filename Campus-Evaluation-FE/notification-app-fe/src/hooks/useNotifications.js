import { useState, useEffect } from "react";
import { fetchNotifications } from "../apis/notifications";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchNotifications();
        if (!mounted) return;
        const items = data.notifications ?? [];
        setNotifications(items);
        setTotal(data.total ?? items.length ?? 0);
      } catch (err) {
        if (!mounted) return;
        setError(err.message ?? String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil((total || 0) / 10));

  return { notifications, total, totalPages, loading, error };
}
