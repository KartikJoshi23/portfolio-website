/* ==========================================================
 * SCROLLREVEAL.TSX — Blueprint Section 6.1
 * Reusable cinematic scroll reveal wrapper
 * Default: direction="up", delay=0, duration=0.7
 * Initial: opacity:0, y:60
 * whileInView: opacity:1, y:0
 * Easing: [0.22, 1, 0.36, 1]
 * viewport: {once:true, amount:0.2}
 * ========================================================== */
"use client"

import { motion } from 'framer-motion'
import { EASE_OUT } from '@/lib/constants'

interface ScrollRevealProps {
    children: React.ReactNode
    direction?: 'up' | 'down' | 'left' | 'right'
    delay?: number
    duration?: number
    className?: string
    amount?: number
}

export default function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.7,
    className,
    amount = 0.2,
}: ScrollRevealProps) {
    const directions = {
        up: { y: 60, x: 0 },
        down: { y: -60, x: 0 },
        left: { x: 60, y: 0 },
        right: { x: -60, y: 0 },
    }

    const offset = directions[direction]

    return (
        <motion.div
            initial={{ opacity: 0, ...offset }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration, delay, ease: EASE_OUT }}
            viewport={{ once: true, amount }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
