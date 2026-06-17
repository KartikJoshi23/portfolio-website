/* ==========================================================
 * USEREDUCEDMOTION.TS
 * Returns true when the user prefers reduced motion OR the
 * device is likely low-powered (coarse pointer + small screen).
 * Use this to gate heavy/ambient animations and degrade to static.
 * ========================================================== */
"use client"

import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
    const [reduced, setReduced] = useState(false)

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        const update = () => setReduced(mq.matches)
        update()
        mq.addEventListener('change', update)
        return () => mq.removeEventListener('change', update)
    }, [])

    return reduced
}

/**
 * True when heavy ambient effects (WebGL/canvas) should run:
 * not reduced-motion, fine pointer, and a wide enough viewport.
 */
export function useAllowHeavyMotion(): boolean {
    const [allow, setAllow] = useState(false)

    useEffect(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const coarse = window.matchMedia('(pointer: coarse)').matches
        const narrow = window.innerWidth < 768
        setAllow(!reduced && !coarse && !narrow)
    }, [])

    return allow
}
