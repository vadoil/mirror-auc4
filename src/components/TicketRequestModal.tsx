import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TicketRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketType: string;
  ticketPrice: string;
  showTrainingCheckbox?: boolean;
}

const TicketRequestModal = ({ isOpen, onClose, ticketType, ticketPrice, showTrainingCheckbox = true }: TicketRequestModalProps) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", promoCode: "" });
  const [wantsTraining, setWantsTraining] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [promoValid, setPromoValid] = useState<boolean | null>(null);
  const [promoChecking, setPromoChecking] = useState(false);

  const checkPromoCode = async (code: string) => {
    if (!code.trim()) {
      setPromoValid(null);
      return;
    }
    setPromoChecking(true);
    const { data } = await supabase
      .from("promo_codes")
      .select("id, code, is_active, max_uses, current_uses")
      .ilike("code", code.trim())
      .eq("is_active", true)
      .maybeSingle();

    if (data && (!data.max_uses || data.current_uses < data.max_uses)) {
      setPromoValid(true);
    } else {
      setPromoValid(false);
    }
    setPromoChecking(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Заполните имя и email");
      return;
    }
    if (!privacyConsent) {
      toast.error("Необходимо согласие с политикой конфиденциальности");
      return;
    }
    setLoading(true);

    const message = [
      form.message.trim(),
      wantsTraining ? '✅ Хочу на тренировку «Либидо фитнес» 18.04' : '',
    ].filter(Boolean).join('\n') || null;

    const promoCode = promoValid ? form.promoCode.trim().toUpperCase() : null;

    const requestId = crypto.randomUUID();
    const { error } = await supabase.from("ticket_requests").insert({
      id: requestId,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      ticket_type: ticketType,
      message,
      promo_code: promoCode,
    });
    setLoading(false);
    if (error) {
      toast.error("Ошибка отправки. Попробуйте позже.");
      return;
    }

    // Increment promo code usage
    if (promoCode) {
      supabase.rpc("increment_promo_usage" as any, { promo_code_value: promoCode });
    }

    // Send notification emails to organizers
    const recipients = [
      "gizelatolts@gmail.com",
      "alexa-ref@list.ru",
      "vvm1976@gmail.com",
    ];
    const templateData = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      ticketType,
      message: message || undefined,
      promoCode: promoCode || undefined,
    };
    for (const recipientEmail of recipients) {
      supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "ticket-request-notification",
          recipientEmail,
          idempotencyKey: `ticket-notify-${requestId}-${recipientEmail}`,
          templateData,
        },
      });
    }

    toast.success(promoCode
      ? "Заявка отправлена! Промокод применён — регистрация без оплаты."
      : "Заявка отправлена! Мы свяжемся с вами."
    );
    setForm({ name: "", email: "", phone: "", message: "", promoCode: "" });
    setWantsTraining(false);
    setPrivacyConsent(false);
    setPromoValid(null);
    onClose();
  };

  const displayPrice = promoValid ? "Бесплатно" : ticketPrice;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-warm-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-charcoal border border-cream/10 w-full max-w-md p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-2xl text-cream uppercase tracking-tight">Заявка</h3>
                <p className="text-cream/40 text-xs font-body mt-1">
                  {ticketType} · {promoValid ? (
                    <span className="text-green-400 font-medium">Бесплатно по промокоду</span>
                  ) : displayPrice}
                </p>
              </div>
              <button onClick={onClose} className="text-cream/40 hover:text-cream transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Ваше имя *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary transition-colors"
                required
                maxLength={100}
              />
              <input
                type="email"
                placeholder="Email *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary transition-colors"
                required
                maxLength={255}
              />
              <input
                type="tel"
                placeholder="Телефон"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary transition-colors"
                maxLength={20}
              />

              {/* Promo code field */}
              <div className="relative">
                <div className="flex items-center gap-2 mb-1.5">
                  <Tag className="w-3 h-3 text-cream/40" />
                  <span className="text-cream/40 text-[10px] uppercase tracking-[0.2em] font-body">Промокод</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Введите промокод"
                    value={form.promoCode}
                    onChange={(e) => {
                      setForm({ ...form, promoCode: e.target.value });
                      setPromoValid(null);
                    }}
                    onBlur={() => checkPromoCode(form.promoCode)}
                    className={`w-full bg-cream/5 border text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none transition-colors ${
                      promoValid === true ? "border-green-400/50" : promoValid === false ? "border-red-400/50" : "border-cream/10 focus:border-primary"
                    }`}
                    maxLength={50}
                  />
                  {promoChecking && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/30 text-xs font-body">
                      проверка...
                    </span>
                  )}
                  {promoValid === true && !promoChecking && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                  )}
                </div>
                {promoValid === true && (
                  <p className="text-green-400 text-xs font-body mt-1">Промокод применён — регистрация без оплаты</p>
                )}
                {promoValid === false && (
                  <p className="text-red-400/70 text-xs font-body mt-1">Промокод не найден или недействителен</p>
                )}
              </div>

              <textarea
                placeholder="Комментарий"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary transition-colors resize-none h-20"
                maxLength={500}
              />

              {showTrainingCheckbox && (
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={wantsTraining}
                    onChange={(e) => setWantsTraining(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-primary"
                  />
                  <span className="text-cream/60 text-xs font-body leading-relaxed group-hover:text-cream/80 transition-colors">
                    Хочу получить приглашение на тренировку-презентацию программы женского здоровья «Либидо фитнес» 18.04 в зале пространства «Место быть»
                  </span>
                </label>
              )}

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={privacyConsent}
                  onChange={(e) => setPrivacyConsent(e.target.checked)}
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
                className="w-full bg-primary text-primary-foreground py-4 text-xs uppercase tracking-[0.2em] font-body font-medium hover:opacity-90 transition-all disabled:opacity-50"
              >
                {loading ? "Отправка..." : promoValid ? "Зарегистрироваться бесплатно" : "Отправить заявку"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TicketRequestModal;
