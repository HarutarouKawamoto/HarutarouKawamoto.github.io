import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'portfolio-site',
    title: 'Portfolio-Blog Site',
    description: {
      ja: '本サイトそのものです。TypeScript・React・Tailwind CSSで構築したエンジニアポートフォリオ。日英対応・ダーク/ライトモード対応。',
      en: 'This is the very site you are viewing. Engineer portfolio built with TypeScript, React, and Tailwind CSS. Supports Japanese/English and dark/light mode.',
    },
    longDescription: {
      ja: 'このサイトが作品です。\nTypeScript・React・Tailwind CSSを用いて構築した個人ポートフォリオサイトです。\n日本語・英語の切り替えに対応しており、ダークモード・ライトモードの切り替え機能も実装しています。\nGitHub Pagesにデプロイし、GitHub Actionsによる自動デプロイも設定しています。\nスキルページ・成果物ページ・ブログ機能・お問い合わせフォームを備えています。',
      en: 'This site itself is the product you are looking at.\nA personal portfolio site built with TypeScript, React, and Tailwind CSS.\nIt supports language switching between Japanese and English, and includes a dark/light mode toggle.\nDeployed to GitHub Pages with automatic deployment via GitHub Actions.\nFeatures a skills page, products page, blog, and contact form.',
    },
    imageUrl: '/images/portfolio-site-screenshot.png',
    status: 'completed',
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Vite', 'Claude'],
    githubUrl: 'https://github.com/HarutarouKawamoto/HarutarouKawamoto.github.io',
    order: 1,
  },
  {
    id: 'kudos-loop',
    title: 'Kudos-Loop',
    description: {
      ja: 'チームの心理的安全性を高める「褒めちぎり駆動開発」支援ツール。称賛（Kudos）の循環でエンジニアチームの課題を解決するWebアプリ。',
      en: 'A "Praise-Driven Development" tool to enhance psychological safety in engineering teams through a cycle of kudos and recognition.',
    },
    longDescription: {
      ja: 'チームの心理的安全性を高めることを目的とした「褒めちぎり駆動開発」支援ツールです。\n「コードレビューが殺伐とする」「感謝を伝えるタイミングがない」といったエンジニアチームの課題を、称賛（Kudos）の循環によって解決するためのWebアプリケーションです。\n日々の小さな貢献を「バッジ」と「コメント」で可視化し、チーム内にポジティブなフィードバックのループを生み出すことを目的としています。\nコンセプトはPDD（Praise-Driven Development）——「褒められて伸びる」を仕組み化し、技術的な成長とチームの結束を同時に促進します。',
      en: 'A "Praise-Driven Development" support tool designed to enhance psychological safety within engineering teams.\nIt addresses common team challenges — such as harsh code reviews and a lack of timely appreciation — through a cycle of kudos and recognition.\nSmall daily contributions are visualized through badges and comments, creating a positive feedback loop within the team.\nBuilt on the concept of PDD (Praise-Driven Development): systematizing the idea that people grow when they are praised, fostering both technical growth and team cohesion.',
    },
    imageUrl: '/images/kudosloopimage1.png',
    status: 'in-progress',
    tags: ['Next.js (App Router)', 'NestJS', 'TypeScript', 'PostgreSQL', 'Docker', 'Docker Compose', 'GitHub Actions'],
    githubUrl: 'https://github.com/HarutarouKawamoto/kudos-loop',
    order: 2,
  },
];
