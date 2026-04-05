import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gift, Sparkles } from "lucide-react";
import vipGiftImg from "@/assets/vip-gift.jpg";

const VipGiftSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28 section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-beige-warm" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />

      <div ref={ref} className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative aspect-square overflow-hidden">
            <img
              src={vipGiftImg}
              alt="VIP подарочный набор"
              loading="lazy"
              width={800}
              height={800}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-black/40 to-transparent" />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
                Эксклюзив
              </p>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight text-foreground leading-[0.9] mb-6">
              VIP-<span className="italic text-primary">подарок</span>
            </h2>
            <div className="w-16 h-px bg-primary mb-6" />
            <p className="editorial-body text-muted-foreground mb-4">
              Каждый VIP-гость получает эксклюзивный подарочный набор: авторский каталог аукциона, сертификат коллекционера и уникальный арт-объект от одного из участвующих художников.
            </p>
            <p className="editorial-body text-muted-foreground mb-8">
              Стоимость подарочного набора – более ₽50 000. Количество ограничено.
            </p>
            <a href="#tickets" className="btn-primary inline-block">
              Стать VIP-гостем
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VipGiftSection;
