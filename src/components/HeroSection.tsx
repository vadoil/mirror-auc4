import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="text-center">
    <div className="font-numbers text-4xl sm:text-5xl md:text-6xl font-normal text-cream leading-none uppercase">
      {String(value).padStart(2, "0")}
    </div>
    <div className="text-cream/40 text-[10px] uppercase tracking-[0.3em] font-body mt-2">{label}</div>
  </div>
);

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2026-04-26T10:00:00").getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Background with parallax feel */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={heroBg}
          alt="Форум Отражение"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/60 to-warm-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-black/70 via-transparent to-warm-black/30" />
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 bottom-0 left-[20%] w-px bg-cream/5" />
        <div className="absolute top-0 bottom-0 left-[40%] w-px bg-cream/5" />
        <div className="absolute top-0 bottom-0 left-[60%] w-px bg-cream/5" />
        <div className="absolute top-0 bottom-0 left-[80%] w-px bg-cream/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding pb-12 md:pb-20 w-full">
        <div className="max-w-7xl mx-auto">
          {/* Top label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-px bg-primary" />
            <p className="text-cream/50 text-[10px] md:text-xs uppercase tracking-[0.4em] font-body">
              Оффлайн форум для женщин · 26 апреля 2026
            </p>
          </motion.div>

          {/* Main title */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-20">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="font-display text-cream text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-normal uppercase tracking-[-0.02em] leading-[0.85]"
              >
                ОТРА
                <br />
                <span className="text-primary">ЖЕ</span>НИЕ
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="font-body text-cream/70 text-xl md:text-2xl lg:text-3xl font-light italic mt-6"
              >
                Начало твоей прайм-эры
              </motion.p>
            </div>

            {/* Right column: countdown + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="flex flex-col gap-8 lg:items-end"
            >
              {/* Countdown */}
              <div className="flex gap-6 md:gap-8">
                <CountdownUnit value={timeLeft.days} label="дней" />
                <span className="font-numbers text-4xl md:text-5xl text-cream/20 self-start">:</span>
                <CountdownUnit value={timeLeft.hours} label="часов" />
                <span className="font-numbers text-4xl md:text-5xl text-cream/20 self-start">:</span>
                <CountdownUnit value={timeLeft.minutes} label="минут" />
                <span className="font-numbers text-4xl md:text-5xl text-cream/20 self-start hidden sm:block">:</span>
                <div className="hidden sm:block">
                  <CountdownUnit value={timeLeft.seconds} label="секунд" />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <a href="#tickets" className="btn-primary text-center">
                  Купить билет
                </a>
                <a href="#contacts" className="btn-outline-light text-center">
                  Стать партнёром
                </a>
              </div>
            </motion.div>
          </div>

          {/* Bottom info strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="mt-12 md:mt-16 pt-6 border-t border-cream/10 flex flex-wrap gap-8 md:gap-16"
          >
            <div>
              <p className="font-numbers text-3xl md:text-4xl font-normal text-cream uppercase">500+</p>
              <p className="text-cream/40 text-[10px] uppercase tracking-[0.2em] font-body mt-1">участниц</p>
            </div>
            <div>
              <p className="font-numbers text-3xl md:text-4xl font-normal text-cream uppercase">40+</p>
              <p className="text-cream/40 text-[10px] uppercase tracking-[0.2em] font-body mt-1">спикеров</p>
            </div>
            <div>
              <p className="font-numbers text-3xl md:text-4xl font-normal text-cream uppercase">20</p>
              <p className="text-cream/40 text-[10px] uppercase tracking-[0.2em] font-body mt-1">СМИ</p>
            </div>
            <div>
              <p className="font-numbers text-3xl md:text-4xl font-normal text-cream uppercase">1</p>
              <p className="text-cream/40 text-[10px] uppercase tracking-[0.2em] font-body mt-1">день для себя</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border border-cream/30 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-cream/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
