import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Gavel, User, LogIn, Home } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import TicketRequestModal from "./TicketRequestModal";

const navItems = [
  { label: "Лоты", href: "/lots" },
  { label: "Как участвовать", href: "/how-it-works" },
  { label: "Место", href: "/venue" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ticketModal, setTicketModal] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-warm-black/95 backdrop-blur-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="section-padding flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <span className="text-cream/40 text-[7px] md:text-[8px] uppercase tracking-[0.35em] font-body leading-none mb-1">
                Благотворительный аукцион
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
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {!isHome && (
              <Link
                to="/"
                className="text-cream/60 hover:text-cream transition-colors duration-300"
                title="Главная"
              >
                <Home className="w-4 h-4" />
              </Link>
            )}
            {isHome && (
              <a
                href="#about"
                className="text-cream/60 text-[11px] uppercase tracking-[0.2em] font-body font-light hover:text-cream transition-colors duration-300"
              >
                О проекте
              </a>
            )}
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-cream/60 text-[11px] uppercase tracking-[0.2em] font-body font-light hover:text-cream transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="text-cream/60 text-[11px] uppercase tracking-[0.2em] font-body font-light hover:text-cream transition-colors duration-300"
              >
                Админ
              </Link>
            )}
            {/* Primary CTA: Записаться */}
            <button
              onClick={() => setTicketModal(true)}
              className="ml-4 bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.2em] px-6 py-2.5 hover:opacity-90 transition-all duration-500 font-body"
            >
              Записаться
            </button>
            {/* Secondary: Войти */}
            {user ? (
              <button
                onClick={() => signOut()}
                className="text-cream/40 text-[11px] uppercase tracking-[0.2em] font-body font-light hover:text-cream transition-colors duration-300"
              >
                Выйти
              </button>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-1.5 text-cream/40 text-[11px] uppercase tracking-[0.2em] font-body font-light hover:text-cream transition-colors duration-300"
              >
                <LogIn className="w-3.5 h-3.5" /> Войти
              </Link>
            )}
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
                {!isHome && (
                  <Link to="/" onClick={() => setMenuOpen(false)} className="text-cream/80 text-sm uppercase tracking-[0.2em] font-body font-light flex items-center gap-2">
                    <Home className="w-4 h-4" /> Главная
                  </Link>
                )}
                {isHome && (
                  <a href="#about" onClick={() => setMenuOpen(false)} className="text-cream/80 text-sm uppercase tracking-[0.2em] font-body font-light">
                    О проекте
                  </a>
                )}
                {navItems.map((item) => (
                  <Link key={item.href} to={item.href} onClick={() => setMenuOpen(false)} className="text-cream/80 text-sm uppercase tracking-[0.2em] font-body font-light">
                    {item.label}
                  </Link>
                ))}
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-cream/80 text-sm uppercase tracking-[0.2em] font-body font-light">
                    Админ
                  </Link>
                )}
                <button
                  onClick={() => { setMenuOpen(false); setTicketModal(true); }}
                  className="mt-4 bg-primary text-primary-foreground text-sm uppercase tracking-[0.2em] px-8 py-3 font-body"
                >
                  Записаться на аукцион
                </button>
                {user ? (
                  <button onClick={() => { setMenuOpen(false); signOut(); }} className="text-cream/40 text-sm uppercase tracking-[0.2em] font-body">
                    Выйти
                  </button>
                ) : (
                  <Link to="/auth" onClick={() => setMenuOpen(false)} className="text-cream/40 text-sm uppercase tracking-[0.2em] font-body">
                    Войти
                  </Link>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <TicketRequestModal
        isOpen={ticketModal}
        onClose={() => setTicketModal(false)}
        ticketType="Аукцион"
        ticketPrice="Бесплатная запись"
      />
    </>
  );
};

export default Header;
