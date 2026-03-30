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
      <div ref={ref} className="max-w-5xl mx-auto">
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
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="text-center p-8 bg-card border border-border"
            >
              <div className="w-12 h-12 border border-primary/30 flex items-center justify-center mx-auto mb-5">
                <item.icon className="w-5 h-5 text-primary" />
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
