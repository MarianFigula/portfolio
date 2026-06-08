import { useTranslation } from 'react-i18next';
import { Star, ExternalLink, UserRound } from 'lucide-react';

type Review = {
    quote: string;
    author: string; // may be empty for an anonymous review
    role: string;
    initials?: string; // overrides the auto-derived initials when set
    rating?: number;
    url?: string;
};

function initialsOf(name: string) {
    const parts = name
        .trim()
        .split(/\s+/)
        // Drop academic titles / abbreviations (e.g. "JUDr.", "s.", "r.", "o.").
        .filter((p) => p && !p.endsWith('.'));
    return parts
        .slice(0, 2)
        .map((p) => p.replace(/[^\p{L}]/gu, '')[0]?.toUpperCase() ?? '')
        .join('');
}

function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex gap-1" aria-label={`${rating} / 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    size={18}
                    className={i < rating ? 'fill-primary text-primary' : 'text-border'}
                />
            ))}
        </div>
    );
}

function ReviewCard({ review, featured = false }: { review: Review; featured?: boolean }) {
    const { t } = useTranslation();
    const initials = review.initials?.trim() || initialsOf(review.author);

    return (
        <figure className={`project-card flex h-full flex-col ${featured ? 'gap-6 p-8 md:p-10' : 'gap-5'}`}>
            {review.rating ? <Stars rating={review.rating} /> : null}

            <blockquote
                className={`flex-1 font-medium leading-relaxed text-foreground ${
                    featured ? 'text-lg md:text-xl' : 'text-base'
                }`}
            >
                “{review.quote}”
            </blockquote>

            <figcaption className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-bold text-primary">
                    {initials || <UserRound size={20} />}
                </div>
                <div className="min-w-0">
                    {review.author && <p className="font-semibold text-foreground">{review.author}</p>}
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                    {review.url && (
                        <a
                            href={review.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-accent-foreground"
                        >
                            {t('reviews.visit')}
                            <ExternalLink size={14} />
                        </a>
                    )}
                </div>
            </figcaption>
        </figure>
    );
}

const Reviews = () => {
    const { t } = useTranslation();
    const items = t('reviews.items', { returnObjects: true }) as Review[];

    if (!items?.length) return null;
    const featured = items.length === 1;

    return (
        <section className="py-28">
            <div className="container mx-auto px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12">
                        <h2 className="mb-4 text-4xl font-bold md:text-5xl">{t('reviews.title')}</h2>
                        <div className="h-1 w-20 rounded-full bg-primary" />
                    </div>

                    {featured ? (
                        <div className="mx-auto max-w-3xl">
                            <ReviewCard review={items[0]} featured />
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {items.map((review, index) => (
                                <ReviewCard key={index} review={review} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
