/* ==========================================================
 * AURORABACKGROUND.TSX
 * Premium ambient backdrop — drifting violet/cyan aurora fields
 * with a faint conic sheen. Pure CSS (GPU-friendly), fixed, z-0.
 * Degrades to a calm static gradient under reduced motion.
 * ========================================================== */
"use client"

import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function AuroraBackground() {
    const reduced = useReducedMotion()

    return (
        <div
            className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
        >
            {/* Base vignette */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'radial-gradient(120% 80% at 50% -10%, rgba(124,58,237,0.10) 0%, transparent 55%), radial-gradient(100% 60% at 50% 110%, rgba(6,182,212,0.06) 0%, transparent 55%)',
                }}
            />

            {/* Aurora blob 1 — violet */}
            <div
                className={reduced ? '' : 'animate-aurora-1'}
                style={{
                    position: 'absolute',
                    top: '-15%',
                    left: '10%',
                    width: '55vw',
                    height: '55vw',
                    background:
                        'radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 65%)',
                    filter: 'blur(90px)',
                    borderRadius: '50%',
                    willChange: 'transform',
                }}
            />

            {/* Aurora blob 2 — cyan */}
            <div
                className={reduced ? '' : 'animate-aurora-2'}
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '5%',
                    width: '48vw',
                    height: '48vw',
                    background:
                        'radial-gradient(circle, rgba(6,182,212,0.16) 0%, transparent 65%)',
                    filter: 'blur(100px)',
                    borderRadius: '50%',
                    willChange: 'transform',
                }}
            />

            {/* Aurora blob 3 — deep violet, lower */}
            <div
                className={reduced ? '' : 'animate-aurora-3'}
                style={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '30%',
                    width: '42vw',
                    height: '42vw',
                    background:
                        'radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 65%)',
                    filter: 'blur(90px)',
                    borderRadius: '50%',
                    willChange: 'transform',
                }}
            />

            {/* Faint conic sheen for subtle motion of light */}
            {!reduced && (
                <div
                    className="animate-spin-slow"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '140vw',
                        height: '140vw',
                        marginLeft: '-70vw',
                        marginTop: '-70vw',
                        background:
                            'conic-gradient(from 0deg, transparent 0deg, rgba(124,58,237,0.05) 90deg, transparent 180deg, rgba(6,182,212,0.04) 270deg, transparent 360deg)',
                        filter: 'blur(40px)',
                        opacity: 0.6,
                        willChange: 'transform',
                    }}
                />
            )}

            {/* Top + bottom fade to obsidian for clean section edges */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'linear-gradient(180deg, rgba(9,9,11,0.4) 0%, transparent 20%, transparent 80%, rgba(9,9,11,0.6) 100%)',
                }}
            />
        </div>
    )
}
