/* ==========================================================
 * SELECTEDWORK.TSX — Blueprint Section 5.4 (Redesigned)
 * 4 project showcase cards in 2x2 grid
 * ========================================================== */
"use client"

import SectionHeading from '@/components/ui/SectionHeading'
import ProjectCard from '@/components/ui/ProjectCard'
import { projects } from '@/data/projects'

export default function SelectedWork() {
    return (
        <section
            id="work"
            className="relative py-12 md:py-16 overflow-hidden"
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
                <div className="text-center [&_p]:mx-auto">
                    <SectionHeading
                        heading="What I've Built"
                        subheading="Not tutorials. Not toy projects. Production-grade systems with real stakes."
                    />
                </div>

                {/* Project Cards — 2x2 grid */}
                <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.number} project={project} index={i} variant="compact" />
                    ))}
                </div>
            </div>
        </section>
    )
}
