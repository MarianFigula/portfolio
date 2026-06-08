import { Mail, Calendar, MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ContactForm, { type ContactFormLabels } from './shared/ContactForm.tsx';


const Contact = () => {
    const { t } = useTranslation();

    const labels: ContactFormLabels = {
        heading: t('contact.form.heading'),
        nameLabel: t('contact.form.nameLabel'),
        namePlaceholder: t('contact.form.namePlaceholder'),
        emailLabel: t('contact.form.emailLabel'),
        emailPlaceholder: t('contact.form.emailPlaceholder'),
        messageLabel: t('contact.form.messageLabel'),
        messagePlaceholder: t('contact.form.messagePlaceholder'),
        send: t('contact.form.sendMessage'),
        sending: t('contact.form.sending'),
        success: t('contact.alerts.success'),
        error: t('contact.alerts.error'),
    };

    return (
        <section id="contact" className="min-h-screen scroll-mt-20 py-16">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-left mb-16 animate-fade-up">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            {t('contact.title')}
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r bg-primary"></div>
                        <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
                            {t('contact.subtitle')}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="animate-fade-up">
                            <ContactForm labels={labels} idPrefix="portfolio" rows={10} />
                        </div>

                        {/* Contact Info */}
                        <div className="animate-slide-in space-y-8">
                            {/* Quick Contact */}
                            <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-[var(--shadow-soft)]">
                                <h3 className="text-2xl font-bold mb-6 text-foreground">{t('contact.info.heading')}</h3>

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
                                            <Phone size={20}/>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">+421 951 832 795</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                            <MapPin size={20}/>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">{t('contact.info.location')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Calendar Booking */}
                            <div
                                className="bg-card rounded-2xl p-8 border border-border/50 shadow-[var(--shadow-soft)]">
                                <h3 className="text-xl font-bold mb-4 text-foreground">{t('contact.meeting.heading')}</h3>
                                <p className="text-muted-foreground mb-6">
                                    {t('contact.meeting.description')}
                                </p>
                                <a
                                    href="https://calendly.com/majofigulam3/45min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline w-full inline-flex items-center justify-center gap-2"
                                >
                                    <Calendar size={20} />
                                    {t('contact.meeting.bookButton')}
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