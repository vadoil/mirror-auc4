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
  { name: "Анна Симакова", role: "Сооснователь клиники «Три сестры»", photo: speakerSimakova },
  { name: "Мария Грудина", role: "Основательница курорта «Первая Линия»", photo: speakerGrudina },
  { name: "Радислав Гандапас", role: "Президент Ассоциации спикеров СНГ", photo: speakerGandapas },
  { name: "Татьяна Румянцева", role: "Гинеколог, «Клиника Фомина»", photo: speakerRumyantseva },
  { name: "Маргарита Дмитриева", role: "Врач, сексолог, семейный психолог", photo: speakerDmitrieva },
  { name: "Ростислав Павлов", role: "Хирург-онколог, главный врач", photo: speakerPavlov },
  { name: "Алексей Ситников", role: "Доктор наук, автор Karmalogic", photo: speakerSitnikov },
];

const SpeakerCard = ({ speaker, index, isInView }: { speaker: typeof speakers[0]; index: number; isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.7, delay: 0.1 * index }}
    className="group relative"
  >
    <div className="relative overflow-hidden aspect-[3/4]">
      <img
        src={speaker.photo}
        alt={speaker.name}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
      />
      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-warm-black/90 via-warm-black/20 to-transparent" />
      {/* Red line accent on hover */}
      <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-primary group-hover:w-full transition-all duration-500" />
    </div>
    <div className="mt-4">
      <h3 className="font-display text-xl md:text-2xl font-normal uppercase text-cream leading-tight">
        {speaker.name}
      </h3>
      <p className="font-body text-xs md:text-sm font-light text-cream/40 mt-1.5 leading-snug">
        {speaker.role}
      </p>
    </div>
  </motion.div>
);

const SpeakersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="speakers" className="py-24 md:py-32 section-padding bg-warm-black">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Header */}
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
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-normal uppercase tracking-tight text-cream leading-[0.9]">
              Спикеры
            </h2>
          </div>
          <a
            href="#contacts"
            className="font-body text-xs uppercase tracking-[0.2em] text-cream/50 hover:text-primary transition-colors duration-300 border-b border-cream/20 hover:border-primary pb-1"
          >
            Стать спикером →
          </a>
        </motion.div>

        {/* Top row: 3 large speakers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {speakers.slice(0, 3).map((speaker, i) => (
            <SpeakerCard key={speaker.name} speaker={speaker} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Bottom row: 4 smaller speakers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-8 md:mt-12">
          {speakers.slice(3).map((speaker, i) => (
            <SpeakerCard key={speaker.name} speaker={speaker} index={i + 3} isInView={isInView} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-center text-cream/30 text-xs font-body tracking-wide"
        >
          * полный состав спикеров находится в процессе утверждения
        </motion.p>
      </div>
    </section>
  );
};

export default SpeakersSection;
