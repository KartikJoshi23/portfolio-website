/* ==========================================================
 * STATUSBADGE.TSX — Blueprint Section 5.4.3
 * Pill-shaped status badge for project cards
 * "Completed": sage green bg, obsidian text
 * "In Progress": ember gold bg, obsidian text
 * JetBrains Mono, 12px, uppercase, letter-spacing 0.1em
 * ========================================================== */
"use client"

interface StatusBadgeProps {
    status: 'completed' | 'in-progress'
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const isCompleted = status === 'completed'

    return (
        <span
            className={`inline-block font-mono text-xs uppercase tracking-[0.1em] px-3 py-1 rounded-full font-medium ${isCompleted
                    ? 'bg-emerald text-obsidian'
                    : 'bg-violet text-obsidian'
                }`}
        >
            {isCompleted ? 'Completed' : 'In Progress'}
        </span>
    )
}
