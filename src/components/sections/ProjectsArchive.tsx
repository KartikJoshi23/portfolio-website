/* ==========================================================
 * PROJECTSARCHIVE.TSX — client grid for /projects
 * Category filter chips + animated masonry-ish grid.
 * Reads everything from projects.ts (fully static).
 * ========================================================== */
"use client"

import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import ProjectCard from '@/components/ui/ProjectCard'
import { projects, projectCategories } from '@/data/projects'
import { EASE_OUT } from '@/lib/constants'

export default function ProjectsArchive() {
    const [active, setActive] = useState('All')

    const filtered =
        active === 'All' ? projects : projects.filter((p) => p.category === active)

    return (
        <div>
            {/* Filter chips */}
            <LayoutGroup>
                <div className="flex flex-wrap justify-center gap-2.5">
                    {projectCategories.map((cat) => {
                        const isActive = cat === active
                        return (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setActive(cat)}
                                className={`relative rounded-full border px-4 py-2 font-sora text-sm font-medium
                                            transition-colors duration-300 ${
                                                isActive
                                                    ? 'border-transparent text-cool-white'
                                                    : 'border-white/10 text-silver hover:border-violet/40 hover:text-cool-white'
                                            }`}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="filter-pill"
                                        className="absolute inset-0 -z-10 rounded-full bg-linear-to-r from-violet to-cyan"
                                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                    />
                                )}
                                {cat}
                            </button>
                        )
                    })}
                </div>
            </LayoutGroup>

            {/* Grid */}
            <motion.div
                layout
                className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
                <AnimatePresence mode="popLayout">
                    {filtered.map((project, i) => (
                        <motion.div
                            key={project.slug}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: EASE_OUT }}
                        >
                            <ProjectCard project={project} index={i} variant="grid" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
                <p className="mt-16 text-center font-inter text-silver">
                    No projects in this category yet.
                </p>
            )}
        </div>
    )
}
