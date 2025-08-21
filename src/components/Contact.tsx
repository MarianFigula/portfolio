import {useState} from 'react';
import {Mail, Send, Calendar, MapPin} from 'lucide-react';
import emailjs from '@emailjs/browser';


const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.currentTarget;

        try {
            if (!form.current) {
                console.error('Form reference is null');
                setIsSubmitting(false);
                return;
            }
            await emailjs.sendForm(
                'service_f41gdwm',
                'template_v3mrdc5',
                form.current!, {
                    publicKey: 'UWfx0PhazET9YyLHf'
                }
            )

            alert("Email sent successfully!")

            form.current.reset()
        } catch (error) {
            console.error("Failed to send email:", error);
            alert("Failed to send email. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-muted/30">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-left mb-16 animate-fade-up">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Get In Touch
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r bg-primary"></div>
                        <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
                            Let's discuss your next project or just say hello. I'm always open to new opportunities and interesting conversations.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="animate-fade-up">
                            <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-[var(--shadow-soft)]">
                                <h3 className="text-2xl font-bold mb-6 text-foreground">Send me a message</h3>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2 text-left">
                                        <label htmlFor="name" className="text-sm font-medium">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            className="w-full mt-2 px-4 py-3 rounded-xl border border-border/50 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            placeholder="Enter your name"
                                        />
                                    </div>

                                    <div className="space-y-2 text-left">
                                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="user_email"
                                            required
                                            className="w-full mt-2 px-4 py-3 rounded-xl border border-border/50 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    <div className="space-y-2 text-left">
                                        <label htmlFor="message" className="text-sm font-medium text-foreground">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={10}
                                            className="w-full mt-2 px-4 py-3 rounded-xl border border-border/50 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                            placeholder="Tell me about your project or just say hello..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={20} />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="animate-slide-in space-y-8">
                            {/* Quick Contact */}
                            <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-[var(--shadow-soft)]">
                                <h3 className="text-2xl font-bold mb-6 text-foreground">Let's connect</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                            <Mail size={20}/>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">majofigulam3@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                            <MapPin size={20}/>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Bratislava, Slovakia</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Calendar Booking */}
                            <div
                                className="bg-card rounded-2xl p-8 border border-border/50 shadow-[var(--shadow-soft)]">
                                <h3 className="text-xl font-bold mb-4 text-foreground">Schedule a meeting</h3>
                                <p className="text-muted-foreground mb-6">
                                    Prefer a direct conversation? Book a 45-minute meeting to discuss your project in
                                    detail.
                                </p>
                                <a
                                    href="https://calendly.com/majofigulam3/45min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline w-full inline-flex items-center justify-center gap-2"
                                >
                                    <Calendar size={20} />
                                    Book a Meeting
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;