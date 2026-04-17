import { useI18n } from '../contexts/I18nContext';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-neutral-950/10 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
