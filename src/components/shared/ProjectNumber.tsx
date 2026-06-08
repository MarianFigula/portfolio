/** Oversized ghost number that bleeds behind the row content. */
export default function ProjectNumber({ n }: { n: number }) {
    return (
        <span
            className="absolute select-none font-black leading-none pointer-events-none text-foreground/5"
            style={{ fontSize: 'clamp(6rem, 12vw, 10rem)', top: '-1rem', lineHeight: 1 }}
        >
            {String(n).padStart(2, '0')}
        </span>
    );
}
