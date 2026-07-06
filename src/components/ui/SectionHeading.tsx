/* ==========================================================
 * SECTIONHEADING.TSX — kinetic heading + subheading pair
 * Heading reveals word-by-word on scroll; subheading fades up.
 * ========================================================== */
"use client"

import { motion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'
import { EASE_OUT } from '@/lib/constants'

interface SectionHeadingProps {
    heading: string
    subheading?: string
    className?: string
    /** Act annotation, e.g. "[ 04 / TRAINING ] · how the weights formed".
     *  Rendered as a mono HUD label above the heading. */
    hud?: React.ReactNode
}

export default function SectionHeading({
    heading,
    subheading,
    className = '',
    hud,
}: SectionHeadingProps) {
    return (
        <div className={className}>
            {hud && (
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.4 }}
                    className="hud-label mb-3"
                >
                    {hud}
                </motion.p>
            )}
            <SplitText
                as="h2"
                text={heading}
                className="font-sora font-semibold text-3xl md:text-5xl text-cool-white"
            />
            {subheading && (
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: EASE_OUT }}
                    viewport={{ once: true, amount: 0.4 }}
                    className="mt-4 font-inter font-normal text-base md:text-lg text-silver max-w-2xl"
                >
                    {subheading}
                </motion.p>
            )}
        </div>
    )
}
