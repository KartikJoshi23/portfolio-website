/* ==========================================================
 * PROJECTCARD.TSX — Enhanced with visual header
 * Premium glassmorphism card with gradient visual area
 * Hover: violet glow shadow + border transition
 * Project number as subtle watermark
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
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const Icon = projectIcons[project.number] || BarChart3

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: EASE_OUT }}
            viewport={{ once: true, amount: 0.15 }}
            className="group relative bg-white/3 backdrop-blur-sm border border-white/8
                        rounded-2xl overflow-hidden
                        border-t-2 border-t-violet/60
                        transition-all duration-500
                        hover:border-white/15 hover:bg-white/5
                        hover:shadow-[0_0_80px_rgba(124,58,237,0.06)]"
        >
            {/* Visual header area — gradient with icon */}
            <div className="relative h-40 md:h-48 overflow-hidden">
                <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                        background: `linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(6, 182, 212, 0.08) 50%, rgba(16, 185, 129, 0.05) 100%)`,
                    }}
                />
                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="w-16 h-16 md:w-20 md:h-20 text-violet/30 transition-all duration-500 group-hover:text-violet/50 group-hover:scale-110" />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-violet/0 group-hover:bg-violet/5 transition-colors duration-500" />
                {/* Watermark number */}
                <span className="absolute right-4 -bottom-4 font-sora font-bold text-[100px] md:text-[140px]
                                 text-white/3 select-none pointer-events-none leading-none">
                    {project.number}
                </span>
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-10">
                {/* Top row: Status + Year */}
                <div className="flex items-center gap-3">
                    <StatusBadge status={project.status} />
                    <span className="font-mono text-sm text-silver">
                        {project.year}
                    </span>
                </div>

                {/* Title */}
                <h3 className="mt-5 font-sora font-semibold text-2xl md:text-3xl text-cool-white leading-tight
                               group-hover:text-violet transition-colors duration-300">
                    {project.title}
                </h3>

                {/* Subtitle */}
                <p className="mt-2 font-inter text-base text-silver/80 italic">
                    {project.subtitle}
                </p>

                {/* One-liner */}
                <p className="mt-4 font-inter text-base md:text-[17px] text-cool-white/90 leading-relaxed">
                    {project.oneLiner}
                </p>

                {/* Divider */}
                <div className="my-6 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

                {/* Highlights */}
                <ul className="space-y-2.5">
                    {project.highlights.map((h, i) => (
                        <li
                            key={i}
                            className="flex items-start gap-3 font-inter text-sm md:text-[15px] text-silver leading-relaxed"
                        >
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet shrink-0" />
                            {h}
                        </li>
                    ))}
                </ul>

                {/* Tech stack */}
                <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                        <span
                            key={t}
                            className="font-mono text-xs text-silver/80 bg-white/3
                                       border border-white/8 rounded-full px-3 py-1
                                       transition-all duration-300
                                       hover:border-violet/40 hover:text-cool-white"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
