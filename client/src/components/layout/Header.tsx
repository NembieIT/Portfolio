import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

const navLinkClasses = (isActive: boolean): string =>
  isActive
    ? 'uppercase tracking-[0.2em] transition-all duration-300 text-primary font-bold'
    : 'font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-all duration-300';

export default function Header() {
  const { messages, locale, toggleLocale } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: messages.nav.home },
    { path: '/work', label: messages.nav.work },
    { path: '/about', label: messages.nav.about },
    { path: '/contact', label: messages.nav.contact },
  ];

  const switchTo = locale === 'en' ? 'VI' : 'EN';

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/40 backdrop-blur-xl border-b border-white/5">
      <div className="h-20 w-full px-margin-desktop flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2" aria-label="Mai Tiến Dũng — home">
          <span className="font-headline-md text-headline-md tracking-tighter uppercase text-on-surface">
            Tiến<span className="text-primary">.Dũng</span>
          </span>
        </NavLink>
        <nav className="hidden md:flex items-center gap-gutter" aria-label={messages.nav.home}>
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) => navLinkClasses(isActive)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={toggleLocale}
            className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors px-3 py-2 border border-outline-variant rounded-md"
            aria-label={`Switch language to ${switchTo}`}
          >
            {switchTo}
          </button>
          <button
            type="button"
            className="md:hidden w-8 h-8 flex items-center justify-center bg-primary rounded-full"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="md:hidden bg-surface/40 backdrop-blur-xl border-b border-white/5 px-margin-desktop py-4 flex flex-col gap-4"
        >
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => navLinkClasses(isActive)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
