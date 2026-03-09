import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Форум Отражение"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/50 to-warm-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding pb-16 md:pb-24 w-full">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-cream/60 text-xs md:text-sm uppercase tracking-[0.3em] font-body mb-6"
          >
            Форум для женщин · 26 апреля · РБК События
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-cream text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.9] mb-6"
          >
            ОТРА
            <br />
            ЖЕНИЕ
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="font-display text-cream/80 text-xl md:text-2xl lg:text-3xl font-light italic mb-12"
          >
            Начало твоей прайм-эры
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#tickets" className="btn-primary text-center">
              Купить билет
            </a>
            <a href="#contacts" className="btn-outline-light text-center">
              Стать партнёром
            </a>
          </motion.div>
        </div>

        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-16 md:bottom-24 right-6 md:right-12 lg:right-20 xl:right-32 hidden md:block"
        >
          <div className="text-right">
            <p className="font-display text-cream text-5xl lg:text-6xl font-light">26</p>
            <p className="text-cream/60 text-xs uppercase tracking-[0.3em] font-body">апреля '26</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
