import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-warm-black">
      <Header />
      <div className="section-padding py-24 md:py-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl text-cream uppercase tracking-tight mb-4">
            Политика конфиденциальности
          </h1>
          <p className="text-cream/40 text-xs font-body mb-12">
            Последнее обновление: 8 апреля 2026 г.
          </p>

          <div className="space-y-10 font-body text-sm text-cream/60 leading-relaxed">
            <section>
              <h2 className="font-display text-xl text-cream uppercase tracking-tight mb-4">1. Общие положения</h2>
              <p>
                Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты
                персональных данных пользователей сайта <strong className="text-cream/80">otrazis.ru</strong> (далее — «Сайт»),
                принадлежащего <strong className="text-cream/80">ООО «БАХИНИ»</strong> (ИНН 7716649945, ОГРН 1097746600577),
                в лице Генерального Директора Павловой Александры Алексеевны (далее — «Оператор»).
              </p>
              <p className="mt-3">
                Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных»
                и иными нормативными правовыми актами Российской Федерации.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-cream uppercase tracking-tight mb-4">2. Персональные данные</h2>
              <p>Оператор может обрабатывать следующие персональные данные Пользователя:</p>
              <ul className="list-disc list-inside mt-3 space-y-1 text-cream/50">
                <li>Фамилия, имя, отчество</li>
                <li>Адрес электронной почты (email)</li>
                <li>Номер телефона</li>
                <li>Данные, автоматически передаваемые при посещении Сайта (IP-адрес, данные cookies, информация о браузере, время доступа)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-cream uppercase tracking-tight mb-4">3. Цели обработки</h2>
              <p>Персональные данные обрабатываются в следующих целях:</p>
              <ul className="list-disc list-inside mt-3 space-y-1 text-cream/50">
                <li>Регистрация и идентификация Пользователя на Сайте</li>
                <li>Обработка заявок на участие в благотворительном аукционе</li>
                <li>Связь с Пользователем для подтверждения регистрации и оплаты</li>
                <li>Отправка уведомлений и информационных сообщений</li>
                <li>Улучшение качества работы Сайта и его содержания</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-cream uppercase tracking-tight mb-4">4. Правовые основания</h2>
              <p>
                Обработка персональных данных осуществляется на основании:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 text-cream/50">
                <li>Согласия Пользователя на обработку его персональных данных</li>
                <li>Необходимости исполнения договора, стороной которого является Пользователь</li>
                <li>Необходимости осуществления прав и законных интересов Оператора</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-cream uppercase tracking-tight mb-4">5. Условия обработки</h2>
              <p>
                Оператор обеспечивает сохранность персональных данных и принимает все возможные меры,
                исключающие доступ к персональным данным неуполномоченных лиц.
              </p>
              <p className="mt-3">
                Персональные данные Пользователя не передаются третьим лицам, за исключением случаев,
                прямо предусмотренных законодательством Российской Федерации.
              </p>
              <p className="mt-3">
                Оператор вправе передать персональные данные органам дознания и следствия,
                иным уполномоченным органам по основаниям, предусмотренным действующим законодательством РФ.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-cream uppercase tracking-tight mb-4">6. Хранение данных</h2>
              <p>
                Персональные данные хранятся на территории Российской Федерации.
                Срок хранения персональных данных определяется достижением целей их обработки,
                если иной срок не предусмотрен договором или действующим законодательством.
              </p>
              <p className="mt-3">
                Пользователь может в любой момент отозвать своё согласие на обработку персональных данных,
                направив Оператору уведомление на адрес электронной почты <strong className="text-cream/80">alexa-ref@list.ru</strong>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-cream uppercase tracking-tight mb-4">7. Права пользователя</h2>
              <p>Пользователь имеет право:</p>
              <ul className="list-disc list-inside mt-3 space-y-1 text-cream/50">
                <li>Получать информацию, касающуюся обработки его персональных данных</li>
                <li>Требовать уточнения, блокирования или уничтожения персональных данных</li>
                <li>Обжаловать действия или бездействие Оператора в уполномоченный орган по защите прав субъектов персональных данных (Роскомнадзор)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-cream uppercase tracking-tight mb-4">8. Cookies</h2>
              <p>
                Сайт использует файлы cookies для обеспечения корректной работы и повышения удобства использования.
                Пользователь может отключить использование cookies в настройках браузера,
                однако это может повлиять на функциональность Сайта.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-cream uppercase tracking-tight mb-4">9. Изменение Политики</h2>
              <p>
                Оператор вправе вносить изменения в настоящую Политику конфиденциальности.
                Новая редакция Политики вступает в силу с момента её размещения на Сайте,
                если иное не предусмотрено новой редакцией.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-cream uppercase tracking-tight mb-4">10. Реквизиты оператора</h2>
              <div className="space-y-2 text-cream/50">
                <p><strong className="text-cream/70">Наименование:</strong> ООО «БАХИНИ»</p>
                <p><strong className="text-cream/70">ИНН:</strong> 7716649945</p>
                <p><strong className="text-cream/70">ОГРН:</strong> 1097746600577</p>
                <p><strong className="text-cream/70">Руководитель:</strong> Павлова Александра Алексеевна (Генеральный Директор)</p>
                <p><strong className="text-cream/70">Email:</strong> alexa-ref@list.ru</p>
              </div>
            </section>
          </div>

          <div className="mt-16 pt-8 border-t border-cream/10">
            <Link to="/" className="text-cream/40 text-xs font-body hover:text-cream/60 transition-colors">
              ← На главную
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
