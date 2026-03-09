import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mic, MessageSquare, BookOpen, MousePointerClick, Users, Flower2 } from "lucide-react";

const formats = [
  { icon: Mic, title: "Личные кейсы", desc: "Лучшие эксперты делятся опытом и историями" },
  { icon: MessageSquare, title: "Панельные дискуссии", desc: "Открытый диалог между спикерами и аудиторией" },
  { icon: Users, title: "Женские круги", desc: "Камерное пространство для глубокого разговора" },
  { icon: MousePointerClick, title: "Интерактивы и голосование", desc: "Вовлечение аудитории в реальном времени" },
  { icon: Flower2, title: "Relax-зона с практиками", desc: "Телесные практики и зона расслабления" },
  { icon: BookOpen, title: "Экспо-зона брендов", desc: "Здоровье, красота и осознанный образ жизни" },
];

const FormatSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 section-padding bg-card">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 font-body">
            Как это будет
          </p>
          <h2 className="editorial-heading text-foreground">
            Формат <span className="italic text-primary">форума</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {formats.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="flex items-start gap-5"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10 flex-shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg md:text-xl font-medium text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm font-light text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormatSection;
