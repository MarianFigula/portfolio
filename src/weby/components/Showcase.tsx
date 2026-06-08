import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import SplitRow from '../../components/shared/SplitRow.tsx';

type ShowcaseProject = {
    name: string;
    description: string;
    url: string;
    image: string;
    alt: string;
    tags?: string[];
};

function ShowcaseRow({ project, index }: { project: ShowcaseProject; index: number }) {
    const { t } = useTranslation();

    const media = (
        <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block w-full overflow-hidden rounded-xl border border-border group/img"
        >
            <img
                src={project.image}
                alt={project.alt}
                loading="lazy"
                className="block h-auto w-full transition-transform duration-500 group-hover/img:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 transition-opacity duration-300 group-hover/img:opacity-100">
                <span className="inline-flex translate-y-8 items-center gap-2 rounded-full bg-primary/85 px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 backdrop-blur-sm">
                    {t('showcase.visit')}
                    <ExternalLink size={15} />
                </span>
            </div>
        </a>
    );

    return (
        <SplitRow index={index} title={project.name} media={media} showNumber={false}>
            <p className="z-10 leading-relaxed text-muted-foreground">{project.description}</p>
            {project.tags && (
                <div className="z-10 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span key={tag} className="skill-badge text-xs">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
            <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="z-10 inline-flex items-center gap-2 font-medium text-primary transition-colors duration-200 hover:text-accent-foreground"
            >
                {t('showcase.visit')}
                <ExternalLink size={16} />
            </a>
        </SplitRow>
    );
}

const Showcase = () => {
    const { t } = useTranslation();
    const projects = t('showcase.projects', { returnObjects: true }) as ShowcaseProject[];

    return (
        <section id="projekty" className="scroll-mt-20 py-28">
            <div className="container mx-auto px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12">
                        <h2 className="mb-4 text-4xl font-bold md:text-5xl">{t('showcase.title')}</h2>
                        <div className="mb-6 h-1 w-20 rounded-full bg-primary" />
                        <p className="max-w-2xl text-muted-foreground">{t('showcase.subtitle')}</p>
                    </div>

                    <div>
                        {projects.map((project, index) => (
                            <ShowcaseRow key={project.url} project={project} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Showcase;
