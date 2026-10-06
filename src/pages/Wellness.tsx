import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  Baby,
  Calendar,
  Camera,
  CupSoda,
  Dumbbell,
  Flower2,
  Gift,
  HandHeart,
  Heart,
  HeartPulse,
  Send,
  Leaf,
  MapPin,
  Megaphone,
  Mic,
  Moon,
  Package,
  Phone,
  Pill,
  Play,
  Plus,
  Ribbon,
  ScanFace,
  Scale,
  Shirt,
  ShoppingBag,
  Sparkles,
  Store,
  Users,
  Wind,
  Wine,
  Zap,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WellnessRegistration from "@/components/WellnessRegistration";
import VenueCarousel from "@/components/VenueCarousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import heroImg from "@/assets/wellness/wellness-hero.webp";
import lectureImg from "@/assets/wellness/wellness-lecture.webp";
import stilllifeImg from "@/assets/wellness/stilllife.webp";
import wardrobeImg from "@/assets/wellness/wardrobe-evening.webp";
import victoriaPhoto from "@/assets/wellness/people/victoria.webp";
import annaPhoto from "@/assets/wellness/people/anna.webp";
import margaritaPhoto from "@/assets/wellness/people/margarita.webp";
import georgyPhoto from "@/assets/wellness/people/georgy.webp";
import alexandraPhoto from "@/assets/wellness/people/alexandra-bw.webp";
import gisellePhoto from "@/assets/wellness/people/giselle-bw.webp";
import zone1 from "@/assets/wellness/zones/zone-1.webp";
import zone2 from "@/assets/wellness/zones/zone-2.webp";
import zone3 from "@/assets/wellness/zones/zone-3.webp";
import zone4 from "@/assets/wellness/zones/zone-4.webp";
import zone5 from "@/assets/wellness/zones/zone-5.webp";
import zone6 from "@/assets/wellness/zones/zone-6.webp";
import zone7 from "@/assets/wellness/zones/zone-7.webp";
import zone8 from "@/assets/wellness/zones/zone-8.webp";
import nenaprasnoLogo from "@/assets/sponsors/nenaprasno.png";
import mestoBytLogo from "@/assets/sponsors/mesto-byt.svg";
import actcomLogo from "@/assets/sponsors/actcom.svg";

// Тексты — из презентации «Отражение_25_октября_программа_и_участники_v2».

const experience = [
  { icon: Mic, title: "Public talk", text: "с лидерами мнений" },
  { icon: Users, title: "Консультации", text: "с врачом" },
  { icon: Sparkles, title: "Beauty-девайсы", text: "для сна, энергии и красоты" },
  { icon: Flower2, title: "Практики", text: "для спокойной нервной системы" },
  { icon: HandHeart, title: "Женское комьюнити", text: "тёплое общение и поддержка" },
  { icon: Camera, title: "Красивый контент", text: "атмосфера, которую хочется сохранить" },
];

const lectures = [
  {
    topic: "Маммология / пластическая хирургия",
    text: "Диагностика и профилактика.",
    speaker: "Виктория Мортада · маммолог, хирург-онколог",
  },
  {
    topic: "Гастроэнтерология",
    text: "Микробиота и как её состояние влияет на женское здоровье.",
    speaker: "Анна Борисова · врач-гастроэнтеролог",
  },
  {
    topic: "Чек-ап",
    text: "Что всё-таки проверять, чтобы быть спокойной?",
    speaker: "Спикер уточняется",
  },
];

const otherFormats = [
  { title: "Тренировки", note: "Либидо-фитнес, сильное тело, медитация с поющими чашами", href: "#experts" },
  { title: "Экспо", note: "Бренды и сервисы заботы о себе", href: "#brands" },
  { title: "Игристое со стилистом", note: "24 октября, накануне девичника", href: "#october-24" },
  { title: "Public talk", note: "«Героини нового велнеса»", href: undefined },
];

type Expert = {
  name: string;
  surname: string;
  regalia: string;
  org?: string;
  text?: string;
  membership?: string[];
  features?: { icon: typeof Heart; label: string }[];
  slogan?: string;
  photo: string;
};

