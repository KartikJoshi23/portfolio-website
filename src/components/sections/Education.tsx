/* ==========================================================
 * EDUCATION.TSX — Blueprint v4.0 (replaces Journey.tsx)
 * Education section with two side-by-side cards
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
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <SectionHeading
                    heading="Education"
                    subheading="Academic grounding for applied AI systems, with room for deeper collaboration and deeper technical study."
                />

                {/* Two cards side by side on desktop, stacked on mobile */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {education.map((item, i) => (
                        <EducationCard key={item.degree} item={item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
