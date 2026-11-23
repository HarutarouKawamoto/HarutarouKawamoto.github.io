import type { Skill } from '../types';

export const skills: Skill[] = [
  // Languages — 自己評価の星ではなく「作ったもの」で示す（評価基準は個人の記録に移した）
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'language',
    capabilities: {
      ja: ['SumiRE の画面（Vite）', 'このポートフォリオ（React）', 'Kudos-Loop（Next.js + NestJS）'],
      en: ['SumiRE UI (Vite)', 'This portfolio (React)', 'Kudos-Loop (Next.js + NestJS)'],
    },
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'language',
    capabilities: {
      ja: [
        'HanaME・SumiRE のローカルサーバー（ファイルの読み書き・変更通知・セキュリティ対策）',
        'Discord BOT（discord.js + Gemini API）',
      ],
      en: [
        'Local servers for HanaME and SumiRE (file I/O, change notifications, security hardening)',
        'Discord bot (discord.js + Gemini API)',
      ],
    },
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'language',
    capabilities: {
      ja: ['Kudos-Loop の DB 設計（PostgreSQL + Prisma）', 'ER 図での設計'],
      en: ['Database design for Kudos-Loop (PostgreSQL + Prisma)', 'Designing with ER diagrams'],
    },
  },
  {
    id: 'python',
    name: 'Python',
    category: 'language',
    capabilities: {
      ja: ['Discord の AI チャット BOT', 'Google カレンダーと連携した自動化スクリプト'],
      en: ['AI chat bot for Discord', 'Automation scripts integrated with Google Calendar'],
    },
  },
  {
    id: 'html-css',
    name: 'HTML / CSS',
    category: 'language',
    capabilities: {
      ja: ['このポートフォリオ（Tailwind CSS）', 'HanaME・SumiRE の紹介サイト'],
      en: ['This portfolio (Tailwind CSS)', 'Landing sites for HanaME and SumiRE'],
    },
  },
  {
    id: 'java',
    name: 'Java',
    category: 'language',
    isLearning: true,
    capabilities: { ja: ['Spring'], en: ['Spring'] },
  },

  // Frameworks — linked to parent language
  { id: 'react', name: 'React', category: 'framework', parentLanguage: 'typescript' },
  { id: 'nextjs', name: 'Next.js (App Router)', category: 'framework', parentLanguage: 'typescript' },
  { id: 'nestjs', name: 'NestJS', category: 'framework', parentLanguage: 'typescript' },
  { id: 'prisma', name: 'Prisma 6', category: 'framework', parentLanguage: 'typescript' },
  { id: 'tailwind-merge', name: 'tailwind-merge', category: 'framework', parentLanguage: 'typescript' },
  { id: 'zod', name: 'Zod', category: 'framework', parentLanguage: 'typescript' },
  { id: 'clsx', name: 'clsx', category: 'framework', parentLanguage: 'typescript' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'framework', parentLanguage: 'typescript' },
  { id: 'nodejs', name: 'Node.js', category: 'framework', parentLanguage: 'javascript' },
  { id: 'express', name: 'Express', category: 'framework', parentLanguage: 'javascript' },
  { id: 'fastapi', name: 'FastAPI', category: 'framework', parentLanguage: 'python' },
  { id: 'django', name: 'Django', category: 'framework', parentLanguage: 'python' },

  // Databases
  { id: 'mysql', name: 'MySQL', category: 'db', parentLanguage: 'sql' },
  { id: 'sqlite', name: 'SQLite', category: 'db', parentLanguage: 'sql' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'db', parentLanguage: 'sql' },

  // Tools
  { id: 'cmd', name: 'CMD', category: 'tool' },
  { id: 'git', name: 'Git', category: 'tool' },
  { id: 'github-actions', name: 'GitHub Actions', category: 'tool' },
  { id: 'github-cli', name: 'GitHub CLI', category: 'tool' },
  { id: 'vite', name: 'Vite', category: 'tool' },
  { id: 'claude-cli', name: 'Claude CLI', category: 'tool' },
  { id: 'gemini-cli', name: 'Gemini CLI', category: 'tool' },
  { id: 'obsidian', name: 'Obsidian', category: 'tool' },
  { id: 'anki-api', name: 'ANKI API', category: 'tool' },
  { id: 'gemini-api', name: 'Gemini API', category: 'tool' },
  { id: 'openai-api', name: 'OpenAI API', category: 'tool' },
  { id: 'discord-dev', name: 'Discord Developer Portal', category: 'tool' },
  { id: 'vscode', name: 'VSCode', category: 'tool' },
  { id: 'jwt', name: 'JWT', category: 'tool' },
  { id: 'bcrypt', name: 'bcrypt', category: 'tool' },
  { id: 'docker', name: 'Docker', category: 'tool' },
  { id: 'docker-compose', name: 'Docker Compose', category: 'tool' },
  { id: 'postman', name: 'Postman', category: 'tool' },
  { id: 'formspree', name: 'Formspree', category: 'tool' },

  // Certifications
  {
    id: 'fe-exam',
    name: '基本情報技術者試験',
    category: 'certification',
    acquiredDate: '2026年1月',
  },
];
