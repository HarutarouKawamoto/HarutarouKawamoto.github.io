import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import type { BlogPost, BlogCategory, Lang } from '../types';

const WORDS_PER_MINUTE = 300;

export function calcReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function extractSlugFromFilename(filename: string): string {
  // YYYY-MM-DD-{slug}.md → {slug}
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown);
  return String(result);
}

// ビルド時に import.meta.glob でMarkdownファイルを読み込む
const jaModules = import.meta.glob('/src/posts/ja/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const enModules = import.meta.glob('/src/posts/en/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export function parseModules(modules: Record<string, string>, lang: Lang): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [path, raw] of Object.entries(modules)) {
    const filename = path.split('/').pop() ?? '';
    const slug = extractSlugFromFilename(filename);
    const { data, content } = matter(raw);

    if (data.draft === true) continue;

    posts.push({
      slug,
      title: data.title as string,
      date: data.date as string,
      category: data.category as BlogCategory,
      tags: (data.tags as string[]) ?? [],
      summary: data.summary as string,
      lang,
      translationSlug: data.translationSlug as string | undefined,
      draft: data.draft as boolean | undefined,
      content: '',
      readingTime: calcReadingTime(content),
    });
  }

  return posts;
}

let postsCache: { ja: BlogPost[]; en: BlogPost[] } | null = null;

function getPostsSync(): { ja: BlogPost[]; en: BlogPost[] } {
  if (postsCache) return postsCache;
  postsCache = {
    ja: parseModules(jaModules, 'ja'),
    en: parseModules(enModules, 'en'),
  };
  return postsCache;
}

export function getAllPosts(lang: Lang): BlogPost[] {
  const posts = getPostsSync()[lang];
  return sortPosts(posts);
}

export function getPostBySlug(lang: Lang, slug: string): BlogPost | undefined {
  return getPostsSync()[lang].find((p) => p.slug === slug);
}

export async function getPostWithContent(lang: Lang, slug: string): Promise<BlogPost | undefined> {
  const modules = lang === 'ja' ? jaModules : enModules;

  for (const [path, raw] of Object.entries(modules)) {
    const filename = path.split('/').pop() ?? '';
    const s = extractSlugFromFilename(filename);
    if (s !== slug) continue;

    const { data, content } = matter(raw);
    if (data.draft === true) return undefined;

    const html = await markdownToHtml(content);

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      category: data.category as BlogCategory,
      tags: (data.tags as string[]) ?? [],
      summary: data.summary as string,
      lang,
      translationSlug: data.translationSlug as string | undefined,
      draft: data.draft as boolean | undefined,
      content: html,
      readingTime: calcReadingTime(content),
    };
  }

  return undefined;
}

export function sortPosts(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function filterByCategory(posts: BlogPost[], category: BlogCategory | null): BlogPost[] {
  if (!category) return posts;
  return posts.filter((p) => p.category === category);
}

export function filterByTag(posts: BlogPost[], tag: string | null): BlogPost[] {
  if (!tag) return posts;
  return posts.filter((p) => p.tags.includes(tag));
}

export function paginatePosts(
  posts: BlogPost[],
  page: number,
  perPage = 10
): { posts: BlogPost[]; totalPages: number } {
  const totalPages = Math.max(1, Math.ceil(posts.length / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  return { posts: posts.slice(start, start + perPage), totalPages };
}

export function getAllTags(posts: BlogPost[]): string[] {
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) tagSet.add(tag);
  }
  return Array.from(tagSet).sort();
}
