import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// Static lot images for preview
import lotDinner from "@/assets/lot-dinner-sitnikov.jpg";
import lotBiohacking from "@/assets/lot-biohacking-one.jpg";
import lotReels from "@/assets/lot-reels-sobolev.jpg";
import lotWatch from "@/assets/lot-watch-ballet.jpg";
import lotHockey from "@/assets/lot-hockey-belov.jpg";
import lotBallet from "@/assets/lot-ballet-lopatkina.jpg";
import lotEmelianenko from "@/assets/lot-emelianenko.jpg";

const staticLots = [
  { id: "static-1", title: "Обед с Алексеем Ситниковым", description: "Эксклюзивный обед с единственным в мире четырёхкратным доктором наук, автором с аудиторией 2 млн на YouTube", starting_price: 100000, category: "Встреча", image: lotDinner },
  { id: "static-2", title: "Биохакинг-центр ONE + Мария Грудина", description: "Несколько часов в биохакинг-центре ONE и встреча с идеологом курорта «Первая Линия» в Санкт-Петербурге", starting_price: 100000, category: "Биохакинг", image: lotBiohacking },
  { id: "static-3", title: "Рилс с Ильёй Соболевым", description: "Встреча и запись совместного рилс со стендап-комиком и шоуменом с аудиторией 1,5 млн подписчиков", starting_price: 100000, category: "Контент", image: lotReels },
  { id: "static-4", title: "Часы «Балет» Чугунова", description: "Коллекционные часы «Балет» от мастера Чугунова – лучшие российские часы 2025 года", starting_price: 250000, category: "Коллекция", image: lotWatch },
  { id: "static-5", title: "Обед или хоккей с Антоном Беловым", description: "Обед или хоккейная тренировка с чемпионом мира 2014, двукратным обладателем Кубка Гагарина", starting_price: 100000, category: "Спорт", image: lotHockey },
  { id: "static-6", title: "Обед или балет с Ульяной Лопаткиной", description: "Обед или балетная тренировка с легендарной примой-балериной Мариинского театра", starting_price: 100000, category: "Искусство", image: lotBallet },
  { id: "static-7", title: "Футболка Емельяненко с автографом", description: "Футболка с автографом легендарного бойца ММА, четырёхкратного чемпиона мира", starting_price: 50000, category: "Коллекция", image: lotEmelianenko },
];

type Lot = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  starting_price: number;
  category: string | null;
  status: string;
  end_at: string | null;
};

const getImageUrl = (url: string | null) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  const { data } = supabase.storage.from("lot-images").getPublicUrl(url);
  return data.publicUrl;
};

const LotsPreviewSection = () => {
  const [dbLots, setDbLots] = useState<Lot[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchLots = async () => {
      const { data } = await supabase
        .from("lots")
        .select("id, title, description, image_url, starting_price, category, status, end_at")
        .eq("status", "active")
        .order("sort_order")
        .limit(7);
      if (data && data.length > 0) setDbLots(data as Lot[]);
      setLoaded(true);
    };
    fetchLots();
  }, []);

  // Use DB lots if available, otherwise show static preview
  const useStatic = loaded && dbLots.length === 0;
  const displayLots = useStatic
    ? staticLots.map(l => ({ ...l, image_url: null, status: "active", end_at: null }))
    : dbLots;
  const staticImages = Object.fromEntries(staticLots.map(l => [l.id, l.image]));

  // Fallback images for DB lots by sort order
  const fallbackImages = [lotDinner, lotBiohacking, lotReels, lotWatch, lotHockey, lotBallet, lotEmelianenko];

  if (!loaded) return null;

  return (
    <section id="lots-preview" className="relative z-20 py-24 md:py-32 bg-background">
      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20 flex flex-col items-center text-center gap-6"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
                Варианты лотов
              </p>
              <div className="w-8 h-px bg-primary" />
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-normal uppercase tracking-tight text-foreground leading-[0.9] mb-6">
              Лоты <span className="text-primary italic">аукциона</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Мы предлагаем лоты в направлениях:{" "}
              <Link to="/lots?cat=Нейрогастрономия" className="text-primary hover:underline">нейрогастрономия</Link>,{" "}
              <Link to="/lots?cat=Биохакинг" className="text-primary hover:underline">биохакинг и велнес</Link>,{" "}
              <Link to="/lots?cat=Ретрит" className="text-primary hover:underline">ретрит и восстановление</Link>,{" "}
              <Link to="/lots?cat=Встреча" className="text-primary hover:underline">развитие и вдохновение</Link>.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/lots" className="btn-outline inline-flex items-center gap-2">
              Все лоты <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/#tickets" className="btn-primary inline-flex items-center gap-2">
              Зарегистрироваться
            </Link>
          </div>
      </div>

      <div className="section-padding">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {displayLots.map((lot, i) => {
            const imgUrl = useStatic
              ? staticImages[lot.id]
              : (getImageUrl((lot as Lot).image_url) || fallbackImages[i]);

            return (
              <motion.div
                key={lot.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.06 * i }}
              >
                <Link
                  to={useStatic ? "/lots" : `/lots/${lot.id}`}
                  className="group block bg-card border border-border hover:border-primary/30 transition-all duration-500 overflow-hidden relative rounded-lg"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={lot.title}
                        loading="lazy"
                        width={1024}
                        height={768}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground/30 font-display text-2xl">Лот</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-warm-black/70 via-transparent to-transparent" />
                  </div>
                  <div className="p-4">
                    {(lot.category || i === 0) && (
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        {lot.category && (
                          <div className="bg-gradient-to-r from-primary/15 to-primary/5 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/20">
                            <span className="text-primary text-[9px] uppercase tracking-[0.15em] font-body font-semibold">{lot.category}</span>
                          </div>
                        )}
                        {i === 0 && (
                          <div className="bg-accent/15 px-2.5 py-1 text-accent flex items-center gap-1">
                            <Flame className="w-3 h-3" />
                            <span className="text-[9px] uppercase tracking-wider font-body font-medium">Хит</span>
                          </div>
                        )}
                      </div>
                    )}
                    <h3 className="font-display text-sm text-foreground mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-1">{lot.title}</h3>
                    {lot.description && (
                      <p className="font-body text-[11px] text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{lot.description}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground/60 font-body">Старт</p>
                        <p className="font-numbers text-base text-foreground font-light">{lot.starting_price.toLocaleString("ru-RU")} ₽</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LotsPreviewSection;
