import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, CupSoda, Download, HeartPulse, MapPin, Pill, Ribbon, ScanFace, Sparkles, Users, Wind } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WellnessRegistration from "@/components/WellnessRegistration";
import heroImg from "@/assets/wellness/wellness-hero.webp";
import lectureImg from "@/assets/wellness/wellness-lecture.webp";
import hallImg from "@/assets/wellness/wellness-hall.webp";
import sashaPhoto from "@/assets/organizer-sasha-clean.webp";
import gizaPhoto from "@/assets/organizer-giza-clean.webp";

const venueFeatures = ["Лекторий", "Тренировки", "Зона бьюти-шоппинга", "Фудспот", "Кофе и протеиновые шейки"];

const experience = [
  { title: "Public talk", text: "с лидерами мнений" },
  { title: "Консультации", text: "с врачом" },
  { title: "Beauty-девайсы", text: "для сна, энергии и красоты" },
  { title: "Практики", text: "для спокойной нервной системы" },
  { title: "Женское комьюнити", text: "тёплое общение и поддержка" },
  { title: "Красивый контент", text: "атмосфера, которую хочется сохранить" },
];

const program = [
  { tag: "Public talk", title: "Героини нового велнеса", text: "Женщины, которые честно рассказывают, как заботятся о себе: от бьюти-рутины до умного биохакинга." },
  { tag: "Public talk с пластическим хирургом", title: "Маммопластика", text: "Всё, что ты должна знать, чтобы принять решение." },
  { tag: "Весь день · открытая зона", title: "Beauty-девайсы и диагностика", text: "Гаджеты для красоты, сна и энергии; диагностика кожи, волос и тела, восстановление и бар." },
  { tag: "Лекция", title: "«Я в безопасности»", text: "Рак груди: мифы и достоверная диагностика — что реально работает в профилактике." },
  { tag: "Наедине с врачом", title: "Консультация маммолога", text: "Бесплатная личная консультация — спокойно, приватно, для каждой гостьи." },
];

// Тонкие линейные иллюстрации к пунктам программы
const LineArt = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    {children}
  </svg>
);

const programArt = [
  // микрофон
  <LineArt key="mic">
    <rect x="25" y="8" width="14" height="26" rx="7" />
    <path d="M30 16h4M30 21h4M30 26h4" />
    <path d="M18 28a14 14 0 0 0 28 0" />
    <path d="M32 42v12M24 54h16" />
    <path d="M50 12v6M47 15h6M12 38v4M10 40h4" />
  </LineArt>,
  // лотос
  <LineArt key="lotus">
    <path d="M32 14c6 7 7 19 0 30c-7-11-6-23 0-30z" />
    <path d="M32 44c-9-1-17-9-18-20c9 1 15 8 18 20z" />
    <path d="M32 44c9-1 17-9 18-20c-9 1-15 8-18 20z" />
    <path d="M14 50c8 4 28 4 36 0" />
  </LineArt>,
  // зеркальце и искры
  <LineArt key="mirror">
    <ellipse cx="27" cy="25" rx="13" ry="15" />
    <ellipse cx="27" cy="25" rx="9" ry="11" opacity={0.5} />
    <path d="M27 40v14M23 54h8" />
    <path d="M49 10v8M45 14h8M52 30v6M49 33h6" />
  </LineArt>,
  // розовая лента
  <LineArt key="ribbon">
    <path d="M19 55L35 27C41 17 39 8 32 8S23 17 29 27l16 28" />
    <path d="M19 55l5-1 1 4M45 55l-5-1-1 4" />
  </LineArt>,
  // стетоскоп
  <LineArt key="stethoscope">
    <path d="M18 10v14a10 10 0 0 0 20 0V10" />
    <path d="M15 10h6M35 10h6" />
    <path d="M28 34v6a11 11 0 0 0 22 0v-6" />
    <circle cx="50" cy="30" r="4" />
  </LineArt>,
];

