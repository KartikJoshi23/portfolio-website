/* ==========================================================
 * CONTACT.TSX — Act 08 / OUTPUT (the output layer)
 * The particle field converges into a single node behind this
 * section; the form is styled as a terminal session (mono
 * prompts, underline inputs) and a successful submit fires a
 * radial "signal emitted" pulse from the button.
 * Form logic: Formspree when configured, mailto fallback.
 * ========================================================== */
"use client"

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
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
import ScrollReveal from '@/components/ui/ScrollReveal'
import MagneticButton from '@/components/ui/MagneticButton'
import DecodeText from '@/components/motion/DecodeText'
import { PERSONAL } from '@/lib/constants'

const contactRows = [
    { type: 'email', value: PERSONAL.email, href: `mailto:${PERSONAL.email}`, Icon: Mail },
    { type: 'phone', value: PERSONAL.phone, href: PERSONAL.phoneHref, Icon: Phone },
    { type: 'linkedin', value: 'in/kartikjoshi23', href: PERSONAL.linkedin, Icon: Linkedin },
    { type: 'github', value: 'KartikJoshi23', href: PERSONAL.github, Icon: Github },
    { type: 'location', value: PERSONAL.location, href: null, Icon: MapPin },
]

const inputClasses =
    'w-full bg-transparent border-b border-zinc-dark focus:border-cyan text-cool-white font-inter text-base py-2 outline-none transition-colors'

