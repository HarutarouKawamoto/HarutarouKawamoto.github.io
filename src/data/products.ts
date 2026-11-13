import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'haname',
    title: 'HanaME',
    description: {
      ja: 'AI が書いた大量の .md を、要約せずに読み切るためのローカルビューア。分からない文にその場で質問を書き込み、まとめて AI に聞ける。',
      en: 'A local viewer for reading through piles of AI-written .md files without summarizing them. Write questions right on the sentences you don\'t understand, then ask AI about them all at once.',
    },
    longDescription: {
      ja: 'AI を使った開発では、レビュー・設計・調査の .md が次々に生成され、読む側が追い付かなくなります。\nHanaME（花見）は、分からない文をクリックして質問を書き込み、すべての質問を1つの指示文として AI に渡すローカルビューアです。AI の回答は .md に直接書き込まれ、画面がすぐ更新されます。\nAPI キーも課金も不要で、Claude Code・Codex・Cursor・ブラウザの AI チャットなど、いま使っている AI をそのまま使えます。\n質問と回答は .md に普通の引用として残るため、GitHub や他のエディタでもそのまま読めます。',
      en: 'In AI-assisted development, review, design, and research .md files pile up faster than anyone can read them.\nHanaME is a local viewer where you click a sentence you don\'t understand, write a question on it, and hand every question to AI as a single prompt. The answers are written straight into the .md files, and the screen updates immediately.\nNo API key or extra billing is needed: it works with the AI you already use, such as Claude Code, Codex, Cursor, or a browser-based AI chat.\nQuestions and answers stay in the .md files as ordinary blockquotes, so they read naturally on GitHub and in any other editor.',
    },
    imageUrl: '/images/haname-og.jpg',
    logoUrl: '/images/haname-logo.png',
    status: 'completed',
    tags: ['JavaScript', 'Node.js', 'markdown-it', 'highlight.js', 'Mermaid', 'Claude'],
    githubUrl: 'https://github.com/HarutarouKawamoto/haname',
    siteUrl: 'https://harutaroukawamoto.github.io/haname/',
    order: 1,
  },
  {
    id: 'sumire',
    title: 'SumiRE',
    description: {
      ja: '自分のプロジェクトのコードを、そのまま写経のお手本にするローカルのタイピングツール。薄く表示されたコードの上からなぞって、指で覚える。',
      en: 'A local typing tool that turns the code in your own project into tracing practice. Type over the faded code and learn it with your fingers.',
    },
    longDescription: {
      ja: 'AI が書いたコードは、読んで「分かった」つもりでも、何も見ずには書けません。\nSumiRE は、フォルダで「sumire」と打つだけで、中のスクリプトを写経のノートに変えるローカルツールです。薄く表示されたコードの上にそのまま打ち、インデント・空行・コメントは自動で飛ばします。\n打ち間違えた文字は赤く残り、Backspace で消して打ち直すタイプライター式です。ファイルは読むだけで、書き換えません。\n同じ作者の HanaME と対になるツールで、HanaME は .md を「頭で」理解し、SumiRE はコードを「指で」覚えます。',
      en: 'You may feel you understand AI-written code after reading it, yet still be unable to write it without looking.\nSumiRE is a local tool that turns the scripts in a folder into a tracing notebook — just type "sumire" in that folder. You type directly over the faded code, and indentation, blank lines, and comments are skipped automatically.\nMistyped characters stay red until you Backspace and retype them, typewriter-style. Files are only read, never modified.\nIt is a companion to HanaME by the same author: HanaME helps you understand .md files with your head, and SumiRE helps you learn code with your fingers.',
    },
    imageUrl: '/images/sumire-og.jpg',
    logoUrl: '/images/sumire-logo.webp',
    status: 'completed',
    tags: ['TypeScript', 'Vite', 'Node.js', 'Claude'],
    githubUrl: 'https://github.com/HarutarouKawamoto/sumire',
    siteUrl: 'https://harutaroukawamoto.github.io/sumire/',
    order: 2,
  },
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
    order: 4,
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
    order: 3,
  },
];
