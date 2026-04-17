import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'portfolio-site',
    title: 'Portfolio Site',
    description: {
      ja: 'TypeScript・React・Tailwind CSSで構築したエンジニアポートフォリオ。日英対応・ダーク/ライトモード対応。',
      en: 'Engineer portfolio built with TypeScript, React, and Tailwind CSS. Supports Japanese/English and dark/light mode.',
    },
    longDescription: {
      ja: 'TypeScript・React・Tailwind CSSを用いて構築した個人ポートフォリオサイトです。日本語・英語の切り替えに対応しており、ダークモード・ライトモードの切り替え機能も実装しています。GitHub Pagesにデプロイし、GitHub Actionsによる自動デプロイも設定しています。スキルページ・成果物ページ・ブログ機能・お問い合わせフォームを備えています。',
      en: 'A personal portfolio site built with TypeScript, React, and Tailwind CSS. It supports language switching between Japanese and English, and includes a dark/light mode toggle. Deployed to GitHub Pages with automatic deployment via GitHub Actions. Features a skills page, products page, blog, and contact form.',
    },
    status: 'in-progress',
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Vite', 'Claude'],
    githubUrl: 'https://github.com/HarutarouKawamoto/HarutarouKawamoto.github.io',
    order: 1,
  },
];
