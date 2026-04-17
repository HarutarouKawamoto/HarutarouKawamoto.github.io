import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'portfolio-site',
    title: 'Portfolio Site',
    description: {
      ja: 'TypeScript・React・Tailwind CSSで構築したエンジニアポートフォリオ。日英対応・ダーク/ライトモード対応。',
      en: 'Engineer portfolio built with TypeScript, React, and Tailwind CSS. Supports Japanese/English and dark/light mode.',
    },
    status: 'in-progress',
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/HarutarouKawamoto/HarutarouKawamoto.github.io',
    order: 1,
  },
];
