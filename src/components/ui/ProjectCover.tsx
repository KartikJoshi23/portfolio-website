/* ==========================================================
 * PROJECTCOVER.TSX
 * Reusable cover visual for a project. Uses the real `image`
 * when present, otherwise a generated category-accented gradient
 * with the project icon and ghost number. Shared by cards + detail.
 * ========================================================== */
"use client"

import Image from 'next/image'
import type { Project } from '@/types'
import { getProjectVisual } from '@/lib/projectVisuals'

interface ProjectCoverProps {
    project: Project
    className?: string
    iconSize?: number
    rounded?: string
}

export default function ProjectCover({
    project,
    className = '',
    iconSize = 56,
    rounded = '',
}: ProjectCoverProps) {
    const { Icon, from, to } = getProjectVisual(project.category, project.slug)

    if (project.image) {
        return (
            <div className={`relative overflow-hidden ${rounded} ${className}`}>
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-obsidian/70 via-transparent to-transparent" />
            </div>
        )
    }

    return (
        <div className={`relative overflow-hidden ${rounded} ${className}`}>
            {/* accent gradient wash */}
            <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                style={{
                    background: `radial-gradient(120% 120% at 15% 15%, ${from}33 0%, transparent 55%), radial-gradient(120% 120% at 85% 85%, ${to}26 0%, transparent 55%), #0d0d12`,
                }}
            />
            {/* dotted mesh */}
            <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)',
                    backgroundSize: '22px 22px',
                }}
            />
            {/* ghost number */}
            <span className="absolute -right-2 -bottom-6 font-sora font-bold text-white/4 select-none pointer-events-none leading-none text-[120px] md:text-[150px]">
                {project.number}
            </span>
            {/* center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div
                    className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 group-hover:border-violet/40 group-hover:bg-white/8"
                    style={{ width: iconSize + 28, height: iconSize + 28 }}
                >
                    <Icon
                        style={{ width: iconSize, height: iconSize, color: from }}
                        className="transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
            </div>
        </div>
    )
}
