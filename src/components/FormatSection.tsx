import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mic, MessageSquare, BookOpen, MousePointerClick, Users, Flower2 } from "lucide-react";
import heroMirror from "@/assets/hero-mirror.jpg";

const formats = [
  { icon: Mic, title: "Личные кейсы", desc: "Лучшие эксперты делятся опытом" },
  { icon: MessageSquare, title: "Панельные дискуссии", desc: "Открытый диалог спикеров" },
  { icon: Users, title: "Женские круги", desc: "Пространство для глубокого разговора" },
  { icon: MousePointerClick, title: "Интерактивы", desc: "Вовлечение в реальном времени" },
  { icon: Flower2, title: "Relax-зона", desc: "Телесные практики и расслабление" },
  { icon: BookOpen, title: "Экспо-зона", desc: "Здоровье, красота и осознанность" },
];

const FormatSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Split background */}
      <div className="absolute inset-0 grid lg:grid-cols-2">
        <div className="bg-card" />
        <div className="relative hidden lg:block">
          <img src={heroMirror} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-warm-black/60" />
        </div>
      </div>

      <div ref={ref} className="relative z-10 section-padding max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-primary" />
                <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
                  Как это будет
                </p>
              </div>
              <h2 className="font-display text-5xl md:text-6xl font-light tracking-tight text-foreground leading-[0.9]">
                Формат <span className="italic text-primary">форума</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              {formats.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="group"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-medium text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs font-light text-muted-foreground">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side quote - visible on lg */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:flex flex-col justify-center items-start pl-12"
          >
            <blockquote className="font-display text-3xl xl:text-4xl font-light text-cream italic leading-snug mb-6">
              «Один день, чтобы остановиться и услышать себя»
            </blockquote>
            <div className="w-16 h-px bg-primary" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FormatSection;
