import { useTranslation } from 'react-i18next';
import Header, { type NavLink } from './shared/Header.tsx';
import LanguageSelector from './LanguageSelector.tsx';

const PortfolioHeader = () => {
    const { t } = useTranslation();

    const links: NavLink[] = [
        { href: '#about', label: t('header.about') },
        { href: '#skills', label: t('header.skills') },
        { href: '#projects', label: t('header.projects') },
        { href: '#contact', label: t('header.contact') },
        { href: '/weby/', label: t('header.weby') },
    ];

    return (
        <Header
            logo={<div className="text-2xl font-bold text-primary">MF</div>}
            links={links}
            rightSlot={<LanguageSelector />}
        />
    );
};

export default PortfolioHeader;
