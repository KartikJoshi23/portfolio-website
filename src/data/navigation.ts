/* ==========================================================
 * NAVIGATION.TS — Blueprint Section 4.3
 * Navbar link definitions and section ID mapping
 * "What I Bring" IS the about section — intentional (Section 4.3)
 * ========================================================== */
import type { NavLink } from '@/types'

export const navLinks: NavLink[] = [
    { label: 'About', href: '#about', sectionId: 'about' },
    { label: 'Work', href: '#work', sectionId: 'work' },
    { label: 'Proof', href: '#proof', sectionId: 'proof' },
    { label: 'How I Work', href: '#how-i-work', sectionId: 'how-i-work' },
    { label: 'Research', href: '#research', sectionId: 'research' },
    { label: 'Contact', href: '#contact', sectionId: 'contact' },
]
