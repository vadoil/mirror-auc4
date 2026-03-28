import { Download, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const ForumBannerFooter = () => {
  return (
    <section className="py-0">
      {/* Single centered banner with buttons inside */}
      <div className="bg-charcoal flex justify-center py-12 md:py-16 pb-0 md:pb-0">
        <div className="w-[90%] md:w-[70%] overflow-hidden">
          {/* Banner image */}
          <div className="relative min-h-[400px] md:min-h-[480px] flex flex-col items-center justify-center text-center p-8 md:p-12">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-charcoal/70" />
            <div className="relative z-10">
              <span className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-4 block">
                Осень 2026
              </span>
              <h3 className="font-display text-4xl md:text-6xl font-bold text-cream leading-tight mb-1">
                ФОРУМ
              </h3>
              <h3 className="font-display text-4xl md:text-6xl font-bold text-primary italic leading-tight mb-5">
                «ОТРАЖЕНИЕ»
              </h3>
              <div className="w-12 h-0.5 bg-primary mx-auto mb-5" />
              <p className="font-body text-xs tracking-[0.2em] uppercase text-cream/60">
                Осознанность · Энергия · Благотворительность
              </p>
            </div>
          </div>

          {/* Download buttons inside banner width */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-cream/10">
            <a
              href="/docs/presentation-speakers.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-warm-black hover:bg-warm-black/90 transition-colors p-5 md:p-6 md:border-r border-cream/10"
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
              href="/docs/presentation-sponsors.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-warm-black hover:bg-warm-black/90 transition-colors p-5 md:p-6"
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
        </div>
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
