import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SOCIAL_LINKS } from '../data/social';

export function Navigation() {
  const { lang } = useI18n();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: `/${lang}/about` },
    { label: 'Skills', href: `/${lang}/skills` },
    { label: 'Products', href: `/${lang}/products` },
    { label: 'Blog', href: `/${lang}/blog` },
    { label: 'Contact', href: `/${lang}/contact` },
  ] as const;

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm ring-1 ring-neutral-950/10 dark:bg-neutral-950/80 dark:ring-white/10">
      <div className="mx-auto flex h-28 max-w-7xl items-center justify-between px-6">
        <Link
          to={`/${lang}/`}
          className="text-base font-[550] text-neutral-950 transition-colors hover:text-primary dark:text-white dark:hover:text-primary-light"
        >
          HarutarouKawamoto
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              className={`text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-primary-light ${
                isActive(href)
                  ? 'text-primary dark:text-primary-light font-medium'
                  : 'text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {SOCIAL_LINKS.map(({ id, label, href, icon, hoverClass }) => (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-neutral-600 transition-colors dark:text-neutral-400 ${hoverClass}`}
            >
              {icon}
            </a>
          ))}
          <div className="mx-1 h-5 w-px bg-neutral-950/10 dark:bg-white/10" />
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={isMenuOpen}
          className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 md:hidden"
        >
          {isMenuOpen ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-neutral-950/10 bg-white/95 px-6 py-4 dark:border-white/10 dark:bg-neutral-950/95 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm transition-colors ${
                  isActive(href)
                    ? 'text-primary dark:text-primary-light font-medium'
                    : 'text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="flex items-center gap-1 pt-2">
              {SOCIAL_LINKS.map(({ id, label, href, icon, hoverClass }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-neutral-600 transition-colors dark:text-neutral-400 ${hoverClass}`}
                >
                  {icon}
                </a>
              ))}
              <div className="mx-1 h-4 w-px bg-neutral-950/10 dark:bg-white/10" />
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
