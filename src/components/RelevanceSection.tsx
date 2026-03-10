import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const items = [
  {
    num: "01",
    title: "Кризис идентичности",
    text: "Социальные сети создали иллюзию, что все вокруг успешны. Женщина смотрит в зеркало — и видит разрыв между «как надо» и «как есть».",
  },
  {
    num: "02",
    title: "Ловушка «сильной женщины»",
    text: "Культура продвигает образ, который может всё: строить карьеру, воспитывать детей, выглядеть идеально. Но никто не говорит — какой ценой.",
  },
  {
    num: "03",
    title: "Дефицит глубины",
    text: "Контента — море, курсов — тысячи. Но где искать истину и смыслы — не ясно. Мы предлагаем посвятить один день себе.",
  },
  {
    num: "04",
    title: "Потребность в заботе",
    text: "Мы бережём время современных женщин и собираем лучшие рекомендации: здоровье, красота, эмоциональное состояние.",
  },
];

const RelevanceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      {/* Dark dramatic background */}
      <div className="absolute inset-0 bg-charcoal" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent" />

      <div ref={ref} className="relative z-10 section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-28 max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/40 font-body">
              Актуальность
            </p>
          </div>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-cream tracking-tight leading-[0.9]">
            Почему
            <br />
            <span className="italic text-primary">именно сейчас?</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
          {items.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className="group py-10 border-t border-cream/10 hover:border-primary/40 transition-colors duration-500"
            >
              <div className="flex items-start gap-6">
                <span className="font-numbers text-5xl md:text-6xl font-light text-cream/10 group-hover:text-primary/30 transition-colors duration-500 leading-none">
                  {item.num}
                </span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-light text-cream mb-3 group-hover:text-primary transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm font-light leading-relaxed text-cream/50">
                    {item.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelevanceSection;
