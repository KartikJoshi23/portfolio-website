/* ==========================================================
 * CASESTUDYKEYS.TSX — arrow-key navigation between projects
 * ← / → move to the previous / next case study (wrapping),
 * with a quiet hint chip on desktop. Ignores keystrokes while
 * typing and modifier combos (browser back/forward etc.).
 * ========================================================== */
"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface CaseStudyKeysProps {
    prevSlug: string
    nextSlug: string
}

export default function CaseStudyKeys({ prevSlug, nextSlug }: CaseStudyKeysProps) {
    const router = useRouter()

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.metaKey || e.ctrlKey || e.altKey) return
            const t = e.target as HTMLElement
            if (t.closest('input, textarea, select, [contenteditable="true"]')) return
            if (e.key === 'ArrowLeft') {
                router.push(`/projects/${prevSlug}`)
            } else if (e.key === 'ArrowRight') {
                router.push(`/projects/${nextSlug}`)
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [router, prevSlug, nextSlug])

    return (
        <p
            className="pointer-events-none fixed bottom-6 right-6 z-40 hidden rounded-md border border-white/10
                       bg-obsidian/70 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-silver/70
                       backdrop-blur-sm lg:block"
            aria-hidden="true"
        >
            ← → to move between systems
        </p>
    )
}
