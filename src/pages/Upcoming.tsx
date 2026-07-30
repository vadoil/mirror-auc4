import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, MapPin, Clock, Eye, Palette, Utensils, MessageCircle, Ticket, HeartHandshake, ArrowRight, Sparkles, Check, Users, Heart, Target, Brush, Globe, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TicketRequestModal from "@/components/TicketRequestModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import spbHero from "@/assets/upcoming-spb-hero.jpg";
import zrenieVenue from "@/assets/venue-zrenie-spb.jpg";
import zrenie2 from "@/assets/venue-zrenie-2.jpg";
import zrenie3 from "@/assets/venue-zrenie-3.jpg";
import zrenie4 from "@/assets/venue-zrenie-4.jpg";
import artist1 from "@/assets/artist-1-sergienko.jpg";
import artist2 from "@/assets/artist-2-bartenev.jpg";
import artist3 from "@/assets/artist-3-abrosimov.jpg";
import abrosimovWork1 from "@/assets/abrosimov-work-1.jpg";
import abrosimovWork2 from "@/assets/abrosimov-work-2.jpg";
import abrosimovWork3 from "@/assets/abrosimov-work-3.jpg";

const artists = [
  {
    name: "Алексей Сергиенко",
    role: "художник-концептуалист, поп-арт",
    text: "Российский художник-концептуалист, мастер жизнерадостного поп-арта, предприниматель и общественный деятель, основатель «Центра поддержки искусств Санкт-Петербурга». Представит холсты из своей знаковой серии.",
    photo: artist1,
  },
  {
    name: "Андрей Бартенев",
    role: "художник, сценограф, перформер",
    text: "Один из главных представителей российского перформанса и сюрреализма, педагог, ведущий популярного шоу «Модный приговор». Передаёт в благотворительную продажу свои объекты-инсталляции.",
    photo: artist2,
  },
  {
    name: "Дмитрий Абросимов",
    role: "художник, glowing-art",
    text: "Автор флуоресцентной живописи: его мистические полотна «оживают» в темноте, стирая границу между сном и явью. Более 20 лет практики, свыше 40 выставок и 150 работ в частных и музейных коллекциях.",
    photo: artist3,
    details: {
      title: "Инверсия цвета. Тёмная сторона искусства",
      subtitle: "Выход из мерности: свет в темноте",
      paragraphs: [
        "Дмитрий Абросимов - художник, чьё искусство создано для познания абстрактных образов в темноте. Мистические полотна словно преодолевают понятие мерности и поглощают зрителя в живую многослойную НЕреальность. Источник вдохновения - личные впечатления автора от многочисленных путешествий, где истории случайных попутчиков переплетаются с энергетикой и многообразием культур.",
        "Сделав флуоресцентную живопись основным медиумом, художник относит своё творчество к направлению glowing-art. Его картины предназначены для тёмных помещений: они «оживают», приобретают глубину и многомерность при специальном освещении. Вдохновением в начале пути стала история Куинджи и его «Лунной ночи на Днепре», показанной в тёмном зале в Санкт-Петербурге.",
        "Каждая работа - это история о путешествии. «Амстердам» создан под впечатлением от первого посещения города, «Explosive Ice» родилась в Лапландии как осмысление травмы, а больше всего полотен написано на Пангане, где художник живёт и работает несколько месяцев в году.",
        "Создание работы автор разбивает на четыре этапа: непредсказуемый подмалёвок в духе Поллока, выбор композиции из визуального «лабиринта», прорисовка чёрного фона и проявление «света в темноте». «Если задуматься, чёрный - самый главный цвет из всех. Только он может раскрыть глубину других красок», - говорит Дмитрий.",
        "Художественная практика Дмитрия насчитывает более 20 лет. Он работает в России, Таиланде и Индии, участвовал более чем в 40 выставках, в том числе в крупных государственных институциях. Сооснователь портала о современном искусстве Artifex.ru и продюсер одноимённого YouTube-канала.",
      ],
      works: [
        { src: abrosimovWork1, alt: "Флуоресцентная работа Дмитрия Абросимова - вихрь неоновых мазков" },
        { src: abrosimovWork2, alt: "Флуоресцентная работа Дмитрия Абросимова - светящаяся сфера" },
        { src: abrosimovWork3, alt: "Флуоресцентная работа Дмитрия Абросимова - золотой круг на синем" },
      ],
    },
  },
];


