import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Coffee, Dumbbell, LayoutGrid, MapPin, Presentation, ShoppingBag, Waves } from "lucide-react";
import spaceImg from "@/assets/wellness/venue/space.webp";
import lectoriumImg from "@/assets/wellness/venue/lectorium.webp";
import fitnessImg from "@/assets/wellness/venue/fitness.webp";
import soundImg from "@/assets/wellness/venue/sound.webp";
import marketImg from "@/assets/wellness/venue/market.webp";
import cafeImg from "@/assets/wellness/venue/cafe.webp";

// Фото — с сайта площадки mestobe.ru
const spots = [
  { icon: LayoutGrid, title: "Пространство", text: "3 000 м² для отдыха и восстановления", img: spaceImg },
  { icon: Presentation, title: "Лекторий", text: "Выступления врачей и public talk", img: lectoriumImg },
  { icon: Dumbbell, title: "Тренировки", text: "Либидо-фитнес и сильное тело", img: fitnessImg },
  { icon: Waves, title: "Практики", text: "Саунд-медитация с поющими чашами", img: soundImg },
  { icon: ShoppingBag, title: "Бьюти-шоппинг", text: "Бренды, beauty-девайсы и экспо", img: marketImg },
  { icon: Coffee, title: "Фудспот и кофе", text: "Кофе, протеиновые шейки, healthy-бар", img: cafeImg },
];

const INTERVAL = 4500;

const VenueCarousel = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((i: number) => setActive((i + spots.length) % spots.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(active + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [active, paused, go]);

  const spot = spots[active];

  return (
    <div
      className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-14 items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Пункты: активный подсвечен, клик переключает фото */}
      <ul className="order-2 lg:order-1 grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-1">
        {spots.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={on}
                className={`relative w-full text-left flex items-center gap-3 lg:gap-4 rounded-xl px-3 py-3 lg:px-4 lg:py-4 transition-colors ${
                  on ? "bg-primary/10" : "hover:bg-muted/60"
                }`}
              >
                <span
                  className={`w-10 h-10 lg:w-12 lg:h-12 shrink-0 rounded-full flex items-center justify-center transition-colors duration-500 ${
                    on ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                  }`}
                >
                  <s.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                </span>
                <span className="min-w-0">
                  <span className={`block font-display text-base lg:text-xl leading-tight transition-colors ${on ? "text-foreground" : "text-foreground/70"}`}>
                    {s.title}
                  </span>
                  <span className="hidden lg:block font-body text-xs text-muted-foreground mt-0.5">{s.text}</span>
                </span>
                {/* полоска прогресса автопрокрутки */}
                {on && (
                  <motion.span
                    key={`bar-${active}-${paused}`}
                    className="absolute left-4 right-4 bottom-1 h-px bg-primary origin-left hidden lg:block"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: paused ? 0 : 1 }}
                    transition={{ duration: paused ? 0 : INTERVAL / 1000, ease: "linear" }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Фото */}
      <div
        className="order-1 lg:order-2 relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-2xl overflow-hidden bg-muted"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={spot.img}
            src={spot.img}
            alt={`«Место быть» — ${spot.title.toLowerCase()}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black/70 via-transparent to-transparent pointer-events-none" />
        <div className="absolute left-5 right-5 bottom-5 flex items-end justify-between gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={spot.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-display text-2xl md:text-3xl text-cream leading-tight">{spot.title}</p>
              <p className="font-body text-sm text-cream/75">{spot.text}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-2 shrink-0">
            <button type="button" onClick={() => go(active - 1)} aria-label="Предыдущее фото" className="w-10 h-10 rounded-full bg-cream/15 backdrop-blur text-cream hover:bg-cream/30 flex items-center justify-center transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button type="button" onClick={() => go(active + 1)} aria-label="Следующее фото" className="w-10 h-10 rounded-full bg-cream/15 backdrop-blur text-cream hover:bg-cream/30 flex items-center justify-center transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="absolute top-4 left-5 right-5 flex gap-1.5">
          {spots.map((s, i) => (
            <span key={s.title} className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${i === active ? "bg-cream" : "bg-cream/30"}`} />
          ))}
        </div>
        <p className="absolute top-8 left-5 flex items-center gap-1.5 font-body text-[10px] uppercase tracking-[0.2em] text-cream/80">
          <MapPin className="w-3 h-3" /> Мясницкая, 24/7, стр. 1
        </p>
      </div>
    </div>
  );
};

export default VenueCarousel;
