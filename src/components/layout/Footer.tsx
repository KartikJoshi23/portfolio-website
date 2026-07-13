/* ==========================================================
 * FOOTER.TSX — the final frame
 * The site's climax: a short credits roll, then the wordmark
 * as the closing shot — outlined and hollow until the visitor
 * scrolls it full of signal (violet→cyan fill, scroll-scrubbed),
 * the EOF line, and a terminal left standing by.
 * ========================================================== */
"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Github, Mail, ArrowUp } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import DecodeText from '@/components/motion/DecodeText'
import { gsap } from '@/lib/gsap'
import { EASE_OUT, PERSONAL } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/* The micro credits roll — plays once as the footer enters. */
const CREDITS = [
    'Written, directed & engineered by Kartik Joshi',
    'Cinematography · Three.js, GSAP & six graded scenes',
    'Score · silence, by design',
]

const socials = [
    { Icon: Linkedin, href: PERSONAL.linkedin, label: 'LinkedIn' },
    { Icon: Github, href: PERSONAL.github, label: 'GitHub' },
    { Icon: Mail, href: `mailto:${PERSONAL.email}`, label: 'Email' },
]

/* Data motes — fixed values (not Math.random) so server and client
 * render identical markup. Violet/cyan sparks, varied paths. */
const MOTES: { left: number; size: number; delay: number; duration: number; color: string }[] = [
    { left: 8, size: 3, delay: 0, duration: 11, color: 'rgba(124,58,237,0.75)' },
    { left: 16, size: 2, delay: 4.2, duration: 14, color: 'rgba(6,182,212,0.6)' },
    { left: 27, size: 4, delay: 1.6, duration: 12.5, color: 'rgba(183,148,246,0.55)' },
    { left: 38, size: 2, delay: 6.8, duration: 10, color: 'rgba(6,182,212,0.7)' },
    { left: 47, size: 3, delay: 2.9, duration: 15, color: 'rgba(124,58,237,0.6)' },
    { left: 56, size: 2, delay: 8.1, duration: 11.5, color: 'rgba(183,148,246,0.65)' },
    { left: 64, size: 4, delay: 0.9, duration: 13, color: 'rgba(6,182,212,0.5)' },
    { left: 73, size: 2, delay: 5.4, duration: 10.5, color: 'rgba(124,58,237,0.7)' },
    { left: 82, size: 3, delay: 3.3, duration: 14.5, color: 'rgba(6,182,212,0.65)' },
    { left: 91, size: 2, delay: 7.2, duration: 12, color: 'rgba(183,148,246,0.6)' },
    { left: 21, size: 3, delay: 9.5, duration: 13.5, color: 'rgba(6,182,212,0.55)' },
    { left: 43, size: 2, delay: 11, duration: 12.5, color: 'rgba(124,58,237,0.65)' },
    { left: 60, size: 3, delay: 10.2, duration: 15.5, color: 'rgba(183,148,246,0.5)' },
    { left: 87, size: 4, delay: 12.4, duration: 11, color: 'rgba(124,58,237,0.55)' },
]

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null)
    const fillRef = useRef<HTMLParagraphElement>(null)
    const reduced = useReducedMotion()

    /* The closing shot: scrolling through the footer charges the
       hollow wordmark with signal, left to right. */
    useEffect(() => {
        if (reduced) {
            // Static: fully charged.
            if (fillRef.current) fillRef.current.style.clipPath = 'inset(0 0% 0 0)'
            return
        }
        const footer = footerRef.current
        const fill = fillRef.current
        if (!footer || !fill) return

        const ctx = gsap.context(() => {
            gsap.fromTo(
                fill,
                { clipPath: 'inset(0 100% 0 0)' },
                {
                    clipPath: 'inset(0 0% 0 0)',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: footer,
                        start: 'top 85%',
                        end: 'bottom bottom',
                        scrub: 0.5,
                    },
                }
            )
        }, footer)

        return () => ctx.revert()
    }, [reduced])

    const scrollToTop = () => {
        const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number) => void } }).__lenis
        if (lenis) {
            lenis.scrollTo(0)
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    return (
        // Semi-transparent: the particle field's final converged node
        // stays alive behind the credits instead of a flat wall.
        <footer ref={footerRef} className="relative overflow-hidden bg-charcoal/80 pt-16 pb-10">
            {/* Gradient top edge */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-violet/20 to-transparent" />

            {/* Rising glow behind the closing shot — breathes slowly */}
            <div
                className="footer-glow pointer-events-none absolute inset-x-0 bottom-0 h-96"
                aria-hidden="true"
            />

            {/* Data motes — sparks of signal drifting up through the frame */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                {MOTES.map((m, i) => (
                    <span
                        key={i}
                        className="mote"
                        style={{
                            left: `${m.left}%`,
                            width: m.size,
                            height: m.size,
                            background: m.color,
                            animationDelay: `${m.delay}s`,
                            animationDuration: `${m.duration}s`,
                        }}
                    />
                ))}
            </div>

            {/* Signal streaks — rare shooting-star sweeps behind the name */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                <span className="footer-streak" style={{ top: '38%', animationDelay: '1.5s' }} />
                <span className="footer-streak footer-streak-cyan" style={{ top: '58%', animationDelay: '6.5s' }} />
                <span className="footer-streak" style={{ top: '48%', animationDelay: '11s' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Credits roll */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ staggerChildren: 0.22 }}
                    className="space-y-2 text-center"
                >
                    {CREDITS.map((line) => (
                        <motion.p
                            key={line}
                            variants={{
                                hidden: { opacity: 0, y: 16 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.65, ease: EASE_OUT },
                                },
                            }}
                            className="font-inter text-[12.5px] text-silver/75"
                        >
                            {line}
                        </motion.p>
                    ))}
                </motion.div>

                {/* THE CLOSING SHOT — hollow wordmark charging with signal,
                    floating gently, light sweeping through once charged */}
                <div
                    className="wordmark-float relative mt-12 mb-10 select-none text-center"
                    aria-hidden="true"
                >
                    <p
                        className="wordmark-outline whitespace-nowrap font-sora font-bold uppercase"
                        style={{ fontSize: 'clamp(3rem, 11.5vw, 10rem)', lineHeight: 1, letterSpacing: '-0.02em' }}
                    >
                        Kartik&nbsp;Joshi
                    </p>
                    <p
                        ref={fillRef}
                        className="wordmark-fill absolute inset-0 whitespace-nowrap font-sora font-bold uppercase"
                        style={{
                            fontSize: 'clamp(3rem, 11.5vw, 10rem)',
                            lineHeight: 1,
                            letterSpacing: '-0.02em',
                            clipPath: 'inset(0 100% 0 0)',
                        }}
                    >
                        Kartik&nbsp;Joshi
                    </p>
                </div>

                {/* EOF line */}
                <p className="text-center font-mono text-[12px] tracking-[0.12em] text-silver/70">
                    <DecodeText text="[ end of forward pass — thanks for the signal ]" speed={18} />
                </p>

                {/* Social Icons */}
                <div className="mt-7 flex justify-center gap-5">
                    {socials.map(({ Icon, href, label }) => (
                        <MagneticButton key={label}>
                            <a
                                href={href}
                                target={label !== 'Email' ? '_blank' : undefined}
                                rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                                aria-label={label}
                                className="text-silver hover:text-violet transition-colors duration-300"
                            >
                                <Icon className="w-5 h-5" />
                            </a>
                        </MagneticButton>
                    ))}
                </div>

                {/* Credit — human weights, machine tools */}
                <div className="mt-6 text-center">
                    <p className="font-inter text-sm text-silver">
                        Built by Kartik Joshi 🧠 trained on curiosity ·
                        fine-tuned with Next.js, GSAP &amp; Three.js
                    </p>
                </div>

                {/* Bottom bar: © · standing by · back to input */}
                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                    <p className="font-inter text-[13px] text-silver/60">
                        © {new Date().getFullYear()} Kartik Joshi. All rights reserved.
                    </p>
                    <p className="caret font-mono text-[11px] tracking-[0.1em] text-silver/60">
                        status · awaiting the next signal
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-1.5 font-mono text-[12px] tracking-[0.06em] text-silver/60
                                   hover:text-violet transition-colors duration-300 cursor-pointer"
                        aria-label="Back to top"
                    >
                        back to input
                        <ArrowUp className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </footer>
    )
}
