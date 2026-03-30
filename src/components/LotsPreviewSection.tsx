import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// Static lot images for preview
import lotRetreat from "@/assets/lot-retreat-villa.jpg";
import lotCryo from "@/assets/lot-cryo-new.jpg";
import lotDetox from "@/assets/lot-detox-new.jpg";
import lotNeuro from "@/assets/lot-neuro-new.jpg";
import lotMeditation from "@/assets/lot-meditation.jpg";
import lotFitness from "@/assets/lot-fitness.jpg";
import lotSpa from "@/assets/lot-spa.jpg";
import lotGenetics from "@/assets/lot-genetics.jpg";

const staticLots = [
  { id: "static-1", title: "Ретрит на вилле", description: "7 дней в luxury wellness-вилле с панорамным видом, программой восстановления и персональным коучем", starting_price: 250000, category: "Ретрит", image: lotRetreat },
  { id: "static-2", title: "Криотерапия Premium", description: "Курс из 20 сеансов криотерапии в ведущей клинике Москвы с диагностикой и контролем врача", starting_price: 150000, category: "Биохакинг", image: lotCryo },
  { id: "static-3", title: "Детокс-программа", description: "30-дневная программа питания с персональным нутрициологом и доставкой суперфудов", starting_price: 120000, category: "Питание", image: lotDetox },
  { id: "static-4", title: "Нейротренинг", description: "Курс нейрофидбэка с ведущими специалистами: 10 сеансов тренировки мозга", starting_price: 180000, category: "Нейро", image: lotNeuro },
  { id: "static-5", title: "Медитативный ретрит", description: "5 дней молчания и медитации на Бали в уединённом ретрит-центре с мастером", starting_price: 200000, category: "Осознанность", image: lotMeditation },
  { id: "static-6", title: "Персональный тренинг", description: "3 месяца тренировок с элитным тренером: трансформация тела и привычек", starting_price: 100000, category: "Фитнес", image: lotFitness },
  { id: "static-7", title: "SPA-день мечты", description: "Полный день в premium SPA: массаж, обёртывания, стоун-терапия, ароматерапия", starting_price: 80000, category: "Релакс", image: lotSpa },
  { id: "static-8", title: "Wellness-комплект", description: "Премиальный набор нутрицевтиков и суплементов на 6 месяцев с консультацией эксперта", starting_price: 90000, category: "Здоровье", image: lotGenetics },
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
        .limit(8);
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

  if (!loaded) return null;

  return (
    <section id="lots-preview" className="relative z-20 py-24 md:py-32 bg-warm-black">
      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/40 font-body">
                Каталог
              </p>
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-normal uppercase tracking-tight text-cream leading-[0.9]">
              Лоты <span className="text-primary italic">аукциона</span>
            </h2>
          </div>
          <Link to="/lots" className="btn-outline-light inline-flex items-center gap-2 self-start md:self-auto">
            Все лоты <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      <div className="section-padding">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {displayLots.map((lot, i) => {
            const imgUrl = useStatic
              ? staticImages[lot.id]
              : getImageUrl((lot as Lot).image_url);

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
                  className="group block bg-cream/5 border border-cream/10 hover:border-primary/30 transition-all duration-500 overflow-hidden relative"
                >
                  {/* Hot badge on first lot */}
                  {i === 0 && (
                    <div className="absolute top-2 right-2 z-10 bg-accent text-accent-foreground px-2 py-1 flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      <span className="text-[9px] uppercase tracking-wider font-body font-medium">Хит</span>
                    </div>
                  )}

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
                      <div className="absolute inset-0 bg-cream/5 flex items-center justify-center">
                        <span className="text-cream/20 font-display text-2xl">Лот</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-warm-black/70 via-transparent to-transparent" />
                    {lot.category && (
                      <div className="absolute top-2 left-2 bg-primary/90 px-2 py-0.5">
                        <span className="text-primary-foreground text-[9px] uppercase tracking-[0.15em] font-body">{lot.category}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-sm text-cream mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-1">{lot.title}</h3>
                    {lot.description && (
                      <p className="font-body text-[11px] text-cream/40 mb-3 line-clamp-2 leading-relaxed">{lot.description}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.15em] text-cream/30 font-body">Старт</p>
                        <p className="font-numbers text-base text-cream font-light">{lot.starting_price.toLocaleString("ru-RU")} ₽</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-cream/20 group-hover:text-primary transition-colors duration-300" />
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
