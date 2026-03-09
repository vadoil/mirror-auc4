import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const partners = [
  "Собака.ru",
  "TenChat",
  "SOROKA",
  "Не напрасно",
  "Гатчинская клиническая больница",
  "Клиника Фомина",
  "Первая Линия Healthcare Resort",
];

const PartnersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 section-padding bg-beige-warm">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 font-body">
            Нас поддерживают
          </p>
          <h2 className="editorial-heading text-foreground">
            СМИ и <span className="italic text-primary">партнёры</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
          {partners.map((partner, i) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="flex items-center justify-center p-6 md:p-8 bg-background border border-border hover:border-primary/20 transition-all duration-300"
            >
              <p className="font-display text-base md:text-lg font-medium text-foreground text-center">
                {partner}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center text-muted-foreground text-sm font-body"
        >
          Мы открыты к сотрудничеству · Телеграм: @jiselle_tolts
        </motion.p>
      </div>
    </section>
  );
};

export default PartnersSection;
