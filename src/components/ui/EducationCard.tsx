/* ==========================================================
 * EDUCATIONCARD.TSX — Blueprint v4.0
 * Glassmorphism card for education items
 * Violet top-border, coursework pills, status badge
 * ========================================================== */
"use client"

import type { EducationItem } from '@/types'
import { onSpotlightMove } from '@/lib/spotlight'

interface EducationCardProps {
    item: EducationItem
}

export default function EducationCard({ item }: EducationCardProps) {
    // Entrance animation is owned by the Education section's clip-path
    // wrapper — animating here too would double-reveal the card.
    return (
        <div
            onMouseMove={onSpotlightMove}
            className="spotlight-card bg-glass-white backdrop-blur-sm border border-zinc-dark rounded-2xl p-8
                       border-t-2 border-t-violet transition-colors duration-500 hover:border-t-violet hover:border-white/15"
        >
            {/* Degree */}
            <h3 className="font-sora font-semibold text-[22px] text-cool-white">
                {item.degree}
            </h3>

            {/* Institution */}
            <p className="mt-2 font-inter font-medium text-base text-cool-white">
                {item.institution}
            </p>

            {/* Location + Period */}
            <p className="mt-1 font-inter text-sm text-silver">
                {item.location} · {item.period}
            </p>

            {/* Status badge (current only) */}
            {item.status === 'current' && (
                <div className="mt-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet animate-pulse-glow" />
                    <span className="font-mono text-[11px] text-cyan-300 uppercase tracking-wide">
                        Current
                    </span>
                </div>
            )}

            {/* GPA */}
            {item.cgpa && (
                <p className="mt-3 font-mono text-sm text-cyan-300">
                    GPA: {item.cgpa}
                </p>
            )}

            {/* Coursework pills */}
            {item.coursework && item.coursework.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {item.coursework.map((course) => (
                        <span
                            key={course}
                            className="font-mono text-xs text-silver bg-charcoal border border-zinc-dark
                                       rounded-full px-3 py-1"
                        >
                            {course}
                        </span>
                    ))}
                </div>
            )}

            {/* Highlight */}
            {item.highlight && (
                <p className="mt-4 font-inter text-sm text-silver italic">
                    {item.highlight}
                </p>
            )}
        </div>
    )
}
