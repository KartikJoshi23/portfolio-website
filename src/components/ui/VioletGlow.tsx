/* ==========================================================
 * VIOLETGLOW.TSX — Blueprint v4.0 (was EmberGlow.tsx)
 * Violet Glow Cursor Trail
 * 300px circle, radial gradient violet at 8% opacity
 * Follows mouse via Framer Motion useSpring
 * Desktop only. Hidden on mobile and reduced-motion.
 * ========================================================== */
"use client"

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { SPRING_GLOW, BREAKPOINTS } from '@/lib/constants'

export default function VioletGlow() {
    const [isDesktop, setIsDesktop] = useState(false)
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    const springX = useSpring(0, SPRING_GLOW)
    const springY = useSpring(0, SPRING_GLOW)

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= BREAKPOINTS.lg)
        checkDesktop()
        window.addEventListener('resize', checkDesktop)

        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mq.matches)
        const motionHandler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
        mq.addEventListener('change', motionHandler)

        const handler = (e: MouseEvent) => {
            springX.set(e.clientX - 150)
            springY.set(e.clientY - 150)
        }
        window.addEventListener('mousemove', handler)

        return () => {
            window.removeEventListener('resize', checkDesktop)
            window.removeEventListener('mousemove', handler)
            mq.removeEventListener('change', motionHandler)
        }
    }, [springX, springY])

    if (!isDesktop || prefersReducedMotion) return null

    return (
        <motion.div
            style={{
                x: springX,
                y: springY,
            }}
            className="fixed top-0 left-0 w-75 h-75 rounded-full pointer-events-none z-0"
            aria-hidden="true"
        >
            <div
                className="w-full h-full rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                }}
            />
        </motion.div>
    )
}
