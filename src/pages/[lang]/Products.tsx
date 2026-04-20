import { Link } from 'react-router-dom';
import { useI18n } from '../../contexts/I18nContext';
import { StatusBadge } from '../../components/StatusBadge';
import { products } from '../../data/products';

export function Products() {
  const { lang, t } = useI18n();
  const sorted = [...products].sort((a, b) => a.order - b.order);

  const CARD_COLOR: Record<string, string> = {
    'portfolio-site': 'rgba(11, 95, 177, 0.45)',
    'kudos-loop':     'rgba(233, 116, 6, 0.45)',
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <p className="mb-3 font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
        {t.products.eyebrow}
      </p>
      <h1 className="mb-10 text-3xl font-[550] tracking-tight text-neutral-950 md:text-4xl dark:text-white">
        {t.products.title}
      </h1>

      {sorted.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">{t.products.noProducts}</p>
      ) : (
        <ul className="flex flex-col gap-6">
          {sorted.map((product) => (
            <li key={product.id}>
              <article className="relative min-h-72 overflow-hidden rounded-2xl bg-neutral-900">
                {/* ぼかし背景画像 */}
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover opacity-20 blur-[1px]"
                  />
                )}
                {/* カラーオーバーレイ */}
                {CARD_COLOR[product.id] && (
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to right, ${CARD_COLOR[product.id]}, transparent)` }}
                  />
                )}
                {/* 暗さオーバーレイ */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/60 to-neutral-950/30" />

                {/* コンテンツ */}
                <div className="relative flex h-full min-h-72 flex-col justify-end gap-6 p-8">
                  <div>
                    <div className="mb-3">
                      <StatusBadge status={product.status} />
                    </div>
                    <h2 className="mb-2 text-2xl font-[550] tracking-tight text-white md:text-3xl">
                      {product.title}
                    </h2>
                    <p className="max-w-[60ch] text-pretty text-base leading-7 text-white">
                      {product.description[lang]}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4">
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
                    <Link
                      to={`/${lang}/products/${product.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-sm font-[550] text-neutral-950 transition-colors hover:bg-neutral-100"
                    >
                      {t.products.viewDetail}
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
