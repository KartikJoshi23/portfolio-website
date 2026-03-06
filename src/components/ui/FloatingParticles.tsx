/* ==========================================================
 * FLOATINGPARTICLES.TSX — Ambient floating orbs
 * Very transparent, subtle violet/cyan/white orbs
 * GPU-accelerated CSS animations. Desktop only.
 * ========================================================== */
"use client"

import { useEffect, useState } from 'react'

interface Particle {
    id: number
    size: number
    x: number
    y: number
    duration: number
    delay: number
    opacity: number
    color: 'violet' | 'white' | 'cyan'
}

function generateParticles(count: number): Particle[] {
    return Array.from({ length: count }, (_, i) => {
        const colors: Particle['color'][] = ['violet', 'white', 'cyan']
        return {
            id: i,
            size: Math.random() * 200 + 60,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 25 + 20,
            delay: Math.random() * -30,
            opacity: Math.random() * 0.04 + 0.015,
            color: colors[Math.floor(Math.random() * colors.length)],
        }
    })
}

const colorMap = {
    violet: 'rgba(124, 58, 237,',
    white: 'rgba(240, 240, 243,',
    cyan: 'rgba(6, 182, 212,',
}

export default function FloatingParticles() {
    const [particles, setParticles] = useState<Particle[]>([])
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 768)
        check()
        window.addEventListener('resize', check)

        // Generate particles on client only
        setParticles(generateParticles(14))

        return () => window.removeEventListener('resize', check)
    }, [])

    if (!isDesktop) return null

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
            {particles.map((p) => {
                const animClass =
                    p.id % 3 === 0
                        ? 'animate-float-slow'
                        : p.id % 3 === 1
                            ? 'animate-float-medium'
                            : 'animate-float-reverse'

                return (
                    <div
                        key={p.id}
                        className={`absolute rounded-full ${animClass}`}
                        style={{
                            width: p.size,
                            height: p.size,
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            background: `radial-gradient(circle, ${colorMap[p.color]} ${p.opacity}) 0%, transparent 70%)`,
                            filter: `blur(${p.size * 0.4}px)`,
                            animationDuration: `${p.duration}s`,
                            animationDelay: `${p.delay}s`,
                            willChange: 'transform',
                        }}
                    />
                )
            })}
        </div>
    )
}
