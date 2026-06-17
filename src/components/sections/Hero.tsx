/* ==========================================================
 * HERO.TSX — Phase 1 redesign
 * Outcome-first hero with stronger CTAs and clear positioning
 * ========================================================== */
"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import VioletGlow from '@/components/ui/VioletGlow'
import ShinyText from '@/components/ui/ShinyText'
import { EASE_OUT, PERSONAL } from '@/lib/constants'
import { useLenis } from '@/hooks/useLenis'

interface HeroProps {
    animateEntrance: boolean
}

const heroContent = {
    name: 'KARTIK JOSHI',
    tagline: 'Automating Intelligence. Decentralizing Trust.',
    role: 'AI Engineer',
    summary:
        'I design and ship applied AI systems across model integration, product architecture, and production deployment with a focus on measurable real-world outcomes.',
    subtitle: `${PERSONAL.degree} • ${PERSONAL.institution}`,
    ctaPrimary: { text: 'View My Projects', target: '#work' },
    ctaSecondary: { text: 'Ways to Collaborate', target: '#opportunities' },
}

const stagger = (delay: number) => ({
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, delay, ease: EASE_OUT },
})

export default function Hero({ animateEntrance }: HeroProps) {
    const { scrollTo } = useLenis()

    const handleCTA = (target: string) => {
        scrollTo(target, { offset: -80 })
    }

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 lg:pt-20"
        >
            {/* Hero ambient composition (sits over the global strands) */}
            <div
                className="pointer-events-none absolute left-1/2 top-[-12%] -translate-x-1/2 w-190 h-190 rounded-full"
                aria-hidden="true"
                style={{
                    background:
                        'radial-gradient(circle, rgba(124,58,237,0.20) 0%, rgba(6,182,212,0.06) 45%, transparent 70%)',
                    filter: 'blur(20px)',
                }}
            />
            <div
                className="pointer-events-none absolute inset-0 opacity-50"
                aria-hidden="true"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                    backgroundSize: '72px 72px',
                    maskImage:
                        'radial-gradient(ellipse 70% 60% at 50% 42%, black 0%, transparent 75%)',
                    WebkitMaskImage:
                        'radial-gradient(ellipse 70% 60% at 50% 42%, black 0%, transparent 75%)',
                }}
            />

            <VioletGlow />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-center gap-10 lg:gap-0">
                    {animateEntrance && (
                        <motion.div
                            {...stagger(0)}
                            className="lg:hidden flex justify-center"
                        >
                            <div
                                className="relative rounded-full overflow-hidden border-2 border-violet"
                                style={{
                                    width: 190,
                                    height: 190,
                                    boxShadow: '0 0 40px rgba(124, 58, 237, 0.15)',
                                }}
                            >
                                <Image
                                    src="/Headshot(1).png"
                                    alt="Kartik Joshi"
                                    width={190}
                                    height={190}
                                    priority
                                    className="object-cover"
                                    style={{
                                        objectPosition: 'center 15%',
                                        transform: 'scale(1.15)',
                                        transformOrigin: 'center 15%',
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}

                    <div className="lg:w-[60%] text-center lg:text-left space-y-3">

                        {animateEntrance && (
                            <motion.div
                                {...stagger(0)}
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm"
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

                        {animateEntrance && (
                            <motion.h1
                                initial="hidden"
                                animate="visible"
                                className="font-sora font-bold text-cool-white uppercase"
                                style={{
                                    fontSize: 'clamp(2.2rem, 6.5vw, 5.5rem)',
                                    letterSpacing: '-0.02em',
                                    lineHeight: 1,
                                }}
                            >
                                {['KARTIK', 'JOSHI'].map((word, wi) => (
                                    <span key={wi} className="block">
                                        {word.split('').map((char, ci) => {
                                            const i = wi === 0 ? ci : 7 + ci
                                            return (
                                                <motion.span
                                                    key={i}
                                                    variants={{
                                                        hidden: { y: 80, opacity: 0, rotateX: -90 },
                                                        visible: {
                                                            y: 0,
                                                            opacity: 1,
                                                            rotateX: 0,
                                                            transition: {
                                                                duration: 0.6,
                                                                delay: 0.2 + i * 0.035,
                                                                ease: EASE_OUT,
                                                            },
                                                        },
                                                    }}
                                                    className="inline-block"
                                                >
                                                    {char}
                                                </motion.span>
                                            )
                                        })}
                                    </span>
                                ))}
                            </motion.h1>
                        )}

                        {animateEntrance && (
                            <motion.p
                                {...stagger(0.4)}
                                className="font-sora font-medium text-violet max-w-2xl"
                                style={{ fontSize: 'clamp(1.1rem, 2.3vw, 1.7rem)' }}
                            >
                                {heroContent.role}
                            </motion.p>
                        )}

                        {animateEntrance && (
                            <motion.p
                                {...stagger(0.48)}
                                className="font-sora font-medium text-[13px] uppercase tracking-[0.14em]"
                            >
                                <ShinyText text={heroContent.tagline} />
                            </motion.p>
                        )}

                        {animateEntrance && (
                            <motion.p
                                {...stagger(0.55)}
                                className="font-inter text-silver text-base md:text-lg max-w-2xl leading-8"
                            >
                                {heroContent.summary}
                            </motion.p>
                        )}

                        {animateEntrance && (
                            <motion.p
                                {...stagger(0.62)}
                                className="font-inter text-silver/80 text-sm uppercase tracking-[0.08em]"
                            >
                                {heroContent.subtitle}
                            </motion.p>
                        )}

                        {animateEntrance && (
                            <motion.div
                                {...stagger(0.7)}
                                className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-4 lg:justify-start justify-center"
                            >
                                <MagneticButton
                                    onClick={() => handleCTA(heroContent.ctaPrimary.target)}
                                    className="text-cool-white font-sora font-medium text-[14px] uppercase tracking-[0.05em] px-8 py-4 rounded-full hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] w-full sm:w-auto bg-linear-to-br from-violet to-cyan"
                                >
                                    {heroContent.ctaPrimary.text}
                                </MagneticButton>

                                <MagneticButton
                                    onClick={() => handleCTA(heroContent.ctaSecondary.target)}
                                    className="border border-violet text-violet font-sora font-medium text-[14px] uppercase tracking-[0.05em] px-8 py-4 rounded-full hover:bg-violet/10 w-full sm:w-auto"
                                >
                                    {heroContent.ctaSecondary.text}
                                </MagneticButton>

                            </motion.div>
                        )}


                    </div>

                    {animateEntrance && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT }}
                            className="hidden lg:flex lg:w-[40%] justify-center items-center"
                        >
                            {/* Headshot inside an animated gradient ring */}
                            <div
                                className="relative rounded-full p-1.25"
                                style={{ width: 320, height: 320 }}
                            >
                                <div className="hero-ring absolute inset-0 rounded-full" aria-hidden="true" />
                                <div
                                    className="relative z-10 h-full w-full rounded-full overflow-hidden border-2 border-obsidian"
                                    style={{ boxShadow: '0 0 50px rgba(124, 58, 237, 0.22)' }}
                                >
                                    <Image
                                        src="/Headshot(1).png"
                                        alt="Kartik Joshi"
                                        width={320}
                                        height={320}
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
                        </motion.div>
                    )}
                </div>
            </div>

            {animateEntrance && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <ChevronDown size={28} className="text-silver" />
                    </motion.div>
                </motion.div>
            )}
        </section>
    )
}
