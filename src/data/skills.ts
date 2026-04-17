import type { Skill } from '../types';

export const skills: Skill[] = [
  // Languages
  { id: 'typescript', name: 'TypeScript', category: 'language', level: 4 },
  { id: 'javascript', name: 'JavaScript', category: 'language', level: 4 },
  { id: 'python', name: 'Python', category: 'language', level: 3 },
  { id: 'sql', name: 'SQL', category: 'language', level: 3 },

  // Frameworks — linked to parent language
  { id: 'react', name: 'React', category: 'framework', parentLanguage: 'typescript' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'framework', parentLanguage: 'typescript' },
  { id: 'nodejs', name: 'Node.js', category: 'framework', parentLanguage: 'javascript', level: 3 },
  { id: 'fastapi', name: 'FastAPI', category: 'framework', parentLanguage: 'python' },

  // Databases
  { id: 'mysql', name: 'MySQL', category: 'db', parentLanguage: 'sql' },
  { id: 'sqlite', name: 'SQLite', category: 'db', parentLanguage: 'sql' },

  // Tools
  { id: 'git', name: 'Git', category: 'tool' },
  { id: 'github-actions', name: 'GitHub Actions', category: 'tool' },
  { id: 'vite', name: 'Vite', category: 'tool' },

  // Certifications
  {
    id: 'fe-exam',
    name: '基本情報技術者試験',
    category: 'certification',
    acquiredDate: '2026年1月',
  },
];
