import { Code, Database, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Skills = () => {
    const { t } = useTranslation();

    const skillCategories = [
        {
            title: t('skills.categories.programmingLanguages'),
            icon: Code,
            skills: ['HTML/CSS', 'PHP', 'JavaScript', 'React', 'Symfony', 'NextJS', 'SQL', 'Git', 'Kotlin', 'Docker', 'Jira'],
            color: 'from-blue-500 to-cyan-500'
        },
        {
            title: t('skills.categories.hardSkills'),
            icon: Database,
            skills: [
                t('skills.items.softwareDevelopment'),
                t('skills.items.databaseManagement'),
                t('skills.items.uiUxDesign'),
                t('skills.items.testing'),
                t('skills.items.versionControl'),
                t('skills.items.coding'),
                t('skills.items.machineLearningAi'),
            ],
            color: 'from-black/60 to-grey-400'
        },
        {
            title: t('skills.categories.softSkills'),
            icon: Users,
            skills: [
                t('skills.items.creativity'),
                t('skills.items.empathy'),
                t('skills.items.timeManagement'),
                t('skills.items.adaptability'),
                t('skills.items.curiosity'),
                t('skills.items.openMindedness'),
                t('skills.items.teamWorking'),
                t('skills.items.communication'),
                t('skills.items.passionForLearning'),
            ],
            color: 'from-purple-500 to-pink-500'
        }
    ];

    return (
        <section id="skills" className="py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-left mb-16 animate-fade-up">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            {t('skills.title')}
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r text-primary bg-primary"></div>
                        <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
                            {t('skills.subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {skillCategories.map((category, index) => (
                            <div
                                key={category.title}
                                className="group animate-fade-up"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300 hover:-translate-y-2 h-full">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} shadow-lg`}>
                                            <category.icon size={24} className="text-white" />
                                        </div>
                                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                                            {category.title}
                                        </h3>
                                    </div>

                                    {/* Skills Grid */}
                                    <div className="flex flex-wrap gap-2">
                                        {category.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="skill-badge text-sm"
                                            >
                        {skill}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;