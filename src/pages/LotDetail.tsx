import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { ArrowLeft, Clock, Gavel, User, AlertCircle, Bookmark, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LotInterestModal from "@/components/LotInterestModal";
import { getLotImageUrl, LOTS_TENTATIVE_TIMING } from "@/lib/lotAssets";

const formatPrice = (n: number) => n.toLocaleString("ru-RU") + " ₽";

const getImageUrl = getLotImageUrl;

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
  const [showBooking, setShowBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", phone: "" });
  const [bookingSending, setBookingSending] = useState(false);
  const [bookingPrivacy, setBookingPrivacy] = useState(false);

  const currentPrice = bids.length > 0 ? bids[0].amount : lot?.starting_price || 0;
  const minBid = currentPrice + (lot?.bid_step || 0);

  useEffect(() => {
    if (!id) return;
    fetchLot();
    fetchBids();

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
      toast.error("Войдите в систему, чтобы проявить интерес");
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
    supabase.functions.invoke("notify-telegram", {
      body: {
        event: "new_bid",
        data: {
          lot_title: lot?.title,
          amount,
          bidder_name: user.user_metadata?.full_name || user.email || "Аноним",
          bidder_email: user.email,
        },
      },
    });
    fetchBids();
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name.trim() || !bookingForm.email.trim()) {
      toast.error("Заполните имя и email");
      return;
    }
    if (!bookingPrivacy) {
      toast.error("Необходимо согласие с политикой конфиденциальности");
      return;
    }
    setBookingSending(true);
    const { error } = await supabase.from("lot_reservations" as any).insert({
      lot_id: id,
      name: bookingForm.name.trim(),
      email: bookingForm.email.trim(),
      phone: bookingForm.phone.trim() || null,
    });
    setBookingSending(false);
    if (error) {
      toast.error("Ошибка. Попробуйте позже.");
      return;
    }
    toast.success("Бронь оформлена! Менеджер свяжется для подтверждения.");
    setBookingForm({ name: "", email: "", phone: "" });
    setShowBooking(false);
  };

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
          <Link to="/lots" className="text-primary font-body text-sm hover:underline">← К каталогу</Link>
        </div>
      </div>
    );
  }

  const imgUrl = getImageUrl(lot.image_url);
  const isActive = lot.status === "active" && (!lot.end_at || new Date(lot.end_at).getTime() > Date.now());

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-28 pb-20 section-padding">
        <div className="max-w-6xl mx-auto">
          <Link to="/lots" className="inline-flex items-center gap-2 text-muted-foreground text-xs font-body uppercase tracking-[0.2em] hover:text-foreground transition-colors mb-8">
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
                    <span className="text-primary-foreground text-[10px] uppercase tracking-[0.2em] font-body">{lot.category}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Info & Bidding */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col">
              <h1 className="font-display text-3xl md:text-4xl text-foreground uppercase tracking-tight mb-4">
                {lot.title}
              </h1>
              {LOTS_TENTATIVE_TIMING.has(lot.id) && (
                <div className="mb-4 inline-flex self-start items-center gap-2 bg-amber-500/15 border border-amber-500/40 text-amber-600 dark:text-amber-400 px-3 py-2 rounded-md">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-[0.18em] font-body font-bold">Уточняйте сроки исполнения</span>
                </div>
              )}
              {lot.description && (
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">{lot.description}</p>
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
              <div className="p-6 bg-muted/30 border border-border rounded-lg mb-6">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body mb-1">
                      {bids.length > 0 ? "Текущая цена" : "Стартовая цена"}
                    </p>
                    <p className="font-numbers text-4xl text-foreground font-light">{formatPrice(currentPrice)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body mb-1">Шаг</p>
                    <p className="font-numbers text-lg text-muted-foreground">{formatPrice(lot.bid_step)}</p>
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
                        className="flex-1 bg-background border border-border text-foreground px-4 py-3 text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded"
                      />
                      <button
                        onClick={placeBid}
                        disabled={placing}
                        className="bg-primary text-primary-foreground px-6 py-3 text-xs uppercase tracking-[0.2em] font-body hover:opacity-90 transition-all disabled:opacity-50 whitespace-nowrap rounded"
                      >
                        {placing ? "..." : "Проявить интерес"}
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/auth"
                      className="block text-center bg-primary text-primary-foreground py-4 text-xs uppercase tracking-[0.2em] font-body hover:opacity-90 transition-all rounded"
                    >
                      Войти, чтобы проявить интерес
                    </Link>
                  )
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground font-body text-sm">
                    <AlertCircle className="w-4 h-4" />
                    Торги завершены
                  </div>
                )}
              </div>

              {/* Interest CTA — отправит заявку с именем и телефоном в Telegram */}
              {isActive && (
                <div className="mb-3">
                  <LotInterestModal
                    lotId={lot.id}
                    lotTitle={lot.title}
                    trigger={
                      <button
                        type="button"
                        className="w-full bg-primary text-primary-foreground py-4 text-xs uppercase tracking-[0.2em] font-body font-medium hover:opacity-90 transition-all rounded"
                      >
                        Оставить заявку — мы свяжемся
                      </button>
                    }
                  />
                </div>
              )}

              {/* Register CTA */}
              <Link
                to="/auth"
                className="flex items-center justify-center gap-2 w-full border-2 border-primary text-primary py-4 text-xs uppercase tracking-[0.2em] font-body font-medium hover:bg-primary hover:text-primary-foreground transition-all rounded mb-6"
              >
                <Bookmark className="w-4 h-4" />
                Зарегистрироваться на мероприятие
              </Link>

              {/* Delivery & restrictions */}
              {(lot.delivery_terms || lot.restrictions) && (
                <div className="space-y-3 mb-6">
                  {lot.delivery_terms && (
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body mb-1">Условия получения</p>
                      <p className="font-body text-sm text-muted-foreground">{lot.delivery_terms}</p>
                    </div>
                  )}
                  {lot.restrictions && (
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body mb-1">Ограничения</p>
                      <p className="font-body text-sm text-muted-foreground">{lot.restrictions}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Bid history */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body mb-3">
                  История ставок ({bids.length})
                </p>
                {bids.length === 0 ? (
                  <p className="text-muted-foreground font-body text-sm">Ставок пока нет. Будьте первым!</p>
                ) : (
                  <div className="space-y-1 max-h-60 overflow-y-auto">
                    {bids.map((bid, i) => (
                      <div key={bid.id} className={`flex items-center justify-between py-2.5 px-3 text-sm font-body rounded ${i === 0 ? "bg-primary/10 border border-primary/20" : "bg-muted/30 border border-border"}`}>
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Участник ***{bid.user_id?.slice(-4) || "????"}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`font-numbers ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>
                            {formatPrice(bid.amount)}
                          </span>
                          <span className="text-muted-foreground/60 text-xs">
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

      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-warm-black/80 backdrop-blur-sm"
            onClick={() => setShowBooking(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-background border border-border w-full max-w-md p-8 rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-2xl text-foreground uppercase tracking-tight">Бронь лота</h3>
                  <p className="text-muted-foreground text-xs font-body mt-1">{lot.title} · {formatPrice(currentPrice)}</p>
                </div>
                <button onClick={() => setShowBooking(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={20} />
                </button>
              </div>

              <p className="text-muted-foreground text-sm font-body mb-4">
                Это предварительная бронь — она не обязывает к покупке. Мы свяжемся с вами для подтверждения. Покупка лота происходит в день аукциона 26 апреля.
              </p>
              <p className="text-muted-foreground/60 text-xs font-body mb-6">
                Для онлайн-ставок необходим билет «Участник + Депозит».
              </p>

              <form onSubmit={handleBooking} className="space-y-4">
                <input
                  type="text"
                  placeholder="Ваше имя *"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  className="w-full bg-muted/30 border border-border text-foreground px-4 py-3 text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded"
                  required
                  maxLength={100}
                />
                <input
                  type="email"
                  placeholder="Email *"
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                  className="w-full bg-muted/30 border border-border text-foreground px-4 py-3 text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded"
                  required
                  maxLength={255}
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  className="w-full bg-muted/30 border border-border text-foreground px-4 py-3 text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded"
                  maxLength={20}
                />
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={bookingPrivacy}
                    onChange={(e) => setBookingPrivacy(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-primary"
                  />
                  <span className="text-muted-foreground text-xs font-body leading-relaxed group-hover:text-foreground/60 transition-colors">
                    Я ознакомлен(а) с{" "}
                    <Link to="/privacy" target="_blank" className="text-primary/80 hover:text-primary underline transition-colors">
                      политикой конфиденциальности
                    </Link>{" "}
                    и даю согласие на обработку персональных данных
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={bookingSending}
                  className="w-full bg-primary text-primary-foreground py-4 text-xs uppercase tracking-[0.2em] font-body font-medium hover:opacity-90 transition-all disabled:opacity-50 rounded"
                >
                  {bookingSending ? "Отправка..." : "Забронировать"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default LotDetail;
