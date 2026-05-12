import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BidRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  lotId: string;
  lotTitle: string;
  currentPrice: number;
  minBid?: number;
  defaultMode?: "bid" | "buy";
}

const formatPrice = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;

const BidRequestModal = ({
  isOpen,
  onClose,
  lotId,
  lotTitle,
  currentPrice,
  minBid,
  defaultMode = "bid",
}: BidRequestModalProps) => {
  const [mode, setMode] = useState<"bid" | "buy">(defaultMode);
  const [form, setForm] = useState({ name: "", email: "", phone: "", amount: "", message: "" });
  const [privacy, setPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setForm({ name: "", email: "", phone: "", amount: "", message: "" });
    setPrivacy(false);
    setMode(defaultMode);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Заполните имя и телефон");
      return;
    }
    if (!privacy) {
      toast.error("Необходимо согласие с политикой конфиденциальности");
      return;
    }

    let amount: number | null = null;
    if (mode === "bid") {
      const n = Number(form.amount.replace(/\s/g, ""));
      if (!n || n <= 0) {
        toast.error("Укажите сумму ставки");
        return;
      }
      if (minBid && n < minBid) {
        toast.error(`Минимальная ставка: ${formatPrice(minBid)}`);
        return;
      }
      amount = n;
    }

    setLoading(true);
    const { error } = await supabase.from("lot_reservations" as any).insert({
      lot_id: lotId,
      name: form.name.trim(),
      email: form.email.trim() || `noemail+${Date.now()}@otrazhenie.local`,
      phone: form.phone.trim(),
      message: form.message.trim() || null,
      bid_amount: amount,
      request_type: mode,
    });

    if (error) {
      setLoading(false);
      toast.error("Не удалось отправить заявку. Попробуйте позже.");
      return;
    }

    // Notify Telegram
    supabase.functions.invoke("notify-telegram", {
      body: {
        event: mode === "buy" ? "lot_buy_request" : "lot_bid_request",
        data: {
          lot_title: lotTitle,
          lot_id: lotId,
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || undefined,
          amount: amount ?? undefined,
          message: form.message.trim() || undefined,
        },
      },
    });

    setLoading(false);
    toast.success("Заявка принята! Куратор онлайн-торгов свяжется с вами.");
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-warm-black/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-charcoal border border-cream/10 w-full max-w-md p-8 max-h-[90vh] overflow-y-auto rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6 gap-4">
              <div>
                <h3 className="font-display text-2xl text-cream uppercase tracking-tight">
                  {mode === "buy" ? "Купить лот" : "Сделать ставку"}
                </h3>
                <p className="text-cream/40 text-xs font-body mt-1">«{lotTitle}»</p>
                <p className="text-cream/30 text-[11px] font-body mt-1">
                  {mode === "bid" ? "Текущая цена" : "Стартовая цена"}: {formatPrice(currentPrice)}
                </p>
              </div>
              <button onClick={handleClose} className="text-cream/40 hover:text-cream transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Mode toggle */}
            <div className="flex gap-2 mb-5">
              <button
                type="button"
                onClick={() => setMode("bid")}
                className={`flex-1 py-2.5 text-[11px] uppercase tracking-[0.18em] font-body transition-all rounded ${
                  mode === "bid"
                    ? "bg-primary text-primary-foreground"
                    : "bg-cream/5 text-cream/50 hover:text-cream border border-cream/10"
                }`}
              >
                Ставка
              </button>
              <button
                type="button"
                onClick={() => setMode("buy")}
                className={`flex-1 py-2.5 text-[11px] uppercase tracking-[0.18em] font-body transition-all rounded ${
                  mode === "buy"
                    ? "bg-primary text-primary-foreground"
                    : "bg-cream/5 text-cream/50 hover:text-cream border border-cream/10"
                }`}
              >
                Купить
              </button>
            </div>

            <form onSubmit={submit} className="space-y-3">
              <input
                type="text"
                placeholder="Ваше имя *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary transition-colors rounded"
                required
                maxLength={100}
              />
              <input
                type="tel"
                placeholder="Телефон *"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary transition-colors rounded"
                required
                maxLength={30}
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary transition-colors rounded"
                maxLength={255}
              />

              {mode === "bid" && (
                <div>
                  <input
                    type="number"
                    placeholder={minBid ? `Сумма ставки, ₽ (от ${minBid.toLocaleString("ru-RU")})` : "Сумма ставки, ₽"}
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary transition-colors rounded"
                    required
                    min={minBid || 1}
                  />
                </div>
              )}

              <textarea
                placeholder="Комментарий"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary transition-colors resize-none h-20 rounded"
                maxLength={500}
              />

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={privacy}
                  onChange={(e) => setPrivacy(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-primary"
                />
                <span className="text-cream/60 text-xs font-body leading-relaxed group-hover:text-cream/80 transition-colors">
                  Я ознакомлен(а) с{" "}
                  <Link to="/privacy" target="_blank" className="text-primary/80 hover:text-primary underline transition-colors">
                    политикой конфиденциальности
                  </Link>{" "}
                  и даю согласие на обработку персональных данных
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-4 text-xs uppercase tracking-[0.2em] font-body font-medium hover:opacity-90 transition-all disabled:opacity-50 rounded"
              >
                {loading ? "Отправка…" : mode === "buy" ? "Отправить заявку на покупку" : "Отправить ставку"}
              </button>

              <p className="text-cream/40 text-[11px] font-body leading-relaxed text-center pt-2">
                Куратор онлайн-торгов{" "}
                <a href="tel:+79623646646" className="text-cream/70 hover:text-primary transition-colors">
                  Александра&nbsp;Павлова
                </a>{" "}
                свяжется с вами для подтверждения. Telegram:{" "}
                <a
                  href="https://t.me/alexa_ah_alexa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary/80 hover:text-primary"
                >
                  @alexa_ah_alexa
                </a>
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BidRequestModal;
