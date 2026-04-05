import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import mirrorPhoto from "@/assets/forum-mirror-photo.png";

const OrganizersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-background">
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2">
        {/* Left — photo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative aspect-square md:aspect-auto overflow-hidden"
        >
          <img
            src={mirrorPhoto}
            alt="Форум для женщин «Отражение»"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Right — text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex flex-col justify-between p-10 md:p-14 lg:p-16 min-h-[400px] md:min-h-[520px]"
        >
          {/* Top row: Осень ... '26 */}
          <div className="flex items-start justify-between">
            <span className="font-display text-2xl md:text-3xl font-light text-foreground">
              Осень
            </span>
            <span className="font-display text-2xl md:text-3xl font-light text-foreground">
              '26
            </span>
          </div>

          {/* Center content */}
          <div>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-muted-foreground font-body mb-5">
              Форум для женщин
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-bold tracking-tight text-foreground leading-[1.1]">
              Отражение
              <br />
              Отражение
            </h2>
          </div>

          {/* Bottom text */}
          <div className="space-y-1">
            <p className="font-body text-xs md:text-sm uppercase tracking-[0.25em] text-foreground font-semibold">
              Начало твоей прайм эры
            </p>
            <p className="font-body text-xs md:text-sm uppercase tracking-[0.25em] text-muted-foreground">
              Встречаемся в РБК События
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrganizersSection;