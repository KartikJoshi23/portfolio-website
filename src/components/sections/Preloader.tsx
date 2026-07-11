/* ==========================================================
 * PRELOADER.TSX — "System Init" boot sequence
 * Terminal-style boot lines decode in, a progress bar fills,
 * then the identity line resolves and the overlay lifts —
 * dispatching `fp:ignite` so the particle field blooms out of
 * the same visual moment (no cut between loader and hero).
 *
 * - Plays fully once per session; later visits get a fast lift.
 * - Click / Escape skips.
 * - Reduced motion: near-instant.
 * ========================================================== */
"use client"

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DecodeText from '@/components/motion/DecodeText'
import { EASE_PRELOADER_EXIT } from '@/lib/constants'
import { useDeviceTier } from '@/hooks/useDeviceTier'

/* Dubai wall-clock, SSR-safe ('--:--' on the server render). */
const subscribeNever = () => () => {}
const getDubaiTime = () => {
    try {
        return new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Asia/Dubai',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date())
    } catch {
        return '--:--'
    }
}
const getDubaiTimeServer = () => '--:--'

interface PreloaderProps {
    onComplete: () => void
}

const LINE_COUNT = 4

// ms timeline: each boot line starts decode at its offset.
// Deliberately unhurried — the boot IS the first impression.
const LINE_STEP = 520
const IDENTITY_AT = LINE_COUNT * LINE_STEP + 200
const EXIT_AT = IDENTITY_AT + 1750
const TOTAL = EXIT_AT + 100

function ignite() {
    ;(window as unknown as Record<string, unknown>).__fpIgnited = true
    window.dispatchEvent(new Event('fp:ignite'))
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const [visible, setVisible] = useState(true)
    const [progress, setProgress] = useState(0)
    const [showIdentity, setShowIdentity] = useState(false)
    const finishedRef = useRef(false)

    // Live telemetry — technical visitors will notice it's real.
    const tier = useDeviceTier()
    const dubaiTime = useSyncExternalStore(subscribeNever, getDubaiTime, getDubaiTimeServer)

    const bootLines = useMemo(
        () => [
            'initializing weights',
            `local time in dubai · ${dubaiTime}`,
            `render tier · ${tier}`,
            'calibrating signal path',
        ],
        [dubaiTime, tier]
    )

    const finish = useCallback(() => {
        if (finishedRef.current) return
        finishedRef.current = true
        try {
            sessionStorage.setItem('fp-booted', '1')
        } catch {
            /* private mode — replay is fine */
        }
        ignite()
        setVisible(false)
        onComplete()
    }, [onComplete])

    useEffect(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        let booted = false
        try {
            booted = sessionStorage.getItem('fp-booted') === '1'
        } catch {
            /* ignore */
        }

        // Repeat visit or reduced motion → quick lift, no ceremony.
        if (reduced || booted) {
            const t = setTimeout(finish, reduced ? 150 : 420)
            return () => clearTimeout(t)
        }

        const timers: ReturnType<typeof setTimeout>[] = []
        timers.push(setTimeout(() => setShowIdentity(true), IDENTITY_AT))
        timers.push(setTimeout(finish, EXIT_AT))

        // Progress bar eased against the full timeline.
        const startedAt = performance.now()
        let raf = 0
        const tick = () => {
            const t = Math.min((performance.now() - startedAt) / TOTAL, 1)
            setProgress(1 - Math.pow(1 - t, 2.2))
            if (t < 1 && !finishedRef.current) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)

        // Skippable — this is a portfolio, not a cinema.
        const skip = () => finish()
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' || e.key === 'Enter') finish()
        }
        window.addEventListener('pointerdown', skip)
        window.addEventListener('keydown', onKey)

        return () => {
            timers.forEach(clearTimeout)
            cancelAnimationFrame(raf)
            window.removeEventListener('pointerdown', skip)
            window.removeEventListener('keydown', onKey)
        }
    }, [finish])

    // Lock scroll while booting.
    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [visible])

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    exit={{
                        clipPath: 'inset(0 0 100% 0)',
                        transition: { duration: 0.7, ease: EASE_PRELOADER_EXIT },
                    }}
                    initial={{ clipPath: 'inset(0 0 0 0)' }}
                    className="fixed inset-0 z-100 bg-obsidian flex items-center justify-center"
                    aria-label="Loading"
                >
                    <div className="w-[min(88vw,420px)]">
                        {/* Boot log */}
                        <div className="min-h-28 space-y-1.5" aria-hidden="true">
                            {bootLines.map((line, i) => (
                                <div
                                    key={line}
                                    className="font-mono text-[12px] tracking-[0.08em] text-silver/80"
                                >
                                    <DecodeText
                                        text={`> ${line}`}
                                        immediate
                                        delay={i * LINE_STEP}
                                        speed={22}
                                    />
                                    <DecodeText
                                        text="  ok"
                                        immediate
                                        delay={i * LINE_STEP + 340}
                                        speed={26}
                                        className="text-emerald"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Identity resolve */}
                        <div className="mt-6 h-12 flex items-center">
                            {showIdentity && (
                                <DecodeText
                                    text="KARTIK JOSHI — AI ENGINEER"
                                    immediate
                                    speed={20}
                                    className="font-sora font-semibold text-cool-white text-lg sm:text-xl tracking-[0.06em]"
                                />
                            )}
                        </div>

                        {/* Progress line */}
                        <div className="mt-4 h-px w-full bg-white/10 overflow-hidden">
                            <div
                                className="h-full bg-linear-to-r from-violet to-cyan"
                                style={{
                                    width: `${Math.round(progress * 100)}%`,
                                    transition: 'width 80ms linear',
                                }}
                            />
                        </div>
                        <div className="mt-2 flex justify-between font-mono text-[10px] text-silver/50">
                            <span>the forward pass</span>
                            <span>{Math.round(progress * 100)}%</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
