/* ==========================================================
 * EDUCATION.TSX — Act 06 / BACKPROP
 * Two degrees on a gradient rail with a live "gradient pulse"
 * traveling the wire — the past updating the present. Cards
 * open with clip-path wipes (the only section using wipes, so
 * the motion stays distinct).
 * ========================================================== */
"use client"

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import EducationCard from '@/components/ui/EducationCard'
import { education } from '@/data/education'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function Education() {
    const reduced = useReducedMotion()

    return (
        <section id="education" className="relative py-16 md:py-24 overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <SectionHeading
                    hud={
                        <>
                            [ 06 / <span className="hud-accent">BACKPROP</span> ] · the past updating the present
                        </>
                    }
                    heading="Where the Weights Formed"
                    subheading="Academic grounding for applied AI systems — currently mid-training in Dubai."
                />

                {/* Timeline */}
                <div className="relative mt-16">
                    {/* Gradient rail + traveling pulse */}
                    <span
                        aria-hidden="true"
                        className="absolute left-1.75 top-2 bottom-2 w-px bg-linear-to-b from-violet via-violet/40 to-transparent"
                    />
                    {!reduced && (
                        <span aria-hidden="true" className="backprop-pulse" />
                    )}

                    <ul className="space-y-8">
                        {education.map((item, i) => (
                            <li key={item.degree} className="relative pl-10 md:pl-12">
                                {/* Node */}
                                <span
                                    aria-hidden="true"
                                    className={`absolute left-0 top-6 h-3.5 w-3.5 rounded-full border-2 border-obsidian ${
                                        item.status === 'current'
                                            ? 'bg-violet animate-pulse-glow'
                                            : 'bg-zinc-dark'
                                    }`}
                                />
                                {/* Clip-path wipe reveal.
                                    The viewport trigger sits on this OUTER div (unclipped):
                                    Chrome's IntersectionObserver honors clip-path, so an
                                    element that starts fully self-clipped would never fire
                                    its own inView and deadlock hidden. */}
                                <motion.div
                                    initial={reduced ? undefined : 'hidden'}
                                    whileInView={reduced ? undefined : 'visible'}
                                    viewport={{ once: true, amount: 0.35 }}
                                >
                                    <motion.div
                                        variants={{
                                            hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0.4 },
                                            visible: { clipPath: 'inset(0 0% 0 0)', opacity: 1 },
                                        }}
                                        transition={{
                                            duration: 0.9,
                                            delay: i * 0.15,
                                            ease: [0.65, 0, 0.35, 1],
                                        }}
                                    >
                                        <EducationCard item={item} />
                                    </motion.div>
                                </motion.div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
