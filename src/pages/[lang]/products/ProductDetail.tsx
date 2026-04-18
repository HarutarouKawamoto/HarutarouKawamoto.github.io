import { Link, useParams, Navigate } from 'react-router-dom';
import { useI18n } from '../../../contexts/I18nContext';
import { StatusBadge } from '../../../components/StatusBadge';
import { products } from '../../../data/products';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useI18n();

  const product = products.find((p) => p.id === id);
  if (!product) return <Navigate to={`/${lang}/products`} replace />;

  const description = product.longDescription?.[lang] ?? product.description[lang];

  return (
    <div>
      {/* Hero */}
      <div
        className="relative min-h-[50vh]"
        style={
          product.imageUrl
            ? { backgroundImage: `url(${product.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : {}
        }
      >
        <div
          className={`absolute inset-0 ${
            product.imageUrl
              ? 'bg-gradient-to-t from-neutral-950/90 via-neutral-950/50 to-neutral-950/20'
              : 'bg-gradient-to-br from-neutral-800 to-neutral-950'
          }`}
        />
        <div className="relative mx-auto flex min-h-[50vh] max-w-7xl flex-col justify-end px-6 py-12">
          <div className="mb-3">
            <StatusBadge status={product.status} />
          </div>
          <h1 className="mb-4 text-4xl font-[550] tracking-tight text-white md:text-5xl">
            {product.title}
          </h1>
          <ul className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-white/20"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Body */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex max-w-[65ch] flex-col gap-2">
          {description.split('\n').map((paragraph, i) => (
            <p key={i} className="text-pretty text-base leading-7 text-neutral-700 dark:text-neutral-300">
              {paragraph}
            </p>
          ))}
        </div>

        {(product.githubUrl || product.demoUrl) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {product.githubUrl && (
              <a
                href={product.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-[550] text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100"
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
                  className="rounded-full bg-white px-5 py-2 text-sm font-[550] text-neutral-950 transition-colors hover:bg-neutral-50 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                >
                  {t.products.demo}
                </a>
              </span>
            )}
          </div>
        )}

        <div className="mt-12">
          <Link
            to={`/${lang}/products`}
            className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-950 dark:hover:text-white"
          >
            <span aria-hidden>←</span>
            {t.products.backToList}
          </Link>
        </div>
      </main>
    </div>
  );
}
