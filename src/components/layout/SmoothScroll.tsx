/* ==========================================================
 * SMOOTHSCROLL.TSX — Lenis + GSAP unified scroll engine
 * Lenis runs inside gsap.ticker (autoRaf: false) so Lenis,
 * ScrollTrigger and every scrubbed tween read the same scroll
 * value on the same frame — no split RAF loops, no scrub lag.
 * ========================================================== */
"use client"

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

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
            autoRaf: false,
        })

        // Keep ScrollTrigger in sync with every Lenis scroll frame, and
        // publish scroll velocity for velocity-reactive effects (the
        // particle field reads it each frame).
        lenis.on('scroll', (e: { velocity: number }) => {
            ;(window as unknown as Record<string, unknown>).__scrollVelocity = e.velocity
            ScrollTrigger.update()
        })

        // Drive Lenis from the GSAP ticker (ms → s conversion).
        const raf = (time: number) => {
            lenis.raf(time * 1000)
        }
        gsap.ticker.add(raf)

        // Expose for programmatic scroll (useLenis hook).
        ;(window as unknown as Record<string, unknown>).__lenis = lenis

        return () => {
            gsap.ticker.remove(raf)
            lenis.destroy()
            delete (window as unknown as Record<string, unknown>).__lenis
        }
    }, [])

    return <>{children}</>
}
