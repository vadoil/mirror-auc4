import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, GraduationCap, Globe, ExternalLink } from "lucide-react";

const BeneficiariesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 section-padding bg-background">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">Кому помогаем</p>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-light tracking-tight text-foreground leading-[0.9]">
            Фонд <span className="italic text-primary">«Не напрасно»</span>
          </h2>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-primary/5 border border-primary/20 rounded-lg p-8 md:p-12 mb-12 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-body mb-4">Миссия</p>
          <p className="font-display text-xl md:text-2xl font-light text-foreground leading-relaxed max-w-3xl mx-auto">
            Снижение смертности путём профилактики заболеваний, повышения качества лечения пациентов и образования талантливых врачей
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-muted/50 border border-border rounded-lg p-8 group hover:border-primary/30 hover:shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.12)] hover:-translate-y-1 transition-all duration-500"
          >
            <div className="w-12 h-12 border border-primary/30 rounded-full flex items-center justify-center mb-6 group-hover:border-primary/60 group-hover:bg-primary/5 transition-all duration-500">
              <Heart className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-500" />
            </div>
            <p className="font-numbers text-3xl text-primary font-light mb-2">15 лет</p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Фонд системно помогает людям с онкологическими заболеваниями и их близким, обучает врачей, создаёт IT-решения в области здравоохранения
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="bg-muted/50 border border-border rounded-lg p-8 group hover:border-primary/30 hover:shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.12)] hover:-translate-y-1 transition-all duration-500"
          >
            <div className="w-12 h-12 border border-primary/30 rounded-full flex items-center justify-center mb-6 group-hover:border-primary/60 transition-colors">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <p className="font-numbers text-3xl text-primary font-light mb-2">3 млн</p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              человек из разных регионов России ежегодно пользуются платформой «Всё не напрасно»
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-muted/50 border border-border rounded-lg p-8 group hover:border-primary/30 transition-all duration-500"
          >
            <div className="w-12 h-12 border border-primary/30 rounded-full flex items-center justify-center mb-6 group-hover:border-primary/60 transition-colors">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <p className="font-numbers text-3xl text-primary font-light mb-2">ВШО</p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Высшая Школа Онкологии – образовательный проект фонда для подготовки нового поколения врачей-онкологов
            </p>
          </motion.div>
        </div>

        {/* Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <a
            href="https://nenaprasno.ru/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Сайт фонда «Не напрасно»
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BeneficiariesSection;
