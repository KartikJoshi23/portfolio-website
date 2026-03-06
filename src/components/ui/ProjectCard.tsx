/* ==========================================================
 * PROJECTCARD.TSX — Enhanced with visual header
 * Premium glassmorphism card with gradient visual area
 * Supports compact (grid) and horizontal (full-width) variants
 * ========================================================== */
"use client"

import { motion } from 'framer-motion'
import type { Project } from '@/types'
import StatusBadge from '@/components/ui/StatusBadge'
import { EASE_OUT } from '@/lib/constants'
import { BarChart3, Shield, Fingerprint } from 'lucide-react'

const projectIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    '01': BarChart3,
    '02': Shield,
    '03': Fingerprint,
}

interface ProjectCardProps {
    project: Project
    index: number
    variant?: 'compact' | 'horizontal'
}

function VisualHeader({ project, variant }: { project: Project; variant: 'compact' | 'horizontal' }) {
    const Icon = projectIcons[project.number] || BarChart3
    const isHorizontal = variant === 'horizontal'

    return (
        <div className={`relative overflow-hidden ${
            isHorizontal ? 'h-48 md:h-auto md:min-h-full' : 'h-32 md:h-36'
        }`}>
            <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                    background: `linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(6, 182, 212, 0.08) 50%, rgba(16, 185, 129, 0.05) 100%)`,
                }}
            />
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <Icon className={`text-violet/30 transition-all duration-500 group-hover:text-violet/50 group-hover:scale-110 ${
                    isHorizontal ? 'w-20 h-20 md:w-24 md:h-24' : 'w-12 h-12 md:w-16 md:h-16'
                }`} />
            </div>
            <div className="absolute inset-0 bg-violet/0 group-hover:bg-violet/5 transition-colors duration-500" />
            <span className={`absolute right-4 -bottom-4 font-sora font-bold
                             text-white/3 select-none pointer-events-none leading-none ${
                isHorizontal ? 'text-[120px] md:text-[160px]' : 'text-[80px] md:text-[100px]'
            }`}>
                {project.number}
            </span>
        </div>
    )
}

function CardContent({ project, variant }: { project: Project; variant: 'compact' | 'horizontal' }) {
    const isHorizontal = variant === 'horizontal'

    return (
        <div className={`relative z-10 ${isHorizontal ? 'p-6 md:p-8' : 'p-5 md:p-6'}`}>
            <div className="flex items-center gap-3">
                <StatusBadge status={project.status} />
                <span className="font-mono text-sm text-silver">
                    {project.year}
                </span>
            </div>

            <h3 className={`mt-4 font-sora font-semibold text-cool-white leading-tight
                           group-hover:text-violet transition-colors duration-300 ${
                isHorizontal ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
            }`}>
                {project.title}
            </h3>

            <p className={`mt-1.5 font-inter text-silver/80 italic ${
                isHorizontal ? 'text-base' : 'text-sm'
            }`}>
                {project.subtitle}
            </p>

            <p className={`mt-3 font-inter text-cool-white/90 leading-relaxed ${
                isHorizontal ? 'text-base md:text-[17px]' : 'text-sm md:text-[15px]'
            }`}>
                {project.oneLiner}
            </p>

            <div className="my-4 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

            <ul className={`space-y-2 ${isHorizontal ? '' : 'line-clamp-none'}`}>
                {project.highlights.map((h, i) => (
                    <li
                        key={i}
                        className={`flex items-start gap-2.5 font-inter text-silver leading-relaxed ${
                            isHorizontal ? 'text-sm md:text-[15px]' : 'text-xs md:text-sm'
                        }`}
                    >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet shrink-0" />
                        {h}
                    </li>
                ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                    <span
                        key={t}
                        className="font-mono text-xs text-silver/80 bg-white/3
                                   border border-white/8 rounded-full px-2.5 py-0.5
                                   transition-all duration-300
                                   hover:border-violet/40 hover:text-cool-white"
                    >
                        {t}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default function ProjectCard({ project, index, variant = 'compact' }: ProjectCardProps) {
    const isHorizontal = variant === 'horizontal'

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: EASE_OUT }}
            viewport={{ once: true, amount: 0.15 }}
            className={`group relative bg-white/3 backdrop-blur-sm border border-white/8
                        rounded-2xl overflow-hidden
                        border-t-2 border-t-violet/60
                        transition-all duration-500
                        hover:border-white/15 hover:bg-white/5
                        hover:shadow-[0_0_80px_rgba(124,58,237,0.06)]
                        ${isHorizontal ? 'md:flex md:flex-row' : 'h-full'}`}
        >
            {isHorizontal ? (
                <>
                    <div className="md:w-2/5 md:shrink-0">
                        <VisualHeader project={project} variant={variant} />
                    </div>
                    <div className="md:w-3/5">
                        <CardContent project={project} variant={variant} />
                    </div>
                </>
            ) : (
                <>
                    <VisualHeader project={project} variant={variant} />
                    <CardContent project={project} variant={variant} />
                </>
            )}
        </motion.div>
    )
}
