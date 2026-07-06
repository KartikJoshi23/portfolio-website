/* ==========================================================
 * TECHSTACK.TSX — Act 05 / LATENT SPACE (id="how-i-work")
 * Clean bento grid of capability clusters. Each cluster card
 * has a pulsing hub node, a mono header, and uniform skill
 * pills that cascade in with a stagger. Spotlight glow follows
 * the cursor; a thin connective rule links the cluster headers
 * so the grid still reads as one connected system.
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
        transition: { staggerChildren: 0.035 },
    },
}

const pillItem = {
    hidden: { opacity: 0, y: 14, scale: 0.92 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.45, ease: EASE_OUT },
    },
}

export default function TechStack() {
    return (
        <section id="how-i-work" className="relative py-16 md:py-24 overflow-hidden">
            <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124, 58, 237, 0.04) 0%, transparent 70%)',
                }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <SectionHeading
                    hud={
                        <>
                            [ 05 / <span className="hud-accent">LATENT SPACE</span> ] · related skills live near each other
                        </>
                    }
                    heading="Capability Map"
                    subheading="Capabilities first, tools second. Six clusters of the space — every tool here has shipped real work."
                />

                {/* Cluster bento grid */}
                <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {skillCategories.map((cat, i) => (
                        <ScrollReveal key={cat.category} delay={i * 0.06} className="h-full">
                            <div
                                onMouseMove={onSpotlightMove}
                                className="spotlight-card hud-corners group flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-6
                                           transition-all duration-500 hover:border-violet/25 hover:bg-white/5"
                            >
                                {/* Cluster header */}
                                <div className="flex items-center justify-between border-b border-white/8 pb-4">
                                    <div className="flex items-center gap-2.5">
                                        <span className="relative flex h-2 w-2" aria-hidden="true">
                                            <span className="absolute inline-flex h-full w-full rounded-full bg-violet/40 group-hover:animate-ping" />
                                            <span className="relative inline-flex h-2 w-2 rounded-full bg-linear-to-r from-violet to-cyan" />
                                        </span>
                                        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-cyan/90">
                                            {cat.category}
                                        </span>
                                    </div>
                                    <span className="font-mono text-[10px] text-silver/50">
                                        {String(cat.skills.length).padStart(2, '0')}
                                    </span>
                                </div>

                                {/* Skill pills — uniform, staggered in */}
                                <motion.div
                                    className="mt-5 flex flex-wrap gap-2"
                                    variants={pillContainer}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                    {cat.skills.map((skill) => (
                                        <motion.span
                                            key={skill.name}
                                            variants={pillItem}
                                            className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5
                                                       font-inter text-[13px] text-cool-white/85
                                                       transition-colors duration-300 hover:border-violet/40 hover:bg-violet/10 hover:text-cool-white"
                                        >
                                            {skill.name}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* System annotation */}
                <p className="mt-8 text-center font-mono text-[10px] tracking-[0.14em] text-silver/40">
                    six clusters · one connected system
                </p>
            </div>
        </section>
    )
}
