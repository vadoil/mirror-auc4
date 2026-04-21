import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, MapPin, Download } from "lucide-react";
import forumBanner from "@/assets/forum-women-banner.png";
import TicketRequestModal from "./TicketRequestModal";

const ForumBannerSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [forumModal, setForumModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);

  return (
    <section className="py-12 md:py-16 section-padding bg-charcoal relative overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/40 font-body">
              Следующий шаг
            </p>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-cream leading-[0.9] mb-6">
            Форум{" "}
            <span className="italic text-primary">«Отражение»</span>
          </h2>
          <p className="font-body text-xs text-primary uppercase tracking-[0.2em] mb-8">
            Осень 2026 · Москва
          </p>
          <div className="w-16 h-px bg-primary mx-auto mb-8" />

          {/* Banner image */}
          <div className="max-w-3xl mx-auto mb-12">
            <img
              src={forumBanner}
              alt="Форум для женщин «Отражение» — осень '26"
              className="w-full h-auto rounded-sm"
            />
          </div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <p className="font-body text-sm md:text-base text-cream/60 leading-relaxed mb-8">
            После аукциона «Отражение Добра» нас ждёт масштабный форум для женщин, посвящённый велнесу, 
            осознанности и инвестициям в себя. Лучшие практики в области женского здоровья и красоты, 
            биохакинг и забота о себе, материнство и развитие без границ.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-body text-cream/60 text-sm">Осень 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-body text-cream/60 text-sm">Москва</span>
            </div>
          </div>
        </motion.div>

        {/* PDF downloads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12"
        >
          <a
            href="/docs/presentation-speakers.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-cream/5 border border-cream/10 hover:border-primary/30 transition-all p-5"
          >
            <Download className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="font-body text-sm font-medium text-cream">Презентация форума</p>
              <p className="font-body text-xs text-cream/40">PDF, для спикеров</p>
            </div>
          </a>
          <a
            href="/docs/presentation-sponsors.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-cream/5 border border-cream/10 hover:border-primary/30 transition-all p-5"
          >
            <Download className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="font-body text-sm font-medium text-cream">Для спонсоров</p>
              <p className="font-body text-xs text-cream/40">PDF, партнёрское предложение</p>
            </div>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button onClick={() => setForumModal(true)} className="btn-primary-light text-center inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-xs uppercase tracking-[0.2em] font-body hover:opacity-90 transition-all">
            Оставить заявку на участие
          </button>
          <button onClick={() => setInfoModal(true)} className="btn-outline-light text-center">
            Узнать о форуме
          </button>
        </motion.div>
      </div>

      <TicketRequestModal
        isOpen={forumModal}
        onClose={() => setForumModal(false)}
        ticketType="Участие в форуме"
        ticketPrice=""
        showTrainingCheckbox={false}
      />
      <TicketRequestModal
        isOpen={infoModal}
        onClose={() => setInfoModal(false)}
        ticketType="Узнать о форуме"
        ticketPrice=""
        showTrainingCheckbox={false}
      />
    </section>
  );
};

export default ForumBannerSection;
