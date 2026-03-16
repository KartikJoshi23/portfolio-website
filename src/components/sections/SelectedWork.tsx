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

                {/* Project Cards — 2 compact cards + 1 horizontal card */}
                <div className="mt-14 space-y-6">
                    {/* Top row: 2 side-by-side compact cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.slice(0, 2).map((project, i) => (
                            <ProjectCard key={project.number} project={project} index={i} variant="compact" />
                        ))}
                    </div>
                    {/* Bottom: Full-width horizontal card */}
                    {projects[2] && (
                        <ProjectCard project={projects[2]} index={2} variant="horizontal" />
                    )}
                </div>
            </div>
        </section>
    )
}
