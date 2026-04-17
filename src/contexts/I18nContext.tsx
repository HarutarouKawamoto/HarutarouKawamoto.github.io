import { createContext, useContext, useCallback, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Lang, LocaleData } from '../types';
import { saveLang } from '../lib/i18n';
import ja from '../locales/ja.json';
import en from '../locales/en.json';

const locales: Record<Lang, LocaleData> = { ja: ja as LocaleData, en: en as LocaleData };

interface I18nContextValue {
  lang: Lang;
  t: LocaleData;
  switchLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const { lang: paramLang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const currentLang: Lang = paramLang === 'en' ? 'en' : 'ja';

  const switchLang = useCallback(
    (newLang: Lang) => {
      saveLang(newLang);
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(/^\/(ja|en)/, `/${newLang}`);
      navigate(newPath === currentPath ? `/${newLang}/` : newPath);
    },
    [navigate]
  );

  return (
    <I18nContext.Provider value={{ lang: currentLang, t: locales[currentLang], switchLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
