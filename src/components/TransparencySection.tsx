import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileCheck, BarChart3, Eye } from "lucide-react";

const TransparencySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const items = [
    { icon: Eye, title: "Открытость", desc: "Все лоты, их стоимость и итоги торгов доступны в реальном времени на сайте." },
    { icon: BarChart3, title: "Полная отчётность", desc: "После аукциона публикуется детальный отчёт о каждом лоте: кто победил, какая сумма направлена на благотворительность." },
    { icon: FileCheck, title: "Документальное подтверждение", desc: "Переводы подтверждаются банковскими документами. Каждый участник может запросить акт." },
  ];

  return (
    <section className="py-24 md:py-32 section-padding bg-background">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">Доверие</p>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-light tracking-tight text-foreground leading-[0.9]">
            Прозрачность и <span className="italic text-primary">отчётность</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * i }}
              className="text-center p-8 bg-card border border-border rounded-lg group hover:border-primary/20 hover:shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.1)] hover:-translate-y-1 transition-all duration-500"
            >
              <div className="w-12 h-12 border border-primary/30 flex items-center justify-center mx-auto mb-5 rounded-full group-hover:border-primary/60 group-hover:bg-primary/5 transition-all duration-500">
                <item.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="font-display text-lg text-foreground uppercase mb-3">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransparencySection;