const experts: Expert[] = [
  {
    name: "Виктория",
    surname: "Мортада",
    regalia: "Онколог, пластический хирург, к. м. н.",
    org: "НМИЦ онкологии им. Н. Н. Петрова.",
    text: "Ведущий молодой врач в лечении рака груди и победитель научного конкурса Moscow Breast Meeting. Специализация — онкологическая, реконструктивная и эстетическая хирургия молочной железы.",
    photo: victoriaPhoto,
  },
  {
    name: "Анна",
    surname: "Борисова",
    regalia: "Врач-гастроэнтеролог, врач превентивной медицины, beauty-нутрициолог",
    membership: [
      "Российской гастроэнтерологической ассоциации (РГА)",
      "Научного общества по содействию изучения микробиома человека (НСОИМ)",
      "ESNM (European Society of Neurogastroenterology and Motility)",
    ],
    photo: annaPhoto,
  },
  {
    name: "Маргарита",
    surname: "Дмитриева",
    regalia: "Врач, сексолог, тренер по либидо фитнес",
    text: "Помогает женщинам лучше понимать своё тело, восстанавливать желание и чувствовать себя уверенно и гармонично.",
    features: [
      { icon: Heart, label: "Женское здоровье" },
      { icon: Flower2, label: "Осознанность и принятие" },
      { icon: Sparkles, label: "Уверенность и энергия" },
    ],
    slogan: "Забота о себе — это всегда красиво.",
    photo: margaritaPhoto,
  },
  {
    name: "Георгий",
    surname: "Какунов",
    regalia: "Фитнес-тренер",
    text: "Помогает выстроить сильное и здоровое тело без жёстких диет и лишнего стресса. За осознанный подход к тренировкам, который поддерживает здоровье, энергию и уверенность в себе.",
    features: [
      { icon: Dumbbell, label: "Сила и здоровье" },
      { icon: Zap, label: "Энергия каждый день" },
      { icon: Scale, label: "Баланс без крайностей" },
    ],
    slogan: "Сильное тело — спокойная и счастливая ты.",
    photo: georgyPhoto,
  },
];

const brands = ["Абрау-Дюрсо", "Natura Siberica", "Smartlife", "Vita Strada", "DEEP", "refeel", "Сбер Здоровье"]; // «Сбер Здоровье» — на всю ширину
const brandCategories = [
  { icon: Shirt, label: "Бренд белья" },
  { icon: Moon, label: "Шёлковые пижамы" },
  { icon: Wind, label: "Уход за волосами" },
  { icon: Activity, label: "Тренажёры для тазового дна" },
  { icon: Baby, label: "Гаджеты для детей" },
  { icon: Plus, label: "и другие" },
];

const zones = [
  { icon: Sparkles, title: "Бьюти-девайсы и уход", text: "Домашние гаджеты: LED, микротоки, гуаша, лимфодренаж", img: zone1 },
  { icon: ScanFace, title: "Диагностика кожи, волос и тела", text: "Анализаторы, трихоскопия, состав тела, биовозраст", img: zone2 },
  { icon: HeartPulse, title: "Лонгевити- и превентивные клиники", text: "Чек-апы и персональные рекомендации", img: zone3 },
  { icon: Pill, title: "Нутрицевтика и функциональные продукты", text: "Добавки, адаптогены, коллаген — бережно и без хайпа", img: zone4 },
  { icon: CupSoda, title: "Функциональные напитки и еда", text: "Матча, комбуча, коллаген-шоты, healthy-бар", img: zone5 },
  { icon: Leaf, title: "Практики и восстановление", text: "Дыхание, саунд, велбинг, рекавери-зона", img: zone6 },
  { icon: Ribbon, title: "Женское здоровье и профилактика", text: "Маммология и профильный фонд — смысловой партнёр", img: zone7 },
  { icon: Users, title: "Медиа и комьюнити", text: "Женские медиа и wellness-сообщества", img: zone8 },
];

