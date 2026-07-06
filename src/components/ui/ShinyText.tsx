/* ==========================================================
 * SHINYTEXT.TSX — animated gradient shimmer text
 * Violet→cyan gradient base with a bright sheen sweeping
 * through (background-clip: text + animated position).
 * Static gradient under reduced motion.
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
            className={`inline-block bg-clip-text text-transparent ${
                reduced ? '' : 'animate-shimmer'
            } ${className}`}
            style={{
                backgroundImage:
                    'linear-gradient(110deg, #7C3AED 20%, #B794F6 38%, #F0F0F3 50%, #06B6D4 62%, #7C3AED 80%)',
                backgroundSize: '200% 100%',
            }}
        >
            {text}
        </span>
    )
}
