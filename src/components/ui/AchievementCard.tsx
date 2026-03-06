/* ==========================================================
 * ACHIEVEMENTCARD.TSX — Blueprint Section 5.6.2
 * Glassmorphism card with ember top-border, Lucide icon
 * Scope badge color-coded:
 *   International: ember text + ember/10 bg
 *   National: warm-white text + white/10 bg
 *   Regional: stone-gray text + white/5 bg
 *   Government: sage text + sage/10 bg
 * Animation: scale 0.95 + opacity 0 → scale 1 + opacity 1
 * ========================================================== */
"use client"

import { motion } from 'framer-motion'
import {
    Globe,
    Trophy,
    Award,
    Shield,
    ScrollText,
} from 'lucide-react'
import type { Achievement } from '@/types'
import { EASE_OUT } from '@/lib/constants'
import TiltCard from '@/components/ui/TiltCard'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    globe: Globe,
    trophy: Trophy,
    award: Award,
    shield: Shield,
    'scroll-text': ScrollText,
}

const scopeStyles: Record<
    Achievement['scope'],
    string
> = {
    International: 'text-violet bg-violet/10',
    National: 'text-cool-white bg-white/10',
    Regional: 'text-silver bg-white/5',
    Government: 'text-emerald bg-emerald/10',
}

interface AchievementCardProps {
    achievement: Achievement
    index: number
}

export default function AchievementCard({
    achievement,
    index,
}: AchievementCardProps) {
    const Icon = iconMap[achievement.icon] || Trophy

    return (
        <TiltCard className="relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: EASE_OUT }}
                viewport={{ once: true, amount: 0.2 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6
                           border-t-2 border-t-violet"
            >
            {/* Icon + Scope badge row */}
            <div className="flex items-start justify-between">
                <Icon className="w-7 h-7 text-violet" />
                <span
                    className={`font-mono text-[11px] uppercase tracking-widest px-2.5 py-0.5 rounded-full ${scopeStyles[achievement.scope]}`}
                >
                    {achievement.scope}
                </span>
            </div>

            {/* Title */}
            <h3 className="mt-4 font-sora font-semibold text-lg md:text-xl text-cool-white">
                {achievement.title}
            </h3>

            {/* Event */}
            <p className="mt-1 font-inter text-sm text-silver">
                {achievement.event}
            </p>

            {/* Detail */}
            <p className="mt-1 font-inter text-[13px] text-silver">
                {achievement.detail}
            </p>
            </motion.div>
        </TiltCard>
    )
}
