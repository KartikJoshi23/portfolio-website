/* ==========================================================
 * HERO.TSX — Act 01 / INPUT
 * Two-column hero over the live particle constellation:
 * left, the identity block (decode-in name, gradient role,
 * shimmering tagline, CTAs); right, the headshot inside an
 * animated gradient ring. Content lifts and the name words
 * split subtly on scroll-out (GSAP scrub).
 * ========================================================== */
"use client"

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'
import ShinyText from '@/components/ui/ShinyText'
import DecodeText from '@/components/motion/DecodeText'
import MaskReveal from '@/components/motion/MaskReveal'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { EASE_OUT, PERSONAL } from '@/lib/constants'
import { useLenis } from '@/hooks/useLenis'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface HeroProps {
    animateEntrance: boolean
}

const heroContent = {
    role: 'AI ENGINEER',
    tagline: 'Automating Intelligence. Decentralizing Trust.',
    summary:
        'I design and ship applied AI systems — model integration, product architecture, and production deployment — with a focus on measurable real-world outcomes.',
    subtitle: `${PERSONAL.degree} · ${PERSONAL.institution} · Dubai`,
    ctaPrimary: { text: 'View My Work', target: '#work' },
    ctaSecondary: { text: 'Ways to Collaborate', target: '#opportunities' },
}

const fadeUp = (delay: number) => ({
    initial: { y: 24, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.7, delay, ease: EASE_OUT },
})

/** Headshot inside the animated gradient ring (size via wrapper). */
function RingHeadshot({ size }: { size: number }) {
    return (
        <div className="relative rounded-full p-1.25" style={{ width: size, height: size }}>
            <div className="hero-ring absolute inset-0 rounded-full" aria-hidden="true" />
            <div
                className="relative z-10 h-full w-full rounded-full overflow-hidden border-2 border-obsidian"
                style={{ boxShadow: '0 0 50px rgba(124, 58, 237, 0.22)' }}
            >
                <Image
                    src="/headshot-hero.png"
                    alt="Kartik Joshi"
                    width={size}
                    height={size}
                    priority
                    className="object-cover"
                    style={{
                        objectPosition: 'center 15%',
                        transform: 'scale(1.15)',
                        transformOrigin: 'center 15%',
                    }}
                />
            </div>
        </div>
    )
}

