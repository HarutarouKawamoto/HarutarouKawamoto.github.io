type Theme = 'dark' | 'light';

export function detectInitialTheme(): Theme {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') return saved;

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';

  return 'light';
}

export function saveTheme(theme: Theme): void {
  localStorage.setItem('theme', theme);
}

export function applyTheme(theme: Theme): void {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
