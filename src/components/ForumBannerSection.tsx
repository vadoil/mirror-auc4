import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin } from "lucide-react";

const ForumBannerSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28 section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-charcoal" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent" />

      <div ref={ref} className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-cream tracking-tight leading-[0.9] mb-8">
            Не пропустите главное
            <br />
            <span className="italic text-primary">событие сезона</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-body text-cream/70 text-sm">15 июня 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-body text-cream/70 text-sm">Москва, Гостиный двор</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#tickets" className="btn-primary text-center">
              Купить билет
            </a>
            <a href="/lots" className="btn-outline-light text-center">
              Каталог лотов
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ForumBannerSection;
