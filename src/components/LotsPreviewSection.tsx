import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import lotLongevity from "@/assets/lot-longevity.jpg";
import lotBiohacking from "@/assets/lot-biohacking.jpg";
import lotRetreat from "@/assets/lot-retreat.jpg";
import lotCryo from "@/assets/lot-cryo.jpg";
import lotNeuro from "@/assets/lot-neuro.jpg";
import lotDetox from "@/assets/lot-detox.jpg";

const previewLots = [
  { id: 1, title: "Longevity-программа в Швейцарии", artist: "Clinique La Prairie", startPrice: "850 000 ₽", category: "Longevity", image: lotLongevity },
  { id: 2, title: "30 дней биохакинг-протокола", artist: "Dr. Андрей Беловешкин", startPrice: "180 000 ₽", category: "Биохакинг", image: lotBiohacking },
  { id: 3, title: "Silent retreat на Бали", artist: "COMO Shambhala", startPrice: "320 000 ₽", category: "Ретриты", image: lotRetreat },
  { id: 4, title: "Криокамера + IV-терапия (годовой абонемент)", artist: "Biohacking Lab Moscow", startPrice: "240 000 ₽", category: "Recovery", image: lotCryo },
  { id: 5, title: "Нейрофидбек курс (20 сессий)", artist: "BrainUp Clinic", startPrice: "150 000 ₽", category: "Нейро", image: lotNeuro },
  { id: 6, title: "Персональный детокс-ретрит", artist: "SHA Wellness Clinic", startPrice: "500 000 ₽", category: "Детокс", image: lotDetox },
];

const LotsPreviewSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="lots-preview" className="py-24 md:py-32 section-padding bg-warm-black">
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
                Превью каталога
              </p>
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-normal uppercase tracking-tight text-cream leading-[0.9]">
              Лоты
            </h2>
          </div>
          <a
            href="/lots"
            className="font-body text-xs uppercase tracking-[0.2em] text-cream/50 hover:text-primary transition-colors duration-300 border-b border-cream/20 hover:border-primary pb-1 flex items-center gap-2"
          >
            Весь каталог <ArrowRight className="w-3 h-3" />
          </a>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {previewLots.map((lot, i) => (
            <motion.div
              key={lot.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="group bg-cream/5 border border-cream/10 hover:border-primary/30 transition-all duration-500 overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={lot.image}
                  alt={lot.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-primary/90 px-3 py-1">
                  <span className="text-primary-foreground text-[10px] uppercase tracking-[0.2em] font-body">{lot.category}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg text-cream mb-1 group-hover:text-primary transition-colors duration-300">{lot.title}</h3>
                <p className="font-body text-xs text-cream/40 mb-4">{lot.artist}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-cream/30 font-body">Старт</p>
                    <p className="font-numbers text-xl text-cream font-light">{lot.startPrice}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-cream/20 group-hover:text-primary transition-colors duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <a href="/lots" className="btn-primary inline-block">
            Смотреть все лоты
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default LotsPreviewSection;
