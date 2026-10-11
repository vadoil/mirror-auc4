import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Calendar, Crown, DoorOpen, Gavel, GlassWater, Heart, MapPin, Mic, Music, Phone, Send, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TicketRequestModal from "@/components/TicketRequestModal";
import heroImg from "@/assets/upcoming-spb-hero.webp";
import tsipkinPhoto from "@/assets/tsipkin.webp";
import bartenevPhoto from "@/assets/artist-2-bartenev.webp";
import dimsonWork from "@/assets/abrosimov-work-1.jpg";
import chaykinImg from "@/assets/spb2911/chaykin.webp";
import chamalidiImg from "@/assets/spb2911/chamalidi.webp";
import skazImg from "@/assets/spb2911/skaz.webp";

// Благотворительный вечер «Отражение добра», Санкт-Петербург, 29 ноября 2026.
// Картинки участников — для понимания «о ком речь»; 1 ноября заменим фото конкретных лотов.

const program = [
  { icon: DoorOpen, title: "Встреча у дверей", text: "Дама или кавалер встретят вас и проводят в зал." },
  { icon: GlassWater, title: "Сбор гостей", text: "Приветственный фуршет и шампанское." },
  { icon: Music, title: "Музыка и танцы", text: "Вечерние туалеты, музыка и короткие уроки танцев от распорядителя." },
  { icon: Gavel, title: "Аукцион", text: "Торги за работы современных художников и авторские изделия." },
];

const auctioneers = [
  {
    name: "Александр",
    surname: "Цыпкин",
    text: "Писатель, сценарист и продюсер. Его торги — это всегда юмор, энергия и непредсказуемость.",
    photo: tsipkinPhoto as string | undefined,
    initials: "АЦ",
  },
  {
    name: "Юрий",
    surname: "Омельченко",
    text: "Арт-эксперт и галерист, сооснователь Omelchenko Gallery, автор проекта «ARTПатруль». Провёл несколько благотворительных аукционов современного искусства.",
    photo: undefined,
    initials: "ЮО",
  },
];

type Lot = { name: string; role: string; img?: string; pos?: string };

const artists: Lot[] = [
  { name: "Андрей Бартенев", role: "художник, сценограф, перформер", img: bartenevPhoto, pos: "50% 20%" },
  { name: "Константин Чайкин", role: "часовщик, изобретатель и художник", img: chaykinImg, pos: "50% 30%" },
  { name: "Янис Чамалиди", role: "художник-модельер, модный дом Ianis Chamalidy", img: chamalidiImg, pos: "50% 20%" },
  { name: "Dimson", role: "Дмитрий Абросимов, флуоресцентная живопись", img: dimsonWork },
];

const brands: Lot[] = [
  { name: "Liza Borzaya", role: "ювелирный дом" },
  { name: "Vintage Dream", role: "галерея винтажных украшений" },
  { name: "«Сказ по краю»", role: "фарфоровые вазы", img: skazImg },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7 },
};

const SectionLabel = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-8 h-px bg-primary" />
    <p className={`text-[10px] md:text-xs uppercase tracking-[0.4em] font-body ${light ? "text-cream/50" : "text-muted-foreground"}`}>{children}</p>
  </div>
);

const LotCard = ({ lot, i }: { lot: Lot; i: number }) => (
  <motion.article {...fadeUp} transition={{ duration: 0.5, delay: 0.05 * (i % 4) }} className="group">
    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-warm-black mb-3">
      {lot.img ? (
        <img
          src={lot.img}
          alt={lot.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: lot.pos ?? "50% 50%" }}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-warm-black to-[#2a2420]">
          <Sparkles className="w-6 h-6 text-primary mb-4" />
          <p className="font-display text-2xl md:text-3xl text-cream italic leading-tight">{lot.name}</p>
          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-cream/40 mt-4">лот — в каталоге 1 ноября</p>
        </div>
      )}
    </div>
    <h3 className="font-display text-lg md:text-xl text-foreground leading-tight">{lot.name}</h3>
    <p className="font-body text-xs md:text-sm text-muted-foreground">{lot.role}</p>
  </motion.article>
);

