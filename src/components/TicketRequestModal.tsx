import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submittedRequestId, setSubmittedRequestId] = useState("");

  // Parse price like "15 000 ₽" → 15000
  const parsedAmount = (() => {
    const digits = (ticketPrice || "").replace(/[^\d]/g, "");
    const n = parseInt(digits, 10);
    return Number.isFinite(n) && n > 0 ? n : 15000;
  })();

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

    const message = form.message.trim() || null;
    const requestId = crypto.randomUUID();
    const { error } = await supabase.from("ticket_requests").insert({
      id: requestId,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      ticket_type: ticketType,
      message,
      promo_code: null,
    });
    setLoading(false);
    if (error) {
      toast.error("Ошибка отправки. Попробуйте позже.");
      return;
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
      phone: form.phone.trim(),
      ticketType,
      message: message || undefined,
      promoCode: undefined,
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

    // Send confirmation email to the client
    supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "ticket-request-confirmation",
        recipientEmail: form.email.trim(),
        idempotencyKey: `ticket-confirm-${requestId}`,
        templateData: {
          name: form.name.trim(),
          ticketType,
          promoCode: undefined,
        },
      },
    });

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
        },
      },
    });

    toast.success("Заявка сохранена. Перейдите к оплате.");

    // Paid → show CloudPayments form
    setSubmittedName(form.name.trim());
    setSubmittedEmail(form.email.trim());
    setSubmittedRequestId(requestId);
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
    setForm({ name: "", email: "", phone: "", message: "" });
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
                  {showPayment ? "Оплата" : "Заявка"}
                </h3>
                <p className="text-cream/40 text-xs font-body mt-1">
                  {ticketType} · {ticketPrice}
                </p>
              </div>
              <button onClick={handleClosePayment} className="text-cream/40 hover:text-cream transition-colors">
                <X size={20} />
              </button>
            </div>

            {showPayment ? (
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
                  {loading ? "Отправка..." : "Перейти к оплате"}
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
