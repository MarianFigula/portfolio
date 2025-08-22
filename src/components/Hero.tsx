import { ChevronDown, Download } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
    const [displayText, setDisplayText] = useState('');
    const fullText = 'Full-Stack Web Developer';

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < fullText.length) {
                setDisplayText(fullText.slice(0, index + 1));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 100);

        return () => clearInterval(timer);
    }, []);

    const handleDownloadPdf = () => {
        const link = document.createElement('a');
        link.href = './assets/CV.pdf';
        link.download = 'CV.pdf';
        link.dispatchEvent(new MouseEvent('click'));
    }

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 text-center">
                <div className="max-w-4xl mx-auto animate-fade-up">
                    <h1 className="hero-text mb-6">
                        Marián Figula
                    </h1>

                    <div className="hero-subtitle mb-8 min-h-[2rem]">
                        <span>{displayText}</span>
            <span className="border-r-2 pr-1 animate-pulse">
            </span>
                    </div>

                    <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                        Junior web developer passionate about building modern web apps.
                        I enjoy turning ideas into real projects and learning how to make clean, user-friendly experiences along the way.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <button
                            className="btn-primary inline-flex items-center gap-2 group"
                            onClick={handleDownloadPdf}
                            aria-label='Download CV of Marian Figula'
                        >
                            <Download size={20} className="group-hover:animate-bounce" />
                            Download CV
                        </button>
                    </div>
                </div>

                <a href="#about" className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <ChevronDown size={24} className="text-primary" />
                </a>
            </div>
        </section>
    );
};

export default Hero;