/* ==========================================================
 * EDUCATIONCARD.TSX — Blueprint v4.0
 * Glassmorphism card for education items
 * Violet top-border, coursework pills, status badge
 * ========================================================== */
"use client"

import { motion } from 'framer-motion'
import type { EducationItem } from '@/types'
import { EASE_OUT } from '@/lib/constants'

interface EducationCardProps {
    item: EducationItem
    index: number
}

export default function EducationCard({ item, index }: EducationCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: EASE_OUT }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-glass-white backdrop-blur-sm border border-zinc-dark rounded-2xl p-8
                       border-t-2 border-t-violet"
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
                    <span className="font-mono text-[11px] text-violet uppercase tracking-wide">
                        Current
                    </span>
                </div>
            )}

            {/* CGPA */}
            {item.cgpa && (
                <p className="mt-3 font-mono text-sm text-violet">
                    CGPA: {item.cgpa}
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
        </motion.div>
    )
}
