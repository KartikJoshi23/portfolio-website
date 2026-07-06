/* ==========================================================
 * GENERATIVECOVER.TSX — living project covers, zero images
 * Each project gets a themed Canvas-2D composition driven by
 * its actual domain:
 *   algoviz            → streaming price line + candlesticks
 *   smart-contract-…   → hex grid security sweep
 *   smart-city-traffic → intersection grid with signal pulses
 *   sentinel-gate      → hand-landmark constellation scan
 * Pauses off-screen; static frame under reduced motion; the
 * `active` prop (hover) raises energy.
 * ========================================================== */
"use client"

import { useEffect, useRef } from 'react'
import { getProjectVisual } from '@/lib/projectVisuals'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type Theme = 'stream' | 'hexscan' | 'grid' | 'landmarks'

const SLUG_THEME: Record<string, Theme> = {
    algoviz: 'stream',
    'smart-contract-scanner': 'hexscan',
    'smart-city-traffic': 'grid',
    'sentinel-gate': 'landmarks',
}

const CATEGORY_THEME: Record<string, Theme> = {
    'AI/ML': 'stream',
    Web3: 'hexscan',
    'Reinforcement Learning': 'grid',
    'Edge AI': 'landmarks',
}

/* --- MediaPipe-style hand landmarks (normalized 0..1) --- */
const HAND_POINTS: [number, number][] = [
    [0.50, 0.92],                                          // wrist
    [0.38, 0.82], [0.29, 0.72], [0.23, 0.63], [0.18, 0.55], // thumb
    [0.42, 0.62], [0.40, 0.47], [0.39, 0.37], [0.38, 0.28], // index
    [0.50, 0.60], [0.50, 0.43], [0.50, 0.32], [0.50, 0.22], // middle
    [0.58, 0.62], [0.60, 0.46], [0.61, 0.36], [0.62, 0.27], // ring
    [0.66, 0.66], [0.70, 0.54], [0.72, 0.45], [0.74, 0.37], // pinky
]
const HAND_BONES: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [5, 6], [6, 7], [7, 8],
    [5, 9], [9, 10], [10, 11], [11, 12],
    [9, 13], [13, 14], [14, 15], [15, 16],
    [13, 17], [0, 17], [17, 18], [18, 19], [19, 20],
]

/* Deterministic pseudo-random (stable across frames). */
const prand = (n: number) => {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
    return x - Math.floor(x)
}

interface GenerativeCoverProps {
    slug: string
    category: string
    className?: string
    /** hover / focus energy boost */
    active?: boolean
}

