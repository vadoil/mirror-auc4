import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import heroImg from "@/assets/wellness/wellness-hero.webp";

const WellnessTeaserBanner = () => {
  return (
    <section className="relative bg-warm-black">
        <Link
          to="/wellness"
          className="group relative flex items-end min-h-[100svh] overflow-hidden"
        >
          <div className="absolute inset-0">
            <img
              src={heroImg}
              alt="Велнес-девичник «Отражение»"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-black/95 via-warm-black/40 to-warm-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-warm-black/60 to-transparent" />
          </div>

          <div className="relative z-10 w-full section-padding pb-16 md:pb-24 pt-28">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-primary" />
                <motion.p
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream font-body font-medium"
                >
                  Москва · 25 октября · участие 440 ₽
                </motion.p>
              </div>
              <h3 className="font-display text-4xl md:text-7xl text-cream uppercase tracking-tight leading-[1.05] mb-4">
                Велнес-девичник: <span className="italic text-primary">новая роскошь — забота о себе</span>
              </h3>
              <div className="flex flex-wrap gap-x-6 gap-y-2 font-body text-sm text-cream/80">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-primary" /> 25 октября 2026
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> Москва · баланс-холл «Место быть»
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 self-start md:self-auto shrink-0 bg-primary text-primary-foreground px-5 py-3 rounded text-xs uppercase tracking-[0.2em] group-hover:opacity-90 transition-opacity">
              Зарегистрироваться <ArrowRight className="w-4 h-4" />
            </span>
          </div>
          </div>
        </Link>
    </section>
  );
};

export default WellnessTeaserBanner;
