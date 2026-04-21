import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, Home } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import TicketRequestModal from "./TicketRequestModal";
import logoOtrazhenie from "@/assets/logo-otrazhenie-final.png";
import logoOtrazhenieLight from "@/assets/logo-otrazhenie-light.png";

const navItems = [
  { label: "Лоты", href: "/lots" },
  { label: "Программа", href: "/program" },
  { label: "Как участвовать", href: "/how-it-works" },
  { label: "Место", href: "/venue" },
  { label: "Партнёры", href: "/#sponsors" },
  { label: "Контакты", href: "/#contacts" },
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

  // On home: transparent → dark on scroll. On inner pages: always light bg with dark text.
  const useDarkText = !isHome || scrolled;

  const headerBg = isHome
    ? scrolled
      ? "bg-background/95 backdrop-blur-md shadow-sm py-3"
      : "bg-transparent py-5"
    : "bg-background/95 backdrop-blur-md shadow-sm py-3";

  const textColor = useDarkText ? "text-foreground/70" : "text-cream/60";
  const textHover = useDarkText ? "hover:text-foreground" : "hover:text-cream";
  const logoText = useDarkText ? "text-foreground" : "text-cream";
  const logoSub = useDarkText ? "text-muted-foreground" : "text-cream/40";
  const mobileIcon = useDarkText ? "text-foreground" : "text-cream";
  const secondaryText = useDarkText ? "text-muted-foreground" : "text-cream/40";
  const secondaryHover = useDarkText ? "hover:text-foreground" : "hover:text-cream";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
      >
        <div className="section-padding flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={useDarkText ? logoOtrazhenie : logoOtrazhenieLight}
              alt="Отражение — благотворительный аукцион"
              className="h-10 md:h-12 w-auto transition-all duration-300"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1 xl:gap-4 2xl:gap-8">
            {/* Home icon – always visible */}
            <Link
              to="/"
              className={`${textColor} ${textHover} transition-colors duration-300`}
              title="Главная"
            >
              <Home className="w-4 h-4" />
            </Link>

            <Link
              to="/#about"
              className={`${textColor} text-[8px] lg:text-[9px] xl:text-[11px] uppercase tracking-[0.08em] lg:tracking-[0.1em] xl:tracking-[0.2em] font-body font-light ${textHover} transition-colors duration-300 whitespace-nowrap`}
            >
              О проекте
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`${textColor} text-[8px] lg:text-[9px] xl:text-[11px] uppercase tracking-[0.08em] lg:tracking-[0.1em] xl:tracking-[0.2em] font-body font-light ${textHover} transition-colors duration-300 whitespace-nowrap`}
              >
                {item.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className={`${textColor} text-[8px] lg:text-[9px] xl:text-[11px] uppercase tracking-[0.08em] lg:tracking-[0.1em] xl:tracking-[0.2em] font-body font-light ${textHover} transition-colors duration-300 whitespace-nowrap`}
              >
                Админ
              </Link>
            )}
            <button
              onClick={() => setTicketModal(true)}
              className="ml-1 xl:ml-4 bg-primary text-primary-foreground text-[8px] lg:text-[9px] xl:text-[11px] uppercase tracking-[0.08em] lg:tracking-[0.1em] xl:tracking-[0.2em] px-3 lg:px-4 xl:px-6 py-2 xl:py-2.5 hover:opacity-90 transition-all duration-500 font-body whitespace-nowrap"
            >
              Задать вопрос
            </button>
            {user ? (
              <button
                onClick={() => signOut()}
                className={`${secondaryText} text-[8px] lg:text-[9px] xl:text-[11px] uppercase tracking-[0.08em] lg:tracking-[0.1em] xl:tracking-[0.2em] font-body font-light ${secondaryHover} transition-colors duration-300 whitespace-nowrap`}
              >
                Выйти
              </button>
            ) : (
              <Link
                to="/auth"
                className={`flex items-center gap-1.5 ${secondaryText} text-[8px] lg:text-[9px] xl:text-[11px] uppercase tracking-[0.08em] lg:tracking-[0.1em] xl:tracking-[0.2em] font-body font-light ${secondaryHover} transition-colors duration-300 whitespace-nowrap`}
              >
                <LogIn className="w-3.5 h-3.5" /> Войти
              </Link>
            )}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden ${mobileIcon}`}
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
              className="lg:hidden bg-background backdrop-blur-xl border-t border-border"
            >
              <nav className="flex flex-col items-center py-8 gap-6">
                <Link to="/" onClick={() => setMenuOpen(false)} className="text-foreground/80 text-sm uppercase tracking-[0.2em] font-body font-light flex items-center gap-2">
                  <Home className="w-4 h-4" /> Главная
                </Link>
                <Link to="/#about" onClick={() => setMenuOpen(false)} className="text-foreground/80 text-sm uppercase tracking-[0.2em] font-body font-light">
                  О проекте
                </Link>
                {navItems.map((item) => (
                  <Link key={item.href} to={item.href} onClick={() => setMenuOpen(false)} className="text-foreground/80 text-sm uppercase tracking-[0.2em] font-body font-light">
                    {item.label}
                  </Link>
                ))}
                <a href="/#contacts" onClick={() => setMenuOpen(false)} className="text-foreground/80 text-sm uppercase tracking-[0.2em] font-body font-light">
                  Контакты
                </a>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-foreground/80 text-sm uppercase tracking-[0.2em] font-body font-light">
                    Админ
                  </Link>
                )}
                <button
                  onClick={() => { setMenuOpen(false); setTicketModal(true); }}
                  className="mt-4 bg-primary text-primary-foreground text-sm uppercase tracking-[0.2em] px-8 py-3 font-body"
                >
                  Задать вопрос
                </button>
                {user ? (
                  <button onClick={() => { setMenuOpen(false); signOut(); }} className="text-muted-foreground text-sm uppercase tracking-[0.2em] font-body">
                    Выйти
                  </button>
                ) : (
                  <Link to="/auth" onClick={() => setMenuOpen(false)} className="text-muted-foreground text-sm uppercase tracking-[0.2em] font-body">
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
        ticketType="Задать вопрос"
        ticketPrice=""
        showTrainingCheckbox={false}
      />
    </>
  );
};

export default Header;
