import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Clock, ExternalLink } from "lucide-react";
import venueImage from "@/assets/venue.jpg";

const VenuePreviewSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 section-padding bg-background">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">Площадка</p>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-normal uppercase tracking-tight text-foreground leading-[0.9]">
            Место <span className="text-primary italic">проведения</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-0 border border-border overflow-hidden rounded-lg">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[4/3] lg:aspect-auto min-h-[350px] overflow-hidden group"
          >
            <img src={venueImage} alt="Место быть – баланс-холл" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="p-8 md:p-12 flex flex-col justify-center bg-muted/50"
          >
            <h3 className="font-display text-2xl md:text-3xl text-foreground uppercase tracking-wide mb-2">
              «Место быть»
            </h3>
            <p className="font-body text-xs text-primary uppercase tracking-[0.2em] mb-6">
              Первый в России баланс-холл
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">
              Пространство нового формата в центре Москвы – wellbeing-культура, осознанность и эстетика.
              Идеальная атмосфера для благотворительного вечера.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="font-body text-sm text-foreground">Москва, ул. Мясницкая 24/7, стр. 1</p>
              </div>
              <div className="flex items-center gap-4">
                <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="font-body text-sm text-foreground">26 апреля 2026</p>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="font-body text-sm text-foreground">Сбор гостей: 15:00 · Public Talk: 16:00 · Аукцион: 17:00</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/venue" className="btn-outline">
                Подробнее
              </Link>
              <a
                href="https://mestobe.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Сайт площадки
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VenuePreviewSection;
