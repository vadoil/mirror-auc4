import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import mirrorPhoto from "@/assets/forum-mirror-photo.png";

const OrganizersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-background">
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 min-h-[480px] md:min-h-[560px]">
        {/* Left — photo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden"
        >
          <img
            src={mirrorPhoto}
            alt="Форум для женщин «Отражение»"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Right — text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col justify-center items-start px-8 md:px-12 lg:px-16 py-12 md:py-16 relative"
        >
          {/* Top corners — date */}
          <div className="absolute top-6 left-8 md:left-12 lg:left-16 flex flex-col leading-none">
            <span className="font-display text-3xl md:text-4xl font-light tracking-tight text-foreground">
              Осень
            </span>
          </div>
          <div className="absolute top-6 right-8 md:right-12 lg:right-16">
            <span className="font-display text-3xl md:text-4xl font-light tracking-tight text-foreground">
              '26
            </span>
          </div>

          {/* Center content */}
          <div className="mt-16 md:mt-20 w-full">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-muted-foreground font-body mb-4">
              Форум для женщин
            </p>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-foreground leading-[0.95] mb-8">
              <span className="block">Отражен
              <span className="font-light">ие</span></span>
              <span className="block">Отражение</span>
            </h2>

            <div className="mt-8 md:mt-12 space-y-1">
              <p className="font-body text-xs md:text-sm uppercase tracking-[0.25em] text-foreground font-medium">
                Начало твоей прайм эры
              </p>
              <p className="font-body text-xs md:text-sm uppercase tracking-[0.25em] text-muted-foreground">
                Встречаемся в РБК События
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrganizersSection;