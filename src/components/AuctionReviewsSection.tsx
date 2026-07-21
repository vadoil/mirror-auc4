import { useEffect, useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Quote, Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import reviewNaumovPhoto from "@/assets/review-naumov-photo.jpg";
import reviewNaumovTg from "@/assets/review-naumov-tg.jpg";

type Review = {
  id: string;
  name: string;
  message: string;
  photo?: string;
};

const STATIC_REVIEWS: Review[] = [
  {
    id: "static-naumov-1",
    name: "Олег Наумов",
    message:
      "Посетил благотворительный аукцион «Отражение добра» фонда «Не напрасно». Интересные люди, хорошая организация, яркие ведущие - Александр Цыпкин и Юрий Омельченко создали весёлую и непринуждённую камерную атмосферу тёплого вечера. Неординарные лоты дали возможность не только быть вкладом в полезное и нужное дело - поддержку подготовки жизненно важных специалистов в сфере онкологии, но также прикоснуться к роскоши материального мира (колье YSL или часы Чугунова), попробовать прогрессивные технологии здорового образа жизни и встретиться с неординарными личностями (Хакамада, Ситников, Белов, Цыпкин). С большим удовольствием и пользой провёл вечер. Организаторам - большая благодарность!",
    photo: reviewNaumovPhoto,
  },
  {
    id: "static-naumov-2",
    name: "Олег Наумов",
    message:
      "Ситников крут и обаятелен невероятно! За знакомство и возможность несколько часов разговаривать с умнейшим человеком нашего времени - Алексеем Петровичем Ситниковым - организаторам аукциона отдельная благодарность.",
    photo: reviewNaumovTg,
  },
];

const ReviewCard = ({ review, index }: { review: Review; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.05 * index }}
    className="bg-card border border-border rounded-lg overflow-hidden flex flex-col h-full"
  >
    {review.photo && (
      <div className="bg-muted/30 overflow-hidden flex items-center justify-center">
        <img
          src={review.photo}
          alt={review.name}
          loading="lazy"
          className="w-full h-auto object-contain max-h-[520px]"
        />
      </div>
    )}
    <div className="p-5 flex-1 flex flex-col">
      <Quote className="w-5 h-5 text-primary/40 mb-3 shrink-0" />
      <p className="font-body text-sm text-foreground/85 leading-relaxed whitespace-pre-line flex-1">
        {review.message}
      </p>
      <div className="mt-4 pt-4 border-t border-border/60">
        <p className="font-display text-sm text-foreground uppercase tracking-[0.15em]">{review.name}</p>
      </div>
    </div>
  </motion.article>
);

const AuctionReviewsSection = () => {
  const [dbReviews, setDbReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("auction_reviews" as any)
        .select("id, name, message")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (data) {
        setDbReviews(
          (data as any[]).map((r) => ({ id: r.id, name: r.name, message: r.message }))
        );
      }
    })();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("Пожалуйста, заполните имя и текст отзыва");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("auction_reviews" as any).insert({
      name: name.trim(),
      contact: contact.trim() || null,
      message: message.trim(),
    });
    setSubmitting(false);
    if (error) {
      toast.error("Не удалось отправить отзыв. Попробуйте ещё раз.");
      return;
    }
    toast.success("Спасибо! После модерации отзыв появится на сайте.");
    setName("");
    setContact("");
    setMessage("");
  };

  const reviews = [...STATIC_REVIEWS, ...dbReviews];

  return (
    <section id="reviews" className="mt-20 scroll-mt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <h2 className="font-display text-3xl md:text-5xl text-foreground uppercase tracking-tight leading-[0.95] mb-3">
          Отзывы <span className="text-primary italic">гостей</span>
        </h2>
        <p className="font-body text-sm text-muted-foreground max-w-2xl">
          Что говорят те, кто был с нами 26 апреля. После модерации новые отзывы попадают сюда и в наш Telegram-канал.
        </p>
      </motion.div>

      {/* Mobile: горизонтальная карусель со snap-scroll */}
      <div className="md:hidden -mx-4 px-4 mb-12">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-thin">
          {reviews.map((r, i) => (
            <div key={r.id} className="snap-start shrink-0 w-[85%] max-w-[360px]">
              <ReviewCard review={r} index={i} />
            </div>
          ))}
        </div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60 font-body text-center mt-2">
          ← листайте →
        </p>
      </div>

      {/* Desktop: сетка до 4 колонок, фото в полную высоту */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
        {reviews.map((r, i) => (
          <ReviewCard key={r.id} review={r} index={i} />
        ))}
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-lg p-6 md:p-8"
      >
        <h3 className="font-display text-xl md:text-2xl text-foreground uppercase tracking-tight mb-2">
          Оставить отзыв
        </h3>
        <p className="font-body text-xs text-muted-foreground mb-6">
          Ваш отзыв пройдёт короткую модерацию и появится на странице, а также в нашем Telegram-канале.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя*"
            required
            className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 transition-colors"
          />
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Telegram или телефон (по желанию)"
            className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 transition-colors"
          />
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Поделитесь впечатлениями…*"
          required
          rows={5}
          className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 transition-colors mb-4 resize-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-xs uppercase tracking-[0.2em] font-body font-medium hover:opacity-90 transition-all rounded disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          {submitting ? "Отправляем…" : "Отправить отзыв"}
        </button>
      </motion.form>
    </section>
  );
};

export default AuctionReviewsSection;
