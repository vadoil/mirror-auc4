import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const HERO_VIDEO_URL = "/__l5e/assets-v1/bbea364f-09e2-4f9f-84fa-32e5d7e08eae/hero-bg.mp4";

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
    const target = new Date("2026-04-28T18:00:00").getTime();
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
      {/* Background layers */}
      <div className="absolute inset-0 bg-warm-black">
        {/* Static image fallback */}
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          width={1920}
          height={1080}
        />
        {/* Video overlay */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen"
          src={HERO_VIDEO_URL}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/60 to-warm-black/30" />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      {/* Content */}
      <div className="relative z-10 section-padding pb-12 md:pb-20 w-full">
        <div className="max-w-7xl mx-auto">
          {/* Top label */}

          {/* Main title */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-20">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              >
                <p className="font-body text-cream/40 text-sm md:text-base uppercase tracking-[0.3em] mb-4">
                  Инвестируй в себя
                </p>
                <h1 className="font-display text-cream text-6xl sm:text-7xl md:text-[9rem] lg:text-[11rem] font-normal uppercase tracking-[-0.02em] leading-[0.85]">
                  Отра
                  <br />
                  <span className="text-primary">жени</span>е
                  <br />
                  добра
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="font-body text-cream/60 text-lg md:text-xl lg:text-2xl font-light mt-6 max-w-md"
              >
                Один вечер. Энергия. Осознанность. Добро.
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
                  Участвовать
                </a>
                <a href="#lots-preview" className="btn-outline-light text-center">
                  Смотреть лоты
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
              <p className="font-numbers text-3xl md:text-4xl font-normal text-cream uppercase">50+</p>
              <p className="text-cream/40 text-[10px] uppercase tracking-[0.2em] font-body mt-1">лотов</p>
            </div>
            <div>
              <p className="font-numbers text-3xl md:text-4xl font-normal text-cream uppercase">300+</p>
              <p className="text-cream/40 text-[10px] uppercase tracking-[0.2em] font-body mt-1">гостей</p>
            </div>
            <div>
              <p className="font-numbers text-3xl md:text-4xl font-normal text-cream uppercase">∞</p>
              <p className="text-cream/40 text-[10px] uppercase tracking-[0.2em] font-body mt-1">энергии</p>
            </div>
            <div>
              <p className="font-numbers text-3xl md:text-4xl font-normal text-cream uppercase">1</p>
              <p className="text-cream/40 text-[10px] uppercase tracking-[0.2em] font-body mt-1">вечер</p>
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
