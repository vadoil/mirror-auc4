import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin } from "lucide-react";

const ForumBannerSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 section-padding bg-background relative">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
              Следующий шаг
            </p>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground leading-[0.9] mb-6">
            Форум{" "}
            <span className="italic text-primary">осень 2026</span>
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mb-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <p className="editorial-body text-muted-foreground mb-8">
            После аукциона «Отражение Добра» нас ждёт масштабный форум, посвящённый велнесу, осознанности и инвестициям в себя. Следите за анонсами — скоро откроем регистрацию.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-body text-muted-foreground text-sm">Осень 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-body text-muted-foreground text-sm">Москва</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <a href="#tickets" className="btn-primary text-center">
            Купить билет на аукцион
          </a>
          <a href="#contacts" className="btn-outline text-center">
            Узнать о форуме
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ForumBannerSection;
