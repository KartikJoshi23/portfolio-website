/* ==========================================================
 * PROJECTVISUALS.TSX
 * Derives a consistent icon + accent gradient for each project
 * from its `category`, with optional per-slug icon overrides.
 * This keeps "adding a project" trivial: a new category falls
 * back to sensible defaults automatically.
 * ========================================================== */
import {
    BarChart3,
    Shield,
    TrafficCone,
    Fingerprint,
    BrainCircuit,
    Boxes,
    Cpu,
    type LucideIcon,
} from 'lucide-react'

export interface ProjectVisual {
    /** Icon component for the project. */
    Icon: LucideIcon
    /** Two-stop accent used for gradient covers and glows. */
    from: string
    to: string
    /** Solid accent (for borders, text highlights). */
    accent: string
}

/** Category → visual identity. Add a row when you add a new category. */
const categoryVisuals: Record<string, ProjectVisual> = {
    'AI/ML': { Icon: BrainCircuit, from: '#7C3AED', to: '#06B6D4', accent: '#7C3AED' },
    Web3: { Icon: Shield, from: '#06B6D4', to: '#7C3AED', accent: '#06B6D4' },
    'Reinforcement Learning': { Icon: TrafficCone, from: '#10B981', to: '#06B6D4', accent: '#10B981' },
    'Edge AI': { Icon: Cpu, from: '#F43F5E', to: '#7C3AED', accent: '#F43F5E' },
    'Full-Stack': { Icon: Boxes, from: '#7C3AED', to: '#10B981', accent: '#7C3AED' },
    Research: { Icon: BarChart3, from: '#06B6D4', to: '#10B981', accent: '#06B6D4' },
}

/** Per-slug icon overrides when a project deserves a specific symbol. */
const slugIcons: Record<string, LucideIcon> = {
    algoviz: BarChart3,
    'smart-contract-scanner': Shield,
    'smart-city-traffic': TrafficCone,
    'sentinel-gate': Fingerprint,
}

const fallback: ProjectVisual = {
    Icon: Boxes,
    from: '#7C3AED',
    to: '#06B6D4',
    accent: '#7C3AED',
}

export function getProjectVisual(category: string, slug?: string): ProjectVisual {
    const base = categoryVisuals[category] ?? fallback
    const Icon = (slug && slugIcons[slug]) || base.Icon
    return { ...base, Icon }
}
