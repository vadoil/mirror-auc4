import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getLotImageUrl, fallbackLotImages, LOTS_TENTATIVE_TIMING } from "@/lib/lotAssets";

type ArchiveResult = { paid: boolean; price: number };

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
  archive_results: ArchiveResult[] | null;
};

const getImageUrl = getLotImageUrl;

const categories = [
  { label: "Развитие и вдохновение", filter: "развитие" },
  { label: "Биохакинг и велнесс", filter: "биохакинг" },
  { label: "Искусство и коллекция", filter: "искусство" },
  { label: "Хобби", filter: "хобби" },
  { label: "Ретрит и восстановление", filter: "ретрит" },
];

const formatMoney = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;

const Lots = () => {
  const [allLots, setAllLots] = useState<Lot[]>([]);
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
        setAllLots(lotsData as unknown as Lot[]);
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

  const activeLots = allLots.filter((l) => !l.archive_date);
  const archivedLots = allLots.filter((l) => !!l.archive_date);

  const applyFilter = (list: Lot[]) =>
    activeFilter ? list.filter((l) => l.category?.toLowerCase().includes(activeFilter)) : list;

  const filteredActive = applyFilter(activeLots);
  const filteredArchive = applyFilter(archivedLots);

  // Архивная статистика
  const archiveStats = archivedLots.reduce(
    (acc, lot) => {
      const results = lot.archive_results ?? [];
      results.forEach((r) => {
        acc.total += r.price;
        if (r.paid) acc.paid += r.price;
      });
      return acc;
    },
    { total: 0, paid: 0 }
  );

  const renderActiveCard = (lot: Lot, i: number) => {
    const imgUrl = getImageUrl(lot.preview_image_url) || getImageUrl(lot.image_url) || fallbackLotImages[i % fallbackLotImages.length];
    const currentPrice = maxBids[lot.id] || lot.starting_price;
    const isTentative = LOTS_TENTATIVE_TIMING.has(lot.id);
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
            {isTentative && (
              <div className="absolute top-3 right-3 bg-amber-500/95 text-warm-black px-2.5 py-1 rounded-sm shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                <Clock className="w-3 h-3" />
                <span className="text-[9px] uppercase tracking-[0.18em] font-body font-bold">Уточняйте сроки</span>
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
                <p className="font-numbers text-lg font-light text-foreground">{formatMoney(currentPrice)}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors duration-300" />
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  const renderArchiveCard = (lot: Lot, i: number) => {
    const imgUrl = getImageUrl(lot.preview_image_url) || getImageUrl(lot.image_url) || fallbackLotImages[i % fallbackLotImages.length];
    const results = lot.archive_results ?? [];
    const sold = results.length > 0;
    const total = results.reduce((s, r) => s + r.price, 0);
    const hasUnpaid = results.some((r) => !r.paid);

    return (
      <motion.div
        key={lot.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.04 * i }}
        className="group block bg-card border border-border overflow-hidden rounded-lg"
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          {imgUrl && (
            <img
              src={imgUrl}
              alt={lot.title}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover ${sold ? "grayscale-[30%]" : "grayscale-[60%] opacity-70"}`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Статус-бейдж */}
          <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
            {sold ? (
              <div className="bg-primary text-primary-foreground px-3 py-1.5 rounded-sm shadow-lg">
                <span className="text-[10px] uppercase tracking-[0.25em] font-body font-semibold">
                  {results.length > 1 ? `Продано ×${results.length}` : "Продано"}
                </span>
              </div>
            ) : (
              <div className="bg-muted text-muted-foreground px-3 py-1.5 rounded-sm border border-border">
                <span className="text-[10px] uppercase tracking-[0.25em] font-body font-semibold">
                  Не продан
                </span>
              </div>
            )}
            {hasUnpaid && (
              <div className="bg-destructive/90 text-destructive-foreground px-2.5 py-1 rounded-sm">
                <span className="text-[9px] uppercase tracking-[0.2em] font-body font-medium">
                  Не оплачено
                </span>
              </div>
            )}
          </div>

          {lot.category && (
            <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border">
              <span className="text-foreground text-[10px] uppercase tracking-[0.2em] font-body">{lot.category}</span>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-display text-base text-foreground mb-2">{lot.title}</h3>
          {sold ? (
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-body">
                Финальная цена
              </p>
              <p className="font-numbers text-lg font-light text-primary">{formatMoney(total)}</p>
              {results.length > 1 && (
                <p className="font-body text-[10px] text-muted-foreground mt-1">
                  {results.map((r) => formatMoney(r.price)).join(" + ")}
                </p>
              )}
            </div>
          ) : (
            <p className="font-body text-xs text-muted-foreground">Лот не был продан на аукционе</p>
          )}
        </div>
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

          {loading ? (
            <div className="text-muted-foreground font-body text-center py-20">Загрузка лотов…</div>
          ) : (
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="mb-10 h-auto bg-transparent border-b border-border/60 rounded-none p-0 w-full justify-start gap-1">
                <TabsTrigger
                  value="active"
                  className="relative font-display text-sm md:text-base uppercase tracking-[0.18em] px-6 py-4 rounded-none bg-transparent text-muted-foreground border-b-2 border-transparent transition-all duration-300 hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-none"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 data-[state=active]:opacity-100 transition-opacity" />
                    Актуальные лоты
                    <span className="font-numbers text-[10px] tracking-normal bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {activeLots.length}
                    </span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="archive"
                  className="relative font-display text-sm md:text-base uppercase tracking-[0.18em] px-6 py-4 rounded-none bg-transparent text-muted-foreground border-b-2 border-transparent transition-all duration-300 hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-foreground data-[state=active]:shadow-none"
                >
                  <span className="flex items-center gap-2.5">
                    Аукцион 26 апреля
                    <span className="font-numbers text-[10px] tracking-normal bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                      {archivedLots.length}
                    </span>
                  </span>
                </TabsTrigger>
              </TabsList>

              {/* Фильтр категорий — общий */}
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

              <TabsContent value="active">
                {filteredActive.length === 0 ? (
                  <div className="text-muted-foreground font-body text-center py-20">
                    Нет лотов в этой категории
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredActive.map(renderActiveCard)}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="archive">
                {/* Сводка по архиву */}
                <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-card border border-border rounded-lg">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-body mb-2">
                      Лотов продано
                    </p>
                    <p className="font-numbers text-2xl font-light text-foreground">
                      {archivedLots.filter((l) => (l.archive_results ?? []).length > 0).length} из {archivedLots.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-body mb-2">
                      Сумма с молотка
                    </p>
                    <p className="font-numbers text-2xl font-light text-foreground">{formatMoney(archiveStats.total)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-body mb-2">
                      Перечислено в фонд
                    </p>
                    <p className="font-numbers text-2xl font-light text-primary">{formatMoney(archiveStats.paid)}</p>
                  </div>
                </div>

                {filteredArchive.length === 0 ? (
                  <div className="text-muted-foreground font-body text-center py-20">
                    Нет лотов в этой категории
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredArchive.map(renderArchiveCard)}
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
