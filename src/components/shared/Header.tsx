import { useState, useEffect, type ReactNode } from 'react';
import { Menu, X } from 'lucide-react';

export type NavLink = { href: string; label: string };

type HeaderProps = {
    /** Brand mark on the left (text or a link). */
    logo: ReactNode;
    links: NavLink[];
    /** Right-side slot — language selector (portfolio) or back link (weby). */
    rightSlot?: ReactNode;
};

/**
 * Shared sticky site header: transparent over the hero, frosted once scrolled,
 * with a desktop nav and a mobile burger menu. Both the portfolio and the /weby
 * landing page render it, supplying their own links, logo and right-side slot.
 */
export default function Header({ logo, links, rightSlot }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                isScrolled || isMenuOpen
                    ? 'bg-background/95 backdrop-blur-sm shadow-sm border-b border-border/50'
                    : 'bg-transparent'
            }`}
        >
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {logo}

                    <div className="hidden md:flex items-center gap-12">
                        <ul className="flex gap-10">
                            {links.map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} className="nav-link">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        {rightSlot}
                    </div>

                    <div className="flex md:hidden items-center gap-3">
                        {rightSlot}
                        <button
                            className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden mt-4 py-4 border-t border-border/50 animate-fade-in">
                        <ul className="space-y-2">
                            {links.map((link) => (
                                <li key={link.href} className="mt-4">
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
}
