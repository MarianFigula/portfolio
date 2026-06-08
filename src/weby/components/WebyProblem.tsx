import { useTranslation } from 'react-i18next';
import { Search, Bot, type LucideIcon } from 'lucide-react';

const ICONS: LucideIcon[] = [Search, Bot];

type Card = { title: string; text: string };

const WebyProblem = () => {
    const { t } = useTranslation();
    const cards = t('problem.cards', { returnObjects: true }) as Card[];

    return (
        <section id="preco" className="scroll-mt-20 py-28">
            <div className="container mx-auto px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12">
                        <h2 className="mb-4 text-4xl font-bold md:text-5xl">{t('problem.title')}</h2>
                        <div className="h-1 w-20 rounded-full bg-primary" />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {cards.map((card, index) => {
                            const Icon = ICONS[index] ?? Search;
                            return (
                                <div key={index} className="project-card h-full">
                                    <div className="mb-5 inline-flex rounded-xl border border-primary/20 bg-gradient-to-br from-primary/20 to-primary/5 p-3.5 text-primary">
                                        <Icon size={26} />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold">{card.title}</h3>
                                    <p className="leading-relaxed text-muted-foreground">{card.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WebyProblem;
