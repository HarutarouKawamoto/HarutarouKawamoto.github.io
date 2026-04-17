import { Link } from 'react-router-dom';
import { useI18n } from '../../contexts/I18nContext';

export function Home() {
  const { lang, t } = useI18n();

  return (
    <main
      className="relative flex min-h-[calc(100vh-3.5rem)] items-center bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/背景１.png)' }}
    >
      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-black/50" />

      {/* コンテンツ */}
      <div className="relative mx-auto w-full max-w-7xl px-6 py-16 md:py-24">
        <section className="flex flex-col gap-8 md:flex-row md:items-start md:gap-16">
          <div className="flex-[3]">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-white/60">
              HarutarouKawamoto
            </p>
            <h1 className="text-balance text-4xl font-[550] tracking-tight text-white md:text-5xl">
              {t.home.catchcopy}
            </h1>
          </div>
          <div className="flex-[2] md:pt-2">
            <p className="mb-8 max-w-[40ch] text-pretty text-base leading-7 text-white/80">
              {t.home.subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to={`/${lang}/products`}
                className="rounded-full bg-primary px-5 py-2 text-sm font-[550] text-white transition-colors hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                {t.home.viewWork}
              </Link>
              <Link
                to={`/${lang}/contact`}
                className="rounded-full bg-white/20 px-5 py-2 text-sm font-[550] text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                {t.home.contactMe}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
