import { Gavel } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-warm-black text-cream/40">
      <div className="section-padding py-16 md:py-20 border-b border-cream/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-display text-3xl md:text-4xl font-light text-cream mb-2">
              Увидимся <span className="italic text-primary">15 июня</span>
            </h3>
            <p className="font-body text-sm text-cream/40">Москва · Гостиный двор</p>
          </div>
          <a href="#tickets" className="btn-primary">
            Купить билет
          </a>
        </div>
      </div>

      <div className="section-padding py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Gavel className="w-4 h-4 text-cream/50" />
            <p className="font-display text-lg text-cream/50 tracking-[0.15em] uppercase">
              Аукцион
            </p>
          </div>
          <p className="font-body text-xs text-cream/30">
            © 2026 Все права защищены
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
