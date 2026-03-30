import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { ArrowLeft, Clock, Gavel, User, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const formatPrice = (n: number) => n.toLocaleString("ru-RU") + " ₽";

const getImageUrl = (url: string | null) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  const { data } = supabase.storage.from("lot-images").getPublicUrl(url);
  return data.publicUrl;
};

type Bid = {
  id: string;
  amount: number;
  created_at: string;
  user_id: string | null;
};

const LotDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [lot, setLot] = useState<any>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const currentPrice = bids.length > 0 ? bids[0].amount : lot?.starting_price || 0;
  const minBid = currentPrice + (lot?.bid_step || 0);

  useEffect(() => {
    if (!id) return;
    fetchLot();
    fetchBids();

    // Realtime bids
    const channel = supabase
      .channel(`bids-${id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "bids", filter: `lot_id=eq.${id}` }, () => {
        fetchBids();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [id]);

  useEffect(() => {
    if (!lot?.end_at) return;
    const tick = () => {
      const diff = new Date(lot.end_at).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft("Торги завершены"); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${d > 0 ? d + " дн. " : ""}${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [lot?.end_at]);

  const fetchLot = async () => {
    const { data } = await supabase.from("lots").select("*").eq("id", id).single();
    if (data) setLot(data);
    setLoading(false);
  };

  const fetchBids = async () => {
    const { data } = await supabase
      .from("bids")
      .select("id, amount, created_at, user_id")
      .eq("lot_id", id!)
      .order("amount", { ascending: false })
      .limit(20);
    if (data) setBids(data);
  };

  const placeBid = async () => {
    if (!user) {
      toast.error("Войдите в систему, чтобы сделать ставку");
      return;
    }
    const amount = Number(bidAmount);
    if (!amount || amount < minBid) {
      toast.error(`Минимальная ставка: ${formatPrice(minBid)}`);
      return;
    }
    if (lot?.status !== "active") {
      toast.error("Торги по этому лоту не активны");
      return;
    }
    if (lot?.end_at && new Date(lot.end_at).getTime() < Date.now()) {
      toast.error("Торги по этому лоту завершены");
      return;
    }

    setPlacing(true);
    const { error } = await supabase.from("bids").insert({
      lot_id: id!,
      user_id: user.id,
      amount,
      bidder_name: user.user_metadata?.full_name || user.email || "Аноним",
      bidder_email: user.email || "",
    });
    setPlacing(false);

    if (error) {
      toast.error("Ошибка при размещении ставки");
      return;
    }
    toast.success("Ставка принята!");
    setBidAmount("");
    fetchBids();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-black">
        <Header />
        <div className="pt-28 pb-20 text-center text-cream/40 font-body">Загрузка...</div>
      </div>
    );
  }

  if (!lot) {
    return (
      <div className="min-h-screen bg-warm-black">
        <Header />
        <div className="pt-28 pb-20 text-center">
          <p className="text-cream/40 font-body text-lg mb-4">Лот не найден</p>
          <Link to="/lots" className="text-primary font-body text-sm hover:underline">← К каталогу</Link>
        </div>
      </div>
    );
  }

  const imgUrl = getImageUrl(lot.image_url);
  const isActive = lot.status === "active" && (!lot.end_at || new Date(lot.end_at).getTime() > Date.now());

  return (
    <div className="min-h-screen bg-warm-black">
      <Header />
      <div className="pt-28 pb-20 section-padding">
        <div className="max-w-6xl mx-auto">
          <Link to="/lots" className="inline-flex items-center gap-2 text-cream/40 text-xs font-body uppercase tracking-[0.2em] hover:text-cream transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Каталог лотов
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="aspect-square relative overflow-hidden bg-cream/5 border border-cream/10">
                {imgUrl ? (
                  <img src={imgUrl} alt={lot.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-cream/20">
                    <Gavel className="w-16 h-16" />
                  </div>
                )}
                {lot.category && (
                  <div className="absolute top-4 left-4 bg-primary/90 px-4 py-1.5">
                    <span className="text-primary-foreground text-[10px] uppercase tracking-[0.2em] font-body">{lot.category}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Info & Bidding */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col">
              <h1 className="font-display text-3xl md:text-4xl text-cream uppercase tracking-tight mb-4">
                {lot.title}
              </h1>
              {lot.description && (
                <p className="font-body text-sm text-cream/60 leading-relaxed mb-6">{lot.description}</p>
              )}

              {/* Timer */}
              {lot.end_at && (
                <div className="flex items-center gap-3 mb-6 p-4 bg-cream/5 border border-cream/10">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40 font-body">До окончания</p>
                    <p className="font-numbers text-xl text-cream">{timeLeft}</p>
                  </div>
                </div>
              )}

              {/* Current price */}
              <div className="p-6 bg-cream/5 border border-cream/10 mb-6">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40 font-body mb-1">
                      {bids.length > 0 ? "Текущая цена" : "Стартовая цена"}
                    </p>
                    <p className="font-numbers text-4xl text-cream font-light">{formatPrice(currentPrice)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40 font-body mb-1">Шаг</p>
                    <p className="font-numbers text-lg text-cream/60">{formatPrice(lot.bid_step)}</p>
                  </div>
                </div>

                {isActive ? (
                  user ? (
                    <div className="flex gap-3">
                      <input
                        type="number"
                        placeholder={`от ${formatPrice(minBid)}`}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="flex-1 bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary transition-colors"
                      />
                      <button
                        onClick={placeBid}
                        disabled={placing}
                        className="bg-primary text-primary-foreground px-6 py-3 text-xs uppercase tracking-[0.2em] font-body hover:opacity-90 transition-all disabled:opacity-50 whitespace-nowrap"
                      >
                        {placing ? "..." : "Сделать ставку"}
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/auth"
                      className="block text-center bg-primary text-primary-foreground py-4 text-xs uppercase tracking-[0.2em] font-body hover:opacity-90 transition-all"
                    >
                      Войти, чтобы сделать ставку
                    </Link>
                  )
                ) : (
                  <div className="flex items-center gap-2 text-cream/40 font-body text-sm">
                    <AlertCircle className="w-4 h-4" />
                    Торги завершены
                  </div>
                )}
              </div>

              {/* Delivery & restrictions */}
              {(lot.delivery_terms || lot.restrictions) && (
                <div className="space-y-3 mb-6">
                  {lot.delivery_terms && (
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40 font-body mb-1">Условия получения</p>
                      <p className="font-body text-sm text-cream/60">{lot.delivery_terms}</p>
                    </div>
                  )}
                  {lot.restrictions && (
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40 font-body mb-1">Ограничения</p>
                      <p className="font-body text-sm text-cream/60">{lot.restrictions}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Bid history */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40 font-body mb-3">
                  История ставок ({bids.length})
                </p>
                {bids.length === 0 ? (
                  <p className="text-cream/30 font-body text-sm">Ставок пока нет. Будьте первым!</p>
                ) : (
                  <div className="space-y-1 max-h-60 overflow-y-auto">
                    {bids.map((bid, i) => (
                      <div key={bid.id} className={`flex items-center justify-between py-2.5 px-3 text-sm font-body ${i === 0 ? "bg-primary/10 border border-primary/20" : "bg-cream/5 border border-cream/5"}`}>
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-cream/30" />
                          <span className="text-cream/60">
                            Участник ***{bid.user_id?.slice(-4) || "????"}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`font-numbers ${i === 0 ? "text-primary" : "text-cream/60"}`}>
                            {formatPrice(bid.amount)}
                          </span>
                          <span className="text-cream/30 text-xs">
                            {new Date(bid.created_at).toLocaleString("ru-RU", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short" })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LotDetail;
