/* ==========================================================
 * MAGNETICBUTTON.TSX — Blueprint Section 6.3
 * Used on: Hero CTAs, social buttons, contact submit,
 * resume button, footer socials.
 * Within 50px: button moves toward cursor (max 8px).
 * Spring: stiffness:150, damping:15.
 * Click: scale 0.95 → 1.0.
 * Desktop only. Tap feedback on mobile.
 * ========================================================== */
"use client"

import { useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SPRING_MAGNETIC } from '@/lib/constants'

interface MagneticButtonProps {
    children: React.ReactNode
    className?: string
    onClick?: () => void
    href?: string
    download?: boolean
    target?: string
    rel?: string
    as?: 'button' | 'a'
    ariaLabel?: string
}

export default function MagneticButton({
    children,
    className,
    onClick,
    href,
    download,
    target,
    rel,
    as = 'button',
    ariaLabel,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    // Spring-animated x/y for magnetic pull
    const x = useSpring(0, SPRING_MAGNETIC)
    const y = useSpring(0, SPRING_MAGNETIC)

    // Scale on click
    const scale = useSpring(1, { stiffness: 300, damping: 20 })

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distX = e.clientX - centerX
        const distY = e.clientY - centerY
        const dist = Math.sqrt(distX * distX + distY * distY)

        // Blueprint: Within 50px, button moves toward cursor (max 8px)
        if (dist < 50) {
            x.set(distX * 0.15)
            y.set(distY * 0.15)
        }
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
        setIsHovered(false)
    }

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseDown = () => {
        scale.set(0.95)
    }

    const handleMouseUp = () => {
        scale.set(1)
    }

    const Component = as === 'a' ? motion.a : motion.button

    return (
        <motion.div
            ref={ref}
            style={{ x, y }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            className="inline-block"
        >
            <Component
                href={href}
                download={download}
                target={target}
                rel={rel}
                onClick={onClick}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                style={{ scale }}
                className={cn(
                    'inline-flex items-center justify-center transition-all duration-300',
                    className
                )}
                aria-label={ariaLabel}
                whileTap={{ scale: 0.95 }}
            >
                {children}
            </Component>
        </motion.div>
    )
}
