/* ==========================================================
 * SKILLTICKER.TSX — Blueprint Section 5.5.3 (Fixed)
 * Single ticker row for one skill category
 * Category label ABOVE the row (no overlap issues)
 * Edge-fade masks for seamless visual blending
 * GPU-accelerated CSS marquee animation
 * ========================================================== */
"use client"

import type { SkillCategory } from '@/types'

interface SkillTickerProps {
    category: SkillCategory
    index: number
}

export default function SkillTicker({ category, index }: SkillTickerProps) {
    const isOdd = index % 2 === 0
    const animationClass = isOdd ? 'animate-ticker-left' : 'animate-ticker-right'

    // Triplicate for seamless loop
    const pills = [...category.skills, ...category.skills, ...category.skills]

    return (
        <div className="ticker-row relative overflow-hidden">
            {/* Category label — always above */}
            <div className="mb-2 px-6 lg:px-8">
                <span className="font-sora font-medium text-[11px] text-cyan-300/90 uppercase tracking-[0.15em]">
                    {category.category}
                </span>
            </div>

            {/* Ticker with edge masks */}
            <div className="ticker-mask overflow-hidden">
                <div
                    className={`ticker-track flex gap-3 ${animationClass}`}
                    style={{ willChange: 'transform' }}
                >
                    {pills.map((skill, i) => (
                        <span
                            key={`${skill.name}-${i}`}
                            className="shrink-0 flex items-center gap-2 font-inter text-[13px] text-cool-white/90
                                       bg-white/3 border border-white/8 rounded-full
                                       px-4 py-2 whitespace-nowrap backdrop-blur-sm
                                       transition-all duration-300
                                       hover:border-violet/40 hover:bg-violet/5 hover:text-cool-white"
                        >
                            {skill.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
