import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Star } from "lucide-react";
import TicketRequestModal from "./TicketRequestModal";

const tickets = [
  {
    name: "Standard",
    price: "15 000 ₽",
    features: [
      "Доступ на аукцион",
      "Каталог лотов",
      "Welcome-drink",
      "Онлайн-ставки",
      "Сертификат участника",
    ],
    highlight: false,
  },
  {
    name: "VIP",
    price: "50 000 ₽",
    features: [
      "Всё из Standard",
      "VIP-превью лотов",
      "Ранний доступ к каталогу",
      "Приоритетное размещение",
      "Фуршет и бар",
      "VIP-подарок",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: "150 000 ₽",
    features: [
      "Всё из VIP",
      "Закрытый ужин с экспертами",
      "Персональный консультант",
      "Приватный просмотр коллекции",
      "Трансфер бизнес-класса",
      "Премиум-каталог с сертификатами",
    ],
    highlight: false,
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

        <div ref={ref} className="max-w-7xl mx-auto relative z-10">
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
              Билеты
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {tickets.map((ticket, i) => (
              <motion.div
                key={ticket.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i }}
                className={`group relative overflow-hidden transition-all duration-500 ${
                  ticket.highlight
                    ? "bg-primary/15 border-2 border-primary md:scale-[1.03]"
                    : "bg-cream/5 border border-cream/10 hover:border-cream/25"
                }`}
              >
                {ticket.highlight && (
                  <div className="absolute top-0 left-0 right-0 bg-primary py-2 flex items-center justify-center gap-2">
                    <Star className="w-3 h-3 text-primary-foreground" />
                    <span className="text-primary-foreground text-[10px] uppercase tracking-[0.3em] font-body font-medium">
                      Рекомендуем
                    </span>
                    <Star className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}

                <div className={`p-8 md:p-10 ${ticket.highlight ? "pt-14 md:pt-16" : ""}`}>
                  <p className="text-cream/40 text-[10px] uppercase tracking-[0.3em] font-body mb-2">{ticket.name}</p>
                  <p className="font-numbers text-4xl md:text-5xl font-light text-cream mb-8 leading-none">
                    {ticket.price}
                  </p>

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
                    Купить билет
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
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
