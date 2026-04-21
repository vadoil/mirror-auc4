import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    const target = new Date("2026-04-26T12:00:00Z").getTime();
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
    <section className="relative min-h-[80svh] md:min-h-[100svh] flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 bg-warm-black">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" width={1920} height={1080} />
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen" src={HERO_VIDEO_URL} />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/3" />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/50 to-warm-black/20" />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      <div className="relative z-10 section-padding pt-24 md:pt-40 pb-6 md:pb-20 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-20">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              >
                <p className="font-body text-cream/40 text-xs md:text-sm uppercase tracking-[0.3em] mb-4">
                  Благотворительный аукцион · 26 апреля 2026
                </p>
                <h1 className="font-display text-cream text-5xl sm:text-6xl md:text-[7rem] lg:text-[9rem] font-normal uppercase tracking-[-0.02em] leading-[0.85]">
                  Отра
                  <br />
                  жение
                  <br />
                  <span className="text-primary">добра</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="font-body text-cream/60 text-lg md:text-xl lg:text-2xl font-light mt-6 max-w-lg"
              >
                Первый в России аукцион заботы о здоровье. Уникальные лоты. Все средства – на добрые дела.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="flex flex-col gap-8 lg:items-end"
            >
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

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/lots" className="btn-primary text-center">
                  Смотреть лоты
                </Link>
                <Link to="/how-it-works" className="btn-outline-light text-center">
                  Как участвовать
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="mt-12 md:mt-16 pt-6 border-t border-cream/10 flex flex-wrap gap-8 md:gap-16"
          >
            <div>
              <p className="font-numbers text-3xl md:text-4xl font-normal text-cream uppercase">100%</p>
              <p className="text-cream/40 text-[10px] uppercase tracking-[0.2em] font-body mt-1">на благотворительность</p>
            </div>
            <div>
              <p className="font-numbers text-3xl md:text-4xl font-normal text-cream uppercase">15+</p>
              <p className="text-cream/40 text-[10px] uppercase tracking-[0.2em] font-body mt-1">лотов</p>
            </div>
            <div>
              <p className="font-numbers text-3xl md:text-4xl font-normal text-cream uppercase">50+</p>
              <p className="text-cream/40 text-[10px] uppercase tracking-[0.2em] font-body mt-1">гостей</p>
            </div>
          </motion.div>
        </div>
      </div>

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
