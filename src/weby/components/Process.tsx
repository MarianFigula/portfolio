import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TimelineStep, { type Step } from './TimelineStep.tsx';

/** Rail geometry, measured from the DOM so it stays correct across breakpoints. */
type RailGeometry = {
    left: number; // x of the node centres
    top: number; // y of the first node centre (within the list)
    height: number; // distance from first to last node centre
    centers: number[]; // y of every node centre (within the list)
};

const Process = () => {
    const { t } = useTranslation();
    const steps = t('process.steps', { returnObjects: true }) as Step[];

    const listRef = useRef<HTMLOListElement>(null);
    const nodeRefs = useRef<(HTMLLIElement | null)[]>([]);
    const [rail, setRail] = useState<RailGeometry | null>(null);
    const [progress, setProgress] = useState(0);
    const [active, setActive] = useState<boolean[]>(() => steps.map(() => false));

    // Measure the rail geometry: run the line between the first and last node
    // centres (never past them), and remember each node centre for activation.
    // A ResizeObserver re-measures on any layout change (incl. the web-font swap),
    // which a plain window-resize listener would miss.
    useEffect(() => {
        const list = listRef.current;
        if (!list) return;

        const measure = () => {
            const lis = nodeRefs.current.filter(Boolean) as HTMLLIElement[];
            if (lis.length < 2) return;

            // Measure the node circle itself (first child of the node column) relative
            // to the list — robust to the flex row stretching the wrapper.
            const circleOf = (li: HTMLLIElement) =>
                (li.children[0]?.firstElementChild as HTMLElement | null) ?? (li.children[0] as HTMLElement);

            const listRect = list.getBoundingClientRect();
            const centers = lis.map((li) => {
                const r = circleOf(li).getBoundingClientRect();
                return r.top - listRect.top + r.height / 2;
            });
            const firstRect = circleOf(lis[0]).getBoundingClientRect();
            const top = centers[0];

            setRail({
                left: firstRect.left - listRect.left + firstRect.width / 2,
                top,
                height: centers[centers.length - 1] - top,
                centers,
            });
        };

        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(list);
        // Web fonts can shift line-heights after first paint — re-measure when ready.
        document.fonts?.ready.then(measure).catch(() => {});
        return () => observer.disconnect();
    }, [steps.length]);

    // Map scroll position to fill progress between the first and last node.
    useEffect(() => {
        if (!rail) return;

        let frame = 0;
        const update = () => {
            const list = listRef.current;
            if (!list) return;

            const rect = list.getBoundingClientRect();
            const anchor = window.innerHeight * 0.8;
            const raw = (anchor - (rect.top + rail.top)) / rail.height;
            const p = Math.min(1, Math.max(0, raw));
            setProgress(p);

            const filled = rail.top + p * rail.height;
            setActive(rail.centers.map((c) => p > 0 && filled >= c));
        };

        // Coalesce scroll/resize bursts into one update per animation frame.
        const onScroll = () => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                update();
            });
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [rail]);

    return (
        <section id="postup" className="flex min-h-screen flex-col justify-center scroll-mt-20 py-12">
            <div className="container mx-auto px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12">
                        <h2 className="mb-4 text-4xl font-bold md:text-5xl">{t('process.title')}</h2>
                        <div className="mb-6 h-1 w-20 rounded-full bg-primary" />
                        <p className="max-w-2xl text-muted-foreground md:text-lg">{t('process.subtitle')}</p>
                    </div>

                    <ol ref={listRef} className="relative">
                        {/* Rail runs node-centre to node-centre — no stub past the last node */}
                        {rail && (
                            <div
                                aria-hidden
                                className="absolute w-0.5"
                                style={{ left: rail.left - 1, top: rail.top, height: rail.height }}
                            >
                                <span className="absolute inset-0 bg-border" />
                                <span
                                    className="absolute inset-x-0 top-0 bg-primary shadow-[var(--shadow-glow)]"
                                    style={{ height: `${progress * 100}%` }}
                                />
                            </div>
                        )}

                        {steps.map((step, index) => (
                            <TimelineStep
                                key={index}
                                step={step}
                                index={index}
                                active={active[index]}
                                liRef={(el) => {
                                    nodeRefs.current[index] = el;
                                }}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
};

export default Process;
