import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Mic, Quote } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuctionResultsSection from "@/components/AuctionResultsSection";
import heroPhoto from "@/assets/gallery/event/event-01.webp";
import reviewPhoto from "@/assets/review-naumov-photo.webp";
import event02 from "@/assets/gallery/event/event-02.webp";
import event09 from "@/assets/gallery/event/event-09.webp";
import event10 from "@/assets/gallery/event/event-10.webp";
import event11 from "@/assets/gallery/event/event-11.webp";
import event13 from "@/assets/gallery/event/event-13.webp";
import event17 from "@/assets/gallery/event/event-17.webp";
import tsipkinPhoto from "@/assets/tsipkin.webp";
import stupinPhoto from "@/assets/speaker-stupin.webp";
import pavlovPhoto from "@/assets/speaker-pavlov.webp";
import gunderinaPhoto from "@/assets/speaker-gunderina.webp";
import evnichPhoto from "@/assets/speaker-evnich.webp";

const timeline = [
  { time: "15:00", title: "Сбор гостей", text: "Дегустация б/а напитков Inspiro, знакомство с участниками и пространством «Место быть»." },
  { time: "16:00", title: "Открытая лекция", text: "Врачи и эксперты рассказали о ключевых подходах к долголетию и заботе о своём организме." },
  { time: "16:45", title: "Кофе-брейк", text: "Общение, фотозона и знакомство с лотами перед торгами." },
  { time: "17:00", title: "Аукцион", text: "Торги за оздоровительные программы, ретриты, произведения и эксклюзивный опыт." },
];

const people = [
  { name: "Ростислав Павлов", role: "Хирург-онколог", photo: pavlovPhoto },
  { name: "Родион Ступин", role: "Генеральный директор сети клиник «Будь здоров»", photo: stupinPhoto },
  { name: "Наталия Гундерина", role: "Продюсер проекта Karmalogic®, CEO Karmatravel", photo: gunderinaPhoto },
  { name: "Анна Евневич", role: "Smart Energy by Alexey Sitnikov · Hedonist One", photo: evnichPhoto },
];

const galleryPreview = [
  { src: event02, alt: "Гости вечера «Отражение добра»" },
  { src: event10, alt: "Спикеры на сцене аукциона" },
  { src: event09, alt: "Лоты - фарфоровые башни «Свод по крупицам»" },
  { src: event13, alt: "Бар Inspiro Blends" },
  { src: event11, alt: "Зал перед началом аукциона" },
  { src: event17, alt: "Гостьи с табличкой №1" },
];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-8 h-px bg-primary" />
    <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">{children}</p>
  </div>
);

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7 },
};

