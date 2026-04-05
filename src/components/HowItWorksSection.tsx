import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Search, Bookmark, HandCoins, Trophy } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Регистрация",
    desc: "Оформите билет и получите подтверждение участия от менеджера.",
  },
  {
    icon: Search,
    step: "02",
    title: "Изучите лоты",
    desc: "Просмотрите каталог, оцените лоты на превью перед аукционом.",
  },
  {
    icon: Bookmark,
    step: "03",
    title: "Забронируйте",
    desc: "Отметьте интересные лоты — это предварительная бронь, не обязательство.",
  },
  {
    icon: HandCoins,
    step: "04",
    title: "Торги",
    desc: "Делайте ставки на площадке или онлайн. Покупка — в день аукциона.",
  },
  {
    icon: Trophy,
    step: "05",
    title: "Победа",
    desc: "Победитель получает лот и сертификат. Средства — на благотворительность.",
  },
];

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 section-padding bg-background">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
              Пошагово
            </p>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-light tracking-tight text-foreground leading-[0.9]">
            Как это <span className="italic text-primary">работает</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12 * i }}
              className="relative text-center group"
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />
              )}
              <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <item.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <span className="font-numbers text-sm text-primary/60 mb-2 block">{item.step}</span>
              <h3 className="font-display text-base md:text-xl font-medium text-foreground mb-2 md:mb-3">{item.title}</h3>
              <p className="font-body text-xs md:text-sm font-light text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
