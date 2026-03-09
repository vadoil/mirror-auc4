import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const tickets = [
  {
    name: "Standard",
    price: "15 000 ₽",
    features: [
      "Участие в главном зале",
      "Доступ к экспо-зоне",
      "Кофе-брейк",
      "Раздаточные материалы",
      "Сертификат участника",
    ],
    highlight: false,
  },
  {
    name: "VIP",
    price: "35 000 ₽",
    features: [
      "Всё из Standard",
      "VIP-зона с рассадкой",
      "Бизнес-ланч",
      "Женский круг",
      "Зона релакс-практик",
      "Подарочный набор",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: "75 000 ₽",
    features: [
      "Всё из VIP",
      "Закрытый ужин со спикерами",
      "Персональный networking",
      "Индивидуальная консультация",
      "Трансфер бизнес-класса",
      "Премиум-подарки",
    ],
    highlight: false,
  },
];

const TicketsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tickets" className="py-24 md:py-32 section-padding bg-charcoal text-cream">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-cream/50 mb-6 font-body">
            Присоединяйтесь
          </p>
          <h2 className="editorial-heading text-cream">
            Билеты
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {tickets.map((ticket, i) => (
            <motion.div
              key={ticket.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className={`relative p-8 md:p-10 border transition-all duration-500 ${
                ticket.highlight
                  ? "border-primary bg-primary/10 scale-[1.02]"
                  : "border-cream/10 hover:border-cream/30"
              }`}
            >
              {ticket.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] px-4 py-1.5 font-body">
                  Популярный
                </div>
              )}

              <h3 className="font-display text-2xl md:text-3xl font-light text-cream mb-2">
                {ticket.name}
              </h3>
              <p className="font-display text-4xl md:text-5xl font-light text-cream mb-8">
                {ticket.price}
              </p>

              <ul className="space-y-3 mb-10">
                {ticket.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="font-body text-sm font-light text-cream/70">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`block text-center text-sm uppercase tracking-[0.2em] font-body py-4 transition-all duration-500 ${
                  ticket.highlight
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-cream/30 text-cream hover:bg-cream hover:text-charcoal"
                }`}
              >
                Купить билет
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TicketsSection;
