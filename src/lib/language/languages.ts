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
    { code: LanguageCode.SK, label: LanguageLabel.SK },
    { code: LanguageCode.EN, label: LanguageLabel.EN },
];

export const DEFAULT_LANGUAGE = LanguageCode.SK;
