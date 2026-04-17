import { useState, useEffect } from 'react';
import { useI18n } from '../../../contexts/I18nContext';
import { BlogCard } from '../../../components/BlogCard';
import { getAllPosts, filterByCategory, filterByTag, getAllTags } from '../../../lib/blog';
import type { BlogCategory, BlogPost } from '../../../types';

const BLOG_CATEGORIES: BlogCategory[] = ['Featured', 'New', 'Learn', 'Enjoy', 'Real'];
const SECTION_CATEGORIES: BlogCategory[] = ['New', 'Learn', 'Enjoy', 'Real'];
const INITIAL_VISIBLE = 4;
const LOAD_MORE_COUNT = 4;

interface CategorySectionProps {
  category: BlogCategory;
  label: string;
  posts: BlogPost[];
  filterKey: string;
}

function CategorySection({ category, label, posts, filterKey }: CategorySectionProps) {
  const { t } = useI18n();
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  // フィルター変更時に表示件数をリセット
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [filterKey]);

  if (posts.length === 0) return null;

  const heroPost = posts[0];
  const gridPosts = posts.slice(1, visibleCount);
  const hasMore = posts.length > visibleCount;

  return (
    <section aria-labelledby={`section-${category}`} className="mt-16">
      <h2
        id={`section-${category}`}
        className="mb-6 text-xl font-[550] tracking-tight text-neutral-950 dark:text-white"
      >
        {label}
      </h2>
      <BlogCard post={heroPost} variant="hero" />
      {(gridPosts.length > 0 || hasMore) && (
        <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {gridPosts.map((post) => (
            <li key={post.slug} className="flex">
              <BlogCard post={post} />
            </li>
          ))}
          {hasMore && (
            <li className="flex">
              <button
                onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
                className="flex min-h-[180px] w-full flex-col items-center justify-center gap-3 rounded-xl bg-neutral-50 ring-1 ring-neutral-950/10 transition-colors hover:bg-neutral-100 dark:bg-neutral-900/50 dark:ring-white/10 dark:hover:bg-neutral-800"
              >
                <span className="text-2xl leading-none text-neutral-400 dark:text-neutral-500">+</span>
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  {t.blog.showMore}
                </span>
              </button>
            </li>
          )}
        </ul>
      )}
    </section>
  );
}

export function BlogList() {
  const { lang, t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [topVisibleCount, setTopVisibleCount] = useState(INITIAL_VISIBLE);
  const [featuredVisibleCount, setFeaturedVisibleCount] = useState(INITIAL_VISIBLE);

  const allPosts = getAllPosts(lang);
  const tags = getAllTags(allPosts);

  let filtered = filterByCategory(allPosts, selectedCategory);
  filtered = filterByTag(filtered, selectedTag);

  const filterKey = `${selectedCategory ?? ''}-${selectedTag ?? ''}`;

  const featuredPosts = filterByCategory(allPosts, 'Featured');
  const featuredGrid = featuredPosts.slice(0, featuredVisibleCount);
  const featuredHasMore = featuredPosts.length > featuredVisibleCount;

  const topHero = filtered[0] ?? null;
  const topGrid = filtered.slice(1, topVisibleCount);
  const topHasMore = filtered.length > topVisibleCount;

  const handleCategoryChange = (cat: BlogCategory | null) => {
    setSelectedCategory(cat);
    setTopVisibleCount(INITIAL_VISIBLE);
  };

  const handleTagChange = (tag: string | null) => {
    setSelectedTag(tag === selectedTag ? null : tag);
    setTopVisibleCount(INITIAL_VISIBLE);
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <p className="mb-3 font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
        {t.blog.eyebrow}
      </p>
      <h1 className="mb-8 text-3xl font-[550] tracking-tight text-neutral-950 md:text-4xl dark:text-white">
        {t.blog.title}
      </h1>

      {/* 特集グリッド */}
      {featuredPosts.length > 0 && (
        <ul className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredGrid.map((post) => (
            <li key={post.slug} className="flex">
              <BlogCard post={post} />
            </li>
          ))}
          {featuredHasMore && (
            <li className="flex">
              <button
                onClick={() => setFeaturedVisibleCount((c) => c + LOAD_MORE_COUNT)}
                className="flex min-h-[180px] w-full flex-col items-center justify-center gap-3 rounded-xl bg-neutral-50 ring-1 ring-neutral-950/10 transition-colors hover:bg-neutral-100 dark:bg-neutral-900/50 dark:ring-white/10 dark:hover:bg-neutral-800"
              >
                <span className="text-2xl leading-none text-neutral-400 dark:text-neutral-500">+</span>
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  {t.blog.showMore}
                </span>
              </button>
            </li>
          )}
        </ul>
      )}

      {/* Category filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-primary-light ${
            selectedCategory === null
              ? 'bg-primary text-white dark:bg-primary-light'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700'
          }`}
        >
          {t.blog.allCategory}
        </button>
        {BLOG_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-primary-light ${
              selectedCategory === cat
                ? 'bg-primary text-white dark:bg-primary-light'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700'
            }`}
          >
            {t.blog.categories[cat]}
          </button>
        ))}
      </div>

      {/* Tag filter */}
      {tags.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagChange(tag)}
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-accent-dark/20 text-accent-dark'
                  : 'text-accent-dark/50 hover:text-accent-dark'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">{t.blog.noPosts}</p>
      ) : (
        <>
          {/* トップセクション：全記事（日付降順） */}
          {topHero && <BlogCard post={topHero} variant="hero" />}
          {(topGrid.length > 0 || topHasMore) && (
            <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {topGrid.map((post) => (
                <li key={post.slug} className="flex">
                  <BlogCard post={post} />
                </li>
              ))}
              {topHasMore && (
                <li className="flex">
                  <button
                    onClick={() => setTopVisibleCount((c) => c + LOAD_MORE_COUNT)}
                    className="flex min-h-[180px] w-full flex-col items-center justify-center gap-3 rounded-xl bg-neutral-50 ring-1 ring-neutral-950/10 transition-colors hover:bg-neutral-100 dark:bg-neutral-900/50 dark:ring-white/10 dark:hover:bg-neutral-800"
                  >
                    <span className="text-2xl leading-none text-neutral-400 dark:text-neutral-500">+</span>
                    <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      {t.blog.showMore}
                    </span>
                  </button>
                </li>
              )}
            </ul>
          )}

          {/* カテゴリーセクション */}
          {SECTION_CATEGORIES.map((cat) => {
            const catPosts = filterByCategory(filtered, cat);
            return (
              <CategorySection
                key={cat}
                category={cat}
                label={t.blog.categories[cat]}
                posts={catPosts}
                filterKey={filterKey}
              />
            );
          })}
        </>
      )}
    </main>
  );
}
