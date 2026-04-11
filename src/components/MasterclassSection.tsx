import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import dmitrievaPhoto from "@/assets/speaker-dmitrieva.jpg";
import TicketRequestModal from "./TicketRequestModal";

const MasterclassSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 md:py-28 section-padding bg-warm-black relative overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary to-transparent" />
        </div>

        <div ref={ref} className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-center">
            {/* Photo — compact */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="relative w-48 h-48 md:w-56 md:h-56 mx-auto lg:mx-0 flex-shrink-0"
            >
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-primary/20">
                <img
                  src={dmitrievaPhoto}
                  alt="Маргарита Дмитриева — ведущая тренировки-презентации «Либидо фитнес»"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary px-3 py-1 rounded-full">
                <p className="text-[10px] text-cream font-body uppercase tracking-wider whitespace-nowrap">18 апреля</p>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-3">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-cream/40 font-body">
                  Специальное мероприятие
                </p>
              </div>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-cream leading-[0.95] mb-3">
                Превью-<span className="italic text-primary">событие</span>
              </h2>

              <p className="font-display text-lg md:text-xl text-cream/70 font-light mb-4">
                Безоплатная тренировка для участниц клуба <span className="italic text-primary/80">«Отражение»</span>
              </p>

              <p className="editorial-body text-cream/50 mb-6 max-w-lg mx-auto lg:mx-0 text-sm">
                Маргарита Дмитриева — основательница Академии Женской Сексуальности, врач, сексолог. Эксклюзивная тренировка в зале «Место быть» за неделю до аукциона.
              </p>

              <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start mb-8 text-cream/40">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-primary/60" />
                  <span className="font-numbers text-xs">18 апреля 2026</span>
                </div>
                <div className="w-px h-3 bg-cream/10" />
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary/60" />
                  <span className="font-body text-xs">Мясницкая 24/7</span>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary text-sm"
              >
                Записаться на тренировку
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <TicketRequestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        ticketType="Тренировка «Либидо фитнес» 18.04"
        ticketPrice=""
        showTrainingCheckbox={false}
      />
    </>
  );
};

export default MasterclassSection;
