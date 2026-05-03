import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Camera } from "lucide-react";

const Gallery = () => {
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border border-border rounded-lg p-16 md:p-24 flex flex-col items-center justify-center text-center bg-muted/20"
          >
            <Camera className="w-12 h-12 text-muted-foreground/40 mb-6" />
            <p className="font-display text-2xl md:text-3xl text-foreground uppercase tracking-tight mb-3">
              Фотографии скоро появятся
            </p>
            <p className="font-body text-sm text-muted-foreground max-w-md">
              Мы готовим фотоотчёт с вечера. Загляните позже — здесь будет полная галерея
              кадров от профессиональных фотографов мероприятия.
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
