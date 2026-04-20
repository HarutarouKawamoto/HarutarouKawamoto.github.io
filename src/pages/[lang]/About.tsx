import { Link } from 'react-router-dom';
import { useI18n } from '../../contexts/I18nContext';

export function About() {
  const { lang, t } = useI18n();

  return (
    <div>
      {/* Hero */}
      <div
        className="relative min-h-[40rem]"
        style={{
          backgroundImage: 'url(/images/about背景.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-neutral-950" />
        <div className="relative mx-auto flex min-h-[inherit] max-w-7xl flex-col items-end justify-end px-6 pt-40 pb-8">
          <div className="text-right">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-white/60">
              {t.about.eyebrow}
            </p>
            <div className="mb-2 flex flex-wrap items-baseline justify-end gap-x-3">
              <p className="text-lg font-normal text-white/70">
                {t.about.titleGreeting}
              </p>
              <h1 className="text-4xl font-[550] tracking-tight text-white md:text-5xl">
                {t.about.titleName}
              </h1>
            </div>
            <p className="mt-4 text-lg font-bold leading-relaxed text-sky-300">
              {t.about.catchcopy}
            </p>
          </div>
        </div>
      </div>

      {/* Bio + Career */}
      <main className="mx-auto max-w-7xl px-6 py-16">
        {/* Bio */}
        <p className="mb-16 ml-auto max-w-3xl text-base leading-7 text-pretty text-neutral-700 dark:text-neutral-300">
          {t.about.bio}
        </p>

        {/* Career timeline */}
        <section className="mb-16">
          <h2 className="mb-8 text-xl font-[550] tracking-tight text-neutral-950 dark:text-white">
            {t.about.careerTitle}
          </h2>
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-[9.5rem] hidden w-px bg-neutral-200 md:block dark:bg-white/10" />
            <div className="flex flex-col gap-0">
              {t.about.careerItems.map((item, i) => (
                <div key={i} className="group flex flex-col gap-1 md:grid md:grid-cols-[10rem_1fr] md:gap-0">
                  <div className="flex items-start md:pr-6 md:pt-0.5">
                    <span className="text-sm font-[450] tabular-nums text-neutral-400 dark:text-neutral-500">
                      {item.date}
                    </span>
                  </div>
                  <div className="relative pb-6 md:pl-8">
                    <span className="absolute top-1.5 -left-[0.3125rem] hidden size-2.5 rounded-full border-2 border-neutral-300 bg-white md:block dark:border-neutral-600 dark:bg-neutral-900" />
                    <p className="text-sm leading-6 text-neutral-700 dark:text-neutral-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Why engineering — full-width blue background */}
      <div className="relative" style={{ backgroundColor: '#0B5FB1' }}>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-blue-950/30 to-transparent md:w-32 md:from-blue-950/60" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-blue-950/30 to-transparent md:w-32 md:from-blue-950/60" />
        <div className="mx-auto max-w-7xl px-6 py-16">
          <section className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-xl font-[550] tracking-tight text-white">
              {t.about.reasonTitle}
            </h2>
            <div className="flex flex-col gap-4">
              {t.about.reasonParagraphs.map((paragraph, i) => (
                <p key={i} className="text-base leading-7 text-pretty text-white/90">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Current focus */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <section className="mx-auto max-w-3xl rounded-2xl px-8 py-10" style={{ backgroundColor: '#E97406' }}>
          <h2 className="mb-4 text-xl font-[550] tracking-tight text-white">
            {t.about.currentTitle}
          </h2>
          <p className="mb-6 text-base leading-7 text-pretty text-white/90">
            {t.about.current}
          </p>
          <Link
            to={`/${lang}/products`}
            className="inline-block rounded-full bg-white px-6 py-2.5 text-sm font-[550] text-orange-600 transition-colors hover:bg-orange-50"
          >
            取り組みを見てみる →
          </Link>
        </section>
      </div>
    </div>
  );
}