const trainings = [
  {
    title: "Либидо-фитнес",
    coach: "с Марго",
    art: (
      <LineArt>
        <path d="M32 52S12 40 12 26a10 10 0 0 1 20-4a10 10 0 0 1 20 4c0 14-20 26-20 26z" />
        <path d="M48 8v6M45 11h6" />
      </LineArt>
    ),
  },
  {
    title: "Плоский живот",
    coach: "с Георгием",
    art: (
      <LineArt>
        <path d="M14 32h36M18 24v16M46 24v16M10 28v8M54 28v8" />
      </LineArt>
    ),
  },
  {
    title: "Медитация",
    coach: "с поющими чашами",
    art: (
      <LineArt>
        <path d="M12 34h40c0 11-9 18-20 18S12 45 12 34z" />
        <path d="M24 56h16" />
        <path d="M42 26l12-14" />
        <path d="M22 26c2-3 2-6 0-9M30 24c2-3 2-6 0-9" />
      </LineArt>
    ),
  },
];

const zones = [
  { icon: Sparkles, title: "Бьюти-девайсы и уход", text: "Домашние гаджеты: LED, микротоки, гуаша, лимфодренаж" },
  { icon: ScanFace, title: "Диагностика кожи, волос и тела", text: "Анализаторы, трихоскопия, состав тела, биовозраст" },
  { icon: HeartPulse, title: "Лонгевити- и превентивные клиники", text: "Чек-апы и персональные рекомендации" },
  { icon: Pill, title: "Нутрицевтика и функциональные продукты", text: "Добавки, адаптогены, коллаген — бережно и без хайпа" },
  { icon: CupSoda, title: "Функциональные напитки и еда", text: "Матча, комбуча, коллаген-шоты, healthy-бар" },
  { icon: Wind, title: "Практики и восстановление", text: "Дыхание, саунд, велбинг, рекавери-зона" },
  { icon: Ribbon, title: "Женское здоровье и профилактика", text: "Маммология и профильный фонд — смысловой партнёр" },
  { icon: Users, title: "Медиа и комьюнити", text: "Женские медиа и wellness-сообщества" },
];

const organizers = [
  {
    name: "Александра Павлова",
    text: "Автор книги по поддержке женщин с раком щитовидной железы. Продюсер медицинских конференций. Предприниматель и попечитель фонда «Не напрасно».",
    photo: sashaPhoto,
    handle: "alexa_ah_alexa",
    phone: "+79623646646",
    phoneLabel: "8 (962) 364-66-46",
  },
  {
    name: "Гизела Тольц",
    text: "Организатор медицинских, коммерческих, корпоративных и частных мероприятий. 10 лет работы с лучшими врачами и экспертами России и Европы. Победитель в номинации «Лучшее международное медицинское мероприятие года».",
    photo: gizaPhoto,
    handle: "Jiselle_Tolts",
    phone: "+79858095370",
    phoneLabel: "8 (985) 809-53-70",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7 },
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-8 h-px bg-primary" />
    <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">{children}</p>
  </div>
);

const num = (i: number) => String(i + 1).padStart(2, "0");

