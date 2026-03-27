import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const previewLots = [
  { id: 1, title: "«Рассвет над Невой»", artist: "Алексей Иванов", startPrice: "150 000 ₽", category: "Живопись" },
  { id: 2, title: "Колье «Северное сияние»", artist: "Дом PETROV", startPrice: "280 000 ₽", category: "Ювелирное искусство" },
  { id: 3, title: "Château Margaux 1995", artist: "Частная коллекция", startPrice: "95 000 ₽", category: "Коллекционные вина" },
  { id: 4, title: "Ужин с шеф-поваром", artist: "Ресторан White Rabbit", startPrice: "120 000 ₽", category: "Впечатления" },
  { id: 5, title: "«Метаморфозы»", artist: "Мария Серова", startPrice: "200 000 ₽", category: "Фотография" },
  { id: 6, title: "Браслет «Вечность»", artist: "Atelier Gemme", startPrice: "350 000 ₽", category: "Ювелирное искусство" },
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
              <div className="aspect-[4/3] bg-charcoal relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-4xl text-cream/10 uppercase">Лот {lot.id}</span>
                </div>
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
