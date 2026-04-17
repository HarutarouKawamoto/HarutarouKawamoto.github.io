import { useI18n } from '../../contexts/I18nContext';
import { ContactForm } from '../../components/ContactForm';

export function Contact() {
  const { t } = useI18n();

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex flex-col gap-12 md:flex-row md:gap-16">
        {/* 左：説明 */}
        <div className="md:w-80 md:shrink-0">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
            {t.contact.eyebrow}
          </p>
          <h1 className="mb-6 text-3xl font-[550] tracking-tight text-neutral-950 md:text-4xl dark:text-white">
            {t.contact.title}
          </h1>
          <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
            {t.contact.description}
          </p>
        </div>

        {/* 右：フォーム */}
        <div className="flex-1">
          <ContactForm formId={import.meta.env.VITE_FORMSPREE_ENDPOINT ?? 'demo'} />
        </div>
      </div>
    </main>
  );
}
