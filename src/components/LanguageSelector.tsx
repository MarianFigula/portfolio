import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../lib/language/LanguageProvider/useLanguage';
import { LanguageCode } from '../lib/language/languages';

const LanguageSelector = () => {
    const { currentLanguage, changeLanguage, languages } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (code: LanguageCode) => {
        changeLanguage(code);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm font-medium
                           text-[hsl(var(--foreground)/0.7)] hover:text-primary
                           transition-colors cursor-pointer"
                aria-label="Change language"
            >
                <Globe size={14} />
                <span>{currentLanguage.code.toLocaleUpperCase()}</span>
                <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute left-0 top-full mt-2 min-w-[140px] rounded-lg
                                bg-card border border-border/50 shadow-[var(--shadow-medium)]
                                overflow-hidden">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleSelect(lang.code)}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer
                                ${currentLanguage.code === lang.code
                                    ? 'text-primary bg-primary/10'
                                    : 'text-[hsl(var(--foreground)/0.7)] hover:text-foreground hover:bg-muted'
                                }`}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
