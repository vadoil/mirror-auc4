import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Gavel } from "lucide-react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for the PASSWORD_RECOVERY event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });
    // Also check hash for type=recovery
    if (window.location.hash.includes("type=recovery")) {
      setReady(true);
    }
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Пароль должен содержать минимум 6 символов");
      return;
    }
    if (password !== confirm) {
      toast.error("Пароли не совпадают");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Пароль успешно изменён");
      navigate("/lots");
    }
  };

  return (
    <div className="min-h-screen bg-warm-black flex items-center justify-center p-4">
      <div className="bg-charcoal border border-cream/10 w-full max-w-md p-8 md:p-10">
        <a href="/" className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 border border-primary flex items-center justify-center">
            <Gavel className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display text-xl text-cream uppercase tracking-[0.15em]">
            Отражение
          </span>
        </a>

        <h1 className="font-display text-3xl text-cream uppercase tracking-tight mb-1">
          Новый пароль
        </h1>
        <p className="text-cream/40 text-xs font-body mb-8">
          Введите новый пароль для вашего аккаунта
        </p>

        {!ready ? (
          <p className="text-cream/50 text-sm font-body">
            Загрузка... Если вы перешли не по ссылке из письма, запросите восстановление на{" "}
            <a href="/auth" className="text-primary hover:underline">странице входа</a>.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Новый пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary transition-colors"
              required
              minLength={6}
            />
            <input
              type="password"
              placeholder="Повторите пароль"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary transition-colors"
              required
              minLength={6}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-4 text-xs uppercase tracking-[0.2em] font-body font-medium hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? "Сохранение..." : "Сохранить пароль"}
            </button>
          </form>
        )}

        <a
          href="/"
          className="block text-center mt-6 text-cream/30 text-xs font-body hover:text-cream/60 transition-colors"
        >
          ← На главную
        </a>
      </div>
    </div>
  );
};

export default ResetPassword;
