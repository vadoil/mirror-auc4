import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import gizaPhoto from "@/assets/organizer-giza-clean.webp";
import sashaPhoto from "@/assets/organizer-sasha-clean.webp";
import moscowPhoto from "@/assets/gallery/event/event-02.webp";
import spbPhoto from "@/assets/evening-1.jpg";
import "@/styles/about-project.css";

const founders = [
  {
    name: "Александра Павлова", shortName: "Саша", city: "Санкт-Петербург", photo: sashaPhoto,
    text: "Предприниматель, продюсер медицинских конференций и попечитель фонда «Не напрасно». Автор книги по поддержке женщин с раком щитовидной железы.",
    contact: "https://t.me/alexa_ah_alexa",
  },
  {
    name: "Гизела Тольц", shortName: "Гиза", city: "Москва", photo: gizaPhoto,
    text: "Организатор медицинских, коммерческих и частных мероприятий. Работает с врачами и экспертами России и Европы. Автор проекта «Поговори с Гизой» — подкастов и поддержки женщин.",
    contact: "https://t.me/Jiselle_Tolts",
  },
];

const events = [
  {
    date: "26 апреля 2026", dateTime: "2026-04-26", city: "Москва", place: "Balance Hall «Место быть»",
    title: "Забота о себе и о других", image: moscowPhoto, href: "/archive/moscow",
    text: "Встретились с врачами и экспертами, поговорили о долголетии и провели благотворительные торги с Александром Цыпкиным. В лотах — оздоровительные программы, искусство и особенный опыт от партнёров.",
  },
  {
    date: "13 августа 2026", dateTime: "2026-08-13", city: "Санкт-Петербург", place: "Центр «Зрение»",
    title: "Искусство видеть главное", image: spbPhoto, href: "/archive/spb",
    text: "Соединили разговор о здоровье с современным искусством. Онколог Владислав Евсеев ответил на вопросы гостей, а работы Алексея Сергиенко, Андрея Бартенева и Дмитрия Абросимова стали частью благотворительного события.",
  },
];

async function fetchProgress() {
  const { data, error } = await supabase.rpc("fundraising_progress" as never);
  if (error) throw error;
  const value = data as { raised?: unknown; goal?: unknown } | null;
  const raised = Number(value?.raised);
  const goal = Number(value?.goal);
  if (!Number.isFinite(raised) || raised < 0 || !Number.isFinite(goal) || goal <= 0) {
    throw new Error("Fundraising totals unavailable");
  }
  return { raised, goal };
}

const money = (value: number) => new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(value) + " ₽";

