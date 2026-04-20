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
import soloviyLogo from "@/assets/sponsors/soloviy.png";
import skazPoKrayuLogo from "@/assets/sponsors/skaz-po-krayu.jpg";

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
  { name: "Marriott Imperial Plaza", logo: marriottLogo, url: "https://marriottimperialplaza.moscow/" },
  { name: "Лев & Единорог", logo: levEdinorogLogo, url: "https://levik.ru/" },
  { name: "Соловьи — женская русская баня", logo: soloviyLogo, url: "https://soloviy.ru/" },
  { name: "Сказ по краю", logo: skazPoKrayuLogo, url: "https://skazpokrayu.ru", fill: true },
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

  const totalSlides = Math.ceil(sponsors.length / PER_SLIDE_MOBILE);

  const renderCard = (sponsor: typeof sponsors[0], i: number) => (
    <motion.a
      key={sponsor.name}
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.05 * i }}
      className="relative overflow-hidden flex items-center justify-center p-4 md:p-6 bg-card border border-border hover:border-primary/20 transition-all duration-300 min-h-[80px] md:min-h-[90px]"
    >
      {sponsor.textOnly ? (
        <span className="font-display text-base md:text-lg font-medium text-foreground tracking-wide">
          {sponsor.name}
        </span>
      ) : sponsor.logo ? (
        sponsor.fill ? (
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className="absolute inset-0 w-full h-full object-cover"
            title={sponsor.name}
          />
        ) : (
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className={`max-h-10 md:max-h-12 w-auto object-contain ${sponsor.invert ? "invert" : ""}`}
            title={sponsor.name}
          />
        )
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

        {/* Все партнёры: 2 колонки на мобилке, 4-5 на десктопе */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
          {sponsors.map((sponsor, i) => renderCard(sponsor, i))}
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
