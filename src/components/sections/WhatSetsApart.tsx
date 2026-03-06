/* ==========================================================
 * WHATSETSAPART.TSX — Blueprint v4.0 (was WhatIBring.tsx)
 * "What Sets Me Apart" — Intro paragraph + 4 value cards
 * ========================================================== */
"use client"

import SectionHeading from '@/components/ui/SectionHeading'
import ValueCard from '@/components/ui/ValueCard'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { valueCards } from '@/data/valueCards'

export default function WhatSetsApart() {
    return (
        <section
            id="about"
            className="relative py-24 md:py-32"
        >
            {/* Subtle gradient background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 50% at 80% 30%, rgba(124, 58, 237, 0.02) 0%, transparent 60%)',
                }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <SectionHeading
                    heading="What Sets Me Apart"
                    subheading="Not buzzwords. Proof-backed value."
                />

                {/* Intro paragraph — Blueprint v4.0 Change 9 */}
                <ScrollReveal className="mt-8">
                    <p className="font-inter font-normal text-base md:text-lg text-silver max-w-175 leading-relaxed mb-10">
                        I&apos;m Kartik — a Masters in AI with Business candidate at SP Jain in Dubai,
                        with a background in founding tech startups and shipping production AI systems.
                        I operate at the intersection of deep technical AI work and business-aware product thinking.
                    </p>
                </ScrollReveal>

                {/* Cards Grid — 2×2 desktop, single column mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    {valueCards.map((card, i) => (
                        <ValueCard key={card.number} card={card} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
