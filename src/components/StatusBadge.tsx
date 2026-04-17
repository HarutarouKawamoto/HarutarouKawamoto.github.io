import type { ProductStatus } from '../types';
import { useI18n } from '../contexts/I18nContext';

interface StatusBadgeProps {
  status: ProductStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useI18n();

  const label = t.products.status[status];

  if (status === 'completed') {
    return (
      <span className="inline-flex items-center rounded-full bg-neutral-950/10 px-2.5 py-0.5 text-xs font-medium text-neutral-950 dark:bg-white/10 dark:text-white">
        {label}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-medium text-accent-dark dark:bg-accent/10 dark:text-accent">
      {label}
    </span>
  );
}
