/* ==========================================================
 * NEURALFIELD.TSX
 * Refined ambient backdrop — a slow, dark "neural network":
 * sparse drifting nodes connected by thin links that fade with
 * distance. On-theme for an AI engineer, deliberately subtle and
 * low-brightness so content stays the hero.
 *
 * - Canvas 2D for crisp, controllable, low-glow rendering.
 * - Gentle mouse parallax (depth-based) — no hard cursor effects.
 * - Caps DPR + node count; density scales with viewport area.
 * - Pauses when tab hidden; renders one static frame on reduced motion.
 * ========================================================== */
"use client"

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Node {
    x: number
    y: number
    vx: number
    vy: number
    depth: number // 0 (far) .. 1 (near) — drives size, alpha, parallax
    hue: number   // 0 violet .. 1 cyan
    pulse: number // phase offset for subtle breathing
}

// Theme colors as RGB triplets.
const VIOLET: [number, number, number] = [124, 58, 237]
const CYAN: [number, number, number] = [6, 182, 212]

function mix(a: [number, number, number], b: [number, number, number], t: number) {
    return [
        Math.round(a[0] + (b[0] - a[0]) * t),
        Math.round(a[1] + (b[1] - a[1]) * t),
        Math.round(a[2] + (b[2] - a[2]) * t),
    ] as [number, number, number]
}

