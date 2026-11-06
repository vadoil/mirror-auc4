import { BookOpen, Heart, MapPin, Mic, Music, Gavel, GlassWater } from "lucide-react";
import logo from "@/assets/logo-otrazhenie-final.png";
import giza from "@/assets/organizer-giza-clean.webp";
import sasha from "@/assets/organizer-sasha-clean.webp";

const base = "/auction-december/";
const contact = "https://t.me/jiselle_tolts";

export function AuctionHero() {
  return <section id="venue" className="section-padding pt-28 pb-14 md:pt-36 md:pb-20 bg-gradient-to-br from-background via-background to-primary/5">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div>
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <img src={logo} alt="Отражение добра" className="h-10 sm:h-14 w-auto" />
          <img src={`${base}kommersant.png`} alt="Коммерсантъ" className="w-32 sm:w-44 h-auto" />
        </div>
        <p className="font-body text-sm text-muted-foreground mb-6">Проект «Отражение добра» и «Коммерсант» представляют</p>
        <h1 className="font-display text-[clamp(1.4rem,6.5vw,2.2rem)] lg:text-[clamp(2rem,3.1vw,3rem)] leading-[1.05] mb-6">Предновогодний благотворительный бал</h1>
        <div className="w-16 h-px bg-primary mb-6" />
        <p className="font-body text-lg max-w-md mb-8">В поддержку фонда «Не напрасно» и Высшей школы онкологии</p>
        <p className="font-body text-muted-foreground mb-6">Распорядитель бала, танцевальные ассистенты и живая музыка.</p>
        <p className="font-numbers text-5xl md:text-6xl text-primary mb-3">11.12.2026</p>
        <p className="font-display text-2xl mb-2">Санкт-Петербург</p>
        <p className="font-body text-muted-foreground flex gap-2 items-start"><MapPin size={19} className="shrink-0 mt-0.5" /> Телеграф · Почтамтская улица, 15</p>
        <div className="flex flex-wrap gap-3 mt-8">
          <a href="#tickets" className="btn-primary text-center">Купить билет</a>
          <a href={`${base}guests.pdf`} target="_blank" rel="noopener noreferrer" className="border border-primary px-6 py-4 font-body text-sm hover:bg-primary/5">Буклет вечера · PDF</a>
        </div>
      </div>
      <div className="relative w-full max-w-[400px] mx-auto lg:mr-0">
        <div className="hidden md:block absolute -inset-2 border border-primary/40 rounded-t-[48%] pointer-events-none" />
        <img src={`${base}telegraph.png`} alt="Фасад Телеграфа на Почтамтской улице с вывеской ТЕЛЕГРАФ" className="w-full aspect-square object-cover object-top rounded-xl md:aspect-auto md:h-auto md:rounded-none md:rounded-t-[48%]" fetchPriority="high" />
        <div className="relative bg-background border border-primary/20 p-5 mt-3 rounded-xl md:-mt-3 md:rounded-none">
          <p className="font-body text-primary text-sm pb-4 border-b border-primary/20">Ведущий вечера — Александр Цыпкин</p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            {[{Icon: GlassWater, label: "Фуршет"}, {Icon: Music, label: "Живая музыка"}, {Icon: Mic, label: "Распорядитель бала"}, {Icon: Gavel, label: "Благотворительный аукцион"}].map(({Icon,label}) => <div key={label} className="flex items-center gap-3 text-xs sm:text-sm font-body"><Icon className="text-primary shrink-0" size={26} /><span>{label}</span></div>)}
          </div>
        </div>
      </div>
    </div>
  </section>;
}

