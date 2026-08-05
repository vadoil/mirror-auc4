import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CloudPaymentsForm from "./CloudPaymentsForm";

interface TicketRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketType: string;
  ticketPrice: string;
  showTrainingCheckbox?: boolean;
}

const TicketRequestModal = ({ isOpen, onClose, ticketType, ticketPrice }: TicketRequestModalProps) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", promo: "" });
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [freeSuccess, setFreeSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submittedRequestId, setSubmittedRequestId] = useState("");

  // Parse price like "15 000 ₽" → 15000
  const parsedAmount = (() => {
    const digits = (ticketPrice || "").replace(/[^\d]/g, "");
    const n = parseInt(digits, 10);
    return Number.isFinite(n) && n > 0 ? n : 15000;
  })();

  const sendEmails = (
    requestId: string,
    templateData: Record<string, unknown>,
    clientEmail: string,
    promoCode?: string,
  ) => {
    const recipients = ["gizelatolts@gmail.com", "alexa-ref@list.ru", "vvm1976@gmail.com"];
    for (const recipientEmail of recipients) {
      supabase.functions.invoke("send-email-smtp", {
        body: {
          templateName: "ticket-request-notification",
          recipientEmail,
          idempotencyKey: `ticket-notify-${requestId}-${recipientEmail}`,
          templateData,
        },
      });
    }
    supabase.functions.invoke("send-email-smtp", {
      body: {
        templateName: "ticket-request-confirmation",
        recipientEmail: clientEmail,
        idempotencyKey: `ticket-confirm-${requestId}`,
        templateData: {
          name: templateData.name,
          ticketType,
          promoCode,
        },
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Заполните имя, email и телефон");
      return;
    }
    if (!privacyConsent) {
      toast.error("Необходимо согласие с политикой конфиденциальности");
      return;
    }
    setLoading(true);

    // Validate promo code (optional) — a valid active code means free registration
    let validPromo: string | null = null;
    const promoInput = form.promo.trim();
    if (promoInput) {
      const { data: promo } = await supabase
        .from("promo_codes")
        .select("code, is_active, max_uses, current_uses")
        .ilike("code", promoInput)
        .eq("is_active", true)
        .maybeSingle();
      if (!promo || (promo.max_uses != null && promo.current_uses >= promo.max_uses)) {
        setLoading(false);
        toast.error("Промокод не найден или больше не действует");
        return;
      }
      validPromo = promo.code;
    }

    const message = form.message.trim() || null;
    const requestId = crypto.randomUUID();
    const { error } = await supabase.from("ticket_requests").insert({
      id: requestId,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      ticket_type: ticketType,
      message,
      promo_code: validPromo,
      ...(validPromo ? { status: "free", paid_at: new Date().toISOString() } : {}),
    });
    setLoading(false);
    if (error) {
      toast.error("Ошибка отправки. Попробуйте позже.");
      return;
    }

    const templateData = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      ticketType,
      message: message || undefined,
      promoCode: validPromo || undefined,
    };
    sendEmails(requestId, templateData, form.email.trim(), validPromo || undefined);

    // Telegram notification
    supabase.functions.invoke("notify-telegram", {
      body: {
        event: "ticket_request",
        data: {
          ticket_type: ticketType,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: message || undefined,
          promo_code: validPromo || undefined,
        },
      },
    });

    setSubmittedName(form.name.trim());
    setSubmittedEmail(form.email.trim());
    setSubmittedRequestId(requestId);

    if (validPromo) {
      toast.success("Регистрация по промокоду подтверждена");
      setFreeSuccess(true);
      return;
    }

    toast.success("Заявка сохранена. Перейдите к оплате.");
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
    setFreeSuccess(false);
    setForm({ name: "", email: "", phone: "", message: "", promo: "" });
    setPrivacyConsent(false);
    setSubmittedName("");
    setSubmittedEmail("");
    setSubmittedRequestId("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-warm-black/80 backdrop-blur-sm"
          onClick={handleClosePayment}
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
                <h3 className="font-display text-2xl text-cream uppercase tracking-tight">
                  {freeSuccess ? "Готово" : showPayment ? "Оплата" : "Заявка"}
                </h3>
                <p className="text-cream/40 text-xs font-body mt-1">
                  {ticketType} · {freeSuccess ? "по промокоду" : ticketPrice}
                </p>
              </div>
              <button onClick={handleClosePayment} className="text-cream/40 hover:text-cream transition-colors">
                <X size={20} />
              </button>
            </div>

            {freeSuccess ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <Check className="text-primary" size={24} />
                </div>
                <p className="text-cream font-body text-sm leading-relaxed mb-2">
                  {submittedName}, вы зарегистрированы по промокоду - без пожертвования.
                </p>
                <p className="text-cream/50 font-body text-xs leading-relaxed mb-6">
                  Подтверждение отправлено на {submittedEmail}. Мы свяжемся с вами перед событием.
                </p>
                <button
                  onClick={handleClosePayment}
                  className="w-full bg-primary text-primary-foreground py-4 text-xs uppercase tracking-[0.2em] font-body font-medium hover:opacity-90 transition-all"
                >
                  Закрыть
                </button>
              </div>
            ) : showPayment ? (
              <CloudPaymentsForm
                ticketRequestId={submittedRequestId}
                name={submittedName}
                email={submittedEmail}
                ticketType={ticketType}
                amount={parsedAmount}
              />
            ) : (
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
                  placeholder="Телефон *"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary transition-colors"
                  required
                  maxLength={20}
                />

                <textarea
                  placeholder="Комментарий"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary transition-colors resize-none h-20"
                  maxLength={500}
                />

                <div>
                  <input
                    type="text"
                    placeholder="Промокод (если есть)"
                    value={form.promo}
                    onChange={(e) => setForm({ ...form, promo: e.target.value })}
                    className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary transition-colors uppercase"
                    maxLength={40}
                  />
                  <p className="text-cream/35 text-[11px] font-body mt-2 leading-relaxed">
                    С действующим промокодом регистрация бесплатная - оплата не потребуется.
                  </p>
                </div>

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
                  {loading ? "Отправка..." : form.promo.trim() ? "Зарегистрироваться" : "Перейти к оплате"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TicketRequestModal;
