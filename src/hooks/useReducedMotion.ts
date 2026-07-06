/* ==========================================================
 * USEREDUCEDMOTION.TS
 * Returns true when the user prefers reduced motion.
 * SSR-safe via useSyncExternalStore (server snapshot: false),
 * and reacts live if the OS setting changes.
 * ========================================================== */
"use client"

import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(callback: () => void) {
    const mq = window.matchMedia(QUERY)
    mq.addEventListener('change', callback)
    return () => mq.removeEventListener('change', callback)
}

const getSnapshot = () => window.matchMedia(QUERY).matches
const getServerSnapshot = () => false

export function useReducedMotion(): boolean {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
