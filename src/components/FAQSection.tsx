import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Как принять участие в аукционе?",
    a: "Зарегистрируйтесь на сайте, приобретите билет и получите доступ к каталогу лотов. Ставки можно делать как на площадке, так и онлайн.",
  },
  {
    q: "Куда направляются средства?",
    a: "100% средств сверх стартовой цены направляются в благотворительные фонды-партнёры. Полный отчёт публикуется после мероприятия.",
  },
  {
    q: "Как работает антиснайпинг?",
    a: "Если ставка делается в последние 2 минуты до завершения торгов по лоту, время автоматически продлевается, давая всем участникам возможность сделать ответную ставку.",
  },
  {
    q: "Можно ли участвовать онлайн?",
    a: "Да, после регистрации и покупки билета вы получите доступ к системе онлайн-ставок в реальном времени.",
  },
  {
    q: "Как получить выигранный лот?",
    a: "Лоты вручаются лично на мероприятии или доставляются курьерской службой в течение 7 рабочих дней после оплаты.",
  },
  {
    q: "Есть ли возврат билетов?",
    a: "Возврат возможен не позднее чем за 14 дней до мероприятия. Для VIP и Premium билетов возврат осуществляется в индивидуальном порядке.",
  },
];

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 section-padding bg-background">
      <div ref={ref} className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
              Вопросы
            </p>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-light tracking-tight text-foreground leading-[0.9]">
            Частые <span className="italic text-primary">вопросы</span>
          </h2>
        </motion.div>

        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="border-b border-border"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <h3 className="font-display text-lg md:text-xl font-light text-foreground group-hover:text-primary transition-colors duration-300 pr-4">
                  {faq.q}
                </h3>
                <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                  open === i ? "rotate-180 text-primary" : ""
                }`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                open === i ? "max-h-40 pb-6" : "max-h-0"
              }`}>
                <p className="font-body text-sm font-light text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
