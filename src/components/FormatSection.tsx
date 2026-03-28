import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Zap, Wifi, Sparkles, GlassWater, Users } from "lucide-react";

const formats = [
  { icon: Eye, title: "Превью лотов", desc: "Попробуйте технологии до торгов" },
  { icon: Zap, title: "Живые торги", desc: "Энергичный формат с Александром Цыпкиным" },
  { icon: Wifi, title: "Онлайн-ставки", desc: "Участвуйте удалённо в реальном времени" },
  { icon: Sparkles, title: "Wellness-зона", desc: "Криокамера, массаж, нейрофидбек на месте" },
  { icon: GlassWater, title: "Detox-бар", desc: "Суперфуд-коктейли, адаптогены, комбуча" },
  { icon: Users, title: "Нетворкинг", desc: "Знакомства с лидерами wellness-индустрии" },
];

const FormatSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-card" />

      <div ref={ref} className="relative z-10 section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
              Что вас ждёт
            </p>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-light tracking-tight text-foreground leading-[0.9]">
            Формат <span className="italic text-primary">вечера</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {formats.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-medium text-foreground mb-1">
                {item.title}
              </h3>
              <p className="font-body text-xs font-light text-muted-foreground">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormatSection;
