/* ==========================================================
 * WHATSETSAPART.TSX — Phase 1 redesign
 * About section with editorial intro + proof blocks
 * ========================================================== */
"use client"

import ScrollReveal from '@/components/ui/ScrollReveal'
import ValueCard from '@/components/ui/ValueCard'
import { valueCards } from '@/data/valueCards'

export default function WhatSetsApart() {
    return (
        <section
            id="about"
            className="relative py-12 md:py-16 overflow-hidden"
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 50% at 20% 35%, rgba(124, 58, 237, 0.03) 0%, transparent 65%)',
                }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 items-start">
                    <ScrollReveal className="max-w-2xl">
                        <h2 className="font-sora font-semibold text-3xl md:text-5xl text-cool-white leading-tight">
                            Built for practical AI work, not isolated demos.
                        </h2>
                        <p className="mt-7 font-inter text-base md:text-lg text-silver leading-[1.95]">
                            I build applied AI products end to end, from interaction design and orchestration
                            to usable interfaces, backend logic, and deployment-ready systems. My edge is not just
                            model familiarity or frontend polish. It is the ability to turn emerging AI workflows
                            into working products quickly, with enough depth to matter and enough clarity to be useful.
                        </p>
                        <div className="mt-10 space-y-4 border-t border-white/8 pt-6">
                            {[
                                'Designed for recruiters, research leads, and product teams evaluating real execution depth.',
                                'Comfortable moving between AI system design, architecture, experimentation, and delivery.',
                                'Best work sits where applied AI, usable products, and fast iteration meet.',
                            ].map((point) => (
                                <div key={point} className="flex items-start gap-3">
                                    <span className="mt-1.5 h-2 w-2 rounded-full bg-violet shrink-0" />
                                    <p className="font-inter text-sm md:text-[15px] text-silver/90 leading-7">
                                        {point}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 gap-4">
                        {valueCards.map((card, i) => (
                            <ValueCard key={card.number} card={card} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
