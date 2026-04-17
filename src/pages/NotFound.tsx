import { Link } from 'react-router-dom';
import { detectInitialLanguage } from '../lib/i18n';

export function NotFound() {
  // I18nProvider の外でも動作するよう detectInitialLanguage で言語を取得
  const lang = detectInitialLanguage();

  const messages = {
    ja: { title: 'ページが見つかりません', message: 'お探しのページは存在しないか、移動した可能性があります。', back: 'ホームに戻る' },
    en: { title: 'Page Not Found', message: "The page you're looking for doesn't exist or has been moved.", back: 'Back to Home' },
  };

  const m = messages[lang];

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="mb-4 text-6xl font-[550] text-neutral-200 dark:text-neutral-800">404</p>
      <h1 className="mb-4 text-2xl font-[550] text-neutral-950 dark:text-white">{m.title}</h1>
      <p className="mb-8 text-neutral-500 dark:text-neutral-400">{m.message}</p>
      <Link
        to={`/${lang}/`}
        className="rounded-full bg-primary px-5 py-2 text-sm font-[550] text-white transition-colors hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:bg-primary-light dark:hover:bg-primary dark:focus-visible:ring-primary-light dark:focus-visible:ring-offset-neutral-950"
      >
        {m.back}
      </Link>
    </main>
  );
}
