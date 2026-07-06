/* ==========================================================
 * MASKREVEAL.TSX — masked word-by-word rise reveal
 * Each word slides up from behind an overflow mask with a
 * per-word stagger — the editorial "lines surfacing" effect.
 * Uses Framer Motion whileInView; plain text under reduced motion.
 * ========================================================== */
"use client"

import { motion } from 'framer-motion'
import { EASE_OUT } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/* Motion components are created once at module level — creating
 * them during render would remount the tree on every render. */
const MOTION_TAGS = {
    p: motion.p,
    h1: motion.h1,
    h2: motion.h2,
    h3: motion.h3,
    span: motion.span,
} as const

/* Non-breaking space keeps word spacing inside each mask while
 * wrapping still happens between the outer inline-blocks. */
const NBSP = ' '

interface MaskRevealProps {
    text: string
    className?: string
    /** seconds before the first word starts */
    delay?: number
    /** seconds between words */
    stagger?: number
    as?: 'p' | 'h1' | 'h2' | 'h3' | 'span'
    once?: boolean
}

export default function MaskReveal({
    text,
    className,
    delay = 0,
    stagger = 0.035,
    as: Tag = 'p',
    once = true,
}: MaskRevealProps) {
    const reduced = useReducedMotion()
    const words = text.split(' ')

    if (reduced) {
        return <Tag className={className}>{text}</Tag>
    }

    const MotionTag = MOTION_TAGS[Tag]

    return (
        <MotionTag
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: 0.5 }}
            transition={{ staggerChildren: stagger, delayChildren: delay }}
            aria-label={text}
        >
            {words.map((word, i) => (
                <span
                    key={`${word}-${i}`}
                    aria-hidden="true"
                    className="inline-block overflow-hidden align-bottom"
                >
                    <motion.span
                        className="inline-block"
                        variants={{
                            hidden: { y: '110%' },
                            visible: {
                                y: '0%',
                                transition: { duration: 0.65, ease: EASE_OUT },
                            },
                        }}
                    >
                        {i < words.length - 1 ? word + NBSP : word}
                    </motion.span>
                </span>
            ))}
        </MotionTag>
    )
}
