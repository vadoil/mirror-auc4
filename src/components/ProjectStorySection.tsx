import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, ArrowRight, Sparkles, Send, HeartHandshake, MapPinned, Wand2 } from "lucide-react";
import sashaPhoto from "@/assets/organizer-sasha-clean.png";
import gizaPhoto from "@/assets/organizer-giza-clean.png";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type City = "moscow" | "spb";

const ProjectStorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCity, setActiveCity] = useState<City>("moscow");
  const [spbOpen, setSpbOpen] = useState(false);
  const [moscowOpen, setMoscowOpen] = useState(false);
  const [spbForm, setSpbForm] = useState({ name: "", email: "", phone: "" });
  const [sending, setSending] = useState(false);

  const handleSpbSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spbForm.name || !spbForm.email) {
      toast.error("Укажите имя и email");
      return;
    }
    setSending(true);
    const { error } = await supabase.from("ticket_requests").insert({
      name: spbForm.name,
      email: spbForm.email,
      phone: spbForm.phone || null,
      ticket_type: "СПб – ноябрь 2026",
      message: "Запрос на детали мероприятия в Санкт-Петербурге",
    });
    setSending(false);
    if (error) {
      toast.error("Ошибка, попробуйте позже");
    } else {
      toast.success("Спасибо! Мы свяжемся с вами.");
      setSpbForm({ name: "", email: "", phone: "" });
    }
  };

  return (
    <section className="py-24 md:py-32 section-padding bg-background">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
              Как всё началось
            </p>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground leading-[0.95]">
            История <span className="italic text-primary">проекта</span>
          </h2>
        </motion.div>

        {/* Founders intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-muted/40 border border-border rounded-lg p-8 md:p-12">
            <p className="font-body text-base md:text-lg text-foreground leading-relaxed mb-6">
              Привет! Мы – <strong>Гиза</strong> и <strong>Саша</strong>, занимаемся проектами, бизнесом и благотворительностью в двух городах – Москве и Петербурге. Поэтому наш проект «ОТРАЖЕНИЕ ДОБРА», как инь и янь, будет объединять разные по вайбу, но объединённые одной целью события в наших городах.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Giza */}
              <div className="flex flex-col items-center text-center">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-4 border-2 border-primary/20">
                  <img src={gizaPhoto} alt="Гизела Тольц" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-display text-xl md:text-2xl font-light text-foreground mb-2">Гизела Тольц</h4>
                <ul className="font-body text-sm text-muted-foreground space-y-1 text-left">
                  <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />Организатор медицинских, коммерческих, корпоративных и частных мероприятий</li>
                  <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />10 лет работы с лучшими врачами и экспертами России и Европы</li>
                  <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />Автор проекта «Поговори с Гизой» – подкасты и поддержка женщин</li>
                </ul>
              </div>
              {/* Sasha */}
              <div className="flex flex-col items-center text-center">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-4 border-2 border-primary/20">
                  <img src={sashaPhoto} alt="Александра Павлова" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-display text-xl md:text-2xl font-light text-foreground mb-2">Александра Павлова</h4>
                <ul className="font-body text-sm text-muted-foreground space-y-1 text-left">
                  <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />Автор книги по поддержке женщин с раком щитовидной железы</li>
                  <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />Продюсер медицинских конференций</li>
                  <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />Предприниматель и попечитель фонда «Не напрасно»</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-10 mb-8 pt-6 border-t border-border">
              <div className="flex items-center justify-center gap-2.5">
                <HeartHandshake className="w-4 h-4 shrink-0 text-primary" strokeWidth={1.2} />
                <p className="font-display text-lg md:text-xl text-foreground italic">две подруги</p>
              </div>
              <div className="flex items-center justify-center gap-2.5">
                <MapPinned className="w-4 h-4 shrink-0 text-primary" strokeWidth={1.2} />
                <p className="font-display text-lg md:text-xl text-foreground italic">два города</p>
              </div>
              <div className="flex items-center justify-center gap-2.5">
                <Wand2 className="w-4 h-4 shrink-0 text-primary" strokeWidth={1.2} />
                <p className="font-display text-lg md:text-xl text-foreground italic">два формата</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 pt-4 border-t border-border">
              <Sparkles className="w-4 h-4 text-primary" />
              <p className="font-body text-sm text-muted-foreground">
                Одна цель – сбор средств в поддержку фонда{" "}
                <a
                  href="https://nenaprasno.ru/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline"
                >
                  «Не напрасно»
                </a>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Cities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-display text-2xl md:text-3xl text-foreground uppercase tracking-tight mb-8 text-center">
            Благотворительные аукционы
          </h3>

          {/* City tabs */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveCity("moscow")}
              className={`flex items-center gap-3 px-6 py-4 border rounded-lg transition-all duration-300 ${
                activeCity === "moscow"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <MapPin className={`w-4 h-4 ${activeCity === "moscow" ? "text-primary" : "text-muted-foreground"}`} />
              <div className="text-left">
                <p className={`font-display text-base uppercase ${activeCity === "moscow" ? "text-foreground" : "text-muted-foreground"}`}>
                  Москва
                </p>
                <p className="font-body text-xs text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" /> 26 апреля 2026
                </p>
              </div>
            </button>

            <button
              onClick={() => setActiveCity("spb")}
              className={`flex items-center gap-3 px-6 py-4 border rounded-lg transition-all duration-300 ${
                activeCity === "spb"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <MapPin className={`w-4 h-4 ${activeCity === "spb" ? "text-primary" : "text-muted-foreground"}`} />
              <div className="text-left">
                <p className={`font-display text-base uppercase ${activeCity === "spb" ? "text-foreground" : "text-muted-foreground"}`}>
                  Санкт-Петербург
                </p>
                <p className="font-body text-xs text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" /> Ноябрь 2026
                </p>
              </div>
            </button>
          </div>

          {/* City content */}
          <AnimatePresence mode="wait">
            {activeCity === "moscow" && (
              <motion.div
                key="moscow"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="bg-card border border-border rounded-lg p-8 md:p-10"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <p className="font-body text-xs text-primary uppercase tracking-[0.2em]">Забота о здоровье · Долголетие · Нейрогастрономия</p>
                </div>

                <p className="font-body text-sm md:text-base text-foreground leading-relaxed mb-4">
                  В столице мы сфокусируемся на повестке в сфере здоровья, поговорим о долголетии и нейрогастрономии, продегустируем напитки от Inspiro – б/а напитки, продлевающие молодость мозга, проведём вечер в компании искромётного Александра Цыпкина и сможем сделать вклад в спасение от онкозаболеваний.
                </p>

                <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                  Мы верим, что забота о себе и забота о других – не противоположности, а отражение друг друга. Поэтому перед началом аукциона мы организуем для вас открытую лекцию о современных возможностях поддержать свой организм и баланс внутри.
                </p>

                <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                  «Отражение добра» – это аукцион, где каждый лот несёт смысл. Уникальные оздоровительные программы, ретриты, эксклюзивный опыт, а все деньги, вырученные с продаж билетов и аукциона, направляются в поддержку фонда «Не напрасно».
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/program"
                    className="btn-outline inline-flex items-center gap-2 text-sm"
                  >
                    Программа аукциона <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/lots"
                    className="bg-primary text-primary-foreground px-6 py-3 rounded inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
                  >
                    Смотреть лоты <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )}

            {activeCity === "spb" && (
              <motion.div
                key="spb"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="bg-card border border-border rounded-lg p-8 md:p-10"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <p className="font-body text-xs text-primary uppercase tracking-[0.2em]">Black Tie · Балы · Искусство</p>
                </div>

                <p className="font-body text-sm md:text-base text-foreground leading-relaxed mb-6">
                  В Питере – пить, носить black tie и кружиться на балах в особняках XVIII века. Наши гости и участники благотворительного аукциона получат возможность прикоснуться к культуре балов и светских парадов. В Петербурге мы представим к аукциону предметы искусства.
                </p>

                {/* Contact form for SPb */}
                <div className="bg-muted/50 border border-border rounded-lg p-6 mt-4">
                  <p className="font-display text-base text-foreground uppercase mb-1">Получить детали мероприятия</p>
                  <p className="font-body text-xs text-muted-foreground mb-5">Оставьте контакты, и мы расскажем обо всём первыми</p>
                  <form onSubmit={handleSpbSubmit} className="grid sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Имя"
                      value={spbForm.name}
                      onChange={(e) => setSpbForm({ ...spbForm, name: e.target.value })}
                      className="bg-background border border-border rounded px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={spbForm.email}
                      onChange={(e) => setSpbForm({ ...spbForm, email: e.target.value })}
                      className="bg-background border border-border rounded px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={sending}
                      className="bg-primary text-primary-foreground px-5 py-2.5 rounded font-body text-sm uppercase tracking-[0.15em] hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {sending ? "..." : "Отправить"}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectStorySection;