const Spb2911 = () => {
  const [modal, setModal] = useState(false);
  const open = () => setModal(true);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-warm-black">
        <img src={heroImg} alt="Санкт-Петербург, разведённые мосты" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/50 to-warm-black/20" />
        <div className="relative z-10 w-full section-padding pb-16 md:pb-24 pt-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-7xl mx-auto text-cream">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6 text-xs font-body uppercase tracking-[0.2em] text-cream/80">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-primary" /> 29 ноября, воскресенье</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" /> Санкт-Петербург · исторический особняк</span>
            </div>
            <p className="font-body text-xs uppercase tracking-[0.35em] text-cream/60 mb-4">Благотворительный вечер</p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light leading-[0.9] mb-4">
              Отражение <span className="italic text-primary">добра</span>
            </h1>
            <p className="font-body text-sm md:text-base uppercase tracking-[0.2em] text-cream/70 mb-8">в поддержку фонда «Не напрасно»</p>
            <p className="font-display text-2xl md:text-4xl italic text-cream/95 leading-snug max-w-3xl mb-10">
              Радость для себя — отражение добра для других.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={open}
                className="bg-primary text-primary-foreground px-7 py-4 rounded-full inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.18em] hover:opacity-90 transition-opacity"
              >
                Получить приглашение <ArrowRight className="w-4 h-4" />
              </button>
              <a href="#catalog" className="border border-cream/40 text-cream px-7 py-4 rounded-full inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.18em] hover:bg-cream/10 transition-colors">
                Каталог лотов
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* О вечере — вводный текст */}
      <section className="py-20 md:py-28 section-padding">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-20">
          <motion.div {...fadeUp}>
            <SectionLabel>О вечере</SectionLabel>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[1]">
              Вечер
              <br />
              <span className="italic text-primary">в духе петербургского бала.</span>
            </h2>
            <p className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground mt-8">Дресс-код: вечерний</p>
          </motion.div>
          <motion.div {...fadeUp} className="space-y-5 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
            <p className="text-foreground first-letter:font-display first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85] first-letter:text-primary">
              Этой осенью мы приглашаем вас в Петербург. А значит — в город, где умеют превращать вечер в событие: с парадной лестницей,
              музыкой, танцами и разговорами, которые не хочется заканчивать. Для нового «Отражения» мы придумали праздничный формат — вечер
              в духе петербургского бала в историческом особняке.
            </p>
            <p>
              У дверей вас встретят дама или кавалер и проводят в зал. Вас ждут музыка, вечерние туалеты, фуршет и короткие уроки танцев
              от распорядителя бала. Уметь танцевать необязательно, достаточно согласиться на первый шаг.
            </p>
            <p>
              Затем начнётся аукцион современного искусства. Его проведут Александр Цыпкин и Юрий Омельченко, а значит, торги будут
              азартными и остроумными.
            </p>
            <p>
              В каталоге — работы Андрея Бартенева, Константина Чайкина, Яниса Чамалиди и Dimsona, изделия брендов Liza Borzaya и Vintage
              Dream, фарфоровые вазы «Сказ по краю». Полный каталог появится 1 ноября.
            </p>
            <p className="font-display text-xl md:text-2xl italic text-foreground leading-snug">
              Мы создаём для вас красивый вечер. Вы выбираете лот, и он становится помощью: средства от продажи будут направлены фонду
              «Не напрасно». Так удовольствие одного вечера отражается в том, что остаётся надолго.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Как пройдёт вечер */}
      <section className="bg-card/50 py-20 md:py-28 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <SectionLabel>Как пройдёт вечер</SectionLabel>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[1]">
              От первого шага —
              <br />
              <span className="italic text-primary">до последнего лота.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {program.map((p, i) => (
              <motion.div key={p.title} {...fadeUp} transition={{ duration: 0.5, delay: 0.06 * i }} className="bg-background border border-border rounded-2xl p-5 md:p-7">
                <span className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <p.icon className="w-5 h-5" />
                </span>
                <p className="font-numbers text-xs text-primary mb-1">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-display text-xl md:text-2xl text-foreground leading-tight mb-2">{p.title}</h3>
                <p className="font-body text-xs md:text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Аукционисты */}
      <section className="bg-warm-black text-cream py-20 md:py-28 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <SectionLabel light>Аукцион проведут</SectionLabel>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight leading-[1]">
              Азартно
              <br />
              <span className="italic text-primary">и остроумно.</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {auctioneers.map((a) => (
              <motion.div key={a.surname} {...fadeUp} className="grid grid-cols-[0.85fr_1.15fr] gap-5 md:gap-7 items-center border border-cream/10 rounded-2xl p-5 md:p-7">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-cream/5 flex items-center justify-center">
                  {a.photo ? (
                    <img src={a.photo} alt={`${a.name} ${a.surname}`} loading="lazy" className="w-full h-full object-cover object-top" />
                  ) : (
                    <span className="font-display text-5xl text-primary/70">{a.initials}</span>
                  )}
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 font-body text-[10px] uppercase tracking-[0.2em] text-primary mb-3">
                    <Mic className="w-3.5 h-3.5" /> Аукционист
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl leading-[1] mb-4">
                    {a.name}
                    <br />
                    <span className="italic text-primary">{a.surname}</span>
                  </h3>
                  <p className="font-body text-sm text-cream/65 leading-relaxed">{a.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Каталог */}
      <section id="catalog" className="py-20 md:py-28 section-padding scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <SectionLabel>В каталоге аукциона</SectionLabel>
              <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[1]">
                Современное искусство
                <br />
                <span className="italic text-primary">и авторские изделия.</span>
              </h2>
            </div>
            <span className="self-start md:self-auto inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.25em] text-primary bg-primary/10 rounded-full px-4 py-2">
              <Crown className="w-3.5 h-3.5" /> Полный каталог — 1 ноября
            </span>
          </motion.div>

          <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-5">Художники</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-14">
            {artists.map((a, i) => (
              <LotCard key={a.name} lot={a} i={i} />
            ))}
          </div>

          <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-5">Бренды и изделия</p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {brands.map((b, i) => (
              <LotCard key={b.name} lot={b} i={i} />
            ))}
          </div>
          <p className="font-body text-xs text-muted-foreground/70 mt-8">
            Изображения дают представление об участниках. Фото и описания конкретных лотов появятся в каталоге 1 ноября.
          </p>
        </div>
      </section>

      {/* Финальный призыв */}
      <section className="section-padding pb-20 md:pb-28">
        <motion.div {...fadeUp} className="max-w-7xl mx-auto rounded-3xl bg-primary text-primary-foreground p-8 md:p-14 grid lg:grid-cols-[1.3fr_1fr] gap-8 items-center">
          <div>
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-primary-foreground/70 mb-4">29 ноября · Санкт-Петербург</p>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-[1.05] mb-4">
              Красивый вечер, который <span className="italic">становится помощью.</span>
            </h2>
            <p className="font-body text-sm md:text-base text-primary-foreground/80 flex items-start gap-2">
              <Heart className="w-4 h-4 mt-1 shrink-0" /> Средства от продажи лотов будут направлены фонду «Не напрасно».
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <button
              onClick={open}
              className="bg-background text-foreground px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 text-xs md:text-sm uppercase tracking-[0.18em] hover:opacity-90 transition-opacity"
            >
              Получить приглашение <ArrowRight className="w-4 h-4" />
            </button>
            <a href="https://t.me/jiselle_tolts" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-body text-sm text-primary-foreground/85 hover:text-primary-foreground">
              <Send className="w-4 h-4" /> Гизела Тольц · @jiselle_tolts
            </a>
            <a href="tel:+79858095370" className="inline-flex items-center gap-2 font-body text-sm text-primary-foreground/85 hover:text-primary-foreground">
              <Phone className="w-4 h-4" /> 8 (985) 809-53-70
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />

      <TicketRequestModal
        isOpen={modal}
        onClose={() => setModal(false)}
        ticketType="Петербург 29 ноября — приглашение"
        ticketPrice=""
        showTrainingCheckbox={false}
      />
    </div>
  );
};

export default Spb2911;
