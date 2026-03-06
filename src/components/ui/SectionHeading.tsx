/* ==========================================================
 * SECTIONHEADING.TSX — Blueprint Section 5.x headers
 * Reusable heading + subheading pair
 * Heading: Sora 600, 48px/32px. Subheading: Inter 400, 18px, stone-gray
 * Wrapped in ScrollReveal
 * ========================================================== */
"use client"

import ScrollReveal from '@/components/ui/ScrollReveal'

interface SectionHeadingProps {
    heading: string
    subheading?: string
    className?: string
}

export default function SectionHeading({
    heading,
    subheading,
    className = '',
}: SectionHeadingProps) {
    return (
        <ScrollReveal className={className}>
            <h2 className="font-sora font-semibold text-3xl md:text-5xl text-cool-white">
                {heading}
            </h2>
            {subheading && (
                <p className="mt-4 font-inter font-normal text-base md:text-lg text-silver max-w-2xl">
                    {subheading}
                </p>
            )}
        </ScrollReveal>
    )
}
