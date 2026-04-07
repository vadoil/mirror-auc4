import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const DressCodeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-20 section-padding bg-beige-warm relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
            Дресс-код
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground uppercase">
            Smart <span className="italic text-primary">Casual</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default DressCodeSection;
