import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    text: "Потрясающая организация! Каждый лот – произведение искусства. Горжусь, что мои средства пошли на благотворительность.",
    name: "Екатерина М.",
    role: "Коллекционер",
  },
  {
    text: "Атмосфера вечера была невероятной. Аукционист держал зал в напряжении до последней ставки.",
    name: "Андрей К.",
    role: "Предприниматель",
  },
  {
    text: "Приобрела великолепное украшение и познакомилась с удивительными людьми. Обязательно вернусь в следующем году.",
    name: "Мария В.",
    role: "Меценат",
  },
  {
    text: "Прозрачная система торгов, профессиональные эксперты и настоящий азарт. Лучший аукцион, на котором я был.",
    name: "Дмитрий Л.",
    role: "Инвестор",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-24 md:py-32 section-padding bg-beige-warm relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
              Отзывы участников
            </p>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-light tracking-tight text-foreground leading-[0.9]">
            Они уже <span className="italic text-primary">участвовали</span>
          </h2>
        </motion.div>

        <div className="relative min-h-[280px] md:min-h-[220px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center w-full"
            >
              <Quote className="w-10 h-10 text-primary/30 mx-auto mb-6" />
              <blockquote className="font-display text-2xl md:text-3xl font-light text-foreground italic leading-snug mb-8 max-w-3xl mx-auto">
                {testimonials[current].text}
              </blockquote>
              <p className="font-body text-sm font-medium text-foreground">
                {testimonials[current].name}
              </p>
              <p className="font-body text-xs text-muted-foreground mt-1">
                {testimonials[current].role}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-6 mt-8">
          <button onClick={prev} className="w-10 h-10 border border-border hover:border-primary flex items-center justify-center transition-colors duration-300">
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? "bg-primary w-6" : "bg-border hover:bg-primary/40"
                }`}
              />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 border border-border hover:border-primary flex items-center justify-center transition-colors duration-300">
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
