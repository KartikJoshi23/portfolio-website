/* ==========================================================
 * FEATUREDWORK.TSX — id="work"
 * Homepage horizontal project showcase. Curated `featuredProjects`
 * scroll horizontally (trackpad / drag / arrow buttons), with a
 * progress indicator and edge fades. "View all" → /projects.
 * Degrades to a vertical stack with no JS dependency on touch.
 * ========================================================== */
"use client"

import { useRef, useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import ProjectCard from '@/components/ui/ProjectCard'
import { featuredProjects, projects } from '@/data/projects'

export default function FeaturedWork() {
    const trackRef = useRef<HTMLDivElement>(null)
    const [progress, setProgress] = useState(0)
    const [atStart, setAtStart] = useState(true)
    const [atEnd, setAtEnd] = useState(false)

    const updateState = useCallback(() => {
        const el = trackRef.current
        if (!el) return
        const max = el.scrollWidth - el.clientWidth
        const left = el.scrollLeft
        setProgress(max > 0 ? left / max : 0)
        setAtStart(left <= 2)
        setAtEnd(left >= max - 2)
    }, [])

    useEffect(() => {
        updateState()
        window.addEventListener('resize', updateState)
        return () => window.removeEventListener('resize', updateState)
    }, [updateState])

    const scrollByCards = (dir: 1 | -1) => {
        const el = trackRef.current
        if (!el) return
        const amount = Math.min(el.clientWidth * 0.85, 460)
        el.scrollBy({ left: dir * amount, behavior: 'smooth' })
    }

    return (
        <section id="work" className="relative overflow-hidden py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header row */}
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <SectionHeading
                        heading="Selected Work"
                        subheading="Production-grade systems with real stakes — not tutorials, not toy projects."
                    />
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            aria-label="Previous projects"
                            onClick={() => scrollByCards(-1)}
                            disabled={atStart}
                            className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/10
                                       text-cool-white transition-all duration-300 hover:border-violet/50 hover:bg-white/5
                                       disabled:cursor-not-allowed disabled:opacity-30 md:flex"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            aria-label="Next projects"
                            onClick={() => scrollByCards(1)}
                            disabled={atEnd}
                            className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/10
                                       text-cool-white transition-all duration-300 hover:border-violet/50 hover:bg-white/5
                                       disabled:cursor-not-allowed disabled:opacity-30 md:flex"
                        >
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Horizontal track */}
                <div className="relative mt-12">
                    {/* edge fades */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-obsidian to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-obsidian to-transparent" />

                    <div
                        ref={trackRef}
                        onScroll={updateState}
                        className="snap-x-track flex gap-6 overflow-x-auto pb-2"
                    >
                        {featuredProjects.map((project, i) => (
                            <div
                                key={project.slug}
                                className="snap-item w-[85vw] shrink-0 sm:w-105"
                            >
                                <ProjectCard project={project} index={i} variant="showcase" />
                            </div>
                        ))}

                        {/* Trailing "view all" panel */}
                        <Link
                            href="/projects"
                            className="snap-item group flex w-[85vw] shrink-0 flex-col items-center justify-center gap-4
                                       rounded-2xl border border-dashed border-white/12 bg-white/2
                                       transition-all duration-300 hover:border-violet/40 hover:bg-white/4
                                       sm:w-75"
                        >
                            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10
                                             text-violet transition-all duration-300 group-hover:scale-110 group-hover:border-violet/50">
                                <ArrowUpRight className="h-6 w-6" />
                            </span>
                            <span className="font-sora text-lg font-semibold text-cool-white">View all projects</span>
                            <span className="font-mono text-xs uppercase tracking-wider text-silver/70">
                                {projects.length} total
                            </span>
                        </Link>
                    </div>

                    {/* Progress + CTA */}
                    <div className="mt-8 flex items-center gap-6">
                        <div className="h-0.75 flex-1 overflow-hidden rounded-full bg-white/8">
                            <div
                                className="h-full rounded-full bg-linear-to-r from-violet to-cyan transition-[width] duration-150"
                                style={{ width: `${Math.max(8, progress * 100)}%` }}
                            />
                        </div>
                        <Link
                            href="/projects"
                            className="group inline-flex items-center gap-1.5 whitespace-nowrap font-sora text-sm font-medium text-violet
                                       transition-all hover:gap-2.5"
                        >
                            Explore the archive
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
