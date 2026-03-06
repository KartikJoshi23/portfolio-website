/* ==========================================================
 * WHATSETSAPART.TSX — Blueprint v4.0 (was WhatIBring.tsx)
 * "What Sets Me Apart" — Intro paragraph + 4 value cards
 * ========================================================== */
"use client"

import SectionHeading from '@/components/ui/SectionHeading'
import ValueCard from '@/components/ui/ValueCard'
import { valueCards } from '@/data/valueCards'

export default function WhatSetsApart() {
    return (
        <section
            id="about"
            className="relative py-16 md:py-24"
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
