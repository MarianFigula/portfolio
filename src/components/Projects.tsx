import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../lib/definitions.ts';

// ─── Data ────────────────────────────────────────────────────────────────────

const realWorldProjects: Project[] = [
    {
        title: 'Fullstack developer at Stribog',
        description: 'All-in-one SaaS platform for small entrepreneurs to manage their entire business.',
        details:
            'Worked across the full stack: React frontend, Kotlin/Spring Boot backend, database design, DevOps, and even a secure desktop app built with Flutter and C++.',
        image: './assets/stribog.png',
        link: 'https://stribog.app/',
        isGithubLink: false,
        tags: ['React', 'Kotlin', 'Spring Boot', 'DevOps', 'Flutter', 'C++'],
    },
    {
        title: 'Fullstack developer at Instaview',
        description: 'AI-powered HR platform that autonomously calls job candidates, conducts language assessments, and sources talent directly from LinkedIn.',
        details:
            'Focused primarily on backend development - infrastructure that power AI-driven candidate calls. Worked extensively with concurrency, caching, and Redis to keep the system fast and reliable under load.',
        image: './assets/instaview.png',
        link: 'https://www.instaview.sk/',
        isGithubLink: false,
        tags: ['NextJS', 'NestJS', 'Docker', 'AI', 'Redis'],
    },
    {
        title: 'Junior PHP developer at Everlution',
        description: 'Taking care of 3 projects after 8 months under a senior developer.',
        details:
            'Building web apps using Symfony, designing backend logic and APIs. Maintaining and upgrading existing systems by fixing bugs, adding features, and improving performance and security.',
        image: '',
        link: '',
        isGithubLink: false,
        tags: ['PHP', 'Symfony', 'Docker', 'Full-Stack', 'Database'],
    },
    {
        title: 'Resap',
        description:
            'A comprehensive web application that allows users and companies to create and manage reservations efficiently.',
        details:
            'I handled both frontend and backend development using JavaScript and PHP, creating a seamless booking experience.',
        image: './assets/resap.png',
        link: 'https://app.resap.sk',
        isGithubLink: false,
        tags: ['JavaScript', 'PHP', 'Full-Stack', 'Database'],
    },
    // {
    //     title: 'Intrasy',
    //     description:
    //         'Web and mobile application enabling users to monitor their rides without purchasing GPS devices.',
    //     details:
    //         'As frontend developer, I focused on creating intuitive UI/UX that makes ride tracking simple and accessible.',
    //     image: './assets/intrasy.png',
    //     link: 'https://intrasy.sk',
    //     isGithubLink: false,
    //     tags: ['Frontend', 'Bootstrap', 'Metronic'],
    // },
];

const personalProjects: Project[] = [
    {
        title: 'ScandiTrack',
        description: 'Price tracker for IKEA products just by product URL.',
        details:
            'Created a web application to track prices of IKEA products. After a user enters the URL, the IKEA product info displays. After entering an email and price threshold, the product is tracked with confirmation emails.',
        image: './assets/scandi-icon.png',
        link: 'https://scanditrack.vercel.app/',
        isGithubLink: false,
        tags: ['NextJS', 'Typescript', 'Vercel', 'Cron Job', 'Full-Stack'],
    },
    {
        title: 'Clipboard PDF Text Changer',
        description:
            'Automated solution for fixing special character encoding issues when copying text from PDF files.',
        details:
            'Created an executable application that automatically corrects Slovak special characters, saving time and ensuring text readability.',
        image: './assets/copy-paste.png',
        link: 'https://github.com/MarianFigula/Clipboard-pdf-text-changer',
        isGithubLink: true,
        tags: ['Python', 'Automation', 'Desktop App'],
    },
    {
        title: 'TickTick Chrome Extension',
        description:
            'Web extension that automatically adds university gym workout sessions to TickTick planning app.',
        details:
            'Integrates with TickTick API to streamline workout planning by automatically importing session times and dates.',
        image: './assets/ticktick.png',
        link: 'https://github.com/MarianFigula/Ticktick-Chrome-Extension',
        isGithubLink: true,
        tags: ['Chrome Extension', 'API Integration', 'JavaScript'],
    },
];

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────

