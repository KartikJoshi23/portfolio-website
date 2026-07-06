/* ==========================================================
 * TRACKRECORD.TSX — Act 04 / TRAINING (id="proof")
 * Achievements as training epochs on a converging loss curve:
 * a serpentine spine draws itself down the timeline (scrubbed),
 * cards alternate sides at each epoch, and every node carries a
 * falling "loss" readout — proof the weights kept improving.
 * Publication renders as the final saved checkpoint.
 * ========================================================== */
"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import AchievementCard from '@/components/ui/AchievementCard'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import ScrollReveal from '@/components/ui/ScrollReveal'
import DecodeText from '@/components/motion/DecodeText'
import { gsap } from '@/lib/gsap'
import { EASE_OUT } from '@/lib/constants'
import { achievements, publication } from '@/data/achievements'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/** Decorative falling loss per epoch — training converges. */
const EPOCH_LOSS = ['2.311', '1.128', '0.473', '0.129', '0.041']

export default function TrackRecord() {
    const spineRef = useRef<SVGPathElement>(null)
    const timelineRef = useRef<HTMLDivElement>(null)
    const reduced = useReducedMotion()

    useEffect(() => {
        if (reduced) return
        const path = spineRef.current
        const timeline = timelineRef.current
        if (!path || !timeline) return

        const len = path.getTotalLength()
        path.style.strokeDasharray = `${len}`
        path.style.strokeDashoffset = `${len}`

        const ctx = gsap.context(() => {
            gsap.to(path, {
                strokeDashoffset: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: timeline,
                    start: 'top 75%',
                    end: 'bottom 55%',
                    scrub: 0.6,
                },
            })
        }, timeline)

        return () => ctx.revert()
    }, [reduced])

    return (
        <section id="proof" className="relative py-16 md:py-24 overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 50% 40% at 70% 30%, rgba(6, 182, 212, 0.03) 0%, transparent 60%)',
                }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <SectionHeading
                    hud={
                        <>
                            [ 04 / <span className="hud-accent">TRAINING</span> ] · how the weights formed
                        </>
                    }
                    heading="Proof of Work"
                    subheading="Tested under competition, research, and institutional scrutiny — every epoch lowered the loss."
                />

                {/* Stats counters row */}
                <ScrollReveal className="mt-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 py-8 border-y border-white/8">
                        <AnimatedCounter end={5} suffix="+" label="Hackathons" />
                        <AnimatedCounter end={4} suffix="" label="Projects Shipped" />
                        <AnimatedCounter end={1} suffix="" label="Publication" />
                        <AnimatedCounter prefix="Top " end={10} label="Global Finish" />
                    </div>
                </ScrollReveal>

                {/* Epoch timeline */}
                <div ref={timelineRef} className="relative mt-16">
                    {/* Converging loss spine (desktop) */}
                    <svg
                        className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-24 -translate-x-1/2 md:block"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        {/* ghost track */}
                        <path
                            d="M50 0 C 8 9, 92 16, 50 25 C 14 33, 86 40, 50 49 C 22 56, 78 63, 50 71 C 32 78, 68 85, 50 92 L 50 100"
                            stroke="rgba(255,255,255,0.07)"
                            strokeWidth="1"
                            fill="none"
                            vectorEffect="non-scaling-stroke"
                        />
                        {/* drawn signal — swings shrink as loss converges */}
                        <path
                            ref={spineRef}
                            d="M50 0 C 8 9, 92 16, 50 25 C 14 33, 86 40, 50 49 C 22 56, 78 63, 50 71 C 32 78, 68 85, 50 92 L 50 100"
                            stroke="url(#loss-grad)"
                            strokeWidth="1.5"
                            fill="none"
                            vectorEffect="non-scaling-stroke"
                        />
                        <defs>
                            <linearGradient id="loss-grad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#F43F5E" />
                                <stop offset="55%" stopColor="#7C3AED" />
                                <stop offset="100%" stopColor="#10B981" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="space-y-10 md:space-y-0">
                        {achievements.map((a, i) => {
                            const left = i % 2 === 0
                            return (
                                <div
                                    key={a.title}
                                    className={`relative md:grid md:grid-cols-2 md:gap-20 ${i > 0 ? 'md:-mt-6' : ''}`}
                                >
                                    {/* Epoch node + loss readout at the spine */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.45, delay: 0.2, ease: EASE_OUT }}
                                        viewport={{ once: true, amount: 0.6 }}
                                        className="absolute left-1/2 top-10 z-10 hidden -translate-x-1/2 flex-col items-center md:flex"
                                        aria-hidden="true"
                                    >
                                        <span className="h-[11px] w-[11px] rounded-full bg-violet shadow-[0_0_12px_rgba(124,58,237,0.9)]" />
                                        <span className="mt-2 font-mono text-[10px] tracking-[0.1em] text-silver/70 whitespace-nowrap">
                                            epoch 0{i + 1} · loss{' '}
                                            <span className={i >= 3 ? 'text-emerald' : 'text-silver'}>
                                                <DecodeText text={EPOCH_LOSS[i]} speed={46} />
                                            </span>
                                        </span>
                                    </motion.div>

                                    <div
                                        className={
                                            left
                                                ? 'md:col-start-1 md:pr-14'
                                                : 'md:col-start-2 md:pl-14'
                                        }
                                    >
                                        <AchievementCard achievement={a} index={i} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Publication — the saved checkpoint */}
                    <ScrollReveal className="mt-14 md:mt-10">
                        <div className="glass-panel hud-corners relative mx-auto max-w-3xl rounded-2xl p-6 md:p-8">
                            <p className="hud-label">
                                <span className="text-emerald">checkpoint saved</span> · peer-reviewed
                            </p>
                            <div className="mt-4 flex items-start gap-4">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet/15 text-violet">
                                    <BookOpen className="h-5 w-5" />
                                </span>
                                <div>
                                    <h3 className="font-sora font-semibold text-lg md:text-xl text-cool-white">
                                        {publication.title}
                                    </h3>
                                    <p className="mt-1 font-mono text-[12px] text-cyan/90">
                                        {publication.journal} · {publication.year}
                                    </p>
                                    <p className="mt-3 font-inter text-sm text-silver leading-7">
                                        {publication.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}