const partnerBenefits = [
  { icon: Package, title: "Продукт в руках", text: "Тест-драйв, сэмплинг и демо прямо в своей зоне" },
  { icon: ShoppingBag, title: "Продажи в день", text: "Продажи в своей зоне, промокоды и бонусы гостьям" },
  { icon: Users, title: "Новые контакты", text: "База тёплых клиенток и пострассылка после события" },
  { icon: Camera, title: "Живой контент", text: "Фото, видео и съёмки для ваших соцсетей" },
  { icon: Mic, title: "Сцена и боксы", text: "Упоминания, участие в talk и сэмплы в welcome-боксах" },
  { icon: Heart, title: "Смысл и имидж", text: "Бренд рядом с «Розовым октябрём» и заботой о женщинах" },
];

const organizers = [
  {
    name: "Александра",
    surname: "Павлова",
    text: "Автор книги по поддержке женщин с раком щитовидной железы. Продюсер медицинских конференций. Предприниматель и попечитель фонда «Не напрасно».",
    photo: alexandraPhoto,
    handle: "alexa_ah_alexa",
    phone: "+79623646646",
    phoneLabel: "8 (962) 364-66-46",
  },
  {
    name: "Гизела",
    surname: "Тольц",
    text: "Организатор медицинских, коммерческих, корпоративных и частных мероприятий. 10 лет работы с лучшими врачами и экспертами России и Европы. Победитель в номинации «Лучшее международное медицинское мероприятие года».",
    photo: gisellePhoto,
    handle: "jiselle_tolts",
    phone: "+79858095370",
    phoneLabel: "8 (985) 809-53-70",
  },
];