const programItems = [
  {
    icon: MessageCircle,
    title: "Разговор с врачом",
    lead: "Владислав Евсеев",
    subtitle: "онколог-химиотерапевт, руководитель Медицинского совета фонда «Не напрасно»",
    body: (
      <>
        <span className="text-foreground font-medium">«Здоровье как можно дольше: куда смотреть, чтобы не пропустить главное».</span>{" "}
        Владислав объяснит разницу между грамотным скринингом по международным протоколам и коммерческими предложениями «сдай всё подряд», подскажет, какие популярные инструменты заботы о здоровье полезны, а какие — навредят. После лекции — открытая сессия вопросов и ответов.
      </>
    ),
  },
  {
    icon: Palette,
    title: "Искусство смыслов",
    lead: "Когда арт-проекты тоже помогают",
    subtitle: "три художника — одна тема",
    body: "Специально для этого вечера три совершенно разных художника создали работы, объединённые общей темой. Акция «Искусство смыслов» пройдёт в очном и онлайн-форматах, следите за ней прямо со смартфона через QR-код. Внесённое до события пожертвование будет засчитано: каждый сможет уйти домой с картиной.",
  },
  {
    icon: Eye,
    title: "Экспресс-диагностика зрения",
    lead: "От врачей клиники «Зрение»",
    subtitle: "15 минут · бесконтактно",
    body: "Современное оборудование позволит за 15 минут бесконтактно измерить внутриглазное давление, проверить остроту зрения и сделать снимок сетчатки.",
  },
  {
    icon: Utensils,
    title: "Гастрономия и общение",
    lead: "Лёгкие сеты",
    subtitle: "финал вечера",
    body: "В завершение — лёгкие гастрономические сеты и неспешное общение с гостями, художниками и командой фонда.",
  },
];

