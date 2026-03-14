/* ==========================================================
 * useActiveSection.ts — Blueprint Section 3.4.7
 * Intersection Observer hook for navbar active state
 * ========================================================== */
"use client"

import { useState, useEffect } from 'react'
import { SECTION_IDS } from '@/lib/constants'

const sections = [
    SECTION_IDS.hero,
    SECTION_IDS.about,
    SECTION_IDS.work,
    SECTION_IDS.proof,
    SECTION_IDS.howIWork,
    SECTION_IDS.research,
    SECTION_IDS.contact,
]

export function useActiveSection() {
    const [active, setActive] = useState('hero')

    useEffect(() => {
        const observers: IntersectionObserver[] = []

        sections.forEach((id) => {
            const el = document.getElementById(id)
            if (!el) return

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActive(id)
                    }
                },
                { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
            )

            observer.observe(el)
            observers.push(observer)
        })

        return () => observers.forEach((o) => o.disconnect())
    }, [])

    return active
}
