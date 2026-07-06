/* ==========================================================
 * DECODETEXT.TSX — signature "signal decode" text treatment
 * Characters resolve left-to-right out of glyph noise, like a
 * model converging on the right token. The final text is kept
 * in the layout (invisible) so nothing shifts while decoding.
 * Triggers when scrolled into view; instant under reduced motion.
 * ========================================================== */
"use client"

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#$&%@01'

interface DecodeTextProps {
    text: string
    className?: string
    /** ms before decoding starts once visible */
    delay?: number
    /** ms per decode step (lower = faster) */
    speed?: number
    /** start immediately instead of waiting for viewport entry */
    immediate?: boolean
    as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div'
    onComplete?: () => void
}

export default function DecodeText({
    text,
    className,
    delay = 0,
    speed = 28,
    immediate = false,
    as: Tag = 'span',
    onComplete,
}: DecodeTextProps) {
    const reduced = useReducedMotion()
    const hostRef = useRef<HTMLElement>(null)
    const overlayRef = useRef<HTMLSpanElement>(null)
    const [started, setStarted] = useState(immediate)
    const doneRef = useRef(false)

    // Arm on viewport entry.
    useEffect(() => {
        if (immediate || started) return
        const el = hostRef.current
        if (!el) return
        const io = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setStarted(true)
                    io.disconnect()
                }
            },
            { threshold: 0.35 }
        )
        io.observe(el)
        return () => io.disconnect()
    }, [immediate, started])

    // Run the decode.
    useEffect(() => {
        if (!started || doneRef.current) return
        const overlay = overlayRef.current
        if (!overlay) return

        if (reduced) {
            overlay.textContent = text
            doneRef.current = true
            onComplete?.()
            return
        }

        const chars = text.split('')
        // Each char locks in after (its index + a little jitter) steps.
        const lockAt = chars.map((_, i) => i * 1.4 + 2 + Math.random() * 3)
        let step = 0
        let raf = 0
        let last = 0

        const tick = (now: number) => {
            if (now - last >= speed) {
                last = now
                step++
                let out = ''
                let allLocked = true
                for (let i = 0; i < chars.length; i++) {
                    if (chars[i] === ' ') {
                        out += ' '
                    } else if (step >= lockAt[i]) {
                        out += chars[i]
                    } else {
                        allLocked = false
                        out += GLYPHS[(Math.random() * GLYPHS.length) | 0]
                    }
                }
                overlay.textContent = out
                if (allLocked) {
                    doneRef.current = true
                    onComplete?.()
                    return
                }
            }
            raf = requestAnimationFrame(tick)
        }

        const timer = setTimeout(() => {
            raf = requestAnimationFrame(tick)
        }, delay)

        return () => {
            clearTimeout(timer)
            cancelAnimationFrame(raf)
        }
    }, [started, reduced, text, delay, speed, onComplete])

    return (
        <Tag
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref={hostRef as any}
            className={className}
            style={{ position: 'relative', display: 'inline-block' }}
        >
            {/* Reserve exact final layout; screen readers read this. */}
            <span style={{ visibility: 'hidden' }}>{text}</span>
            <span
                ref={overlayRef}
                aria-hidden="true"
                style={{ position: 'absolute', inset: 0 }}
            />
        </Tag>
    )
}
