import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Download, MapPin, Ribbon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TicketRequestModal from "@/components/TicketRequestModal";
import heroImg from "@/assets/wellness/wellness-hero.webp";
import lectureImg from "@/assets/wellness/wellness-lecture.webp";
import hallImg from "@/assets/wellness/wellness-hall.webp";

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

const zones = [
  { title: "Бьюти-девайсы и уход", text: "Домашние гаджеты: LED, микротоки, гуаша, лимфодренаж" },
  { title: "Диагностика кожи, волос и тела", text: "Анализаторы, трихоскопия, состав тела, биовозраст" },
  { title: "Лонгевити- и превентивные клиники", text: "Чек-апы и персональные рекомендации" },
  { title: "Нутрицевтика и функциональные продукты", text: "Добавки, адаптогены, коллаген — бережно и без хайпа" },
  { title: "Функциональные напитки и еда", text: "Матча, комбуча, коллаген-шоты, healthy-бар" },
  { title: "Практики и восстановление", text: "Дыхание, саунд, велбинг, рекавери-зона" },
  { title: "Женское здоровье и профилактика", text: "Маммология и профильный фонд — смысловой партнёр" },
  { title: "Медиа и комьюнити", text: "Женские медиа и wellness-сообщества" },
];

const organizers = [
  {
    name: "Александра Павлова",
    text: "Автор книги по поддержке женщин с раком щитовидной железы. Продюсер медицинских конференций. Предприниматель и попечитель фонда «Не напрасно».",
    handle: "alexa_ah_alexa",
    phone: "+79623646646",
    phoneLabel: "8 (962) 364-66-46",
  },
  {
    name: "Гизела Тольц",
    text: "Организатор медицинских, коммерческих, корпоративных и частных мероприятий. 10 лет работы с лучшими врачами и экспертами России и Европы. Победитель в номинации «Лучшее международное медицинское мероприятие года».",
    handle: "jiselle_tolts",
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
  const [modal, setModal] = useState(false);

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
            <p className="font-body text-sm uppercase tracking-[0.2em] text-muted-foreground mb-10">Красота · лонгевити · велбинг</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setModal(true)}
                className="bg-primary text-primary-foreground px-6 py-3 rounded inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
              >
                Хочу прийти <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a href="/docs/wellness-devichnik.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2 text-sm">
                <Download className="w-3.5 h-3.5" /> Презентация
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <div className="aspect-[4/3] overflow-hidden rounded-sm">
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
            <div className="aspect-[3/2] overflow-hidden rounded-sm mb-4">
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
          <motion.div {...fadeUp} className="aspect-[3/2] overflow-hidden rounded-sm">
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
                className="border border-cream/10 rounded-lg p-6 hover:border-primary/40 transition-colors"
              >
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-primary mb-4">
                  {num(i)} · {p.tag}
                </p>
                <h3 className="font-display text-2xl text-cream leading-tight mb-3">{p.title}</h3>
                <p className="font-body text-sm text-cream/60 leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {zones.map((z, i) => (
              <motion.div key={z.title} {...fadeUp} transition={{ duration: 0.5, delay: 0.05 * (i % 4) }} className="border-t border-primary/40 pt-4">
                <p className="font-numbers text-sm text-primary mb-3">{num(i)}</p>
                <h3 className="font-display text-lg uppercase tracking-tight text-foreground leading-tight mb-2">{z.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{z.text}</p>
              </motion.div>
            ))}
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
              <motion.div key={o.name} {...fadeUp} className="bg-background border border-border rounded-lg p-6 md:p-8">
                <h3 className="font-display text-2xl text-foreground mb-3">{o.name}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">{o.text}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 font-body text-sm">
                  <span className="text-primary">@{o.handle}</span>
                  <a href={`tel:${o.phone}`} className="text-foreground hover:text-primary transition-colors">{o.phoneLabel}</a>
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
            <button
              onClick={() => setModal(true)}
              className="bg-primary text-primary-foreground px-6 py-3 rounded inline-flex items-center justify-center gap-2 text-sm uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
            >
              Хочу прийти <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />

      <TicketRequestModal
        isOpen={modal}
        onClose={() => setModal(false)}
        ticketType="Велнес-девичник 25 октября"
        ticketPrice=""
        showTrainingCheckbox={false}
      />
    </div>
  );
};

export default Wellness;
