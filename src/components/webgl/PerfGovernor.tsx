/* ==========================================================
 * PERFGOVERNOR.TSX — adaptive quality safety valve
 * Watches real delivered FPS from inside the R3F loop. If the
 * frame rate stays under the floor for two consecutive windows
 * (compositor-bound GPUs, old iGPUs, remote desktops), it asks
 * CanvasRoot to step quality down: high → mid → static art.
 * ========================================================== */
"use client"

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const WINDOW_MS = 2000
const WARMUP_MS = 4500 // ignore boot/hydration jank
const FPS_FLOOR = 24
const STRIKES_TO_DEGRADE = 2

export default function PerfGovernor({ onDegrade }: { onDegrade: () => void }) {
    const state = useRef({
        started: 0,
        windowStart: 0,
        lastFrame: 0,
        frames: 0,
        strikes: 0,
        done: false,
    })

    useFrame(() => {
        const s = state.current
        if (s.done) return
        const now = performance.now()
        if (!s.started) {
            s.started = now
            s.windowStart = now
            s.lastFrame = now
            return
        }

        // A long gap means the tab was hidden / rAF suspended — that is
        // not the GPU's fault. Restart the window instead of striking.
        if (now - s.lastFrame > 350) {
            s.windowStart = now
            s.frames = 0
            s.lastFrame = now
            return
        }
        s.lastFrame = now

        if (now - s.started < WARMUP_MS) return

        s.frames++
        const elapsed = now - s.windowStart
        if (elapsed >= WINDOW_MS) {
            const fps = (s.frames / elapsed) * 1000
            s.frames = 0
            s.windowStart = now
            if (fps < FPS_FLOOR) {
                s.strikes++
                if (s.strikes >= STRIKES_TO_DEGRADE) {
                    s.done = true
                    onDegrade()
                }
            } else {
                s.strikes = 0
            }
        }
    })

    return null
}
