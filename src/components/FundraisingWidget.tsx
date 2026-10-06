import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import { Heart, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Плавающий блок «Сколько собрали» — на всех страницах, кроме админки.
// Цифры: rpc fundraising_progress (цель и «собрано вне сайта» — в таблице fundraising_settings).

const STORAGE_KEY = "fundraising-widget-collapsed";

const formatMln = (n: number) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toLocaleString("ru-RU", { maximumFractionDigits: 2 })} млн ₽`
    : `${Math.round(n).toLocaleString("ru-RU")} ₽`;

const readCollapsed = () => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v !== null) return v === "1";
  } catch {
    /* хранилище недоступно — не страшно */
  }
  // на телефоне по умолчанию компактный вид
  return typeof window !== "undefined" && window.innerWidth < 768;
};

const ProgressRing = ({ percent }: { percent: number }) => {
  const r = 20;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 -rotate-90">
      <circle cx="24" cy="24" r={r} fill="none" stroke="currentColor" strokeWidth="3" className="text-primary/15" />
      <motion.circle
        cx="24"
        cy="24"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="text-primary"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c - (c * Math.min(percent, 100)) / 100 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
};

const FundraisingWidget = () => {
  const { pathname } = useLocation();
  const [data, setData] = useState<{ raised: number; goal: number } | null>(null);
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const counter = useMotionValue(0);
  const counterText = useTransform(counter, (v) => formatMln(v));

  useEffect(() => {
    supabase.rpc("fundraising_progress" as never).then(({ data: d }) => {
      const v = d as { raised?: number; goal?: number } | null;
      if (v?.goal) setData({ raised: Number(v.raised ?? 0), goal: Number(v.goal) });
    });
  }, []);

  useEffect(() => {
    if (!data || collapsed) return;
    const controls = animate(counter, data.raised, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [data, collapsed, counter]);

  const toggle = (value: boolean) => {
    setCollapsed(value);
    try {
      localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
    } catch {
      /* ничего */
    }
  };

  if (!data || pathname.startsWith("/admin")) return null;

  const percent = Math.round((data.raised / data.goal) * 1000) / 10;
  const left = Math.max(data.goal - data.raised, 0);

  return (
    <div className="fixed left-3 bottom-3 md:left-6 md:bottom-6 z-40 print:hidden">
      <AnimatePresence mode="wait" initial={false}>
        {collapsed ? (
          <motion.button
            key="badge"
            type="button"
            onClick={() => toggle(false)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            aria-label={`Собрано ${percent}% от цели. Подробнее`}
            className="group relative flex items-center gap-2 rounded-full bg-background/95 backdrop-blur border border-primary/20 shadow-lg pl-1 pr-4 py-1 hover:border-primary/50 transition-colors"
          >
            <span className="relative flex items-center justify-center">
              <ProgressRing percent={percent} />
              <Heart className="absolute w-4 h-4 text-primary fill-primary/20" />
            </span>
            <span className="text-left leading-tight">
              <span className="block font-numbers text-sm text-foreground">{percent.toLocaleString("ru-RU")}%</span>
              <span className="block font-body text-[10px] uppercase tracking-[0.15em] text-muted-foreground">цели 20 млн</span>
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35 }}
            className="relative w-[288px] rounded-2xl bg-background/95 backdrop-blur border border-primary/20 shadow-xl p-5"
          >
            <button
              type="button"
              onClick={() => toggle(true)}
              aria-label="Свернуть"
              className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="font-body text-[10px] uppercase tracking-[0.25em] text-primary mb-2 pr-6">
              Собрано на борьбу с онкологией
            </p>
            <motion.p className="font-numbers text-3xl text-foreground leading-none mb-1">{counterText}</motion.p>
            <p className="font-body text-xs text-muted-foreground mb-4">
              из {formatMln(data.goal)} · <span className="text-primary font-medium">{percent.toLocaleString("ru-RU")}%</span>
            </p>
            <div className="h-2 rounded-full bg-primary/10 overflow-hidden mb-2">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary/70 to-primary"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(percent, 100)}%` }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <p className="font-body text-[11px] text-muted-foreground mb-4">Осталось собрать {formatMln(left)}</p>
            <Link
              to="/archive/spb#donation"
              className="flex items-center justify-center gap-2 w-full rounded-full bg-primary text-primary-foreground py-2.5 text-xs uppercase tracking-[0.18em] font-body hover:opacity-90 transition-opacity"
            >
              <Heart className="w-3.5 h-3.5" /> Помочь фонду
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FundraisingWidget;
