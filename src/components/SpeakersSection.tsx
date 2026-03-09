import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import speakerSimakova from "@/assets/speaker-simakova.jpg";
import speakerGrudina from "@/assets/speaker-grudina.jpg";
import speakerRumyantseva from "@/assets/speaker-rumyantseva.jpg";
import speakerDmitrieva from "@/assets/speaker-dmitrieva.jpg";
import speakerPavlov from "@/assets/speaker-pavlov.jpg";
import speakerGandapas from "@/assets/speaker-gandapas.jpg";
import speakerSitnikov from "@/assets/speaker-sitnikov.jpg";

const speakers = [
  {
    name: "Анна Симакова",
    role: "Сооснователь клиники «Три сестры»",
    photo: speakerSimakova,
  },
  {
    name: "Мария Грудина",
    role: "Основательница курорта «Первая Линия» и Биохакинг центра One",
    photo: speakerGrudina,
  },
  {
    name: "Татьяна Румянцева",
    role: "Гинеколог, Сеть клиник «Клиника Фомина»",
    photo: speakerRumyantseva,
  },
  {
    name: "Маргарина Дмитриева",
    role: "Врач, сексолог, семейный психолог",
    photo: speakerDmitrieva,
  },
  {
    name: "Ростислав Павлов",
    role: "Главный врач Гатчинской клиники, хирург-онколог",
    photo: speakerPavlov,
  },
  {
    name: "Радислав Гандапас",
    role: "Президент Ассоциации спикеров СНГ",
    photo: speakerGandapas,
  },
  {
    name: "Алексей Ситников",
    role: "Доктор наук, тренер НЛП, автор проекта Karmalogic",
    photo: speakerSitnikov,
  },
];

const SpeakersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="speakers" className="py-24 md:py-32 section-padding bg-charcoal text-cream">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-cream/50 mb-6 font-body">
            40+ экспертов
          </p>
          <h2 className="editorial-heading text-cream">
            Спикеры
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {speakers.map((speaker, i) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-5">
                <img
                  src={speaker.photo}
                  alt={speaker.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-light text-cream mb-1">
                {speaker.name}
              </h3>
              <p className="font-body text-xs md:text-sm font-light text-cream/50">
                {speaker.role}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-center text-cream/40 text-sm font-body"
        >
          * полный состав спикеров находится в процессе утверждения
        </motion.p>
      </div>
    </section>
  );
};

export default SpeakersSection;
