import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mic } from "lucide-react";
import tsipkinPhoto from "@/assets/tsipkin.png";

const AuctioneerSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 section-padding bg-background">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          <div className="relative aspect-[3/4] bg-charcoal overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
            <div className="absolute inset-0 flex items-center justify-center">
              <PenTool className="w-24 h-24 text-cream/8" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-warm-black/90 via-warm-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 mb-2">
                <Mic className="w-4 h-4 text-primary" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-body">Ведущий вечера</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
                Ведущий
              </p>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[0.9] mb-2">
              Александр
            </h2>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight leading-[0.9] mb-6">
              <span className="italic text-primary">Цыпкин</span>
            </h2>
            <div className="w-16 h-px bg-primary mb-6" />
            <p className="editorial-body text-muted-foreground mb-4">
              Писатель, сценарист, продюсер и один из самых ярких ведущих современной российской сцены.
            </p>
            <p className="editorial-body text-muted-foreground mb-8">
              Автор бестселлеров «Женщины непреклонного возраста», «Дом, который построил…». 
              Создатель проекта «БеsПринworksципные чтения». Его вечера — это всегда энергия, 
              юмор и непредсказуемость. Идеальный ведущий для аукциона, где ставки — это эмоции.
            </p>
            <div className="flex gap-8">
              <div>
                <p className="font-numbers text-3xl font-light text-primary">10+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body mt-1">книг</p>
              </div>
              <div>
                <p className="font-numbers text-3xl font-light text-primary">1М+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body mt-1">подписчиков</p>
              </div>
              <div>
                <p className="font-numbers text-3xl font-light text-primary">500+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body mt-1">выступлений</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AuctioneerSection;