export default function Hero({ animateEntrance }: HeroProps) {
    const { scrollTo } = useLenis()
    const reduced = useReducedMotion()

    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const wordFirstRef = useRef<HTMLSpanElement>(null)
    const wordLastRef = useRef<HTMLSpanElement>(null)

    /* Scroll-out choreography: the name splits, everything lifts. */
    useEffect(() => {
        if (reduced) return
        const section = sectionRef.current
        if (!section) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom 25%',
                    scrub: true,
                },
            })
            tl.to(wordFirstRef.current, { xPercent: -10, ease: 'none' }, 0)
                .to(wordLastRef.current, { xPercent: 10, ease: 'none' }, 0)
                .to(
                    contentRef.current,
                    { y: -90, opacity: 0, ease: 'power1.in' },
                    0
                )
        }, section)

        return () => ctx.revert()
    }, [reduced])

    // ScrollTrigger measures while the preloader still covers the page;
    // refresh once real layout is interactive.
    useEffect(() => {
        if (animateEntrance) ScrollTrigger.refresh()
    }, [animateEntrance])

    const handleCTA = (target: string) => {
        scrollTo(target, { offset: -80 })
    }

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="relative min-h-screen flex items-center overflow-hidden px-6 lg:px-8 pt-24 pb-20 lg:pt-20"
        >
            {/* Faint measurement grid, masked to the center */}
            <div
                className="pointer-events-none absolute inset-0 opacity-40"
                aria-hidden="true"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
                    backgroundSize: '72px 72px',
                    maskImage:
                        'radial-gradient(ellipse 68% 58% at 50% 45%, black 0%, transparent 78%)',
                    WebkitMaskImage:
                        'radial-gradient(ellipse 68% 58% at 50% 45%, black 0%, transparent 78%)',
                }}
            />

            <div
                ref={contentRef}
                className="relative z-10 mx-auto w-full max-w-7xl"
            >
                <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-8">
                    {/* Headshot — above the name on mobile */}
                    {animateEntrance && (
                        <motion.div {...fadeUp(0.1)} className="lg:hidden">
                            <RingHeadshot size={180} />
                        </motion.div>
                    )}

                    {/* Identity block */}
                    <div className="lg:w-[60%] flex flex-col items-center text-center lg:items-start lg:text-left">
                        {animateEntrance && (
                            <motion.p {...fadeUp(0)} className="hud-label mb-5">
                                [ 01 / <span className="hud-accent">INPUT</span> ] · signal received
                            </motion.p>
                        )}

                        {animateEntrance && (
                            <motion.div
                                {...fadeUp(0.08)}
                                className="glass-panel inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-6"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
                                </span>
                                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-silver">
                                    Open to AI roles &amp; collaborations
                                </span>
                            </motion.div>
                        )}

                        {/* Name — decodes out of noise */}
                        <h1
                            className="font-sora font-bold text-cool-white uppercase flex flex-wrap justify-center lg:justify-start gap-x-[0.3em]"
                            style={{
                                fontSize: 'clamp(2.5rem, 5.5vw, 4.75rem)',
                                letterSpacing: '-0.02em',
                                lineHeight: 1.05,
                            }}
                        >
                            <span ref={wordFirstRef} className="inline-block">
                                {animateEntrance ? (
                                    <DecodeText text="KARTIK" immediate delay={220} speed={34} />
                                ) : (
                                    <span className="invisible">KARTIK</span>
                                )}
                            </span>
                            <span ref={wordLastRef} className="inline-block">
                                {animateEntrance ? (
                                    <DecodeText text="JOSHI" immediate delay={420} speed={34} />
                                ) : (
                                    <span className="invisible">JOSHI</span>
                                )}
                            </span>
                        </h1>

                        {/* Role */}
                        {animateEntrance && (
                            <motion.p
                                {...fadeUp(0.7)}
                                className="mt-4 font-sora font-semibold text-gradient uppercase tracking-[0.3em]"
                                style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.25rem)' }}
                            >
                                {heroContent.role}
                            </motion.p>
                        )}

                        {/* Tagline — the shimmering signature line */}
                        {animateEntrance && (
                            <motion.p
                                {...fadeUp(0.85)}
                                className="mt-3 font-sora font-semibold uppercase tracking-[0.13em]"
                                style={{ fontSize: 'clamp(0.8rem, 1.4vw, 1rem)' }}
                            >
                                <ShinyText text={heroContent.tagline} />
                            </motion.p>
                        )}

                        {/* Summary — bright + shadowed: it sits directly on
                            the skyline photograph */}
                        {animateEntrance && (
                            <MaskReveal
                                text={heroContent.summary}
                                delay={1.05}
                                className="text-legible mt-6 font-inter text-cool-white/90 text-base md:text-lg max-w-2xl leading-8"
                            />
                        )}

                        {animateEntrance && (
                            <motion.p
                                {...fadeUp(1.25)}
                                className="text-legible mt-3 font-inter text-cool-white/70 text-[13px] uppercase tracking-[0.08em]"
                            >
                                {heroContent.subtitle}
                            </motion.p>
                        )}

                        {/* CTAs */}
                        {animateEntrance && (
                            <motion.div
                                {...fadeUp(1.45)}
                                className="mt-9 flex flex-col sm:flex-row items-center gap-4"
                            >
                                <MagneticButton
                                    onClick={() => handleCTA(heroContent.ctaPrimary.target)}
                                    className="text-cool-white font-sora font-medium text-[14px] uppercase tracking-[0.05em] px-8 py-4 rounded-full hover:shadow-[0_0_30px_rgba(124,58,237,0.35)] w-full sm:w-auto bg-linear-to-br from-violet to-cyan"
                                >
                                    {heroContent.ctaPrimary.text}
                                </MagneticButton>
                                <MagneticButton
                                    onClick={() => handleCTA(heroContent.ctaSecondary.target)}
                                    className="glass-panel text-cool-white/90 font-sora font-medium text-[14px] uppercase tracking-[0.05em] px-8 py-4 rounded-full hover:border-violet/50 w-full sm:w-auto"
                                >
                                    {heroContent.ctaSecondary.text}
                                </MagneticButton>
                            </motion.div>
                        )}
                    </div>

                    {/* Headshot — right column on desktop */}
                    {animateEntrance && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.55, ease: EASE_OUT }}
                            className="hidden lg:flex lg:w-[40%] justify-center"
                        >
                            <RingHeadshot size={320} />
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Scroll cue — a signal dropping down a wire */}
            {animateEntrance && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 2.0 }}
                    className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
                    aria-hidden="true"
                >
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-silver/60">
                        scroll
                    </span>
                    <span className="signal-wire" />
                </motion.div>
            )}
        </section>
    )
}
