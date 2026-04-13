import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { languages, DEFAULT_LANGUAGE, LanguageCode } from '../languages';
import { LanguageContext } from './LanguageContext';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const { i18n } = useTranslation();

    const currentLanguage =
        languages.find((l) => l.code === i18n.language) ??
        languages.find((l) => l.code === DEFAULT_LANGUAGE)!;

    const changeLanguage = useCallback(
        (code: LanguageCode) => {
            i18n.changeLanguage(code);
        },
        [i18n],
    );

    return (
        <LanguageContext.Provider value={{ currentLanguage, changeLanguage, languages }}>
            {children}
        </LanguageContext.Provider>
    );
}
