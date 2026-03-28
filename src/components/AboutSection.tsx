import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative bg-background overflow-hidden">
      <div ref={ref}>
        <div className="py-20 md:py-32 section-padding">
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

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.9] text-foreground mb-8">
                  Wellness
                  <br />
                  <span className="italic text-primary">нового уровня</span>
                </h2>
                <div className="w-24 h-px bg-primary mb-8" />
                <p className="editorial-body text-muted-foreground mb-6 max-w-lg">
                  Первый в России wellness-аукцион, где лоты — это не вещи, а трансформация. Биохакинг-программы, 
                  ретриты, передовые оздоровительные технологии и эксклюзивный доступ к лучшим практикам мира.
                </p>
                <p className="editorial-body text-muted-foreground max-w-lg">
                  Мы собираем тех, кто инвестирует в себя осознанно. Каждый лот — 
                  это путь к лучшей версии себя, а часть средств идёт на благотворительность.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="aspect-[4/5] overflow-hidden bg-charcoal flex items-center justify-center relative">
                  {/* Ambient glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
                  <div className="text-center p-8 relative z-10">
                    <p className="font-body text-cream/30 text-xs uppercase tracking-[0.3em] mb-4">Инвестируйте в</p>
                    <p className="font-display text-6xl md:text-7xl font-light text-cream italic leading-none mb-4">Себя</p>
                    <div className="w-12 h-px bg-primary mx-auto mb-4" />
                    <p className="font-body text-cream/40 text-sm max-w-xs mx-auto">
                      Биохакинг · Longevity · Wellness · Mindfulness
                    </p>
                  </div>
                </div>
                <div className="absolute top-6 right-6 bg-primary text-primary-foreground px-6 py-5">
                  <p className="font-numbers text-4xl font-light leading-none">50+</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-body mt-1.5">лотов</p>
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
                Биохакинг · Longevity · Ретриты · Детокс · Криотерапия · Нейротехнологии · Суперфуды · Медитация ·
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
