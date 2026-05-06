import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Banknote, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import lotDinner from "@/assets/lot-dinner-sitnikov.jpg";
import lotBiohacking from "@/assets/lot-biohacking-one.jpg";
import lotReels from "@/assets/lot-reels-sobolev.jpg";
import lotWatch from "@/assets/lot-watch-ballet.jpg";
import lotHockey from "@/assets/lot-hockey-belov.jpg";
import lotBallet from "@/assets/lot-ballet-lopatkina.jpg";
import lotEmelianenko from "@/assets/lot-emelianenko.jpg";
import lotSmartlife from "@/assets/lot-smartlife.png";
import lotBurunov from "@/assets/lot-burunov-tea.jpg";
import lotShnurov from "@/assets/lot-shnurov.jpg";
import lotListovets from "@/assets/lot-listovets.jpg";

const fallbackImages = [lotDinner, lotBiohacking, lotReels, lotWatch, lotHockey, lotBallet, lotEmelianenko, lotSmartlife];

// Keys here must match suffix of url paths used in DB
const localAssets: Record<string, string> = {
  "lot-burunov-tea.jpg": lotBurunov,
  "lot-shnurov.jpg": lotShnurov,
  "lot-listovets.jpg": lotListovets,
};

type ArchiveItem = { price: number; paid: boolean };

type Lot = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  preview_image_url: string | null;
  starting_price: number;
  category: string | null;
  status: string;
  end_at: string | null;
  bid_step: number;
  archive_date: string | null;
  archive_results: ArchiveItem[] | null;
};

const formatMoney = (n: number) => {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return (m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)) + " млн ₽";
  }
  if (n >= 1_000) return Math.round(n / 1_000).toLocaleString("ru-RU") + " тыс ₽";
  return n.toLocaleString("ru-RU") + " ₽";
};

const getImageUrl = (url: string | null) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  // Local asset reference like "/src/assets/foo.jpg"
  const fname = url.split("/").pop() ?? "";
  if (localAssets[fname]) return localAssets[fname];
  // Else assume Supabase storage path
  const { data } = supabase.storage.from("lot-images").getPublicUrl(url, {
    transform: { width: 600, height: 450, resize: "cover", quality: 75 },
  });
  return data.publicUrl;
};

const categories = [
  { label: "Развитие и вдохновение", filter: "развитие" },
  { label: "Биохакинг и велнесс", filter: "биохакинг" },
  { label: "Искусство и коллекция", filter: "искусство" },
  { label: "Хобби", filter: "хобби" },
  { label: "Ретрит и восстановление", filter: "ретрит" },
];

