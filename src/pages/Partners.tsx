import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import heroBanner from "@/assets/sponsors/lev-edinorog-banner.jpg";
import logoMesto from "@/assets/sponsors/mesto-byt.svg";
import logoOne from "@/assets/sponsors/one.svg";
import logoPL from "@/assets/sponsors/pervaya-liniya.svg";
import logoVip from "@/assets/sponsors/vipavenue.svg";
import logoHedo from "@/assets/sponsors/hedonist.svg";
import logoLev from "@/assets/sponsors/lev-edinorog.svg";
import logoVol from "@/assets/sponsors/voluminous.svg";
import logoShtab from "@/assets/sponsors/shtab-kultury.svg";

type Partner = {
  name: string;
  category: string;
  description: string;
  logo?: string;
};

const partners: Partner[] = [
  {
    name: "«Лев и Единорог»",
    category: "Генеральный партнёр",
    description:
      "Бутик-винный дом, объединяющий лучшие коллекционные вина и редкие крепкие напитки. Партнёр гастрономической части вечера.",
    logo: logoLev,
  },
  {
    name: "Balance Hall «Место быть»",
    category: "Площадка",
    description:
      "Камерное артистическое пространство в самом центре Москвы — Мясницкая 24/7. Главная сцена аукциона «Отражение добра».",
    logo: logoMesto,
  },
  {
    name: "Биохакинг-центр ONE",
    category: "Партнёр здоровья",
    description:
      "Премиальный биохакинг-центр Марии Грудиной. Программа долголетия, диагностика и протоколы восстановления гостей вечера.",
    logo: logoOne,
  },
  {
    name: "«Первая Линия» Health Care Resort",
    category: "Курортный партнёр",
    description:
      "Курорт в Санкт-Петербурге, ставший новым стандартом велнес-ретрита в России. Лоты восстановления и долголетия.",
    logo: logoPL,
  },
  {
    name: "VipAvenue",
    category: "Стиль",
    description:
      "Лидер премиальной онлайн-розницы в России. Дресс-код вечера и стилистические рекомендации для гостей.",
    logo: logoVip,
  },
  {
    name: "Hedonist One",
    category: "Wellness",
    description:
      "Авторский сервис ведения здоровья и долголетия. Партнёр подарочного фонда и розыгрыша вечера.",
    logo: logoHedo,
  },
  {
    name: "Voluminous",
    category: "Beauty",
    description:
      "Бьюти-партнёр вечера. Эстетическая поддержка и подарочный фонд для гостей аукциона.",
    logo: logoVol,
  },
  {
    name: "«Штаб культуры»",
    category: "Культурный партнёр",
    description:
      "Команда, формирующая культурный ландшафт современной Москвы. Кураторы образовательной программы и выступлений.",
    logo: logoShtab,
  },
  {
    name: "Клиника «Будь Здоров»",
    category: "Партнёр подарочного фонда",
    description:
      "Сертификаты на медицинские услуги — главные подарки розыгрыша среди номеров, зарегистрированных на аукцион.",
  },
];

const Partners = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            backgroundImage: `url(${heroBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(2px)",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        <div className="section-padding">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 justify-center mb-6">
                <div className="w-8 h-px bg-primary" />
                <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
                  Нас поддерживают
                </p>
                <div className="w-8 h-px bg-primary" />
              </div>
              <h1 className="font-display text-5xl md:text-7xl text-foreground uppercase tracking-tight leading-[0.9] mb-6">
                Партнёры <span className="text-primary italic">аукциона</span>
              </h1>
              <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto">
                Те, благодаря кому «Отражение добра» становится событием. Лучшие бренды и институции,
                разделяющие нашу миссию помощи фонду «Не напрасно».
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured banner — Лев и Единорог */}
      <section className="section-padding mb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-lg border border-primary/30 group"
          >
            <img
              src={heroBanner}
              alt="Лев и Единорог — генеральный партнёр"
              loading="lazy"
              className="w-full h-[420px] md:h-[520px] object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
              <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-body mb-3">
                Генеральный партнёр
              </p>
              <h2 className="font-display text-4xl md:text-6xl text-foreground leading-[0.95] mb-4">
                «Лев и <span className="italic text-primary">Единорог</span>»
              </h2>
              <p className="font-body text-sm md:text-base text-muted-foreground max-w-xl">
                Винный дом, чьё имя стало синонимом тонкого вкуса и редкости. Гастрономическая часть
                аукциона создана вместе с командой «Лев и Единорог».
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners grid */}
      <section className="section-padding pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.05 * i }}
                className="bg-card border border-border p-6 rounded-lg hover:border-primary/40 transition-colors flex flex-col"
              >
                <div className="h-16 mb-5 flex items-center">
                  {p.logo ? (
                    <img src={p.logo} alt={p.name} className="max-h-14 max-w-[160px] object-contain opacity-90" />
                  ) : (
                    <span className="font-display text-xl text-foreground">{p.name}</span>
                  )}
                </div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-body mb-2">
                  {p.category}
                </p>
                <h3 className="font-display text-xl text-foreground mb-3 leading-tight">{p.name}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <p className="font-body text-sm text-muted-foreground mb-4">
              Хотите присоединиться к партнёрам аукциона?
            </p>
            <Link to="/#contacts" className="btn-primary inline-flex items-center gap-2">
              Стать партнёром <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partners;
