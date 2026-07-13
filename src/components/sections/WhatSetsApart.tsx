/* ==========================================================
 * WHATSETSAPART.TSX — Act 02 / REPRESENTATION (id="about")
 * The editorial intro surfaces line-by-line through masks;
 * the three value cards assemble like layers of a network:
 * a signal spine draws itself down the column (scroll-scrubbed
 * SVG) and each card "connects" — sliding in from alternating
 * sides with its node lighting up as the spine reaches it.
 * ========================================================== */
"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import MaskReveal from '@/components/motion/MaskReveal'
import { gsap } from '@/lib/gsap'
import { EASE_OUT } from '@/lib/constants'
import { valueCards } from '@/data/valueCards'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const introPoints = [
    'Designed for recruiters, research leads, and product teams evaluating real execution depth.',
    'Comfortable moving between AI system design, architecture, experimentation, and delivery.',
    'Best work sits where applied AI, usable products, and fast iteration meet.',
]

export default function WhatSetsApart() {
    const spineRef = useRef<SVGPathElement>(null)
    const cardsColRef = useRef<HTMLDivElement>(null)
    const reduced = useReducedMotion()

    /* The spine draws as the cards column crosses the viewport. */
    useEffect(() => {
        if (reduced) return
        const path = spineRef.current
        const col = cardsColRef.current
        if (!path || !col) return

        const len = path.getTotalLength()
        path.style.strokeDasharray = `${len}`
        path.style.strokeDashoffset = `${len}`

        const ctx = gsap.context(() => {
            gsap.to(path, {
                strokeDashoffset: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: col,
                    start: 'top 78%',
                    end: 'bottom 45%',
                    scrub: 0.6,
                },
            })
        }, col)

        return () => ctx.revert()
    }, [reduced])

    return (
        <section id="about" className="relative py-16 md:py-24 overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 50% at 20% 35%, rgba(124, 58, 237, 0.04) 0%, transparent 65%)',
                }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* items-stretch + flex column on the left: the bullet block
                    anchors to the bottom so both columns end together —
                    no orphaned blank space under the editorial side. */}
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-14 items-stretch">
                    {/* --- Editorial intro --- */}
                    <div className="max-w-2xl lg:flex lg:flex-col">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true, amount: 0.4 }}
                            className="hud-label"
                        >
                            [ 02 / <span className="hud-accent">REPRESENTATION</span> ] · what the network learned
                        </motion.p>

                        <MaskReveal
                            as="h2"
                            text="Demos are easy. Shipping is the job."
                            className="mt-4 font-sora font-semibold text-3xl md:text-5xl text-cool-white leading-tight"
                            stagger={0.045}
                        />

                        <MaskReveal
                            text="My work covers the full lifecycle of an intelligent system — framing the problem, architecting the models and data flows, engineering the backend, and delivering an interface people actually want to use."
                            className="mt-6 font-inter text-base md:text-lg text-silver leading-[1.9]"
                            stagger={0.012}
                        />

                        <MaskReveal
                            text="That range is deliberate. AI moves too fast for narrow specialists — the engineers who matter are the ones who can carry an idea across every layer of the stack without losing momentum, or rigor."
                            className="mt-5 font-inter text-base md:text-lg text-silver leading-[1.9]"
                            stagger={0.012}
                        />

                        <div className="mt-7 space-y-3 border-t border-white/8 pt-6 lg:mt-auto">
                            {introPoints.map((point, i) => (
                                <motion.div
                                    key={point}
                                    initial={{ opacity: 0, x: -18 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: EASE_OUT }}
                                    viewport={{ once: true, amount: 0.6 }}
                                    className="flex items-start gap-3"
                                >
                                    <span className="mt-1.5 h-2 w-2 rounded-full bg-violet shrink-0" />
                                    <p className="font-inter text-sm md:text-[15px] text-silver/90 leading-7">
                                        {point}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                    </div>

                    {/* --- Value cards as connected network layers --- */}
                    <div ref={cardsColRef} className="relative">
                        {/* Signal spine (drawn by scroll) */}
                        <svg
                            className="pointer-events-none absolute left-[13px] top-0 h-full w-8 hidden sm:block"
                            viewBox="0 0 32 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M16 0 V 100"
                                stroke="rgba(255,255,255,0.08)"
                                strokeWidth="1"
                                fill="none"
                                vectorEffect="non-scaling-stroke"
                            />
                            <path
                                ref={spineRef}
                                d="M16 0 V 100"
                                stroke="url(#spine-grad)"
                                strokeWidth="1.5"
                                fill="none"
                                vectorEffect="non-scaling-stroke"
                            />
                            <defs>
                                <linearGradient id="spine-grad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#7C3AED" />
                                    <stop offset="100%" stopColor="#06B6D4" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <div className="space-y-5 sm:pl-14">
                            {valueCards.map((card, i) => (
                                <motion.div
                                    key={card.number}
                                    initial={{ opacity: 0, x: i % 2 ? 44 : -20, y: 16 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    transition={{ duration: 0.65, delay: i * 0.08, ease: EASE_OUT }}
                                    viewport={{ once: true, amount: 0.45 }}
                                    className="relative"
                                >
                                    {/* Node on the spine */}
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ duration: 0.4, delay: 0.25 + i * 0.08, ease: EASE_OUT }}
                                        viewport={{ once: true, amount: 0.45 }}
                                        className="absolute -left-14 top-8 hidden sm:flex h-[13px] w-[13px] items-center justify-center"
                                        aria-hidden="true"
                                    >
                                        <span className="absolute h-full w-full rounded-full bg-violet/30" />
                                        <span className="h-[7px] w-[7px] rounded-full bg-violet shadow-[0_0_10px_rgba(124,58,237,0.9)]" />
                                    </motion.span>
                                    {/* Connector from spine to card */}
                                    <span
                                        className="absolute -left-[42px] top-[45px] hidden sm:block h-px w-[42px] bg-linear-to-r from-violet/60 to-transparent"
                                        aria-hidden="true"
                                    />

                                    <div className="glass-panel hud-corners group relative h-full rounded-2xl p-5 md:p-6 transition-colors duration-500 hover:border-violet/25">
                                        <span className="font-mono text-sm text-cyan/90">
                                            layer {card.number}
                                        </span>
                                        <h3 className="mt-2 font-sora font-semibold text-xl md:text-[22px] text-cool-white">
                                            {card.title}
                                        </h3>
                                        <p className="mt-2 font-inter text-sm md:text-[15px] text-silver/90 leading-[1.7]">
                                            {card.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
