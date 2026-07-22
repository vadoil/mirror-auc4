import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import spbHero from "@/assets/upcoming-spb-hero.jpg";

const SpbTeaserBanner = () => {
  return (
    <section className="section-padding py-10 md:py-14 bg-warm-black">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/upcoming"
          className="group relative block overflow-hidden rounded-lg border border-cream/10 hover:border-primary/40 transition-colors"
        >
          <div className="absolute inset-0">
            <img
              src={spbHero}
              alt="Санкт-Петербург - ближайший аукцион"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-warm-black/90 via-warm-black/60 to-warm-black/30" />
          </div>

          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-primary" />
                <motion.p
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[10px] uppercase tracking-[0.4em] text-primary font-body"
                >
                  Ближайший аукцион · скоро
                </motion.p>
              </div>
              <h3 className="font-display text-2xl md:text-4xl text-cream uppercase tracking-tight leading-[1.05] mb-4">
                Искусство видеть <span className="italic text-primary">главное</span>
              </h3>
              <div className="flex flex-wrap gap-x-6 gap-y-2 font-body text-sm text-cream/80">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-primary" /> 13 августа 2026
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> Санкт-Петербург · Центр «Зрение»
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 self-start md:self-auto shrink-0 bg-primary text-primary-foreground px-5 py-3 rounded text-xs uppercase tracking-[0.2em] group-hover:opacity-90 transition-opacity">
              Программа вечера <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default SpbTeaserBanner;
