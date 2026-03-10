import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "О форуме", href: "#about" },
  { label: "Темы", href: "#topics" },
  { label: "Спикеры", href: "#speakers" },
  { label: "Программа", href: "#program" },
  { label: "Билеты", href: "#tickets" },
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
          <div className="w-8 h-8 border border-primary flex items-center justify-center">
            <span className="font-display text-primary text-sm font-light">О</span>
          </div>
          <span className="font-display text-lg md:text-xl font-normal tracking-[0.15em] text-cream uppercase">
            Отражение
          </span>
        </a>

        {/* Desktop nav */}
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
            href="#tickets"
            className="ml-4 bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.2em] px-6 py-2.5 hover:opacity-90 transition-all duration-500 font-body"
          >
            Купить билет
          </a>
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-cream"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
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
                href="#tickets"
                onClick={() => setMenuOpen(false)}
                className="mt-4 bg-primary text-primary-foreground text-sm uppercase tracking-[0.2em] px-8 py-3 font-body"
              >
                Купить билет
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
