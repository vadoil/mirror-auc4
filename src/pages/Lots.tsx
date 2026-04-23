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
import lotSmartlife from "@/assets/lot-smartlife.png";

const fallbackImages = [lotDinner, lotBiohacking, lotReels, lotWatch, lotHockey, lotBallet, lotEmelianenko, lotSmartlife];

type Lot = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  preview_image_url: string | null;
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

const categories = [
  { label: "Развитие и вдохновение", filter: "развитие" },
  { label: "Биохакинг и велнесс", filter: "биохакинг" },
  { label: "Искусство и коллекция", filter: "искусство" },
  { label: "Хобби", filter: "хобби" },
  { label: "Ретрит и восстановление", filter: "ретрит" },
];

const Lots = () => {
  const [lots, setLots] = useState<Lot[]>([]);
  const [maxBids, setMaxBids] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: lotsData } = await supabase
        .from("lots")
        .select("id, title, description, image_url, preview_image_url, starting_price, category, status, end_at, bid_step")
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

  const filteredLots = activeFilter
    ? lots.filter((l) => l.category?.toLowerCase().includes(activeFilter))
    : lots;

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
              Варианты <span className="text-primary italic">лотов</span>
            </h1>
            <p className="font-body text-muted-foreground text-base max-w-2xl mb-6">
              Мы предлагаем лоты в направлениях:
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              <button
                onClick={() => setActiveFilter(null)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-body transition-all duration-300 border ${
                  activeFilter === null
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                Все
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.filter}
                  onClick={() => setActiveFilter(activeFilter === cat.filter ? null : cat.filter)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-body transition-all duration-300 border ${
                    activeFilter === cat.filter
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <p className="font-body text-muted-foreground/60 text-sm">
              Каждый лот – уникальная возможность. Все деньги, вырученные с продаж билетов и аукциона, направляются в поддержку фонда «Не напрасно».
            </p>
          </motion.div>

          {loading ? (
            <div className="text-muted-foreground font-body text-center py-20">Загрузка лотов...</div>
          ) : filteredLots.length === 0 ? (
            <div className="text-muted-foreground font-body text-center py-20">Лотов в этой категории пока нет</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredLots.map((lot, i) => {
                const imgUrl = getImageUrl(lot.preview_image_url) || getImageUrl(lot.image_url) || fallbackImages[i];
                const currentPrice = getCurrentPrice(lot);

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
                          <div className="absolute bottom-3 left-3 bg-gradient-to-r from-primary/90 to-primary/60 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg shadow-primary/20 border border-primary/20">
                            <span className="text-primary-foreground text-[10px] uppercase tracking-[0.2em] font-body font-medium drop-shadow-sm">
                              {lot.category}
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
