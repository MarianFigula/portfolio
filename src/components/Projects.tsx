import { ExternalLink, Github} from 'lucide-react';
import type {Project} from "../lib/definitions.ts";

const Projects = () => {
    const realWorldProjects: Project[] = [
        {
            title: 'Junior PHP developer at Everlution',
            description: 'Taking care of 3 projects after 8 month under a senior developer.',
            details: 'Building web apps using Symfony designing backend logic and APIs. Maintaining and upgrading existing systems by fixing bugs, adding features and improving performance and security',
            image: '',
            link: '',
            isGithubLink: false,
            tags: ['PHP', 'Symfony', 'Docker', 'Full-Stack', 'Database']
        },
        {
            title: 'Resap',
            description: 'A comprehensive web application that allows users and companies to create and manage reservations efficiently.',
            details: 'I handled both frontend and backend development using JavaScript and PHP, creating a seamless booking experience.',
            image: './assets/resap.png',
            link: 'https://app.resap.sk',
            isGithubLink: false,
            tags: ['JavaScript', 'PHP', 'Full-Stack', 'Database']
        },
        {
            title: 'Intrasy',
            description: 'Web and mobile application enabling users to monitor their rides without purchasing GPS devices.',
            details: 'As frontend developer, I focused on creating intuitive UI/UX that makes ride tracking simple and accessible.',
            image: './assets/intrasy.png',
            link: 'https://intrasy.sk',
            isGithubLink: false,
            tags: ['Frontend', 'Bootstrap', 'Metronic']
        }
    ];

    const personalProjects: Project[] = [
        {
            title: 'ScandiTrack',
            description: 'Price tracker for IKEA products just by product URL.',
            details: 'Created an web application to track prices of IKEA product. After user enters the url, the IKEA product info displays. After entering email and price threshold, the product is track with confirmation emails.',
            image: './assets/scandi-icon.png',
            link: 'https://scanditrack.vercel.app/',
            isGithubLink: false,
            tags: ['NextJS', 'Typescript', 'Vercel', 'Cron Job', 'Full-Stack']
        },
        {
            title: 'Clipboard PDF Text Changer',
            description: 'Automated solution for fixing special character encoding issues when copying text from PDF files.',
            details: 'Created an executable application that automatically corrects Slovak special characters, saving time and ensuring text readability.',
            image: './assets/copy-paste.png',
            link: 'https://github.com/MarianFigula/Clipboard-pdf-text-changer',
            isGithubLink: true,
            tags: ['Python', 'Automation', 'Desktop App']
        },
        {
            title: 'TickTick Chrome Extension',
            description: 'Web extension that automatically adds university gym workout sessions to TickTick planning app.',
            details: 'Integrates with TickTick API to streamline workout planning by automatically importing session times and dates.',
            image: './assets/ticktick.png',
            link: 'https://github.com/MarianFigula/Ticktick-Chrome-Extension',
            isGithubLink: true,
            tags: ['Chrome Extension', 'API Integration', 'JavaScript']
        }
    ];

    const schoolProjects: Project[] = [
        {
            title: 'Book Management API',
            description: 'RESTful API server for comprehensive book management with full CRUD operations.',
            details: 'Built with Java Spring Boot applying OOP principles for scalable book database management.',
            image: './assets/books.jpg',
            link: 'https://github.com/MarianFigula/API---books',
            isGithubLink: true,
            tags: ['Java', 'Spring Boot', 'REST API', 'OOP']
        },
        {
            title: 'School Task Management System',
            description: 'Full-featured task system for teachers and students built with Laravel and Docker.',
            details: 'Led team development of a platform where teachers assign tasks and evaluate student submissions.',
            image: './assets/tasks.jpg',
            link: 'https://github.com/MarianFigula/Tasks-System',
            isGithubLink: true,
            tags: ['Laravel', 'Docker', 'Team Lead', 'Full-Stack']
        },
        {
            title: 'Olympians management system',
            description: 'Task system for olympians and users.',
            details: 'Web app with role-based access: admins manage olympians, while users can view them. Implemented authentication via Google and Google Authenticator.',
            image: './assets/medals.png',
            link: 'https://github.com/MarianFigula/Tasks-System',
            isGithubLink: true,
            tags: ['PHP', 'Bootstrap', 'Google Auth', 'Full-Stack']
        },
        {
            title: 'Machine Learning Projects',
            description: 'Neural network implementations for music mood classification and car price prediction.',
            details: 'Explored ML concepts through practical applications including Spotify song categorization and predictive modeling.',
            image: './assets/machine-learning.jpg',
            link: 'https://github.com/MarianFigula/Machine-Learning-and-Neural-Networks',
            isGithubLink: true,
            tags: ['Python', 'Machine Learning', 'Neural Networks', 'Data Science']
        }
    ];

    const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
        <div
            className="project-card group animate-fade-up"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="relative overflow-hidden rounded-xl mb-6">
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
            ) : (
                <div className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"></div>
                    )}
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                </p>

                <p className="text-sm text-muted-foreground">
                    {project.details}
                </p>

                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                        <span key={tag} className="skill-badge text-xs">
              {tag}
            </span>
                    ))}
                </div>

                <div className="flex gap-3 pt-2">
                    {project.link && (
                        project.isGithubLink ? (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-primary hover:[color:theme(colors.sky.100)!important] transition-colors duration-200 font-medium"
                            >
                                <Github size={16}/>
                                GitHub
                            </a>
                        ) : (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-primary hover:[color:theme(colors.sky.100)!important] transition-colors duration-200"
                            >
                                <ExternalLink size={16}/>
                                Live Website
                            </a>
                        )
                    )}
                </div>

            </div>
        </div>
    );

    const ProjectSection = ({title, projects, delay = 0}: { title: string; projects: Project[]; delay?: number }) => (
        <div className="mb-16">
            <h3 className={`text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-r text-primary-light bg-clip-text text-transparent animate-fade-up`}>
                {title}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <ProjectCard key={project.title} project={project} index={index + delay}/>
                ))}
            </div>
        </div>
    );

    return (
        <section id="projects" className="py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-left mb-16 animate-fade-up">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Work And Projects
                        </h2>
                        <div className="w-20 h-1 text-left text-primary bg-primary rounded-full"></div>
                        <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
                            A collection of projects showcasing my journey from academic learning to real-world applications
                        </p>
                    </div>

                    <ProjectSection title="Real World Projects" projects={realWorldProjects} />
                    <ProjectSection title="Personal Projects" projects={personalProjects} delay={2} />
                    <ProjectSection title="Academic Projects" projects={schoolProjects} delay={4} />
                </div>
            </div>
        </section>
    );
};

export default Projects;