import { useScrollReveal } from '../../lib/hooks/useScrollReveal.ts';

export type Feature = { title: string; text: string };

/**
 * De-boxed, numbered feature list: big faint index numbers + hairline dividers.
 * Reuses the site's number motif (Showcase / Process) instead of the generic
 * icon-card grid. The whole list reveals on scroll, rows staggered by delay.
 */
function FeatureList({ items }: { items: Feature[] }) {
    const { ref, visible } = useScrollReveal(0.15);

    return (
        <div ref={ref} className="border-t border-border/50">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`group flex flex-col gap-3 border-b border-border/50 py-8 transition-all duration-700 ease-out md:flex-row md:gap-10 md:py-10 ${
                        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 90}ms` }}
                >
                    <span className="select-none text-5xl font-black leading-none text-foreground/10 transition-colors duration-300 group-hover:text-primary/70 md:w-28 md:flex-shrink-0 md:text-6xl">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="md:pt-2">
                        <h3 className="text-xl font-bold text-foreground md:text-2xl">{item.title}</h3>
                        <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">{item.text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FeatureList;
