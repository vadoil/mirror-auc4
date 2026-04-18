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

    if (!utm_source && !utm_medium && !utm_campaign) {
      console.log("[utm] no utm params, skip");
      return;
    }

    // дедуп: тот же набор UTM в рамках одной вкладки логируем один раз
    const key = `utm_logged:${utm_source || ""}:${utm_medium || ""}:${utm_campaign || ""}`;
    if (sessionStorage.getItem(key)) {
      console.log("[utm] already logged in this session", key);
      return;
    }
    sessionStorage.setItem(key, "1");

    const payload = {
      utm_source,
      utm_medium,
      utm_campaign,
      landing_page: location.pathname + location.search,
      referrer: document.referrer || null,
    };
    console.log("[utm] inserting", payload);

    supabase
      .from("utm_visits")
      .insert(payload)
      .then(({ error }) => {
        if (error) {
          console.warn("[utm] insert failed", error.message, error);
          // снимаем дедуп, чтобы можно было повторить
          sessionStorage.removeItem(key);
        } else {
          console.log("[utm] inserted ok");
        }
      });
  }, [location.pathname, location.search]);

  return null;
};

export default UtmTracker;
