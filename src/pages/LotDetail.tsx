import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Clock, Gavel, User, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BidRequestModal from "@/components/BidRequestModal";
import { getLotImageUrl, LOTS_TENTATIVE_TIMING } from "@/lib/lotAssets";

const formatPrice = (n: number) => n.toLocaleString("ru-RU") + " ₽";

type Bid = {
  id: string;
  amount: number;
  created_at: string;
  user_id: string | null;
};

const LotDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [lot, setLot] = useState<any>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"bid" | "buy">("bid");

  const currentPrice = bids.length > 0 ? bids[0].amount : lot?.starting_price || 0;
  const minBid = currentPrice + (lot?.bid_step || 0);

  useEffect(() => {
    if (!id) return;
    const fetchLot = async () => {
      const { data } = await supabase.from("lots").select("*").eq("id", id).single();
      if (data) setLot(data);
      setLoading(false);
    };
    const fetchBids = async () => {
      const [{ data: bidsData }, { data: resData }] = await Promise.all([
        supabase.from("bids").select("id, amount, created_at, user_id").eq("lot_id", id).limit(50),
        supabase.from("lot_reservation_bids" as any).select("id, bid_amount, created_at").eq("lot_id", id).not("bid_amount", "is", null).limit(50),
      ]);
      const merged: Bid[] = [
        ...((bidsData ?? []) as any[]).map((b) => ({ id: b.id, amount: b.amount, created_at: b.created_at, user_id: b.user_id })),
        ...((resData ?? []) as any[]).map((r) => ({ id: r.id, amount: r.bid_amount, created_at: r.created_at, user_id: null })),
      ].sort((a, b) => b.amount - a.amount);
      setBids(merged.slice(0, 20));
    };
    fetchLot();
    fetchBids();
  }, [id]);

  useEffect(() => {
    if (!lot?.end_at) return;
    const tick = () => {
      const diff = new Date(lot.end_at).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("Торги завершены");
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(
        `${d > 0 ? d + " дн. " : ""}${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      );
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [lot?.end_at]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-28 pb-20 text-center text-muted-foreground font-body">Загрузка...</div>
      </div>
    );
  }

  if (!lot) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-28 pb-20 text-center">
          <p className="text-muted-foreground font-body text-lg mb-4">Лот не найден</p>
          <Link to="/lots" className="text-primary font-body text-sm hover:underline">
            ← К каталогу
          </Link>
        </div>
      </div>
    );
  }

  const imgUrl = getLotImageUrl(lot.image_url);
  const isActive = lot.status === "active" && (!lot.end_at || new Date(lot.end_at).getTime() > Date.now());

  const openModal = (mode: "bid" | "buy") => {
    setModalMode(mode);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-28 pb-20 section-padding">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/lots"
            className="inline-flex items-center gap-2 text-muted-foreground text-xs font-body uppercase tracking-[0.2em] hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Каталог лотов
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="aspect-square relative overflow-hidden bg-muted/30 border border-border rounded-lg">
                {imgUrl ? (
                  <img src={imgUrl} alt={lot.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
                    <Gavel className="w-16 h-16" />
                  </div>
                )}
                {lot.category && (
                  <div className="absolute top-4 left-4 bg-primary/90 px-4 py-1.5 rounded">
                    <span className="text-primary-foreground text-[10px] uppercase tracking-[0.2em] font-body">
                      {lot.category}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col"
            >
              <h1 className="font-display text-3xl md:text-4xl text-foreground uppercase tracking-tight mb-4">
                {lot.title}
              </h1>
              {LOTS_TENTATIVE_TIMING.has(lot.id) && (
                <div className="mb-4 inline-flex self-start items-center gap-2 bg-amber-500/15 border border-amber-500/40 text-amber-600 dark:text-amber-400 px-3 py-2 rounded-md">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-[0.18em] font-body font-bold">
                    Уточняйте сроки исполнения
                  </span>
                </div>
              )}
              {lot.description && (
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
                  {lot.description}
                </p>
              )}

              {/* Timer */}
              {lot.end_at && (
                <div className="flex items-center gap-3 mb-6 p-4 bg-muted/30 border border-border rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body">До окончания</p>
                    <p className="font-numbers text-xl text-foreground">{timeLeft}</p>
                  </div>
                </div>
              )}

              {/* Current price */}
              <div className="p-6 bg-muted/30 border border-border rounded-lg mb-4">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body mb-1">
                      {bids.length > 0 ? "Текущая ставка" : "Стартовая цена"}
                    </p>
                    <p className="font-numbers text-4xl text-foreground font-light">{formatPrice(currentPrice)}</p>
                    {bids.length > 0 && (
                      <p className="text-[11px] text-muted-foreground font-body mt-1">
                        Старт: <span className="font-numbers">{formatPrice(lot.starting_price)}</span>
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body mb-1">Шаг</p>
                    <p className="font-numbers text-lg text-muted-foreground">{formatPrice(lot.bid_step)}</p>
                  </div>
                </div>

                {isActive ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => openModal("bid")}
                      className="bg-primary text-primary-foreground py-4 text-xs uppercase tracking-[0.2em] font-body font-medium hover:opacity-90 transition-all rounded"
                    >
                      Сделать ставку
                    </button>
                    <button
                      onClick={() => openModal("buy")}
                      className="border-2 border-primary text-primary py-4 text-xs uppercase tracking-[0.2em] font-body font-medium hover:bg-primary hover:text-primary-foreground transition-all rounded"
                    >
                      Купить сейчас
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground font-body text-sm">
                    <AlertCircle className="w-4 h-4" />
                    Торги завершены
                  </div>
                )}
              </div>

              {/* Curator hint */}
              {isActive && (
                <div className="p-4 bg-card border border-border rounded-lg mb-6">
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    Заполните короткую форму — куратор онлайн-торгов{" "}
                    <span className="text-foreground font-medium">Александра Павлова</span> свяжется с вами для
                    подтверждения ставки или покупки. Регистрация на сайте не требуется.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs font-body">
                    <a href="tel:+79623646646" className="text-primary/90 hover:text-primary transition-colors">
                      +7 (962) 364-66-46
                    </a>
                    <a
                      href="https://t.me/alexa_ah_alexa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary/90 hover:text-primary transition-colors"
                    >
                      @alexa_ah_alexa
                    </a>
                  </div>
                </div>
              )}

              {/* Delivery & restrictions */}
              {(lot.delivery_terms || lot.restrictions) && (
                <div className="space-y-3 mb-6">
                  {lot.delivery_terms && (
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body mb-1">
                        Условия получения
                      </p>
                      <p className="font-body text-sm text-muted-foreground">{lot.delivery_terms}</p>
                    </div>
                  )}
                  {lot.restrictions && (
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body mb-1">
                        Ограничения
                      </p>
                      <p className="font-body text-sm text-muted-foreground">{lot.restrictions}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Bid history */}
              {bids.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body mb-3">
                    История ставок ({bids.length})
                  </p>
                  <div className="space-y-1 max-h-60 overflow-y-auto">
                    {bids.map((bid, i) => (
                      <div
                        key={bid.id}
                        className={`flex items-center justify-between py-2.5 px-3 text-sm font-body rounded ${
                          i === 0 ? "bg-primary/10 border border-primary/20" : "bg-muted/30 border border-border"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Участник{bid.user_id ? ` ***${bid.user_id.slice(-4)}` : ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`font-numbers ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>
                            {formatPrice(bid.amount)}
                          </span>
                          <span className="text-muted-foreground/60 text-xs">
                            {new Date(bid.created_at).toLocaleString("ru-RU", {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <BidRequestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        lotId={lot.id}
        lotTitle={lot.title}
        currentPrice={currentPrice}
        minBid={minBid}
        defaultMode={modalMode}
      />

      <Footer />
    </div>
  );
};

export default LotDetail;
