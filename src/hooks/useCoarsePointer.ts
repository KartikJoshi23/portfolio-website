/* ==========================================================
 * useCoarsePointer.ts — is the primary input a finger?
 * Phones and tablets report `(pointer: coarse)`. Several of
 * the site's always-on effects are affordable on a laptop GPU
 * and not on a phone's — full-screen filtered photographs with
 * a continuous scale animation, and a 1,300-particle field —
 * so those components use this to step down on touch devices.
 * SSR-safe via useSyncExternalStore (server snapshot: false).
 * ========================================================== */
"use client"

import { useSyncExternalStore } from 'react'

const QUERY = '(pointer: coarse)'

function subscribe(callback: () => void) {
    const mql = window.matchMedia(QUERY)
    mql.addEventListener('change', callback)
    return () => mql.removeEventListener('change', callback)
}

const getSnapshot = () => window.matchMedia(QUERY).matches
const getServerSnapshot = () => false

export function useCoarsePointer(): boolean {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
