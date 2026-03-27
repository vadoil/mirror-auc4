import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const speakers = [
  { name: "Михаил Каменский", role: "Искусствовед, эксперт Sotheby's" },
  { name: "Елена Воронова", role: "Куратор, галерея современного искусства" },
  { name: "Андрей Петров", role: "Ювелир, основатель дома PETROV" },
  { name: "Ирина Краснова", role: "Коллекционер, меценат" },
  { name: "Дмитрий Соловьёв", role: "Винный эксперт, сомелье" },
  { name: "Ольга Маркова", role: "Директор благотворительного фонда" },
];

const SpeakerCard = ({ speaker, index, isInView }: { speaker: typeof speakers[0]; index: number; isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.7, delay: 0.1 * index }}
    className="group relative"
  >
    <div className="relative overflow-hidden aspect-[3/4] bg-charcoal">
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-6xl text-cream/10 uppercase">{speaker.name.charAt(0)}</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-warm-black/90 via-warm-black/20 to-transparent" />
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
                Эксперты вечера
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
            Стать экспертом →
          </a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {speakers.map((speaker, i) => (
            <SpeakerCard key={speaker.name} speaker={speaker} index={i} isInView={isInView} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-center text-cream/30 text-xs font-body tracking-wide"
        >
          * полный состав экспертов находится в процессе утверждения
        </motion.p>
      </div>
    </section>
  );
};

export default SpeakersSection;
