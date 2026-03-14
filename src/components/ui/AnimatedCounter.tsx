/* ==========================================================
 * ANIMATEDCOUNTER.TSX
 * Single animated number that counts up when scrolled into view
 * Uses existing useCounter + useInView hooks
 * ========================================================== */
"use client"

import { useCounter } from '@/hooks/useCounter'
import { useInView } from '@/hooks/useInView'

interface AnimatedCounterProps {
    prefix?: string
    end: number
    suffix?: string
    label: string
    duration?: number
}

export default function AnimatedCounter({ prefix = '', end, suffix = '', label, duration = 2000 }: AnimatedCounterProps) {
    const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.5 })
    const count = useCounter({ end, duration, enabled: isInView })

    return (
        <div ref={ref} className="text-center">
            <span className="font-sora font-bold text-4xl md:text-5xl text-cool-white">
                {prefix}{count}{suffix}
            </span>
            <p className="mt-2 font-inter text-sm text-silver uppercase tracking-wider">
                {label}
            </p>
        </div>
    )
}
