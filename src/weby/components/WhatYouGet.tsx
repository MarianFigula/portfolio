import { useTranslation } from 'react-i18next';
import FeatureList, { type Feature } from './FeatureList.tsx';

const WhatYouGet = () => {
    const { t } = useTranslation();
    const cards = t('whatYouGet.cards', { returnObjects: true }) as Feature[];

    return (
        <section className="py-28">
            <div className="container mx-auto px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12">
                        <h2 className="mb-4 text-4xl font-bold md:text-5xl">{t('whatYouGet.title')}</h2>
                        <div className="mb-6 h-1 w-20 rounded-full bg-primary" />
                        <p className="max-w-2xl text-muted-foreground">{t('whatYouGet.subtitle')}</p>
                    </div>

                    <FeatureList items={cards} />
                </div>
            </div>
        </section>
    );
};

export default WhatYouGet;
