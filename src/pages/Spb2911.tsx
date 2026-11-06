import { motion } from "framer-motion";
import { ArrowRight, Crown, Gavel, GlassWater, Heart, Mic, Music, Phone, Send, Sparkles } from "lucide-react";
import BallTickets from "@/components/BallTickets";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuctionHero, AuctionEducation, AuctionPartners, AuctionTeam } from "@/components/AuctionDecemberSections";
import hostsPhoto from "@/assets/gallery/event/event-01.webp";
import bartenevPhoto from "@/assets/artist-2-bartenev.webp";
import dimsonWork from "@/assets/abrosimov-work-1.jpg";
import chaykinImg from "@/assets/spb2911/chaykin-tools.jpg";
import chamalidiImg from "@/assets/spb2911/chamalidi.webp";
import skazImg from "@/assets/spb2911/skaz-white.png";
import borzayaReference from "@/assets/spb2911/liza-borzaya.jpeg";
import vintageReference from "@/assets/spb2911/vintage-dream-reference.jpg";

// Благотворительный вечер «Отражение добра», Санкт-Петербург, 11 декабря 2026.
// Участники и примеры работ из актуального буклета; не выдаём примеры за конкретные лоты.

const program = [
  { icon: GlassWater, title: "Фуршет", text: "Встреча гостей и общение в Телеграфе." },
  { icon: Music, title: "Живая музыка", text: "Музыка для танцев и атмосфера предновогоднего бала." },
  { icon: Mic, title: "Распорядитель бала", text: "Распорядитель бала и танцевальные ассистенты помогут освоиться на паркете." },
  { icon: Gavel, title: "Аукцион", text: "Современное искусство и авторские изделия. Лоты, которые становятся помощью." },
];

const auctioneers = [
  {
    name: "Александр",
    surname: "Цыпкин",
    text: "Писатель, сценарист и продюсер. Его торги — это всегда юмор, энергия и непредсказуемость.",
  },
  {
    name: "Юрий",
    surname: "Омельченко",
    text: "Арт-эксперт и галерист, сооснователь Omelchenko Gallery, автор проекта «ARTПатруль». Провёл несколько благотворительных торгов современным искусством.",
  },
];

type Lot = { name: string; role: string; img?: string; pos?: string; reference?: boolean; contain?: boolean; source?: string; imageAlt?: string };

const artists: Lot[] = [
  { name: "Андрей Бартенев", role: "художник, сценограф, перформер", img: bartenevPhoto, pos: "50% 20%" },
  { name: "Константин Чайкин", role: "часовщик, изобретатель и художник", img: chaykinImg, pos: "50% 20%", imageAlt: "Константин Чайкин за рабочим столом с часовым механизмом и инструментами" },
  { name: "Янис Чамалиди", role: "художник-модельер, модный дом Ianis Chamalidy", img: chamalidiImg, pos: "50% 20%" },
  { name: "Dimson", role: "Дмитрий Абросимов, флуоресцентная живопись", img: dimsonWork },
];

