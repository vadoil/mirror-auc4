import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const program = [
  { time: "15:00", title: "Сбор гостей", desc: "Дегустация, знакомство с участниками аукциона и пространством «Место быть»", highlight: false },
  { time: "16:00", title: "Public Talk", desc: "Тема будет объявлена", highlight: true, speakers: true },
  { time: "16:45", title: "Кофе-брейк", desc: "Перерыв, общение, подготовка к аукциону", highlight: false },
  { time: "17:00", title: "Аукцион", desc: "Торги – wellness-программы, ретриты, эксклюзивный опыт", highlight: true },
];

const moderators = [
  { name: "Ростислав Павлов", role: "Вице-президент Сбербанка по здравоохранению, Forbes «30 до 30»" },
];

const publicTalkSpeakers = [
  { name: "Артём Спиро", role: "Импакт-предприниматель, ресторатор, эксперт в области здорового питания" },
  { name: "Наталья Гундерина", role: "Продюсер проекта Karmalogic, основатель и CEO проекта Karmatravel" },
  { name: "Анна Евнич", role: "" },
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
              26 апреля 2026 · расписание
            </p>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-light tracking-tight text-foreground leading-[0.9]">
            Программа <span className="italic text-primary">вечера</span>
          </h2>
        </motion.div>

        <div className="relative">
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
                <div className="relative z-10 flex-shrink-0 w-20 md:w-[120px] flex items-start pt-8">
                  <div className="w-full text-right pr-5 md:pr-7">
                    <span className="font-numbers text-lg md:text-2xl font-light text-primary">
                      {item.time}
                    </span>
                  </div>
                  <div className={`absolute right-0 top-[34px] md:top-[38px] w-3 h-3 rounded-full border-2 transition-colors duration-300 -translate-x-[1px] ${
                    item.highlight
                      ? "bg-primary border-primary"
                      : "bg-background border-primary/40 group-hover:border-primary"
                  }`} />
                </div>
                <div className={`flex-1 py-6 md:py-8 pl-4 md:pl-6 border-b border-border group-hover:bg-card/50 transition-colors duration-300 ${
                  item.highlight ? "bg-primary/5" : ""
                }`}>
                  <h3 className="font-body text-lg md:text-2xl font-medium text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm font-light text-muted-foreground">
                    {item.desc}
                  </p>

                  {/* Public Talk details */}
                  {item.speakers && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-body mb-3">Модератор</p>
                        <div className="space-y-2">
                          {moderators.map(m => (
                            <div key={m.name}>
                              <p className="font-body text-sm font-medium text-foreground">{m.name}</p>
                              <p className="font-body text-xs text-muted-foreground">{m.role}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-body mb-3">Спикеры</p>
                        <div className="space-y-2">
                          {publicTalkSpeakers.map(s => (
                            <div key={s.name}>
                              <p className="font-body text-sm font-medium text-foreground">{s.name}</p>
                              {s.role && <p className="font-body text-xs text-muted-foreground">{s.role}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
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
