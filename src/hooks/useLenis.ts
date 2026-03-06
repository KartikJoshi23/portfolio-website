/* ==========================================================
 * useLenis.ts — Blueprint Section 3.4.5
 * Access the global Lenis instance for programmatic scroll
 * ========================================================== */
"use client"

import { useCallback } from 'react'

export function useLenis() {
    const scrollTo = useCallback((target: string | number, options?: { offset?: number; duration?: number }) => {
        const lenis = (window as unknown as Record<string, unknown>).__lenis as {
            scrollTo: (target: string | number | HTMLElement, options?: Record<string, unknown>) => void
        } | undefined

        if (lenis) {
            lenis.scrollTo(target, {
                offset: options?.offset ?? 0,
                duration: options?.duration ?? 1.2,
            })
        }
    }, [])

    return { scrollTo }
}
