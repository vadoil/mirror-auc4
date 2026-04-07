import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "valid" | "used" | "invalid" | "done" | "error">("loading");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    fetch(`${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${token}`, {
      headers: { apikey: anonKey },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.valid === true) setStatus("valid");
        else if (data.reason === "already_unsubscribed") setStatus("used");
        else setStatus("invalid");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  const handleUnsubscribe = async () => {
    if (!token) return;
    setProcessing(true);
    try {
      const { data } = await supabase.functions.invoke("handle-email-unsubscribe", { body: { token } });
      if (data?.success) setStatus("done");
      else if (data?.reason === "already_unsubscribed") setStatus("used");
      else setStatus("error");
    } catch { setStatus("error"); }
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="font-display text-3xl text-foreground">Отписка от рассылки</h1>
        {status === "loading" && <p className="text-muted-foreground">Проверка...</p>}
        {status === "valid" && (
          <>
            <p className="text-muted-foreground">Вы уверены, что хотите отписаться от уведомлений?</p>
            <button
              onClick={handleUnsubscribe}
              disabled={processing}
              className="bg-primary text-primary-foreground px-8 py-3 text-sm uppercase tracking-widest hover:opacity-90 transition disabled:opacity-50"
            >
              {processing ? "Обработка..." : "Отписаться"}
            </button>
          </>
        )}
        {status === "done" && <p className="text-foreground">Вы успешно отписались от уведомлений.</p>}
        {status === "used" && <p className="text-muted-foreground">Вы уже отписались ранее.</p>}
        {status === "invalid" && <p className="text-destructive">Недействительная ссылка для отписки.</p>}
        {status === "error" && <p className="text-destructive">Произошла ошибка. Попробуйте позже.</p>}
      </div>
    </div>
  );
};

export default Unsubscribe;
