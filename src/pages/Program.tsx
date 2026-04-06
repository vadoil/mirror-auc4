import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mic, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import stupinPhoto from "@/assets/speaker-stupin.jpg";
import pavlovPhoto from "@/assets/speaker-pavlov.png";
import spiroPhoto from "@/assets/speaker-spiro.png";
import gunderinaPhoto from "@/assets/speaker-gunderina.png";
import evnichPhoto from "@/assets/speaker-evnich.png";

const program = [
  { time: "15:00", title: "Сбор гостей", desc: "Дегустация, знакомство с участниками аукциона и пространством «Место быть»", highlight: false },
  { time: "16:00", title: "Public Talk", desc: "Ключевые подходы к долголетию и Healthspan", highlight: true, speakers: true },
  { time: "16:45", title: "Кофе-брейк", desc: "Перерыв, общение, подготовка к аукциону", highlight: false },
  { time: "17:00", title: "Аукцион", desc: "Торги – wellness-программы, ретриты, эксклюзивный опыт", highlight: true },
];

const moderatorsData = [
  {
    name: "Ростислав Павлов",
    role: "Вице-президент Сбербанка по здравоохранению",
    bio: "Хирург-онколог, кандидат медицинских наук. Номинант рейтинга Forbes «30 до 30». О нём снят документальный фильм.",
    highlights: [
      "Вице-президент Сбербанка по здравоохранению",
      "Хирург-онколог, кандидат медицинских наук",
      "Рейтинг Forbes «30 самых перспективных россиян до 30»",
    ],
    image: pavlovPhoto,
  },
];

const speakersData = [
  {
    name: "Родион Ступин",
    role: "Генеральный директор сети клиник «Будь здоров»",
    bio: "Один из ключевых управленцев в сфере частной медицины России. Участник дискуссии.",
    highlights: [
      "Генеральный директор сети клиник «Будь здоров»",
      "Спикер ПМЭФ, СКОЛКОВО, Mediametrics",
      "Эксперт в превентивной медицине и управлении здоровьем",
    ],
    image: stupinPhoto,
  },
  {
    name: "Артём Спиро",
    role: "Импакт-предприниматель, ресторатор",
    bio: "Основатель венчурной студии Spiro Ventures и нейробистро Inspiro. Эксперт в здоровом питании и устойчивом развитии.",
    highlights: [
      "Основатель Spiro Ventures — венчурная студия «стартапов будущего»",
      "Создатель нейробистро Inspiro в Москве",
      "Эксперт в области здорового питания и sustainability",
    ],
    image: spiroPhoto,
  },
  {
    name: "Наталия Гундерина",
    role: "Продюсер проекта Karmalogic®, CEO Karmatravel",
    bio: "Операционный директор проектов Алексея Ситникова. MBA ВШЭ, Британская высшая школа дизайна.",
    highlights: [
      "Продюсер и операционный директор проектов Алексея Ситникова",
      "Основатель и CEO проекта Karmatravel",
      "MBA ГУ ВШЭ «Политические и бизнес-коммуникации»",
    ],
    image: gunderinaPhoto,
    jointWith: "Анна Евневич",
    jointTopic: "Ключевые подходы к долголетию и Healthspan",
  },
  {
    name: "Анна Евневич",
    role: "Коллаборация Smart Energy by Alexey Sitnikov · Hedonist One",
    bio: null,
    highlights: [],
    image: evnichPhoto,
    jointWith: "Наталия Гундерина",
    jointTopic: "Ключевые подходы к долголетию и Healthspan",
  },
];

type SpeakerData = {
  name: string;
  role: string;
  bio: string | null;
  highlights: string[];
  image: string;
  jointWith?: string;
  jointTopic?: string;
};

type PersonCardProps = {
  person: SpeakerData;
  index: number;
  isInView: boolean;
};

