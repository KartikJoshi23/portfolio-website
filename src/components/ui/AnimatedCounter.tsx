/* ==========================================================
 * ANIMATEDCOUNTER.TSX
 * Counts up from 0 → end when scrolled into view (once).
 * Respects reduced motion (renders the final value instantly).
 * ========================================================== */
"use client"

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCounter } from '@/hooks/useCounter'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT } from '@/lib/constants'

interface AnimatedCounterProps {
    prefix?: string
    end: number
    suffix?: string
    label: string
    duration?: number
}

export default function AnimatedCounter({
    prefix = '',
    end,
    suffix = '',
    label,
    duration = 1600,
}: AnimatedCounterProps) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const reduced = useReducedMotion()
    const counted = useCounter({ end, duration, enabled: inView && !reduced })
    const display = reduced ? end : counted

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            viewport={{ once: true, margin: '-50px' }}
            className="text-center"
        >
            <span className="font-sora font-bold text-4xl md:text-5xl text-cool-white tabular-nums">
                {prefix}{display}{suffix}
            </span>
            <p className="mt-2 font-inter text-sm text-silver uppercase tracking-wider">
                {label}
            </p>
        </motion.div>
    )
}
