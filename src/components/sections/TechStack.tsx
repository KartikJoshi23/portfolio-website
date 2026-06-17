/* ==========================================================
 * TECHSTACK.TSX — "How I Work"
 * Bento grid of capability domains. Each panel lists skills as
 * pills with brand icons (simple-icons CDN) where available.
 * Cursor-following spotlight glow on each panel.
 * ========================================================== */
"use client"

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { skillCategories } from '@/data/skills'
import { onSpotlightMove } from '@/lib/spotlight'
import { EASE_OUT } from '@/lib/constants'

const pillContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.03 },
    },
}

const pillItem = {
    hidden: { opacity: 0, scale: 0.8, y: 16 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.4, ease: EASE_OUT },
    },
}

export default function TechStack() {
    return (
        <section
            id="how-i-work"
            className="relative py-12 md:py-16 overflow-hidden"
        >
            {/* Subtle background gradient for depth */}
            <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124, 58, 237, 0.03) 0%, transparent 70%)',
                }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <SectionHeading
                    heading="How I Work"
                    subheading="Capabilities first. Tools second. The stack is there to support speed, clarity, and useful outcomes."
                />

                {/* Bento grid of capability domains */}
                <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {skillCategories.map((cat, i) => (
                        <ScrollReveal key={cat.category} delay={i * 0.05}>
                            <div
                                onMouseMove={onSpotlightMove}
                                className="spotlight-card group h-full rounded-2xl border border-white/8 bg-white/3 p-6 backdrop-blur-sm
                                           transition-all duration-500 hover:border-violet/25 hover:bg-white/5"
                            >
                                <div className="flex items-center gap-2.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-linear-to-r from-violet to-cyan" />
                                    <span className="font-sora text-[11px] font-medium uppercase tracking-[0.15em] text-cyan-300/90">
                                        {cat.category}
                                    </span>
                                </div>

                                <motion.div
                                    className="mt-4 flex flex-wrap gap-2"
                                    variants={pillContainer}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                    {cat.skills.map((skill) => (
                                        <motion.span
                                            key={skill.name}
                                            variants={pillItem}
                                            className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/3
                                                       px-3 py-1.5 font-inter text-[13px] text-cool-white/85
                                                       transition-all duration-300 hover:border-violet/40 hover:bg-violet/5 hover:text-cool-white"
                                        >
                                            {skill.icon && (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={`https://cdn.simpleicons.org/${skill.icon}/9898A6`}
                                                    alt=""
                                                    width={14}
                                                    height={14}
                                                    loading="lazy"
                                                    className="h-3.5 w-3.5 opacity-80"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none'
                                                    }}
                                                />
                                            )}
                                            {skill.name}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
