import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import dmitrievaPhoto from "@/assets/speaker-dmitrieva.jpg";
import TicketRequestModal from "./TicketRequestModal";

const MasterclassSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-24 md:py-32 section-padding bg-card relative overflow-hidden">
        <div ref={ref} className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
                Специальное мероприятие · 18 апреля 2026
              </p>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[0.9]">
              Тренировка-<span className="italic text-primary">презентация</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[3/4] overflow-hidden relative bg-muted/20">
                <img
                  src={dmitrievaPhoto}
                  alt="Маргарита Дмитриева — ведущая мастер-класса «Либидо фитнес»"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-display text-2xl md:text-3xl text-cream font-light italic leading-tight">
                    Маргарита Дмитриева
                  </p>
                  <p className="text-cream/60 text-xs font-body mt-2">
                    Врач, сексолог, семейный психолог
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-4 leading-tight">
                Программа женского здоровья
                <br />
                <span className="text-primary italic">«Либидо фитнес»</span>
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                  <p className="font-numbers text-sm text-foreground">18 апреля 2026</p>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <p className="font-body text-sm text-foreground">Пространство «Место быть» · Мясницкая 24/7</p>
                </div>
              </div>

              <div className="w-16 h-px bg-primary mb-6" />

              <p className="editorial-body text-muted-foreground mb-4">
                Основательница Академии Женской Сексуальности. Мама двоих детей. Женщина, которая прошла сложный путь и смогла пробудить свою женскую силу.
              </p>
              <p className="editorial-body text-muted-foreground mb-8">
                Приглашаем вас на эксклюзивную тренировку-презентацию программы женского здоровья в зале пространства «Место быть» за неделю до основного аукциона.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn-primary"
                >
                  Записаться
                </button>
                <a
                  href="https://academy-of-female-sexuality.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2"
                >
                  Подробнее <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <TicketRequestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        ticketType="Мастер-класс «Либидо фитнес» 18.04"
        ticketPrice=""
        showTrainingCheckbox={false}
      />
    </>
  );
};

export default MasterclassSection;
