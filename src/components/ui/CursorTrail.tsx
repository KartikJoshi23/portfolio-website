/* ==========================================================
 * CURSORTRAIL.TSX
 * Custom cursor: small dot + trailing ring
 * Grows on hover over interactive elements
 * Desktop only (fine pointer), respects reduced motion
 * ========================================================== */
"use client"

import { useEffect, useState, useSyncExternalStore } from 'react'
import { motion, useSpring } from 'framer-motion'

/* Fine pointer + full motion → cursor enabled. SSR-safe. */
function subscribe(callback: () => void) {
    const fine = window.matchMedia('(pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    fine.addEventListener('change', callback)
    reduce.addEventListener('change', callback)
    return () => {
        fine.removeEventListener('change', callback)
        reduce.removeEventListener('change', callback)
    }
}
const getSnapshot = () =>
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
const getServerSnapshot = () => false

export default function CursorTrail() {
    const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
    const [hovering, setHovering] = useState(false)

    const springConfig = { stiffness: 150, damping: 20 }
    const trailConfig = { stiffness: 80, damping: 25 }

    const dotX = useSpring(0, springConfig)
    const dotY = useSpring(0, springConfig)
    const ringX = useSpring(0, trailConfig)
    const ringY = useSpring(0, trailConfig)

    useEffect(() => {
        if (!enabled) return

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
    }, [enabled, dotX, dotY, ringX, ringY])

    if (!enabled) return null

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
