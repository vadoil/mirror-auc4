import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Gavel } from "lucide-react";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "forgot") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      setLoading(false);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Ссылка для восстановления отправлена на email");
        setMode("login");
      }
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error("Неверный email или пароль");
      return;
    }
    toast.success("Вы вошли в систему");
    navigate("/lots");
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
          {mode === "login" ? "Вход" : "Восстановление"}
        </h1>
        <p className="text-cream/40 text-xs font-body mb-6 leading-relaxed">
          {mode === "login"
            ? "Личный кабинет — для участников прошлого аукциона. Чтобы участвовать в текущих торгах, регистрация не нужна — просто оставьте заявку на странице лота."
            : "Введите email для получения ссылки"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary transition-colors"
            required
          />
          {mode === "login" && (
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary transition-colors"
              required
              minLength={6}
            />
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-4 text-xs uppercase tracking-[0.2em] font-body font-medium hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? "Загрузка..." : mode === "login" ? "Войти" : "Отправить ссылку"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          {mode === "login" ? (
            <button
              onClick={() => setMode("forgot")}
              className="block w-full text-cream/40 text-xs font-body hover:text-cream/60 transition-colors"
            >
              Забыли пароль?
            </button>
          ) : (
            <button
              onClick={() => setMode("login")}
              className="text-cream/40 text-xs font-body hover:text-cream/60 transition-colors"
            >
              Вернуться к входу
            </button>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-cream/10">
          <p className="text-cream/50 text-xs font-body leading-relaxed text-center">
            Регистрация новых участников — через куратора онлайн-торгов{" "}
            <span className="text-cream/80">Александры Павловой</span>:
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-2 text-xs font-body">
            <a href="tel:+79623646646" className="text-primary/90 hover:text-primary transition-colors">
              +7 (962) 364-66-46
            </a>
            <a
              href="https://t.me/alexa_ah_alexa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/90 hover:text-primary transition-colors"
            >
              @alexa_ah_alexa
            </a>
          </div>
        </div>

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

export default Auth;
