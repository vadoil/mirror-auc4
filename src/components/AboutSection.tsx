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
                  Искусство
                  <br />
                  <span className="italic text-primary">во благо</span>
                </h2>
                <div className="w-24 h-px bg-primary mb-8" />
                <p className="editorial-body text-muted-foreground mb-6 max-w-lg">
                  Благотворительный аукцион — это уникальная возможность приобрести эксклюзивные лоты и одновременно поддержать важные социальные проекты.
                </p>
                <p className="editorial-body text-muted-foreground max-w-lg">
                  Каждый лот — это история, каждая ставка — шаг к переменам. Мы объединяем коллекционеров, меценатов и экспертов ради общей цели.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="aspect-[4/5] overflow-hidden bg-charcoal flex items-center justify-center">
                  <div className="text-center p-8">
                    <p className="font-numbers text-7xl md:text-8xl font-light text-primary mb-4">₽5М+</p>
                    <p className="font-body text-cream/60 text-sm uppercase tracking-[0.2em]">собрано на благотворительность</p>
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
                Живопись · Ювелирное искусство · Антиквариат · Эксклюзивные впечатления · Коллекционные вина ·
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
