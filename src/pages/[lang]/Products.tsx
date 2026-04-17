import { useI18n } from '../../contexts/I18nContext';
import { ProductCard } from '../../components/ProductCard';
import { products } from '../../data/products';

export function Products() {
  const { t } = useI18n();
  const sorted = [...products].sort((a, b) => a.order - b.order);

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
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