export function AuctionEducation() {
  return <section className="section-padding py-16 md:py-24" id="education">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.5fr_1fr] gap-10 items-center">
      <div>
        <p className="font-body text-primary mb-4">Кому помогает аукцион</p>
        <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6">Обучить врача —<br />помочь сотням пациентов</h2>
        <p className="bg-primary text-white p-5 rounded-xl font-body text-lg mb-6">Собранные средства помогут пройти обучение в Высшей школе онкологии</p>
        <h3 className="font-display text-2xl">Высшая школа онкологии</h3>
        <p className="font-body text-muted-foreground mt-2">Бесплатная программа фонда «Не напрасно»</p>
        <div className="grid sm:grid-cols-3 gap-6 my-8">
          {[{Icon:Heart,title:"Кто учится",text:"Молодые онкологи. Конкурсный отбор по всей России."},{Icon:BookOpen,title:"Как учатся",text:"2 года бесплатно. Доказательная медицина, практика и наставники."},{Icon:MapPin,title:"Где помогают",text:"Выпускники работают в разных регионах России."}].map(({Icon,title,text})=><div key={title}><Icon className="text-primary mb-3" size={28}/><h4 className="font-display text-xl mb-2">{title}</h4><p className="font-body text-sm text-muted-foreground">{text}</p></div>)}
        </div>
        <div className="grid grid-cols-3 gap-3 border-t border-primary/30 pt-5">
          {[['С 2015','работает программа'],['159','выпускников'],['2 года','обучения и практики']].map(([value,label])=><div key={value}><p className="font-numbers text-3xl text-primary">{value}</p><p className="font-body text-xs mt-2 text-muted-foreground">{label}</p></div>)}
        </div>
      </div>
      <figure className="border border-primary/30 p-2 rounded-t-[48%]">
        <img src={`${base}doctors.jpg`} alt="Врачи Высшей школы онкологии" className="w-full rounded-t-[48%]" loading="lazy" />
        <figcaption className="font-display text-2xl text-primary p-5">Учиться. Практиковать. Помогать.</figcaption>
      </figure>
    </div>
  </section>;
}

export function AuctionPartners() {
  return <section id="partners" className="section-padding py-16 md:py-24 bg-primary/5 scroll-mt-20"><div className="max-w-7xl mx-auto">
    <h2 className="font-display text-4xl md:text-5xl max-w-3xl mb-6">Приглашаем вас стать партнёром предновогоднего бала</h2>
    <p className="font-body text-muted-foreground max-w-2xl mb-10">Спонсорское финансирование — на организацию предновогоднего бала и благотворительного аукциона 11 декабря в Санкт-Петербурге.</p>
    <div className="grid md:grid-cols-3 gap-8 border-y border-primary/20 py-8 mb-8">{[['Генеральный спонсор','1 700 000 ₽'],['Спонсор программы','350 000 ₽'],['Партнёр','150 000 ₽']].map(([label,value])=><div key={label}><p className="font-body text-sm mb-4">{label}</p><p className="font-numbers text-4xl text-primary">{value}</p></div>)}</div>
    <div className="flex flex-wrap gap-5 items-center"><a href={contact} className="btn-primary">Стать партнёром вечера</a><a href={`${base}partners.pdf`} target="_blank" rel="noopener noreferrer" className="font-body underline underline-offset-4">Предложение партнёрам · PDF</a></div>
  </div></section>;
}

export function AuctionTeam() {
  const people = [
    {name:"Александра Павлова",role:"Организатор",image:sasha,text:"Продюсер медицинских конференций. Попечитель фонда «Не напрасно».",phone:"+7 (962) 364-66-46",tel:"+79623646646",tg:"alexa_ah_alexa"},
    {name:"Гизела Тольц",role:"Организатор",image:giza,text:"Организатор медицинских мероприятий. 10 лет с врачами России и Европы.",phone:"+7 (985) 809-53-70",tel:"+79858095370",tg:"jiselle_tolts"},
    {name:"Павел Румянцев",role:"При поддержке",image:`${base}pavel.png`,text:"Председатель попечительского совета фонда «Не напрасно». Доктор медицинских наук, врач высшей категории."},
  ];
  return <section id="contacts" className="section-padding py-16 md:py-24 scroll-mt-20"><div className="max-w-7xl mx-auto"><h2 className="font-display text-4xl md:text-5xl mb-10">Люди, которые объединяют</h2><div className="grid md:grid-cols-3 gap-10">{people.map(p=><article key={p.name}><img src={p.image} alt={p.name} loading="lazy" className="w-full aspect-square object-cover object-top rounded-t-[50%] mb-5"/><p className="font-body text-sm text-primary mb-2">{p.role}</p><h3 className="font-display text-2xl mb-3">{p.name}</h3><p className="font-body text-sm text-muted-foreground leading-relaxed">{p.text}</p>{p.tel&&<div className="border-t border-primary/30 pt-4 mt-5 space-y-2"><a className="block font-body" href={`tel:${p.tel}`}>{p.phone}</a><a className="block text-primary font-body" href={`https://t.me/${p.tg}`}>@{p.tg}</a></div>}</article>)}</div></div></section>;
}
