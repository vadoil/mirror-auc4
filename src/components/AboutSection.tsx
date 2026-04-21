import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

import aboutVenue from "@/assets/about-venue.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative bg-background overflow-hidden">
      <div ref={ref}>
        <div className="py-24 md:py-32 section-padding">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-px bg-primary" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
                О проекте
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="min-w-0"
              >
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[0.9] text-foreground mb-8">
                  Благо
                  <br />
                  <span className="italic text-primary">творительные</span>
                  <br />
                  аукционы
                </h2>
                <div className="w-24 h-px bg-primary mb-8" />




                <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-body mb-4">
                  Забота о здоровье · Долголетие · Нейрогастрономия
                </p>

                <p className="editorial-body text-muted-foreground mb-6 max-w-lg">
                  В столице мы сфокусируемся на повестке в сфере здоровья, поговорим о долголетии и нейрогастрономии, продегустируем Blends от Inspiro – б/а напитки, продлевающие молодость мозга, проведём вечер в компании искромётного Александра Цыпкина и сможем сделать вклад в спасение от онкозаболеваний.
                </p>
                <p className="editorial-body text-muted-foreground mb-6 max-w-lg">
                  Мы верим, что забота о себе и забота о других – не противоположности, а отражение друг друга. Поэтому перед началом аукциона мы организуем для вас public talk о современных возможностях поддержать свой организм и баланс внутри.
                </p>
                <p className="editorial-body text-muted-foreground mb-8 max-w-lg">
                  «Отражение добра» – это аукцион, где каждый лот несёт смысл. Уникальные оздоровительные программы, ретриты, эксклюзивный опыт, а все деньги, вырученные с продаж билетов и аукциона, направляются в поддержку фонда «Не напрасно».
                </p>
                <div className="flex flex-wrap md:flex-nowrap gap-4 mb-8">
                  <Link to="/program" className="btn-outline inline-flex items-center justify-center flex-1 min-w-[140px] text-center">
                    Программа аукциона
                  </Link>
                  <Link to="/lots" className="btn-outline inline-flex items-center justify-center flex-1 min-w-[140px] text-center">
                    Смотреть лоты
                  </Link>
                  <a href="#tickets" className="btn-primary inline-flex items-center justify-center flex-1 min-w-[140px] text-center">
                    Регистрация
                  </a>
                </div>

                <div className="border-t border-border pt-6 space-y-3 max-w-lg">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-body mb-3">Контакты</p>
                  <div className="space-y-2">
                    <p className="font-body text-sm text-muted-foreground">
                      <span className="text-foreground font-medium">Организатор:</span> Гизела Тольц · 8 (985) 809-53-70 · <a href="https://t.me/Jiselle_Tolts" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@Jiselle_Tolts</a>
                    </p>
                    <p className="font-body text-sm text-muted-foreground">
                      <span className="text-foreground font-medium">Партнер:</span> Александра Павлова · 8 (962) 364-66-46 · <a href="https://t.me/alexa_ah_alexa" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@alexa_ah_alexa</a>
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img src={aboutVenue} alt="Баланс-холл «Место быть» – площадка благотворительного аукциона" loading="lazy" className="absolute inset-0 w-full h-full object-cover" width={1024} height={1280} />
                  <div className="absolute inset-0 bg-warm-black/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-black/70 via-transparent to-warm-black/20" />
                  <div className="text-center p-8 relative z-10 flex flex-col items-center justify-center h-full">
                    <p className="font-body text-cream/50 text-xs uppercase tracking-[0.3em] mb-4">Площадка</p>
                    <p className="font-display text-5xl md:text-6xl font-light text-cream italic leading-none mb-2">Место</p>
                    <p className="font-display text-5xl md:text-6xl font-light text-cream italic leading-none mb-4">быть</p>
                    <div className="w-12 h-px bg-primary mx-auto mb-4" />
                    <p className="font-body text-cream/60 text-sm max-w-xs mx-auto">
                      Баланс-холл · Мясницкая 24/7 · Москва
                    </p>
                  </div>
                </div>
                <div className="absolute top-6 right-6 bg-primary text-primary-foreground px-6 py-5">
                  <p className="font-numbers text-4xl font-light leading-none">100%</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-body mt-1.5">на благо</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="bg-primary py-4 overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="font-display text-lg md:text-xl text-primary-foreground/80 font-light italic tracking-wide">
                Благотворительность · Wellbeing · Осознанность · Ретриты · Здоровье · Баланс · Добро ·
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

