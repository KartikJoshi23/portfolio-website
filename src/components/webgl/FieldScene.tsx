/* ==========================================================
 * FIELDSCENE.TSX — the persistent fullscreen WebGL canvas
 * Fixed behind all content (z-0), pointer-events none. Pauses
 * the frameloop when the tab is hidden. Dynamically imported
 * by CanvasRoot so three.js never blocks first paint.
 * ========================================================== */
"use client"

import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import ParticleField from './ParticleField'
import PerfGovernor from './PerfGovernor'

interface FieldSceneProps {
    tier: 'mid' | 'high'
    onDegrade: () => void
}

export default function FieldScene({ tier, onDegrade }: FieldSceneProps) {
    const [frameloop, setFrameloop] = useState<'always' | 'never'>('always')

    useEffect(() => {
        const onVisibility = () => {
            setFrameloop(document.visibilityState === 'visible' ? 'always' : 'never')
        }
        document.addEventListener('visibilitychange', onVisibility)
        return () => document.removeEventListener('visibilitychange', onVisibility)
    }, [])

    return (
        <div
            className="fixed inset-0 z-0 pointer-events-none"
            aria-hidden="true"
        >
            <Canvas
                frameloop={frameloop}
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 16], fov: 50, near: 0.1, far: 60 }}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                // No R3F pointer events needed — the field tracks the
                // cursor itself via window listeners.
                events={undefined}
            >
                <ParticleField tier={tier} />
                <PerfGovernor onDegrade={onDegrade} />
            </Canvas>
        </div>
    )
}
