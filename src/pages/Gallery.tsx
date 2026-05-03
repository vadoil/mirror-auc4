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

const photos = [
  { src: photo01, alt: "Гостья у лота «Башня Огненной Искры»" },
  { src: photo04, alt: "Александр Цыпкин ведёт аукцион" },
  { src: photo02, alt: "Гостья вечера в зрительном зале" },
  { src: photo03, alt: "Гость аукциона «Отражение добра»" },
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