const partners = [
  { name: "Фонд «Не напрасно»", role: "Смысловой партнёр", logo: nenaprasnoLogo, url: "https://nenaprasno.ru/", logoClass: "h-10 md:h-12" },
  { name: "Баланс-холл «Место быть»", role: "Площадка", logo: mestoBytLogo, url: "https://mestobe.ru/", logoClass: "h-16 md:h-20" },
  { name: "Актуальные коммуникации", role: "Стратегический партнёр", logo: actcomLogo, url: "https://act-com.ru/", logoClass: "h-9 md:h-11" },
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

// Заголовок как в презентации: первая строка — гротеск, вторая — красный курсив
const TwoLineTitle = ({ first, second, className = "" }: { first: string; second: string; className?: string }) => (
  <h2 className={`font-display text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[1] ${className}`}>
    {first}
    <br />
    <span className="italic text-primary">{second}</span>
  </h2>
);

const IconCircle = ({ icon: Icon, size = "md" }: { icon: typeof Heart; size?: "sm" | "md" }) => (
  <span
    className={`${size === "sm" ? "w-9 h-9" : "w-12 h-12"} shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center`}
  >
    <Icon className={size === "sm" ? "w-4 h-4" : "w-5 h-5"} />
  </span>
);

const num = (i: number) => String(i + 1).padStart(2, "0");

const ExpertDetails = ({ e }: { e: Expert }) => (
  <>
    <p className="font-body text-sm text-foreground mb-1">{e.regalia}</p>
    {e.org && <p className="font-body text-sm text-foreground/80">{e.org}</p>}
    <span className="w-8 h-px bg-primary my-4" />
    {e.text && <p className="font-body text-sm text-muted-foreground leading-relaxed">{e.text}</p>}
    {e.membership && (
      <>
        <p className="font-body text-xs font-medium text-foreground mb-2">Действующий член:</p>
        <ul className="space-y-1.5">
          {e.membership.map((m) => (
            <li key={m} className="flex items-start gap-2 font-body text-xs text-muted-foreground leading-snug">
              <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
              {m}
            </li>
          ))}
        </ul>
      </>
    )}
    {e.features && (
      <div className="grid grid-cols-3 gap-2 mt-5">
        {e.features.map((f) => (
          <div key={f.label} className="flex flex-col items-center text-center gap-1.5">
            <IconCircle icon={f.icon} size="sm" />
            <span className="font-body text-[10px] leading-tight text-muted-foreground">{f.label}</span>
          </div>
        ))}
      </div>
    )}
    {e.slogan && <p className="font-display italic text-primary text-lg leading-snug mt-auto pt-5">{e.slogan}</p>}
  </>
);

const Wellness = () => {
  // ключ перезапускает анимацию «отражения» заголовка
  const [mirrorKey, setMirrorKey] = useState(0);
  const [openExpert, setOpenExpert] = useState<Expert | null>(null);

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
            <div className="flex items-center gap-4 mb-6">
              <motion.h1
                key={mirrorKey}
                initial={{ rotateY: 180, opacity: 0.3, filter: "blur(3px)" }}
                animate={{ rotateY: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformPerspective: 900 }}
                className="font-display text-6xl md:text-8xl text-foreground tracking-tight leading-[0.9] origin-center"
              >
                Отражение
              </motion.h1>
              <button
                type="button"
                onClick={() => setMirrorKey((k) => k + 1)}
                aria-label="Повторить отражение"
                title="Повторить"
                className="w-9 h-9 shrink-0 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/50 flex items-center justify-center transition-colors"
              >
                <Play className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>
            <p className="font-display text-3xl md:text-4xl text-foreground leading-tight mb-2">Новая роскошь —</p>
            <p className="font-display text-3xl md:text-4xl italic text-primary leading-tight mb-6">забота о себе.</p>
            <p className="font-body text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Красота · лонгевити · велбинг</p>
            <p className="font-body text-sm text-foreground mb-10">Участие — 440 ₽, по регистрации.</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#registration"
                className="bg-primary text-primary-foreground px-6 py-3 rounded inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
              >
                Зарегистрироваться <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a href="#program" className="btn-outline inline-flex items-center gap-2 text-sm">
                Программа
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              <img src={heroImg} alt="Пространство велнес-девичника «Отражение»" className="w-full h-full object-cover" />
            </div>
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

      {/* Локация */}
      <section id="location" className="bg-card/50 py-20 md:py-28 section-padding scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
            <div>
              <SectionLabel>Пространство девичника</SectionLabel>
              <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[0.95] mb-3">
                Баланс-холл <span className="italic text-primary">«Место быть»</span>
              </h2>
              <p className="font-body text-sm md:text-base text-muted-foreground">Разные локации — для встреч, движения и красивых кадров.</p>
            </div>
            <div className="shrink-0">
              <p className="font-numbers text-5xl md:text-6xl font-light text-primary leading-none">3 000 м²</p>
              <p className="font-body text-sm text-muted-foreground mt-1">пространства для отдыха и восстановления</p>
            </div>
          </motion.div>
          <motion.div {...fadeUp}>
            <VenueCarousel />
          </motion.div>
        </div>
      </section>

      {/* Программа */}
      <section id="program" className="py-20 md:py-28 section-padding scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <SectionLabel>Программа и участники</SectionLabel>
            <TwoLineTitle first="Программа девичника" second="+ участники." />
          </motion.div>

          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-16 mb-20 md:mb-28">
            {/* Лекторий */}
            <div>
              <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-4">Лекторий · выступления врачей</p>
              <div className="divide-y divide-border border-y border-border">
                {lectures.map((l, i) => (
                  <motion.div key={l.topic} {...fadeUp} transition={{ duration: 0.5, delay: 0.06 * i }} className="flex gap-5 md:gap-8 py-6 md:py-8">
                    <span className="font-numbers text-3xl md:text-4xl text-primary leading-none w-12 shrink-0">{num(i)}</span>
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl text-foreground leading-tight mb-2">{l.topic}</h3>
                      <p className="font-body text-base text-foreground/80 mb-2">{l.text}</p>
                      <p className="font-body text-sm text-primary">{l.speaker}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Другие форматы */}
            <div>
              <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-4">Другие форматы</p>
              <div className="divide-y divide-border border-y border-border">
                {otherFormats.map((f, i) => {
                  const inner = (
                    <>
                      <span>
                        <span className="block font-display text-2xl text-foreground leading-tight">{f.title}</span>
                        <span className="block font-body text-sm text-muted-foreground mt-1">{f.note}</span>
                      </span>
                      {f.href && <ArrowRight className="w-4 h-4 text-primary shrink-0 transition-transform group-hover:translate-x-1" />}
                    </>
                  );
                  return (
                    <motion.div key={f.title} {...fadeUp} transition={{ duration: 0.5, delay: 0.06 * i }}>
                      {f.href ? (
                        <a href={f.href} className="group flex items-center justify-between gap-4 py-5 md:py-6">{inner}</a>
                      ) : (
                        <div className="flex items-center justify-between gap-4 py-5 md:py-6">{inner}</div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Эксперты */}
          <div id="experts" className="scroll-mt-20">
            <motion.div {...fadeUp} className="mb-10">
              <SectionLabel>Спикеры и тренеры</SectionLabel>
              <TwoLineTitle first="Знакомим" second="с экспертами." />
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 md:gap-6 mb-20 md:mb-28">
              {experts.map((e) => (
                <motion.div key={e.surname} {...fadeUp}>
                  {/* Телефон: плитка 2×2, описание — по нажатию */}
                  <button type="button" onClick={() => setOpenExpert(e)} className="sm:hidden block w-full text-left">
                    <span className="relative block aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
                      <img src={e.photo} alt={`${e.name} ${e.surname}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top" />
                      <span className="absolute inset-0 bg-gradient-to-t from-warm-black/80 via-transparent to-transparent" />
                      <span className="absolute left-3 right-3 bottom-3">
                        <span className="inline-block font-body text-[9px] uppercase tracking-[0.18em] text-primary-foreground bg-primary rounded-full px-2 py-0.5 mb-1.5">Спикер</span>
                        <span className="block font-display text-2xl text-cream leading-[1]">
                          {e.name}
                          <br />
                          <span className="italic text-[#FFB4AC]">{e.surname}</span>
                        </span>
                      </span>
                    </span>
                    <span className="block font-body text-xs text-foreground/80 leading-snug mt-2 line-clamp-2">{e.regalia}</span>
                    <span className="block font-body text-[10px] uppercase tracking-[0.15em] text-primary mt-1">Подробнее →</span>
                  </button>

                  {/* Планшет и компьютер: текст слева, фото справа */}
                  <article className="hidden sm:grid sm:grid-cols-[1.15fr_0.85fr] gap-6 h-full bg-card border border-border rounded-2xl p-7">
                    <div className="min-w-0 flex flex-col">
                      <span className="self-start font-body text-[10px] uppercase tracking-[0.2em] text-primary bg-primary/10 rounded-full px-3 py-1 mb-4">Спикер</span>
                      <h3 className="font-display text-3xl md:text-4xl text-foreground leading-[1] mb-3">
                        {e.name}
                        <br />
                        <span className="italic text-primary">{e.surname}</span>
                      </h3>
                      <ExpertDetails e={e} />
                    </div>
                    <div className="rounded-2xl overflow-hidden bg-muted/40 min-h-[260px]">
                      <img src={e.photo} alt={`${e.name} ${e.surname}`} loading="lazy" className="w-full h-full object-cover object-top" />
                    </div>
                  </article>
                </motion.div>
              ))}
            </div>

            <Dialog open={!!openExpert} onOpenChange={(o) => !o && setOpenExpert(null)}>
              <DialogContent className="max-w-md w-[calc(100%-2rem)] max-h-[88vh] overflow-y-auto p-0 gap-0 rounded-2xl">
                {openExpert && (
                  <>
                    <div className="relative aspect-[4/5]">
                      <img src={openExpert.photo} alt={`${openExpert.name} ${openExpert.surname}`} className="absolute inset-0 w-full h-full object-cover object-top" />
                      <div className="absolute inset-0 bg-gradient-to-t from-warm-black/80 via-transparent to-transparent" />
                      <div className="absolute left-5 bottom-5">
                        <span className="inline-block font-body text-[10px] uppercase tracking-[0.2em] text-primary-foreground bg-primary rounded-full px-3 py-1 mb-3">Спикер</span>
                        <DialogTitle className="font-display text-4xl font-normal text-cream leading-[1]">
                          {openExpert.name}
                          <br />
                          <span className="italic text-[#FFB4AC]">{openExpert.surname}</span>
                        </DialogTitle>
                      </div>
                    </div>
                    <div className="flex flex-col p-5">
                      <ExpertDetails e={openExpert} />
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>

          {/* Бренды */}
          <div id="brands" className="scroll-mt-20 grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 items-stretch">
            <div>
              <motion.div {...fadeUp} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                <div>
                  <SectionLabel>Бренды и участники</SectionLabel>
                  <TwoLineTitle first="Красивые бренды." second="Осознанные смыслы." />
                </div>
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-right">
                  Партнёры мероприятия
                  <br />
                  (предварительный состав)
                </p>
              </motion.div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                {brands.map((b, i) =>
                  b === "Сбер Здоровье" ? (
                    <motion.div
                      key={b}
                      {...fadeUp}
                      transition={{ duration: 0.4, delay: 0.04 * i }}
                      className="col-span-full rounded-xl flex items-center justify-center gap-3 py-6 md:py-7 text-white"
                      style={{ background: "linear-gradient(90deg, #21A038 0%, #1DA0C9 100%)" }}
                    >
                      <span className="font-body font-semibold text-xl md:text-2xl tracking-wide">СберЗдоровье</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={b}
                      {...fadeUp}
                      transition={{ duration: 0.4, delay: 0.04 * i }}
                      className="aspect-[3/2] bg-card border border-border rounded-xl flex items-center justify-center text-center px-3 hover:border-primary/40 transition-colors"
                    >
                      <span className="font-display text-lg md:text-xl text-foreground tracking-wide">{b}</span>
                    </motion.div>
                  ),
                )}
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {brandCategories.map((c) => (
                  <div key={c.label} className="bg-card border border-border rounded-xl flex flex-col items-center justify-center text-center gap-2 p-3 aspect-square">
                    <c.icon className="w-5 h-5 text-primary" />
                    <span className="font-body text-[11px] leading-tight text-muted-foreground">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <motion.div {...fadeUp} className="rounded-2xl overflow-hidden min-h-[320px]">
              <img src={stilllifeImg} alt="Бьюти-продукты, игристое и шёлк" loading="lazy" className="w-full h-full object-cover" />
            </motion.div>
          </div>
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
              Участие — <span className="italic text-primary">440 ₽</span>
            </h2>
            <div className="inline-flex max-w-full items-center gap-3 sm:gap-4 bg-primary/10 border border-primary/30 rounded-full pl-2 pr-5 sm:pr-6 py-2">
              <span className="font-numbers text-2xl text-primary-foreground bg-primary rounded-full w-12 h-12 shrink-0 flex items-center justify-center">60</span>
              <span className="font-body text-sm text-foreground text-left">первых оплаченных регистраций гарантированно<br className="hidden sm:block" /> получают место в лектории</span>
            </div>
          </motion.div>
          <motion.div {...fadeUp}>
            <WellnessRegistration />
          </motion.div>
        </div>
      </section>

      {/* 24 октября: игристое и стилист */}
      <section id="october-24" className="section-padding pb-20 md:pb-28 scroll-mt-20">
        <motion.div
          {...fadeUp}
          className="max-w-7xl mx-auto relative overflow-hidden rounded-3xl bg-warm-black text-cream grid lg:grid-cols-[1.2fr_1fr]"
        >
          <div className="relative z-10 p-8 md:p-12 lg:p-14">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-body text-[10px] uppercase tracking-[0.25em] bg-primary text-primary-foreground rounded-full px-3 py-1">24 октября</span>
              <span className="font-body text-[10px] uppercase tracking-[0.25em] text-cream/50">накануне девичника</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-light leading-[1] mb-6">
              Игристое
              <br />
              <span className="italic text-primary">и стилист.</span>
            </h2>
            <p className="font-display text-xl md:text-2xl text-cream/90 leading-snug mb-6">
              Смени гардероб и помоги фонду помощи по борьбе с онкологией.
            </p>
            <ul className="space-y-3 mb-8">
              {["Деньги идут на благотворительные цели", "Борьба с онкологией в РФ"].map((t) => (
                <li key={t} className="flex items-center gap-3 font-body text-sm md:text-base text-cream/75">
                  <Heart className="w-4 h-4 text-primary shrink-0" /> {t}
                </li>
              ))}
            </ul>
            <a
              href={`https://t.me/${organizers[1].handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-body hover:opacity-90 transition-opacity"
            >
              Узнать подробности <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="relative min-h-[260px] lg:min-h-full">
            <img src={wardrobeImg} alt="Вешалка с одеждой и игристое" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-warm-black via-warm-black/30 to-transparent lg:via-warm-black/10" />
            <div className="absolute right-6 bottom-6 flex gap-3">
              {[Wine, Shirt, Gift].map((I, i) => (
                <span key={i} className="w-11 h-11 rounded-full bg-cream/15 backdrop-blur text-cream flex items-center justify-center">
                  <I className="w-5 h-5" />
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Один день. Полностью для себя. */}
      <section className="bg-card/50 py-20 md:py-28 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <SectionLabel>Атмосфера и опыт гостьи</SectionLabel>
              <TwoLineTitle first="Один день." second="Полностью для себя." />
            </div>
            <span className="self-start md:self-auto font-body text-[10px] uppercase tracking-[0.25em] text-primary bg-primary/10 rounded-full px-4 py-1.5">
              25 октября 2026
            </span>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-8">
            {experience.map((e, i) => (
              <motion.div key={e.title} {...fadeUp} transition={{ duration: 0.5, delay: 0.05 * i }} className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <IconCircle icon={e.icon} />
                <div>
                  <p className="font-numbers text-xs text-primary mb-1">{num(i)}</p>
                  <h3 className="font-display text-lg md:text-xl text-foreground leading-tight">{e.title}</h3>
                  <p className="font-body text-xs md:text-sm text-muted-foreground">{e.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Восемь направлений заботы */}
      <section className="py-20 md:py-28 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <SectionLabel>Зоны девичника</SectionLabel>
            <TwoLineTitle first="Восемь" second="направлений заботы." />
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {zones.map((z, i) => (
              <motion.article
                key={z.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.05 * (i % 4) }}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-500"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img src={z.img} alt={z.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-2 left-2 md:top-3 md:left-3 font-numbers text-xs md:text-sm text-primary bg-background/90 backdrop-blur rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                    {num(i)}
                  </span>
                </div>
                <div className="p-3 md:p-5">
                  <div className="flex items-start gap-3 mb-2">
                    <z.icon className="hidden md:block w-4 h-4 text-primary mt-1 shrink-0" />
                    <h3 className="font-display text-base md:text-lg text-foreground leading-tight">{z.title}</h3>
                  </div>
                  <p className="font-body text-xs md:text-sm text-muted-foreground leading-relaxed">{z.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Партнёрам */}
      <section id="partners" className="bg-card/50 py-20 md:py-28 section-padding scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-8">
            <SectionLabel>Предложение для партнёров</SectionLabel>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[1] mb-4">
              Станьте частью <span className="italic text-primary">«Отражения».</span>
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl">
              Приглашаем близкие по духу бренды разместить свою зону на площадке — и вместе сделать доброе дело.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="bg-primary/10 border border-primary/20 rounded-2xl px-6 py-5 mb-10">
            <p className="font-body text-[10px] uppercase tracking-[0.25em] text-primary mb-1">Больше, чем просто участие</p>
            <p className="font-body text-base text-foreground">Участвуя, вы поддерживаете профилактику рака груди и заботу о женщинах.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.div {...fadeUp} className="flex items-start gap-4">
              <IconCircle icon={Users} />
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.25em] text-primary mb-1">Аудитория</p>
                <p className="font-display text-2xl text-foreground">Женщины 25–45 · &lt; 500 гостей</p>
                <p className="font-body text-sm text-muted-foreground">доход средний и выше</p>
              </div>
            </motion.div>
            <motion.div {...fadeUp} className="flex items-start gap-4">
              <IconCircle icon={Megaphone} />
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.25em] text-primary mb-1">Медиаохват</p>
                <p className="font-numbers text-3xl md:text-4xl text-primary leading-none mb-1">335 000 – 750 000</p>
                <p className="font-body text-sm text-muted-foreground">совокупная аудитория соцсетей и СМИ, которые расскажут о событии</p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {partnerBenefits.map((b, i) => (
              <motion.div key={b.title} {...fadeUp} transition={{ duration: 0.4, delay: 0.04 * i }}>
                <IconCircle icon={b.icon} size="sm" />
                <h3 className="font-body text-sm font-medium text-foreground mt-3 mb-1">{b.title}</h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">{b.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-y border-border py-6 mb-14">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <span className="font-body text-[10px] uppercase tracking-[0.25em] text-primary">Формат участия</span>
              <span className="font-body text-base text-foreground">Зона партнёра на площадке</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <a href={`https://t.me/${organizers[1].handle}`} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                Гизела Тольц · @{organizers[1].handle} · {organizers[1].phoneLabel}
              </a>
              <span className="self-start sm:self-auto font-numbers text-2xl text-primary-foreground bg-primary rounded-full px-6 py-2">50 000 ₽</span>
            </div>
          </motion.div>

          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Вместе с нами</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {partners.map((pt) => (
              <motion.a
                key={pt.name}
                href={pt.url}
                target="_blank"
                rel="noopener noreferrer"
                title={pt.name}
                {...fadeUp}
                className="group aspect-[3/2] bg-background border border-border rounded-xl flex flex-col items-center justify-center text-center p-3 md:p-5 overflow-hidden hover:border-primary/40 transition-colors"
              >
                <div className="flex-1 w-full flex items-center justify-center">
                  <img src={pt.logo} alt={pt.name} loading="lazy" className={`${pt.logoClass} w-auto max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity`} />
                </div>
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-3">{pt.role}</p>
              </motion.a>
            ))}
            <motion.a
              href={`https://t.me/${organizers[1].handle}`}
              target="_blank"
              rel="noopener noreferrer"
              {...fadeUp}
              className="aspect-[3/2] border border-dashed border-primary/40 bg-primary/5 rounded-xl flex flex-col items-center justify-center text-center p-3 md:p-4 overflow-hidden hover:bg-primary/10 transition-colors"
            >
              <Store className="w-5 h-5 md:w-6 md:h-6 text-primary mb-1.5 md:mb-2" />
              <p className="font-display text-base md:text-xl text-primary leading-tight">Стать партнёром</p>
              <p className="font-body text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] text-muted-foreground mt-1 leading-tight">Напишите организаторам</p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Организаторы */}
      <section className="py-20 md:py-28 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <SectionLabel>Команда события</SectionLabel>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[0.95]">Организаторы</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 mb-12">
            {organizers.map((o) => (
              <motion.div key={o.surname} {...fadeUp} className="grid grid-cols-[0.8fr_1.2fr] gap-5 md:gap-6 items-start">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
                  <img src={o.photo} alt={`${o.name} ${o.surname}`} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl text-foreground leading-tight mb-3">
                    {o.name}
                    <br />
                    {o.surname}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">{o.text}</p>
                  <a href={`https://t.me/${o.handle}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-body text-sm text-primary hover:underline mb-2">
                    <Send className="w-4 h-4" /> @{o.handle}
                  </a>
                  <a href={`tel:${o.phone}`} className="flex items-center gap-2 font-body text-sm text-foreground hover:text-primary transition-colors">
                    <Phone className="w-4 h-4 text-primary" /> {o.phoneLabel}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-border pt-8">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-body text-sm text-muted-foreground">
              <span>Наши проекты:</span>
              <Link to="/" className="hover:text-primary transition-colors">Отражение добра — отразись.рф</Link>
              <a href="/docs/aktkom-portfolio-2026.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                АктКом — портфолио
              </a>
            </div>
            <p className="font-display italic text-3xl md:text-4xl text-primary -rotate-2">Спасибо, что вы с нами.</p>
          </motion.div>
          <div className="mt-10 flex justify-center">
            <a
              href="#registration"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 text-sm uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
            >
              Зарегистрироваться <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Wellness;