const Lots = () => {
  const [lots, setLots] = useState<Lot[]>([]);
  const [maxBids, setMaxBids] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: lotsData } = await supabase
        .from("lots")
        .select("id, title, description, image_url, preview_image_url, starting_price, category, status, end_at, bid_step, archive_date, archive_results")
        .order("sort_order");

      if (lotsData) {
        setLots(lotsData as Lot[]);
        const ids = (lotsData as Lot[]).map((l) => l.id);
        if (ids.length > 0) {
          const { data: bidsData } = await supabase
            .from("bids")
            .select("lot_id, amount")
            .in("lot_id", ids)
            .order("amount", { ascending: false });
          if (bidsData) {
            const map: Record<string, number> = {};
            bidsData.forEach((b: any) => {
              if (!map[b.lot_id] || b.amount > map[b.lot_id]) map[b.lot_id] = b.amount;
            });
            setMaxBids(map);
          }
        }
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const archiveLots = useMemo(() => lots.filter((l) => !!l.archive_date), [lots]);
  const activeLots = useMemo(() => lots.filter((l) => !l.archive_date), [lots]);

  const archiveStats = useMemo(() => {
    let count = 0;
    let total = 0;
    let paid = 0;
    archiveLots.forEach((l) => {
      const arr = Array.isArray(l.archive_results) ? l.archive_results : [];
      arr.forEach((r) => {
        count += 1;
        total += r.price;
        if (r.paid) paid += r.price;
      });
    });
    return { count, total, paid };
  }, [archiveLots]);

  const filterByCategory = <T extends Lot>(arr: T[]) =>
    activeFilter ? arr.filter((l) => l.category?.toLowerCase().includes(activeFilter)) : arr;

  const renderActiveCard = (lot: Lot, i: number) => {
    const imgUrl = getImageUrl(lot.preview_image_url) || getImageUrl(lot.image_url) || fallbackImages[i % fallbackImages.length];
    const currentPrice = maxBids[lot.id] || lot.starting_price;
    return (
      <motion.div
        key={lot.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 * i }}
      >
        <Link
          to={`/lots/${lot.id}`}
          className="group block bg-card border border-border hover:border-primary/40 transition-all duration-500 overflow-hidden rounded-lg"
        >
          <div className="aspect-[4/3] relative overflow-hidden">
            {imgUrl && (
              <img
                src={imgUrl}
                alt={lot.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            {lot.category && (
              <div className="absolute bottom-3 left-3 bg-gradient-to-r from-primary/90 to-primary/60 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg shadow-primary/20 border border-primary/20">
                <span className="text-primary-foreground text-[10px] uppercase tracking-[0.2em] font-body font-medium drop-shadow-sm">{lot.category}</span>
              </div>
            )}
          </div>
          <div className="p-5">
            <h3 className="font-display text-base text-foreground mb-1 group-hover:text-primary transition-colors duration-300">{lot.title}</h3>
            {lot.description && (
              <p className="font-body text-xs text-muted-foreground mb-4 line-clamp-2">{lot.description}</p>
            )}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-body">
                  {maxBids[lot.id] ? "Текущая цена" : "Старт"}
                </p>
                <p className="font-numbers text-lg font-light text-foreground">{currentPrice.toLocaleString("ru-RU")} ₽</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors duration-300" />
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  const renderArchiveCard = (lot: Lot, i: number) => {
    const imgUrl = getImageUrl(lot.preview_image_url) || getImageUrl(lot.image_url) || fallbackImages[i % fallbackImages.length];
    const results = Array.isArray(lot.archive_results) ? lot.archive_results : [];
    const sold = results.length > 0;
    const totalPrice = results.reduce((s, r) => s + r.price, 0);
    const hasUnpaid = results.some((r) => !r.paid);

    return (
      <motion.div
        key={lot.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 * i }}
      >
        <Link
          to={`/lots/${lot.id}`}
          className="group block bg-card border border-border hover:border-primary/30 transition-all duration-500 overflow-hidden rounded-lg relative"
        >
          <div className="aspect-[4/3] relative overflow-hidden">
            {imgUrl && (
              <img
                src={imgUrl}
                alt={lot.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: "grayscale(35%) brightness(0.55)" }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Бейдж цены / не продан */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
              {sold ? (
                <div className="bg-primary text-primary-foreground px-5 py-3 rounded-md shadow-2xl shadow-black/50 border border-primary-foreground/20 text-center backdrop-blur-sm">
                  <p className="text-[9px] uppercase tracking-[0.3em] font-body mb-1 opacity-80">
                    {results.length > 1 ? `Продано ×${results.length}` : "Продано"}
                  </p>
                  <p className="font-numbers text-2xl md:text-3xl font-light leading-none">{formatMoney(totalPrice)}</p>
                </div>
              ) : (
                <div className="bg-foreground/90 text-background px-5 py-3 rounded-md shadow-xl border border-foreground/30 text-center">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-body">Лот не продан</p>
                </div>
              )}
            </div>

            {/* Не оплачено */}
            {sold && hasUnpaid && (
              <div className="absolute top-3 right-3 bg-destructive/90 text-destructive-foreground px-3 py-1 rounded-sm shadow-lg backdrop-blur-sm">
                <span className="text-[9px] uppercase tracking-[0.2em] font-body font-semibold">Есть неоплаченные</span>
              </div>
            )}
            {lot.category && (
              <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-border">
                <span className="text-foreground text-[9px] uppercase tracking-[0.2em] font-body font-medium">{lot.category}</span>
              </div>
            )}
          </div>
          <div className="p-5">
            <h3 className="font-display text-base text-foreground mb-1 group-hover:text-primary transition-colors duration-300">{lot.title}</h3>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60 font-body">
              Аукцион 26 апреля 2026
            </p>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-28 pb-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-10"
          >
            <h1 className="font-display text-5xl md:text-7xl text-foreground uppercase tracking-tight leading-[0.9] mb-4">
              Лоты <span className="text-primary italic">аукциона</span>
            </h1>
            <p className="font-body text-muted-foreground text-base max-w-2xl">
              Все средства, вырученные с аукциона и продажи билетов, направляются в поддержку фонда «Не напрасно».
            </p>
          </motion.div>

          {/* Сводка по архиву */}
          {archiveStats.count > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid sm:grid-cols-3 gap-3 mb-12"
            >
              <div className="bg-card border border-border p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-primary" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body">Продано</p>
                </div>
                <p className="font-numbers text-3xl font-light text-foreground">{archiveStats.count} <span className="text-sm text-muted-foreground">лотов</span></p>
              </div>
              <div className="bg-card border border-border p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Banknote className="w-4 h-4 text-primary" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body">Сумма продаж</p>
                </div>
                <p className="font-numbers text-3xl font-light text-foreground">{formatMoney(archiveStats.total)}</p>
              </div>
              <div className="bg-card border border-primary/40 p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Banknote className="w-4 h-4 text-primary" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-body">Поступило в фонд</p>
                </div>
                <p className="font-numbers text-3xl font-light text-primary">{formatMoney(archiveStats.paid)}</p>
              </div>
            </motion.div>
          )}

          {/* Фильтр категорий */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveFilter(null)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-body transition-all duration-300 border ${
                activeFilter === null
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              Все
            </button>
            {categories.map((cat) => (
              <button
                key={cat.filter}
                onClick={() => setActiveFilter(activeFilter === cat.filter ? null : cat.filter)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-body transition-all duration-300 border ${
                  activeFilter === cat.filter
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-muted-foreground font-body text-center py-20">Загрузка лотов…</div>
          ) : (
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="mb-8 bg-card border border-border">
                <TabsTrigger value="active" className="text-xs uppercase tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Актуальные ({filterByCategory(activeLots).length})
                </TabsTrigger>
                <TabsTrigger value="archive" className="text-xs uppercase tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Архив 26 апреля ({filterByCategory(archiveLots).length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active">
                {filterByCategory(activeLots).length === 0 ? (
                  <div className="text-muted-foreground font-body text-center py-20">Нет лотов в этой категории</div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filterByCategory(activeLots).map(renderActiveCard)}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="archive">
                {filterByCategory(archiveLots).length === 0 ? (
                  <div className="text-muted-foreground font-body text-center py-20">Нет лотов в этой категории</div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filterByCategory(archiveLots).map(renderArchiveCard)}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Lots;
