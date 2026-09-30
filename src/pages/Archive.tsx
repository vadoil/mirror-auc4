import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import spbHero from "@/assets/upcoming-spb-hero.webp";
import moscowHero from "@/assets/gallery/event/event-11.webp";

const events = [
  {
    city: "Санкт-Петербург",
    date: "13 августа 2026",
    place: "Центр «Зрение»",
    title: "Искусство видеть главное",
    text: "Разговор с онкологом, аукцион работ Алексея Сергиенко, Андрея Бартенева и Дмитрия Абросимова, экспресс-диагностика зрения.",
    href: "/archive/spb",
    image: spbHero,
  },
  {
    city: "Москва",
    date: "26 апреля 2026",
    place: "Balance Hall «Место быть»",
    title: "Забота о себе и о других",
    text: "Лекция о долголетии, аукцион оздоровительных программ и эксклюзивного опыта, ведущий вечера — Александр Цыпкин.",
    href: "/archive/moscow",
    image: moscowHero,
  },
];

const Archive = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-28 pb-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <p className="font-body text-muted-foreground/60 text-xs uppercase tracking-[0.3em] mb-4">
              Благотворительные аукционы · 2026
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-foreground uppercase tracking-tight leading-[0.9] mb-6">
              Архив <span className="text-primary italic">вечеров</span>
            </h1>
            <p className="font-body text-muted-foreground text-base max-w-2xl">
              Все аукционы «Отражения добра»: как они прошли, кто был с нами и сколько удалось
              собрать для фонда «Не напрасно».
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {events.map((e, i) => (
              <motion.div
                key={e.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
              >
                <Link
                  to={e.href}
                  className="group block h-full bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-colors"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-muted/20">
                    <img
                      src={e.image}
                      alt={`${e.city}, ${e.date}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3 text-xs text-muted-foreground font-body">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary" /> {e.city}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" /> {e.date}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl text-foreground uppercase tracking-tight leading-tight mb-1">
                      {e.title}
                    </h2>
                    <p className="font-body text-xs text-primary uppercase tracking-[0.15em] mb-4">{e.place}</p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">{e.text}</p>
                    <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-primary font-body">
                      Как это было <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Archive;
