import mansion from "@/assets/spb2911/mansion-caryatid.webp";

// Original vector sketches: architectural silhouettes, not photographs of the venue.
function PeterPaulTower() {
  return (
    <svg viewBox="0 0 260 330" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M130 8v16m-5-12h10m-5 7-8 8 8-3 7 5-7-10M130 28l-7 93h14l-7-93Zm-10 94h20m-15 0v14h10v-14m-15 15h20l6 10h-32l6-10Zm-6 10v28m32-28v28m-17-23v16h9v-16m-32 24h52v7h-52z" />
        <path d="M111 183v50m38-50v50m-45 0h52v8h-52zM113 193l5-7m24 0 5 7M123 233v-16a7 7 0 0 1 14 0v16M113 241l-6 12h46l-6-12m-43 12h52v7h-52z" />
        <circle cx="130" cy="201" r="9" /><path d="M130 195v6l5 3M108 260v47m44-47v47m-35-4v-29a13 13 0 0 1 26 0v29m-22-31v26m18-26v26M102 260l-18 14h18m56-14 18 14h-18M84 274v33m92-33v33M74 307h112v8H74zM48 315h164v7H48zM28 322h204" />
        <path d="M87 292h11m64 0h11M78 307v-23m104 23v-23M62 322v-27l-16-9-16 9v27m9-20h14m-14 8h14M198 322v-27l16-9 16 9v27m-9-20h-14m14 8h-14" />
        <path d="M6 322h13m222 0h13M33 217h30m-15-6h26M180 133h24m-10-6h20" opacity=".45" />
      </g>
    </svg>
  );
}

function DumaTower() {
  return (
    <svg viewBox="0 0 300 330" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M170 15v33m-13-12h26m-22-14h18m-13 14-8 27h24l-8-27m-15 13 20 0m-30 15h42v7h-42zM153 71v22m34-22v22m-28-19 22 16m0-16-22 16M146 94h48v7h-48z" />
        <path d="M138 102h58l14 15h-86l14-15Zm-14 15h86v8h-86zM130 125v45m74-45v45M143 130v34m48-34v34M156 165v-25a11 11 0 0 1 22 0v25m-17-23h12m-12 6h12m-12 6h12M121 171h92v8h-92z" />
        <path d="M127 180v56m80-56v56M127 184l-19 9v43m99-52 17 9v43M139 181v53m56-53v53M119 236h96v9h-96zm-11 0h11v9h-15v-9h4m107 0h13v9h-13M126 245v63m82-63v63m-69-60v57m55-57v57M153 306v-39a14 14 0 0 1 28 0v39m-23-34h18m-18 10h18m-18 10h18M118 308h98v9h-98z" />
        <circle cx="167" cy="207" r="19" /><circle cx="167" cy="207" r="15" /><path d="M167 194v13l9 5m-9-24v4m0 30v4m-19-19h4m30 0h4M108 254v54m116-54v54M104 317h126v7H104zM20 324h260" />
        <path d="M24 319v-59h80m-84-7h84m-78 7-6-7 18-9h66M34 273h15v20H34zm29 0h15v20H63zm-29 28h15v18H34zm29 0h15v18H63zM233 270h44v49m-44-56h49l-5 7M239 283h12v17h-12zm22 0h12v17h-12z" />
        <path d="M49 177h28m-12-7h29M236 92h22m-10-6h25" opacity=".45" />
      </g>
    </svg>
  );
}

export default function SpbStorySection() {
  return (
    <section className="spb-story spb-container" id="evening" aria-labelledby="evening-title">
      <article className="spb-story-mansion">
        <figure>
          <img src={mansion} alt="Интерьер исторического особняка — иллюстрация атмосферы вечера" width="900" height="1249" loading="lazy" />
          <figcaption>Особняк Белосельских-Белозерских. Фото для настроения.<br />Александровы АГ · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a></figcaption>
        </figure>
        <div className="spb-story-mansion-copy">
          <p className="spb-kicker">Приглашение в Петербург</p>
          <h2 id="evening-title">Вечер в историческом особняке</h2>
          <p>Этой осенью мы приглашаем вас в Петербург. А значит — в город, где умеют превращать вечер в событие: с парадной лестницей, музыкой, танцами и разговорами, которые не хочется заканчивать. Для нового «Отражения» мы придумали праздничный формат — вечер в духе петербургского бала в историческом особняке.</p>
          <p>У дверей вас встретят дама или кавалер и проводят в зал. Вас ждут музыка, вечерние туалеты, фуршет и короткие уроки танцев от распорядителя бала. Уметь танцевать необязательно, достаточно согласиться на первый шаг.</p>
        </div>
      </article>

      <div className="spb-story-squares">
        <article className="spb-story-tile spb-story-art" aria-labelledby="story-art-title">
          <div className="spb-story-tile-copy">
            <p className="spb-kicker">Искусство и азарт</p>
            <h3 id="story-art-title">Встреча с искусством</h3>
            <p>Затем начнутся благотворительные торги современным искусством. Их проведут Александр Цыпкин и Юрий Омельченко, а значит, торги будут азартными и остроумными.</p>
            <p>В каталоге — работы Андрея Бартенева, Константина Чайкина, Яниса Чамалиди и Dimsona, изделия брендов Liza Borzaya и Vintage Dream, фарфоровые вазы «Сказ по краю».</p>
            <p className="spb-story-catalog-date">Полный каталог появится 1 ноября.</p>
          </div>
          <figure className="spb-story-sketch"><PeterPaulTower /><figcaption>Петропавловская колокольня</figcaption></figure>
        </article>
        <article className="spb-story-tile spb-story-good" aria-labelledby="story-good-title">
          <div className="spb-story-tile-copy">
            <p className="spb-kicker">Радость, которая становится помощью</p>
            <h3 id="story-good-title">Добро остаётся</h3>
            <p>Мы создаём для вас красивый вечер. Вы выбираете лот, и он становится помощью: средства от продажи будут направлены фонду «Не напрасно».</p>
            <p>Так удовольствие одного вечера отражается в том, что остаётся надолго.</p>
          </div>
          <figure className="spb-story-sketch"><DumaTower /><figcaption>Думская башня</figcaption></figure>
        </article>
      </div>
      <p className="spb-story-venue-note">Название особняка и время сбора сообщим дополнительно.</p>
    </section>
  );
}
