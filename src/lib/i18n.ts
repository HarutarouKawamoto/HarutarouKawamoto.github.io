import type { Lang } from '../types';

export function detectInitialLanguage(): Lang {
  const saved = localStorage.getItem('lang');
  if (saved === 'ja' || saved === 'en') return saved;

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('ja')) return 'ja';

  return 'en';
}

export function saveLang(lang: Lang): void {
  localStorage.setItem('lang', lang);
}
