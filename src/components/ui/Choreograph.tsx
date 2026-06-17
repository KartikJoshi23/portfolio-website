/* ==========================================================
 * CHOREOGRAPH.TSX
 * Wraps a block and applies a subtle, continuous scroll-linked
 * "dolly" — content gently rises + scales + settles in opacity
 * as it crosses the viewport. Creates the cinematic, alive feel.
 * Disabled under reduced motion (renders children untouched).
 * ========================================================== */
"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ChoreographProps {
    children: React.ReactNode
    className?: string
    /** Strength of the effect, 0–1. Default 1. */
    intensity?: number
}

export default function Choreograph({
    children,
    className,
    intensity = 1,
}: ChoreographProps) {
    const ref = useRef<HTMLDivElement>(null)
    const reduced = useReducedMotion()

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })

    // Enter (0–0.25): rise + scale up + fade in.
    // Settle (0.25–0.75): fully resolved.
    // Exit (0.75–1): drift up + soft fade.
    const y = useTransform(
        scrollYProgress,
        [0, 0.25, 0.75, 1],
        [40 * intensity, 0, 0, -30 * intensity]
    )
    const scale = useTransform(
        scrollYProgress,
        [0, 0.25, 0.75, 1],
        [1 - 0.04 * intensity, 1, 1, 1 - 0.02 * intensity]
    )
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0.35, 1, 1, 0.5]
    )

    if (reduced) {
        return <div className={className}>{children}</div>
    }

    return (
        <motion.div
            ref={ref}
            style={{ position: 'relative', y, scale, opacity, willChange: 'transform, opacity' }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
