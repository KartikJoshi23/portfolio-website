/* ==========================================================
 * FOOTER.TSX — Blueprint Section 5.9 (Enhanced)
 * Gradient top edge. Social icons centered.
 * "Designed & Built by Kartik Joshi" + tech note.
 * Copyright left, "Back to top" right.
 * ========================================================== */
"use client"

import { Linkedin, Github, Mail, ArrowUp } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
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
        <footer className="relative bg-charcoal py-12">
            {/* Gradient top edge instead of flat border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-violet/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Social Icons */}
                <div className="flex justify-center gap-5">
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

                {/* Credit + Tech */}
                <div className="mt-6 text-center">
                    <p className="font-inter text-sm text-silver">
                        Designed &amp; Built by Kartik Joshi
                    </p>
                    <p className="mt-1 font-mono text-xs text-zinc-dark">
                        Next.js · Tailwind CSS · Framer Motion
                    </p>
                </div>

                {/* Copyright + Back-to-top */}
                <div className="mt-8 flex items-center justify-between">
                    <p className="font-inter text-[13px] text-silver/60">
                        © 2025 Kartik Joshi. All rights reserved.
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-1.5 font-inter text-[13px] text-silver/60
                                   hover:text-violet transition-colors duration-300 cursor-pointer"
                        aria-label="Back to top"
                    >
                        Back to top
                        <ArrowUp className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </footer>
    )
}