export default function GenerativeCover({
    slug,
    category,
    className,
    active = false,
}: GenerativeCoverProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const activeRef = useRef(active)
    const reduced = useReducedMotion()

    // Mirror the prop into a ref so the draw loop reads the live
    // value without re-running the whole canvas effect on hover.
    useEffect(() => {
        activeRef.current = active
    }, [active])

    const theme: Theme = SLUG_THEME[slug] ?? CATEGORY_THEME[category] ?? 'stream'
    const { from, to, accent } = getProjectVisual(category, slug)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
        let w = 0
        let h = 0
        let raf = 0
        let running = false
        // Energy eases toward hover state for smooth ramps.
        let energy = 0

        const resize = () => {
            const rect = canvas.getBoundingClientRect()
            w = Math.max(rect.width, 1)
            h = Math.max(rect.height, 1)
            canvas.width = Math.floor(w * dpr)
            canvas.height = Math.floor(h * dpr)
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }
        const ro = new ResizeObserver(() => {
            resize()
            if (reduced) draw(4200) // refresh the static frame
        })
        ro.observe(canvas)
        resize()

        /* ---------- theme renderers ---------- */

        const drawStream = (t: number) => {
            const mid = h * 0.55
            // grid
            ctx.strokeStyle = 'rgba(255,255,255,0.045)'
            ctx.lineWidth = 1
            for (let gy = h * 0.15; gy < h; gy += h * 0.2) {
                ctx.beginPath()
                ctx.moveTo(0, gy)
                ctx.lineTo(w, gy)
                ctx.stroke()
            }
            // candlesticks drifting left
            const cw = w / 16
            for (let i = 0; i < 18; i++) {
                const x = ((i * cw - t * 0.018 * cw) % (w + cw * 2)) + cw
                const seed = Math.floor((i * cw - t * 0.018 * cw) / (w + cw * 2)) * 31 + i
                const o = prand(seed) - 0.5
                const c = prand(seed + 7) - 0.5
                const up = c > o
                const bodyTop = mid + Math.min(o, c) * h * 0.4
                const bodyH = Math.max(Math.abs(c - o) * h * 0.4, 2)
                ctx.fillStyle = up
                    ? 'rgba(16,185,129,0.34)'
                    : 'rgba(244,63,94,0.30)'
                ctx.fillRect(x - cw * 0.22, bodyTop, cw * 0.44, bodyH)
                ctx.fillRect(x - 0.5, bodyTop - h * 0.05 * prand(seed + 3), 1, bodyH + h * 0.1 * prand(seed + 5))
            }
            // price line
            const pts: [number, number][] = []
            for (let x = 0; x <= w; x += 6) {
                const p = x / w
                const y =
                    mid +
                    Math.sin(p * 5.1 + t * 0.0011) * h * 0.09 +
                    Math.sin(p * 11.7 - t * 0.0017) * h * 0.05 +
                    Math.sin(p * 23.3 + t * 0.0009) * h * 0.02
                pts.push([x, y])
            }
            ctx.lineWidth = 1.6 + energy * 0.8
            const grad = ctx.createLinearGradient(0, 0, w, 0)
            grad.addColorStop(0, `${from}00`)
            grad.addColorStop(0.35, from)
            grad.addColorStop(1, to)
            ctx.strokeStyle = grad
            ctx.shadowColor = to
            ctx.shadowBlur = 8 + energy * 10
            ctx.beginPath()
            pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
            ctx.stroke()
            ctx.shadowBlur = 0
            // head dot
            const head = pts[pts.length - 1]
            ctx.fillStyle = to
            ctx.beginPath()
            ctx.arc(head[0] - 2, head[1], 3 + energy * 2, 0, Math.PI * 2)
            ctx.fill()
        }

        const drawHexscan = (t: number) => {
            const size = Math.max(w, h) / 13
            const hexH = size * Math.sqrt(3) * 0.5
            const scanX = ((t * 0.045) % (w * 1.5)) - w * 0.25
            let idx = 0
            for (let row = -1; row * hexH < h + size; row++) {
                for (let col = -1; col * size * 1.5 < w + size; col++) {
                    const cx = col * size * 1.5
                    const cy = row * hexH * 2 + (col % 2 ? hexH : 0)
                    idx++
                    const d = Math.abs(cx - scanX)
                    const glow = Math.max(0, 1 - d / (size * 2.6))
                    const vuln = prand(idx) > 0.93
                    let alpha = 0.05 + glow * (0.3 + energy * 0.25)
                    let color = `rgba(6,182,212,${alpha.toFixed(3)})`
                    if (vuln && glow > 0.25) {
                        alpha = glow * 0.85
                        color = `rgba(244,63,94,${alpha.toFixed(3)})`
                    }
                    ctx.strokeStyle = color
                    ctx.lineWidth = vuln && glow > 0.25 ? 1.6 : 1
                    ctx.beginPath()
                    for (let s = 0; s < 6; s++) {
                        const a = (Math.PI / 3) * s
                        const px = cx + Math.cos(a) * size * 0.86
                        const py = cy + Math.sin(a) * size * 0.86
                        if (s === 0) ctx.moveTo(px, py)
                        else ctx.lineTo(px, py)
                    }
                    ctx.closePath()
                    ctx.stroke()
                    if (vuln && glow > 0.5) {
                        ctx.fillStyle = `rgba(244,63,94,${(glow * 0.16).toFixed(3)})`
                        ctx.fill()
                    }
                }
            }
            // scan beam
            const beam = ctx.createLinearGradient(scanX - 46, 0, scanX + 4, 0)
            beam.addColorStop(0, 'rgba(6,182,212,0)')
            beam.addColorStop(1, `rgba(6,182,212,${0.35 + energy * 0.3})`)
            ctx.fillStyle = beam
            ctx.fillRect(scanX - 46, 0, 50, h)
            ctx.fillStyle = `rgba(240,240,243,${0.5 + energy * 0.4})`
            ctx.fillRect(scanX + 3, 0, 1.5, h)
        }

        const drawGrid = (t: number) => {
            const cols = 4
            const rows = 3
            const gx = (i: number) => (w / (cols + 1)) * (i + 1)
            const gy = (i: number) => (h / (rows + 1)) * (i + 1)
            // roads
            ctx.strokeStyle = 'rgba(255,255,255,0.07)'
            ctx.lineWidth = 1
            for (let i = 0; i < cols; i++) {
                ctx.beginPath()
                ctx.moveTo(gx(i), 0)
                ctx.lineTo(gx(i), h)
                ctx.stroke()
            }
            for (let i = 0; i < rows; i++) {
                ctx.beginPath()
                ctx.moveTo(0, gy(i))
                ctx.lineTo(w, gy(i))
                ctx.stroke()
            }
            // pulses along lanes
            const speed = 0.05 * (1 + energy * 0.9)
            for (let i = 0; i < cols; i++) {
                const dir = i % 2 ? 1 : -1
                const p = ((t * speed * (0.6 + prand(i) * 0.8)) % (h + 40))
                const y = dir > 0 ? p - 20 : h - p + 20
                ctx.fillStyle = i % 2 ? from : to
                ctx.shadowColor = i % 2 ? from : to
                ctx.shadowBlur = 6
                ctx.beginPath()
                ctx.arc(gx(i), y, 2.2, 0, Math.PI * 2)
                ctx.fill()
            }
            for (let i = 0; i < rows; i++) {
                const dir = i % 2 ? -1 : 1
                const p = ((t * speed * (0.5 + prand(i + 9) * 0.9)) % (w + 40))
                const x = dir > 0 ? p - 20 : w - p + 20
                ctx.fillStyle = i % 2 ? to : '#10B981'
                ctx.shadowColor = i % 2 ? to : '#10B981'
                ctx.shadowBlur = 6
                ctx.beginPath()
                ctx.arc(x, gy(i), 2.2, 0, Math.PI * 2)
                ctx.fill()
            }
            ctx.shadowBlur = 0
            // intersections breathe green/red like signals
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const phase = Math.sin(t * 0.0016 + prand(i * 7 + j) * Math.PI * 2)
                    const green = phase > 0
                    const a = 0.35 + Math.abs(phase) * 0.45 + energy * 0.15
                    ctx.fillStyle = green
                        ? `rgba(16,185,129,${a.toFixed(3)})`
                        : `rgba(244,63,94,${(a * 0.8).toFixed(3)})`
                    ctx.beginPath()
                    ctx.arc(gx(i), gy(j), 3.2, 0, Math.PI * 2)
                    ctx.fill()
                }
            }
        }

        const drawLandmarks = (t: number) => {
            const pad = Math.min(w, h) * 0.12
            const px = (p: [number, number], i: number): [number, number] => [
                pad + p[0] * (w - pad * 2) +
                    Math.sin(t * 0.0011 + i * 1.7) * 1.6,
                pad * 0.4 + p[1] * (h - pad * 1.2) +
                    Math.cos(t * 0.0009 + i * 2.3) * 1.6,
            ]
            const scanY = ((t * 0.03) % (h * 1.4)) - h * 0.2
            // bones
            for (const [a, b] of HAND_BONES) {
                const pa = px(HAND_POINTS[a], a)
                const pb = px(HAND_POINTS[b], b)
                const near =
                    Math.max(0, 1 - Math.abs((pa[1] + pb[1]) / 2 - scanY) / (h * 0.22))
                ctx.strokeStyle = `rgba(124,58,237,${(0.22 + near * 0.5 + energy * 0.15).toFixed(3)})`
                ctx.lineWidth = 1 + near * 0.8
                ctx.beginPath()
                ctx.moveTo(pa[0], pa[1])
                ctx.lineTo(pb[0], pb[1])
                ctx.stroke()
            }
            // landmarks
            HAND_POINTS.forEach((p, i) => {
                const [x, y] = px(p, i)
                const near = Math.max(0, 1 - Math.abs(y - scanY) / (h * 0.2))
                const r = 2 + near * 2.4 + energy
                ctx.fillStyle = near > 0.4 ? to : accent
                ctx.shadowColor = to
                ctx.shadowBlur = near * 10
                ctx.beginPath()
                ctx.arc(x, y, r, 0, Math.PI * 2)
                ctx.fill()
            })
            ctx.shadowBlur = 0
            // scan line
            const beam = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 2)
            beam.addColorStop(0, 'rgba(6,182,212,0)')
            beam.addColorStop(1, `rgba(6,182,212,${0.3 + energy * 0.3})`)
            ctx.fillStyle = beam
            ctx.fillRect(0, scanY - 30, w, 32)
            ctx.fillStyle = `rgba(240,240,243,${0.35 + energy * 0.3})`
            ctx.fillRect(0, scanY, w, 1)
        }

        /* ---------- frame loop ---------- */

        const draw = (t: number) => {
            ctx.clearRect(0, 0, w, h)
            energy += ((activeRef.current ? 1 : 0) - energy) * 0.06
            switch (theme) {
                case 'stream': drawStream(t); break
                case 'hexscan': drawHexscan(t); break
                case 'grid': drawGrid(t); break
                case 'landmarks': drawLandmarks(t); break
            }
        }

        const loop = (t: number) => {
            if (!running) return
            draw(t)
            raf = requestAnimationFrame(loop)
        }

        const start = () => {
            if (running || reduced) return
            running = true
            raf = requestAnimationFrame(loop)
        }
        const stop = () => {
            running = false
            cancelAnimationFrame(raf)
        }

        if (reduced) {
            draw(4200) // one representative static frame
        } else {
            // Only animate while on screen.
            const io = new IntersectionObserver(
                (entries) => (entries[0].isIntersecting ? start() : stop()),
                { threshold: 0.05 }
            )
            io.observe(canvas)
            const onVis = () =>
                document.visibilityState === 'visible' ? start() : stop()
            document.addEventListener('visibilitychange', onVis)
            return () => {
                io.disconnect()
                document.removeEventListener('visibilitychange', onVis)
                ro.disconnect()
                stop()
            }
        }

        return () => {
            ro.disconnect()
            stop()
        }
    }, [theme, from, to, accent, reduced])

    return (
        <canvas
            ref={canvasRef}
            className={className}
            aria-hidden="true"
            style={{ display: 'block', width: '100%', height: '100%' }}
        />
    )
}
