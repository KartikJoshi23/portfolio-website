/* ==========================================================
 * SPLITTEXT.TSX
 * Word-by-word reveal. Animates on scroll into view (default)
 * or immediately when `animate` is forced true. Respects reduced
 * motion (renders instantly). Keeps text selectable & accessible.
 * ========================================================== */
"use client"

import { motion } from 'framer-motion'
import { EASE_OUT } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SplitTextProps {
    text: string
    className?: string
    delay?: number
    stagger?: number
    /** Force play immediately instead of waiting for scroll-in. */
    animate?: boolean
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export default function SplitText({
    text,
    className = '',
    delay = 0,
    stagger = 0.04,
    animate,
    as = 'span',
}: SplitTextProps) {
    const reduced = useReducedMotion()
    const words = text.split(' ')
    const MotionTag = motion[as]

    if (reduced) {
        const Tag = as
        return <Tag className={className}>{text}</Tag>
    }

    const container = {
        hidden: {},
        visible: {
            transition: { staggerChildren: stagger, delayChildren: delay },
        },
    }
    const child = {
        hidden: { y: '0.5em', opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: EASE_OUT },
        },
    }

    return (
        <MotionTag
            className={className}
            variants={container}
            initial="hidden"
            {...(animate !== undefined
                ? { animate: animate ? 'visible' : 'hidden' }
                : { whileInView: 'visible', viewport: { once: true, amount: 0.4 } })}
        >
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                    <motion.span variants={child} className="inline-block">
                        {word}
                        {i < words.length - 1 ? '\u00A0' : ''}
                    </motion.span>
                </span>
            ))}
        </MotionTag>
    )
}
