import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ArrowRight} from 'lucide-react';

const ROTATE_INTERVAL = 2200;

const WebyHero = () => {
    const {t} = useTranslation();
    const words = t('hero.rotatingWords', {returnObjects: true}) as string[];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % words.length);
        }, ROTATE_INTERVAL);
        return () => clearInterval(id);
    }, [words.length]);

    // We only ever advance by one, so the word leaving the stage is the previous index.
    const exiting = (index - 1 + words.length) % words.length;

    const getOffset = (i: number) => {
        if (i === index) return 'translateY(0)';
        if (i === exiting) return 'translateY(-120%)';
        return 'translateY(120%)';
    };

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-32">
            {/* Atmospheric background — matches the portfolio hero's blurred blobs */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-10 top-24 h-72 w-72 rounded-full bg-primary/5 blur-3xl"/>
                <div className="absolute bottom-24 right-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl"/>
            </div>

            <div className="container mx-auto px-6">
                <div className="mx-auto max-w-4xl text-center animate-fade-up">
                    <span
                        className="mb-6 inline-block text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        {t('hero.eyebrow')}
                      </span>
                    <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
                        <span className="block text-foreground">{t('hero.headlinePrefix')}</span>
                        <span
                            className="relative mt-4 block h-[1.5em] overflow-hidden text-4xl md:mt-6 md:text-6xl">
                            {words.map((word, i) => (
                                <span
                                    key={word}
                                    aria-hidden={i !== index}
                                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-primary to-primary-light bg-clip-text leading-none text-transparent transition-all duration-500 ease-out"
                                    style={{
                                        opacity: i === index ? 1 : 0,
                                        transform: getOffset(i),
                                    }}
                                >
                                    {word}
                                </span>
                            ))}
                        </span>
                    </h1>

                    <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
                        {t('hero.subtitle')}
                    </p>

                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <a href="#contact" className="btn-primary inline-flex items-center justify-center gap-2">
                            {t('hero.primaryCta')}
                            <ArrowRight size={20}/>
                        </a>
                        <a href="#projekty" className="btn-outline inline-flex items-center justify-center">
                            {t('hero.secondaryCta')}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WebyHero;
