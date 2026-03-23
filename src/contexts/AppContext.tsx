'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import translations, { type Lang, type Theme } from '@/i18n';

interface AppCtx {
  lang: Lang;
  theme: Theme;
  toggleLang: () => void;
  toggleTheme: () => void;
  t: typeof translations['ar'];
  dir: 'rtl' | 'ltr';
}

const AppContext = createContext<AppCtx>({
  lang: 'ar', theme: 'dark',
  toggleLang: () => {}, toggleTheme: () => {},
  t: translations.ar, dir: 'rtl',
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ar');
  const [theme, setTheme] = useState<Theme>('dark');

  // Load saved preferences once mounted
  useEffect(() => {
    const l = (localStorage.getItem('ezzo-lang') as Lang) ?? 'ar';
    const th = (localStorage.getItem('ezzo-theme') as Theme) ?? 'dark';
    setLang(l);
    setTheme(th);
  }, []);

  // Apply lang to html element
  useEffect(() => {
    localStorage.setItem('ezzo-lang', lang);
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Apply theme class to html element
  useEffect(() => {
    localStorage.setItem('ezzo-theme', theme);
    const html = document.documentElement;
    html.classList.toggle('light-mode', theme === 'light');
  }, [theme]);

  return (
    <AppContext.Provider value={{
      lang, theme,
      toggleLang: () => setLang(p => p === 'ar' ? 'en' : 'ar'),
      toggleTheme: () => setTheme(p => p === 'dark' ? 'light' : 'dark'),
      t: translations[lang],
      dir: lang === 'ar' ? 'rtl' : 'ltr',
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
