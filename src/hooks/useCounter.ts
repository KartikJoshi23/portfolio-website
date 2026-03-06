/* ==========================================================
 * useCounter.ts — Blueprint Section 6.1
 * Animated counter hook for number animations
 * ========================================================== */
"use client"

import { useState, useEffect, useRef } from 'react'

interface UseCounterOptions {
    end: number
    duration?: number // ms
    start?: number
    enabled?: boolean
}

export function useCounter({
    end,
    duration = 2000,
    start = 0,
    enabled = true,
}: UseCounterOptions): number {
    const [count, setCount] = useState(start)
    const frameRef = useRef<number | null>(null)

    useEffect(() => {
        if (!enabled) return

        const startTime = performance.now()
        const range = end - start

        function animate(currentTime: number) {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(start + range * eased))

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate)
            }
        }

        frameRef.current = requestAnimationFrame(animate)
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current)
        }
    }, [end, duration, start, enabled])

    return count
}
