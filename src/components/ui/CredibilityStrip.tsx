"use client"

import { motion } from 'framer-motion'
import { EASE_OUT } from '@/lib/constants'

const credibilityItems = [
    { value: 'Global Top 10', label: 'ICC NIUM Hackathon' },
    { value: 'National Finalist', label: 'Smart India Hackathon' },
    { value: 'Published Researcher', label: 'IJANA / ASICS 2024' },
    { value: '3 AI Systems', label: 'Built Across product, infra, and ML' },
]

export default function CredibilityStrip() {
    return (
        <section className="relative z-10 -mt-10 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto rounded-3xl border border-white/10 bg-[rgba(9,9,11,0.78)] backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
                <div className="grid grid-cols-1 divide-y divide-white/8 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
                    {credibilityItems.map((item, index) => (
                        <motion.div
                            key={item.value}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: index * 0.08, ease: EASE_OUT }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="px-6 py-5 text-center lg:text-left"
                        >
                            <p className="font-sora text-lg text-cool-white">{item.value}</p>
                            <p className="mt-1 font-inter text-sm text-silver">{item.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
