/* ==========================================================
 * HERO.TSX — Phase 1 redesign
 * Positioning-first hero with stronger CTAs and opportunity framing
 * ========================================================== */
"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Linkedin, Github, Mail, ChevronDown } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import VioletGlow from '@/components/ui/VioletGlow'
import { EASE_OUT, PERSONAL } from '@/lib/constants'
import { useLenis } from '@/hooks/useLenis'

interface HeroProps {
    animateEntrance: boolean
}

const heroContent = {
    name: 'KARTIK JOSHI',
    eyebrow: 'Dubai-based • Open to AI roles, research, and product collaborations',
    role: 'AI Product Builder for Prompt-Driven Systems',
    summary:
        'I design and ship applied AI systems across prompting, product architecture, and rapid prototyping, with a focus on tools people can actually use.',
    subtitle: `${PERSONAL.degree} • ${PERSONAL.institution}`,
    ctaPrimary: { text: 'View Case Studies', target: '#work' },
    ctaSecondary: { text: 'Work With Me', target: '#opportunities' },
    ctaTertiary: { text: 'Explore Research', target: '#research' },
    socials: [
        { platform: 'LinkedIn', url: PERSONAL.linkedin, Icon: Linkedin },
        { platform: 'GitHub', url: PERSONAL.github, Icon: Github },
        { platform: 'Email', url: `mailto:${PERSONAL.email}`, Icon: Mail },
    ],
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
            className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20 lg:pt-24"
            style={{
                background:
                    'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(124, 58, 237, 0.04) 0%, transparent 70%), #09090B',
            }}
        >
            <VioletGlow />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
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
                                        objectPosition: 'center top',
                                        transform: 'scale(1.08)',
                                        transformOrigin: 'center top',
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}

                    <div className="lg:w-[60%] text-center lg:text-left space-y-5">
                        {animateEntrance && (
                            <motion.p
                                {...stagger(0.15)}
                                className="inline-flex items-center rounded-full border border-white/10 bg-white/4 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-violet/75"
                            >
                                {heroContent.eyebrow}
                            </motion.p>
                        )}

                        {animateEntrance && (
                            <motion.h1
                                initial="hidden"
                                animate="visible"
                                className="font-sora font-bold text-cool-white uppercase"
                                style={{
                                    fontSize: 'clamp(2.5rem, 8vw, 7rem)',
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

                                <button
                                    onClick={() => handleCTA(heroContent.ctaTertiary.target)}
                                    className="font-inter text-sm text-silver hover:text-cool-white transition-colors duration-300 underline underline-offset-4 decoration-violet/50 hover:decoration-violet"
                                >
                                    {heroContent.ctaTertiary.text}
                                </button>
                            </motion.div>
                        )}

                        {animateEntrance && (
                            <motion.div
                                {...stagger(0.8)}
                                className="flex items-center gap-5 lg:justify-start justify-center"
                            >
                                {heroContent.socials.map((social) => (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        target={social.platform !== 'Email' ? '_blank' : undefined}
                                        rel={social.platform !== 'Email' ? 'noopener noreferrer' : undefined}
                                        aria-label={social.platform}
                                        className="text-silver hover:text-violet transition-colors duration-200"
                                    >
                                        <social.Icon size={24} />
                                    </a>
                                ))}
                            </motion.div>
                        )}
                    </div>

                    {animateEntrance && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8, ease: EASE_OUT }}
                            className="hidden lg:flex lg:w-[40%] justify-center items-center"
                        >
                            <div
                                className="relative rounded-full overflow-hidden border-2 border-violet"
                                style={{
                                    width: 310,
                                    height: 310,
                                    boxShadow: '0 0 40px rgba(124, 58, 237, 0.15)',
                                }}
                            >
                                <Image
                                    src="/Headshot(1).png"
                                    alt="Kartik Joshi"
                                    width={310}
                                    height={310}
                                    priority
                                    className="object-cover"
                                    style={{
                                        objectPosition: 'center top',
                                        transform: 'scale(1.08)',
                                        transformOrigin: 'center top',
                                    }}
                                />
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
