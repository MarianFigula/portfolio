export const LanguageCode = {
    EN: 'en',
    SK: 'sk',
} as const;

export type LanguageCode = (typeof LanguageCode)[keyof typeof LanguageCode];

export const LanguageLabel = {
    EN: 'English',
    SK: 'Slovenčina',
} as const;

export type LanguageLabel = (typeof LanguageLabel)[keyof typeof LanguageLabel];

export interface Language {
    code: LanguageCode;
    label: LanguageLabel;
}

export const languages: Language[] = [
    { code: LanguageCode.EN, label: LanguageLabel.EN },
    { code: LanguageCode.SK, label: LanguageLabel.SK },
];

export const DEFAULT_LANGUAGE = LanguageCode.EN;
