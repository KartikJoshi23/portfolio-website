/* ==========================================================
 * useDeviceTier.ts — capability probe for adaptive quality
 * 'high'  desktop-class hardware, fine pointer, plenty of cores
 * 'mid'   default — full particles, no extras
 * 'low'   weak/mobile hardware or reduced motion — static art
 * SSR-safe via useSyncExternalStore (server snapshot: 'mid').
 * ========================================================== */
"use client"

import { useSyncExternalStore } from 'react'

export type DeviceTier = 'low' | 'mid' | 'high'

function probe(): DeviceTier {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return 'low'
    }

    const nav = navigator as Navigator & { deviceMemory?: number }
    const cores = navigator.hardwareConcurrency ?? 4
    const memory = nav.deviceMemory ?? 8
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const smallScreen = Math.min(window.innerWidth, window.innerHeight) < 640

    if (cores <= 2 || memory <= 2) return 'low'
    if (!finePointer || smallScreen || cores <= 4) return 'mid'
    return 'high'
}

// Device capabilities don't meaningfully change mid-session.
const subscribe = () => () => {}
const getServerSnapshot = (): DeviceTier => 'mid'

export function useDeviceTier(): DeviceTier {
    return useSyncExternalStore(subscribe, probe, getServerSnapshot)
}
