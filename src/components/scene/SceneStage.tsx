/* ==========================================================
 * SCENESTAGE.TSX — the photographic world behind the network
 * A fixed full-viewport layer (below the particle field) that
 * crossfades between palette-graded real-world scenes as the
 * visitor crosses act boundaries:
 *   hero → Dubai dusk · about → dark code · proof → stadium
 *   streaks · skills → milky way · education → dark facade ·
 *   contact → dawn horizon. Work/routing acts go near-black so
 *   the content owns those moments.
 *
 * - Crossfade + scale settle are pure CSS transitions.
 * - Slow scroll parallax (±3%) via direct style writes.
 * - Hero scene gets a gentle dolly-in as the hero scrolls out.
 * - Low tier / reduced motion → single static hero scene.
 * ========================================================== */
"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import { useDeviceTier } from '@/hooks/useDeviceTier'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/* The preloader sets window.__fpIgnited then fires fp:ignite. */
function subscribeIgnite(callback: () => void) {
    window.addEventListener('fp:ignite', callback)
    return () => window.removeEventListener('fp:ignite', callback)
}

interface Scene {
    src: string
    /** final resting opacity when active */
    opacity: number
    objectPosition?: string
    /** brighter grade + lighter veil — for scenes that should be FELT */
    bright?: boolean
}

/** Unique scenes (some acts share, some have none). */
const SCENES: Record<string, Scene> = {
    // The skyline is the opening statement — brighter, skyline band
    // lifted up the viewport, and a much lighter veil.
    hero: { src: '/scenes/hero.jpg', opacity: 0.62, objectPosition: 'center bottom', bright: true },
    about: { src: '/scenes/about.jpg', opacity: 0.2 },
    proof: { src: '/scenes/proof.jpg', opacity: 0.32 },
    skills: { src: '/scenes/skills.jpg', opacity: 0.34 },
    education: { src: '/scenes/education.jpg', opacity: 0.24 },
    dawn: { src: '/scenes/dawn.jpg', opacity: 0.28, objectPosition: 'center 30%', bright: true },
}

/** Act (section id) → scene key, in page order. null = near-black. */
const ACT_SCENE: [string, string | null][] = [
    ['hero', 'hero'],
    ['about', 'about'],
    ['interlude-dubai', null], // interlude owns its own image
    ['work', null],
    ['proof', 'proof'],
    ['how-i-work', 'skills'],
    ['education', 'education'],
    ['opportunities', null],
    ['interlude-dawn', null],
    ['contact', 'dawn'],
]

export default function SceneStage() {
    const tier = useDeviceTier()
    const reduced = useReducedMotion()
    const staticOnly = tier === 'low' || reduced

    const [active, setActive] = useState<string | null>('hero')
    // Non-hero scenes mount after the preloader lifts, keeping their
    // image fetches off the critical path (hero alone is priority).
    const ignited = useSyncExternalStore(
        subscribeIgnite,
        () => Boolean((window as unknown as Record<string, unknown>).__fpIgnited),
        () => false
    )
    const rootRef = useRef<HTMLDivElement>(null)

    /* Track which act owns the viewport center + its progress. */
    useEffect(() => {
        if (staticOnly) return

        let raf = 0
        let queued = false

        const update = () => {
            queued = false
            const center = window.innerHeight / 2
            let currentScene: string | null | undefined
            let progress = 0.5

            for (const [actId, sceneKey] of ACT_SCENE) {
                const el = document.getElementById(actId)
                if (!el) continue
                const rect = el.getBoundingClientRect()
                if (rect.top <= center && rect.bottom >= center) {
                    currentScene = sceneKey
                    progress = (center - rect.top) / Math.max(rect.height, 1)
                    break
                }
            }

            if (currentScene !== undefined) {
                setActive((prev) => (prev === currentScene ? prev : currentScene))
            }

            // Parallax + hero dolly: write transforms directly (no re-render).
            const root = rootRef.current
            if (root && currentScene) {
                const img = root.querySelector<HTMLElement>(
                    `[data-scene="${currentScene}"] .scene-parallax`
                )
                if (img) {
                    const y = (progress - 0.5) * 5 // ±2.5%
                    const dolly =
                        currentScene === 'hero' ? 1 + progress * 0.07 : 1
                    img.style.transform = `translateY(${y}%) scale(${dolly})`
                }
            }
        }

        const onScroll = () => {
            if (!queued) {
                queued = true
                raf = requestAnimationFrame(update)
            }
        }

        update()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
        }
    }, [staticOnly])

    /* Low tier / reduced motion: one calm static scene. */
    if (staticOnly) {
        return (
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="scene-layer absolute inset-0" style={{ opacity: 0.42 }}>
                    <Image
                        src={SCENES.hero.src}
                        alt=""
                        fill
                        sizes="100vw"
                        quality={70}
                        className="scene-img-bright object-cover"
                        style={{ objectPosition: SCENES.hero.objectPosition }}
                    />
                    <div className="scene-duotone absolute inset-0" />
                    <div className="scene-veil-light absolute inset-0" />
                </div>
                <div className="scene-vignette absolute inset-0" />
            </div>
        )
    }

    return (
        <div
            ref={rootRef}
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
            aria-hidden="true"
        >
            {Object.entries(SCENES).map(([key, scene]) => {
                const isActive = active === key
                return (
                    <div
                        key={key}
                        data-scene={key}
                        className="scene-layer absolute inset-0"
                        style={{
                            opacity: isActive ? scene.opacity : 0,
                            // Inactive scenes wait slightly zoomed; becoming
                            // active settles them to 1 — the "scale settle".
                            scale: isActive ? '1' : '1.05',
                        }}
                    >
                        {/* Inner wrapper takes the scroll parallax transform */}
                        <div className="scene-parallax absolute -inset-[4%]">
                            {(key === 'hero' || ignited) && (
                                <Image
                                    src={scene.src}
                                    alt=""
                                    fill
                                    sizes="100vw"
                                    quality={70}
                                    priority={key === 'hero'}
                                    className={`object-cover ${
                                        scene.bright ? 'scene-img-bright' : 'scene-img'
                                    }`}
                                    style={{ objectPosition: scene.objectPosition }}
                                />
                            )}
                        </div>
                        <div className="scene-duotone absolute inset-0" />
                        <div
                            className={`absolute inset-0 ${
                                scene.bright ? 'scene-veil-light' : 'scene-veil'
                            }`}
                        />
                    </div>
                )
            })}
            {/* Global vignette keeps edges obsidian at all times */}
            <div className="scene-vignette absolute inset-0" />
        </div>
    )
}
