'use client';

// =============================================================================
// NEki Store — Language Context (ID / EN)
// =============================================================================

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { type Locale, type Translations, getTranslations } from '@/lib/i18n/translations';

// ---------------------------------------------------------------------------
// Cookie Helpers
// ---------------------------------------------------------------------------
function setCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('id');
  const [t, setT] = useState<Translations>(getTranslations('id'));

  // Load language from cookie on mount
  useEffect(() => {
    const storedLocale = getCookie('x-locale') as Locale;
    if (storedLocale && (storedLocale === 'id' || storedLocale === 'en')) {
      setLocaleState(storedLocale);
      setT(getTranslations(storedLocale));
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setCookie('x-locale', newLocale);
    setLocaleState(newLocale);
    setT(getTranslations(newLocale));

    // Update HTML lang attribute
    document.documentElement.lang = newLocale;
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a <LanguageProvider>');
  }
  return ctx;
}
