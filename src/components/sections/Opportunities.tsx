/* ==========================================================
 * OPPORTUNITIES.TSX — Act 07 / ROUTING (decision boundary)
 * One signal trunk splits into three routed paths, each landing
 * on a collaboration card. Paths draw themselves on entry;
 * hovering a card makes its route conduct (bright + thick)
 * while the other branches quiet down.
 * ========================================================== */
"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { onSpotlightMove } from '@/lib/spotlight'
import { opportunities } from '@/data/opportunities'
import { EASE_OUT } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/* Branch endpoints at the three card centers (percent of row width). */
const BRANCH_X = [16.666, 50, 83.333]

export default function Opportunities() {
    const [hovered, setHovered] = useState<number | null>(null)
    const reduced = useReducedMotion()

    return (
        <section id="opportunities" className="relative py-16 md:py-24 overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 55% 45% at 80% 50%, rgba(6, 182, 212, 0.04) 0%, transparent 70%)',
                }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <SectionHeading
                    hud={
                        <>
                            [ 07 / <span className="hud-accent">ROUTING</span> ] · where the signal goes next
                        </>
                    }
                    heading="Ways To Work Together"
                    subheading="Three routes through the decision boundary — hiring, research, and product work."
                />

                {/* Routing diagram (desktop) */}
                <div className="mt-6 hidden lg:block" aria-hidden="true">
                    <svg
                        className="h-28 w-full"
                        viewBox="0 0 100 30"
                        preserveAspectRatio="none"
                    >
                        {/* trunk */}
                        <motion.path
                            d="M50 0 V 8"
                            fill="none"
                            stroke="#7C3AED"
                            strokeWidth="1.5"
                            vectorEffect="non-scaling-stroke"
                            initial={{ pathLength: reduced ? 1 : 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 0.4, ease: 'easeIn' }}
                            viewport={{ once: true, amount: 0.9 }}
                        />
                        {BRANCH_X.map((x, i) => {
                            const active = hovered === i
                            const dimmed = hovered !== null && !active
                            return (
                                <motion.path
                                    key={x}
                                    d={`M50 8 C 50 20, ${x} 14, ${x} 30`}
                                    fill="none"
                                    vectorEffect="non-scaling-stroke"
                                    initial={{ pathLength: reduced ? 1 : 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true, amount: 0.9 }}
                                    animate={{
                                        stroke: active ? '#06B6D4' : '#7C3AED',
                                        strokeWidth: active ? 2.4 : 1.4,
                                        opacity: dimmed ? 0.25 : active ? 1 : 0.7,
                                    }}
                                    transition={{
                                        pathLength: { duration: 0.7, delay: 0.35 + i * 0.12, ease: EASE_OUT },
                                        default: { duration: 0.3 },
                                    }}
                                    style={{
                                        filter: active
                                            ? 'drop-shadow(0 0 4px rgba(6,182,212,0.8))'
                                            : undefined,
                                    }}
                                />
                            )
                        })}
                    </svg>
                </div>

                <div className="mt-10 lg:mt-0 grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {opportunities.map((card, index) => (
                        <ScrollReveal key={card.number} delay={index * 0.12}>
                            <div
                                onMouseMove={onSpotlightMove}
                                onMouseEnter={() => setHovered(index)}
                                onMouseLeave={() => setHovered(null)}
                                className={`spotlight-card hud-corners group h-full rounded-2xl border p-6 md:p-7 backdrop-blur-sm transition-all duration-300 ${
                                    hovered === index
                                        ? 'border-cyan/40 bg-white/6 shadow-[0_0_40px_rgba(6,182,212,0.08)]'
                                        : 'border-white/8 bg-white/4'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-violet-bright">
                                        {card.eyebrow}
                                    </span>
                                    <span
                                        className={`font-mono text-[10px] transition-colors duration-300 ${
                                            hovered === index ? 'text-cyan' : 'text-silver/40'
                                        }`}
                                    >
                                        route 0{index + 1}
                                    </span>
                                </div>
                                <h3 className="mt-4 font-sora text-xl text-cool-white leading-snug">
                                    {card.title}
                                </h3>
                                <p className="mt-4 font-inter text-[15px] leading-7 text-silver/90">
                                    {card.description}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
