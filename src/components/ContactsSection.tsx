import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const contacts = [
  { role: "Спонсоры и СМИ", name: "Анна", phone: "8 (917) 152-76-77", tg: "@mi_ella23" },
  { role: "Партнёры", name: "Жизель", phone: "8 (985) 809-53-70", tg: "@jiselle_tolts" },
  { role: "Спикеры", name: "Александра", phone: "8 (962) 364-66-46", tg: "@alexa_ah_alexa" },
];

const ContactsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contacts" className="py-24 md:py-32 section-padding bg-background">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 font-body">
            Свяжитесь с нами
          </p>
          <h2 className="editorial-heading text-foreground">
            Контакты
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contacts.map((c, i) => (
            <motion.div
              key={c.tg}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="text-center p-8 border border-border"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-body mb-4">
                {c.role}
              </p>
              <p className="font-display text-xl font-medium text-foreground mb-2">{c.name}</p>
              <p className="font-body text-sm text-muted-foreground mb-1">{c.phone}</p>
              <p className="font-body text-sm text-primary">{c.tg}</p>
            </motion.div>
          ))}
        </div>

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
