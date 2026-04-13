import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector.tsx';

const Header = () => {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#about', label: t('header.about') },
        { href: '#skills', label: t('header.skills') },
        { href: '#projects', label: t('header.projects') },
        { href: '#contact', label: t('header.contact') }
    ];

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isScrolled || isMenuOpen ? 'bg-background/95 backdrop-blur-sm shadow-sm border-b border-border/50' : 'bg-transparent'
        }`}>
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div
                        className="text-2xl font-bold bg-gradient-to-r text-primary bg-clip-text">
                        MF
                    </div>
                    <div className="hidden md:flex items-center gap-12">
                        <ul className="flex space-x-15">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} className="nav-link">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <LanguageSelector />
                    </div>

                    <div className="flex md:hidden items-center gap-3">
                        <LanguageSelector />
                        <button
                            className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden mt-4 py-4 border-t border-border/50 animate-fade-in">
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.href} className={'mt-4'}>
                                    <a
                                        href={link.href}
                                        className="rounded-lg transition-colors nav-link"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;