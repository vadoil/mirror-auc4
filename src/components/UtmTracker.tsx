import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

/**
 * Логирует заход с UTM-метками в таблицу utm_visits.
 * Срабатывает только если в URL есть utm_source / utm_medium / utm_campaign.
 * Один и тот же визит (sessionStorage) логируется один раз.
 */
const UtmTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const utm_source = params.get("utm_source");
    const utm_medium = params.get("utm_medium");
    const utm_campaign = params.get("utm_campaign");

    if (!utm_source && !utm_medium && !utm_campaign) return;

    // дедуп: тот же набор UTM в рамках одной вкладки логируем один раз
    const key = `utm_logged:${utm_source || ""}:${utm_medium || ""}:${utm_campaign || ""}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");

    supabase
      .from("utm_visits")
      .insert({
        utm_source,
        utm_medium,
        utm_campaign,
        landing_page: location.pathname + location.search,
        referrer: document.referrer || null,
      })
      .then(({ error }) => {
        if (error) console.warn("[utm] insert failed", error.message);
      });
  }, [location.pathname, location.search]);

  return null;
};

export default UtmTracker;
