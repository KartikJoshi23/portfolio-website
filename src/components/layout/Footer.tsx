/* ==========================================================
 * FOOTER.TSX — EOF (end of forward pass)
 * Oversized ghost wordmark, decode-in EOF line, socials, and
 * a "back to input" control that reverses the journey.
 * ========================================================== */
"use client"

import { Linkedin, Github, Mail, ArrowUp } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import DecodeText from '@/components/motion/DecodeText'
import { PERSONAL } from '@/lib/constants'

const socials = [
    { Icon: Linkedin, href: PERSONAL.linkedin, label: 'LinkedIn' },
    { Icon: Github, href: PERSONAL.github, label: 'GitHub' },
    { Icon: Mail, href: `mailto:${PERSONAL.email}`, label: 'Email' },
]

export default function Footer() {
    const scrollToTop = () => {
        const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number) => void } }).__lenis
        if (lenis) {
            lenis.scrollTo(0)
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    return (
        <footer className="relative overflow-hidden bg-charcoal py-14">
            {/* Gradient top edge */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-violet/20 to-transparent" />

            {/* Ghost wordmark */}
            <p
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-sora font-bold uppercase text-white/[0.035]"
                style={{ fontSize: 'clamp(4rem, 14vw, 11rem)', lineHeight: 1 }}
            >
                Kartik Joshi
            </p>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
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

                {/* Credit */}
                <div className="mt-6 text-center">
                    <p className="font-inter text-sm text-silver">
                        Designed &amp; built by Kartik Joshi · Next.js, GSAP, Three.js
                    </p>
                </div>

                {/* Copyright + Back-to-top */}
                <div className="mt-9 flex items-center justify-between">
                    <p className="font-inter text-[13px] text-silver/60">
                        © {new Date().getFullYear()} Kartik Joshi. All rights reserved.
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
