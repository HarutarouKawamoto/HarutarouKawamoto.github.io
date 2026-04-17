import { useI18n } from '../../contexts/I18nContext';

export function About() {
  const { t } = useI18n();

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <p className="mb-3 font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
        {t.about.eyebrow}
      </p>
      <h1 className="mb-10 text-3xl font-[550] tracking-tight text-neutral-950 md:text-4xl dark:text-white">
        {t.about.title}
      </h1>
      <div className="flex flex-col gap-10 md:flex-row md:gap-16">
        <div className="flex-[3]">
          <p className="text-base leading-7 text-neutral-700 text-pretty dark:text-neutral-300">
            {t.about.bio}
          </p>
        </div>
        <div className="flex-[2]">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {t.about.careerTitle}
          </h2>
          <div className="border-l border-neutral-950/10 pl-4 dark:border-white/10">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              — (準備中)
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
