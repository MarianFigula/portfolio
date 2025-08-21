
const Footer = () => {
    const socialLinks = [
        { href: 'https://github.com/MarianFigula', icon: './assets/github.svg', label: 'GitHub' },
        { href: 'https://www.linkedin.com/in/mari%C3%A1n-figula-167b871b1/', icon: '/src/assets/linkedin.svg', label: 'LinkedIn' },
        { href: 'https://www.instagram.com/majo_figula/', icon: './assets/instagram.svg', label: 'Instagram' },
        { href: 'https://www.facebook.com/majo5555/', icon: './assets/facebook.svg', label: 'Facebook' }
    ];

    return (
        <footer className="bg-card border-t border-border/50 min-h-screen flex items-center justify-center">
            <div className="container px-6 py-12">
                <div className="max-w-6xl mx-auto text-center space-y-8">

                    {/* Logo */}
                    <div className="inline-flex items-center gap-2 justify-center">
                        <div className="text-3xl font-bold bg-gradient-to-r text-primary bg-clip-text text-transparent">
                            MF
                        </div>
                    </div>

                    <div className="flex justify-center gap-6">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-muted transition-transform transition duration-200 hover:scale-[1.15] hover:brightness-[1.2] hover:saturate-[1.1]"
                                aria-label={social.label}
                            >
                                <img src={social.icon} width={36} alt={social.label}/>
                            </a>
                        ))}
                    </div>

                    <div>
                        <p className="text-muted-foreground flex items-center justify-center gap-2">
                            © {new Date().getFullYear()} Marián Figula.
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;