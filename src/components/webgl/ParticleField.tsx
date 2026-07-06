/* ==========================================================
 * PARTICLEFIELD.TSX — the connective tissue of the site
 * One instanced particle system that morphs between per-act
 * formations as the visitor scrolls (constellation → clusters →
 * stream → curve → lattice → path → branches → converge), with
 * link lines rebuilt per formation and a cursor "signal probe"
 * that charges nearby particles.
 *
 * All movement is springy CPU lerp toward target buffers —
 * cheap (≤2.4k particles), organic, and scroll-independent so
 * it never fights ScrollTrigger.
 * ========================================================== */
"use client"

import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import {
    SECTION_FORMATION,
    FORMATION_STYLE,
    buildFormation,
    buildLinks,
    type FormationId,
} from './formations'

const VIOLET = new THREE.Color('#7C3AED')
const CYAN = new THREE.Color('#06B6D4')
const BRIGHT = new THREE.Color('#B794F6')

const POINT_VERT = /* glsl */ `
    attribute float aSize;
    attribute float aHue;
    attribute float aBoost;
    uniform float uPixelRatio;
    varying float vHue;
    varying float vBoost;

    void main() {
        vHue = aHue;
        vBoost = aBoost;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aSize * uPixelRatio * (1.0 + aBoost * 1.4) * (18.0 / -mv.z);
    }
`

const POINT_FRAG = /* glsl */ `
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorBright;
    uniform float uOpacity;
    varying float vHue;
    varying float vBoost;

    void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;
        if (d > 1.0) discard;
        // soft core with a wide faint halo
        float core = smoothstep(0.6, 0.0, d);
        float halo = (1.0 - d) * (1.0 - d) * 0.35;
        float a = (core * 0.85 + halo) * uOpacity * (0.55 + vBoost * 0.9);
        vec3 col = mix(uColorA, uColorB, vHue);
        col = mix(col, uColorBright, vBoost * 0.8);
        gl_FragColor = vec4(col, a);
    }
`

interface ParticleFieldProps {
    tier: 'mid' | 'high'
}

