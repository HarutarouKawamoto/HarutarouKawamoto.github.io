import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useI18n } from '../../../contexts/I18nContext';
import { getPostWithContent } from '../../../lib/blog';
import type { BlogPost } from '../../../types';

export function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useI18n();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) return;
    getPostWithContent(lang, slug).then((p) => setPost(p ?? null));
  }, [lang, slug]);

  if (post === undefined) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-neutral-400">Loading...</p>
      </main>
    );
  }

  if (post === null) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-neutral-950 dark:text-white">{t.notFound.title}</p>
        <Link to={`/${lang}/blog`} className="mt-4 inline-block text-sm text-primary dark:text-primary-light">
          ← {t.blog.backToList}
        </Link>
      </main>
    );
  }

  const readingTimeLabel = t.blog.readingTime.replace('{n}', String(post.readingTime));

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Link
        to={`/${lang}/blog`}
        className="mb-8 inline-block text-sm text-neutral-500 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
      >
        ← {t.blog.backToList}
      </Link>

      <header className="mb-10">
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary dark:bg-primary-light/10 dark:text-primary-light">
            {t.blog.categories[post.category]}
          </span>
          <span className="text-xs text-neutral-400 dark:text-neutral-500">{readingTimeLabel}</span>
        </div>
        <h1 className="mb-4 text-3xl font-[550] tracking-tight text-neutral-950 md:text-4xl dark:text-white">
          {post.title}
        </h1>
        <div className="flex items-center gap-4">
          <time className="text-sm text-neutral-400 dark:text-neutral-500" dateTime={post.date}>
            {post.date}
          </time>
          {post.translationSlug && (
            <Link
              to={`/${lang === 'ja' ? 'en' : 'ja'}/blog/${post.translationSlug}`}
              className="text-sm text-primary transition-colors hover:underline dark:text-primary-light"
            >
              {lang === 'ja' ? 'Read in English' : '日本語で読む'}
            </Link>
          )}
        </div>
      </header>

      <article
        className="prose prose-neutral max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-8 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span key={tag} className="text-xs text-accent-dark">
            #{tag}
          </span>
        ))}
      </div>
    </main>
  );
}
