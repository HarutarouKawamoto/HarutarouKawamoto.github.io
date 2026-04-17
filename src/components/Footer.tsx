import { Link } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';
import { SOCIAL_LINKS } from '../data/social';

const LAST_UPDATED = '2026-04-18';

export function Footer() {
  const { lang, t } = useI18n();

  const navLinks = [
    { label: t.nav.about,    href: `/${lang}/about` },
    { label: t.nav.skills,   href: `/${lang}/skills` },
    { label: t.nav.products, href: `/${lang}/products` },
    { label: t.nav.blog,     href: `/${lang}/blog` },
  ];

  const formattedDate = new Date(LAST_UPDATED).toLocaleDateString(
    lang === 'ja' ? 'ja-JP' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <footer className="border-t border-neutral-950/10 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* ナビゲーション + SNS・お問い合わせリンク */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-y-3">
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                className="text-sm text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {SOCIAL_LINKS.map(({ id, label, href }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-500 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
              >
                {label}
              </a>
            ))}
            <Link
              to={`/${lang}/contact`}
              className="text-sm text-neutral-500 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
            >
              {t.nav.contact}
            </Link>
          </div>
        </div>

        {/* コピーライト・最終更新日 */}
        <div className="flex flex-col gap-1.5 sm:flex-row sm:justify-between">
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            {t.footer.copyright}
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            {t.footer.lastUpdated}: {formattedDate}
          </p>
        </div>

      </div>
    </footer>
  );
}
