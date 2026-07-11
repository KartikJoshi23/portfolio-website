/* ==========================================================
 * CHAPTERRAIL.TSX
 * Fixed right-side chapter navigation (desktop only).
 * Numbered chapters with active tracking via IntersectionObserver.
 * Click smooth-scrolls (Lenis if available). Hidden < lg and
 * under reduced-motion-friendly (still usable, just no fanfare).
 * ========================================================== */
"use client"

import { useEffect, useState } from 'react'

interface Chapter {
    id: string
    label: string
}

/* Act names from the "Forward Pass" narrative (see ACTS in
 * lib/constants) — the rail reads as the model's layer stack. */
const CHAPTERS: Chapter[] = [
    { id: 'hero', label: 'Input' },
    { id: 'about', label: 'Representation' },
    { id: 'work', label: 'Inference' },
    { id: 'proof', label: 'Training' },
    { id: 'how-i-work', label: 'Latent Space' },
    { id: 'education', label: 'Backprop' },
    { id: 'opportunities', label: 'Routing' },
    { id: 'contact', label: 'Output' },
]

declare global {
    interface Window {
        __lenis?: { scrollTo: (target: string | HTMLElement, opts?: { offset?: number }) => void }
    }
}

export default function ChapterRail() {
    const [active, setActive] = useState('hero')
    // Increments on every act change after boot — keys the one-shot
    // light sweep so crossing a boundary feels like entering a layer.
    const [sweepKey, setSweepKey] = useState(0)

    useEffect(() => {
        const observers: IntersectionObserver[] = []
        CHAPTERS.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (!el) return
            const obs = new IntersectionObserver(
                (entries) => {
                    entries.forEach((e) => {
                        if (e.isIntersecting) {
                            setActive((prev) => {
                                if (prev !== id && (window as unknown as Record<string, unknown>).__fpIgnited) {
                                    setSweepKey((k) => k + 1)
                                }
                                return id
                            })
                        }
                    })
                },
                { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
            )
            obs.observe(el)
            observers.push(obs)
        })
        return () => observers.forEach((o) => o.disconnect())
    }, [])

    const go = (id: string) => {
        const el = document.getElementById(id)
        if (!el) return
        if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: id === 'hero' ? 0 : -80 })
        } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <>
            {/* Act-boundary light sweep (one-shot per boundary) */}
            {sweepKey > 0 && (
                <div
                    key={sweepKey}
                    className="act-sweep fixed top-0 left-0 right-0 z-40 h-px overflow-hidden pointer-events-none"
                    aria-hidden="true"
                >
                    <span className="act-sweep-beam" />
                </div>
            )}
        {/* Only rendered where a real gutter exists (≥2xl: content is
            capped at 1280px, leaving ~128px of empty margin) — the rail
            lives in that gutter and can never sit over content. Labels
            appear on hover only, in a solid chip. */}
        <nav
            aria-label="Chapters"
            className="hidden 2xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-4"
        >
            {CHAPTERS.map((c, i) => {
                const isActive = active === c.id
                return (
                    <button
                        key={c.id}
                        onClick={() => go(c.id)}
                        className="group relative flex items-center justify-end gap-2"
                        aria-current={isActive ? 'true' : undefined}
                        aria-label={c.label}
                    >
                        {/* Hover label — solid backing, never a ghost overlay */}
                        <span
                            className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md
                                       border border-white/10 bg-obsidian/95 px-2.5 py-1
                                       font-mono text-[10px] uppercase tracking-[0.14em] text-cool-white
                                       opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        >
                            {c.label}
                        </span>
                        <span
                            className={`font-mono text-[10px] tabular-nums transition-colors duration-300 ${
                                isActive ? 'text-violet' : 'text-silver/40 group-hover:text-silver/70'
                            }`}
                        >
                            {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                            className={`block h-px transition-all duration-300 ${
                                isActive
                                    ? 'w-7 bg-linear-to-r from-violet to-cyan'
                                    : 'w-4 bg-white/20 group-hover:w-6 group-hover:bg-white/40'
                            }`}
                        />
                    </button>
                )
            })}
        </nav>
        </>
    )
}