export default function About() {
  const { data: progress } = useQuery({ queryKey: ["about-fundraising-progress"], queryFn: fetchProgress, staleTime: 60_000, retry: 1 });

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "О проекте — Отражение добра";
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="about-project" id="about-main">
        <section className="ap-hero ap-wrap" aria-labelledby="about-title">
          <div className="ap-intro">
            <p className="ap-kicker">О проекте «Отражение добра»</p>
            <h1 id="about-title">Добро начинается<br /><em>с людей.</em></h1>
            <p className="ap-lead">Мы собираем людей на красивые вечера, чтобы вместе помогать другим.</p>
            <p className="ap-copy">Искусство, встречи и забота о себе становятся поддержкой фонда «Не напрасно». В Москве и Петербурге. Вместе с гостями, художниками, врачами и партнёрами.</p>
            <a className="ap-text-link" href="#our-story">Наша история <ArrowDown size={17} aria-hidden="true" /></a>
          </div>
          <div className="ap-portraits" aria-label="Организаторы проекта">
            {founders.map((person) => (
              <figure key={person.name} className="ap-portrait">
                <div className="ap-portrait-photo"><img src={person.photo} alt={person.name} width="1024" height="1024" loading="eager" /></div>
                <figcaption><span>{person.shortName}</span><small>{person.city}</small></figcaption>
              </figure>
            ))}
            <p className="ap-portrait-note">Две подруги. Два города. Одна цель.</p>
          </div>
        </section>

        <section id="our-story" className="ap-story ap-wrap" aria-labelledby="story-title">
          <div className="ap-section-heading">
            <p className="ap-kicker">Как всё началось</p>
            <h2 id="story-title">Привет! Мы —<br />Саша и Гиза.</h2>
          </div>
          <div className="ap-story-body">
            <p className="ap-lead">Нас объединяют дружба, работа с людьми и желание помогать.</p>
            <p className="ap-copy">Мы занимаемся проектами, бизнесом и благотворительностью в двух городах — Москве и Петербурге. «Отражение добра» соединяет этот опыт: у каждого события свой характер, но общая цель — поддержка фонда «Не напрасно».</p>
            <p className="ap-copy">Нам хочется, чтобы участие в благотворительности было естественной частью жизни. Можно познакомиться с интересными людьми, узнать новое, найти произведение искусства для себя — и сделать доброе дело.</p>
          </div>
          <div className="ap-bios">
            {founders.map((person) => (
              <article key={person.name} className="ap-bio">
                <p className="ap-city">{person.city}</p>
                <h3>{person.name}</h3>
                <p className="ap-copy">{person.text}</p>
                <a href={person.contact} target="_blank" rel="noopener noreferrer" className="ap-text-link">Написать {person.shortName === "Саша" ? "Саше" : "Гизе"} <ArrowUpRight size={16} aria-hidden="true" /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="ap-manifesto" aria-label="Идея проекта">
          <div className="ap-wrap">
            <p>Радость для себя —<br /><em>отражение добра для других.</em></p>
            <span>Так устроены наши вечера.</span>
          </div>
        </section>

        <section className="ap-events ap-wrap" aria-labelledby="events-title">
          <div className="ap-section-top">
            <div><p className="ap-kicker">Уже стали частью истории</p><h2 id="events-title">Наши встречи</h2></div>
            <Link className="ap-text-link" to="/archive">Архив событий <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="ap-event-grid">
            {events.map((event) => (
              <article className="ap-event" key={event.href}>
                <Link to={event.href} className="ap-event-image" aria-label={`${event.title} — подробнее о вечере`}>
                  <img src={event.image} alt={`Гости вечера «Отражение добра» — ${event.city}, ${event.date}`} loading="lazy" />
                  <span>{event.city}</span>
                </Link>
                <p className="ap-event-meta"><time dateTime={event.dateTime}>{event.date}</time><span>{event.place}</span></p>
                <h3>{event.title}</h3>
                <p className="ap-copy">{event.text}</p>
                <Link to={event.href} className="ap-text-link">Как это было <ArrowRight size={17} aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
          <Link className="ap-gallery-link" to="/gallery">Лица, эмоции и моменты наших вечеров <span>Смотреть фотографии <ArrowUpRight size={19} aria-hidden="true" /></span></Link>
        </section>

        <section className="ap-impact" aria-labelledby="impact-title">
          <div className="ap-wrap ap-impact-grid">
            <div>
              <p className="ap-kicker">Ради чего мы встречаемся</p>
              <h2 id="impact-title">Помощь, которая<br />остаётся после вечера.</h2>
              <p className="ap-copy">Средства от продажи билетов и лотов направляются в фонд «Не напрасно». Фонд поддерживает людей с онкологическими заболеваниями и их близких, обучает врачей и развивает проекты в области здравоохранения.</p>
              <a className="ap-text-link" href="https://nenaprasno.ru/" target="_blank" rel="noopener noreferrer">Познакомиться с фондом <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
            <div className="ap-impact-total">
              {progress ? <>
                <p className="ap-total-label">Собрано в поддержку фонда</p>
                <p className="ap-total-number">{money(progress.raised)}</p>
                <p className="ap-total-caption">Общий сбор проекта по данным сайта</p>
                <div role="progressbar" aria-label="Прогресс общего сбора" aria-valuemin={0} aria-valuemax={progress.goal} aria-valuenow={Math.min(progress.raised, progress.goal)} aria-valuetext={`${money(progress.raised)} из ${money(progress.goal)}`} className="ap-progress"><span style={{ width: `${Math.min(100, progress.raised / progress.goal * 100)}%` }} /></div>
                <p className="ap-total-caption">Наша цель — {money(progress.goal)}</p>
              </> : <>
                <p className="ap-total-label">Каждое участие имеет значение</p>
                <p className="ap-impact-message">Встречаемся.<br />Увлекаемся.<br />Помогаем.</p>
                <p className="ap-total-caption">Итоги прошедших торгов — в архиве проекта.</p>
              </>}
              <a className="ap-text-link" href="https://nenaprasno.ru/fund/reports/" target="_blank" rel="noopener noreferrer">Отчёты фонда <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section className="ap-next ap-wrap" aria-labelledby="next-title">
          <div className="ap-section-top"><div><p className="ap-kicker">Продолжение следует</p><h2 id="next-title">Встретимся снова</h2></div><p className="ap-copy">Новые поводы быть вместе<br />и поддержать доброе дело.</p></div>
          <div className="ap-next-grid">
            <Link to="/home" className="ap-next-event"><p className="ap-city">Москва · 25 октября 2026</p><h3>Велнес-девичник</h3><p>Встреча о заботе о себе в поддержку «Розового октября».</p><span className="ap-text-link">О событии <ArrowRight size={17} aria-hidden="true" /></span></Link>
            <Link to="/peterburg" className="ap-next-event ap-next-featured"><p className="ap-city">Петербург · 29 ноября 2026</p><h3>Вечер в историческом особняке</h3><p>Современное искусство и благотворительное событие с Александром Цыпкиным и Юрием Омельченко.</p><span className="ap-text-link">О вечере <ArrowRight size={17} aria-hidden="true" /></span></Link>
          </div>
        </section>

        <section className="ap-join ap-wrap" aria-labelledby="join-title">
          <div><p className="ap-kicker">Давайте знакомиться</p><h2 id="join-title">Стать частью<br />«Отражения добра»</h2></div>
          <div><p className="ap-copy">Приходите на наши события, предложите лот или станьте партнёром. Если у вас есть идея, мы будем рады её обсудить.</p><div className="ap-contact-links"><a href="https://t.me/alexa_ah_alexa" target="_blank" rel="noopener noreferrer" className="ap-button">Написать Саше <ArrowUpRight size={17} aria-hidden="true" /></a><a href="https://t.me/Jiselle_Tolts" target="_blank" rel="noopener noreferrer" className="ap-button ap-button-outline">Написать Гизе <ArrowUpRight size={17} aria-hidden="true" /></a></div></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
