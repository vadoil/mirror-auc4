import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const program = [
  { time: "12:00", title: "Сбор гостей", desc: "Экспо-зона, kids club, зона комфортной стоматологии", highlight: false },
  { time: "12:30", title: "Женский круг", desc: "Открывающий женский круг для настройки и погружения", highlight: false },
  { time: "13:00", title: "Здоровье. Красота. Метаболизм", desc: "Блок выступлений экспертов и панельная дискуссия", highlight: true },
  { time: "14:20", title: "Тело в процессе уверенности", desc: "Запись практик и интерактивы с аудиторией", highlight: false },
  { time: "15:00", title: "Культура заботы о себе", desc: "Современные возможности биохакинга и технологий красоты", highlight: true },
  { time: "15:40", title: "Как полюбить своё отражение?", desc: "Выступление известного спикера, Q&A сессия", highlight: false },
  { time: "16:10", title: "Карьера и материнство", desc: "Панельная дискуссия: реальные истории женщин", highlight: true },
  { time: "17:10", title: "Блок «Без фильтров»", desc: "Открытые разговоры о том, о чём не говорят вслух", highlight: false },
  { time: "18:10", title: "Networking", desc: "Завершение форума, нетворкинг и обмен контактами", highlight: false },
];

const ProgramSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="program" className="py-24 md:py-32 section-padding bg-background relative">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
              26 апреля · расписание
            </p>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-light tracking-tight text-foreground leading-[0.9]">
            Программа <span className="italic text-primary">дня</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[39px] md:left-[59px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-0">
            {program.map((item, i) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                className="group relative flex gap-6 md:gap-10"
              >
                {/* Dot */}
                <div className="relative z-10 flex-shrink-0 w-20 md:w-[120px] flex items-start pt-8">
                  <div className="w-full text-right pr-5 md:pr-7">
                    <span className="font-display text-lg md:text-2xl font-light text-primary">
                      {item.time}
                    </span>
                  </div>
                  <div className={`absolute right-0 top-[34px] md:top-[38px] w-3 h-3 rounded-full border-2 transition-colors duration-300 -translate-x-[1px] ${
                    item.highlight
                      ? "bg-primary border-primary"
                      : "bg-background border-primary/40 group-hover:border-primary"
                  }`} />
                </div>

                {/* Content */}
                <div className={`flex-1 py-6 md:py-8 pl-4 md:pl-6 border-b border-border group-hover:bg-card/50 transition-colors duration-300 ${
                  item.highlight ? "bg-primary/5" : ""
                }`}>
                  <h3 className="font-body text-lg md:text-2xl font-medium text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
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
      </div>
    </section>
  );
};

export default ProgramSection;