export default function Contact() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    // Sticks after the first successful send — the terminal's reply.
    const [acked, setAcked] = useState(false)

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
                setAcked(true)
                form.reset()
                setTimeout(() => setStatus('idle'), 3500)
                return
            }

            const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
                method: 'POST',
                body: formData,
                headers: { Accept: 'application/json' },
            })
            if (res.ok) {
                setStatus('success')
                setAcked(true)
                form.reset()
                setTimeout(() => setStatus('idle'), 3500)
            } else {
                setStatus('error')
                setTimeout(() => setStatus('idle'), 3500)
            }
        } catch {
            setStatus('error')
            setTimeout(() => setStatus('idle'), 3500)
        }
    }

    return (
        <section id="contact" className="relative py-20 md:py-28 overflow-hidden">
            {/* The dawn lives INSIDE the output layer — the story's last
                scene is the backdrop of the conversation, not a break
                before it. Heavier veils keep the terminal legible. */}
            <div className="absolute inset-0" aria-hidden="true">
                <Image
                    src="/scenes/dawn.jpg"
                    alt=""
                    fill
                    sizes="100vw"
                    quality={70}
                    className="scene-img-bright object-cover"
                    style={{ objectPosition: 'center 28%' }}
                />
                <div className="scene-duotone absolute inset-0" />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(to bottom, #09090B 0%, rgba(9,9,11,0.55) 18%, rgba(9,9,11,0.68) 55%, rgba(9,9,11,0.86) 100%)',
                    }}
                />
            </div>

            {/* Converged-node glow behind the section */}
            <div
                className="pointer-events-none absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 h-150 w-150 rounded-full"
                aria-hidden="true"
                style={{
                    background:
                        'radial-gradient(circle, rgba(124,58,237,0.14) 0%, rgba(6,182,212,0.05) 45%, transparent 70%)',
                    filter: 'blur(24px)',
                }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <p className="hud-label">
                        [ 08 / <span className="hud-accent">OUTPUT</span> ] · the next model is always in training
                    </p>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                    <h2 className="mt-4 font-sora font-semibold text-[28px] md:text-4xl text-cool-white max-w-2xl">
                        Got a project, an idea, or a role worth building for?
                    </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.18}>
                    <p className="mt-3 font-sora font-bold text-4xl md:text-[56px] text-gradient">
                        Let&apos;s talk.
                    </p>
                </ScrollReveal>

                <ScrollReveal delay={0.28}>
                    <div className="mt-5 flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
                        </span>
                        <span className="text-legible font-mono text-[12px] tracking-[0.06em] text-cool-white/80">
                            accepting new signals · AI roles, research, product builds
                        </span>
                    </div>
                </ScrollReveal>

                {/* Two-column layout — terminal form + direct channels */}
                <div className="mt-14 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16">
                    {/* === Left: terminal session === */}
                    <ScrollReveal direction="left">
                        <form
                            onSubmit={handleSubmit}
                            className="glass-panel hud-corners relative rounded-2xl p-6 md:p-8"
                        >
                            {/* Terminal chrome */}
                            <div className="mb-7 flex items-center justify-between border-b border-white/8 pb-4">
                                <p className="font-mono text-[11px] tracking-[0.1em] text-silver/70">
                                    kartik@forward-pass:~$ <span className="text-cyan">new-conversation</span>
                                </p>
                                <span className="flex gap-1.5" aria-hidden="true">
                                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald/60" />
                                </span>
                            </div>

                            {/* Honeypot */}
                            <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                            <div className="mb-6">
                                <label htmlFor="contact-name" className="block font-mono text-[12px] text-silver tracking-[0.05em] mb-2">
                                    <span className="text-cyan">&gt;</span> name:
                                </label>
                                <input
                                    type="text"
                                    id="contact-name"
                                    name="name"
                                    required
                                    className={inputClasses}
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="contact-email" className="block font-mono text-[12px] text-silver tracking-[0.05em] mb-2">
                                    <span className="text-cyan">&gt;</span> reply_to:
                                </label>
                                <input
                                    type="email"
                                    id="contact-email"
                                    name="email"
                                    required
                                    className={inputClasses}
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className="mb-8">
                                <label htmlFor="contact-message" className="block font-mono text-[12px] text-silver tracking-[0.05em] mb-2">
                                    <span className="text-cyan">&gt;</span> payload:
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    required
                                    rows={4}
                                    className={`${inputClasses} resize-none`}
                                    placeholder="Tell me about your project, role, or idea..."
                                />
                            </div>

                            {/* Submit + emission pulse */}
                            <div className="relative">
                                <AnimatePresence>
                                    {status === 'success' && (
                                        <motion.span
                                            key="pulse"
                                            initial={{ scale: 0.4, opacity: 0.7 }}
                                            animate={{ scale: 2.6, opacity: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1.1, ease: 'easeOut' }}
                                            className="pointer-events-none absolute inset-0 rounded-xl bg-emerald/30"
                                            aria-hidden="true"
                                        />
                                    )}
                                </AnimatePresence>
                                <MagneticButton as="div" className="w-full">
                                    <button
                                        type="submit"
                                        data-cursor="send"
                                        disabled={status === 'submitting'}
                                        className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-sora font-medium text-sm uppercase tracking-[0.05em] transition-colors ${
                                            status === 'success'
                                                ? 'bg-emerald text-obsidian'
                                                : status === 'error'
                                                    ? 'bg-rose-soft text-cool-white'
                                                    : 'bg-linear-to-br from-violet to-cyan text-cool-white'
                                        }`}
                                    >
                                        {status === 'idle' && (
                                            <>
                                                <Send className="w-4 h-4" />
                                                Emit Signal
                                            </>
                                        )}
                                        {status === 'submitting' && (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Transmitting...
                                            </>
                                        )}
                                        {status === 'success' && (
                                            <>
                                                <CheckCircle className="w-4 h-4" />
                                                Signal received ✓
                                            </>
                                        )}
                                        {status === 'error' && (
                                            <>
                                                <AlertCircle className="w-4 h-4" />
                                                Transmission failed
                                            </>
                                        )}
                                    </button>
                                </MagneticButton>
                            </div>

                            {status === 'error' && (
                                <p className="mt-3 font-inter text-[13px] text-silver text-center">
                                    Email directly at{' '}
                                    <a href={`mailto:${PERSONAL.email}`} className="text-violet hover:underline">
                                        {PERSONAL.email}
                                    </a>
                                </p>
                            )}

                            {/* The terminal replies — closes the fiction properly */}
                            {acked && (
                                <p className="mt-4 border-t border-white/8 pt-3 font-mono text-[11px] tracking-[0.06em] text-emerald/90">
                                    <DecodeText
                                        text="ack · signal received — expect a reply within 24h"
                                        immediate
                                        speed={22}
                                    />
                                </p>
                            )}
                        </form>
                    </ScrollReveal>

                    {/* === Right: direct channels === */}
                    <ScrollReveal direction="right">
                        <div className="space-y-5">
                            {contactRows.map(({ type, value, href, Icon }) => (
                                <div key={type} className="flex items-center gap-4">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/[0.04] text-violet">
                                        <Icon className="w-4.5 h-4.5" />
                                    </span>
                                    <div>
                                        <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-silver/70">
                                            {type}
                                        </span>
                                        {href ? (
                                            <a
                                                href={href}
                                                target={type !== 'email' && type !== 'phone' ? '_blank' : undefined}
                                                rel={type !== 'email' && type !== 'phone' ? 'noopener noreferrer' : undefined}
                                                className="font-inter font-medium text-base text-cool-white hover:text-cyan transition-colors break-all"
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

                        {/* Response-time note */}
                        <div className="mt-8 rounded-xl border border-white/8 bg-white/[0.02] px-5 py-4">
                            <p className="font-mono text-[11px] tracking-[0.08em] text-silver/70">
                                <DecodeText text="avg_response_time < 24h" speed={40} />
                            </p>
                        </div>

                        {/* Social icons */}
                        <div className="mt-8 flex gap-4">
                            {[
                                { Icon: Linkedin, href: PERSONAL.linkedin, label: 'LinkedIn' },
                                { Icon: Github, href: PERSONAL.github, label: 'GitHub' },
                                { Icon: Mail, href: `mailto:${PERSONAL.email}`, label: 'Email' },
                            ].map(({ Icon, href, label }) => (
                                <MagneticButton
                                    key={label}
                                    as="a"
                                    href={href}
                                    target={label !== 'Email' ? '_blank' : undefined}
                                    rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                                    ariaLabel={label}
                                    className="w-10 h-10 rounded-full glass-panel text-silver hover:text-cyan hover:border-cyan/40 transition-colors duration-300"
                                >
                                    <Icon className="w-5 h-5" />
                                </MagneticButton>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}
