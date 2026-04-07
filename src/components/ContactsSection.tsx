import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Send, Phone, HeartHandshake, MapPinned, Wand2, Sparkles } from "lucide-react";

const contacts = [
  { role: "Организация", name: "Александра", phone: "8 (962) 364-66-46", tg: "@alexa_auction" },
  { role: "Партнёры и спонсоры", name: "Гизела", phone: "8 (985) 809-53-70", tg: "@gisela_events" },
];

const ContactsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contacts" className="py-24 md:py-32 section-padding bg-background relative">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
              Свяжитесь с нами
            </p>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-light tracking-tight text-foreground leading-[0.9]">
            Контакты
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto mb-16">
          {contacts.map((c, i) => (
            <motion.div
              key={c.tg}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * i }}
              className="group relative text-center p-8 md:p-10 bg-card border border-border rounded-lg hover:border-primary/20 hover:shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.1)] hover:-translate-y-1 transition-all duration-500"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-body mb-5">
                {c.role}
              </p>
              <p className="font-display text-2xl font-light text-foreground mb-4">{c.name}</p>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Phone className="w-3 h-3 text-muted-foreground" />
                <p className="font-body text-sm text-muted-foreground">{c.phone}</p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Send className="w-3 h-3 text-primary" />
                <p className="font-body text-sm text-foreground font-medium">{c.tg}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center gap-8 md:gap-12 mb-12"
        >
          <div className="flex items-center gap-2.5">
            <HeartHandshake className="w-4 h-4 text-primary" strokeWidth={1.2} />
            <span className="font-body text-sm text-foreground/80 italic">две подруги</span>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPinned className="w-4 h-4 text-primary" strokeWidth={1.2} />
            <span className="font-body text-sm text-foreground/80 italic">два города</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Wand2 className="w-4 h-4 text-primary" strokeWidth={1.2} />
            <span className="font-body text-sm text-foreground/80 italic">два формата</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Sparkles className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
            <p className="font-body text-sm">
              Одна цель – сбор средств в поддержку фонда{" "}
              <a href="https://nenaprasno.ru/" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">«Не напрасно»</a>
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#" className="btn-primary text-center">
            Стать партнёром
          </a>
          <a href="#" className="btn-outline text-center">
            Задать вопрос
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactsSection;
