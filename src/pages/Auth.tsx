import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Gavel } from "lucide-react";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
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

    if (mode === "register") {
      if (!privacyConsent) {
        toast.error("Необходимо согласие с политикой конфиденциальности");
        setLoading(false);
        return;
      }
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      });
      setLoading(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Регистрация прошла успешно!");
      navigate("/lots");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        toast.error("Неверный email или пароль");
        return;
      }
      toast.success("Вы вошли в систему");
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
          {mode === "login" ? "Вход" : mode === "register" ? "Регистрация" : "Восстановление"}
        </h1>
        <p className="text-cream/40 text-xs font-body mb-8">
          {mode === "login"
            ? "Войдите, чтобы делать ставки на аукционе"
            : mode === "register"
            ? "Создайте аккаунт для участия в аукционе"
            : "Введите email для получения ссылки"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <input
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary transition-colors"
              required
              maxLength={100}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary transition-colors"
            required
          />
          {mode !== "forgot" && (
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
            {loading
              ? "Загрузка..."
              : mode === "login"
              ? "Войти"
              : mode === "register"
              ? "Зарегистрироваться"
              : "Отправить ссылку"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          {mode === "login" && (
            <button
              onClick={() => setMode("forgot")}
              className="block w-full text-cream/40 text-xs font-body hover:text-cream/60 transition-colors"
            >
              Забыли пароль?
            </button>
          )}
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-cream/40 text-xs font-body hover:text-cream/60 transition-colors"
          >
            {mode === "login"
              ? "Нет аккаунта? Зарегистрироваться"
              : "Уже есть аккаунт? Войти"}
          </button>
        </div>

        <a
          href="/"
          className="block text-center mt-4 text-cream/30 text-xs font-body hover:text-cream/60 transition-colors"
        >
          ← На главную
        </a>
      </div>
    </div>
  );
};

export default Auth;
