import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import sk from './translations/sk.json';
import en from './translations/en.json';

/**
 * i18n setup for the /weby landing page. It is a separate Vite entry from the
 * portfolio, so it initializes the global i18next instance with its own copy —
 * the two pages never load together. Mirrors src/lib/language/i18n.ts (same
 * `language` localStorage key, so the choice carries across both sites), except
 * the initial language also falls back to the page's <html lang> attribute.
 */
const SUPPORTED = ['sk', 'en'] as const;
const DEFAULT_LANGUAGE = 'sk';
const STORAGE_KEY = 'language';

const isSupported = (value: string | null): value is (typeof SUPPORTED)[number] =>
    !!value && (SUPPORTED as readonly string[]).includes(value);

function resolveInitialLanguage(): string {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (isSupported(stored)) return stored;
    } catch {
        /* localStorage unavailable — fall through */
    }
    const htmlLang = document.documentElement.lang;
    return isSupported(htmlLang) ? htmlLang : DEFAULT_LANGUAGE;
}

i18n.use(initReactI18next).init({
    resources: {
        sk: { translation: sk },
        en: { translation: en },
    },
    lng: resolveInitialLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
        escapeValue: false,
    },
});

i18n.on('languageChanged', (lng) => {
    try {
        localStorage.setItem(STORAGE_KEY, lng);
    } catch {
        /* localStorage unavailable — ignore */
    }
});

export default i18n;
