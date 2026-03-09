import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const items = [
  {
    title: "Кризис идентичности",
    text: "Социальные сети создали иллюзию, что все вокруг успешны, счастливы и идеальны. Женщина смотрит в зеркало — и видит разрыв между «как надо» и «как есть».",
  },
  {
    title: "Ловушка «сильной женщины»",
    text: "Культура продвигает образ, который может всё: строить карьеру, воспитывать детей, выглядеть идеально. Но никто не говорит — какой ценой.",
  },
  {
    title: "Дефицит глубины",
    text: "Контента — море, курсов — тысячи. Но где искать истину и смыслы — не ясно. Мы предлагаем посвятить один день себе.",
  },
  {
    title: "Потребность в заботе",
    text: "Мы бережём время современных женщин и собираем лучшие рекомендации в основных направлениях: здоровье, красота, эмоциональное состояние.",
  },
];

const RelevanceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
      <div ref={ref} className="section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/50 mb-6 font-body">
            Актуальность
          </p>
          <h2 className="editorial-heading text-primary-foreground">
            Почему
            <br />
            <span className="italic">сейчас?</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="border-t border-primary-foreground/20 pt-8"
            >
              <h3 className="font-display text-2xl md:text-3xl font-light mb-4">
                {item.title}
              </h3>
              <p className="font-body text-sm md:text-base font-light leading-relaxed text-primary-foreground/70">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelevanceSection;