function useScrollReveal(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProjectNumber({ n }: { n: number }) {
    return (
        <span
            className="absolute select-none font-black leading-none pointer-events-none text-foreground/5"
            style={{ fontSize: 'clamp(6rem, 12vw, 10rem)', top: '-1rem', lineHeight: 1 }}
        >
      {String(n).padStart(2, '0')}
    </span>
    );
}

function ImagePlaceholder({ n }: { n: number }) {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/60 to-background rounded-xl border border-primary/20">
      <span className="font-black text-primary/20 select-none" style={{ fontSize: '5rem' }}>
        {String(n).padStart(2, '0')}
      </span>
        </div>
    );
}

function ProjectLink({ link, isGithubLink }: { link: string; isGithubLink: boolean }) {
    if (!link) return null;
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-accent-foreground transition-colors duration-200 font-medium"
        >
            {isGithubLink ? (
                <>
                    <Github size={16} /> GitHub
                </>
            ) : (
                <>
                    <ExternalLink size={16} /> Live Website
                </>
            )}
        </a>
    );
}

// ─── SplitRow ─────────────────────────────────────────────────────────────────

function SplitRow({ project, index }: { project: Project; index: number }) {
    const { ref, visible } = useScrollReveal();
    const imageOnRight = index % 2 === 0; // 1st, 3rd… → image right; 2nd, 4th… → image left

    const imageEl = (
        <div className="relative w-full h-64 md:h-full min-h-[280px] overflow-hidden rounded-xl group/img border border-border">
            {project.image ? (
                <>
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-background/30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 rounded-xl" />
                </>
            ) : (
                <ImagePlaceholder n={index + 1} />
            )}
        </div>
    );

    const detailsEl = (
        <div className="relative flex flex-col justify-center gap-4 py-4 md:py-8">
            <ProjectNumber n={index + 1} />
            <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight z-10">
                {project.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed z-10">{project.description}</p>
            <p className="text-sm text-muted-foreground z-10">{project.details}</p>
            <div className="flex flex-wrap gap-2 z-10">
                {project.tags.map((tag) => (
                    <span key={tag} className="skill-badge text-xs">
            {tag}
          </span>
                ))}
            </div>
            <div className="flex gap-4 pt-2 z-10">
                <ProjectLink link={project.link} isGithubLink={project.isGithubLink} />
            </div>
        </div>
    );

    return (
        <div
            ref={ref}
            className={`grid md:grid-cols-2 gap-8 md:gap-12 py-12 border-b border-border/50
        transition-all duration-700 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${index * 80}ms` }}
        >
            {imageOnRight ? (
                <>
                    {detailsEl}
                    {imageEl}
                </>
            ) : (
                <>
                    {imageEl}
                    {detailsEl}
                </>
            )}
        </div>
    );
}

// ─── Main section ─────────────────────────────────────────────────────────────

type Category = 'realworld' | 'personal';

const TABS: { id: Category; label: string }[] = [
    { id: 'realworld', label: 'Real World' },
    { id: 'personal', label: 'Personal' },
];

const PROJECT_MAP: Record<Category, Project[]> = {
    realworld: realWorldProjects,
    personal: personalProjects,
};

export default function Projects() {
    const [activeTab, setActiveTab] = useState<Category>('realworld');
    const projects = PROJECT_MAP[activeTab];

    return (
        <section id="projects" className="py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">

                    {/* Header */}
                    <div className="text-left mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                            Work And Projects
                        </h2>
                        <div className="w-20 h-1 bg-primary rounded-full mb-8" />

                        {/* Tabs */}
                        <div className="flex gap-3 mt-6">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer
                                      ${activeTab === tab.id
                                        ? 'text-primary bg-primary/10 shadow-[0_0_12px_hsl(var(--primary)/0.35)]'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                    style={{ borderColor: 'hsl(var(--primary)/0.35)' }}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Project rows */}
                    <div>
                        {projects.map((project, index) => (
                            <SplitRow key={project.title} project={project} index={index} />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}