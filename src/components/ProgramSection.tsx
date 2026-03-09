import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const program = [
  { time: "12:00", title: "Сбор гостей", desc: "Начало работы экспо-зоны, kids club, зоны комфортной стоматологии" },
  { time: "12:30", title: "Женский круг", desc: "Открывающий женский круг для настройки и погружения" },
  { time: "13:00", title: "Здоровье. Красота. Метаболизм", desc: "Блок выступлений экспертов и панельная дискуссия" },
  { time: "14:20", title: "Тело в процессе уверенности", desc: "Запись практик и интерактивы с аудиторией" },
  { time: "15:00", title: "Культура заботы о себе", desc: "Современные возможности биохакинга и технологий красоты" },
  { time: "15:40", title: "Как полюбить своё отражение?", desc: "Выступление известного спикера, сессия вопросов и ответов" },
  { time: "16:10", title: "Карьера и материнство", desc: "Панельная дискуссия: реальные истории женщин" },
  { time: "17:10", title: "Блок «Без фильтров»", desc: "Открытые разговоры о том, о чём не говорят вслух" },
  { time: "18:10", title: "Networking", desc: "Завершение форума, нетворкинг и обмен контактами" },
];

const ProgramSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="program" className="py-24 md:py-32 section-padding bg-background">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 font-body">
            26 апреля
          </p>
          <h2 className="editorial-heading text-foreground">
            Программа <span className="italic text-primary">дня</span>
          </h2>
        </motion.div>

        <div className="space-y-0">
          {program.map((item, i) => (
            <motion.div
              key={item.time}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-10 py-6 md:py-8 border-b border-border hover:bg-card/50 transition-colors duration-300 px-4 -mx-4"
            >
              <div className="font-display text-2xl md:text-3xl font-light text-primary">
                {item.time}
              </div>
              <div>
                <h3 className="font-display text-xl md:text-2xl font-medium text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
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

export default ProgramSection;
