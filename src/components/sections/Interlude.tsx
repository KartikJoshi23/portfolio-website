/* ==========================================================
 * INTERLUDE.TSX — cinematic chapter title card
 * A full-bleed photographic band the visitor glides THROUGH
 * (no pinning) that now carries real information: the act
 * label, the chapter's title, and its statement line. The
 * image travels slower than the page (parallax) while the
 * title drifts on its own plane — depth without friction.
 * ========================================================== */
"use client"

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { gsap } from '@/lib/gsap'
import { EASE_OUT } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface InterludeProps {
    id: string
    image: string
    /** mono HUD label, e.g. "03 / INFERENCE · selected work" */
    label: React.ReactNode
    /** the chapter title, split into lines */
    titleLines: { text: string; em?: boolean }[]
    /** supporting statement under the title */
    sub?: string
    objectPosition?: string
}

export default function Interlude({
    id,
    image,
    label,
    titleLines,
    sub,
    objectPosition = 'center',
}: InterludeProps) {
    const sectionRef = useRef<HTMLElement>(null)
    const reduced = useReducedMotion()

    /* Image and title move on different planes while passing. */
    useEffect(() => {
        if (reduced) return
        const section = sectionRef.current
        if (!section) return

        const ctx = gsap.context(() => {
            const st = {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
            }
            gsap.fromTo(
                '.il-kenburns',
                { yPercent: -9, scale: 1.12 },
                { yPercent: 9, scale: 1.02, ease: 'none', scrollTrigger: st }
            )
            gsap.fromTo(
                '.il-content',
                { yPercent: 16 },
                { yPercent: -16, ease: 'none', scrollTrigger: { ...st } }
            )
        }, section)

        return () => ctx.revert()
    }, [reduced])

    return (
        <section
            id={id}
            ref={sectionRef}
            className="relative h-[80vh] md:h-[94vh] overflow-hidden"
            aria-label={titleLines.map((l) => l.text).join(' ')}
        >
            {/* Photograph, palette-graded, moving slower than the page */}
            <div className="il-kenburns absolute -inset-y-[14%] inset-x-0" style={{ willChange: 'transform' }}>
                <Image
                    src={image}
                    alt=""
                    fill
                    sizes="100vw"
                    quality={75}
                    className="scene-img-bright object-cover"
                    style={{ objectPosition }}
                />
            </div>
            <div className="scene-duotone absolute inset-0" aria-hidden="true" />
            {/* Soft edges blend the band into the obsidian flow above/below */}
            <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                    background:
                        'linear-gradient(to bottom, #09090B 0%, rgba(9,9,11,0.22) 22%, rgba(9,9,11,0.34) 55%, rgba(9,9,11,0.3) 78%, #09090B 100%)',
                }}
            />
            <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                    background:
                        'radial-gradient(ellipse 72% 58% at 50% 52%, rgba(9,9,11,0.5) 0%, transparent 72%)',
                }}
            />

            {/* HUD corner ticks — a title card, not a poster */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="hud-corners pointer-events-none absolute inset-6 sm:inset-10"
                aria-hidden="true"
            />

            {/* Chapter title block — on its own depth plane */}
            <div className="il-content relative z-10 flex h-full flex-col items-center justify-center px-6 text-center" style={{ willChange: 'transform' }}>
                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                    className="hud-label mb-6"
                >
                    [ {label} ]
                </motion.p>
                <h2
                    className="font-sora font-bold uppercase text-cool-white"
                    style={{
                        fontSize: 'clamp(2.2rem, 6vw, 5rem)',
                        letterSpacing: '-0.015em',
                        lineHeight: 1.08,
                    }}
                >
                    {titleLines.map((line, i) => (
                        <span key={line.text} className="block overflow-hidden">
                            <motion.span
                                initial={reduced ? undefined : { y: '112%' }}
                                whileInView={reduced ? undefined : { y: '0%' }}
                                viewport={{ once: true, amount: 0.8 }}
                                transition={{
                                    duration: 0.85,
                                    delay: 0.15 + i * 0.16,
                                    ease: EASE_OUT,
                                }}
                                className={`block ${line.em ? 'text-gradient' : ''}`}
                            >
                                {line.text}
                            </motion.span>
                        </span>
                    ))}
                </h2>
                {sub && (
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.7, delay: 0.5, ease: EASE_OUT }}
                        className="mt-6 font-inter italic text-silver text-base md:text-lg max-w-xl"
                    >
                        {sub}
                    </motion.p>
                )}
            </div>
        </section>
    )
}
