/* ==========================================================
 * FEATUREDWORK.TSX — Act 03 / INFERENCE (the centerpiece)
 * Desktop: the section pins and vertical scroll drives the
 * project panels horizontally (GSAP ScrollTrigger scrub), with
 * a data-line progress indicator. Mobile / reduced motion:
 * clean vertical stack — pinning is deliberately avoided on
 * touch (dynamic viewport height pitfalls).
 * Each panel carries a living GenerativeCover, not an image.
 * ========================================================== */
"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronsDown } from 'lucide-react'
import GenerativeCover from '@/components/ui/GenerativeCover'
import DecodeText from '@/components/motion/DecodeText'
import { gsap } from '@/lib/gsap'
import { EASE_OUT } from '@/lib/constants'
import { featuredProjects, projects } from '@/data/projects'
import { useLenis } from '@/hooks/useLenis'
import type { Project } from '@/types'

/* The homepage gallery stays a curated, bounded experience no matter
 * how many projects exist — everything else lives in /projects. */
const MAX_SHOWCASE = 4
const showcaseProjects = featuredProjects.slice(0, MAX_SHOWCASE)

/* ---------- single project panel ---------- */

function ProjectPanel({ project }: { project: Project }) {
    const [hover, setHover] = useState(false)

    return (
        <motion.article
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="work-panel relative shrink-0 w-full lg:w-[min(74vw,1040px)]"
        >
            <Link
                href={`/projects/${project.slug}`}
                className="group block glass-panel hud-corners rounded-3xl p-6 sm:p-9 lg:p-11 transition-colors duration-300 hover:border-violet/30"
            >
                {/* Oversized index numeral */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-6 right-4 font-sora font-bold text-white/6 select-none"
                    style={{ fontSize: 'clamp(5rem, 11vw, 9rem)', lineHeight: 1 }}
                >
                    {project.number}
                </span>

                {/* Fixed row structure so every panel is identical in
                    shape regardless of copy length. */}
                <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 items-center">
                    {/* Info */}
                    <div className="relative z-10 flex flex-col">
                        <p className="hud-label truncate">
                            [ {project.number} ] · {project.category} · {project.year}
                            {project.status === 'in-progress' && (
                                <span className="ml-2 text-emerald">● in progress</span>
                            )}
                        </p>

                        <h3 className="mt-4 font-sora font-semibold text-cool-white text-3xl sm:text-4xl lg:text-[2.5rem] leading-[1.12] lg:min-h-[2.3em] line-clamp-2">
                            {project.title}
                        </h3>
                        <p className="mt-2 font-inter text-silver/90 text-sm sm:text-base line-clamp-1">
                            {project.subtitle}
                        </p>

                        <p className="mt-5 font-inter text-silver leading-7 text-[15px] max-w-xl line-clamp-2 lg:min-h-14">
                            {project.oneLiner}
                        </p>

                        {/* Metrics readout — always three equal cells */}
                        <div className="mt-6 grid grid-cols-3 gap-3 max-w-xl">
                            {(project.metrics ?? []).slice(0, 3).map((m) => (
                                <div
                                    key={m.label}
                                    className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5"
                                >
                                    <p className="font-mono text-[15px] text-cool-white truncate">
                                        <DecodeText text={m.value} speed={40} />
                                    </p>
                                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-silver/70 truncate">
                                        {m.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Tech — one uniform line */}
                        <p className="mt-6 font-mono text-[11px] tracking-[0.06em] text-silver/60 max-w-xl truncate">
                            {project.tech.slice(0, 6).join(' · ')}
                        </p>

                        <span className="mt-7 inline-flex items-center gap-2 font-sora text-sm text-violet-bright transition-colors group-hover:text-cyan">
                            Open case study
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                    </div>

                    {/* Living cover — identical aspect on every panel */}
                    <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/10 bg-panel">
                        <GenerativeCover
                            slug={project.slug}
                            category={project.category}
                            active={hover}
                        />
                        <div
                            className="pointer-events-none absolute inset-0"
                            style={{
                                background:
                                    'radial-gradient(ellipse 90% 70% at 50% 110%, rgba(9,9,11,0.55) 0%, transparent 60%)',
                            }}
                        />
                    </div>
                </div>
            </Link>
        </motion.article>
    )
}

/* ---------- section ---------- */

export default function FeaturedWork() {
    const sectionRef = useRef<HTMLElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)
    const { scrollTo } = useLenis()

    /* Escape hatch: jump past the whole pinned traversal in one move. */
    const skipGallery = () => {
        scrollTo('#proof', { offset: -60, duration: 1.1 })
    }

    useEffect(() => {
        const section = sectionRef.current
        const track = trackRef.current
        if (!section || !track) return

        const mm = gsap.matchMedia()

        mm.add(
            '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
            () => {
                const distance = () => track.scrollWidth - window.innerWidth

                // Velocity "skew settle": panels lean into fast traversal
                // and spring back upright when the scroll rests.
                const clampSkew = gsap.utils.clamp(-1.5, 1.5)
                const skewSetter = gsap.quickSetter('.work-panel', 'skewX', 'deg')
                const skewProxy = { skew: 0 }

                const tween = gsap.to(track, {
                    x: () => -distance(),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: () => '+=' + distance(),
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            if (progressRef.current) {
                                progressRef.current.style.transform = `scaleX(${self.progress})`
                            }
                            const skew = clampSkew(self.getVelocity() / -500)
                            if (Math.abs(skew) > Math.abs(skewProxy.skew)) {
                                skewProxy.skew = skew
                                gsap.to(skewProxy, {
                                    skew: 0,
                                    duration: 0.7,
                                    ease: 'power3.out',
                                    overwrite: true,
                                    onUpdate: () => skewSetter(skewProxy.skew),
                                })
                            }
                        },
                    },
                })

                return () => {
                    tween.scrollTrigger?.kill()
                    tween.kill()
                }
            }
        )

        return () => mm.revert()
    }, [])

    return (
        <section
            id="work"
            ref={sectionRef}
            className="relative overflow-hidden py-20 lg:py-0 lg:h-screen lg:flex lg:flex-col lg:justify-center"
        >
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between lg:pt-10">
                    <div>
                        <p className="hud-label">
                            [ 03 / <span className="hud-accent">INFERENCE</span> ] · outputs of the network
                        </p>
                        <h2 className="mt-3 font-sora font-bold text-4xl md:text-6xl text-cool-white">
                            Selected Work
                        </h2>
                        <p className="mt-4 font-inter text-silver max-w-xl md:text-lg">
                            Production-grade systems with real stakes — not tutorials,
                            not toy projects.
                        </p>
                    </div>
                    <div className="flex items-center gap-5">
                        <Link
                            href="/projects"
                            className="group inline-flex items-center gap-2 font-sora text-sm text-silver hover:text-cool-white transition-colors"
                        >
                            All {projects.length} projects
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                        {/* Skip affordance — nobody is forced through the
                            whole traversal to reach the next act */}
                        <button
                            type="button"
                            onClick={skipGallery}
                            className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] tracking-[0.08em] text-silver/80 transition-colors hover:border-cyan/40 hover:text-cool-white"
                        >
                            skip section
                            <ChevronsDown className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Track — horizontal on desktop (GSAP moves it), stacked on mobile */}
            <div className="mt-10 lg:mt-12">
                <div
                    ref={trackRef}
                    className="flex flex-col gap-10 px-6 lg:flex-row lg:flex-nowrap lg:items-stretch lg:gap-8 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+2rem))] lg:pr-[12vw] lg:w-max"
                >
                    {showcaseProjects.map((project) => (
                        <ProjectPanel key={project.slug} project={project} />
                    ))}
                </div>
            </div>

            {/* Progress data-line (desktop scrub only) */}
            <div className="hidden lg:block mx-auto w-full max-w-7xl px-8 pb-10 mt-10">
                <div className="h-px w-full bg-white/10 overflow-hidden">
                    <div
                        ref={progressRef}
                        className="h-full w-full origin-left bg-linear-to-r from-violet to-cyan"
                        style={{ transform: 'scaleX(0)' }}
                    />
                </div>
                <div className="mt-2 flex justify-between font-mono text-[10px] text-silver/50">
                    <span>scroll to traverse · or skip ahead anytime</span>
                    <span>{showcaseProjects.length} systems</span>
                </div>
            </div>
        </section>
    )
}
