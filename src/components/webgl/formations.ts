/* ==========================================================
 * FORMATIONS.TS — particle target shapes for each act
 * The single ParticleField morphs between these targets as the
 * visitor scrolls: constellation → clusters → stream → curve →
 * lattice → path → branches → converge. All positions are in
 * world units, sized against the visible plane at z = 0.
 * ========================================================== */

export type FormationId =
    | 'constellation'
    | 'clusters'
    | 'stream'
    | 'curve'
    | 'lattice'
    | 'path'
    | 'branches'
    | 'converge'

/** Homepage section id → formation the field morphs into. */
export const SECTION_FORMATION: Record<string, FormationId> = {
    hero: 'constellation',
    about: 'clusters',
    work: 'stream',
    proof: 'curve',
    'how-i-work': 'lattice',
    education: 'path',
    opportunities: 'branches',
    contact: 'converge',
}

/** Per-formation rendering character. */
export const FORMATION_STYLE: Record<
    FormationId,
    { linkDist: number; maxLinks: number; lineOpacity: number; wobble: number }
> = {
    constellation: { linkDist: 2.3, maxLinks: 520, lineOpacity: 0.16, wobble: 0.45 },
    clusters: { linkDist: 1.7, maxLinks: 360, lineOpacity: 0.12, wobble: 0.3 },
    stream: { linkDist: 1.6, maxLinks: 260, lineOpacity: 0.08, wobble: 0.55 },
    curve: { linkDist: 1.8, maxLinks: 300, lineOpacity: 0.1, wobble: 0.3 },
    lattice: { linkDist: 2.1, maxLinks: 420, lineOpacity: 0.13, wobble: 0.25 },
    path: { linkDist: 1.9, maxLinks: 280, lineOpacity: 0.11, wobble: 0.3 },
    branches: { linkDist: 1.9, maxLinks: 320, lineOpacity: 0.12, wobble: 0.3 },
    converge: { linkDist: 1.5, maxLinks: 380, lineOpacity: 0.14, wobble: 0.2 },
}

const rand = (a: number, b: number) => a + Math.random() * (b - a)

/** Gaussian-ish sample via central limit (cheap, good enough). */
const gauss = () =>
    (Math.random() + Math.random() + Math.random() + Math.random() - 2) / 2

/**
 * Build the target position array for a formation.
 * `w`/`h` are the world-space width/height visible at z = 0.
 */