export default function NeuralField() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const reduced = useReducedMotion()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d', { alpha: true })
        if (!ctx) return

        const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
        let width = 0
        let height = 0
        let nodes: Node[] = []

        // Pointer parallax (eased).
        const pointer = { x: 0, y: 0 }
        const eased = { x: 0, y: 0 }

        // Cursor pixel position for live interaction (eased).
        const mouse = { x: -9999, y: -9999, active: false }
        const mouseEased = { x: -9999, y: -9999 }

        const buildNodes = () => {
            // Density relative to area, gently capped for performance.
            const target = Math.round((width * height) / 22000)
            const count = Math.max(34, Math.min(86, target))
            nodes = Array.from({ length: count }, () => {
                const depth = Math.random()
                return {
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.22,
                    vy: (Math.random() - 0.5) * 0.22,
                    depth,
                    hue: Math.random(),
                    pulse: Math.random() * Math.PI * 2,
                }
            })
        }

        const resize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = Math.floor(width * dpr)
            canvas.height = Math.floor(height * dpr)
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            buildNodes()
        }
        resize()
        window.addEventListener('resize', resize)

        const onPointer = (e: PointerEvent) => {
            pointer.x = (e.clientX / width - 0.5) * 2
            pointer.y = (e.clientY / height - 0.5) * 2
            mouse.x = e.clientX
            mouse.y = e.clientY
            mouse.active = true
        }
        window.addEventListener('pointermove', onPointer)

        const onLeave = (e: PointerEvent) => {
            // Only deactivate when the pointer actually leaves the window,
            // not when moving between elements (pointerout bubbles).
            if (!e.relatedTarget) mouse.active = false
        }
        window.addEventListener('pointerout', onLeave)

        // Link distance threshold (squared for cheap comparison).
        const LINK = 168
        const LINK_SQ = LINK * LINK

        // Cursor interaction radius — the "reach" of the live network.
        const CURSOR = 230
        const CURSOR_SQ = CURSOR * CURSOR

        const draw = (time: number) => {
            // Ease pointer toward target for buttery parallax.
            eased.x += (pointer.x - eased.x) * 0.04
            eased.y += (pointer.y - eased.y) * 0.04

            // Ease the cursor's pixel position for smooth interaction.
            mouseEased.x += (mouse.x - mouseEased.x) * 0.12
            mouseEased.y += (mouse.y - mouseEased.y) * 0.12
            const mActive = mouse.active
            const mx = mouseEased.x
            const my = mouseEased.y

            ctx.clearRect(0, 0, width, height)

            // Precompute parallax-projected positions, with a gentle pull
            // of nearby nodes toward the cursor (purely visual / stable).
            const px: number[] = new Array(nodes.length)
            const py: number[] = new Array(nodes.length)
            const boost: number[] = new Array(nodes.length)
            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i]
                const shift = 8 + n.depth * 26
                let x = n.x + eased.x * shift
                let y = n.y + eased.y * shift
                let b = 0
                if (mActive) {
                    const ddx = mx - x
                    const ddy = my - y
                    const dsq = ddx * ddx + ddy * ddy
                    if (dsq < CURSOR_SQ) {
                        const prox = 1 - Math.sqrt(dsq) / CURSOR
                        // Pull up to ~16px toward cursor, scaled by proximity.
                        const pull = prox * prox * 16
                        const inv = 1 / (Math.sqrt(dsq) + 0.001)
                        x += ddx * inv * pull
                        y += ddy * inv * pull
                        b = prox
                    }
                }
                px[i] = x
                py[i] = y
                boost[i] = b
            }

            // Links first (under nodes).
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = px[i] - px[j]
                    const dy = py[i] - py[j]
                    const dsq = dx * dx + dy * dy
                    if (dsq > LINK_SQ) continue
                    const t = 1 - dsq / LINK_SQ
                    // Faint links — depth-weighted, brightened near cursor.
                    const depth = (nodes[i].depth + nodes[j].depth) * 0.5
                    const near = (boost[i] + boost[j]) * 0.5
                    const alpha = t * t * (0.07 + depth * 0.11) + near * t * 0.22
                    if (alpha < 0.004) continue
                    const c = mix(VIOLET, CYAN, (nodes[i].hue + nodes[j].hue) * 0.5)
                    ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha})`
                    ctx.lineWidth = 0.6 + depth * 0.5 + near * 0.8
                    ctx.beginPath()
                    ctx.moveTo(px[i], py[i])
                    ctx.lineTo(px[j], py[j])
                    ctx.stroke()
                }
            }

            // Cursor links — glowing filaments from the pointer to nearby
            // nodes, so the network visibly reaches toward the visitor.
            if (mActive) {
                for (let i = 0; i < nodes.length; i++) {
                    if (boost[i] <= 0) continue
                    const prox = boost[i]
                    const c = mix(VIOLET, CYAN, nodes[i].hue)
                    ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${prox * prox * 0.5})`
                    ctx.lineWidth = 0.6 + prox * 1.1
                    ctx.beginPath()
                    ctx.moveTo(mx, my)
                    ctx.lineTo(px[i], py[i])
                    ctx.stroke()
                }

                // Soft aura at the cursor.
                const aura = ctx.createRadialGradient(mx, my, 0, mx, my, 90)
                aura.addColorStop(0, 'rgba(124,58,237,0.10)')
                aura.addColorStop(0.5, 'rgba(6,182,212,0.05)')
                aura.addColorStop(1, 'rgba(6,182,212,0)')
                ctx.fillStyle = aura
                ctx.beginPath()
                ctx.arc(mx, my, 90, 0, Math.PI * 2)
                ctx.fill()
            }

            // Nodes on top — small, soft, low brightness (brighter near cursor).
            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i]
                const breathe = 0.75 + 0.25 * Math.sin(time * 0.0009 + n.pulse)
                const nb = boost[i]
                const r = (0.8 + n.depth * 1.9) * breathe * (1 + nb * 1.2)
                const alpha = (0.14 + n.depth * 0.34) * breathe + nb * 0.4
                const c = mix(VIOLET, CYAN, n.hue)
                // Soft halo.
                const grad = ctx.createRadialGradient(px[i], py[i], 0, px[i], py[i], r * 4)
                grad.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${alpha})`)
                grad.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`)
                ctx.fillStyle = grad
                ctx.beginPath()
                ctx.arc(px[i], py[i], r * 4, 0, Math.PI * 2)
                ctx.fill()
                // Crisp core.
                ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${Math.min(alpha * 1.6, 0.65)})`
                ctx.beginPath()
                ctx.arc(px[i], py[i], r, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        const step = (n: Node) => {
            n.x += n.vx
            n.y += n.vy
            // Wrap softly across edges with a margin.
            const m = 40
            if (n.x < -m) n.x = width + m
            if (n.x > width + m) n.x = -m
            if (n.y < -m) n.y = height + m
            if (n.y > height + m) n.y = -m
        }

        let raf = 0
        let visible = true

        const render = (now: number) => {
            if (!visible) return
            for (let i = 0; i < nodes.length; i++) step(nodes[i])
            draw(now)
            raf = requestAnimationFrame(render)
        }

        const onVisibility = () => {
            visible = document.visibilityState === 'visible'
            if (visible && !reduced) raf = requestAnimationFrame(render)
        }
        document.addEventListener('visibilitychange', onVisibility)

        if (reduced) {
            draw(0)
        } else {
            raf = requestAnimationFrame(render)
        }

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', resize)
            window.removeEventListener('pointermove', onPointer)
            window.removeEventListener('pointerout', onLeave)
            document.removeEventListener('visibilitychange', onVisibility)
        }
    }, [reduced])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            aria-hidden="true"
            style={{ display: 'block' }}
        />
    )
}
