import { motion } from "framer-motion";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { X } from "lucide-react";
import event01 from "@/assets/gallery/event/event-01.webp";
import event02 from "@/assets/gallery/event/event-02.webp";
import event03 from "@/assets/gallery/event/event-03.webp";
import event04 from "@/assets/gallery/event/event-04.webp";
import event05 from "@/assets/gallery/event/event-05.webp";
import event06 from "@/assets/gallery/event/event-06.webp";
import event07 from "@/assets/gallery/event/event-07.webp";
import event08 from "@/assets/gallery/event/event-08.webp";
import event09 from "@/assets/gallery/event/event-09.webp";
import event10 from "@/assets/gallery/event/event-10.webp";
import event11 from "@/assets/gallery/event/event-11.webp";
import event12 from "@/assets/gallery/event/event-12.webp";
import event13 from "@/assets/gallery/event/event-13.webp";
import event14 from "@/assets/gallery/event/event-14.webp";
import event15 from "@/assets/gallery/event/event-15.webp";
import event16 from "@/assets/gallery/event/event-16.webp";
import event17 from "@/assets/gallery/event/event-17.webp";
import event18 from "@/assets/gallery/event/event-18.webp";
import event19 from "@/assets/gallery/event/event-19.webp";

const photos = [
  { src: event01, alt: "Иван Ситников и ведущий аукциона Александр Цыпкин с лотами «Башни»" },
  { src: event02, alt: "Гости вечера «Отражение добра»" },
  { src: event03, alt: "Гости на фотозоне «Отражение добра»" },
  { src: event04, alt: "Гостьи вечера у инсталляции" },
  { src: event05, alt: "Организаторы и гости проекта" },
  { src: event06, alt: "Гостьи в фотозоне аукциона" },
  { src: event07, alt: "Гостьи в чёрных образах" },
  { src: event08, alt: "Гостьи с табличкой №7" },
  { src: event09, alt: "Лоты — фарфоровые башни «Свод по крупицам»" },
  { src: event10, alt: "Спикеры на сцене аукциона" },
  { src: event11, alt: "Зал перед началом аукциона" },
  { src: event12, alt: "Витрина с винтажными украшениями" },
  { src: event13, alt: "Бар Inspiro Blends" },
  { src: event14, alt: "Стол с украшениями под розовой драпировкой" },
  { src: event15, alt: "Гостья с бокалом и браслетом «Отражение добра»" },
  { src: event16, alt: "Гостьи рассматривают наручные часы" },
  { src: event17, alt: "Гостьи с табличкой №1" },
  { src: event18, alt: "Золотое колье ручной работы" },
  { src: event19, alt: "Гостья с табличкой «Отражение добра»" },
];

const Gallery = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-28 pb-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <p className="font-body text-muted-foreground/60 text-xs uppercase tracking-[0.3em] mb-4">
              26 апреля 2026 · Balance Hall «Место быть»
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-foreground uppercase tracking-tight leading-[0.9] mb-6">
              Галерея <span className="text-primary italic">вечера</span>
            </h1>
            <p className="font-body text-muted-foreground text-base max-w-2xl">
              Фотохроника благотворительного аукциона «Отражение добра». Гости, лоты,
              атмосфера и моменты, которые сделали этот вечер особенным.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                className="group block w-full aspect-[3/4] overflow-hidden rounded-sm bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </motion.button>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <a
              href="https://disk.yandex.ru/d/XuzuOPEwPIX2uA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body uppercase tracking-[0.2em] text-sm px-7 py-4 rounded-sm hover:bg-primary/90 transition-colors"
            >
              Все фото с мероприятия →
            </a>
          </div>
        </div>
      </div>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={photos[active].src}
            alt={photos[active].alt}
            className="max-w-full max-h-[90vh] object-contain rounded-sm"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
