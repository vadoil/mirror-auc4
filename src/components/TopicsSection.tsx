import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Brain, Sparkles, Atom, Scale } from "lucide-react";

const topics = [
  {
    icon: Heart,
    num: "01",
    title: "Женское здоровье как главный ресурс",
    desc: "Прямая связь между ментальным и физическим состоянием. Базовые знания о своём теле — ключ к гармонии.",
    accent: true,
  },
  {
    icon: Brain,
    num: "02",
    title: "Психоэмоциональная устойчивость",
    desc: "Инструменты для управления стрессом, эмоциональной перезагрузки и внутренней стабильности.",
    accent: false,
  },
  {
    icon: Sparkles,
    num: "03",
    title: "Культура заботы о себе",
    desc: "Не эгоизм, а необходимость. Как выстроить систему поддержки и заботы о себе каждый день.",
    accent: false,
  },
  {
    icon: Atom,
    num: "04",
    title: "Инновации продления молодости",
    desc: "Современные возможности науки и медицины в сфере биохакинга, красоты и здоровья.",
    accent: false,
  },
  {
    icon: Scale,
    num: "05",
    title: "Баланс карьеры и материнства",
    desc: "Реальные истории женщин, которые нашли свой баланс без выбора «или-или».",
    accent: false,
  },
];

const TopicsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="topics" className="py-24 md:py-32 section-padding bg-background">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
                Направления
              </p>
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-light tracking-tight text-foreground leading-[0.9]">
              Темы <span className="italic text-primary">форума</span>
            </h2>
          </div>
          <p className="font-body text-sm text-muted-foreground max-w-sm font-light">
            Пять ключевых направлений, которые затронут самое важное в жизни современной женщины
          </p>
        </motion.div>

        {/* Bento-style grid */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12 * i }}
              className={`group relative p-8 md:p-10 border transition-all duration-500 overflow-hidden cursor-pointer ${
                topic.accent
                  ? "md:row-span-2 bg-primary text-primary-foreground border-primary hover:shadow-[var(--shadow-editorial)]"
                  : "bg-card border-border hover:border-primary/30 hover:shadow-[var(--shadow-hover)]"
              }`}
            >
              {/* Large number background */}
              <span className={`absolute top-4 right-6 font-display text-7xl md:text-8xl font-light leading-none transition-opacity duration-500 ${
                topic.accent ? "text-primary-foreground/10" : "text-foreground/5"
              }`}>
                {topic.num}
              </span>

              <div className="relative z-10">
                <topic.icon className={`w-7 h-7 mb-6 transition-transform duration-500 group-hover:scale-110 ${
                  topic.accent ? "text-primary-foreground/80" : "text-primary"
                }`} />
                <h3 className={`font-display text-xl md:text-2xl font-medium mb-4 ${
                  topic.accent ? "text-primary-foreground" : "text-foreground"
                }`}>
                  {topic.title}
                </h3>
                <p className={`font-body text-sm font-light leading-relaxed ${
                  topic.accent ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  {topic.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;
