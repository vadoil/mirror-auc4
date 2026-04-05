import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, Clock, ExternalLink } from "lucide-react";
import venueImage from "@/assets/venue.jpg";

const VenueSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="venue" className="py-24 md:py-32 section-padding bg-warm-black">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/40 font-body">
              Площадка
            </p>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-normal uppercase tracking-tight text-cream leading-[0.9]">
            Место
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-0 border border-cream/10 overflow-hidden">
          {/* Left – Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-square lg:aspect-auto min-h-[400px] bg-cream/5"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.2!2d37.6367!3d55.7625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a5c2e774e77%3A0x3c0e3d7c5a4e8b2a!2z0YPQuy4g0JzRj9GB0L3QuNGG0LrQsNGPLCAyNC83!5e0!3m2!1sru!2sru!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.8)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Место быть – баланс-холл, Мясницкая 24/7"
              className="absolute inset-0 w-full h-full"
            />
            <div className="absolute inset-0 pointer-events-none border-r border-cream/10" />
          </motion.div>

          {/* Right – Venue info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex flex-col"
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={venueImage}
                alt="Место быть – первый в России баланс-холл"
                loading="lazy"
                width={1280}
                height={960}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/40 to-transparent" />
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center flex-1 -mt-20 relative z-10">
              <h3 className="font-display text-2xl md:text-3xl text-cream uppercase tracking-wide mb-2">
                Место быть
              </h3>
              <p className="font-body text-xs text-primary uppercase tracking-[0.2em] mb-6">
                Первый в России баланс-холл
              </p>
              <p className="font-body text-sm text-cream/60 leading-relaxed mb-8 max-w-md">
                Пространство нового формата в центре Москвы, где соединяются wellbeing-культура, осознанность и эстетика. Место, где можно замедлиться, вдохнуть глубже и почувствовать баланс – идеальная атмосфера для вечера «Отражение».
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-primary/30 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-cream/40 uppercase tracking-[0.2em]">Адрес</p>
                    <p className="font-body text-sm text-cream">Москва, ул. Мясницкая 24/7, стр. 1</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-primary/30 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-cream/40 uppercase tracking-[0.2em]">Дата</p>
                    <p className="font-body text-sm text-cream"><p className="font-body text-sm text-cream">26 апреля 2026</p></p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-primary/30 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-cream/40 uppercase tracking-[0.2em]">Время</p>
                    <p className="font-body text-sm text-cream">19:00 – 23:00</p>
                  </div>
                </div>

                <a
                  href="https://mestobe.ru/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 font-body text-xs text-primary hover:text-primary/80 transition-colors uppercase tracking-[0.2em]"
                >
                  mestobe.ru
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VenueSection;
