import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Mic, ArrowRight } from "lucide-react";
import heroImg from "@/assets/spb2911/mansion-auction-banner-v3.webp";

const SpbAuctionBanner = () => {
  return (
    <section id="peterburg-evening" className="relative scroll-mt-20 bg-warm-black">
        <Link
          to="/peterburg"
          className="group relative flex flex-col md:flex-row md:items-end md:min-h-[100svh] overflow-hidden"
        >
          <div className="relative w-full aspect-video md:aspect-auto md:absolute md:inset-0">
            <img
              src={heroImg}
              alt="Атмосфера вечера: парадная лестница особняка, картины, фарфоровые вазы, часы и ювелирные украшения"
              width={1672}
              height={941}
              loading="lazy"
              className="w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-black/30 to-transparent md:from-warm-black/95 md:via-warm-black/10" />
            <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-warm-black/30 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 w-full section-padding pb-12 md:pb-20 pt-7 md:pt-28">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-primary" />
                <motion.p
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream font-body font-medium"
                >
                  Благотворительный вечер · 29 ноября · исторический особняк</motion.p>
              </div>
              <h3 className="font-display text-4xl md:text-7xl text-cream uppercase tracking-tight leading-[1.05] mb-4">
                «Отражение добра» <span className="italic text-primary">в Петербурге</span>
              </h3>
              <div className="flex flex-wrap gap-x-6 gap-y-2 font-body text-sm text-cream/80">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-primary" /> 29 ноября 2026, воскресенье
                </span>
                <span className="inline-flex items-center gap-2">
                  <Mic className="w-3.5 h-3.5 text-primary" /> Благотворительное событие ведут Александр Цыпкин и Юрий Омельченко
                </span>
              </div>
              <p className="mt-4 font-body text-[10px] tracking-wide text-cream/60">Образ вечера · Полный каталог лотов — 1 ноября</p>
            </div>
            <span className="inline-flex items-center gap-2 self-start md:self-auto shrink-0 bg-primary text-primary-foreground px-5 py-3 rounded text-xs uppercase tracking-[0.2em] group-hover:opacity-90 transition-opacity">
              Подробнее о вечере <ArrowRight className="w-4 h-4" />
            </span>
          </div>
          </div>
        </Link>
    </section>
  );
};

export default SpbAuctionBanner;
