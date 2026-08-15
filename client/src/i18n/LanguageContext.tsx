import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { translations, type Locale, type Messages } from './translations';

const LOCALE_STORAGE_KEY = 'locale';

const SUPPORTED_LOCALES: readonly Locale[] = ['en', 'vi'];

function isLocale(value: string | null): value is Locale {
  return value !== null && SUPPORTED_LOCALES.includes(value as Locale);
}

function resolveInitialLocale(): Locale {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(stored)) return stored;
    const browser = window.navigator.language.slice(0, 2);
    if (browser === 'vi') return 'vi';
  }
  return 'en';
}

interface LanguageContextValue {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(resolveInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((current) => (current === 'en' ? 'vi' : 'en'));
  }, []);

  const messages = useMemo(() => translations[locale], [locale]);

  const value = useMemo(
    () => ({ locale, messages, setLocale, toggleLocale }),
    [locale, messages, setLocale, toggleLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
