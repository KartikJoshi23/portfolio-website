/* ==========================================================
 * ANIMATEDCOUNTER.TSX
 * Static counter with fade-in animation on scroll into view
 * Shows final value immediately — no count-up that can get stuck at 0
 * ========================================================== */
"use client"

import { motion } from 'framer-motion'

interface AnimatedCounterProps {
    prefix?: string
    end: number
    suffix?: string
    label: string
    duration?: number
}

export default function AnimatedCounter({ prefix = '', end, suffix = '', label }: AnimatedCounterProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-50px' }}
            className="text-center"
        >
            <span className="font-sora font-bold text-4xl md:text-5xl text-cool-white">
                {prefix}{end}{suffix}
            </span>
            <p className="mt-2 font-inter text-sm text-silver uppercase tracking-wider">
                {label}
            </p>
        </motion.div>
    )
}
