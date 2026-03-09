import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import aboutVisual from "@/assets/about-visual.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 section-padding bg-background">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 font-body">
              О форуме
            </p>
            <h2 className="editorial-heading text-foreground mb-8">
              Пространство
              <br />
              <span className="text-primary italic">отражения</span>
            </h2>
            <div className="divider-line mb-8" />
            <p className="editorial-body text-muted-foreground mb-6">
              Современная женщина живёт в постоянном давлении ролей: успех, карьера, семья, материнство. Культура продвигает образ женщины, которая может всё. Но никто не говорит — какой ценой.
            </p>
            <p className="editorial-body text-muted-foreground">
              Мы создаём безопасное пространство, где можно остановиться, заглянуть в себя и начать новый путь — осознанно. Форум «Отражение» — это день, посвящённый здоровью, эмоциям и внутренней силе.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={aboutVisual}
                alt="О форуме Отражение"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground px-8 py-6">
              <p className="font-display text-3xl font-light">500+</p>
              <p className="text-xs uppercase tracking-[0.15em] font-body mt-1">участниц</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
