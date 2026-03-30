import { motion } from "framer-motion";
import { useState } from "react";
import { UserPlus, Search, Gavel, CreditCard, Heart, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const steps = [
  { icon: UserPlus, title: "Зарегистрируйтесь", desc: "Создайте аккаунт на сайте — это бесплатно и займёт 1 минуту." },
  { icon: Search, title: "Изучите каталог", desc: "Просмотрите лоты, выберите то, что вам по душе. У каждого лота указаны стартовая цена и шаг ставки." },
  { icon: Gavel, title: "Сделайте ставку", desc: "Укажите сумму не ниже минимальной. Ставки обновляются в реальном времени — следите за ходом торгов." },
  { icon: CreditCard, title: "Оплатите лот", desc: "Победитель получает инструкцию по оплате. Мы свяжемся с вами лично для оформления." },
  { icon: Heart, title: "Сделайте добро", desc: "Все вырученные средства направляются на благотворительность. Вы получаете лот и делаете мир лучше." },
];

const faqs = [
  { q: "Как принять участие в аукционе?", a: "Зарегистрируйтесь на сайте и войдите в личный кабинет. После этого вы сможете делать ставки на любые активные лоты." },
  { q: "Куда направляются средства?", a: "100% средств сверх стартовой цены направляются в благотворительные фонды-партнёры. Полный отчёт публикуется после мероприятия." },
  { q: "Можно ли участвовать онлайн?", a: "Да, ставки делаются через сайт в реальном времени. Вы можете участвовать из любой точки мира." },
  { q: "Как определяется победитель?", a: "Побеждает участник с наибольшей ставкой на момент завершения торгов по лоту." },
  { q: "Как получить выигранный лот?", a: "После оплаты мы свяжемся с вами для передачи лота. Условия получения указаны на странице каждого лота." },
  { q: "Есть ли возврат?", a: "Средства, оплаченные за лот, не возвращаются, так как направляются на благотворительность." },
  { q: "Какой минимальный шаг ставки?", a: "Шаг ставки указан индивидуально для каждого лота. Ваша ставка должна быть не менее текущей цены + шаг." },
];

const HowItWorks = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-warm-black">
      <Header />
      <div className="pt-28 pb-20 section-padding">
        <div className="max-w-4xl mx-auto">
          {/* How it works */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-20">
            <h1 className="font-display text-5xl md:text-7xl text-cream uppercase tracking-tight leading-[0.9] mb-4">
              Как <span className="text-primary italic">участвовать</span>
            </h1>
            <p className="font-body text-cream/50 text-lg">
              Пять простых шагов от регистрации до доброго дела.
            </p>
          </motion.div>

          <div className="space-y-6 mb-24">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="flex items-start gap-6 p-6 bg-cream/5 border border-cream/10"
              >
                <div className="w-12 h-12 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-numbers text-2xl text-primary/40">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-display text-lg text-cream uppercase">{step.title}</h3>
                  </div>
                  <p className="font-body text-sm text-cream/60">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-24">
            <Link to="/lots" className="btn-primary text-center">Смотреть лоты</Link>
            <Link to="/auth" className="btn-outline-light text-center">Зарегистрироваться</Link>
          </div>

          {/* FAQ */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="font-display text-4xl md:text-5xl text-cream uppercase tracking-tight leading-[0.9] mb-12">
              Частые <span className="text-primary italic">вопросы</span>
            </h2>

            <div className="space-y-0">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-cream/10">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <h3 className="font-display text-base md:text-lg font-light text-cream group-hover:text-primary transition-colors pr-4">
                      {faq.q}
                    </h3>
                    <ChevronDown className={`w-4 h-4 text-cream/40 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180 text-primary" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40 pb-5" : "max-h-0"}`}>
                    <p className="font-body text-sm text-cream/50 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorks;
