import type { ReactNode } from 'react';
import { useScrollReveal } from '../../lib/hooks/useScrollReveal.ts';
import ProjectNumber from './ProjectNumber.tsx';

type SplitRowProps = {
    index: number;
    title: string;
    /** Visual column — an image/link or a placeholder. */
    media: ReactNode;
    /** Detail column content (description, tags, links) below the title. */
    children: ReactNode;
    /** Oversized ghost number behind the title. Defaults on (portfolio motif). */
    showNumber?: boolean;
};

/**
 * Alternating two-column row used by both the portfolio Projects section and
 * the /weby Showcase: image swaps side per index, an oversized ghost number
 * sits behind the text, and the whole row reveals on scroll. Callers supply
 * their own `media` and detail `children`; the layout is shared.
 */
export default function SplitRow({ index, title, media, children, showNumber = true }: SplitRowProps) {
    const { ref, visible } = useScrollReveal();
    const imageOnRight = index % 2 === 0; // 1st, 3rd… → image right; 2nd, 4th… → image left

    const mediaCol = <div className="order-1 self-center md:order-none">{media}</div>;

    const detailsCol = (
        <div className="relative order-2 flex flex-col justify-center gap-4 py-4 md:order-none md:py-8">
            {showNumber && <ProjectNumber n={index + 1} />}
            <h3 className="z-10 hidden text-2xl font-bold leading-tight text-foreground md:block md:text-3xl">
                {title}
            </h3>
            {children}
        </div>
    );

    return (
        <div
            ref={ref}
            className={`border-b border-border/50 py-12 transition-all duration-700 ease-out ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 80}ms` }}
        >
            {/* Mobile-only title, always rendered above the media */}
            <div className="relative mb-6 md:hidden">
                {showNumber && <ProjectNumber n={index + 1} />}
                <h3 className="relative z-10 text-2xl font-bold leading-tight text-foreground">
                    {title}
                </h3>
            </div>

            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                {imageOnRight ? (
                    <>
                        {detailsCol}
                        {mediaCol}
                    </>
                ) : (
                    <>
                        {mediaCol}
                        {detailsCol}
                    </>
                )}
            </div>
        </div>
    );
}
