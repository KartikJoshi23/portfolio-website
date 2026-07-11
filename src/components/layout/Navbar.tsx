/* ==========================================================
 * NAVBAR.TSX — Blueprint Section 4.3.1 (Desktop) & 4.3.2 (Mobile)
 * Sticky glassmorphism navbar with active section highlighting
 * Position: fixed top-0, z-50. Height: 64px desktop, 56px mobile
 * ========================================================== */
"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import LogoMark from '@/components/ui/LogoMark'
import { navLinks } from '@/data/navigation'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useLenis } from '@/hooks/useLenis'
import { cn } from '@/lib/utils'
import MobileMenu from './MobileMenu'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [hidden, setHidden] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const activeSection = useActiveSection()
    const { scrollTo } = useLenis()
    const pathname = usePathname()
    const router = useRouter()
    const isHome = pathname === '/'

    // Blueprint Section 4.3.1 — Glassmorphism after scroll + hide/show on direction
    useEffect(() => {
        let lastY = window.scrollY
        const handler = () => {
            const currentY = window.scrollY
            setScrolled(currentY > 50)
            // Hide when scrolling down past 200px, show when scrolling up
            if (currentY > 200 && currentY > lastY + 5) {
                setHidden(true)
            } else if (currentY < lastY - 5) {
                setHidden(false)
            }
            lastY = currentY
        }
        window.addEventListener('scroll', handler, { passive: true })
        handler()
        return () => window.removeEventListener('scroll', handler)
    }, [])

    // Blueprint Section 4.3.2 — Disable body scroll when mobile menu open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [mobileOpen])

    // Close mobile menu on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMobileOpen(false)
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [])

    const handleNavClick = (href: string) => {
        setMobileOpen(false)
        if (!isHome) {
            router.push(`/${href}`)
            return
        }
        const target = href.replace('#', '')
        const element = document.getElementById(target)
        if (element) {
            scrollTo(`#${target}`, { offset: -80 })
        }
    }

    const handleLogoClick = () => {
        setMobileOpen(false)
        if (!isHome) {
            router.push('/')
            return
        }
        scrollTo(0)
    }

    return (
        <>
            {/* === Desktop & Mobile Navbar === */}
            <nav
                className={cn(
                    // Blueprint: fixed top-0, z-50, full width
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    // Blueprint Section 4.3.1 — height
                    'h-14 lg:h-16',
                    // Hide/show on scroll direction
                    hidden && !mobileOpen ? '-translate-y-full' : 'translate-y-0',
                    // Glassmorphism states
                    scrolled
                        ? // After scroll: glassmorphism (bg-white/5 backdrop-blur-xl border-b border-white/10)
                        'bg-glass-white backdrop-blur-xl border-b border-[rgba(255,255,255,0.1)]'
                        : // Over Hero: fully transparent
                        'bg-transparent border-b border-transparent'
                )}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center justify-between">

                    {/* === Left: Logo — inline SVG monogram ===
                       * No PNG matte, no background box: gradient signal
                       * strokes + pulsing nodes, at home over any scene */}
                    <button
                        onClick={handleLogoClick}
                        className="flex items-center"
                        aria-label="Scroll to top"
                    >
                        <LogoMark className="h-9 w-auto transition-[filter] duration-300 ease-in-out hover:drop-shadow-[0_0_14px_rgba(124,58,237,0.55)]" />
                    </button>

                    {/* === Center: Desktop Nav Links — Blueprint Section 4.3.1 ===
           * Four links: Work · About · Skills · Contact
           * Active section: ember gold underline */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.sectionId}
                                onClick={() => handleNavClick(link.href)}
                                className={cn(
                                    'relative font-inter font-normal text-sm tracking-wide transition-colors duration-200',
                                    activeSection === link.sectionId
                                        ? 'text-violet'
                                        : 'text-cool-white hover:text-violet'
                                )}
                            >
                                {link.label}
                                {/* Active underline indicator */}
                                {activeSection === link.sectionId && (
                                    <motion.div
                                        layoutId="nav-active"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-violet"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* === Right: Palette hint + Resume + Mobile Hamburger === */}
                    <div className="flex items-center gap-4">

                        {/* Command palette hint — the site is operable */}
                        <button
                            type="button"
                            onClick={() => window.dispatchEvent(new Event('fp:palette'))}
                            className="hidden lg:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5
                                       font-mono text-[11px] text-silver/80 transition-colors hover:border-cyan/40 hover:text-cool-white"
                            aria-label="Open command palette"
                        >
                            <kbd className="font-mono text-[10px]">⌘K</kbd>
                            <span className="text-silver/50">·</span>
                            navigate
                        </button>

                        {/* Resume button — Blueprint Section 4.3.1
             * Ember gold background, download icon, triggers PDF download */}
                        <a
                            href="/Kartik_Resume.pdf"
                            download
                            className={cn(
                                'hidden lg:flex items-center gap-2',
                                'text-cool-white',
                                'font-sora font-medium text-[13px] uppercase tracking-[0.05em]',
                                'px-5 py-2 rounded-full',
                                'hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300',
                                'bg-linear-to-br from-violet to-cyan',
                            )}
                        >
                            <Download size={14} strokeWidth={2.5} />
                            Resume
                        </a>

                        {/* Mobile hamburger — Blueprint Section 4.3.2
             * Right: Hamburger (animated to X on open) */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden text-cool-white hover:text-violet transition-colors p-1"
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileOpen}
                        >
                            <AnimatePresence mode="wait">
                                {mobileOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={24} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu size={24} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </nav>

            {/* === Mobile Menu Overlay — Blueprint Section 4.3.2 === */}
            <MobileMenu
                isOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
                onNavClick={handleNavClick}
                activeSection={activeSection}
            />
        </>
    )
}
