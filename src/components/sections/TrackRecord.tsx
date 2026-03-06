/* ==========================================================
 * TRACKRECORD.TSX — Blueprint v4.0 (was BattleTested.tsx)
 * "Track Record" — Achievements + publication
 * ========================================================== */
"use client"

import SectionHeading from '@/components/ui/SectionHeading'
import AchievementCard from '@/components/ui/AchievementCard'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { achievements, publication } from '@/data/achievements'
import { BookOpen } from 'lucide-react'

export default function TrackRecord() {
    return (
        <section
            id="achievements"
            className="relative py-24 md:py-32"
        >
            {/* Subtle gradient background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 50% 40% at 30% 60%, rgba(124, 58, 237, 0.02) 0%, transparent 60%)',
                }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <SectionHeading
                    heading="Track Record"
                    subheading="I don't just build in isolation — I compete, present, and win."
                />

                {/* Stats counters row */}
                <ScrollReveal className="mt-14">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 py-8 border-y border-white/8">
                        <AnimatedCounter end={5} suffix="+" label="Hackathons" />
                        <AnimatedCounter end={3} suffix="" label="Projects Shipped" />
                        <AnimatedCounter end={1} suffix="" label="Publication" />
                        <AnimatedCounter end={13000} suffix="+" label="Lines of Code" />
                    </div>
                </ScrollReveal>

                {/* Achievement Cards — 3-2 grid desktop */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
                    {achievements.slice(0, 3).map((a, i) => (
                        <AchievementCard key={a.title} achievement={a} index={i} />
                    ))}
                </div>
                {achievements.length > 3 && (
                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:max-w-[66.666%] md:mx-auto">
                        {achievements.slice(3).map((a, i) => (
                            <AchievementCard
                                key={a.title}
                                achievement={a}
                                index={i + 3}
                            />
                        ))}
                    </div>
                )}

                {/* Publication Card */}
                <ScrollReveal className="mt-10">
                    <div className="bg-white/3 backdrop-blur-sm border border-white/8 rounded-2xl p-6 md:p-8 border-l-2 border-l-violet/60
                                    hover:bg-white/5 transition-all duration-500">
                        <div className="flex items-start gap-3">
                            <BookOpen className="w-5 h-5 text-violet shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-sora font-medium text-lg text-cool-white">
                                    {publication.title}
                                </h3>
                                <p className="mt-1 font-mono text-[13px] text-silver">
                                    {publication.journal} · {publication.year}
                                </p>
                                <p className="mt-2 font-inter text-[15px] text-silver/90 leading-relaxed">
                                    {publication.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
