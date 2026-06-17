/* ==========================================================
 * PROJECTCARD.TSX — clinical, modern project card
 * Variants:
 *   - 'showcase' : large card for the homepage horizontal scroller
 *   - 'grid'     : compact card for the /projects archive grid
 * Entire card links to /projects/[slug]. Spotlight hover glow.
 * ========================================================== */
"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/types'
import StatusBadge from '@/components/ui/StatusBadge'
import ProjectCover from '@/components/ui/ProjectCover'
import { EASE_OUT } from '@/lib/constants'

interface ProjectCardProps {
    project: Project
    index?: number
    variant?: 'showcase' | 'grid'
}

function handleSpotlight(e: React.MouseEvent<HTMLElement>) {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

export default function ProjectCard({
    project,
    index = 0,
    variant = 'grid',
}: ProjectCardProps) {
    const isShowcase = variant === 'showcase'

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: EASE_OUT }}
            viewport={{ once: true, amount: 0.15 }}
            className="h-full"
        >
            <Link
                href={`/projects/${project.slug}`}
                onMouseMove={handleSpotlight}
                aria-label={`View ${project.title}`}
                className="spotlight-card group relative flex h-full flex-col overflow-hidden rounded-2xl
                           border border-white/8 bg-white/3 backdrop-blur-sm
                           transition-all duration-500
                           hover:border-violet/30 hover:bg-white/5
                           hover:shadow-[0_0_70px_rgba(124,58,237,0.10)]
                           focus-visible:border-violet/50"
            >
                {/* Cover */}
                <ProjectCover
                    project={project}
                    className={isShowcase ? 'h-52 md:h-60' : 'h-40'}
                    iconSize={isShowcase ? 60 : 44}
                />

                {/* Body */}
                <div className={`relative z-10 flex flex-1 flex-col ${isShowcase ? 'p-6 md:p-7' : 'p-5'}`}>
                    <div className="flex items-center gap-3">
                        <StatusBadge status={project.status} />
                        <span className="font-mono text-[11px] uppercase tracking-wider text-silver/70">
                            {project.category}
                        </span>
                        <span className="ml-auto font-mono text-xs text-silver/60">
                            {project.year}
                        </span>
                    </div>

                    <h3
                        className={`mt-3 font-sora font-semibold leading-tight text-cool-white
                                    transition-colors duration-300 group-hover:text-violet
                                    ${isShowcase ? 'text-2xl md:text-[28px]' : 'text-lg md:text-xl'}`}
                    >
                        {project.title}
                    </h3>
                    <p className={`mt-1 font-inter italic text-silver/75 ${isShowcase ? 'text-[15px]' : 'text-sm'}`}>
                        {project.subtitle}
                    </p>

                    <p className={`mt-3 font-inter leading-relaxed text-cool-white/85 ${isShowcase ? 'text-[15px]' : 'text-sm line-clamp-2'}`}>
                        {project.oneLiner}
                    </p>

                    {/* Metrics (showcase only) */}
                    {isShowcase && project.metrics && (
                        <div className="mt-5 grid grid-cols-3 gap-3">
                            {project.metrics.map((m) => (
                                <div
                                    key={m.label}
                                    className="rounded-xl border border-white/8 bg-white/2 px-3 py-2.5 text-center"
                                >
                                    <div className="font-sora text-base font-semibold text-cool-white md:text-lg">
                                        {m.value}
                                    </div>
                                    <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-silver/60">
                                        {m.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tech pills */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.tech.slice(0, isShowcase ? 8 : 4).map((t) => (
                            <span
                                key={t}
                                className="rounded-full border border-white/8 bg-white/3 px-2.5 py-0.5
                                           font-mono text-[11px] text-silver/80"
                            >
                                {t}
                            </span>
                        ))}
                        {!isShowcase && project.tech.length > 4 && (
                            <span className="px-1 py-0.5 font-mono text-[11px] text-silver/50">
                                +{project.tech.length - 4}
                            </span>
                        )}
                    </div>

                    {/* Footer affordance */}
                    <div className="mt-auto flex items-center gap-1.5 pt-5 font-sora text-sm font-medium text-violet
                                    opacity-80 transition-all duration-300 group-hover:gap-2.5 group-hover:opacity-100">
                        View project
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
