import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Award, Banknote, Gift, Sparkles } from "lucide-react";

type ArchiveItem = { price: number; paid: boolean };

const formatMoney = (n: number) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1).replace(".0", "") + " млн ₽";
  if (n >= 1_000) return Math.round(n / 1_000).toLocaleString("ru-RU") + " тыс ₽";
  return n.toLocaleString("ru-RU") + " ₽";
};

const AuctionResultsSection = () => {
  const [stats, setStats] = useState<{ soldCount: number; total: number; paidTotal: number; prizes: number } | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: lots } = await supabase
        .from("lots")
        .select("archive_results")
        .not("archive_date", "is", null);
      const { count: prizesCount } = await supabase
        .from("auction_prizes")
        .select("*", { count: "exact", head: true });

      let soldCount = 0;
      let total = 0;
      let paidTotal = 0;
      (lots ?? []).forEach((l: any) => {
        const arr: ArchiveItem[] = Array.isArray(l.archive_results) ? l.archive_results : [];
        arr.forEach((it) => {
          soldCount += 1;
          total += it.price;
          if (it.paid) paidTotal += it.price;
        });
      });

      setStats({ soldCount, total, paidTotal, prizes: prizesCount ?? 0 });
    };
    load();
  }, []);

  if (!stats) return null;

  const cards = [
    {
      icon: Award,
      label: "Продано лотов",
      value: stats.soldCount,
      sub: "26 апреля 2026",
    },
    {
      icon: Banknote,
      label: "Общая сумма продаж",
      value: formatMoney(stats.total),
      sub: "по итогам торгов",
    },
    {
      icon: Sparkles,
      label: "Поступило в фонд",
      value: formatMoney(stats.paidTotal),
      sub: "оплаченные лоты",
    },
    {
      icon: Gift,
      label: "Разыграно подарков",
      value: stats.prizes,
      sub: "от партнёров",
    },
  ];

  return (
    <section id="results" className="relative z-10 py-20 md:py-28 section-padding bg-card/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
              Итоги аукциона
            </p>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[0.95]">
            26 апреля <span className="italic text-primary">2026</span>
          </h2>
          <p className="font-body text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mt-5">
            Благодаря всем гостям и партнёрам аукцион «Отражение добра» стал событием — и реальной поддержкой для фонда «Не напрасно».
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="bg-background border border-border p-6 rounded-lg hover:border-primary/40 transition-colors"
            >
              <c.icon className="w-6 h-6 text-primary mb-4" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body mb-2">
                {c.label}
              </p>
              <p className="font-numbers text-3xl md:text-4xl font-light text-foreground leading-none mb-2">
                {c.value}
              </p>
              <p className="text-xs text-muted-foreground/70 font-body">{c.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuctionResultsSection;
