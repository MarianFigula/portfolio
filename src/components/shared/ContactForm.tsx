import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

// Single source of truth for the EmailJS config shared by both forms.
// The field names below (from_name / from_email / message) must match the template.
const SERVICE_ID = 'service_f41gdwm';
const TEMPLATE_ID = 'template_v3mrdc5';
const PUBLIC_KEY = 'UWfx0PhazET9YyLHf';

export type ContactFormLabels = {
    heading: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    success: string;
    error: string;
};

type Status = 'idle' | 'success' | 'error';

type ContactFormProps = {
    labels: ContactFormLabels;
    /** Prefix for field ids so the form is unique per page. */
    idPrefix?: string;
    rows?: number;
};

/**
 * Shared EmailJS contact form (card + fields + submit + inline status).
 * Used by both the portfolio Contact section and the /weby landing page so the
 * sending logic and the success/error feedback live in one place.
 */
export default function ContactForm({ labels, idPrefix = 'contact', rows = 6 }: ContactFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<Status>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('idle');

        const form = e.currentTarget;

        try {
            await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, { publicKey: PUBLIC_KEY });
            setStatus('success');
            form.reset();
        } catch (error) {
            console.error('Failed to send email:', error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-[var(--shadow-soft)]">
            <h3 className="mb-6 text-2xl font-bold text-foreground">{labels.heading}</h3>

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="space-y-2">
                    <label htmlFor={`${idPrefix}-name`} className="text-sm font-medium">
                        {labels.nameLabel}
                    </label>
                    <input
                        type="text"
                        id={`${idPrefix}-name`}
                        name="from_name"
                        required
                        className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder={labels.namePlaceholder}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor={`${idPrefix}-email`} className="text-sm font-medium">
                        {labels.emailLabel}
                    </label>
                    <input
                        type="email"
                        id={`${idPrefix}-email`}
                        name="from_email"
                        required
                        className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder={labels.emailPlaceholder}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor={`${idPrefix}-message`} className="text-sm font-medium">
                        {labels.messageLabel}
                    </label>
                    <textarea
                        id={`${idPrefix}-message`}
                        name="message"
                        required
                        rows={rows}
                        className="w-full resize-none rounded-xl border border-border/50 bg-background px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder={labels.messagePlaceholder}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary inline-flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSubmitting ? (
                        <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                            {labels.sending}
                        </>
                    ) : (
                        <>
                            <Send size={20} />
                            {labels.send}
                        </>
                    )}
                </button>

                {status !== 'idle' && (
                    <p
                        role="status"
                        aria-live="polite"
                        className={`flex items-center gap-2 text-sm ${
                            status === 'success' ? 'text-primary' : 'text-red-400'
                        }`}
                    >
                        {status === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                        {status === 'success' ? labels.success : labels.error}
                    </p>
                )}
            </form>
        </div>
    );
}
