/* ==========================================================
 * SCROLLPROGRESSBAR.TSX
 * Thin gradient bar at top of viewport showing scroll progress
 * Uses existing useScrollProgress hook
 * ========================================================== */
"use client"

import { motion, useSpring } from 'framer-motion'
import { useScrollProgress } from '@/hooks/useScrollProgress'

export default function ScrollProgressBar() {
    const progress = useScrollProgress()
    const scaleX = useSpring(progress, { stiffness: 100, damping: 30 })

    // Update spring target when progress changes
    scaleX.set(progress)

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-0.75 z-100 origin-left"
            style={{
                scaleX,
                background: 'linear-gradient(to right, #7C3AED, #06B6D4)',
            }}
        />
    )
}
