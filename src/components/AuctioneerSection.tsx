import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gavel, Award } from "lucide-react";

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
            <div className="absolute inset-0 flex items-center justify-center">
              <Gavel className="w-24 h-24 text-cream/10" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-warm-black/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-body">Ведущий аукционист</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
                Аукционист
              </p>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[0.9] mb-6">
              Александр <span className="italic text-primary">Волков</span>
            </h2>
            <div className="w-16 h-px bg-primary mb-6" />
            <p className="editorial-body text-muted-foreground mb-4">
              Один из ведущих аукционистов России с 15-летним опытом проведения благотворительных и коммерческих торгов.
            </p>
            <p className="editorial-body text-muted-foreground mb-8">
              Провёл более 200 аукционов, общая сумма проданных лотов — более ₽500 миллионов. Известен уникальным стилем ведения торгов, который создаёт атмосферу азарта и вовлечённости.
            </p>
            <div className="flex gap-8">
              <div>
                <p className="font-numbers text-3xl font-light text-primary">200+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body mt-1">аукционов</p>
              </div>
              <div>
                <p className="font-numbers text-3xl font-light text-primary">₽500М</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body mt-1">в продажах</p>
              </div>
              <div>
                <p className="font-numbers text-3xl font-light text-primary">15</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body mt-1">лет опыта</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AuctioneerSection;
