import { useTranslation, Trans } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();
    return (
        <section id="about" className="py-20 relative">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-left mb-16 animate-fade-up">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            {t('about.title')}
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r bg-primary"></div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="relative animate-fade-in">
                            <div className="relative w-full max-w-md mx-auto">
                                <div className="aspect-square rounded-3xl overflow-hidden shadow-[var(--shadow-medium)] border border-border/50">
                                    <img
                                        src="./assets/photo-me.JPG"
                                        alt={t('about.imageAlt')}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="animate-slide-in">
                            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                                {t('about.greeting')}
                            </h3>

                            <div className="space-y-6 text-muted-foreground leading-relaxed">
                                <p className="text-lg">
                                    {t('about.paragraph1')}
                                </p>

                                <p>
                                    <Trans
                                        i18nKey="about.paragraph2"
                                        components={{ bold: <span className="text-primary font-semibold" /> }}
                                    />
                                </p>

                                <p>
                                    {t('about.paragraph3')}
                                </p>

                                <p>
                                    <Trans
                                        i18nKey="about.paragraph4"
                                        components={{ bold: <span className="text-primary font-semibold" /> }}
                                    />
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;