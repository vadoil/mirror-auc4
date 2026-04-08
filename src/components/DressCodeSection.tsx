import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const DressCodeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-20 section-padding bg-beige-warm relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/[0.03] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/[0.02] rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div ref={ref} className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-primary/30" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
              Дресс-код вечера
            </p>
            <div className="h-px w-12 bg-primary/30" />
          </div>

          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground leading-[0.85]">
            Smart <span className="italic text-primary">Casual</span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-muted-foreground font-body text-sm md:text-base max-w-md mx-auto leading-relaxed"
          >
            Элегантный и&nbsp;непринуждённый стиль — идеальный баланс между комфортом и&nbsp;утончённостью
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-16 h-px bg-primary/40 mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default DressCodeSection;
