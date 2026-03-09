const Footer = () => {
  return (
    <footer className="bg-warm-black text-cream/40">
      {/* Top CTA strip */}
      <div className="section-padding py-16 md:py-20 border-b border-cream/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-display text-3xl md:text-4xl font-light text-cream mb-2">
              Увидимся <span className="italic text-primary">26 апреля</span>
            </h3>
            <p className="font-body text-sm text-cream/40">РБК События · Москва</p>
          </div>
          <a href="#tickets" className="btn-primary">
            Купить билет
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="section-padding py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display text-lg text-cream/50 tracking-[0.15em] uppercase">
            Отражение
          </p>
          <p className="font-body text-xs text-cream/30">
            © 2026 Все права защищены
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
