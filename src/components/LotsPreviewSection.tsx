import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import lotLongevity from "@/assets/lot-longevity.jpg";
import lotBiohacking from "@/assets/lot-biohacking.jpg";
import lotRetreat from "@/assets/lot-retreat.jpg";
import lotCryo from "@/assets/lot-cryo.jpg";
import lotNeuro from "@/assets/lot-neuro.jpg";
import lotDetox from "@/assets/lot-detox.jpg";

const localImages: Record<string, string> = {
  "/assets/lot-longevity.jpg": lotLongevity,
  "/assets/lot-biohacking.jpg": lotBiohacking,
  "/assets/lot-retreat.jpg": lotRetreat,
  "/assets/lot-cryo.jpg": lotCryo,
  "/assets/lot-neuro.jpg": lotNeuro,
  "/assets/lot-detox.jpg": lotDetox,
};

type Lot = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  starting_price: number;
  category: string | null;
  is_active: boolean;
  sort_order: number;
};

const getImageSrc = (url: string | null): string => {
  if (!url) return "";
  return localImages[url] || url;
};

const LotsPreviewSection = () => {
  const [lots, setLots] = useState<Lot[]>([]);

  useEffect(() => {
    const fetchLots = async () => {
      const { data } = await supabase
        .from("lots")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (data) setLots(data);
    };
    fetchLots();
  }, []);

  if (lots.length === 0) return null;

  return (
    <section id="lots-preview" className="relative z-20 py-24 md:py-32 bg-warm-black">
      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/40 font-body">
                Превью каталога
              </p>
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-normal uppercase tracking-tight text-cream leading-[0.9]">
              Лоты
            </h2>
          </div>
        </motion.div>
      </div>

      <div className="px-4 md:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {lots.map((lot, i) => (
            <motion.div
              key={lot.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.08 * i }}
              className="group bg-cream/5 border border-cream/10 hover:border-primary/30 transition-all duration-500 overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                {lot.image_url && (
                  <img
                    src={getImageSrc(lot.image_url)}
                    alt={lot.title}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-warm-black/60 via-transparent to-transparent" />
                {lot.category && (
                  <div className="absolute top-3 left-3 bg-primary/90 px-3 py-1">
                    <span className="text-primary-foreground text-[10px] uppercase tracking-[0.2em] font-body">{lot.category}</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-display text-base text-cream mb-1 group-hover:text-primary transition-colors duration-300">{lot.title}</h3>
                {lot.description && <p className="font-body text-xs text-cream/40 mb-4 line-clamp-2">{lot.description}</p>}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-cream/30 font-body">Старт</p>
                    <p className="font-numbers text-lg text-cream font-light">{lot.starting_price.toLocaleString()} ₽</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-cream/20 group-hover:text-primary transition-colors duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LotsPreviewSection;
