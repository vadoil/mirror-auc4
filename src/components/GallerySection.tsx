import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 section-padding bg-background overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
              Атмосфера
            </p>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-light tracking-tight text-foreground leading-[0.9]">
            Галерея <span className="italic text-primary">событий</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className={`relative overflow-hidden bg-charcoal ${
                i === 0 || i === 5 ? "md:col-span-2 md:row-span-2" : ""
              } ${i === 0 || i === 5 ? "aspect-square" : "aspect-[4/3]"}`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-3xl text-cream/5 uppercase">Фото {i + 1}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-warm-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