export default function ParticleField({ tier }: ParticleFieldProps) {
    const { viewport, gl } = useThree()
    const count = tier === 'high' ? 2400 : 1300

    const pointsRef = useRef<THREE.Points>(null)
    const linesRef = useRef<THREE.LineSegments>(null)
    const lineMatRef = useRef<THREE.LineBasicMaterial>(null)

    // Mutable simulation state (never triggers re-render).
    const sim = useRef({
        positions: null as Float32Array | null,
        targets: null as Float32Array | null,
        boost: null as Float32Array | null,
        phase: null as Float32Array | null,
        pairs: new Uint16Array(0),
        formation: 'converge' as FormationId, // pre-ignite: held at center
        ignited: false,
        velEnergy: 0, // eased scroll-velocity energy (0..1)
        lineOpacity: 0,
        lineOpacityTarget: 0,
        pointer: { x: 0, y: 0, active: false },
        w: 0,
        h: 0,
    })

    const maxLinks = tier === 'high' ? 520 : 320

    /* --- static attribute data --- */
    const { hues, sizes, phases } = useMemo(() => {
        const hues = new Float32Array(count)
        const sizes = new Float32Array(count)
        const phases = new Float32Array(count)
        for (let i = 0; i < count; i++) {
            hues[i] = Math.random()
            sizes[i] = 1.1 + Math.random() * 1.9
            phases[i] = Math.random() * Math.PI * 2
        }
        return { hues, sizes, phases }
    }, [count])

    const pointUniforms = useMemo(
        () => ({
            uPixelRatio: { value: Math.min(gl.getPixelRatio(), 1.5) },
            uColorA: { value: VIOLET },
            uColorB: { value: CYAN },
            uColorBright: { value: BRIGHT },
            uOpacity: { value: 0.85 },
        }),
        [gl]
    )

    /* --- (re)build targets + links for a formation --- */
    const applyFormation = (id: FormationId) => {
        const s = sim.current
        const style = FORMATION_STYLE[id]
        s.formation = id
        s.targets = buildFormation(id, count, s.w, s.h)
        s.pairs = buildLinks(s.targets, count, style.linkDist, Math.min(style.maxLinks, maxLinks))
        s.lineOpacityTarget = style.lineOpacity

        // Color the link segments from their endpoint hues.
        const lines = linesRef.current
        if (lines) {
            const colAttr = lines.geometry.getAttribute('color') as THREE.BufferAttribute
            const tmp = new THREE.Color()
            for (let p = 0; p < s.pairs.length; p++) {
                tmp.copy(VIOLET).lerp(CYAN, hues[s.pairs[p]])
                colAttr.setXYZ(p, tmp.r, tmp.g, tmp.b)
            }
            colAttr.needsUpdate = true
            lines.geometry.setDrawRange(0, s.pairs.length)
        }
    }

    /* --- init sim + resize handling --- */
    useEffect(() => {
        const s = sim.current
        s.w = viewport.width
        s.h = viewport.height
        s.boost = new Float32Array(count)
        s.phase = phases

        if (!s.positions) {
            // Birth: everything packed at the center, ready to bloom.
            const pos = new Float32Array(count * 3)
            for (let i = 0; i < count; i++) {
                pos[i * 3] = (Math.random() - 0.5) * 0.6
                pos[i * 3 + 1] = (Math.random() - 0.5) * 0.6
                pos[i * 3 + 2] = (Math.random() - 0.5) * 0.6
            }
            s.positions = pos
        }

        applyFormation(s.ignited ? s.formation : 'converge')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewport.width, viewport.height, count])

    /* --- ignite: preloader done → bloom into the page formations --- */
    useEffect(() => {
        const s = sim.current

        const resolveSection = () => {
            const center = window.innerHeight / 2
            let active: FormationId = 'constellation'
            for (const [id, formation] of Object.entries(SECTION_FORMATION)) {
                const el = document.getElementById(id)
                if (!el) continue
                const rect = el.getBoundingClientRect()
                if (rect.top <= center && rect.bottom >= center) {
                    active = formation
                    break
                }
            }
            if (active !== s.formation) applyFormation(active)
        }

        const onScroll = () => {
            if (s.ignited) resolveSection()
        }

        const ignite = () => {
            s.ignited = true
            resolveSection()
        }
        // If the preloader already fired (fast remounts), ignite now.
        if ((window as unknown as Record<string, unknown>).__fpIgnited) {
            ignite()
        }

        window.addEventListener('fp:ignite', ignite)
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        return () => {
            window.removeEventListener('fp:ignite', ignite)
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /* --- pointer (tracked manually; canvas has pointer-events none) --- */
    useEffect(() => {
        const s = sim.current
        const onMove = (e: PointerEvent) => {
            s.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
            s.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
            s.pointer.active = true
        }
        const onLeave = (e: PointerEvent) => {
            if (!e.relatedTarget) s.pointer.active = false
        }
        window.addEventListener('pointermove', onMove, { passive: true })
        window.addEventListener('pointerout', onLeave)
        return () => {
            window.removeEventListener('pointermove', onMove)
            window.removeEventListener('pointerout', onLeave)
        }
    }, [])

    /* --- per-frame simulation --- */
    useFrame((state) => {
        const s = sim.current
        const points = pointsRef.current
        const lines = linesRef.current
        if (!points || !lines || !s.positions || !s.targets || !s.boost || !s.phase) return

        const time = state.clock.elapsedTime

        // Scroll velocity → the network "streams" while you move fast.
        const rawVel = Math.abs(
            ((window as unknown as Record<string, unknown>).__scrollVelocity as number) ?? 0
        )
        const velTarget = Math.min(rawVel / 60, 1)
        s.velEnergy += (velTarget - s.velEnergy) * 0.05

        const style = FORMATION_STYLE[s.formation]
        const wobble = (s.ignited ? style.wobble : 0.05) * (1 + s.velEnergy * 0.9)

        // Project the pointer onto the z=0 plane for the signal probe.
        const cam = state.camera
        let cx = 0
        let cy = 0
        if (s.pointer.active) {
            const v = new THREE.Vector3(s.pointer.x, s.pointer.y, 0.5).unproject(cam)
            const dir = v.sub(cam.position).normalize()
            const t = -cam.position.z / dir.z
            cx = cam.position.x + dir.x * t
            cy = cam.position.y + dir.y * t
        }
        const probeR = 3.2
        const probeRSq = probeR * probeR

        const pos = s.positions
        const tgt = s.targets
        const k = (s.ignited ? 0.045 : 0.08) * (1 + s.velEnergy * 0.5)

        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            const ph = s.phase[i]
            // springy pursuit of the formation target + gentle breathing
            const wx = Math.sin(time * 0.35 + ph) * wobble
            const wy = Math.cos(time * 0.28 + ph * 1.7) * wobble * 0.8
            pos[i3] += (tgt[i3] + wx - pos[i3]) * k
            pos[i3 + 1] += (tgt[i3 + 1] + wy - pos[i3 + 1]) * k
            pos[i3 + 2] += (tgt[i3 + 2] - pos[i3 + 2]) * k

            // cursor probe: charge + slight attraction
            let b = s.boost[i]
            if (s.pointer.active) {
                const dx = cx - pos[i3]
                const dy = cy - pos[i3 + 1]
                const dSq = dx * dx + dy * dy
                if (dSq < probeRSq) {
                    const prox = 1 - Math.sqrt(dSq) / probeR
                    b = Math.max(b, prox)
                    const pull = prox * prox * 0.06
                    pos[i3] += dx * pull
                    pos[i3 + 1] += dy * pull
                }
            }
            s.boost[i] = b * 0.92 // decay
        }

        const posAttr = points.geometry.getAttribute('position') as THREE.BufferAttribute
        ;(posAttr.array as Float32Array).set(pos)
        posAttr.needsUpdate = true

        const boostAttr = points.geometry.getAttribute('aBoost') as THREE.BufferAttribute
        ;(boostAttr.array as Float32Array).set(s.boost)
        boostAttr.needsUpdate = true

        // Update link endpoints from live particle positions.
        const linePos = lines.geometry.getAttribute('position') as THREE.BufferAttribute
        const lp = linePos.array as Float32Array
        for (let p = 0; p < s.pairs.length; p++) {
            const pi = s.pairs[p] * 3
            lp[p * 3] = pos[pi]
            lp[p * 3 + 1] = pos[pi + 1]
            lp[p * 3 + 2] = pos[pi + 2]
        }
        linePos.needsUpdate = true

        // Ease line opacity toward the formation's target.
        s.lineOpacity += (s.lineOpacityTarget - s.lineOpacity) * 0.04
        if (lineMatRef.current) lineMatRef.current.opacity = s.lineOpacity
    })

    /* --- geometry buffers (allocated once per count) --- */
    const pointGeo = useMemo(() => {
        const g = new THREE.BufferGeometry()
        g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3))
        g.setAttribute('aHue', new THREE.BufferAttribute(hues, 1))
        g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
        g.setAttribute('aBoost', new THREE.BufferAttribute(new Float32Array(count), 1))
        // Particles roam the whole screen; skip per-frame culling math.
        g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 100)
        return g
    }, [count, hues, sizes])

    const lineGeo = useMemo(() => {
        const g = new THREE.BufferGeometry()
        const maxVerts = maxLinks * 2
        g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(maxVerts * 3), 3))
        g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(maxVerts * 3), 3))
        g.setDrawRange(0, 0)
        g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 100)
        return g
    }, [maxLinks])

    return (
        <group>
            <lineSegments ref={linesRef} geometry={lineGeo} frustumCulled={false}>
                <lineBasicMaterial
                    ref={lineMatRef}
                    vertexColors
                    transparent
                    opacity={0}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </lineSegments>
            <points ref={pointsRef} geometry={pointGeo} frustumCulled={false}>
                <shaderMaterial
                    vertexShader={POINT_VERT}
                    fragmentShader={POINT_FRAG}
                    uniforms={pointUniforms}
                    transparent
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>
        </group>
    )
}
