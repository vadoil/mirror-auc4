import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import sashaPhoto from "@/assets/organizer-sasha-clean.png";
import gizaPhoto from "@/assets/organizer-giza-clean.png";

const organizers = [
  {
    name: "Александра Павлова",
    role: "Организатор",
    photo: sashaPhoto,
    points: [
      "Автор книги по поддержке женщин с раком щитовидной железы",
      "Продюсер медицинских конференций",
      "Предприниматель и попечитель фонда «Не напрасно»",
    ],
  },
  {
    name: "Гизела Тольц",
    role: "Организатор",
    photo: gizaPhoto,
    points: [
      "Организатор медицинских, коммерческих, корпоративных и частных мероприятий",
      "10 лет работы с лучшими врачами и экспертами России и Европы",
      "Автор проекта «Поговори с Гизой» — подкасты и поддержка женщин",
    ],
  },
];

const OrganizersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
              Команда
            </p>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-light tracking-tight text-foreground leading-[0.9]">
            Организаторы
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {organizers.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * i }}
              className="group"
            >
              <div className="grid grid-cols-[1fr_1.2fr] gap-6 items-start">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted/30 rounded-lg">
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>
                <div className="py-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-body mb-3">
                    {person.role}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-4 leading-tight">
                    {person.name}
                  </h3>
                  <div className="w-10 h-px bg-primary mb-4" />
                  <ul className="space-y-2">
                    {person.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="font-body text-sm font-light leading-relaxed text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizersSection;
