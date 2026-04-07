import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Gavel } from "lucide-react";
import TicketRequestModal from "./TicketRequestModal";

const ticket = {
  name: "Участник аукциона",
  price: "15 000 ₽",
  subtitle: "Невозвратный регистрационный взнос",
  features: [
    "Доступ на аукцион 26 апреля",
    "Право делать ставки онлайн",
    "Каталог лотов",
    "Нетворкинг с участниками",
    "Сертификат участника",
  ],
  icon: Gavel,
};

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

          <div className="max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden bg-primary/15 border-2 border-primary"
            >
              <div className="absolute top-0 left-0 right-0 bg-primary py-2 flex items-center justify-center gap-2">
                <Gavel className="w-3 h-3 text-primary-foreground" />
                <span className="text-primary-foreground text-[10px] uppercase tracking-[0.3em] font-body font-medium">
                  Единый билет
                </span>
                <Gavel className="w-3 h-3 text-primary-foreground" />
              </div>

              <div className="p-8 md:p-10 pt-14 md:pt-16">
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
                  className="block w-full text-center text-xs uppercase tracking-[0.2em] font-body py-4 transition-all duration-500 bg-primary text-primary-foreground hover:opacity-90"
                >
                  Зарегистрироваться
                </button>
              </div>
            </motion.div>
          </div>

          {/* Explanation note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 text-center"
          >
            <p className="font-body text-[11px] text-cream/30 max-w-2xl mx-auto leading-relaxed">
              После отправки заявки наш менеджер свяжется с вами для подтверждения регистрации и оплаты. Взнос является невозвратным.
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
