/* ==========================================================
 * CANVASROOT.TSX — quality gate for the WebGL layer
 * high/mid tier → dynamic-import the R3F FieldScene (ssr off,
 * code-split so three.js never blocks LCP).
 * low tier / reduced motion → a static ambient gradient that
 * echoes the constellation look at zero cost.
 * The PerfGovernor can also step quality down at runtime if
 * the device can't actually hold the frame rate.
 * ========================================================== */
"use client"

import { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import { useDeviceTier, type DeviceTier } from '@/hooks/useDeviceTier'

const FieldScene = dynamic(() => import('./FieldScene'), {
    ssr: false,
})

/** Static fallback: layered radial glows, no animation. */
function StaticField() {
    return (
        <div
            className="fixed inset-0 z-0 pointer-events-none"
            aria-hidden="true"
            style={{
                background: [
                    'radial-gradient(ellipse 45% 35% at 28% 30%, rgba(124,58,237,0.10) 0%, transparent 70%)',
                    'radial-gradient(ellipse 40% 30% at 72% 60%, rgba(6,182,212,0.07) 0%, transparent 70%)',
                    'radial-gradient(ellipse 55% 45% at 50% 85%, rgba(124,58,237,0.05) 0%, transparent 70%)',
                ].join(', '),
            }}
        />
    )
}

export default function CanvasRoot() {
    const probed = useDeviceTier()
    const [override, setOverride] = useState<DeviceTier | null>(null)
    const tier = override ?? probed

    const degrade = useCallback(() => {
        setOverride((prev) => {
            const current = prev ?? probed
            return current === 'high' ? 'mid' : 'low'
        })
    }, [probed])

    if (tier === 'low') return <StaticField />
    return <FieldScene tier={tier} onDegrade={degrade} />
}
