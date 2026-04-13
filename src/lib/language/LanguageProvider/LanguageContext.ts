import { createContext } from 'react';
import type { LanguageCode, Language } from '../languages';

export interface LanguageContextType {
    currentLanguage: Language;
    changeLanguage: (code: LanguageCode) => void;
    languages: Language[];
}

export const LanguageContext = createContext<LanguageContextType | null>(null);
