/* ==========================================================
 * EDUCATION.TSX — vertical timeline
 * Gradient rail with status-aware nodes; cards reveal on scroll.
 * ========================================================== */
"use client"

import SectionHeading from '@/components/ui/SectionHeading'
import EducationCard from '@/components/ui/EducationCard'
import { education } from '@/data/education'

export default function Education() {
    return (
        <section
            id="education"
            className="relative py-12 md:py-16 overflow-hidden"
        >
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <SectionHeading
                    heading="Education"
                    subheading="Academic grounding for applied AI systems, with room for deeper collaboration and deeper technical study."
                />

                {/* Timeline */}
                <div className="relative mt-16">
                    {/* Gradient rail */}
                    <span
                        aria-hidden="true"
                        className="absolute left-1.75 top-2 bottom-2 w-px bg-linear-to-b from-violet via-violet/40 to-transparent"
                    />

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
                                <EducationCard item={item} index={i} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
