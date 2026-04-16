import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Oferta = () => {
  return (
    <div className="min-h-screen bg-warm-black text-cream">
      <Header />
      <main className="pt-32 pb-20 section-padding">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-light mb-8">
            Публичная оферта
          </h1>
          <p className="font-body text-xs text-cream/40 mb-10">
            Дата публикации: 16 апреля 2026 г.
          </p>

          <div className="space-y-8 font-body text-sm text-cream/70 leading-relaxed">
            <section>
              <h2 className="font-display text-lg text-cream mb-3">1. Общие положения</h2>
              <p>
                Настоящий документ является официальным предложением (публичной офертой)
                ООО «БАХИНИ» (ИНН 7716649945, ОГРН 1097746600577), именуемого в дальнейшем
                «Организатор», адресованным любому физическому лицу, именуемому в дальнейшем
                «Участник», заключить договор на оказание услуг по организации и проведению
                благотворительного мероприятия «Отражение добра» (далее — «Мероприятие»)
                на условиях, изложенных ниже.
              </p>
              <p className="mt-3">
                Оферта считается акцептованной с момента оплаты Участником регистрационного
                взноса за участие в Мероприятии.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg text-cream mb-3">2. Предмет договора</h2>
              <p>
                Организатор обязуется предоставить Участнику доступ к благотворительному
                мероприятию «Отражение добра», включающему участие в аукционе, мастер-классах,
                нетворкинге и культурной программе.
              </p>
              <p className="mt-3">
                Мероприятие проводится <strong className="text-cream">26 апреля 2026 года</strong> по адресу:
                г.&nbsp;Москва, ул.&nbsp;Мясницкая, д.&nbsp;24/7, стр.&nbsp;1, баланс-холл «Место быть».
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg text-cream mb-3">3. Стоимость и порядок оплаты</h2>
              <p>
                Стоимость регистрационного взноса за участие в Мероприятии составляет{" "}
                <strong className="text-cream">15 000 (пятнадцать тысяч) рублей</strong>.
              </p>
              <p className="mt-3">
                Оплата производится безналичным переводом на расчётный счёт Организатора
                либо иным способом, предложенным Организатором на сайте{" "}
                <a href="https://отражение.рф" className="text-primary hover:text-primary/80 transition-colors">
                  отражение.рф
                </a>.
              </p>
              <p className="mt-3">
                Все денежные средства, вырученные с продажи билетов и аукциона, направляются
                в поддержку благотворительного фонда «Не напрасно».
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg text-cream mb-3">4. Права и обязанности сторон</h2>
              <h3 className="text-cream/90 font-medium mt-4 mb-2">4.1. Организатор обязуется:</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Обеспечить проведение Мероприятия в указанные дату и место;</li>
                <li>Предоставить Участнику доступ ко всем заявленным активностям программы;</li>
                <li>Обеспечить надлежащий уровень организации Мероприятия.</li>
              </ul>

              <h3 className="text-cream/90 font-medium mt-4 mb-2">4.2. Участник обязуется:</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Своевременно произвести оплату регистрационного взноса;</li>
                <li>Соблюдать правила поведения на площадке Мероприятия;</li>
                <li>Предоставить достоверные контактные данные при регистрации.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg text-cream mb-3">5. Возврат средств</h2>
              <p>
                В случае отмены Мероприятия по инициативе Организатора, уплаченные средства
                возвращаются Участнику в полном объёме в течение 10 (десяти) рабочих дней.
              </p>
              <p className="mt-3">
                При отказе Участника от участия в Мероприятии менее чем за 5 (пять) рабочих
                дней до даты его проведения, регистрационный взнос возврату не подлежит,
                поскольку является благотворительным пожертвованием.
              </p>
              <p className="mt-3">
                При отказе Участника от участия за 5 и более рабочих дней до даты
                проведения, возврат производится в размере 100% от уплаченной суммы.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg text-cream mb-3">6. Персональные данные</h2>
              <p>
                Участник даёт согласие на обработку своих персональных данных, предоставленных
                при регистрации, в целях организации и проведения Мероприятия, а также для
                информирования о благотворительных проектах Организатора.
              </p>
              <p className="mt-3">
                Обработка персональных данных осуществляется в соответствии с{" "}
                <Link to="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                  Политикой конфиденциальности
                </Link>{" "}
                и Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg text-cream mb-3">7. Ответственность</h2>
              <p>
                Организатор не несёт ответственности за невозможность проведения
                Мероприятия вследствие обстоятельств непреодолимой силы (форс-мажор).
              </p>
              <p className="mt-3">
                Организатор оставляет за собой право вносить изменения в программу
                Мероприятия без предварительного уведомления Участника.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg text-cream mb-3">8. Срок действия оферты</h2>
              <p>
                Настоящая оферта вступает в силу с момента её публикации на сайте{" "}
                <a href="https://отражение.рф" className="text-primary hover:text-primary/80 transition-colors">
                  отражение.рф
                </a>{" "}
                и действует до окончания Мероприятия.
              </p>
            </section>

            <section className="border-t border-cream/10 pt-8 mt-10">
              <h2 className="font-display text-lg text-cream mb-4">Реквизиты Организатора</h2>
              <div className="space-y-1 text-cream/50">
                <p>ООО «БАХИНИ»</p>
                <p>ИНН: 7716649945</p>
                <p>ОГРН: 1097746600577</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Oferta;
