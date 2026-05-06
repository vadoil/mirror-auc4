import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Prize = {
  id: string;
  title: string;
  partner: string | null;
  winner_ticket: string | null;
};

const PrizesSection = () => {
  const [prizes, setPrizes] = useState<Prize[]>([]);

  useEffect(() => {
    supabase
      .from("auction_prizes")
      .select("id, title, partner, winner_ticket")
      .order("sort_order")
      .then(({ data }) => setPrizes((data as Prize[]) ?? []));
  }, []);

  if (prizes.length === 0) return null;

  return (
    <section className="relative z-10 py-20 md:py-24 section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
              Подарки гостям
            </p>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight text-foreground leading-[0.95]">
            Разыграно <span className="italic text-primary">партнёрами</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-xl mx-auto mt-4">
            Победители определены генератором случайных чисел среди номеров, зарегистрированных на аукцион.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {prizes.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="group relative overflow-hidden border border-border bg-card hover:border-primary/30 transition-colors p-6 rounded-lg"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              <Gift className="w-7 h-7 text-primary mb-4 relative" />
              <h3 className="font-display text-lg text-foreground mb-2 leading-snug relative">{p.title}</h3>
              {p.partner && (
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-body relative">
                  от {p.partner}
                </p>
              )}
              {p.winner_ticket && (
                <p className="font-numbers text-sm text-primary mt-3 relative">
                  Билет №{p.winner_ticket}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;
