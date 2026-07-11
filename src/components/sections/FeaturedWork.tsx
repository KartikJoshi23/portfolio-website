/* ==========================================================
 * FEATUREDWORK.TSX — "The Deployment Log" (id="work")
 * A horizontal showcase that NEVER captures vertical scroll:
 * the page flows straight past, and browsing the panels is
 * opt-in — arrow buttons, trackpad, drag, or touch swipe on
 * the snap track. Uniform living-cover panels throughout.
 * ========================================================== */
"use client"

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useSpring } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import GenerativeCover from '@/components/ui/GenerativeCover'
import DecodeText from '@/components/motion/DecodeText'
import { EASE_OUT } from '@/lib/constants'
import { featuredProjects, projects } from '@/data/projects'
import type { Project } from '@/types'

/* The homepage showcase stays a curated, bounded experience no matter
 * how many projects exist — everything else lives in /projects. */
const MAX_SHOWCASE = 4
const showcaseProjects = featuredProjects.slice(0, MAX_SHOWCASE)

/* ---------- single project panel ---------- */

function ProjectPanel({ project }: { project: Project }) {
    const [hover, setHover] = useState(false)

    // Gentle 3D tilt on the cover, following the cursor (≤4°).
    const tiltX = useSpring(0, { stiffness: 120, damping: 16 })
    const tiltY = useSpring(0, { stiffness: 120, damping: 16 })

    const onTilt = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const nx = (e.clientX - rect.left) / rect.width - 0.5
        const ny = (e.clientY - rect.top) / rect.height - 0.5
        tiltY.set(nx * 8)
        tiltX.set(-ny * 8)
    }
    const resetTilt = () => {
        tiltX.set(0)
        tiltY.set(0)
    }

    return (
        <motion.article
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => {
                setHover(false)
                resetTilt()
            }}
            onMouseMove={onTilt}
            className="work-panel snap-item relative shrink-0 w-[86vw] sm:w-[72vw] lg:w-[min(56vw,780px)]"
        >
            <Link
                href={`/projects/${project.slug}`}
                data-cursor="open"
                className="group block glass-panel hud-corners rounded-3xl p-6 sm:p-7 lg:p-8 transition-colors duration-300 hover:border-violet/30"
                draggable={false}
            >
                {/* Oversized index numeral */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-5 right-4 font-sora font-bold text-white/6 select-none"
                    style={{ fontSize: 'clamp(4rem, 8vw, 6.5rem)', lineHeight: 1 }}
                >
                    {project.number}
                </span>

                {/* Fixed row structure so every panel is identical in
                    shape regardless of copy length. */}
                <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8 items-center">
                    {/* Info */}
                    <div className="relative z-10 flex flex-col">
                        <p className="hud-label truncate">
                            [ {project.number} ] · {project.category} · {project.year}
                            {project.status === 'in-progress' && (
                                <span className="ml-2 text-emerald">● in progress</span>
                            )}
                        </p>

                        <h3 className="mt-3 font-sora font-semibold text-cool-white text-2xl sm:text-3xl lg:text-[1.9rem] leading-[1.15] lg:min-h-[2.35em] line-clamp-2">
                            {project.title}
                        </h3>
                        <p className="mt-1.5 font-inter text-silver/90 text-sm line-clamp-1">
                            {project.subtitle}
                        </p>

                        <p className="mt-4 font-inter text-silver leading-6 text-sm max-w-xl line-clamp-2 lg:min-h-12">
                            {project.oneLiner}
                        </p>

                        {/* Metrics readout — always three equal cells */}
                        <div className="mt-4 grid grid-cols-3 gap-2 max-w-xl">
                            {(project.metrics ?? []).slice(0, 3).map((m) => (
                                <div
                                    key={m.label}
                                    className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2"
                                >
                                    <p className="font-mono text-[13px] text-cool-white truncate">
                                        <DecodeText text={m.value} speed={40} />
                                    </p>
                                    <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-silver/70 truncate">
                                        {m.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Tech — one uniform line */}
                        <p className="mt-4 font-mono text-[10px] tracking-[0.06em] text-silver/60 max-w-xl truncate">
                            {project.tech.slice(0, 5).join(' · ')}
                        </p>

                        <span className="mt-5 inline-flex items-center gap-2 font-sora text-sm text-violet-bright transition-colors group-hover:text-cyan">
                            Open case study
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                    </div>

                    {/* Living cover — identical aspect, tilts under the hand */}
                    <motion.div
                        className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/10 bg-panel"
                        style={{
                            rotateX: tiltX,
                            rotateY: tiltY,
                            transformPerspective: 900,
                        }}
                    >
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
                    </motion.div>
                </div>
            </Link>
        </motion.article>
    )
}

/* ---------- section ---------- */

export default function FeaturedWork() {
    const trackRef = useRef<HTMLDivElement>(null)
    const [progress, setProgress] = useState(0)
    const [atStart, setAtStart] = useState(true)
    const [atEnd, setAtEnd] = useState(false)

    const updateState = useCallback(() => {
        const el = trackRef.current
        if (!el) return
        const max = el.scrollWidth - el.clientWidth
        setProgress(max > 0 ? el.scrollLeft / max : 0)
        setAtStart(el.scrollLeft <= 2)
        setAtEnd(el.scrollLeft >= max - 2)
    }, [])

    useEffect(() => {
        // Initial sync deferred to a frame — setState directly inside an
        // effect body triggers the cascading-render lint (and re-renders).
        const raf = requestAnimationFrame(updateState)
        window.addEventListener('resize', updateState)
        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', updateState)
        }
    }, [updateState])

    const scrollByCards = (dir: 1 | -1) => {
        const el = trackRef.current
        if (!el) return
        const amount = Math.min(el.clientWidth * 0.9, 820)
        el.scrollBy({ left: dir * amount, behavior: 'smooth' })
    }

    /* Mouse drag-to-browse (touch gets native swipe already). */
    const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false })
    const onPointerDown = (e: React.PointerEvent) => {
        if (e.pointerType !== 'mouse') return
        const el = trackRef.current
        if (!el) return
        drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false }
    }
    const onPointerMove = (e: React.PointerEvent) => {
        const d = drag.current
        const el = trackRef.current
        if (!d.down || !el) return
        const dx = e.clientX - d.startX
        if (Math.abs(dx) > 6) d.moved = true
        el.scrollLeft = d.startLeft - dx
    }
    const endDrag = () => {
        drag.current.down = false
    }
    /* Suppress the accidental link click at the end of a drag. */
    const onClickCapture = (e: React.MouseEvent) => {
        if (drag.current.moved) {
            e.preventDefault()
            e.stopPropagation()
            drag.current.moved = false
        }
    }

    return (
        <section id="work" className="relative overflow-hidden py-20 md:py-24">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
                {/* Section title — echoes the chapter card that precedes it */}
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="hud-label">
                            [ 03 / <span className="hud-accent">INFERENCE</span> ] · live systems · real stakes
                        </p>
                        <h2 className="mt-2 font-sora font-bold text-3xl md:text-[2.6rem] text-cool-white leading-tight">
                            The Deployment <span className="text-gradient">Log</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/projects"
                            className="group mr-2 inline-flex items-center gap-2 font-sora text-sm text-silver hover:text-cool-white transition-colors"
                        >
                            All {projects.length} projects
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                        <button
                            type="button"
                            aria-label="Previous projects"
                            onClick={() => scrollByCards(-1)}
                            disabled={atStart}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10
                                       text-cool-white transition-all duration-300 hover:border-violet/50 hover:bg-white/5
                                       disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            aria-label="Next projects"
                            onClick={() => scrollByCards(1)}
                            disabled={atEnd}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10
                                       text-cool-white transition-all duration-300 hover:border-violet/50 hover:bg-white/5
                                       disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Horizontal snap track — vertical page scroll passes through */}
            <div className="relative mt-10">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-obsidian/80 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-obsidian/80 to-transparent" />

                <div
                    ref={trackRef}
                    data-cursor="drag"
                    onScroll={updateState}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={endDrag}
                    onPointerLeave={endDrag}
                    onClickCapture={onClickCapture}
                    className="snap-x-track flex cursor-grab select-none gap-6 overflow-x-auto pb-3 active:cursor-grabbing
                               pl-6 pr-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+2rem))] lg:pr-[8vw]"
                >
                    {showcaseProjects.map((project) => (
                        <ProjectPanel key={project.slug} project={project} />
                    ))}
                </div>
            </div>

            {/* Progress data-line */}
            <div className="mx-auto mt-6 w-full max-w-7xl px-6 lg:px-8">
                <div className="h-px w-full bg-white/10 overflow-hidden">
                    <div
                        className="h-full w-full origin-left bg-linear-to-r from-violet to-cyan transition-transform duration-150 ease-out"
                        style={{ transform: `scaleX(${progress})` }}
                    />
                </div>
                <div className="mt-2 flex justify-between font-mono text-[10px] text-silver/60">
                    <span>browse with arrows, drag, or swipe — the page scrolls on regardless</span>
                    <span>the log grows</span>
                </div>
            </div>
        </section>
    )
}
