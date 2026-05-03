import { motion } from "framer-motion";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { X } from "lucide-react";
import photo01 from "@/assets/gallery/photo-01.jpg";
import photo02 from "@/assets/gallery/photo-02.jpg";
import photo03 from "@/assets/gallery/photo-03.jpg";
import photo04 from "@/assets/gallery/photo-04.jpg";
import photo05 from "@/assets/gallery/photo-05.jpg";
import photo06 from "@/assets/gallery/photo-06.jpg";
import photo07 from "@/assets/gallery/photo-07.jpg";
import photo08 from "@/assets/gallery/photo-08.jpg";
import photo09 from "@/assets/gallery/photo-09.jpg";
import photo10 from "@/assets/gallery/photo-10.jpg";
import photo11 from "@/assets/gallery/photo-11.jpg";
import photo12 from "@/assets/gallery/photo-12.jpg";
import photo13 from "@/assets/gallery/photo-13.jpg";
import photo14 from "@/assets/gallery/photo-14.jpg";
import photo15 from "@/assets/gallery/photo-15.jpg";
import photo16 from "@/assets/gallery/photo-16.jpg";
import photo17 from "@/assets/gallery/photo-17.jpg";
import photo18 from "@/assets/gallery/photo-18.jpg";
import photo19 from "@/assets/gallery/photo-19.jpg";
import photo20 from "@/assets/gallery/photo-20.jpg";
import photo21 from "@/assets/gallery/photo-21.jpg";
import photo22 from "@/assets/gallery/photo-22.jpg";
import photo23 from "@/assets/gallery/photo-23.jpg";
import photo24 from "@/assets/gallery/photo-24.jpg";
import photo25 from "@/assets/gallery/photo-25.jpg";

const photos = [
  { src: photo07, alt: "Инсталляция «Отражение добра»" },
  { src: photo06, alt: "Зал перед началом аукциона" },
  { src: photo10, alt: "Лоты — фарфоровые башни" },
  { src: photo01, alt: "Гостья у лота «Башня Огненной Искры»" },
  { src: photo04, alt: "Александр Цыпкин ведёт аукцион" },
  { src: photo23, alt: "Ведущие открывают аукцион" },
  { src: photo09, alt: "Витрина с украшениями" },
  { src: photo16, alt: "Гости вечера" },
  { src: photo02, alt: "Гостья вечера в зрительном зале" },
  { src: photo20, alt: "Спикеры на сцене" },
  { src: photo11, alt: "Гостьи в фойе" },
  { src: photo08, alt: "Стенд SmartLife" },
  { src: photo22, alt: "Ведущий аукциона" },
  { src: photo13, alt: "Гости беседуют у лестницы" },
  { src: photo18, alt: "Беседа у видеоинсталляции" },
  { src: photo25, alt: "Александр Цыпкин с микрофоном" },
  { src: photo21, alt: "Гости в зрительном зале" },
  { src: photo03, alt: "Гость аукциона «Отражение добра»" },
  { src: photo17, alt: "Гость в красных брюках" },
  { src: photo12, alt: "Безалкогольные напитки Inspiro Blends" },
  { src: photo19, alt: "Гостьи в первом ряду" },
  { src: photo14, alt: "Диджей вечера" },
  { src: photo24, alt: "Гостья с улыбкой" },
  { src: photo15, alt: "Гостья в зелёной шляпке" },
  { src: photo05, alt: "Участница с табличкой «не напрасно»" },
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

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {photos.map((photo, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                className="group block w-full break-inside-avoid overflow-hidden rounded-sm bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </motion.button>
            ))}
          </div>

          <p className="mt-10 font-body text-sm text-muted-foreground/70 italic">
            Фотохроника пополняется — скоро здесь появятся новые кадры с вечера.
          </p>
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
