import type { Skill } from '../types';

export const skills: Skill[] = [
  // Languages
  { id: 'typescript', name: 'TypeScript', category: 'language', level: 3 },
  { id: 'javascript', name: 'JavaScript', category: 'language', level: 4 },
  { id: 'python', name: 'Python', category: 'language', level: 3 },
  { id: 'sql', name: 'SQL', category: 'language', level: 2 },
  { id: 'html-css', name: 'HTML / CSS', category: 'language', level: 4 },
  { id: 'java', name: 'Java', category: 'language', level: 1 },
  { id: 'cpp', name: 'C++', category: 'language', level: 1 },
  { id: 'c', name: 'C', category: 'language', level: 1 },
  { id: 'php', name: 'PHP', category: 'language', level: 1 },

  // Frameworks — linked to parent language
  { id: 'react', name: 'React', category: 'framework', parentLanguage: 'typescript' },
  { id: 'nextjs', name: 'Next.js (App Router)', category: 'framework', parentLanguage: 'typescript' },
  { id: 'nestjs', name: 'NestJS', category: 'framework', parentLanguage: 'typescript' },
  { id: 'prisma', name: 'Prisma 6', category: 'framework', parentLanguage: 'typescript' },
  { id: 'tailwind-merge', name: 'tailwind-merge', category: 'framework', parentLanguage: 'typescript' },
  { id: 'zod', name: 'Zod', category: 'framework', parentLanguage: 'typescript' },
  { id: 'clsx', name: 'clsx', category: 'framework', parentLanguage: 'typescript' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'framework', parentLanguage: 'typescript' },
  { id: 'nodejs', name: 'Node.js', category: 'framework', parentLanguage: 'javascript', level: 3 },
  { id: 'express', name: 'Express', category: 'framework', parentLanguage: 'javascript' },
  { id: 'fastapi', name: 'FastAPI', category: 'framework', parentLanguage: 'python' },
  { id: 'django', name: 'Django', category: 'framework', parentLanguage: 'python' },
  { id: 'laravel', name: 'Laravel', category: 'framework', parentLanguage: 'php' },

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
