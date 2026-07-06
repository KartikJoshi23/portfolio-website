/* ==========================================================
 * CONSTANTS.TS — Blueprint Appendix A Quick Reference
 * Central constants referenced across the application
 * ========================================================== */

// === Animation Easing Curves (Blueprint Appendix A) ===
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]
export const EASE_PRELOADER_EXIT: [number, number, number, number] = [0.76, 0, 0.24, 1]

// === Spring Configs (Blueprint Section 6.3 & 6.2) ===
export const SPRING_MAGNETIC = { stiffness: 150, damping: 15 }
export const SPRING_GLOW = { stiffness: 50, damping: 30 }

// === Breakpoints (Blueprint Section 9) ===
export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
} as const

// === Section IDs (Blueprint v4.0) ===
export const SECTION_IDS = {
    hero: 'hero',
    about: 'about',
    work: 'work',
    proof: 'proof',
    howIWork: 'how-i-work',
    education: 'education',
    opportunities: 'opportunities',
    contact: 'contact',
} as const

// === Personal Info (Blueprint Section 11.1) ===
export const PERSONAL = {
    name: 'Kartik Joshi',
    email: 'kartujoshi2002@gmail.com',
    phone: '+971 56 558 2009',
    phoneHref: 'tel:+971565582009',
    location: 'Dubai, UAE',
    linkedin: 'https://linkedin.com/in/kartikjoshi23',
    github: 'https://github.com/KartikJoshi23',
    institution: 'SP Jain School of Global Management',
    degree: 'Masters in AI with Business',
    resumePath: '/Kartik_Resume.pdf',
} as const

// === Narrative Acts ("The Forward Pass") ===
// Each homepage section belongs to an act; the mono HUD labels
// and the ChapterRail read from this map.
export const ACTS = [
    { id: 'hero', index: '01', act: 'INPUT', label: 'Input Layer' },
    { id: 'about', index: '02', act: 'REPRESENTATION', label: 'Learned Representation' },
    { id: 'work', index: '03', act: 'INFERENCE', label: 'Inference Gallery' },
    { id: 'proof', index: '04', act: 'TRAINING', label: 'Training Epochs' },
    { id: 'how-i-work', index: '05', act: 'LATENT SPACE', label: 'Capability Map' },
    { id: 'education', index: '06', act: 'BACKPROP', label: 'Where Weights Formed' },
    { id: 'opportunities', index: '07', act: 'ROUTING', label: 'Decision Boundary' },
    { id: 'contact', index: '08', act: 'OUTPUT', label: 'Output Layer' },
] as const

export type Act = (typeof ACTS)[number]

export const getAct = (id: string): Act | undefined =>
    ACTS.find((a) => a.id === id)

// === Meta (Blueprint Section 8.1) ===
export const META = {
    title: 'Kartik Joshi — Automating Intelligence. Decentralizing Trust.',
    description:
        'AI/ML specialist building production-grade intelligent systems. Published researcher, hackathon competitor. Masters in AI with Business at SP Jain, Dubai.',
    tagline: 'Automating intelligence. Decentralizing trust.',
    siteUrl: 'https://kartik-joshi.vercel.app',
} as const
