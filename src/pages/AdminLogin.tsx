import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Try sign in first
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      // If credentials invalid, try signing up
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) {
        toast.error("Ошибка: " + signUpError.message);
        setLoading(false);
        return;
      }
      // Try login again after signup
      const { error: retryError } = await supabase.auth.signInWithPassword({ email, password });
      if (retryError) {
        toast.error("Аккаунт создан, попробуйте войти снова");
        setLoading(false);
        return;
      }
    }
    setLoading(false);
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-warm-black flex items-center justify-center p-4">
      <div className="bg-charcoal border border-cream/10 w-full max-w-sm p-8">
        <h1 className="font-display text-3xl text-cream uppercase tracking-tight mb-2">Админ</h1>
        <p className="text-cream/40 text-xs font-body mb-8">Панель управления</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary transition-colors"
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary transition-colors"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-4 text-xs uppercase tracking-[0.2em] font-body font-medium hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>

        <a href="/" className="block text-center mt-6 text-cream/30 text-xs font-body hover:text-cream/60 transition-colors">
          ← На главную
        </a>
      </div>
    </div>
  );
};

export default AdminLogin;
