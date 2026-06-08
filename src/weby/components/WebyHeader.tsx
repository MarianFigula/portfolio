import { useTranslation } from 'react-i18next';
import Header, { type NavLink } from '../../components/shared/Header.tsx';
import LanguageSelector from '../../components/LanguageSelector.tsx';

const WebyHeader = () => {
    const { t } = useTranslation();

    const links: NavLink[] = [
        { href: '#preco', label: t('nav.why') },
        { href: '#projekty', label: t('nav.work') },
        { href: '#postup', label: t('nav.process') },
        { href: '#contact', label: t('nav.contact') },
        { href: '/', label: t('meta.backToPortfolio') },
    ];

    return (
        <Header
            logo={
                <a href="/weby/" className="text-2xl font-bold text-primary" aria-label="Marián Figula">
                    MF
                </a>
            }
            links={links}
            rightSlot={<LanguageSelector />}
        />
    );
};

export default WebyHeader;
