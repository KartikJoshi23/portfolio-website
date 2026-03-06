/* ==========================================================
 * VALUECARD.TSX — Blueprint Section 5.3.3 (Enhanced)
 * Glassmorphism card with ember top-border
 * Added: hover glow, gradient accent, better interactions
 * ========================================================== */
"use client"

import { motion } from 'framer-motion'
import type { ValueCard as ValueCardType } from '@/types'
import { EASE_OUT } from '@/lib/constants'
import TiltCard from '@/components/ui/TiltCard'

interface ValueCardProps {
    card: ValueCardType
    index: number
}

export default function ValueCard({ card, index }: ValueCardProps) {
    return (
        <TiltCard className="relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: EASE_OUT }}
                viewport={{ once: true, amount: 0.2 }}
                className="group relative h-full bg-white/3 backdrop-blur-sm border border-white/8
                            rounded-2xl p-6 md:p-8 border-t-2 border-t-violet/60 overflow-hidden
                            transition-all duration-500
                            hover:border-white/15 hover:bg-white/5
                            hover:shadow-[0_8px_60px_rgba(124,58,237,0.06)]"
            >
            {/* Subtle hover gradient overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at top left, rgba(124, 58, 237, 0.03) 0%, transparent 60%)',
                }}
            />

            {/* Number */}
            <span className="relative z-10 font-mono text-sm text-violet/80">
                {card.number}
            </span>

            {/* Title */}
            <h3 className="relative z-10 mt-3 font-sora font-semibold text-xl md:text-[22px] text-cool-white
                           group-hover:text-cool-white transition-colors duration-300">
                {card.title}
            </h3>

            {/* Description */}
            <p className="relative z-10 mt-3 font-inter font-normal text-sm md:text-[15px] text-silver/90 leading-[1.75]">
                {card.description}
            </p>
            </motion.div>
        </TiltCard>
    )
}
