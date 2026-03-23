/* ==========================================================
 * CONTACT.TSX — Blueprint Section 5.8
 * "Let's Talk" — Contact form + direct contacts
 * Left (55%): Formspree form with validation + submit states
 * Right (45%): Contact rows + social icons + availability
 * ========================================================== */
"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Mail,
    Phone,
    Linkedin,
    Github,
    MapPin,
    Send,
    Loader2,
    CheckCircle,
    AlertCircle,
} from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'
import MagneticButton from '@/components/ui/MagneticButton'
import { EASE_OUT, PERSONAL } from '@/lib/constants'

const contactRows = [
    { type: 'Email', value: PERSONAL.email, href: `mailto:${PERSONAL.email}`, Icon: Mail },
    { type: 'Phone', value: PERSONAL.phone, href: PERSONAL.phoneHref, Icon: Phone },
    { type: 'LinkedIn', value: 'kartikjoshi23', href: PERSONAL.linkedin, Icon: Linkedin },
    { type: 'GitHub', value: 'KartikJoshi23', href: PERSONAL.github, Icon: Github },
    { type: 'Location', value: PERSONAL.location, href: null, Icon: MapPin },
]

export default function Contact() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus('submitting')
        const form = e.currentTarget
        const formData = new FormData(form)

        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const message = formData.get('message') as string

        try {
            const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID
            if (!formspreeId) {
                // No Formspree ID — open mailto with pre-filled fields
                const subject = encodeURIComponent(`Portfolio Contact from ${name}`)
                const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
                window.open(`mailto:${PERSONAL.email}?subject=${subject}&body=${body}`, '_self')
                setStatus('success')
                form.reset()
                setTimeout(() => setStatus('idle'), 3000)
                return
            }

            const res = await fetch(
                `https://formspree.io/f/${formspreeId}`,
                {
                    method: 'POST',
                    body: formData,
                    headers: { Accept: 'application/json' },
                }
            )
            if (res.ok) {
                setStatus('success')
                form.reset()
                setTimeout(() => setStatus('idle'), 3000)
            } else {
                setStatus('error')
                setTimeout(() => setStatus('idle'), 3000)
            }
        } catch {
            setStatus('error')
            setTimeout(() => setStatus('idle'), 3000)
        }
    }

    return (
        <section
            id="contact"
            className="relative py-12 md:py-16 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header — Blueprint §5.8.2 */}
                <ScrollReveal>
                    <h2 className="font-sora font-semibold text-[28px] md:text-4xl text-cool-white max-w-2xl">
                        Got a project, an idea, or just want to say hello?
                    </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.15}>
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
                        viewport={{ once: true }}
                        className="mt-4 font-sora font-bold text-4xl md:text-[56px] text-violet"
                    >
                        Let&apos;s talk.
                    </motion.p>
                </ScrollReveal>

                {/* Availability */}
                <ScrollReveal delay={0.3}>
                    <div className="mt-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald" />
                        <span className="font-inter text-sm text-silver italic">
                            Building and collaborating on applied AI systems, research initiatives, and product execution.
                        </span>
                    </div>
                </ScrollReveal>

                {/* Two-column layout — Form + Contacts */}
                <div className="mt-14 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16">
                    {/* === Left: Contact Form === */}
                    <ScrollReveal direction="left">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
                        >
                            {/* Honeypot */}
                            <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                            {/* Name */}
                            <div className="mb-6">
                                <label htmlFor="contact-name" className="block font-inter text-[13px] text-silver uppercase tracking-[0.05em] mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="contact-name"
                                    name="name"
                                    required
                                    className="w-full bg-transparent border-b border-zinc-dark focus:border-violet
                                               text-cool-white font-inter text-base py-2 outline-none transition-colors"
                                    placeholder="Your name"
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-6">
                                <label htmlFor="contact-email" className="block font-inter text-[13px] text-silver uppercase tracking-[0.05em] mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="contact-email"
                                    name="email"
                                    required
                                    className="w-full bg-transparent border-b border-zinc-dark focus:border-violet
                                               text-cool-white font-inter text-base py-2 outline-none transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>

                            {/* Message */}
                            <div className="mb-8">
                                <label htmlFor="contact-message" className="block font-inter text-[13px] text-silver uppercase tracking-[0.05em] mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full bg-transparent border-b border-zinc-dark focus:border-violet
                                               text-cool-white font-inter text-base py-2 outline-none transition-colors resize-none"
                                    placeholder="Tell me about your project or idea..."
                                />
                            </div>

                            {/* Submit Button */}
                            <MagneticButton>
                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-sora font-medium text-sm uppercase tracking-[0.05em] transition-colors ${status === 'success'
                                            ? 'bg-emerald text-obsidian'
                                            : status === 'error'
                                                ? 'bg-rose-soft text-cool-white'
                                                : 'bg-linear-to-br from-violet to-cyan text-cool-white'
                                        }`}
                                >
                                    {status === 'idle' && (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Send Message
                                        </>
                                    )}
                                    {status === 'submitting' && (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Sending...
                                        </>
                                    )}
                                    {status === 'success' && (
                                        <>
                                            <CheckCircle className="w-4 h-4" />
                                            Message Sent ✓
                                        </>
                                    )}
                                    {status === 'error' && (
                                        <>
                                            <AlertCircle className="w-4 h-4" />
                                            Something went wrong
                                        </>
                                    )}
                                </button>
                            </MagneticButton>

                            {/* Formspree fallback */}
                            {status === 'error' && (
                                <p className="mt-3 font-inter text-[13px] text-silver text-center">
                                    Email directly at{' '}
                                    <a
                                        href={`mailto:${PERSONAL.email}`}
                                        className="text-violet hover:underline"
                                    >
                                        {PERSONAL.email}
                                    </a>
                                </p>
                            )}
                        </form>
                    </ScrollReveal>

                    {/* === Right: Contact Info === */}
                    <ScrollReveal direction="right">
                        <div className="space-y-5">
                            {contactRows.map(({ type, value, href, Icon }) => (
                                <div key={type} className="flex items-center gap-4">
                                    <Icon className="w-5 h-5 text-violet shrink-0" />
                                    <div>
                                        <span className="block font-inter text-sm text-silver">
                                            {type}
                                        </span>
                                        {href ? (
                                            <a
                                                href={href}
                                                target={type !== 'Email' && type !== 'Phone' ? '_blank' : undefined}
                                                rel={type !== 'Email' && type !== 'Phone' ? 'noopener noreferrer' : undefined}
                                                className="font-inter font-medium text-base text-cool-white hover:text-violet transition-colors break-all"
                                            >
                                                {value}
                                            </a>
                                        ) : (
                                            <span className="font-inter font-medium text-base text-cool-white break-all">
                                                {value}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social icons — glassmorphism circles */}
                        <div className="mt-10 flex gap-4">
                            {[
                                { Icon: Linkedin, href: PERSONAL.linkedin, label: 'LinkedIn' },
                                { Icon: Github, href: PERSONAL.github, label: 'GitHub' },
                                { Icon: Mail, href: `mailto:${PERSONAL.email}`, label: 'Email' },
                            ].map(({ Icon, href, label }) => (
                                <MagneticButton key={label}>
                                    <a
                                        href={href}
                                        target={label !== 'Email' ? '_blank' : undefined}
                                        rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                                        aria-label={label}
                                        className="flex items-center justify-center w-10 h-10 rounded-full
                                                   bg-white/5 backdrop-blur-sm border border-white/10
                                                   text-silver hover:text-violet hover:border-violet
                                                   transition-colors duration-300"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                </MagneticButton>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}
