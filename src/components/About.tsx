
const About = () => {
    return (
        <section id="about" className="py-20 relative">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-left mb-16 animate-fade-up">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            About Me
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r bg-primary"></div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="relative animate-fade-in">
                            <div className="relative w-full max-w-md mx-auto">
                                <div className="aspect-square rounded-3xl overflow-hidden shadow-[var(--shadow-medium)] border border-border/50">
                                    <img
                                        src="./assets/photo-me.JPG"
                                        alt="Marián Figula - Web Developer"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="animate-slide-in">
                            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                                Hello! I'm Marián Figula
                            </h3>

                            <div className="space-y-6 text-muted-foreground leading-relaxed">
                                <p className="text-lg">
                                    I'm a Web Developer who graduated from the Faculty of Electrical Engineering
                                    and Information Technology of STU in Bratislava, specializing in Applied Informatics.
                                </p>

                                <p>
                                    Programming has been my passion since high school, and I've never stopped enjoying it.
                                    The opportunity to <span className="text-primary font-semibold">build</span> and
                                    <span className="text-primary font-semibold"> create</span> with <span className="text-primary font-semibold">creativity</span> are the main reasons
                                    why this field fulfills me.
                                </p>

                                <p>
                                    My goal is to develop projects that solve real-world problems and automate
                                    repetitive tasks. I specialize in web application development, focusing on
                                    technologies like HTML, CSS, JavaScript, PHP, and ReactJS.
                                </p>

                                <p>
                                    I love exploring the latest developments in <span className="text-primary font-semibold">machine learning</span> and
                                    <span className="text-primary font-semibold"> artificial intelligence</span>,
                                    always staying curious about emerging technologies.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;