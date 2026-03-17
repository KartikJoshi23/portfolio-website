/* ==========================================================
 * PRELOADER.TSX — Blueprint v4.0 Section 5.1
 * Multilingual "Hello" crossfade → slide-up exit
 * ALWAYS plays on every load (no sessionStorage skip)
 * Violet text color (#7C3AED)
 * ========================================================== */
"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE_PRELOADER_EXIT } from '@/lib/constants'

interface PreloaderProps {
    onComplete: () => void
}

const greetings = [
    { text: 'Hello', lang: 'en' },
    { text: '\u0645\u0631\u062D\u0628\u0627', lang: 'ar' },
    { text: '\u0928\u092E\u0938\u094D\u0924\u0947', lang: 'hi' },
    { text: '\u0AA8\u0AAE\u0AB8\u0ACD\u0AA4\u0AC7', lang: 'gu' },
    { text: 'Hola', lang: 'es' },
    { text: 'Bonjour', lang: 'fr' },
    { text: '\u3053\u3093\u306B\u3061\u306F', lang: 'ja' },
    { text: "Hello, I'm Kartik.", lang: 'final' },
]

const timings = [350, 350, 350, 350, 350, 350, 350, 500]

export default function Preloader({ onComplete }: PreloaderProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isExiting, setIsExiting] = useState(false)

    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

    useEffect(() => {
        if (prefersReducedMotion) {
            setCurrentIndex(greetings.length - 1)
            const timer = setTimeout(() => {
                setIsExiting(true)
                onComplete()
            }, 1000)
            return () => clearTimeout(timer)
        }

        if (currentIndex < greetings.length - 1) {
            const timer = setTimeout(() => {
                setCurrentIndex((prev) => prev + 1)
            }, timings[currentIndex])
            return () => clearTimeout(timer)
        } else {
            const timer = setTimeout(() => {
                setIsExiting(true)
                onComplete()
            }, timings[timings.length - 1])
            return () => clearTimeout(timer)
        }
    }, [currentIndex, prefersReducedMotion, onComplete])

    useEffect(() => {
        if (!isExiting) {
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isExiting])

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    exit={{
                        y: '-100vh',
                        transition: { duration: 0.8, ease: EASE_PRELOADER_EXIT },
                    }}
                    className="fixed inset-0 z-100 bg-obsidian flex items-center justify-center"
                >
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="font-sora font-bold text-violet"
                            style={{
                                fontSize: 'clamp(2rem, 8vw, 5rem)',
                            }}
                        >
                            {greetings[currentIndex].text}
                        </motion.h1>
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
