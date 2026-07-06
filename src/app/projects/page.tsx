/* ==========================================================
 * /projects — full project archive (static)
 * ========================================================== */
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AuroraBackground from '@/components/ui/AuroraBackground'
import ProjectsArchive from '@/components/sections/ProjectsArchive'
import { projects } from '@/data/projects'
import { META } from '@/lib/constants'

export const metadata: Metadata = {
    title: 'Projects — Kartik Joshi',
    description:
        'A complete archive of applied AI, Web3, and systems projects built by Kartik Joshi — production-grade work with real stakes.',
    alternates: { canonical: `${META.siteUrl}/projects` },
}

export default function ProjectsPage() {
    return (
        <>
            <Navbar />
            <AuroraBackground />

            <main id="main-content" className="relative z-10">
                <section className="mx-auto max-w-7xl px-6 pb-24 pt-32 lg:px-8 lg:pt-36">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 font-sora text-sm text-silver transition-colors hover:text-cool-white"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                        Back to home
                    </Link>

                    <div className="mt-10 text-center">
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet">
                            The Archive
                        </p>
                        <h1 className="mt-4 font-sora text-4xl font-bold text-cool-white md:text-6xl">
                            Everything I&apos;ve <span className="text-gradient">Built</span>
                        </h1>
                        <p className="mx-auto mt-5 max-w-2xl font-inter text-base text-silver md:text-lg">
                            {projects.length} projects across applied AI, Web3, reinforcement
                            learning, and edge systems. Filter by domain to explore.
                        </p>
                    </div>

                    <div className="mt-14">
                        <ProjectsArchive />
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}
