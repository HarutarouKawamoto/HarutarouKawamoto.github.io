import { useI18n } from '../../contexts/I18nContext';

export function About() {
  const { t } = useI18n();

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <p className="mb-3 font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
        {t.about.eyebrow}
      </p>
      <div className="mb-2 flex flex-wrap items-baseline gap-x-3">
        <p className="text-lg font-normal text-neutral-500 dark:text-neutral-400">
          {t.about.titleGreeting}
        </p>
        <h1 className="text-4xl font-[550] tracking-tight text-neutral-950 md:text-5xl dark:text-white">
          {t.about.titleName}
        </h1>
      </div>

      {/* Catchcopy */}
      <p className="mb-12 text-lg font-bold leading-relaxed" style={{ color: '#0B5FB1' }}>
        {t.about.catchcopy}
      </p>

      {/* Bio */}
      <p className="mb-16 max-w-3xl text-base leading-7 text-pretty text-neutral-700 dark:text-neutral-300">
        {t.about.bio}
      </p>

      {/* Career timeline */}
      <section className="mb-16">
        <h2 className="mb-8 text-xl font-[550] tracking-tight text-neutral-950 dark:text-white">
          {t.about.careerTitle}
        </h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-[9.5rem] hidden w-px bg-neutral-200 md:block dark:bg-white/10" />
          <div className="flex flex-col gap-0">
            {t.about.careerItems.map((item, i) => (
              <div key={i} className="group flex flex-col gap-1 md:grid md:grid-cols-[10rem_1fr] md:gap-0">
                {/* Date */}
                <div className="flex items-start md:pr-6 md:pt-0.5">
                  <span className="text-sm font-[450] tabular-nums text-neutral-400 dark:text-neutral-500">
                    {item.date}
                  </span>
                </div>
                {/* Content */}
                <div className="relative pb-6 md:pl-8">
                  {/* Dot */}
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

      {/* Why engineering */}
      <section className="mb-16">
        <h2 className="mb-6 text-xl font-[550] tracking-tight text-neutral-950 dark:text-white">
          {t.about.reasonTitle}
        </h2>
        <div className="flex max-w-3xl flex-col gap-4">
          {t.about.reasonParagraphs.map((paragraph, i) => (
            <p key={i} className="text-base leading-7 text-pretty text-neutral-700 dark:text-neutral-300">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Current focus */}
      <section>
        <h2 className="mb-4 text-xl font-[550] tracking-tight text-neutral-950 dark:text-white">
          {t.about.currentTitle}
        </h2>
        <p className="max-w-3xl text-base leading-7 text-pretty text-neutral-700 dark:text-neutral-300">
          {t.about.current}
        </p>
      </section>
    </main>
  );
}
