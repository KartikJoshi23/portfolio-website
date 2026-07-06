/* ==========================================================
 * TEMPLATE.TSX — "signal wipe" route transition
 * Remounts on every navigation: an obsidian panel with a
 * violet→cyan leading edge sweeps up to reveal the new route,
 * and the content settles in underneath. Skipped entirely on
 * the first page load (the preloader owns that moment) and
 * under reduced motion.
 * ========================================================== */
"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { EASE_PRELOADER_EXIT } from '@/lib/constants'

// Module-level: false only for the very first render of the session.
let hasNavigated = false

export default function Template({ children }: { children: React.ReactNode }) {
    const [wipe] = useState(
        () =>
            hasNavigated &&
            typeof window !== 'undefined' &&
            !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )

    useEffect(() => {
        hasNavigated = true
    }, [])

    if (!wipe) return <>{children}</>

    return (
        <>
            <motion.div
                initial={{ y: '0%' }}
                animate={{ y: '-100%' }}
                transition={{ duration: 0.55, ease: EASE_PRELOADER_EXIT }}
                className="pointer-events-none fixed inset-0 z-90 bg-obsidian"
                aria-hidden="true"
            >
                {/* leading signal edge */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r from-violet via-cyan to-violet" />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
        </>
    )
}
