/* ==========================================================
 * GSAP.TS — Single GSAP entry point
 * Registers plugins exactly once and exports the shared
 * instances. Every component imports gsap from here, never
 * from 'gsap' directly, so plugin registration is guaranteed.
 * ========================================================== */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)

    // Lenis drives scroll on its own eased timeline; without this
    // GSAP tries to "catch up" after tab switches and jumps.
    gsap.ticker.lagSmoothing(0)
}

export { gsap, ScrollTrigger }
