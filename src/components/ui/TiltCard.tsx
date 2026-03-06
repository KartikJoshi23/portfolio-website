/* ==========================================================
 * TILTCARD.TSX
 * 3D perspective tilt wrapper that follows mouse position
 * Subtle 3-degree tilt on hover, smooth spring return
 * Desktop only
 * ========================================================== */
"use client"

import { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

interface TiltCardProps {
    children: React.ReactNode
    className?: string
    maxTilt?: number
}

export default function TiltCard({ children, className, maxTilt = 3 }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isHovering, setIsHovering] = useState(false)

    const rotateX = useSpring(0, { stiffness: 200, damping: 20 })
    const rotateY = useSpring(0, { stiffness: 200, damping: 20 })

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const x = (e.clientX - centerX) / (rect.width / 2)
        const y = (e.clientY - centerY) / (rect.height / 2)
        rotateY.set(x * maxTilt)
        rotateX.set(-y * maxTilt)
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
        rotateX.set(0)
        rotateY.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformPerspective: 800,
                transformStyle: 'preserve-3d',
            }}
            className={className}
        >
            {children}
            {/* Shine overlay on hover */}
            <div
                className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
                style={{
                    opacity: isHovering ? 1 : 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 50%, rgba(124,58,237,0.02) 100%)',
                }}
            />
        </motion.div>
    )
}
