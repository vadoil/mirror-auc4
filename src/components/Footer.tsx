import { Link } from "react-router-dom";
import triiLogo from "@/assets/sponsors/triii-logo.png";
import logoOtrazhenie from "@/assets/logo-otrazhenie-light.png";


const Footer = () => {
  return (
    <footer className="bg-warm-black text-cream/40">
      <div className="section-padding py-16 md:py-20 border-b border-cream/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <img
              src={logoOtrazhenie}
              alt="Отражение"
              className="h-10 md:h-12 w-auto"
            />
            <div>
              <h3 className="font-display text-3xl md:text-4xl font-light text-cream mb-2">
                увидимся <span className="italic text-primary">скоро</span>
              </h3>
              <p className="font-body text-sm text-cream/40">
                Москва · Мясницкая 24/7 · Баланс-холл «Место быть»
              </p>
            </div>
          </div>
          <Link to="/forum#registration" className="btn-primary">
            Регистрация на форум
          </Link>
        </div>
      </div>

      <div className="section-padding py-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <p className="font-display text-lg text-cream/50 tracking-[0.15em] uppercase mb-4">Отражение добра</p>
              <p className="font-body text-xs text-cream/30 leading-relaxed">
                Благотворительный аукцион. Все деньги, вырученные с продаж билетов и аукциона, направляются в поддержку фонда «Не напрасно».
              </p>
            </div>
            <div>
              <p className="font-body text-xs text-cream/50 uppercase tracking-[0.2em] mb-4">Навигация</p>
              <div className="space-y-2">
                <Link to="/lots" className="block font-body text-xs text-cream/30 hover:text-cream/60 transition-colors">Каталог лотов</Link>
                <Link to="/how-it-works" className="block font-body text-xs text-cream/30 hover:text-cream/60 transition-colors">Как участвовать</Link>
                <Link to="/venue" className="block font-body text-xs text-cream/30 hover:text-cream/60 transition-colors">Место проведения</Link>
                <Link to="/auth" className="block font-body text-xs text-cream/30 hover:text-cream/60 transition-colors">Вход / Регистрация</Link>
              </div>
            </div>
            <div>
              <p className="font-body text-xs text-cream/50 uppercase tracking-[0.2em] mb-4">Контакты</p>
              <div className="space-y-2">
                <p className="font-body text-xs text-cream/30">Гизела Тольц</p>
                <p className="font-body text-xs text-cream/30">8 (985) 809-53-70</p>
                <a href="https://t.me/Jiselle_Tolts" target="_blank" rel="noopener noreferrer" className="font-body text-xs text-primary/60 hover:text-primary transition-colors">@Jiselle_Tolts</a>
                <p className="font-body text-xs text-cream/30 mt-3">Александра Павлова</p>
                <p className="font-body text-xs text-cream/30">8 (962) 364-66-46</p>
                <a href="https://t.me/alexa_ah_alexa" target="_blank" rel="noopener noreferrer" className="font-body text-xs text-primary/60 hover:text-primary transition-colors">@alexa_ah_alexa</a>
              </div>
            </div>
            <div>
              <p className="font-body text-xs text-cream/50 uppercase tracking-[0.2em] mb-4">Площадка</p>
              <div className="space-y-2">
                <p className="font-body text-xs text-cream/30">«Место быть»</p>
                <p className="font-body text-xs text-cream/30">ул. Мясницкая 24/7, стр. 1</p>
                <a href="https://mestobe.ru/" target="_blank" rel="noopener noreferrer" className="block font-body text-xs text-primary/60 hover:text-primary transition-colors">
                  mestobe.ru
                </a>
                <div className="flex items-center gap-1.5 pt-3 text-cream/20">
                  <span className="font-body text-[10px]">сделано с</span>
                  <span className="text-red-400 text-[10px]">♥</span>
                  <span className="font-body text-[10px]">студия</span>
                  <a href="https://триии.рф" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:opacity-70 transition-opacity">
                    <img src={triiLogo} alt="триии" className="h-[10px] w-auto opacity-20 brightness-[10]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-cream/10 space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="font-body text-xs text-cream/30">
                © 2026 «Отражение добра». Все права защищены. Благотворительный аукцион.
              </p>
              <div className="flex items-center gap-4">
                <Link to="/privacy" className="font-body text-xs text-cream/30 hover:text-cream/60 transition-colors">
                  Политика конфиденциальности
                </Link>
                <Link to="/oferta" className="font-body text-xs text-cream/30 hover:text-cream/60 transition-colors">
                  Оферта
                </Link>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-cream/20">
              <p className="font-body text-[10px]">
                ООО «БАХИНИ» · ИНН 7716649945 · ОГРН 1097746600577
              </p>
              <p className="font-body text-[10px]">
                Все деньги, вырученные с продаж билетов и аукциона, направляются в поддержку фонда «Не напрасно».
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
