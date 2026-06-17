/* ==========================================================
 * TYPES/INDEX.TS — Blueprint Section 3.5
 * All TypeScript interfaces for the portfolio
 * ========================================================== */

// === Project Links (optional — provided once projects are deployed) ===
export interface ProjectLinks {
    live?: string
    github?: string
    demo?: string
    paper?: string
}

// === Project Metric (small stat chips on card / detail page) ===
export interface ProjectMetric {
    label: string
    value: string
}

/**
 * === Project ===
 * To add a NEW project: append an object to the `projects` array in
 * src/data/projects.ts. Everything else (home showcase, /projects archive,
 * filters, detail pages) updates automatically. Fully static — no CMS.
 *
 * - `slug`     unique URL id, e.g. 'algoviz' -> /projects/algoviz
 * - `category` free-form label used for filter chips (e.g. 'AI/ML', 'Web3')
 * - `featured` show in the homepage horizontal showcase (curated subset)
 * - `links`    optional; safe to omit until the project is deployed
 */
export interface Project {
    slug: string
    number: string          // "01", "02", "03" — display ordering label
    title: string
    subtitle: string
    year: string
    status: 'completed' | 'in-progress'
    category: string        // e.g. 'AI/ML' | 'Web3' | 'Reinforcement Learning'
    featured: boolean
    oneLiner: string
    description?: string     // longer narrative for the detail page
    highlights: string[]
    tech: string[]
    metrics?: ProjectMetric[]
    image: string | null    // cover path, or null for generated gradient cover
    links?: ProjectLinks
}

// === Value Proposition Card (Blueprint Section 5.3.2) ===
export interface ValueCard {
    number: string          // "01" - "04"
    title: string
    description: string
}

// === Skill Item (Blueprint Section 5.5.2) ===
export interface Skill {
    name: string
    icon: string | null     // simple-icons slug or null
}

// === Skill Category (Blueprint Section 5.5.2) ===
export interface SkillCategory {
    category: string
    skills: Skill[]
}

// === Achievement Card (Blueprint Section 5.6.1) ===
export interface Achievement {
    icon: string            // Lucide icon name
    title: string
    event: string
    detail: string
    scope: 'International' | 'National' | 'Regional' | 'Government'
}

// === Publication (Blueprint Section 5.6.1) ===
export interface Publication {
    title: string
    journal: string
    year: string
    description: string
    link: string | null
}

// === Education Item (Blueprint v4.0 — replaces Milestone) ===
export interface EducationItem {
    degree: string
    institution: string
    location: string
    period: string
    status: 'current' | 'completed'
    cgpa?: string
    coursework?: string[]
    highlight?: string
}

// === Contact Info (Blueprint Section 5.8.1) ===
export interface ContactInfo {
    type: string
    value: string
    href: string | null
    icon: string            // Lucide icon name
}

// === Tour Step (Blueprint Section 10.8) ===
export interface TourStep {
    id: number
    targetSection: string | null
    message: string
    characterState: 'waving' | 'talking' | 'pointing' | 'celebrating'
    audioFile: string
    duration: number        // ms before auto-advance
    isClosing?: boolean
}

// === Navigation Link (Blueprint Section 4.3) ===
export interface NavLink {
    label: string
    href: string            // anchor: "#work", "#about", etc.
    sectionId: string       // for active detection
}
