import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Flame, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { getLotImageUrl, fallbackLotImages, LOTS_TENTATIVE_TIMING } from "@/lib/lotAssets";

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
};

const LotsPreviewSection = () => {
  const [dbLots, setDbLots] = useState<Lot[]>([]);
  const [maxBids, setMaxBids] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchLots = async () => {
      const { data } = await supabase
        .from("lots")
        .select("id, title, description, image_url, preview_image_url, starting_price, category, status, end_at, archive_date, sort_order")
        .is("archive_date", null)
        .order("sort_order");
      if (data) {
        setDbLots(data as unknown as Lot[]);
        const ids = (data as Lot[]).map((l) => l.id);
        if (ids.length > 0) {
          const map: Record<string, number> = {};
          const [{ data: bidsData }, { data: resData }] = await Promise.all([
            supabase.from("bids").select("lot_id, amount").in("lot_id", ids),
            supabase.from("lot_reservations" as any).select("lot_id, bid_amount").in("lot_id", ids).not("bid_amount", "is", null),
          ]);
          (bidsData ?? []).forEach((b: any) => {
            if (!map[b.lot_id] || b.amount > map[b.lot_id]) map[b.lot_id] = b.amount;
          });
          (resData ?? []).forEach((r: any) => {
            if (r.bid_amount && (!map[r.lot_id] || r.bid_amount > map[r.lot_id])) map[r.lot_id] = r.bid_amount;
          });
          setMaxBids(map);
        }
      }
      setLoaded(true);
    };
    fetchLots();
  }, []);

  if (!loaded) return null;

  return (
    <section id="lots-preview" className="relative z-20 py-12 md:py-16 bg-background">
      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20 flex flex-col items-center text-center gap-6"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
                Актуальные лоты
              </p>
              <div className="w-8 h-px bg-primary" />
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-normal uppercase tracking-tight text-foreground leading-[0.9] mb-6">
              Лоты <span className="text-primary italic">аукциона</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Развитие и вдохновение, биохакинг и велнесс, искусство, хобби, ретриты —{" "}
              {dbLots.length} лотов, доступных к торгам сейчас.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/lots" className="btn-primary inline-flex items-center gap-2">
              Все лоты <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="section-padding">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {dbLots.map((lot, i) => {
            const imgUrl = getLotImageUrl(lot.preview_image_url) || getLotImageUrl(lot.image_url) || fallbackLotImages[i % fallbackLotImages.length];
            const isSold = lot.status === "paid" || lot.status === "ended";
            const isTentative = LOTS_TENTATIVE_TIMING.has(lot.id);

            return (
              <motion.div
                key={lot.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.04 * i }}
              >
                <Link
                  to={`/lots/${lot.id}`}
                  className="group block bg-card border border-border hover:border-primary/30 transition-all duration-500 overflow-hidden relative rounded-lg h-full"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={lot.title}
                        loading="lazy"
                        width={1024}
                        height={768}
                        className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${isSold ? "grayscale-[40%]" : ""}`}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground/30 font-display text-2xl">Лот</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-warm-black/70 via-transparent to-transparent" />

                    <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                      {isSold && (
                        <div className="bg-foreground text-background px-3 py-1.5 rounded-sm shadow-lg">
                          <span className="text-[10px] uppercase tracking-[0.25em] font-body font-semibold">
                            Продано
                          </span>
                        </div>
                      )}
                      {isTentative && !isSold && (
                        <div className="bg-amber-500/95 text-warm-black px-2.5 py-1 rounded-sm shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                          <Clock className="w-3 h-3" />
                          <span className="text-[9px] uppercase tracking-[0.18em] font-body font-bold">
                            Уточняйте сроки
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    {(lot.category || (i === 0 && !isSold)) && (
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        {lot.category && (
                          <div className="bg-gradient-to-r from-primary/15 to-primary/5 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/20">
                            <span className="text-primary text-[9px] uppercase tracking-[0.15em] font-body font-semibold">{lot.category}</span>
                          </div>
                        )}
                        {i === 0 && !isSold && (
                          <div className="bg-accent/15 px-2.5 py-1 text-accent flex items-center gap-1">
                            <Flame className="w-3 h-3" />
                            <span className="text-[9px] uppercase tracking-wider font-body font-medium">Хит</span>
                          </div>
                        )}
                      </div>
                    )}
                    <h3 className="font-display text-sm text-foreground mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-1">{lot.title}</h3>
                    {lot.description && (
                      <p className="font-body text-[11px] text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{lot.description}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground/60 font-body">
                          {isSold ? "Финальная цена" : maxBids[lot.id] ? "Текущая ставка" : "Старт"}
                        </p>
                        <p className={`font-numbers text-base font-light ${isSold ? "text-primary" : maxBids[lot.id] ? "text-primary" : "text-foreground"}`}>
                          {(maxBids[lot.id] || lot.starting_price).toLocaleString("ru-RU")} ₽
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LotsPreviewSection;
