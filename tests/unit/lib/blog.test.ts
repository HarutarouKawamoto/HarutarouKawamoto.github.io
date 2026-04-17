import { describe, it, expect } from 'vitest';
import {
  calcReadingTime,
  extractSlugFromFilename,
  markdownToHtml,
  parseModules,
  getAllPosts,
  getPostBySlug,
  getPostWithContent,
  sortPosts,
  filterByCategory,
  filterByTag,
  paginatePosts,
  getAllTags,
} from '../../../src/lib/blog';
import type { BlogPost } from '../../../src/types';

function makePost(overrides: Partial<BlogPost>): BlogPost {
  return {
    slug: 'test-slug',
    title: 'Test',
    date: '2026-04-17',
    category: 'Learn',
    tags: [],
    summary: 'Summary',
    lang: 'ja',
    content: '',
    readingTime: 1,
    ...overrides,
  };
}

describe('calcReadingTime', () => {
  it('空文字は1分を返す', () => {
    expect(calcReadingTime('')).toBe(1);
  });

  it('300単語で1分を返す', () => {
    const words = Array.from({ length: 300 }, (_, i) => `word${i}`).join(' ');
    expect(calcReadingTime(words)).toBe(1);
  });

  it('600単語で2分を返す', () => {
    const words = Array.from({ length: 600 }, (_, i) => `word${i}`).join(' ');
    expect(calcReadingTime(words)).toBe(2);
  });
});

describe('extractSlugFromFilename', () => {
  it('日付プレフィックスと拡張子を除去する', () => {
    expect(extractSlugFromFilename('2026-04-17-hello-world.md')).toBe('hello-world');
  });

  it('日付プレフィックスなしの場合は拡張子のみ除去する', () => {
    expect(extractSlugFromFilename('hello-world.md')).toBe('hello-world');
  });
});

describe('sortPosts', () => {
  it('日付降順で並び替える', () => {
    const posts = [
      makePost({ slug: 'a', date: '2026-01-01' }),
      makePost({ slug: 'b', date: '2026-04-17' }),
      makePost({ slug: 'c', date: '2026-02-15' }),
    ];
    const sorted = sortPosts(posts);
    expect(sorted.map((p) => p.slug)).toEqual(['b', 'c', 'a']);
  });
});

describe('filterByCategory', () => {
  const posts = [
    makePost({ slug: 'a', category: 'Learn' }),
    makePost({ slug: 'b', category: 'New' }),
    makePost({ slug: 'c', category: 'Learn' }),
  ];

  it('指定カテゴリの記事のみ返す', () => {
    const result = filterByCategory(posts, 'Learn');
    expect(result.map((p) => p.slug)).toEqual(['a', 'c']);
  });

  it('nullの場合は全記事を返す', () => {
    expect(filterByCategory(posts, null)).toHaveLength(3);
  });
});

describe('filterByTag', () => {
  const posts = [
    makePost({ slug: 'a', tags: ['TypeScript', 'React'] }),
    makePost({ slug: 'b', tags: ['React'] }),
    makePost({ slug: 'c', tags: ['TypeScript'] }),
  ];

  it('指定タグを持つ記事のみ返す', () => {
    const result = filterByTag(posts, 'TypeScript');
    expect(result.map((p) => p.slug)).toEqual(['a', 'c']);
  });

  it('nullの場合は全記事を返す', () => {
    expect(filterByTag(posts, null)).toHaveLength(3);
  });
});

describe('paginatePosts', () => {
  const posts = Array.from({ length: 25 }, (_, i) =>
    makePost({ slug: `post-${i}`, date: `2026-01-${String(i + 1).padStart(2, '0')}` })
  );

  it('1ページ目は先頭10件を返す', () => {
    const { posts: result, totalPages } = paginatePosts(posts, 1, 10);
    expect(result).toHaveLength(10);
    expect(totalPages).toBe(3);
    expect(result[0].slug).toBe('post-0');
  });

  it('3ページ目は残り5件を返す', () => {
    const { posts: result } = paginatePosts(posts, 3, 10);
    expect(result).toHaveLength(5);
  });

  it('空配列はtotalPages=1を返す', () => {
    const { posts: result, totalPages } = paginatePosts([], 1, 10);
    expect(result).toHaveLength(0);
    expect(totalPages).toBe(1);
  });
});