const Upcoming = () => {
  const [ticketOpen, setTicketOpen] = useState(false);
  const [artistInfo, setArtistInfo] = useState<(typeof artists)[number] | null>(null);

  const [donateOpen, setDonateOpen] = useState(false);
  const [donateAmount, setDonateAmount] = useState<number>(3000);
  const [donateInput, setDonateInput] = useState<string>("3000");

  const openDonate = () => {
    const n = parseInt(donateInput.replace(/\D/g, ""), 10);
    if (!Number.isFinite(n) || n < 100) {
      setDonateAmount(3000);
    } else {
      setDonateAmount(n);
    }
    setDonateOpen(true);
  };
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollCarousel = (dir: "prev" | "next") => {
    const el = carouselRef.current;
    if (!el) return;
    const delta = el.clientWidth * 0.85 * (dir === "next" ? 1 : -1);
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pb-24">
        {/* Hero */}
        <section className="relative min-h-[80svh] md:min-h-[92svh] flex items-end overflow-hidden mb-16 md:mb-24">
          <div className="absolute inset-0">
            <img
              src={spbHero}
              alt="Санкт-Петербург на закате"
              className="absolute inset-0 w-full h-full object-cover"
              width={1920}
              height={1280}
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />

            {/* световое боке */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden z-[5]">
              {[
                { size: 180, x: "8%",  y: "18%", color: "255,236,180", dur: 14, delay: 0,   blur: 8 },
                { size: 120, x: "22%", y: "62%", color: "200,230,255", dur: 18, delay: 1.5, blur: 6 },
                { size: 220, x: "38%", y: "30%", color: "255,220,200", dur: 22, delay: 0.8, blur: 12 },
                { size: 90,  x: "55%", y: "70%", color: "255,250,220", dur: 16, delay: 2.2, blur: 5 },
                { size: 260, x: "72%", y: "22%", color: "255,240,190", dur: 26, delay: 0.3, blur: 14 },
                { size: 140, x: "85%", y: "58%", color: "220,235,255", dur: 20, delay: 1.1, blur: 7 },
                { size: 70,  x: "48%", y: "12%", color: "255,255,240", dur: 12, delay: 2.8, blur: 4 },
                { size: 110, x: "12%", y: "80%", color: "255,225,195", dur: 19, delay: 1.9, blur: 6 },
                { size: 160, x: "63%", y: "48%", color: "210,230,250", dur: 24, delay: 0.6, blur: 9 },
                { size: 80,  x: "30%", y: "88%", color: "255,245,215", dur: 15, delay: 2.4, blur: 5 },
                { size: 200, x: "92%", y: "82%", color: "255,235,185", dur: 21, delay: 1.3, blur: 11 },
                { size: 60,  x: "5%",  y: "45%", color: "240,250,255", dur: 13, delay: 0.9, blur: 4 },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: b.size,
                    height: b.size,
                    left: b.x,
                    top: b.y,
                    filter: `blur(${b.blur}px)`,
                    background: `radial-gradient(circle, rgba(${b.color},0.75) 0%, rgba(${b.color},0.35) 40%, rgba(${b.color},0) 70%)`,
                    mixBlendMode: "screen",
                  }}
                  animate={{
                    x: [0, 30, -20, 0],
                    y: [0, -25, 15, 0],
                    opacity: [0.35, 0.9, 0.55, 0.35],
                    scale: [1, 1.15, 0.95, 1],
                  }}
                  transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 section-padding pb-16 md:pb-24 pt-28 w-full">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-primary" />
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white font-body drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
                    13 августа 2026 · Санкт-Петербург
                  </p>
                </div>

                <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[1.02] mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
                  Искусство видеть <span className="italic">главное</span>
                </h1>

                <p className="font-body text-white/85 text-sm md:text-base max-w-2xl leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] mb-4">
                  Благотворительный вечер в поддержку фонда «Не напрасно».
                </p>

                <p className="font-body text-white/90 text-base md:text-lg max-w-2xl leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                  В мире, где мы привыкли смотреть на поверхность вещей, есть те, кто смотрит вглубь.
                  Мы собираемся в центре современной офтальмологии «Зрение», чтобы вместе
                  сфокусироваться на главном — на будущем без страха перед раком.
                </p>

                {/* meta strip */}
                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-px bg-border/60 rounded-lg overflow-hidden border border-border/60 backdrop-blur-sm">
                  {[
                    { icon: Calendar, label: "Дата", value: "13 августа 2026" },
                    { icon: MapPin, label: "Место", value: "Центр «Зрение», СПб" },
                    { icon: Clock, label: "Формат", value: "офлайн + онлайн" },
                  ].map((m, i) => (
                    <div key={i} className="bg-background/85 backdrop-blur-sm p-5 flex items-center gap-4">
                      <m.icon className="w-4 h-4 text-primary shrink-0" />
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground font-body mb-1">
                          {m.label}
                        </p>
                        <p className="font-display text-sm text-foreground uppercase tracking-wide">
                          {m.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => setTicketOpen(true)}
                    className="bg-primary text-primary-foreground px-6 py-3 rounded inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
                  >
                    <Ticket className="w-4 h-4" /> Сделать пожертвование · 7 000 ₽
                  </button>
                  <a
                    href="#donation"
                    className="border border-white/40 text-white px-6 py-3 rounded inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] hover:bg-white/10 transition-colors"
                  >
                    <HeartHandshake className="w-4 h-4" /> Поддержать фонд
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Миссия */}
        <section className="section-padding mb-16 md:mb-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch"
            >
              {/* Left: eyebrow + heading + narrative */}
              <div className="lg:col-span-6 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-px bg-primary" />
                  <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-body font-medium">
                    О вечере
                  </p>
                </div>
                <h2 className="font-display text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight text-foreground leading-[0.9] mb-10">
                  Смотреть <br />
                  <span className="italic text-primary font-normal">вглубь</span>
                </h2>

                <div className="space-y-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl flex-1">
                  <p>
                    Миссия фонда <span className="text-foreground font-medium">«Не напрасно»</span> — спасать
                    жизни до того, как человек столкнётся с онкологическим заболеванием, и помогать
                    ему не остаться один на один с диагнозом.
                  </p>
                  <p>
                    Чтобы поддержать эту невидимую, но жизненно важную работу, центр современной
                    офтальмологии <span className="text-foreground font-medium italic">«Зрение»</span> открывает
                    свои двери для особенного вечера. Мы собираемся там, где каждый день дарят людям
                    возможность чётко видеть мир, чтобы вместе сфокусироваться на главном — на
                    будущем без страха перед раком.
                  </p>
                  <p className="text-foreground">
                    Присоединяйтесь к нам <span className="text-primary font-medium">13 августа 2026 года</span>.
                    Собранные средства будут направлены на программы помощи людям с
                    онкологическими заболеваниями.
                  </p>
                </div>
              </div>

              {/* Right: 2×2 uniform cards */}
              <div className="lg:col-span-6 flex flex-col">
                <div className="grid grid-cols-2 gap-px bg-border border border-border overflow-hidden rounded-sm flex-1">
                  {[
                    { label: "Фокус", value: "Онко\nскрининг", Icon: Target, anim: { rotate: [0, 8, -8, 0] } },
                    { label: "Художники", value: "Искусство\nсмыслов", Icon: Brush, anim: { rotate: [-6, 6, -6], y: [0, -2, 0] } },
                    { label: "Выручка", value: "В пользу\nфонда", Icon: Heart, anim: { scale: [1, 1.18, 1] } },
                    { label: "Формат", value: "Офлайн\n+ онлайн", Icon: Globe, anim: { rotate: [0, 360] } },
                  ].map((card, i) => {
                    const Icon = card.Icon;
                    return (
                      <div
                        key={i}
                        className="group bg-background p-6 md:p-8 flex flex-col justify-between min-h-[180px] md:min-h-[220px] relative overflow-hidden"
                      >
                        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-body relative z-10">
                          {card.label}
                        </span>

                        {/* Animated red icon */}
                        <motion.div
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/15 group-hover:text-primary/35 transition-colors duration-500 pointer-events-none"
                          animate={card.anim}
                          transition={{
                            duration: card.Icon === Globe ? 24 : 4 + i * 0.6,
                            repeat: Infinity,
                            ease: card.Icon === Globe ? "linear" : "easeInOut",
                          }}
                        >
                          <Icon className="w-24 h-24 md:w-28 md:h-28" strokeWidth={1.2} />
                        </motion.div>

                        <div className="relative z-10">
                          <p className="font-display text-xl md:text-2xl uppercase leading-tight tracking-tight whitespace-pre-line">
                            <span className="text-foreground">{card.value.split("\n")[0]}</span>
                            <br />
                            <span className="italic text-primary font-normal">{card.value.split("\n")[1]}</span>
                          </p>
                          <div className="absolute -bottom-2 left-0 w-8 h-px bg-primary transition-all duration-500 group-hover:w-full" />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60 font-body">
                    Санкт-Петербург · 2026
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>


        {/* Программа */}
        <section className="section-padding mb-16 md:mb-24">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-primary" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-body">
                  01 - Программа вечера
                </p>
              </div>
              <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight text-foreground leading-[0.95]">
                Что нас <span className="italic text-primary">ждёт</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {programItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="group relative border border-border rounded-lg p-8 bg-muted/30 hover:border-primary/40 hover:bg-muted/50 transition-all duration-500"
                  >
                    <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center mb-5 group-hover:border-primary/60 group-hover:bg-primary/5 transition-all">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-body mb-2">
                      0{i + 1} · {item.subtitle}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl text-foreground uppercase tracking-tight leading-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="font-display text-base italic text-primary/90 mb-4">
                      {item.lead}
                    </p>
                    <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                      {item.body}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Художники */}
        <section className="section-padding mb-16 md:mb-24">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-primary" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-body">
                  02 - Художники аукциона
                </p>
              </div>
              <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight text-foreground leading-[0.95]">
                Три взгляда, <span className="italic text-primary">одна тема</span>
              </h2>
              <p className="font-body text-sm md:text-base text-muted-foreground mt-4 max-w-2xl">
                Специально для вечера три совершенно разных художника создали работы, объединённые
                общей темой. Собранные средства будут направлены в фонд «Не напрасно».
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {artists.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group border border-border rounded-lg overflow-hidden bg-card hover:border-primary/40 transition-all duration-500 flex flex-col"
                >
                  {/* Photo - unified frame */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <motion.img
                      src={a.photo}
                      alt={a.name}
                      loading="lazy"
                      width={768}
                      height={960}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      animate={{
                        scale: [1, 1.015, 1],
                        rotate: [0, 0.3, 0],
                      }}
                      transition={{
                        duration: 6 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.8,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent opacity-60" />
                    <div className="absolute top-4 left-4">
                      <span className="font-numbers text-3xl md:text-4xl text-primary drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                        0{i + 1}
                      </span>
                    </div>
                    {a.details && (
                      <motion.button
                        type="button"
                        onClick={() => setArtistInfo(a)}
                        aria-label={`Подробнее о художнике ${a.name}`}
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
                      >
                        <Info className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-px w-8 bg-primary" />
                      <div className="flex-1 h-px bg-border" />
                    </div>
                    <h3 className="font-display text-xl md:text-2xl text-foreground uppercase tracking-tight leading-tight mb-2">
                      {a.name}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-body mb-4">
                      {a.role}
                    </p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {a.text}
                    </p>
                    {a.details && (
                      <button
                        type="button"
                        onClick={() => setArtistInfo(a)}
                        className="mt-5 self-start inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-primary border-b border-primary/40 hover:border-primary pb-1 transition-colors"
                      >
                        Подробнее о художнике <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Место */}
        <section className="section-padding mb-16 md:mb-24">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-primary" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-body">
                  03 - Место проведения
                </p>
              </div>
              <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight text-foreground leading-[0.95]">
                Центр <span className="italic text-primary">«Зрение»</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-0 border border-border rounded-lg overflow-hidden mb-6">
              <div className="relative aspect-[4/3] lg:aspect-auto min-h-[320px] overflow-hidden group">
                <img
                  src={zrenieVenue}
                  alt="Центр «Зрение» - Санкт-Петербург, пр. Добролюбова 20к1"
                  loading="lazy"
                  width={1600}
                  height={1200}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-cream/70 font-body mb-2">
                    Площадка вечера
                  </p>
                  <p className="font-display text-2xl md:text-3xl text-cream uppercase tracking-tight leading-tight">
                    Центр <span className="italic text-primary">«Зрение»</span>
                  </p>
                </div>
              </div>

              <div className="p-8 md:p-10 bg-muted/30 flex flex-col justify-center">
                <div className="flex items-start gap-3 mb-5">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <p className="font-display text-base md:text-lg text-foreground uppercase tracking-wide leading-snug">
                    Санкт-Петербург,<br />пр. Добролюбова, 20к1
                  </p>
                </div>
                <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                  Клиника высокоточной диагностики, оказавшая поддержку мероприятию.
                  Пространство, где каждый день дарят людям возможность чётко видеть мир.
                </p>
                <p className="font-body text-sm text-muted-foreground/80 leading-relaxed">
                  <span className="text-foreground font-medium">Дата и время:</span> 13 августа 2026,
                  сбор гостей — <span className="text-foreground font-medium">17:30</span>.
                </p>
              </div>
            </div>

            {/* Carousel — фото пространства «Зрение» */}
            <div className="relative mb-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-body">
                  Пространство «Зрение» · галерея
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => scrollCarousel("prev")}
                    aria-label="Предыдущее фото"
                    className="w-10 h-10 rounded-full border border-border text-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollCarousel("next")}
                    aria-label="Следующее фото"
                    className="w-10 h-10 rounded-full border border-border text-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-2 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {[zrenie2, zrenie3, zrenie4, zrenieVenue].map((src, i) => (
                  <div
                    key={i}
                    className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[48%] lg:w-[38%] aspect-[3/2] overflow-hidden rounded-lg border border-border bg-muted"
                  >
                    <img
                      src={src}
                      alt={`Центр «Зрение» — интерьер ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-[1.2s] ease-out"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-border rounded-lg p-8 bg-card">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-body mb-3">
                Фонд «Не напрасно»
              </p>
              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                Единственный в России фонд, который системно и комплексно занимается профилактикой
                онкологических и других заболеваний, снижая смертность от рака, обучает онкологов,
                качественно меняя медицину. Создан врачами, и по сей день все программы «Не напрасно»
                реализуются при участии медицинских специалистов.
              </p>
            </div>
          </div>
        </section>

        {/* Билеты */}
        <section className="section-padding mb-16 md:mb-24">
          <div className="max-w-7xl mx-auto">
            <div className="border border-primary/30 rounded-lg overflow-hidden bg-primary/5">
              <div className="grid lg:grid-cols-5 gap-0">
                <div className="lg:col-span-3 p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-px bg-primary" />
                    <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-body">
                      Благотворительность вместо пригласительных
                    </p>
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight text-foreground leading-[0.95] mb-6">
                    Ваш <span className="italic text-primary">вклад</span>
                  </h2>
                  <div className="space-y-4 font-body text-base text-muted-foreground leading-relaxed mb-8">
                    <p>
                      На портале «Отражения добра» нет случайных прохожих. Если текст откликается в вас -
                      значит, вы уже часть нашего сообщества. Участие в вечере - это ваш вклад
                      в просветительские проекты «Не напрасно».
                    </p>
                    <p className="text-foreground">
                      Благотворительное пожертвование:{" "}
                      <span className="font-numbers text-2xl text-primary">7 000 ₽</span>.
                      Количество мест ограничено. Ваш взнос будет засчитан для активности
                      «Искусство со смыслом».
                    </p>
                  </div>
                  <button
                    onClick={() => setTicketOpen(true)}
                    className="bg-primary text-primary-foreground px-8 py-4 rounded inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
                  >
                    <Ticket className="w-4 h-4" /> Сделать пожертвование <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="lg:col-span-2 bg-card/50 border-t lg:border-t-0 lg:border-l border-primary/20 p-8 md:p-10 flex flex-col justify-center">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-body mb-5">
                    Что входит в билет
                  </p>
                  <ul className="space-y-4">
                    {[
                      { icon: MessageCircle, text: "Разговор с онкологом-химиотерапевтом" },
                      { icon: Palette, text: "Акция «Искусство со смыслом» от трёх художников" },
                      { icon: Eye, text: "Экспресс-диагностика зрения" },
                      { icon: Utensils, text: "Гастрономические сеты и общение" },
                      { icon: Users, text: "Ограниченный круг гостей" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full border border-primary/30 flex items-center justify-center shrink-0">
                          <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        <p className="font-body text-sm text-foreground leading-snug pt-2">
                          {item.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Пожертвование */}
        <section id="donation" className="section-padding scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="border border-border rounded-lg overflow-hidden bg-card">
              <div className="grid lg:grid-cols-5 gap-0">
                <div className="lg:col-span-3 p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-px bg-primary" />
                    <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-body">
                      Пожертвование
                    </p>
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight text-foreground leading-[0.95] mb-6">
                    Помощь людям с <span className="italic text-primary">онкозаболеваниями</span>
                  </h2>
                  <p className="font-body text-base text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                    Если вы не сможете быть с нами лично, вы можете поддержать программы фонда
                    «Не напрасно» любой суммой. Все средства направляются на помощь людям
                    с онкологическими заболеваниями.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-4">
                    {[1000, 3000, 5000, 10000].map((v) => (
                      <button
                        key={v}
                        onClick={() => setDonateInput(String(v))}
                        className={`px-5 py-2.5 rounded border font-numbers text-base transition-colors ${
                          donateInput === String(v)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-foreground hover:border-primary/40"
                        }`}
                      >
                        {v.toLocaleString("ru-RU")} ₽
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 items-stretch max-w-md">
                    <div className="flex items-center gap-2 flex-1 min-w-[180px] border border-border rounded px-4 bg-background">
                      <input
                        type="number"
                        min={100}
                        step={100}
                        value={donateInput}
                        onChange={(e) => setDonateInput(e.target.value)}
                        placeholder="Своя сумма"
                        className="flex-1 bg-transparent py-3 text-base font-numbers text-foreground placeholder:text-muted-foreground focus:outline-none"
                      />
                      <span className="font-body text-sm text-muted-foreground">₽</span>
                    </div>
                    <button
                      onClick={openDonate}
                      className="bg-primary text-primary-foreground px-6 py-3 rounded inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
                    >
                      <HeartHandshake className="w-4 h-4" /> Поддержать фонд
                    </button>
                  </div>
                  <p className="font-body text-xs text-muted-foreground/80 mt-4">
                    Минимальная сумма - 100 ₽. Оплата - через защищённый шлюз CloudPayments.
                  </p>
                </div>

                <div className="lg:col-span-2 bg-muted/40 border-t lg:border-t-0 lg:border-l border-border p-8 md:p-10 flex flex-col justify-center">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-body mb-5">
                    Куда идут средства
                  </p>
                  <ul className="space-y-5">
                    {[
                      { icon: Heart, title: "Поддержка пациентов", text: "Помощь тем, кто столкнулся с диагнозом" },
                      { icon: Eye, title: "Ранняя диагностика", text: "Скрининги по международным протоколам" },
                      { icon: Users, title: "Обучение врачей", text: "Программы для онкологов России" },
                      { icon: Sparkles, title: "Просвещение", text: "Доступные знания о профилактике" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center shrink-0">
                          <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-display text-sm text-foreground uppercase tracking-wide mb-1">
                            {item.title}
                          </p>
                          <p className="font-body text-xs text-muted-foreground leading-snug">
                            {item.text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      <TicketRequestModal
        isOpen={ticketOpen}
        onClose={() => setTicketOpen(false)}
        ticketType="Билет · Санкт-Петербург, 13 августа 2026"
        ticketPrice="7 000 ₽"
        showTrainingCheckbox={false}
      />

      <TicketRequestModal
        isOpen={donateOpen}
        onClose={() => setDonateOpen(false)}
        ticketType="Пожертвование в фонд «Не напрасно»"
        ticketPrice={`${donateAmount.toLocaleString("ru-RU")} ₽`}
        showTrainingCheckbox={false}
      />
    </div>
  );
};

export default Upcoming;
