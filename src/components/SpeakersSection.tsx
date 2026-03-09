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
  { name: "Анна Симакова", role: "Сооснователь клиники «Три сестры»", photo: speakerSimakova, featured: true },
  { name: "Мария Грудина", role: "Основательница курорта «Первая Линия»", photo: speakerGrudina, featured: true },
  { name: "Татьяна Румянцева", role: "Гинеколог, «Клиника Фомина»", photo: speakerRumyantseva, featured: false },
  { name: "Маргарита Дмитриева", role: "Врач, сексолог, семейный психолог", photo: speakerDmitrieva, featured: false },
  { name: "Ростислав Павлов", role: "Хирург-онколог, главный врач", photo: speakerPavlov, featured: false },
  { name: "Радислав Гандапас", role: "Президент Ассоциации спикеров СНГ", photo: speakerGandapas, featured: true },
  { name: "Алексей Ситников", role: "Доктор наук, автор Karmalogic", photo: speakerSitnikov, featured: false },
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
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/40 font-body">
                40+ экспертов
              </p>
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-light tracking-tight text-cream leading-[0.9]">
              Спикеры
            </h2>
          </div>
          <a href="#contacts" className="font-body text-xs uppercase tracking-[0.2em] text-cream/50 hover:text-primary transition-colors duration-300 border-b border-cream/20 hover:border-primary pb-1">
            Стать спикером →
          </a>
        </motion.div>

        {/* Mixed editorial grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {speakers.map((speaker, i) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 * i }}
              className={`group relative overflow-hidden cursor-pointer ${
                speaker.featured ? "row-span-2" : ""
              }`}
            >
              <div className={`relative overflow-hidden ${speaker.featured ? "aspect-[3/5]" : "aspect-[3/4]"}`}>
                <img
                  src={speaker.photo}
                  alt={speaker.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                {/* Red accent overlay on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-500" />

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="font-display text-lg md:text-xl font-light text-cream leading-tight mb-1">
                    {speaker.name}
                  </h3>
                  <p className="font-body text-[10px] md:text-xs font-light text-cream/50 leading-snug transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {speaker.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-10 text-center text-cream/30 text-xs font-body tracking-wide"
        >
          * полный состав спикеров находится в процессе утверждения
        </motion.p>
      </div>
    </section>
  );
};

export default SpeakersSection;
