import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Star, Shield, Gavel } from "lucide-react";
import TicketRequestModal from "./TicketRequestModal";

const tickets = [
  {
    name: "Участник",
    price: "10 000 ₽",
    subtitle: "Регистрация на аукцион",
    features: [
      "Доступ на аукцион 26 апреля",
      "Каталог лотов",
      "Welcome-drink и фуршет",
      "Wellness-зона и detox-бар",
      "Нетворкинг с участниками",
      "Сертификат участника",
    ],
    highlight: false,
    icon: Shield,
  },
  {
    name: "Участник + Депозит",
    price: "25 000 ₽",
    subtitle: "Регистрация + право на онлайн-ставки",
    features: [
      "Всё из «Участник»",
      "Право делать ставки онлайн",
      "Предварительное бронирование лотов",
      "Приоритетный доступ к превью",
      "Депозит 15 000 ₽ — возвращается, если не выиграли",
      "10 000 ₽ — невозвратный регистрационный взнос",
    ],
    highlight: true,
    icon: Gavel,
  },
];

const TicketsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [modal, setModal] = useState<{ open: boolean; type: string; price: string }>({ open: false, type: "", price: "" });

  return (
    <>
      <section id="tickets" className="relative py-24 md:py-32 section-padding overflow-hidden">
        <div className="absolute inset-0 bg-charcoal" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />

        <div ref={ref} className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-20"
          >
            <div className="flex items-center gap-3 justify-center mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/40 font-body">
                Присоединяйтесь
              </p>
              <div className="w-8 h-px bg-primary" />
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-light tracking-tight text-cream leading-[0.9]">
              Регистрация
            </h2>
            <p className="font-body text-sm text-cream/40 mt-6 max-w-xl mx-auto leading-relaxed">
              Билет — это ваша регистрация на аукцион. Он фильтрует случайных гостей и подтверждает серьёзность намерений.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {tickets.map((ticket, i) => (
              <motion.div
                key={ticket.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i }}
                className={`group relative overflow-hidden transition-all duration-500 ${
                  ticket.highlight
                    ? "bg-primary/15 border-2 border-primary"
                    : "bg-cream/5 border border-cream/10 hover:border-cream/25"
                }`}
              >
                {ticket.highlight && (
                  <div className="absolute top-0 left-0 right-0 bg-primary py-2 flex items-center justify-center gap-2">
                    <Star className="w-3 h-3 text-primary-foreground" />
                    <span className="text-primary-foreground text-[10px] uppercase tracking-[0.3em] font-body font-medium">
                      Для участия в торгах
                    </span>
                    <Star className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}

                <div className={`p-8 md:p-10 ${ticket.highlight ? "pt-14 md:pt-16" : ""}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <ticket.icon className="w-5 h-5 text-primary" />
                    <p className="text-cream/40 text-[10px] uppercase tracking-[0.3em] font-body">{ticket.name}</p>
                  </div>
                  <p className="font-numbers text-4xl md:text-5xl font-light text-cream mb-2 leading-none">
                    {ticket.price}
                  </p>
                  <p className="font-body text-xs text-cream/50 mb-8">{ticket.subtitle}</p>

                  <ul className="space-y-3 mb-10">
                    {ticket.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="font-body text-sm font-light text-cream/60">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setModal({ open: true, type: ticket.name, price: ticket.price })}
                    className={`block w-full text-center text-xs uppercase tracking-[0.2em] font-body py-4 transition-all duration-500 ${
                      ticket.highlight
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : "border border-cream/20 text-cream hover:bg-cream hover:text-charcoal"
                    }`}
                  >
                    Зарегистрироваться
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Explanation note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 text-center"
          >
            <p className="font-body text-[11px] text-cream/30 max-w-2xl mx-auto leading-relaxed">
              После отправки заявки наш менеджер свяжется с вами для подтверждения регистрации и оплаты. Депозит возвращается полностью, если вы не стали победителем ни по одному лоту.
            </p>
          </motion.div>
        </div>
      </section>

      <TicketRequestModal
        isOpen={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
        ticketType={modal.type}
        ticketPrice={modal.price}
      />
    </>
  );
};

export default TicketsSection;
