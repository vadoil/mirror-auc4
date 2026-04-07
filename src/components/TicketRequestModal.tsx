import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [wantsTraining, setWantsTraining] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Заполните имя и email");
      return;
    }
    setLoading(true);

    const message = [
      form.message.trim(),
      wantsTraining ? '✅ Хочу на тренировку «Либидо фитнес» 18.04' : '',
    ].filter(Boolean).join('\n') || null;

    const requestId = crypto.randomUUID();
    const { error } = await supabase.from("ticket_requests").insert({
      id: requestId,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      ticket_type: ticketType,
      message,
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
      phone: form.phone.trim() || undefined,
      ticketType,
      message: message || undefined,
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

    toast.success("Заявка отправлена! Мы свяжемся с вами.");
    setForm({ name: "", email: "", phone: "", message: "" });
    setWantsTraining(false);
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
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-charcoal border border-cream/10 w-full max-w-md p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-2xl text-cream uppercase tracking-tight">Заявка</h3>
                {ticketPrice && <p className="text-cream/40 text-xs font-body mt-1">{ticketType} · {ticketPrice}</p>}
                {!ticketPrice && <p className="text-cream/40 text-xs font-body mt-1">{ticketType}</p>}
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-4 text-xs uppercase tracking-[0.2em] font-body font-medium hover:opacity-90 transition-all disabled:opacity-50"
              >
                {loading ? "Отправка..." : "Отправить заявку"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TicketRequestModal;
