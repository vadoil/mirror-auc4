import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

import mansionImg from "@/assets/spb2911/mansion-caryatid.webp";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative bg-background overflow-hidden">
      <div ref={ref}>
        <div className="py-12 md:py-16 section-padding">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-px bg-primary" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
                Следующий вечер · 29 ноября
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="min-w-0"
              >
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[0.95] text-foreground mb-8">
                  Вечер
                  <br />
                  <span className="italic text-primary">в историческом</span>
                  <br />
                  особняке
                </h2>
                <div className="w-24 h-px bg-primary mb-8" />

                <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-body mb-4">
                  Санкт-Петербург · 29 ноября, воскресенье · в поддержку фонда «Не напрасно»
                </p>

                <p className="editorial-body text-muted-foreground mb-6 max-w-lg">
                  Этой осенью мы приглашаем вас в Петербург — в город, где умеют превращать вечер в событие: с парадной лестницей, музыкой
                  и разговорами, которые не хочется заканчивать. Новое «Отражение добра» пройдёт в историческом особняке.
                </p>
                <p className="editorial-body text-muted-foreground mb-6 max-w-lg">
                  У дверей вас встретят дама или кавалер и проводят в зал. Вас ждут музыка, вечерние туалеты, фуршет и шампанское, а затем —
                  аукцион современного искусства, который проведут Александр Цыпкин и Юрий Омельченко.
                </p>
                <p className="editorial-body text-muted-foreground mb-8 max-w-lg">
                  В каталоге — работы Андрея Бартенева, Константина Чайкина, Яниса Чамалиди и Dimsona, изделия Liza Borzaya и Vintage Dream,
                  фарфор «Сказ по краю». Средства от продажи лотов будут направлены фонду «Не напрасно».
                </p>
                <Link to="/peterburg" className="btn-outline inline-flex items-center justify-center">
                  Подробнее о вечере
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <Link to="/peterburg" className="block group">
                  <div className="aspect-[4/5] overflow-hidden relative rounded-2xl">
                    <img src={mansionImg} alt="Интерьер петербургского особняка" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out" width={900} height={1249} />
                    <div className="absolute inset-0 bg-warm-black/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-warm-black/90 via-warm-black/20 to-transparent" />
                    <div className="text-center p-8 relative z-10 flex flex-col items-center justify-end h-full pb-12">
                      <p className="font-body text-cream/70 text-[10px] uppercase tracking-[0.35em] mb-4">29 ноября · Санкт-Петербург</p>
                      <p className="font-display text-4xl md:text-5xl font-light text-cream italic leading-none mb-2">Исторический</p>
                      <p className="font-display text-4xl md:text-5xl font-light text-cream italic leading-none mb-5">особняк</p>
                      <div className="w-12 h-px bg-primary mx-auto mb-4" />
                      <p className="font-body text-cream text-sm max-w-xs mx-auto mb-5">Благотворительный вечер «Отражение добра»</p>
                      <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cream border border-cream/30 px-4 py-2 group-hover:border-primary group-hover:text-primary transition-colors">
                        Подробнее о вечере
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 bg-primary text-primary-foreground px-6 py-5">
                    <p className="font-numbers text-4xl font-light leading-none">100%</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-body mt-1.5">на благо</p>
                  </div>
                </Link>
                <p className="font-body text-[10px] text-muted-foreground/60 mt-2">Фото для настроения: особняк Белосельских-Белозерских · Александровы АГ, CC BY-SA 4.0</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="bg-primary py-4 overflow-hidden">
          {/* Две одинаковые половины: сдвиг на -50% даёт бесшовный цикл */}
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="flex w-max whitespace-nowrap"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="font-display text-lg md:text-xl text-primary-foreground/80 font-light italic tracking-wide">
                Благотворительность · Исторический особняк · Современное искусство · Петербург · Забота · Добро ·&nbsp;
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

