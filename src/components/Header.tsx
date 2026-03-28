import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Gavel } from "lucide-react";

const navItems = [
  { label: "О проекте", href: "#about" },
  { label: "Лоты", href: "#lots-preview" },
  { label: "Программа", href: "#program" },
  { label: "Билеты", href: "#tickets" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-warm-black/95 backdrop-blur-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="section-padding flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <span className="text-cream/40 text-[7px] md:text-[8px] uppercase tracking-[0.35em] font-body leading-none mb-1">
              Инвестируй в себя
            </span>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 border border-primary flex items-center justify-center">
                <Gavel className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="font-display text-lg md:text-xl font-normal tracking-[0.15em] text-cream uppercase">
                Отражение
              </span>
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-cream/60 text-[11px] uppercase tracking-[0.2em] font-body font-light hover:text-cream transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#lots-preview"
            className="text-cream/60 text-[11px] uppercase tracking-[0.2em] font-body font-light hover:text-cream transition-colors duration-300"
          >
            Каталог
          </a>
          <a
            href="#tickets"
            className="ml-4 bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.2em] px-6 py-2.5 hover:opacity-90 transition-all duration-500 font-body"
          >
            Участвовать
          </a>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-cream"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-warm-black/98 backdrop-blur-xl"
          >
            <nav className="flex flex-col items-center py-8 gap-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-cream/80 text-sm uppercase tracking-[0.2em] font-body font-light"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#lots-preview"
                onClick={() => setMenuOpen(false)}
                className="text-cream/80 text-sm uppercase tracking-[0.2em] font-body font-light"
              >
                Каталог
              </a>
              <a
                href="#tickets"
                onClick={() => setMenuOpen(false)}
                className="mt-4 bg-primary text-primary-foreground text-sm uppercase tracking-[0.2em] px-8 py-3 font-body"
              >
                Участвовать
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
