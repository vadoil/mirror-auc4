import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Users, Sparkles } from "lucide-react";
import gizaPhoto from "@/assets/organizer-giza-clean.png";
import sashaPhoto from "@/assets/organizer-sasha-clean.png";

const organizers = [
  {
    name: "Гизела Тольц",
    photo: gizaPhoto,
    city: "Москва",
    bullets: [
      "Организатор медицинских, коммерческих, корпоративных и частных мероприятий",
      "10 лет работы с лучшими врачами и экспертами России и Европы",
      "Автор проекта «Поговори с Гизой» – подкасты и поддержка женщин",
    ],
  },
  {
    name: "Александра Павлова",
    photo: sashaPhoto,
    city: "Санкт-Петербург",
    bullets: [
      "Автор книги по поддержке женщин с раком щитовидной железы",
      "Продюсер медицинских конференций",
      "Предприниматель и попечитель фонда «Не напрасно»",
    ],
  },
];

const highlights = [
  { icon: Heart, text: "две подруги" },
  { icon: Users, text: "два города" },
  { icon: Sparkles, text: "два формата" },
];

const OrganizersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 section-padding bg-background overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Intro text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto text-center mb-16"
        >
          Привет! Мы – <span className="text-foreground font-medium">Гиза и Саша</span>, занимаемся проектами, бизнесом и благотворительностью в двух городах – Москве и Петербурге. Поэтому наш проект <span className="text-foreground font-medium">«ОТРАЖЕНИЕ ДОБРА»</span>, как инь и янь, будет объединять разные по вайбу, но объединённые одной целью события в наших городах.
        </motion.p>

        {/* Organizer cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {organizers.map((org, i) => (
            <motion.div
              key={org.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Photo */}
              <div className="w-48 h-48 md:w-56 md:h-56 mb-6 rounded-full overflow-hidden border-2 border-primary/30 shadow-lg">
                <img
                  src={org.photo}
                  alt={org.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Name */}
              <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-1">
                {org.name}
              </h3>
              <span className="font-body text-xs uppercase tracking-[0.15em] text-primary mb-4">
                {org.city}
              </span>

              {/* Bullets */}
              <ul className="space-y-2 text-left max-w-xs mx-auto">
                {org.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2 items-start">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                    <span className="font-body text-sm text-muted-foreground leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Highlights row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-8"
        >
          {highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-2">
              <h.icon className="w-4 h-4 text-primary/60" />
              <span className="font-body text-sm tracking-wide text-muted-foreground">{h.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-center font-body text-sm text-muted-foreground"
        >
          <Sparkles className="inline w-3.5 h-3.5 text-primary mr-1 -mt-0.5" />
          Одна цель – сбор средств в поддержку фонда <span className="text-foreground font-medium">«Не напрасно»</span>
        </motion.p>
      </div>
    </section>
  );
};

export default OrganizersSection;
