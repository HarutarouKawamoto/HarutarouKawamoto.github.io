import type { Product } from '../types';
import { useI18n } from '../contexts/I18nContext';
import { StatusBadge } from './StatusBadge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { lang, t } = useI18n();

  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-neutral-950/10 shadow-sm dark:bg-neutral-900 dark:ring-white/10">
      {product.imageUrl && (
        <div className="relative bg-neutral-950/5 p-2 pb-0 dark:bg-white/5">
          <img
            src={product.imageUrl}
            alt={product.title}
            loading="lazy"
            className="w-full rounded-lg object-cover"
          />
          <div className="pointer-events-none absolute inset-2 rounded-lg ring-1 ring-inset ring-neutral-950/5 dark:ring-white/5" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-neutral-950 dark:text-white">{product.title}</h3>
          <StatusBadge status={product.status} />
        </div>
        <p className="flex-1 text-sm leading-6 text-neutral-600 text-pretty dark:text-neutral-400">
          {product.description[lang]}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary dark:bg-primary-light/10 dark:text-primary-light"
            >
              {tag}
            </span>
          ))}
        </div>
        {(product.githubUrl || product.demoUrl) && (
          <div className="flex gap-2 pt-1">
            {product.githubUrl && (
              <a
                href={product.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary px-4 py-1.5 text-xs font-[550] text-white transition-colors hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:bg-primary-light dark:hover:bg-primary dark:focus-visible:ring-primary-light"
              >
                {t.products.github}
              </a>
            )}
            {product.demoUrl && (
              <span className="inline-flex rounded-full p-px shadow-sm ring-1 ring-neutral-950/10 dark:ring-white/10">
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-4 py-1 text-xs font-[550] text-neutral-950 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:focus-visible:ring-primary-light"
                >
                  {t.products.demo}
                </a>
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
