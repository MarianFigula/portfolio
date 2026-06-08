export type Step = { title: string; text: string };

type TimelineStepProps = {
    step: Step;
    index: number;
    /** True once the scroll-driven rail fill has reached this node. */
    active: boolean;
    /** Lets the parent measure the node's position to drive the fill. */
    liRef?: (el: HTMLLIElement | null) => void;
};

/**
 * One node on the Process timeline. The numbered node fills with the brand
 * colour as the scroll-driven rail reaches it, and the text brightens with it.
 */
function TimelineStep({ step, index, active, liRef }: TimelineStepProps) {
    return (
        <li ref={liRef} className="relative flex gap-6 pb-20 last:pb-0 md:gap-10 md:pb-28">
            {/* Numbered node — fills as the rail passes it */}
            <div className="relative z-10 flex-shrink-0">
                <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-lg font-bold transition-all duration-500 md:h-14 md:w-14 md:text-xl ${
                        active
                            ? 'border-primary bg-primary text-primary-foreground shadow-[var(--shadow-glow)]'
                            : 'border-border bg-background text-muted-foreground'
                    }`}
                >
                    {index + 1}
                </span>
            </div>

            <div
                className={`pt-1.5 transition-opacity duration-500 md:pt-2 ${active ? 'opacity-100' : 'opacity-60'}`}
            >
                <h3 className="text-2xl font-bold text-foreground md:text-3xl">{step.title}</h3>
                <p className="mt-3 max-w-lg text-muted-foreground md:text-lg">{step.text}</p>
            </div>
        </li>
    );
}

export default TimelineStep;
