import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Sparkles, Heart, Users, Download, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import forumBanner from "@/assets/forum-women-banner.png";

const themes = [
  { icon: Sparkles, title: "Велнес и красота", text: "Лучшие практики ухода за собой, здоровье, биохакинг." },
  { icon: Heart, title: "Осознанность", text: "Эмоциональный интеллект, отношения, материнство." },
  { icon: Users, title: "Сообщество", text: "Женские круги, наставничество, нетворкинг без границ." },
];

const Forum = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", message: "" });
  const [privacy, setPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Заполните имя, email и телефон");
      return;
    }
    if (!privacy) {
      toast.error("Необходимо согласие с политикой конфиденциальности");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("forum_registrations" as any).insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      city: form.city.trim() || null,
      message: form.message.trim() || null,
    });
    if (error) {
      setLoading(false);
      toast.error("Не удалось отправить заявку. Попробуйте позже.");
      return;
    }
    supabase.functions.invoke("notify-telegram", {
      body: {
        event: "forum_registration",
        data: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          city: form.city.trim() || undefined,
          message: form.message.trim() || undefined,
        },
      },
    });
    setLoading(false);
    toast.success("Заявка принята! Мы свяжемся с вами ближе к форуму.");
    setForm({ name: "", email: "", phone: "", city: "", message: "" });
    setPrivacy(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 section-padding bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={forumBanner} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 justify-center mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/60 font-body">
                Следующий шаг
              </p>
              <div className="w-8 h-px bg-primary" />
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-cream leading-[0.9] mb-6">
              Форум{" "}
              <span className="italic text-primary">«Отражение»</span>
            </h1>
            <p className="font-body text-base md:text-lg text-cream/70 max-w-2xl mx-auto leading-relaxed mb-8">
              Масштабное собрание женщин о велнесе, осознанности и инвестициях в себя.
              Спикеры, мастер-классы и сообщество единомышленниц.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
              <div className="flex items-center gap-2 text-cream/70 font-body">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Осень 2026</span>
              </div>
              <div className="flex items-center gap-2 text-cream/70 font-body">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Москва</span>
              </div>
            </div>
            <a
              href="#registration"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-xs uppercase tracking-[0.2em] font-body font-medium hover:opacity-90 transition-all"
            >
              Оставить заявку <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-cream/40 text-[11px] font-body mt-4">Участие бесплатное · по предварительной заявке</p>
          </motion.div>
        </div>
      </section>

      {/* Themes */}
      <section className="py-16 md:py-24 section-padding bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-body mb-4">
              О чём форум
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground tracking-tight mb-4">
              Три направления, <span className="italic text-primary">одна цель</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {themes.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="bg-card border border-border p-8 rounded-lg"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <t.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">{t.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{t.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-12 md:py-16 section-padding bg-charcoal">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-cream/40 font-body mb-3">Материалы</p>
            <h2 className="font-display text-3xl md:text-4xl text-cream tracking-tight">
              Презентации форума
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/docs/presentation-speakers.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-cream/5 border border-cream/10 hover:border-primary/30 transition-all p-5 rounded"
            >
              <Download className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="font-body text-sm font-medium text-cream">Презентация форума</p>
                <p className="font-body text-xs text-cream/40">PDF, для спикеров</p>
              </div>
            </a>
            <a
              href="/docs/presentation-sponsors.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-cream/5 border border-cream/10 hover:border-primary/30 transition-all p-5 rounded"
            >
              <Download className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="font-body text-sm font-medium text-cream">Для спонсоров</p>
                <p className="font-body text-xs text-cream/40">PDF, партнёрское предложение</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Registration form */}
      <section id="registration" className="py-16 md:py-24 section-padding bg-background">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-body mb-4">
              Заявка на участие
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground tracking-tight mb-4">
              Хочу <span className="italic text-primary">на форум</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground">
              Бесплатное участие по предварительной заявке. Места ограничены — мы напишем ближе к дате.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={submit}
            className="space-y-3 bg-card border border-border p-6 md:p-8 rounded-lg"
          >
            <input
              type="text"
              placeholder="Ваше имя *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-background border border-border text-foreground px-4 py-3 text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded"
              required
              maxLength={100}
            />
            <input
              type="email"
              placeholder="Email *"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-background border border-border text-foreground px-4 py-3 text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded"
              required
              maxLength={255}
            />
            <input
              type="tel"
              placeholder="Телефон *"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-background border border-border text-foreground px-4 py-3 text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded"
              required
              maxLength={30}
            />
            <input
              type="text"
              placeholder="Город"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full bg-background border border-border text-foreground px-4 py-3 text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded"
              maxLength={100}
            />
            <textarea
              placeholder="Расскажите немного о себе или задайте вопрос"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-background border border-border text-foreground px-4 py-3 text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none h-24 rounded"
              maxLength={500}
            />
            <label className="flex items-start gap-3 cursor-pointer group pt-1">
              <input
                type="checkbox"
                checked={privacy}
                onChange={(e) => setPrivacy(e.target.checked)}
                className="mt-1 w-4 h-4 accent-primary"
              />
              <span className="text-muted-foreground text-xs font-body leading-relaxed group-hover:text-foreground/80 transition-colors">
                Я ознакомлен(а) с{" "}
                <Link to="/privacy" target="_blank" className="text-primary/80 hover:text-primary underline transition-colors">
                  политикой конфиденциальности
                </Link>{" "}
                и даю согласие на обработку персональных данных
              </span>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-4 text-xs uppercase tracking-[0.2em] font-body font-medium hover:opacity-90 transition-all disabled:opacity-50 rounded"
            >
              {loading ? "Отправка…" : "Оставить заявку"}
            </button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Forum;
