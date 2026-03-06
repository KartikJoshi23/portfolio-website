/* ==========================================================
 * TECHSTACK.TSX — Blueprint v4.0 (was Arsenal.tsx)
 * "My Arsenal" — 5 skill categories with wrapped pill layout
 * Individual pills stagger in on scroll
 * ========================================================== */
"use client"

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { skillCategories } from '@/data/skills'
import { EASE_OUT } from '@/lib/constants'

const pillContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.04 },
    },
}

const pillItem = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
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
            id="skills"
            className="relative py-24 md:py-32"
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
                <SectionHeading heading="My Arsenal" />

                {/* Skill categories — wrapped pill groups */}
                <div className="mt-14 space-y-10">
                    {skillCategories.map((cat, i) => (
                        <ScrollReveal key={cat.category} delay={i * 0.05}>
                            <div>
                                <span className="font-sora font-medium text-[11px] text-violet/70 uppercase tracking-[0.15em]">
                                    {cat.category}
                                </span>
                                <motion.div
                                    className="mt-3 flex flex-wrap gap-3"
                                    variants={pillContainer}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                    {cat.skills.map((skill) => (
                                        <motion.span
                                            key={skill.name}
                                            variants={pillItem}
                                            className="shrink-0 flex items-center gap-2 font-inter text-[13px] text-cool-white/90
                                                       bg-white/3 border border-white/8 rounded-full
                                                       px-5 py-2.5 whitespace-nowrap backdrop-blur-sm
                                                       transition-all duration-300
                                                       hover:border-violet/40 hover:bg-violet/5 hover:text-cool-white"
                                        >
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