const brands: Lot[] = [
  { name: "Liza Borzaya", role: "ювелирный дом", img: borzayaReference, reference: true, source: "https://www.lizaborzaya.com/en/collections/new/koltso-love-v-zheltom-zolote-s-rozovoy-lentoy/", imageAlt: "Кольцо Love — пример украшения Liza Borzaya, не объявленный лот" },
  { name: "Vintage Dream", role: "галерея винтажных украшений", img: vintageReference, reference: true, source: "https://vintagedream.ru/shop/broch-reja/", imageAlt: "Винтажная брошь Reja — пример из галереи Vintage Dream, не объявленный лот" },
  { name: "«Сказ по краю»", role: "фарфоровые вазы", img: skazImg, contain: true, imageAlt: "Три фарфоровые вазы «Сказ по краю» на белом фоне" },
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

const LotCard = ({ lot, i, square = false }: { lot: Lot; i: number; square?: boolean }) => (
  <motion.article {...fadeUp} transition={{ duration: 0.5, delay: 0.05 * (i % 4) }} className="group">
    <div className={`relative ${square ? "aspect-square" : "aspect-[3/4]"} rounded-2xl overflow-hidden bg-warm-black mb-3`}>
      {lot.img ? (
        <img
          src={lot.img}
          alt={lot.imageAlt ?? lot.name}
          loading="lazy"
          className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${square ? "object-cover bg-white" : (lot.reference || lot.contain) ? "object-contain bg-white p-3 md:p-6" : "object-cover"}`}
          style={{ objectPosition: lot.pos ?? "50% 50%" }}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-warm-black to-[#2a2420]">
          <Sparkles className="w-6 h-6 text-primary mb-4" />
          <p className="font-display text-2xl md:text-3xl text-cream italic leading-tight">{lot.name}</p>
          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-cream/40 mt-4">Участник благотворительного аукциона</p>
        </div>
      )}
    </div>
    <h3 className="font-display text-lg md:text-xl text-foreground leading-tight">{lot.name}</h3>
    <p className="font-body text-xs md:text-sm text-muted-foreground">{lot.role}</p>
    {lot.reference && <p className="font-body text-[10px] md:text-xs text-muted-foreground mt-2 leading-relaxed">Пример изделия · подробности у организаторов<br /><a href={lot.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary">Фото с сайта {lot.name}</a></p>}
  </motion.article>
);

const Spb2911 = () => {
  const open = () => document.getElementById("tickets")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="auction-page min-h-screen bg-background">
      <Header />

      <AuctionHero />
      <BallTickets />
      <AuctionEducation />

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

      {/* Ведущие */}
      <section className="bg-warm-black text-cream py-20 md:py-28 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <SectionLabel light>Вечер ведут</SectionLabel>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight leading-[1]">
              Азартно
              <br />
              <span className="italic text-primary">и остроумно.</span>
            </h2>
          </motion.div>
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-6 lg:gap-10 items-stretch">
            <motion.figure {...fadeUp} className="relative rounded-2xl overflow-hidden min-h-[420px]">
              <img src={hostsPhoto} alt="Александр Цыпкин и Юрий Омельченко" loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-black/80 via-transparent to-transparent" />
              <figcaption className="absolute left-5 bottom-5 font-body text-xs uppercase tracking-[0.2em] text-cream/80">
                Александр Цыпкин и Юрий Омельченко
              </figcaption>
            </motion.figure>
            <div className="grid gap-6">
              {auctioneers.map((a) => (
                <motion.div key={a.surname} {...fadeUp} className="border border-cream/10 rounded-2xl p-6 md:p-8 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-1.5 font-body text-[10px] uppercase tracking-[0.2em] text-primary mb-3">
                    <Mic className="w-3.5 h-3.5" /> Ведущий
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl leading-[1] mb-4">
                    {a.name} <span className="italic text-primary">{a.surname}</span>
                  </h3>
                  <p className="font-body text-sm text-cream/65 leading-relaxed">{a.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Каталог */}
      <section id="catalog" className="py-20 md:py-28 section-padding scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <SectionLabel>В каталоге благотворительного события</SectionLabel>
              <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[1]">
                Современное искусство
                <br />
                <span className="italic text-primary">и авторские изделия.</span>
              </h2>
            </div>
            <span className="self-start md:self-auto inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.25em] text-primary bg-primary/10 rounded-full px-4 py-2">
              <Crown className="w-3.5 h-3.5" /> Участники и примеры работ
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
              <LotCard key={b.name} lot={b} i={i} square />
            ))}
          </div>
          <p className="font-body text-xs text-muted-foreground/70 mt-8">
            Изображения дают представление об участниках. Актуальный каталог конкретных лотов можно уточнить у организаторов.
          </p>
        </div>
      </section>

      {/* Финальный призыв */}
      <section className="section-padding pb-20 md:pb-28">
        <motion.div {...fadeUp} className="max-w-7xl mx-auto rounded-3xl bg-primary text-primary-foreground p-8 md:p-14 grid lg:grid-cols-[1.3fr_1fr] gap-8 items-center">
          <div>
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-primary-foreground/70 mb-4">11 декабря · Санкт-Петербург</p>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-[1.05] mb-4">
              Красивый вечер, который <span className="italic">становится помощью.</span>
            </h2>
            <p className="font-body text-sm md:text-base text-primary-foreground/80 flex items-start gap-2">
              <Heart className="w-4 h-4 mt-1 shrink-0" /> Собранные на аукционе средства помогут пройти обучение в Высшей школе онкологии фонда «Не напрасно».
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <button
              onClick={open}
              className="bg-background text-foreground px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 text-xs md:text-sm uppercase tracking-[0.18em] hover:opacity-90 transition-opacity"
            >
              Купить билет <ArrowRight className="w-4 h-4" />
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

      <AuctionPartners />
      <AuctionTeam />
      <Footer />


    </div>
  );
};

export default Spb2911;
