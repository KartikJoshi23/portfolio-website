/* ==========================================================
 * NAVIGATION.TS — Blueprint Section 4.3
 * Navbar link definitions and section ID mapping
 * "What I Bring" IS the about section — intentional (Section 4.3)
 * ========================================================== */
import type { NavLink } from '@/types'

export const navLinks: NavLink[] = [
    { label: 'Work', href: '#work', sectionId: 'work' },
    { label: 'About', href: '#about', sectionId: 'about' },
    { label: 'Skills', href: '#skills', sectionId: 'skills' },
    { label: 'Contact', href: '#contact', sectionId: 'contact' },
]
