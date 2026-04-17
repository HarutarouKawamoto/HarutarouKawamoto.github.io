import { Link } from 'react-router-dom';
import type { BlogPost } from '../types';
import { useI18n } from '../contexts/I18nContext';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'hero';
}

export function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  const { lang, t } = useI18n();

  const categoryLabel = t.blog.categories[post.category];
  const readingTimeLabel = t.blog.readingTime.replace('{n}', String(post.readingTime));
  const isFeatured = post.category === 'Featured';

  const badgeClass = isFeatured
    ? 'bg-accent text-neutral-950 dark:bg-accent-dark dark:text-neutral-950'
    : 'bg-primary/10 text-primary dark:bg-primary-light/10 dark:text-primary-light';

  if (variant === 'hero') {
    return (
      <Link
        to={`/${lang}/blog/${post.slug}`}
        className="group block overflow-hidden rounded-xl bg-white ring-1 ring-neutral-950/10 shadow-sm transition-shadow hover:shadow-md dark:shadow-white/10 dark:hover:shadow-white/20 dark:bg-neutral-900 dark:ring-white/10"
      >
        <div className="flex flex-col gap-6 p-8 md:flex-row md:items-start md:justify-between md:gap-16">
          <div className="flex-1">
            <div className="mb-4 flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}>
                {categoryLabel}
              </span>
              <span className="text-xs text-neutral-400 dark:text-neutral-500">{readingTimeLabel}</span>
            </div>
            <h2 className="mb-3 text-2xl font-[550] tracking-tight text-neutral-950 transition-colors group-hover:text-primary md:text-3xl dark:text-white dark:group-hover:text-primary-light">
              {post.title}
            </h2>
            <p className="text-base leading-7 text-neutral-600 dark:text-neutral-400">{post.summary}</p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-3 md:items-end md:text-right">
            <time className="text-sm text-neutral-400 dark:text-neutral-500" dateTime={post.date}>
              {post.date}
            </time>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="text-xs text-accent-dark">
                  #{tag}
                </span>
              ))}
            </div>
            <span className="mt-1 text-sm font-medium text-primary transition-colors group-hover:underline dark:text-primary-light">
              {t.blog.readMore} →
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/${lang}/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-neutral-950/10 shadow-sm transition-shadow hover:shadow-md dark:shadow-white/10 dark:hover:shadow-white/20 dark:bg-neutral-900 dark:ring-white/10"
    >
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}>
            {categoryLabel}
          </span>
          <span className="text-xs text-neutral-400 dark:text-neutral-500">{readingTimeLabel}</span>
        </div>
        <h3 className="text-base font-semibold text-neutral-950 transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-primary-light">
          {post.title}
        </h3>
        <p className="flex-1 text-sm leading-6 text-neutral-600 text-pretty dark:text-neutral-400">
          {post.summary}
        </p>
        <div className="flex items-center justify-between pt-1">
          <time className="text-xs text-neutral-400 dark:text-neutral-500" dateTime={post.date}>
            {post.date}
          </time>
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-accent-dark">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
