import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import hsoLogo from "@/assets/sponsors/hso.png";
import pervayaLiniyaLogo from "@/assets/sponsors/pervaya-liniya.svg";
import nenaprasnoLogo from "@/assets/sponsors/nenaprasno.png";
import vipavenueLogo from "@/assets/sponsors/vipavenue.svg";
import voluminousLogo from "@/assets/sponsors/voluminous.svg";
import lisizmLogo from "@/assets/sponsors/lisizm.svg";
import mestoBytLogo from "@/assets/sponsors/mesto-byt.svg";
import hedonistLogo from "@/assets/sponsors/hedonist.svg";
import karmawomanLogo from "@/assets/sponsors/karmawoman.png";
import oneCombinedLogo from "@/assets/sponsors/one-combined.png";
import shtabLogo from "@/assets/sponsors/shtab-kultury.svg";
import levEdinorogLogo from "@/assets/sponsors/lev-edinorog.svg";
import marriottLogo from "@/assets/sponsors/marriott.png";

const sponsors = [
  { name: "Smart Life", logo: null, textOnly: true, url: "https://smartlife.bio/" },
  { name: "Высшая школа онкологии", logo: hsoLogo, url: "https://higherschoolofoncology.ru/" },
  { name: "Первая Линия (Health Care Resort)", logo: pervayaLiniyaLogo, invert: true, url: "https://hcresort.ru/" },
  { name: "Фонд «Не напрасно»", logo: nenaprasnoLogo, url: "https://nenaprasno.ru/" },
  { name: "VIPAVENUE", logo: vipavenueLogo, url: "https://vipavenue.ru/" },
  { name: "VOLUMINOUS", logo: voluminousLogo, url: "https://voluminous.shop/" },
  { name: "ЛИСИЗМ", logo: lisizmLogo, url: "https://lisizm.moscow/" },
  { name: "Место быть", logo: mestoBytLogo, url: "https://mestobe.ru/" },
  { name: "HEDONIST", logo: hedonistLogo, invert: true, url: "https://hedonistgroup.ru/" },
  { name: "KARMA WOMAN", logo: karmawomanLogo, url: "https://www.sitnikov.com/" },
  { name: "Биохакинг центр ONE", logo: oneCombinedLogo, url: "https://one-future.ru/" },
  { name: "ШТАБ КУЛЬТУРЫ", logo: shtabLogo, url: "https://t.me/hq_culture" },
  { name: "Лев & Единорог", logo: levEdinorogLogo, url: "https://levik.ru/" },
  { name: "Marriott Imperial Plaza", logo: marriottLogo, url: "https://marriottimperialplaza.moscow/" },
];

const PER_SLIDE_MOBILE = 4;

const SponsorsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const totalSlides = Math.ceil(sponsors.length / 2);

  const renderCard = (sponsor: typeof sponsors[0], i: number) => (
    <motion.a
      key={sponsor.name}
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.05 * i }}
      className="flex items-center justify-center p-4 md:p-6 bg-card border border-border hover:border-primary/20 transition-all duration-300 min-h-[80px] md:min-h-[90px]"
    >
      {sponsor.textOnly ? (
        <span className="font-display text-base md:text-lg font-medium text-foreground tracking-wide">
          {sponsor.name}
        </span>
      ) : sponsor.logo ? (
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          className={`max-h-10 md:max-h-12 w-auto object-contain ${sponsor.invert ? "invert" : ""}`}
          title={sponsor.name}
        />
      ) : null}
    </motion.a>
  );

  return (
    <section id="sponsors" className="py-24 md:py-32 section-padding bg-background relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
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
          <p className="mt-6 max-w-2xl mx-auto font-body text-base md:text-lg text-muted-foreground leading-relaxed">
            Мы благодарим партнёров за поддержку и вклад в организацию аукциона, объединившего людей вокруг главного — возможности помогать, быть рядом и делать добро вместе
          </p>
        </motion.div>

        {/* Desktop: 3-row grid */}
        {!isMobile && (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
            {sponsors.map((sponsor, i) => renderCard(sponsor, i))}
          </div>
        )}

        {/* Mobile: carousel, 2 per slide */}
        {isMobile && (
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                animate={{ x: `-${currentSlide * 100}%` }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex"
              >
                {Array.from({ length: totalSlides }).map((_, slideIdx) => (
                  <div key={slideIdx} className="min-w-full grid grid-cols-2 gap-3 px-1">
                    {sponsors.slice(slideIdx * 2, slideIdx * 2 + 2).map((s, i) =>
                      renderCard(s, slideIdx * 2 + i)
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-1.5">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${i === currentSlide ? "bg-primary" : "bg-border"}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setCurrentSlide(Math.min(totalSlides - 1, currentSlide + 1))}
                disabled={currentSlide === totalSlides - 1}
                className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

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
