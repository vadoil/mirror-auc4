import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const VideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-0 overflow-hidden">
      <div ref={ref} className="relative w-full aspect-[16/7] md:aspect-[21/9] min-h-[400px] max-h-[700px]">
        <div className="absolute inset-0 bg-charcoal" />
        <div className="absolute inset-0 bg-warm-black/50" />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
        >
          <button className="group relative w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-cream/30 hover:border-primary flex items-center justify-center transition-all duration-500 hover:scale-110 mb-8">
            <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/20 transition-all duration-500" />
            <svg
              className="w-8 h-8 md:w-10 md:h-10 text-cream ml-1 group-hover:text-primary transition-colors duration-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <p className="font-body text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/60">
            Смотреть промо-ролик аукциона
          </p>
        </motion.div>

        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-warm-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-warm-black to-transparent" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-8 left-8 md:left-16 z-10 hidden md:block"
        >
          <p className="font-display text-xl md:text-2xl italic text-cream/70">
            «Каждая ставка — это вклад в будущее»
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
