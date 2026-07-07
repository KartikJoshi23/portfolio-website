/* ==========================================================
 * CREDIBILITYSTRIP.TSX — "checksum" verification readout
 * Four proof points decode in sequence like a verification
 * log the moment the strip enters the viewport — one-shot,
 * fast, distinct from the looping treatments elsewhere.
 * ========================================================== */
"use client"

import { motion } from 'framer-motion'
import DecodeText from '@/components/motion/DecodeText'
import { EASE_OUT } from '@/lib/constants'

const credibilityItems = [
    { value: 'Global Top 10', label: 'ICC NIUM Hackathon' },
    { value: 'National Finalist', label: 'Smart India Hackathon' },
    { value: 'Published Researcher', label: 'IJANA / ASICS 2024' },
    // No hard count — the log keeps growing.
    { value: 'AI Systems in Production', label: 'Across product, infra, and ML' },
]

export default function CredibilityStrip() {
    return (
        <section className="relative z-10 -mt-10 px-6 lg:px-8" aria-label="Highlights">
            <div className="glass-panel max-w-7xl mx-auto rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
                <div className="grid grid-cols-1 divide-y divide-white/8 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
                    {credibilityItems.map((item, index) => (
                        <motion.div
                            key={item.value}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.09, ease: EASE_OUT }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="px-6 py-5 text-center lg:text-left"
                        >
                            <p className="font-sora text-lg text-cool-white">
                                <DecodeText text={item.value} delay={index * 140} speed={24} />
                            </p>
                            <p className="mt-1 font-inter text-sm text-silver flex items-center justify-center lg:justify-start gap-2">
                                <span className="font-mono text-[10px] text-emerald" aria-hidden="true">✓</span>
                                {item.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
