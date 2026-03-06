/* ==========================================================
 * MOBILEMENU.TSX — Blueprint Section 4.3.2
 * Full-screen overlay menu for mobile
 * Large stacked links (Sora, 32px), staggered entrance
 * Resume button + socials at bottom
 * Close: Click X, click any link (auto-closes), or Escape
 * ========================================================== */
"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { Download, Linkedin, Github, Mail } from 'lucide-react'
import { navLinks } from '@/data/navigation'
import { cn } from '@/lib/utils'
import { EASE_OUT } from '@/lib/constants'

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
    onNavClick: (href: string) => void
    activeSection: string
}

export default function MobileMenu({
    isOpen,
    onClose,
    onNavClick,
    activeSection,
}: MobileMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                        'fixed inset-0 z-40 lg:hidden',
                        // Blueprint: obsidian background, 100vh
                        'bg-obsidian flex flex-col items-center justify-center',
                    )}
                >
                    {/* === Nav Links — Blueprint Section 4.3.2 ===
           * Large stacked links (Sora, 32px), staggered entrance (100ms delay each) */}
                    <nav className="flex flex-col items-center gap-8">
                        {navLinks.map((link, i) => (
                            <motion.button
                                key={link.sectionId}
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 20, opacity: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: i * 0.1,
                                    ease: EASE_OUT,
                                }}
                                onClick={() => onNavClick(link.href)}
                                className={cn(
                                    'font-sora font-semibold text-[32px] transition-colors duration-200',
                                    activeSection === link.sectionId
                                        ? 'text-violet'
                                        : 'text-cool-white hover:text-violet'
                                )}
                            >
                                {link.label}
                            </motion.button>
                        ))}
                    </nav>

                    {/* === Bottom: Resume Button + Socials ===
           * Blueprint Section 4.3.2 — Resume button + socials at bottom */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 15, opacity: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: navLinks.length * 0.1 + 0.1,
                            ease: EASE_OUT,
                        }}
                        className="absolute bottom-16 flex flex-col items-center gap-6"
                    >
                        {/* Resume download */}
                        <a
                            href="/Resume.pdf"
                            download
                            onClick={onClose}
                            className={cn(
                                'flex items-center gap-2',
                                'text-cool-white bg-linear-to-br from-violet to-cyan',
                                'font-sora font-medium text-[13px] uppercase tracking-[0.05em]',
                                'px-6 py-3 rounded-full',
                            )}
                        >
                            <Download size={14} strokeWidth={2.5} />
                            Resume
                        </a>

                        {/* Social icons — Blueprint Section 5.2.2 socials reference */}
                        <div className="flex items-center gap-5">
                            <a
                                href="https://linkedin.com/in/kartikjoshi23"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="text-silver hover:text-violet transition-colors duration-200"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="https://github.com/KartikJoshi23"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="text-silver hover:text-violet transition-colors duration-200"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href="mailto:kartik.as25dxb025@spjain.org"
                                aria-label="Email"
                                className="text-silver hover:text-violet transition-colors duration-200"
                            >
                                <Mail size={20} />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
