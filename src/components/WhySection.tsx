import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const items = [
  {
    num: "01",
    title: "Эксклюзивные лоты",
    text: "Уникальные предметы искусства и впечатления, которые невозможно найти в открытой продаже.",
  },
  {
    num: "02",
    title: "Благотворительная миссия",
    text: "100% средств сверх стартовой цены направляются на поддержку социальных и культурных проектов.",
  },
  {
    num: "03",
    title: "Нетворкинг высокого уровня",
    text: "Возможность познакомиться с коллекционерами, экспертами и лидерами мнений в неформальной обстановке.",
  },
  {
    num: "04",
    title: "Прозрачность и доверие",
    text: "Каждый лот проходит экспертную оценку. Система ставок — открытая и в реальном времени.",
  },
];

const WhySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-charcoal" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent" />

      <div ref={ref} className="relative z-10 section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-28 max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/40 font-body">
              Преимущества
            </p>
          </div>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-cream tracking-tight leading-[0.9]">
            Почему
            <br />
            <span className="italic text-primary">стоит участвовать?</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
          {items.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className="group py-10 border-t border-cream/10 hover:border-primary/40 transition-colors duration-500"
            >
              <div className="flex items-start gap-6">
                <span className="font-numbers text-5xl md:text-6xl font-light text-cream/10 group-hover:text-primary/30 transition-colors duration-500 leading-none">
                  {item.num}
                </span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-light text-cream mb-3 group-hover:text-primary transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm font-light leading-relaxed text-cream/50">
                    {item.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
