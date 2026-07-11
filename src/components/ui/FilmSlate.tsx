/* ==========================================================
 * FILMSLATE.TSX — cinema's clapboard, in HUD language
 * Crossing into a new act flashes a small mono chip at the
 * bottom left — `scene 04 · training montage` — for ~2s, then
 * dissolves. One shot per boundary, desktop only, and silent
 * until the boot has lifted. Purely decorative (aria-hidden).
 * ========================================================== */
"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const SLATES: Record<string, string> = {
    hero: 'scene 01 · signal received',
    about: 'scene 02 · learned representation',
    work: 'scene 03 · the deployment log',
    proof: 'scene 04 · training montage',
    'how-i-work': 'scene 05 · the latent space',
    education: 'scene 06 · where weights formed',
    opportunities: 'scene 07 · decision boundary',
    contact: 'scene 08 · the output layer',
}

export default function FilmSlate() {
    const [slate, setSlate] = useState<string | null>(null)
    const lastActRef = useRef<string | null>(null)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const reduced = useReducedMotion()

    useEffect(() => {
        if (reduced) return

        const observers: IntersectionObserver[] = []
        Object.keys(SLATES).forEach((id) => {
            const el = document.getElementById(id)
            if (!el) return
            const obs = new IntersectionObserver(
                (entries) => {
                    entries.forEach((e) => {
                        if (!e.isIntersecting) return
                        if (lastActRef.current === id) return
                        const booted = (window as unknown as Record<string, unknown>).__fpIgnited
                        const isFirst = lastActRef.current === null
                        lastActRef.current = id
                        // Skip the very first resolve (the hero on load) —
                        // the boot sequence already owns that moment.
                        if (!booted || isFirst) return
                        setSlate(SLATES[id])
                        if (timerRef.current) clearTimeout(timerRef.current)
                        timerRef.current = setTimeout(() => setSlate(null), 2100)
                    })
                },
                { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
            )
            obs.observe(el)
            observers.push(obs)
        })

        return () => {
            observers.forEach((o) => o.disconnect())
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [reduced])

    return (
        <div
            className="pointer-events-none fixed bottom-6 left-6 z-40 hidden lg:block"
            aria-hidden="true"
        >
            <AnimatePresence>
                {slate && (
                    <motion.p
                        key={slate}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-md border border-white/10 bg-obsidian/70 px-3 py-1.5
                                   font-mono text-[10px] tracking-[0.14em] text-silver backdrop-blur-sm"
                    >
                        <span className="text-cyan">▸</span> {slate}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    )
}