const Wellness = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pb-24 section-padding">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6 text-xs text-primary font-body uppercase tracking-[0.2em]">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> 25 октября 2026</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Москва</span>
            </div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Велнес-девичник для женщин</p>
            <h1 className="font-display text-6xl md:text-8xl text-foreground tracking-tight leading-[0.9] mb-6">Отражение</h1>
            <p className="font-display text-3xl md:text-4xl text-foreground leading-tight mb-2">Новая роскошь —</p>
            <p className="font-display text-3xl md:text-4xl italic text-primary leading-tight mb-6">забота о себе.</p>
            <p className="font-body text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Красота · лонгевити · велбинг</p>
            <p className="font-body text-sm text-foreground mb-10">Вход бесплатный, по регистрации.</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#registration"
                className="bg-primary text-primary-foreground px-6 py-3 rounded inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
              >
                Зарегистрироваться <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a href="/docs/wellness-devichnik.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2 text-sm">
                <Download className="w-3.5 h-3.5" /> Презентация
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              <img src={heroImg} alt="Пространство велнес-девичника «Отражение»" className="w-full h-full object-cover" />
            </div>
            <p className="mt-2 font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">Эскиз оформления события · визуализация</p>
          </motion.div>
        </div>
      </section>

      {/* Розовый октябрь */}
      <section className="section-padding pb-16 md:pb-24">
        <motion.div {...fadeUp} className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 border-y border-border py-8">
          <div className="flex items-start gap-4">
            <Ribbon className="w-8 h-8 text-primary shrink-0" />
            <div>
              <p className="font-body text-base text-foreground">В поддержку «Розового октября»</p>
              <p className="font-body text-sm text-muted-foreground">Месяца профилактики рака груди</p>
            </div>
          </div>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            Фонд <a href="https://nenaprasno.ru" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">«Не напрасно»</a> —
            информационная поддержка людей с онкологическими заболеваниями и их близких.
            Просвещение, профилактика рака и подготовка врачей-онкологов.
          </p>
        </motion.div>
      </section>

      {/* О чём этот день */}
      <section className="section-padding pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div {...fadeUp} className="order-2 lg:order-1">
            <div className="aspect-[3/2] overflow-hidden rounded-2xl mb-4">
              <img src={lectureImg} alt="Лекторий велнес-девичника" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <p className="font-display text-xl italic text-primary leading-snug">
              Один день, чтобы замедлиться, услышать своё тело и уйти не с тревогой, а с ясностью.
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="order-1 lg:order-2">
            <SectionLabel>О чём этот день</SectionLabel>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[0.95] mb-8">
              Забота о себе — <span className="italic text-primary">это и есть роскошь.</span>
            </h2>
            <div className="space-y-4 font-body text-base text-muted-foreground leading-relaxed">
              <p className="text-foreground">Мы больше не верим в жёсткие протоколы и подвиги с понедельника.</p>
              <p>
                Женщине необходима бережность: маленькие регулярные шаги, спокойная нервная система,
                удовольствие как главный мотиватор.
              </p>
              <p>Красота перестаёт быть отдельной задачей — она становится следствием того, как мы живём, спим и дышим.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Регистрация */}
      <section id="registration" className="section-padding pb-20 md:pb-28 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <div className="flex items-center gap-3 justify-center mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">Регистрация</p>
              <div className="w-8 h-px bg-primary" />
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[0.95] mb-6">
              Приходите — <span className="italic text-primary">это бесплатно</span>
            </h2>
            <div className="inline-flex items-center gap-4 bg-primary/10 border border-primary/30 rounded-full pl-2 pr-6 py-2">
              <span className="font-numbers text-2xl text-primary-foreground bg-primary rounded-full w-12 h-12 flex items-center justify-center">60</span>
              <span className="font-body text-sm text-foreground text-left">первых регистраций гарантированно<br className="hidden sm:block" /> получают место в лектории</span>
            </div>
          </motion.div>
          <motion.div {...fadeUp}>
            <WellnessRegistration />
          </motion.div>
        </div>
      </section>

      {/* Пространство */}
      <section className="bg-card/50 py-20 md:py-28 section-padding">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16 items-center">
          <motion.div {...fadeUp}>
            <SectionLabel>Пространство девичника</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight text-foreground leading-[0.95] mb-3">
              Баланс-холл «Место быть»
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-8">Разные локации — для встреч, движения и красивых кадров.</p>
            <p className="font-numbers text-5xl font-light text-primary leading-none mb-2">3 000 м²</p>
            <p className="font-body text-sm text-muted-foreground mb-8">пространства для отдыха и восстановления</p>
            <p className="font-body text-sm text-primary uppercase tracking-[0.15em] mb-3">Вас ждут</p>
            <ul className="divide-y divide-border border-y border-border">
              {venueFeatures.map((f) => (
                <li key={f} className="py-3 font-body text-sm text-foreground">{f}</li>
              ))}
            </ul>
            <p className="mt-6 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary" /> Москва · Мясницкая, 24/7, стр. 1
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="aspect-[3/2] overflow-hidden rounded-2xl">
            <img src={hallImg} alt="Баланс-холл «Место быть»" loading="lazy" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Опыт гостьи */}
      <section className="py-20 md:py-28 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <SectionLabel>Атмосфера и опыт гостьи</SectionLabel>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[0.95]">
              Один день. <span className="italic text-primary">Полностью для себя.</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {experience.map((e, i) => (
              <motion.div
                key={e.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.06 * i }}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary/40 transition-colors"
              >
                <p className="font-numbers text-sm text-primary mb-4">{num(i)}</p>
                <h3 className="font-display text-xl uppercase tracking-tight text-foreground mb-1">{e.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{e.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Программа */}
      <section className="bg-warm-black text-cream py-20 md:py-28 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/40 font-body">Программа</p>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight leading-[0.95]">
              Главное <span className="italic text-primary">за один день.</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {program.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.06 * i }}
                className="group relative border border-cream/10 rounded-lg p-6 md:p-8 hover:border-primary/40 hover:bg-cream/[0.03] transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] text-primary pt-1">
                    {num(i)} · {p.tag}
                  </p>
                  <div className="w-14 h-14 shrink-0 text-primary/80 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                    {programArt[i]}
                  </div>
                </div>
                <h3 className="font-display text-2xl text-cream leading-tight mb-3">{p.title}</h3>
                <p className="font-body text-sm text-cream/60 leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
            <motion.a
              href="/docs/wellness-devichnik.pdf"
              target="_blank"
              rel="noopener noreferrer"
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative flex flex-col bg-primary/15 border border-primary/40 rounded-lg p-6 md:p-8 hover:bg-primary/25 hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-primary pt-1">06 · PDF · 7 страниц</p>
                <div className="w-14 h-14 shrink-0 text-primary transition-transform duration-500 group-hover:translate-y-1">
                  <LineArt>
                    <path d="M16 8h22l10 10v38H16z" />
                    <path d="M38 8v10h10" />
                    <path d="M32 26v18M25 37l7 7 7-7" />
                    <path d="M24 50h16" />
                  </LineArt>
                </div>
              </div>
              <h3 className="font-display text-2xl text-cream leading-tight mb-3">Скачать презентацию</h3>
              <p className="font-body text-sm text-cream/60 leading-relaxed mb-6">Вся программа, пространство и зоны девичника — в одном файле.</p>
              <span className="mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-body">
                <Download className="w-3.5 h-3.5" /> Скачать
              </span>
            </motion.a>
          </div>

          <motion.div {...fadeUp} className="mt-16 md:mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/40 font-body">Участники · тренировки</p>
            </div>
            <h3 className="font-display text-3xl md:text-5xl font-light tracking-tight leading-[0.95] mb-10">
              Выберите <span className="italic text-primary">свою практику</span>
            </h3>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4">
            {trainings.map((t, i) => (
              <motion.a
                key={t.title}
                href="#registration"
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                className="group flex items-center gap-5 border border-cream/10 rounded-lg p-6 hover:border-primary/40 hover:bg-cream/[0.03] transition-colors"
              >
                <div className="w-16 h-16 shrink-0 text-primary/80 transition-transform duration-500 group-hover:scale-110">{t.art}</div>
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] text-primary mb-1">Тренировка {num(i)}</p>
                  <h4 className="font-display text-xl text-cream leading-tight">{t.title}</h4>
                  <p className="font-body text-sm text-cream/60">{t.coach}</p>
                </div>
              </motion.a>
            ))}
          </div>
          <p className="mt-6 font-body text-xs text-cream/40">Записаться на тренировку можно при регистрации. Имена спикеров объявим ближе к дате.</p>
        </div>
      </section>

      {/* Зоны */}
      <section className="py-20 md:py-28 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <SectionLabel>Зоны девичника</SectionLabel>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[0.95]">
              Восемь направлений <span className="italic text-primary">заботы.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {zones.map((z, i) => (
              <motion.div
                key={z.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.06 * (i % 4) }}
                className={`group relative overflow-hidden rounded-lg border p-6 flex flex-col sm:aspect-square transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:border-primary/50 ${
                  (i + Math.floor(i / 4)) % 2 === 0 ? "bg-primary/[0.06] border-primary/20" : "bg-card border-border"
                }`}
              >
                <span className="pointer-events-none absolute -right-2 -top-4 font-display text-[7rem] leading-none text-primary/[0.07] select-none transition-colors duration-500 group-hover:text-primary/[0.14]">
                  {num(i)}
                </span>
                <div className="relative w-12 h-12 rounded-full bg-background border border-primary/20 flex items-center justify-center mb-6 transition-colors duration-500 group-hover:bg-primary group-hover:border-primary">
                  <z.icon className="w-5 h-5 text-primary transition-colors duration-500 group-hover:text-primary-foreground" />
                </div>
                <div className="relative mt-auto">
                  <h3 className="font-display text-lg md:text-xl uppercase tracking-tight text-foreground leading-tight mb-2">{z.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{z.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Партнёры */}
      <section className="py-20 md:py-28 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-10">
            <SectionLabel>Партнёры</SectionLabel>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[0.95]">
              Вместе с <span className="italic text-primary">нами</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.a
              href="https://nenaprasno.ru"
              target="_blank"
              rel="noopener noreferrer"
              {...fadeUp}
              className="aspect-[3/2] border border-border rounded-lg flex flex-col items-center justify-center text-center p-4 hover:border-primary/40 transition-colors"
            >
              <p className="font-display text-xl text-foreground">«Не напрасно»</p>
              <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Смысловой партнёр</p>
            </motion.a>
            <motion.div {...fadeUp} className="aspect-[3/2] border border-border rounded-lg flex flex-col items-center justify-center text-center p-4">
              <p className="font-display text-xl text-foreground">«Место быть»</p>
              <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Площадка</p>
            </motion.div>
            <motion.a
              href="/docs/aktkom-portfolio-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              {...fadeUp}
              className="aspect-[3/2] border border-border rounded-lg flex flex-col items-center justify-center text-center p-4 hover:border-primary/40 transition-colors"
            >
              <p className="font-display text-xl text-foreground">АктКом</p>
              <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Стратегический партнёр</p>
            </motion.a>
            <motion.a
              href={`https://t.me/${organizers[1].handle}`}
              target="_blank"
              rel="noopener noreferrer"
              {...fadeUp}
              className="aspect-[3/2] border border-dashed border-primary/40 bg-primary/5 rounded-lg flex flex-col items-center justify-center text-center p-4 hover:bg-primary/10 transition-colors"
            >
              <p className="font-display text-xl text-primary">Стать партнёром</p>
              <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Напишите организаторам</p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Организаторы */}
      <section className="bg-card/50 py-20 md:py-28 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <SectionLabel>Команда события</SectionLabel>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[0.95]">Организаторы</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {organizers.map((o) => (
              <motion.div key={o.name} {...fadeUp} className="bg-background border border-border rounded-lg overflow-hidden grid sm:grid-cols-[0.8fr_1.2fr]">
                <div className="aspect-square sm:aspect-auto overflow-hidden bg-muted/20">
                  <img src={o.photo} alt={o.name} loading="lazy" className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-6 md:p-8 flex flex-col">
                <h3 className="font-display text-2xl text-foreground mb-3">{o.name}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{o.text}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 font-body text-sm">
                  <a href={`https://t.me/${o.handle}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@{o.handle}</a>
                  <a href={`tel:${o.phone}`} className="text-foreground hover:text-primary transition-colors">{o.phoneLabel}</a>
                </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-border pt-8">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-body text-sm">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Наши проекты</span>
              <Link to="/" className="text-foreground hover:text-primary transition-colors">Отражение добра · отразись.рф</Link>
              <a href="/docs/aktkom-portfolio-2026.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                АктКом — портфолио
              </a>
            </div>
            <a
              href="#registration"
              className="bg-primary text-primary-foreground px-6 py-3 rounded inline-flex items-center justify-center gap-2 text-sm uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
            >
              Зарегистрироваться <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Wellness;
