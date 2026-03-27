import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 50, suffix: "+", label: "лотов" },
  { value: 300, suffix: "+", label: "гостей" },
  { value: 5, suffix: "М₽+", label: "собрано" },
  { value: 10, suffix: "+", label: "партнёров" },
];

const AnimatedCounter = ({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  return <span>{count}{suffix}</span>;
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 bg-gradient-to-r from-red-deep to-primary" />

      <div ref={ref} className="relative z-10 section-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className="text-center"
            >
              <p className="font-numbers text-5xl md:text-7xl font-light text-primary-foreground leading-none mb-3">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} isInView={isInView} />
              </p>
              <p className="font-body text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary-foreground/60">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
