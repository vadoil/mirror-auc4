import { Download, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const ForumBannerFooter = () => {
  return (
    <section className="section-padding py-0">
      {/* Main banner */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-t-2xl">
        {/* Left - Photo side */}
        <div className="relative min-h-[340px] bg-charcoal flex items-end p-8 md:p-10">
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800')] bg-cover bg-center" />
          <div className="relative z-20">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-3 block">
              Весна 2026
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-cream leading-tight mb-3">
              ФОРУМ
              <br />
              «ОТРАЖЕНИЕ»
            </h3>
            <p className="font-body text-sm text-cream/60">
              Осознанность · Энергия · Благотворительность
            </p>
          </div>
        </div>

        {/* Right - Typography side */}
        <div className="bg-sand flex flex-col items-center justify-center p-8 md:p-10 text-center">
          <h3 className="font-display text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-1">
            ФОРУМ
          </h3>
          <h3 className="font-display text-4xl md:text-5xl font-bold text-primary italic leading-tight mb-4">
            ОТРАЖЕНИЕ
          </h3>
          <div className="w-10 h-0.5 bg-primary mb-4" />
          <p className="font-body text-xs tracking-[0.2em] uppercase text-charcoal/60">
            Осознанность · Энергия · Добро
          </p>
        </div>
      </div>

      {/* Download buttons */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 border-t border-cream/10">
        <a
          href="#"
          className="flex items-center gap-4 bg-charcoal hover:bg-charcoal/90 transition-colors p-5 md:p-6 border-r border-cream/10"
        >
          <Download className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="font-body text-sm font-medium text-cream">
              СКАЧАТЬ ПРЕЗЕНТАЦИЮ ФОРУМА
            </p>
            <p className="font-body text-xs text-cream/40">PDF, для спикеров</p>
          </div>
        </a>
        <a
          href="#"
          className="flex items-center gap-4 bg-charcoal hover:bg-charcoal/90 transition-colors p-5 md:p-6"
        >
          <Download className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="font-body text-sm font-medium text-cream">
              СКАЧАТЬ ПРЕЗЕНТАЦИЮ ДЛЯ СПОНСОРОВ
            </p>
            <p className="font-body text-xs text-cream/40">
              PDF, партнёрское предложение
            </p>
          </div>
        </a>
      </div>

      {/* Admin login */}
      <div className="max-w-7xl mx-auto flex justify-center border-t border-cream/10">
        <Link
          to="/admin"
          className="flex items-center gap-2 py-4 font-body text-sm text-cream/40 hover:text-cream/60 transition-colors"
        >
          <Settings className="w-4 h-4" />
          Вход для администратора
        </Link>
      </div>
    </section>
  );
};

export default ForumBannerFooter;
