import { Link } from 'react-router-dom';
import { useI18n } from '../../contexts/I18nContext';
import { SOCIAL_LINKS } from '../../data/social';

export function Home() {
  const { lang, t } = useI18n();

  return (
    <main
      className="relative flex min-h-[calc(100vh-7rem)] items-center bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/背景１.webp)' }}
    >
      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-black/50" />

      {/* コンテンツ */}
      <div className="relative mx-auto w-full max-w-7xl px-6 py-16 md:py-24">
        <section className="flex flex-col gap-8 md:flex-row md:items-start md:gap-16">
          <div className="flex-none text-center md:text-left">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-white/60">
              {t.home.eyebrow}
            </p>
            <h1 className="whitespace-nowrap text-4xl font-[550] tracking-tight text-white md:text-6xl">
              {t.home.catchcopy}
            </h1>
          </div>
          <div className="flex-[2] md:pt-2">
            <p className="mb-8 text-center text-pretty text-base leading-7 text-white/80">
              {t.home.subtitle}
            </p>
            <div className="flex flex-col gap-4">
              <Link
                to={`/${lang}/products`}
                className="w-full rounded-full bg-primary px-8 py-3.5 text-center text-base font-[550] text-white transition-colors hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                {t.home.viewWork}
              </Link>
              <div className="flex items-center justify-center gap-2">
                <Link
                  to={`/${lang}/about`}
                  className="rounded-full bg-white/20 px-8 py-3.5 text-base font-[550] text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  {t.home.aboutMe}
                </Link>
                <div className="mx-1 h-5 w-px bg-white/20" />
                {SOCIAL_LINKS.map(({ id, label, href, icon, hoverClass }) => (
                  <a
                    key={id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`flex items-center justify-center rounded-full px-3.5 py-3.5 text-white/60 transition-colors [&_svg]:h-6 [&_svg]:w-6 ${hoverClass}`}
                  >
                    {icon}
                  </a>
                ))}
                <Link
                  to={`/${lang}/contact`}
                  aria-label="Contact"
                  className="flex items-center justify-center rounded-full px-3.5 py-3.5 text-white/60 transition-colors hover:bg-orange-500/10 hover:text-orange-400 [&_svg]:h-6 [&_svg]:w-6"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
