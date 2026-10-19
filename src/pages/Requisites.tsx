import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PAYMENT_REQUISITES, requisiteRows } from "@/lib/requisites";

// Реквизиты и условия оплаты — страница для проверки магазина в ЮKassa
const Requisites = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-28 pb-20 section-padding">
      <div className="max-w-3xl mx-auto">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-4">Отражение добра</p>
        <h1 className="font-display text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[1] mb-10">
          Реквизиты <span className="italic text-primary">и оплата</span>
        </h1>

        <section className="mb-10">
          <h2 className="font-display text-2xl text-foreground mb-4">Продавец</h2>
          <dl className="grid sm:grid-cols-[auto_1fr] gap-x-8 gap-y-2 font-body text-sm bg-card border border-border rounded-xl p-6">
            {requisiteRows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-foreground break-all sm:break-normal">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-2xl text-foreground mb-4">Контакты</h2>
          <div className="font-body text-sm text-foreground space-y-1">
            <p>{PAYMENT_REQUISITES.shortName}</p>
            <p>
              Телефон: <a href="tel:+79623646646" className="text-primary hover:underline">8 (962) 364-66-46</a>
            </p>
            <p>
              Почта: <a href="mailto:order@otrazis.ru" className="text-primary hover:underline">order@otrazis.ru</a>
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-2xl text-foreground mb-4">Что можно оплатить на сайте</h2>
          <div className="bg-card border border-border rounded-xl p-6 font-body text-sm">
            <p className="text-foreground font-medium mb-1">Участие в велнес-девичнике «Отражение» — 440 ₽</p>
            <p className="text-muted-foreground">
              25 октября 2026, Москва, баланс-холл «Место быть», ул. Мясницкая, 24/7, стр. 1. Лекции 12:00–14:00, тренировки
              14:30–16:30, диджей-сет 17:00–19:00, уход за волосами 12:00–19:00. Средства будут направлены в поддержку фонда «Не напрасно».{" "}
              <Link to="/home" className="text-primary hover:underline">
                Подробнее о событии
              </Link>
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-2xl text-foreground mb-4">Как оплатить</h2>
          <ol className="list-decimal pl-5 space-y-2 font-body text-sm text-muted-foreground">
            <li>Заполните анкету регистрации на странице события.</li>
            <li>Нажмите «Зарегистрироваться и оплатить» — откроется защищённая страница оплаты ЮKassa.</li>
            <li>Оплатите банковской картой или другим доступным способом. Данные карты не передаются и не хранятся на сайте.</li>
            <li>После оплаты на почту придёт подтверждение регистрации.</li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-2xl text-foreground mb-4">Возврат</h2>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            По вопросам возврата напишите на{" "}
            <a href="mailto:order@otrazis.ru" className="text-primary hover:underline">
              order@otrazis.ru
            </a>{" "}
            или позвоните по телефону 8 (962) 364-66-46. Деньги возвращаются на карту, с которой была произведена оплата, в сроки,
            установленные законодательством РФ.
          </p>
        </section>

        <section className="font-body text-sm text-muted-foreground space-y-1">
          <p>
            <Link to="/oferta" className="text-primary hover:underline">
              Договор-оферта
            </Link>
          </p>
          <p>
            <Link to="/privacy" className="text-primary hover:underline">
              Политика обработки персональных данных
            </Link>
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default Requisites;
