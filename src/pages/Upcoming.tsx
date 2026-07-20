import { motion } from "framer-motion";
import { Calendar, MapPin, Sparkles, Gavel, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import spbHero from "@/assets/upcoming-spb-hero.jpg";

const Placeholder = ({
  icon: Icon,
  label,
  hint,
  aspect = "aspect-[4/3]",
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  hint: string;
  aspect?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`group relative ${aspect} overflow-hidden rounded-lg border border-border bg-muted/40 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.15)] transition-all duration-700`}
  >
    {/* subtle grid texture */}
    <div
      className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-700"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />
    {/* radial glow */}
    <div className="absolute -inset-1/3 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.08),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

    {/* corner ticks */}
    <span className="absolute top-4 left-4 w-3 h-3 border-l border-t border-primary/40" />
    <span className="absolute top-4 right-4 w-3 h-3 border-r border-t border-primary/40" />
    <span className="absolute bottom-4 left-4 w-3 h-3 border-l border-b border-primary/40" />
    <span className="absolute bottom-4 right-4 w-3 h-3 border-r border-b border-primary/40" />

    <div className="relative h-full w-full flex flex-col items-center justify-center text-center p-6">
      <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center mb-5 group-hover:border-primary/60 group-hover:bg-primary/5 transition-all duration-700">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <p className="font-display text-lg md:text-xl uppercase tracking-[0.2em] text-foreground/90 mb-2">
        {label}
      </p>
      <p className="font-body text-xs md:text-sm text-muted-foreground max-w-xs leading-relaxed">
        {hint}
      </p>
      <div className="mt-6 flex items-center gap-2">
        <span className="w-1 h-1 rounded-full bg-primary/60 animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-primary/70 font-body">
          скоро
        </span>
      </div>
    </div>
  </motion.div>
);

const Upcoming = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pb-24">
        {/* Hero */}
        <section className="relative min-h-[80svh] md:min-h-[92svh] flex items-end overflow-hidden mb-16 md:mb-24">
          <div className="absolute inset-0">
            <img
              src={spbHero}
              alt="Санкт-Петербург на закате"
              className="absolute inset-0 w-full h-full object-cover"
              width={1920}
              height={1280}
            />
            {/* только мягкое затемнение снизу для читаемости текста, без осветления фото */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/25 to-transparent" />
          </div>

          <div className="relative z-10 section-padding pb-16 md:pb-24 pt-28 w-full">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-primary" />
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-foreground/70 font-body">
                    Ближайший аукцион · Санкт-Петербург
                  </p>
                </div>

                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground uppercase tracking-tight leading-[0.9] mb-8">
                  Готовим <span className="text-primary italic">следующую</span>
                  <br /> встречу
                </h1>

                <p className="font-body text-foreground/80 text-base md:text-lg max-w-2xl leading-relaxed">
                  Мы собираем программу, площадку и лоты нового аукциона в Петербурге.
                  Здесь появится всё самое главное — дата, место, расписание вечера и первые лоты.
                </p>

                {/* meta strip */}
                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-px bg-border/60 rounded-lg overflow-hidden border border-border/60 backdrop-blur-sm">
                  {[
                    { icon: Calendar, label: "Дата", value: "уточняется" },
                    { icon: MapPin, label: "Город", value: "Санкт-Петербург" },
                    { icon: Clock, label: "Формат", value: "офлайн + онлайн" },
                  ].map((m, i) => (
                    <div key={i} className="bg-background/80 backdrop-blur-sm p-5 flex items-center gap-4">
                      <m.icon className="w-4 h-4 text-primary shrink-0" />
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground font-body mb-1">
                          {m.label}
                        </p>
                        <p className="font-display text-sm text-foreground uppercase tracking-wide">
                          {m.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* Программа */}
        <section className="section-padding mb-16 md:mb-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-px bg-primary" />
                  <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-body">
                    01 — Программа
                  </p>
                </div>
                <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight text-foreground leading-[0.95]">
                  Расписание <span className="italic text-primary">вечера</span>
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Placeholder icon={Clock} label="Сбор гостей" hint="Welcome-часть, знакомство, аперитив." delay={0} />
              <Placeholder icon={Sparkles} label="Public Talk" hint="Открытая беседа со спикерами вечера." delay={0.1} />
              <Placeholder icon={Gavel} label="Аукцион" hint="Главное действие — торги с аукционистом." delay={0.2} />
            </div>
          </div>
        </section>

        {/* Место */}
        <section className="section-padding mb-16 md:mb-24">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-primary" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-body">
                  02 — Место
                </p>
              </div>
              <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight text-foreground leading-[0.95]">
                Площадка <span className="italic text-primary">вечера</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Placeholder
                  icon={MapPin}
                  label="Площадка"
                  hint="Здесь появятся фотографии зала, адрес и панорама пространства."
                  aspect="aspect-[16/10]"
                />
              </div>
              <div className="grid grid-rows-2 gap-6">
                <Placeholder icon={Sparkles} label="Атмосфера" hint="Настроение вечера." aspect="aspect-auto h-full" delay={0.1} />
                <Placeholder icon={Calendar} label="Как добраться" hint="Метро, парковка, ориентиры." aspect="aspect-auto h-full" delay={0.2} />
              </div>
            </div>
          </div>
        </section>

        {/* Лоты */}
        <section className="section-padding">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-primary" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-body">
                  03 — Лоты
                </p>
              </div>
              <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight text-foreground leading-[0.95]">
                Первые <span className="italic text-primary">лоты</span>
              </h2>
              <p className="font-body text-sm text-muted-foreground mt-4 max-w-xl">
                Кураторская подборка появится ближе к дате аукциона. Средства идут в фонд «Не напрасно».
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <Placeholder
                  key={i}
                  icon={Gavel}
                  label={`Лот ${String(i + 1).padStart(2, "0")}`}
                  hint="Скоро откроем."
                  aspect="aspect-square"
                  delay={i * 0.05}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Upcoming;