describe('getAllTags', () => {
  it('全記事からユニークなタグをソートして返す', () => {
    const posts = [
      makePost({ tags: ['TypeScript', 'React'] }),
      makePost({ tags: ['React', 'Vite'] }),
    ];
    expect(getAllTags(posts)).toEqual(['React', 'TypeScript', 'Vite']);
  });
});

describe('parseModules', () => {
  const jaRaw = `---
title: "テスト記事"
date: "2026-04-17"
category: "Learn"
tags: ["TypeScript"]
summary: "テスト概要"
lang: "ja"
---
# テスト
本文テスト。`;

  const draftRaw = `---
title: "下書き記事"
date: "2026-04-17"
category: "New"
tags: []
summary: "下書き"
lang: "ja"
draft: true
---
下書き本文。`;

  it('フロントマターを正しく解析してBlogPostを返す', () => {
    const modules = { '/src/posts/ja/2026-04-17-test-post.md': jaRaw };
    const posts = parseModules(modules, 'ja');
    expect(posts).toHaveLength(1);
    expect(posts[0].slug).toBe('test-post');
    expect(posts[0].title).toBe('テスト記事');
    expect(posts[0].category).toBe('Learn');
    expect(posts[0].tags).toEqual(['TypeScript']);
    expect(posts[0].lang).toBe('ja');
  });

  it('draft: true の記事は除外する', () => {
    const modules = {
      '/src/posts/ja/2026-04-17-test.md': jaRaw,
      '/src/posts/ja/2026-04-17-draft.md': draftRaw,
    };
    const posts = parseModules(modules, 'ja');
    expect(posts).toHaveLength(1);
    expect(posts[0].slug).toBe('test');
  });

  it('空のモジュールオブジェクトで空配列を返す', () => {
    expect(parseModules({}, 'ja')).toEqual([]);
  });

  it('readingTime が 1以上であることを確認する', () => {
    const modules = { '/src/posts/ja/2026-04-17-test.md': jaRaw };
    const posts = parseModules(modules, 'ja');
    expect(posts[0].readingTime).toBeGreaterThanOrEqual(1);
  });
});

describe('markdownToHtml', () => {
  it('見出しをHTMLに変換する', async () => {
    const html = await markdownToHtml('# Hello');
    expect(html).toContain('<h1>Hello</h1>');
  });

  it('段落をHTMLに変換する', async () => {
    const html = await markdownToHtml('World');
    expect(html).toContain('<p>World</p>');
  });

  it('XSS scriptタグをサニタイズする', async () => {
    const html = await markdownToHtml('<script>alert("xss")</script>');
    expect(html).not.toContain('<script>');
  });

  it('インラインコードをHTMLに変換する', async () => {
    const html = await markdownToHtml('`const x = 1`');
    expect(html).toContain('<code>');
  });

  it('GFMテーブルをHTMLに変換する', async () => {
    const md = '| a | b |\n|---|---|\n| 1 | 2 |';
    const html = await markdownToHtml(md);
    expect(html).toContain('<table>');
  });
});

describe('getAllPosts', () => {
  it('配列を返す（テスト環境では0件以上）', () => {
    const posts = getAllPosts('ja');
    expect(Array.isArray(posts)).toBe(true);
  });

  it('enを指定しても配列を返す', () => {
    const posts = getAllPosts('en');
    expect(Array.isArray(posts)).toBe(true);
  });

  it('返った記事は日付降順で並んでいる', () => {
    const posts = getAllPosts('ja');
    for (let i = 1; i < posts.length; i++) {
      expect(posts[i - 1].date >= posts[i].date).toBe(true);
    }
  });
});

describe('getPostBySlug', () => {
  it('存在しないスラッグはundefinedを返す', () => {
    expect(getPostBySlug('ja', '__nonexistent_slug__')).toBeUndefined();
  });

  it('enで存在しないスラッグはundefinedを返す', () => {
    expect(getPostBySlug('en', '__nonexistent__')).toBeUndefined();
  });
});

describe('getPostWithContent', () => {
  it('存在しないスラッグはundefinedを返す', async () => {
    const result = await getPostWithContent('ja', '__nonexistent__');
    expect(result).toBeUndefined();
  });

  it('enで存在しないスラッグはundefinedを返す', async () => {
    const result = await getPostWithContent('en', '__nonexistent__');
    expect(result).toBeUndefined();
  });
});
