import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import lotDinner from "@/assets/lot-dinner-sitnikov.jpg";
import lotBiohacking from "@/assets/lot-biohacking-one.jpg";
import lotReels from "@/assets/lot-reels-sobolev.jpg";
import lotWatch from "@/assets/lot-watch-ballet.jpg";
import lotHockey from "@/assets/lot-hockey-belov.jpg";
import lotBallet from "@/assets/lot-ballet-lopatkina.jpg";
import lotEmelianenko from "@/assets/lot-emelianenko.jpg";

const fallbackImages = [lotDinner, lotBiohacking, lotReels, lotWatch, lotHockey, lotBallet, lotEmelianenko];

type Lot = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  starting_price: number;
  category: string | null;
  status: string;
  end_at: string | null;
  bid_step: number;
};

type BidMax = { lot_id: string; max_amount: number };

const formatPrice = (n: number) => n.toLocaleString("ru-RU") + " ₽";

const getImageUrl = (url: string | null) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  const { data } = supabase.storage.from("lot-images").getPublicUrl(url);
  return data.publicUrl;
};

const timeLeft = (endAt: string | null) => {
  if (!endAt) return null;
  const diff = new Date(endAt).getTime() - Date.now();
  if (diff <= 0) return "Завершён";
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  if (d > 0) return `${d} дн. ${h} ч.`;
  const m = Math.floor((diff % 3600000) / 60000);
  return `${h} ч. ${m} мин.`;
};

const Lots = () => {
  const [lots, setLots] = useState<Lot[]>([]);
  const [maxBids, setMaxBids] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: lotsData } = await supabase
        .from("lots")
        .select("id, title, description, image_url, starting_price, category, status, end_at, bid_step")
        .eq("status", "active")
        .order("sort_order");

      if (lotsData) {
        setLots(lotsData as Lot[]);
        const ids = lotsData.map((l: any) => l.id);
        if (ids.length > 0) {
          const { data: bidsData } = await supabase
            .from("bids")
            .select("lot_id, amount")
            .in("lot_id", ids)
            .order("amount", { ascending: false });

          if (bidsData) {
            const map: Record<string, number> = {};
            bidsData.forEach((b: any) => {
              if (!map[b.lot_id] || b.amount > map[b.lot_id]) {
                map[b.lot_id] = b.amount;
              }
            });
            setMaxBids(map);
          }
        }
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const getCurrentPrice = (lot: Lot) => maxBids[lot.id] || lot.starting_price;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-28 pb-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="font-display text-5xl md:text-7xl text-foreground uppercase tracking-tight leading-[0.9] mb-4">
              Каталог <span className="text-primary italic">лотов</span>
            </h1>
            <p className="font-body text-muted-foreground text-lg max-w-xl">
              Каждый лот – это уникальная возможность. Все средства направляются на благотворительность.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-muted-foreground font-body text-center py-20">Загрузка лотов...</div>
          ) : lots.length === 0 ? (
            <div className="text-muted-foreground font-body text-center py-20">Активных лотов пока нет</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {lots.map((lot, i) => {
                const imgUrl = getImageUrl(lot.image_url) || fallbackImages[i];
                const currentPrice = getCurrentPrice(lot);
                const remaining = timeLeft(lot.end_at);

                return (
                  <motion.div
                    key={lot.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.06 * i }}
                  >
                    <Link
                      to={`/lots/${lot.id}`}
                      className="group block bg-card border border-border hover:border-primary/30 transition-all duration-500 overflow-hidden rounded-lg"
                    >
                      <div className="aspect-[4/3] relative overflow-hidden">
                        {imgUrl && (
                          <img
                            src={imgUrl}
                            alt={lot.title}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        {lot.category && (
                          <div className="absolute top-3 left-3 bg-primary/90 px-3 py-1">
                            <span className="text-primary-foreground text-[10px] uppercase tracking-[0.2em] font-body">
                              {lot.category}
                            </span>
                          </div>
                        )}
                        {remaining && (
                          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-white/60" />
                            <span className="text-white/80 text-[10px] uppercase tracking-wider font-body">
                              {remaining}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="font-display text-base text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                          {lot.title}
                        </h3>
                        {lot.description && (
                          <p className="font-body text-xs text-muted-foreground mb-4 line-clamp-2">
                            {lot.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-body">
                              {maxBids[lot.id] ? "Текущая цена" : "Старт"}
                            </p>
                            <p className="font-numbers text-lg text-foreground font-light">
                              {formatPrice(currentPrice)}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors duration-300" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Lots;
