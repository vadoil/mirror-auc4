import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const partners = [
  "Sotheby's Russia",
  "Галерея Триумф",
  "Фонд «Подари жизнь»",
  "Ювелирный дом PETROV",
  "Винотека Grand Cru",
  "Art Basel Moscow",
  "Forbes Club",
];

const PartnersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 section-padding bg-beige-warm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
              Нас поддерживают
            </p>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-light tracking-tight text-foreground leading-[0.9]">
            Партнёры и <span className="italic text-primary">спонсоры</span>
          </h2>
        </motion.div>

        <div className="overflow-hidden py-8">
          <motion.div
            animate={{ x: [0, -800] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...partners, ...partners, ...partners].map((partner, i) => (
              <div
                key={`${partner}-${i}`}
                className="flex-shrink-0 px-10 py-6 bg-background border border-border hover:border-primary/20 transition-all duration-300"
              >
                <p className="font-display text-base md:text-lg font-medium text-foreground">
                  {partner}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 text-center"
        >
          <a href="#contacts" className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300 border-b border-border hover:border-primary pb-1">
            Стать партнёром →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
