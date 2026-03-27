import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Gem, Wine, Plane, Camera } from "lucide-react";

const themes = [
  {
    icon: Palette,
    num: "01",
    title: "Современное искусство",
    desc: "Работы признанных художников и молодых талантов. Живопись, графика, скульптура.",
    accent: true,
  },
  {
    icon: Gem,
    num: "02",
    title: "Ювелирное искусство",
    desc: "Авторские украшения от ведущих ювелирных домов и независимых мастеров.",
    accent: false,
  },
  {
    icon: Wine,
    num: "03",
    title: "Коллекционные вина",
    desc: "Редкие и выдержанные вина из частных коллекций и лучших виноделен мира.",
    accent: false,
  },
  {
    icon: Plane,
    num: "04",
    title: "Эксклюзивные впечатления",
    desc: "Уникальные путешествия, частные ужины с шеф-поварами, закрытые мероприятия.",
    accent: false,
  },
  {
    icon: Camera,
    num: "05",
    title: "Фотография и медиа-арт",
    desc: "Авторские фотографии, цифровое искусство и лимитированные принты.",
    accent: false,
  },
];

const ThemesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="themes" className="py-24 md:py-32 section-padding bg-background">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
                Категории
              </p>
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-light tracking-tight text-foreground leading-[0.9]">
              Темы <span className="italic text-primary">аукциона</span>
            </h2>
          </div>
          <p className="font-body text-sm text-muted-foreground max-w-sm font-light">
            Пять категорий лотов — от живописи до уникальных впечатлений
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {themes.map((theme, i) => (
            <motion.div
              key={theme.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12 * i }}
              className={`group relative p-8 md:p-10 border transition-all duration-500 overflow-hidden cursor-pointer ${
                theme.accent
                  ? "md:row-span-2 bg-primary text-primary-foreground border-primary hover:shadow-[var(--shadow-editorial)]"
                  : "bg-card border-border hover:border-primary/30 hover:shadow-[var(--shadow-hover)]"
              }`}
            >
              <span className={`absolute top-4 right-6 font-numbers text-7xl md:text-8xl font-light leading-none transition-opacity duration-500 ${
                theme.accent ? "text-primary-foreground/10" : "text-foreground/5"
              }`}>
                {theme.num}
              </span>

              <div className="relative z-10">
                <theme.icon className={`w-7 h-7 mb-6 transition-transform duration-500 group-hover:scale-110 ${
                  theme.accent ? "text-primary-foreground/80" : "text-primary"
                }`} />
                <h3 className={`font-display text-xl md:text-2xl font-medium mb-4 ${
                  theme.accent ? "text-primary-foreground" : "text-foreground"
                }`}>
                  {theme.title}
                </h3>
                <p className={`font-body text-sm font-light leading-relaxed ${
                  theme.accent ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  {theme.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThemesSection;
