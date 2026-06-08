import { useEffect, useRef, useState } from 'react';

/**
 * Reveals an element once it scrolls into view. Shared by the portfolio
 * (Projects) and the /weby landing page so they share the same entrance feel.
 * Returns a ref to attach and a `visible` flag to drive the transition.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
    const ref = useRef<T>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, visible };
}
