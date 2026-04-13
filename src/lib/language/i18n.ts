import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../translations/en.json';
import sk from '../../translations/sk.json';
import { DEFAULT_LANGUAGE, LanguageCode } from './languages';

const STORAGE_KEY = 'language';

const savedLanguage = (localStorage.getItem(STORAGE_KEY) as LanguageCode) || DEFAULT_LANGUAGE;

i18n.use(initReactI18next).init({
    resources: {
        [LanguageCode.EN]: { translation: en },
        [LanguageCode.SK]: { translation: sk },
    },
    lng: savedLanguage,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
        escapeValue: false,
    },
});

i18n.on('languageChanged', (lng) => {
    localStorage.setItem(STORAGE_KEY, lng);
});

export default i18n;