const PersonCard = ({ person, index, isInView }: PersonCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: 0.2 * index }}
    className="group flex flex-col items-center text-center"
  >
    {/* Circle photo */}
    <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden bg-muted/30 mb-6 ring-2 ring-border group-hover:ring-primary/30 transition-all duration-500">
      {person.image ? (
        <img
          src={person.image}
          alt={person.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <User className="w-12 h-12 text-muted-foreground/20" />
        </div>
      )}
    </div>

    {/* Info */}
    <h3 className="font-display text-xl md:text-2xl font-light text-foreground mb-1 leading-tight">
      {person.name}
    </h3>
    <p className="font-body text-[10px] text-primary uppercase tracking-[0.15em] mb-2">{person.role}</p>

    {(person as SpeakerData).jointTopic && (
      <p className="font-body text-xs text-foreground/70 italic mb-3">
        Совместное выступление с {(person as SpeakerData).jointWith}
        <br />
        <span className="text-primary font-medium not-italic">«{(person as SpeakerData).jointTopic}»</span>
      </p>
    )}

    {person.bio && (
      <p className="font-body text-sm font-light text-muted-foreground leading-relaxed mb-3 max-w-xs">{person.bio}</p>
    )}

    {person.highlights.length > 0 && (
      <ul className="space-y-1.5 text-left">
        {person.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
            <span className="font-body text-xs font-light text-muted-foreground">{h}</span>
          </li>
        ))}
      </ul>
    )}
  </motion.div>
);

const Program = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-28 pb-20 section-padding">
        <div className="max-w-5xl mx-auto" ref={ref}>
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground text-xs font-body uppercase tracking-[0.2em] hover:text-foreground transition-colors mb-12">
            <ArrowLeft className="w-4 h-4" /> На главную
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
                26 апреля 2026 · Москва
              </p>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground leading-[0.9] mb-6">
              Программа <span className="italic text-primary">вечера</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl">
              Благотворительный аукцион «Отражение добра» в баланс-холле «Место быть»
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative mb-24">
            <div className="absolute left-[39px] md:left-[59px] top-0 bottom-0 w-px bg-border" />
            <div className="space-y-0">
              {program.map((item, i) => (
                <motion.div
                  key={item.time}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.08 * i }}
                  className="group relative flex gap-6 md:gap-10"
                >
                  <div className="relative z-10 flex-shrink-0 w-20 md:w-[120px] flex items-start pt-8">
                    <div className="w-full text-right pr-5 md:pr-7">
                      <span className="font-numbers text-lg md:text-2xl font-light text-primary">
                        {item.time}
                      </span>
                    </div>
                    <div className={`absolute right-0 top-[34px] md:top-[38px] w-3 h-3 rounded-full border-2 transition-colors duration-300 -translate-x-[1px] ${
                      item.highlight
                        ? "bg-primary border-primary"
                        : "bg-background border-primary/40 group-hover:border-primary"
                    }`} />
                  </div>
                  <div className={`flex-1 py-6 md:py-8 pl-4 md:pl-6 border-b border-border group-hover:bg-muted/30 transition-colors duration-300 rounded-r-lg ${
                    item.highlight ? "bg-primary/5" : ""
                  }`}>
                    <h3 className="font-body text-lg md:text-2xl font-medium text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm font-light text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Moderators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-primary" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
                Public Talk · Модераторы
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {moderatorsData.map((person, i) => (
                <PersonCard key={person.name} person={person} index={i} isInView={isInView} />
              ))}
            </div>
          </motion.div>

          {/* Speakers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-24"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-primary" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground font-body">
                Public Talk · Спикеры
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {speakersData.map((person, i) => (
                <PersonCard key={person.name} person={person} index={i} isInView={isInView} />
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center bg-muted/40 border border-border rounded-lg p-10 md:p-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-4">
              Готовы присоединиться?
            </h2>
            <p className="font-body text-muted-foreground mb-8 max-w-md mx-auto">
              Зарегистрируйтесь на аукцион и станьте частью вечера, который меняет жизни.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/lots" className="btn-primary">
                Смотреть лоты
              </Link>
              <Link to="/how-it-works" className="btn-outline">
                Как участвовать
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Program;
