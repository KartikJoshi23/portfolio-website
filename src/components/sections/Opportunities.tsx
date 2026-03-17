"use client"

import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'

const opportunityCards = [
    {
        number: '01',
        eyebrow: 'For Recruiters',
        title: 'Applied AI roles with delivery depth',
        description:
            'Built for teams hiring AI engineers and builders who can turn requirements into working systems with strong product execution.',
    },
    {
        number: '02',
        eyebrow: 'For Research Collaboration',
        title: 'Product-facing applied research',
        description:
            'Strong fit for conversations around intelligent systems, multimodal interfaces, and applied experiments that can move beyond papers.',
    },
    {
        number: '03',
        eyebrow: 'For Product Builds',
        title: 'AI tools and product MVPs',
        description:
            'Available for select collaborations involving internal AI workflows, developer-facing tooling, and fast prototype-to-product iterations.',
    },
]

export default function Opportunities() {
    return (
        <section
            id="opportunities"
            className="relative py-12 md:py-16 overflow-hidden"
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 55% 45% at 80% 50%, rgba(6, 182, 212, 0.04) 0%, transparent 70%)',
                }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <SectionHeading
                    heading="Ways To Work Together"
                    subheading="Built to attract serious conversations across hiring, research, and AI product work without diluting the signal."
                />

                <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {opportunityCards.map((card, index) => (
                        <ScrollReveal key={card.number} delay={index * 0.08}>
                            <div className="h-full rounded-2xl border border-white/8 bg-white/4 p-6 md:p-7 backdrop-blur-sm transition-all duration-300 hover:border-violet/25 hover:bg-white/6">
                                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-violet">
                                    {card.eyebrow}
                                </span>
                                <h3 className="mt-4 font-sora text-xl text-cool-white leading-snug">
                                    {card.title}
                                </h3>
                                <p className="mt-4 font-inter text-[15px] leading-7 text-silver/90">
                                    {card.description}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
