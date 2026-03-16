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
    email: 'kartik.as25dxb025@spjain.org',
    phone: '+971 56 558 2009',
    phoneHref: 'tel:+971565582009',
    location: 'Dubai, UAE',
    linkedin: 'https://linkedin.com/in/kartikjoshi23',
    github: 'https://github.com/KartikJoshi23',
    institution: 'SP Jain School of Global Management',
    degree: 'Masters in AI with Business',
    resumePath: '/Kartik_Joshi_Resume.pdf',
} as const

// === Meta (Blueprint Section 8.1) ===
export const META = {
    title: 'Kartik Joshi — Automating Intelligence. Decentralizing Trust.',
    description:
        'AI/ML specialist building production-grade intelligent systems. Published researcher, hackathon competitor. Masters in AI with Business at SP Jain, Dubai.',
    tagline: 'Automating intelligence. Decentralizing trust.',
    siteUrl: 'https://your-project.vercel.app', // Update on deployment
} as const