const ArchiveMoscow = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[70svh] md:min-h-[85svh] flex items-end overflow-hidden">
        <picture>
          <source media="(min-width: 768px)" srcSet={event10} />
          <img src={heroPhoto} alt="Александр Цыпкин и гости аукциона «Отражение добра»" className="absolute inset-0 w-full h-full object-cover md:object-[center_35%]" />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black/90 via-warm-black/40 to-warm-black/10" />
        <div className="relative z-10 section-padding pb-16 md:pb-24 pt-28 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <Link to="/archive" className="inline-block font-body text-xs uppercase tracking-[0.3em] text-cream/60 hover:text-cream transition-colors mb-6">
              ← Архив
            </Link>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-5 text-xs text-cream/70 font-body uppercase tracking-[0.2em]">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-primary" /> 26 апреля 2026</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" /> Москва · Balance Hall «Место быть»</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream uppercase tracking-tight leading-[0.9] mb-6">
              Забота о себе — <span className="italic text-primary">отражение</span> заботы о других
            </h1>
            <p className="font-body text-cream/70 text-base md:text-lg max-w-2xl">
              Благотворительный аукцион «Отражение добра» в Москве: вечер о здоровье, долголетии
              и нейрогастрономии в поддержку фонда «Не напрасно».
            </p>
          </motion.div>
        </div>
      </section>

      {/* Итоги */}
      <AuctionResultsSection />

      {/* Как это было */}
      <section className="py-20 md:py-28 section-padding">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <motion.div {...fadeUp}>
            <SectionLabel>Как это было</SectionLabel>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[0.95] mb-6">
              Один вечер — <span className="italic text-primary">четыре акта</span>
            </h2>
            <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
              Мы верим, что забота о себе и забота о других — не противоположности, а отражение
              друг друга. Поэтому перед торгами гости услышали открытую лекцию о том, как
              поддержать свой организм и баланс внутри, а затем сделали вклад в помощь людям
              с онкологическими заболеваниями.
            </p>
          </motion.div>
          <div className="space-y-4">
            {timeline.map((t, i) => (
              <motion.div
                key={t.time}
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                className="flex gap-6 bg-card border border-border rounded-lg p-6 hover:border-primary/40 transition-colors"
              >
                <p className="font-numbers text-2xl md:text-3xl font-light text-primary shrink-0 w-20">{t.time}</p>
                <div>
                  <h3 className="font-display text-lg md:text-xl uppercase tracking-tight text-foreground mb-1">{t.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{t.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ведущий и спикеры */}
      <section className="bg-warm-black text-cream py-20 md:py-28 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center mb-16">
            <motion.div {...fadeUp} className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <img src={tsipkinPhoto} alt="Александр Цыпкин" loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top" />
            </motion.div>
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-2 mb-4">
                <Mic className="w-4 h-4 text-primary" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-body">Ведущий вечера</span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight leading-[0.9] mb-6">
                Александр <span className="italic text-primary">Цыпкин</span>
              </h2>
              <p className="font-body text-sm md:text-base text-cream/60 leading-relaxed">
                Писатель, сценарист и продюсер, автор «Женщин непреклонного возраста» и создатель
                «БеспринцЫпных чтений». Он провёл торги с юмором и энергией — так, что ставки
                превращались в эмоции, а эмоции — в реальную помощь фонду.
              </p>
            </motion.div>
          </div>

          <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/40 font-body mb-8">Спикеры открытой лекции</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {people.map((p, i) => (
              <motion.div key={p.name} {...fadeUp} transition={{ duration: 0.5, delay: 0.08 * i }}>
                <div className="aspect-square overflow-hidden rounded-2xl mb-4 bg-cream/5">
                  <img src={p.photo} alt={p.name} loading="lazy" className="w-full h-full object-cover object-top" />
                </div>
                <h3 className="font-display text-base md:text-lg uppercase tracking-tight text-cream mb-1">{p.name}</h3>
                <p className="font-body text-xs text-cream/50 leading-relaxed">{p.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Галерея */}
      <section className="py-20 md:py-28 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <SectionLabel>Галерея</SectionLabel>
              <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[0.95]">
                Моменты <span className="italic text-primary">вечера</span>
              </h2>
            </div>
            <Link to="/gallery" className="btn-outline inline-flex items-center gap-2 text-sm self-start md:self-auto">
              Вся галерея <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryPreview.map((p, i) => (
              <motion.div key={p.src} {...fadeUp} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}>
                <Link to="/gallery" className="group block aspect-[3/4] overflow-hidden rounded-2xl bg-muted/20">
                  <img src={p.src} alt={p.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Лоты и фонд */}
      <section className="section-padding pb-20 md:pb-28">
        <motion.div
          {...fadeUp}
          className="max-w-7xl mx-auto bg-primary/5 border border-primary/20 rounded-lg p-8 md:p-12 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center"
        >
          <div>
            <SectionLabel>Что было на торгах</SectionLabel>
            <h2 className="font-display text-3xl md:text-5xl font-light tracking-tight text-foreground leading-[0.95] mb-4">
              Каждый лот <span className="italic text-primary">несёт смысл</span>
            </h2>
            <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
              Оздоровительные программы, ретриты, фарфоровые башни «Свод по крупицам», украшения
              ручной работы и эксклюзивный опыт от партнёров. Все деньги от продажи билетов
              и лотов направлены в фонд «Не напрасно».
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link to="/lots" className="bg-primary text-primary-foreground px-6 py-4 rounded inline-flex items-center justify-center gap-2 text-sm uppercase tracking-[0.15em] hover:opacity-90 transition-opacity">
              Лоты аукциона <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/program" className="btn-outline inline-flex items-center justify-center gap-2 text-sm">
              Программа вечера <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Отзыв */}
      <section className="bg-card/50 py-20 md:py-28 section-padding">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center">
          <motion.div {...fadeUp} className="aspect-[4/5] overflow-hidden rounded-2xl max-w-sm md:max-w-none mx-auto w-full">
            <img src={reviewPhoto} alt="Олег Наумов, гость аукциона" loading="lazy" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div {...fadeUp}>
            <SectionLabel>Отзывы гостей</SectionLabel>
            <Quote className="w-8 h-8 text-primary/40 mb-4" />
            <p className="font-display text-xl md:text-2xl text-foreground leading-snug mb-6">
              Интересные люди, хорошая организация, яркие ведущие — Александр Цыпкин и Юрий Омельченко
              создали весёлую и непринуждённую камерную атмосферу тёплого вечера.
            </p>
            <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
              Неординарные лоты дали возможность не только быть вкладом в полезное и нужное дело —
              поддержку подготовки специалистов в сфере онкологии, но и прикоснуться к роскоши
              материального мира, попробовать прогрессивные технологии здорового образа жизни
              и встретиться с неординарными личностями. С большим удовольствием и пользой провёл вечер.
              Организаторам — большая благодарность!
            </p>
            <p className="font-display text-sm uppercase tracking-[0.15em] text-foreground mb-8">Олег Наумов</p>
            <Link to="/lots#reviews" className="btn-outline inline-flex items-center gap-2 text-sm">
              Оставить свой отзыв <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ArchiveMoscow;
