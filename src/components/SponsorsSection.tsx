import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import hsoLogo from "@/assets/sponsors/hso.png";
import pervayaLiniyaLogo from "@/assets/sponsors/pervaya-liniya.svg";
import nenaprasnoLogo from "@/assets/sponsors/nenaprasno.png";
import vipavenueLogo from "@/assets/sponsors/vipavenue.svg";
import voluminousLogo from "@/assets/sponsors/voluminous.svg";
import lisizmLogo from "@/assets/sponsors/lisizm.svg";

const sponsors = [
  { name: "Высшая школа онкологии", logo: hsoLogo },
  { name: "Первая Линия (Health Care Resort)", logo: pervayaLiniyaLogo, invert: true },
  { name: "Фонд «Не напрасно»", logo: nenaprasnoLogo },
  { name: "VIPAVENUE", logo: vipavenueLogo },
  { name: "VOLUMINOUS", logo: voluminousLogo },
  { name: "ЛИСИЗМ", logo: lisizmLogo },
];

const SponsorsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 section-padding bg-background relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
              Нас поддерживают
            </p>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-light tracking-tight text-foreground leading-[0.9]">
            Партнёры и <span className="italic text-primary">спонсоры</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {sponsors.map((sponsor, i) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="flex items-center justify-center p-6 md:p-8 bg-card border border-border hover:border-primary/20 transition-all duration-300 min-h-[100px]"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className={`max-h-12 md:max-h-16 w-auto object-contain ${sponsor.invert ? "invert" : ""}`}
                title={sponsor.name}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 text-center"
        >
          <a
            href="#contacts"
            className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300 border-b border-border hover:border-primary pb-1"
          >
            Стать партнёром →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;
