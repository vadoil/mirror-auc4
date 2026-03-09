import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import aboutVisual from "@/assets/about-visual.jpg";
import heroMirror from "@/assets/hero-mirror.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative bg-background overflow-hidden">
      <div ref={ref}>
        {/* Full-width cinematic intro */}
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
                О форуме
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.9] text-foreground mb-8">
                  Пространство
                  <br />
                  <span className="italic text-primary">для отражения</span>
                </h2>
                <div className="w-24 h-px bg-primary mb-8" />
                <p className="editorial-body text-muted-foreground mb-6 max-w-lg">
                  Современная женщина живёт в постоянном давлении ролей: успех, карьера, семья, материнство. Культура продвигает образ женщины, которая может всё.
                </p>
                <p className="editorial-body text-muted-foreground max-w-lg">
                  Но никто не говорит — какой ценой. Мы создаём безопасное пространство, где можно остановиться, заглянуть в себя и начать новый путь — осознанно.
                </p>
              </motion.div>

              {/* Stacked images */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={aboutVisual}
                    alt="О форуме Отражение"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Overlapping second image */}
                <div className="absolute -bottom-8 -left-8 w-2/3 aspect-[3/4] overflow-hidden border-4 border-background shadow-[var(--shadow-editorial)] hidden md:block">
                  <img
                    src={heroMirror}
                    alt="Отражение"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Stats overlay */}
                <div className="absolute top-6 right-6 bg-primary text-primary-foreground px-6 py-5">
                  <p className="font-display text-4xl font-light leading-none">500+</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-body mt-1.5">участниц</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Marquee-style highlight strip */}
        <div className="bg-primary py-4 overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="font-display text-lg md:text-xl text-primary-foreground/80 font-light italic tracking-wide">
                Здоровье · Психология · Саморазвитие · Карьера · Баланс жизни ·
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
