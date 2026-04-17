import { useI18n } from '../contexts/I18nContext';
import type { Lang } from '../types';

export function LanguageSwitcher() {
  const { lang, switchLang } = useI18n();

  const handleSwitch = (newLang: Lang) => {
    if (newLang !== lang) switchLang(newLang);
  };

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => handleSwitch('ja')}
        aria-pressed={lang === 'ja'}
        className={`rounded px-1.5 py-0.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-primary-light ${
          lang === 'ja'
            ? 'text-primary dark:text-primary-light'
            : 'text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
        }`}
      >
        JA
      </button>
      <span className="text-neutral-300 dark:text-neutral-600">/</span>
      <button
        onClick={() => handleSwitch('en')}
        aria-pressed={lang === 'en'}
        className={`rounded px-1.5 py-0.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-primary-light ${
          lang === 'en'
            ? 'text-primary dark:text-primary-light'
            : 'text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}
