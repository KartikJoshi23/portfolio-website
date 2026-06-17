/* ==========================================================
 * SHINYTEXT.TSX
 * Subtle moving sheen across gradient text. Pure CSS; falls back
 * to a static gradient under reduced motion.
 * ========================================================== */
"use client"

import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ShinyTextProps {
    text: string
    className?: string
}

export default function ShinyText({ text, className = '' }: ShinyTextProps) {
    const reduced = useReducedMotion()

    return (
        <span
            className={`bg-clip-text text-transparent ${reduced ? '' : 'animate-shimmer'} ${className}`}
            style={{
                backgroundImage:
                    'linear-gradient(90deg, #7C3AED 0%, #06B6D4 35%, #F0F0F3 50%, #06B6D4 65%, #7C3AED 100%)',
                backgroundSize: '200% 100%',
            }}
        >
            {text}
        </span>
    )
}