export function buildFormation(
    id: FormationId,
    count: number,
    w: number,
    h: number
): Float32Array {
    const out = new Float32Array(count * 3)
    const set = (i: number, x: number, y: number, z: number) => {
        out[i * 3] = x
        out[i * 3 + 1] = y
        out[i * 3 + 2] = z
    }

    switch (id) {
        /* Wide organic cloud — the "night sky network" behind the hero.
           Mostly uniform spread with a light gaussian overlay so the
           center doesn't clump behind the headline. */
        case 'constellation': {
            for (let i = 0; i < count; i++) {
                const ux = rand(-0.62, 0.62) * w
                const uy = rand(-0.56, 0.56) * h
                set(
                    i,
                    ux + gauss() * w * 0.06,
                    uy + gauss() * h * 0.06,
                    rand(-4, 3)
                )
            }
            break
        }

        /* Three loose semantic clusters — learned features. */
        case 'clusters': {
            const centers = [
                [-w * 0.28, h * 0.16],
                [w * 0.3, h * 0.05],
                [0.0, -h * 0.28],
            ]
            for (let i = 0; i < count; i++) {
                const c = centers[i % centers.length]
                set(
                    i,
                    c[0] + gauss() * w * 0.13,
                    c[1] + gauss() * h * 0.15,
                    rand(-3, 2)
                )
            }
            break
        }

        /* Horizontal data lanes — flow behind the work gallery. */
        case 'stream': {
            const lanes = 7
            for (let i = 0; i < count; i++) {
                const lane = i % lanes
                const laneY = (lane / (lanes - 1) - 0.5) * h * 0.85
                set(
                    i,
                    rand(-0.62, 0.62) * w,
                    laneY + gauss() * h * 0.03,
                    rand(-4, 1)
                )
            }
            break
        }

        /* Converging loss curve — high noisy left, settling right. */
        case 'curve': {
            for (let i = 0; i < count; i++) {
                const t = Math.random() // 0 left → 1 right
                const x = (t - 0.5) * w * 1.1
                const curveY = h * (0.32 * Math.exp(-2.6 * t) - 0.18)
                const noise = (1 - t) * (1 - t) * h * 0.3 + h * 0.015
                set(i, x, curveY + gauss() * noise, rand(-3, 1))
            }
            break
        }

        /* Loose embedding lattice — a tilted 3D grid with jitter. */
        case 'lattice': {
            const cols = Math.ceil(Math.sqrt(count / 3))
            const rows = Math.ceil(count / (cols * 3))
            let i = 0
            for (let layer = 0; layer < 3 && i < count; layer++) {
                for (let r = 0; r < rows && i < count; r++) {
                    for (let c = 0; c < cols && i < count; c++) {
                        const x = ((c / (cols - 1) - 0.5) * w * 0.92) + gauss() * 0.3
                        const y = ((r / (rows - 1) - 0.5) * h * 0.8) + gauss() * 0.3
                        set(i, x, y, -1 - layer * 2 + gauss() * 0.4)
                        i++
                    }
                }
            }
            break
        }

        /* Serpentine vertical path — the backprop signal route. */
        case 'path': {
            for (let i = 0; i < count; i++) {
                const t = i / count
                const y = (0.5 - t) * h * 1.05
                const x = Math.sin(t * Math.PI * 2.2) * w * 0.22
                set(
                    i,
                    x + gauss() * w * 0.05,
                    y + gauss() * h * 0.02,
                    rand(-3, 1)
                )
            }
            break
        }

        /* One trunk splitting into three routes — decision paths. */
        case 'branches': {
            const angles = [0.55, 0, -0.55] // radians from horizontal
            for (let i = 0; i < count; i++) {
                if (i % 4 === 0) {
                    // trunk (left side, feeding in)
                    const t = Math.random()
                    set(
                        i,
                        -w * 0.45 + t * w * 0.25,
                        gauss() * h * 0.04,
                        rand(-2, 1)
                    )
                } else {
                    const a = angles[i % 3]
                    const t = Math.random()
                    const len = w * 0.55
                    set(
                        i,
                        -w * 0.2 + Math.cos(a) * t * len,
                        Math.sin(a) * t * len * (h / w) * 1.6 + gauss() * 0.25,
                        rand(-2, 1)
                    )
                }
            }
            break
        }

        /* Everything collapses toward one bright node — the output. */
        case 'converge': {
            for (let i = 0; i < count; i++) {
                if (i % 6 === 0) {
                    // wide faint halo of stragglers still arriving
                    set(i, gauss() * w * 0.5, gauss() * h * 0.45, rand(-4, 2))
                } else {
                    // dense core, slightly above center (behind the CTA)
                    const r = Math.abs(gauss()) * h * 0.16
                    const a = rand(0, Math.PI * 2)
                    set(
                        i,
                        Math.cos(a) * r,
                        Math.sin(a) * r * 0.75 + h * 0.05,
                        rand(-2, 2)
                    )
                }
            }
            break
        }
    }

    return out
}

/**
 * Compute link pairs (indices) between nearby particles of a
 * formation using a spatial hash — O(n) instead of O(n²).
 * Returns a flat [a0, b0, a1, b1, ...] index array.
 */
export function buildLinks(
    targets: Float32Array,
    count: number,
    linkDist: number,
    maxLinks: number
): Uint16Array<ArrayBuffer> {
    const cell = linkDist
    const grid = new Map<string, number[]>()
    const key = (cx: number, cy: number) => `${cx},${cy}`

    for (let i = 0; i < count; i++) {
        const cx = Math.floor(targets[i * 3] / cell)
        const cy = Math.floor(targets[i * 3 + 1] / cell)
        const k = key(cx, cy)
        let bucket = grid.get(k)
        if (!bucket) {
            bucket = []
            grid.set(k, bucket)
        }
        bucket.push(i)
    }

    const pairs: number[] = []
    const distSq = linkDist * linkDist
    // Cap per-particle degree so dense pockets don't become
    // "dandelion" hubs that eat the whole link budget.
    const degree = new Uint8Array(count)
    const MAX_DEGREE = 3

    outer: for (let i = 0; i < count; i++) {
        if (degree[i] >= MAX_DEGREE) continue
        const x = targets[i * 3]
        const y = targets[i * 3 + 1]
        const z = targets[i * 3 + 2]
        const cx = Math.floor(x / cell)
        const cy = Math.floor(y / cell)
        for (let gx = cx - 1; gx <= cx + 1; gx++) {
            for (let gy = cy - 1; gy <= cy + 1; gy++) {
                const bucket = grid.get(key(gx, gy))
                if (!bucket) continue
                for (const j of bucket) {
                    if (j <= i || degree[j] >= MAX_DEGREE) continue
                    const dx = targets[j * 3] - x
                    const dy = targets[j * 3 + 1] - y
                    const dz = targets[j * 3 + 2] - z
                    // true 3D distance — depth-separated particles look
                    // far apart on screen and make ugly long streaks
                    if (dx * dx + dy * dy + dz * dz < distSq) {
                        pairs.push(i, j)
                        degree[i]++
                        degree[j]++
                        if (pairs.length >= maxLinks * 2) break outer
                        if (degree[i] >= MAX_DEGREE) break
                    }
                }
            }
        }
    }

    return new Uint16Array(pairs)
}
