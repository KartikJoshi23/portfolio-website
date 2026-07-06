/* ==========================================================
 * SPOTLIGHT.TS
 * Shared mouse-move handler that feeds the `--mx` / `--my`
 * CSS variables consumed by `.spotlight-card` (see globals.css).
 * ========================================================== */
"use client"

import type { MouseEvent } from 'react'

export function onSpotlightMove(e: MouseEvent<HTMLElement>) {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
}
