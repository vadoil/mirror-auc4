import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Brain, Sparkles, Atom, Scale } from "lucide-react";

const topics = [
  {
    icon: Heart,
    title: "Женское здоровье как главный ресурс",
    desc: "Прямая связь между ментальным и физическим состоянием. Базовые знания о своём теле — ключ к гармонии.",
  },
  {
    icon: Brain,
    title: "Психоэмоциональная устойчивость",
    desc: "Инструменты для управления стрессом, эмоциональной перезагрузки и внутренней стабильности.",
  },
  {
    icon: Sparkles,
    title: "Культура заботы о себе",
    desc: "Не эгоизм, а необходимость. Как выстроить систему поддержки и заботы о себе каждый день.",
  },
  {
    icon: Atom,
    title: "Инновации и технологии продления молодости",
    desc: "Современные возможности науки и медицины в сфере биохакинга, красоты и здоровья.",
  },
  {
    icon: Scale,
    title: "Баланс карьеры и материнства",
    desc: "Реальные истории женщин, которые нашли свой баланс без выбора «или-или».",
  },
];

const TopicsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="topics" className="py-24 md:py-32 section-padding bg-card">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 font-body">
            Направления
          </p>
          <h2 className="editorial-heading text-foreground">
            Темы <span className="italic text-primary">форума</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className={`group p-8 md:p-10 bg-background border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-[var(--shadow-hover)] ${
                i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <topic.icon className="w-8 h-8 text-primary mb-6 transition-transform duration-500 group-hover:scale-110" />
              <h3 className="font-display text-xl md:text-2xl font-medium mb-4 text-foreground">
                {topic.title}
              </h3>
              <p className="font-body text-sm font-light leading-relaxed text-muted-foreground">
                {topic.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;
