/* ==========================================================
 * CURSORTRAIL.TSX
 * Custom cursor: small dot + trailing ring
 * Grows on hover over interactive elements
 * Desktop only, respects reduced motion
 * ========================================================== */
"use client"

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CursorTrail() {
    const [mounted, setMounted] = useState(false)
    const [hovering, setHovering] = useState(false)

    const springConfig = { stiffness: 150, damping: 20 }
    const trailConfig = { stiffness: 80, damping: 25 }

    const dotX = useSpring(0, springConfig)
    const dotY = useSpring(0, springConfig)
    const ringX = useSpring(0, trailConfig)
    const ringY = useSpring(0, trailConfig)

    useEffect(() => {
        // Desktop only + respect reduced motion
        const mql = window.matchMedia('(pointer: fine)')
        const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)')
        if (!mql.matches || motionMql.matches) return

        setMounted(true)

        const onMove = (e: MouseEvent) => {
            dotX.set(e.clientX)
            dotY.set(e.clientY)
            ringX.set(e.clientX)
            ringY.set(e.clientY)
        }

        const onOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target.closest('a, button, [role="button"], input, textarea, select, label')) {
                setHovering(true)
            }
        }

        const onOut = () => setHovering(false)

        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseover', onOver)
        window.addEventListener('mouseout', onOut)
        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseover', onOver)
            window.removeEventListener('mouseout', onOut)
        }
    }, [dotX, dotY, ringX, ringY])

    if (!mounted) return null

    return (
        <>
            {/* Inner dot */}
            <motion.div
                className="fixed top-0 left-0 z-9999 pointer-events-none mix-blend-difference hidden lg:block"
                style={{
                    x: dotX,
                    y: dotY,
                    width: hovering ? 12 : 6,
                    height: hovering ? 12 : 6,
                    borderRadius: '50%',
                    backgroundColor: '#F0F0F3',
                    translateX: '-50%',
                    translateY: '-50%',
                    transition: 'width 0.2s, height 0.2s',
                }}
            />
            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 z-9998 pointer-events-none hidden lg:block"
                style={{
                    x: ringX,
                    y: ringY,
                    width: hovering ? 50 : 36,
                    height: hovering ? 50 : 36,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(124, 58, 237, 0.4)',
                    backgroundColor: hovering ? 'rgba(124, 58, 237, 0.05)' : 'transparent',
                    translateX: '-50%',
                    translateY: '-50%',
                    transition: 'width 0.3s, height 0.3s, border-color 0.3s, background-color 0.3s',
                }}
            />
        </>
    )
}
