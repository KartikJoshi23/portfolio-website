/* ==========================================================
 * SMOOTHSCROLL.TSX — Blueprint Section 3.4.5
 * Lenis smooth scroll provider wrapper
 * ========================================================== */
"use client"

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({
    children
}: {
    children: React.ReactNode
}) {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1,
            smoothWheel: true,
            syncTouch: false,
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

            // Expose lenis instance globally for programmatic scroll
            ; (window as unknown as Record<string, unknown>).__lenis = lenis

        return () => {
            lenis.destroy()
        }
    }, [])

    return <>{children}</>
}
