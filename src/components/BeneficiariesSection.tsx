import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Shield, Users } from "lucide-react";

const causes = [
  {
    icon: Heart,
    title: "Фонды помощи детям",
    desc: "Поддержка лечения, реабилитации и образовательных программ для детей, оказавшихся в трудной жизненной ситуации.",
  },
  {
    icon: Users,
    title: "Социальные проекты",
    desc: "Финансирование инициатив, направленных на адаптацию и интеграцию людей с ограниченными возможностями здоровья.",
  },
  {
    icon: Shield,
    title: "Экологические инициативы",
    desc: "Поддержка проектов по охране природы, устойчивому развитию и экологическому просвещению.",
  },
];

const BeneficiariesSection = () => {
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
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">Миссия</p>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-light tracking-tight text-foreground leading-[0.9]">
            Кому <span className="italic text-primary">помогаем</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {causes.map((cause, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className="bg-muted/50 border border-border p-8 md:p-10 group hover:border-primary/30 transition-all duration-500"
            >
              <div className="w-12 h-12 border border-primary/30 flex items-center justify-center mb-6 group-hover:border-primary/60 transition-colors">
                <cause.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground uppercase mb-3">{cause.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{cause.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center font-body text-sm text-muted-foreground mt-12 max-w-2xl mx-auto"
        >
          Полный список фондов-партнёров и детали распределения средств будут опубликованы перед аукционом.
          Мы гарантируем прозрачную отчётность по каждому лоту.
        </motion.p>
      </div>
    </section>
  );
};

export default BeneficiariesSection;
