import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles, ArrowRight, RotateCcw } from "lucide-react";

const questions = [
  {
    q: "Что вас привлекает больше всего?",
    options: ["Живопись и графика", "Ювелирные украшения", "Редкие вина", "Уникальные впечатления"],
  },
  {
    q: "Какой стиль вам ближе?",
    options: ["Классика и антиквариат", "Современное искусство", "Минимализм", "Авангард"],
  },
  {
    q: "Какова ваша цель на аукционе?",
    options: ["Пополнить коллекцию", "Сделать подарок", "Поддержать благотворительность", "Просто получить опыт"],
  },
];

const results: Record<string, { title: string; desc: string; color: string }> = {
  default: {
    title: "Истинный Коллекционер",
    desc: "У вас прекрасный вкус и чутьё на уникальные вещи. Наш аукцион – идеальное место для вашего следующего приобретения.",
    color: "text-primary",
  },
};

const QuizSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const handleAnswer = (answer: string) => {
    const next = [...answers, answer];
    setAnswers(next);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setDone(false);
  };

  const result = results.default;

  return (
    <section className="py-24 md:py-32 section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-charcoal" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />

      <div ref={ref} className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center gap-3 justify-center mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/40 font-body">
              Интерактив
            </p>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-cream leading-[0.9]">
            Какой вы <span className="italic text-primary">коллекционер?</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-cream/5 border border-cream/10 p-8 md:p-12"
        >
          {!done && (
            <div className="flex gap-2 mb-8">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 transition-all duration-500 ${
                    i <= step ? "bg-primary" : "bg-cream/10"
                  }`}
                />
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <p className="font-body text-xs text-cream/30 uppercase tracking-[0.2em] mb-3">
                  Вопрос {step + 1} из {questions.length}
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-light text-cream mb-8">
                  {questions[step].q}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {questions[step].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      className="group text-left px-6 py-4 border border-cream/10 hover:border-primary text-cream/70 hover:text-cream font-body text-sm transition-all duration-300 flex items-center justify-between"
                    >
                      {opt}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-primary transition-opacity duration-300" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-4"
              >
                <Sparkles className="w-8 h-8 text-primary mx-auto mb-6" />
                <p className="font-body text-xs text-cream/40 uppercase tracking-[0.3em] mb-3">
                  Ваш результат
                </p>
                <h3 className={`font-display text-3xl md:text-4xl font-light mb-4 ${result.color}`}>
                  {result.title}
                </h3>
                <p className="font-body text-sm text-cream/60 leading-relaxed max-w-lg mx-auto mb-8">
                  {result.desc}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="#tickets" className="btn-primary">
                    Участвовать в аукционе
                  </a>
                  <button
                    onClick={reset}
                    className="flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-cream/40 hover:text-cream transition-colors duration-300"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Пройти снова
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default QuizSection;
