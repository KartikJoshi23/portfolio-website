/* ==========================================================
 * SELECTEDWORK.TSX — Blueprint Section 5.4 (Redesigned)
 * THE centerpiece — 3 project showcase cards
 * Clean vertical stack, no alternating layout
 * Subtle gradient background for section depth
 * ========================================================== */
"use client"

import SectionHeading from '@/components/ui/SectionHeading'
import ProjectCard from '@/components/ui/ProjectCard'
import { projects } from '@/data/projects'

export default function SelectedWork() {
    return (
        <section
            id="work"
            className="relative py-24 md:py-32"
        >
            {/* Subtle background gradient */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 80% 50% at 20% 50%, rgba(124, 58, 237, 0.02) 0%, transparent 60%)',
                }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <SectionHeading
                    heading="Selected Work"
                    subheading="Not tutorials. Not toy projects. Production-grade systems with real stakes."
                />

                {/* Project Cards — vertical stack, constrained for readability */}
                <div className="mt-16 max-w-4xl mx-auto flex flex-col gap-8 md:gap-10">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.number} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
