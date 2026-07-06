/* ==========================================================
 * /projects/[slug] — static project detail page
 * Generated from projects.ts via generateStaticParams.
 * ========================================================== */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Github,
    ExternalLink,
    FileText,
    PlayCircle,
    Check,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AuroraBackground from '@/components/ui/AuroraBackground'
import GenerativeCover from '@/components/ui/GenerativeCover'
import StatusBadge from '@/components/ui/StatusBadge'
import { projects, getProjectBySlug } from '@/data/projects'
import { META } from '@/lib/constants'

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const project = getProjectBySlug(slug)
    if (!project) return { title: 'Project Not Found' }
    return {
        title: `${project.title} — Kartik Joshi`,
        description: project.oneLiner,
        alternates: { canonical: `${META.siteUrl}/projects/${project.slug}` },
    }
}

const linkMeta = {
    live: { label: 'Live Site', Icon: ExternalLink },
    demo: { label: 'Demo', Icon: PlayCircle },
    github: { label: 'Source', Icon: Github },
    paper: { label: 'Paper', Icon: FileText },
} as const

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const project = getProjectBySlug(slug)
    if (!project) notFound()

    const idx = projects.findIndex((p) => p.slug === slug)
    const prev = projects[(idx - 1 + projects.length) % projects.length]
    const next = projects[(idx + 1) % projects.length]

    const links = Object.entries(project.links ?? {}).filter(
        ([, url]) => typeof url === 'string' && url.length > 0
    ) as [keyof typeof linkMeta, string][]

    return (
        <>
            <Navbar />
            <AuroraBackground />

            <main id="main-content" className="relative z-10">
                <article className="mx-auto max-w-5xl px-6 pb-24 pt-32 lg:px-8 lg:pt-36">
                    {/* Back */}
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-2 font-sora text-sm text-silver transition-colors hover:text-cool-white"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                        All projects
                    </Link>

                    {/* Header */}
                    <header className="mt-10">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="font-mono text-sm text-violet">
                                {project.number}
                            </span>
                            <span className="font-mono text-xs uppercase tracking-wider text-silver/70">
                                {project.category}
                            </span>
                            <span className="font-mono text-xs text-silver/50">
                                {project.year}
                            </span>
                            <StatusBadge status={project.status} />
                        </div>

                        <h1 className="mt-4 font-sora text-4xl font-bold leading-tight text-cool-white md:text-6xl">
                            {project.title}
                        </h1>
                        <p className="mt-3 font-inter text-lg italic text-silver/80 md:text-xl">
                            {project.subtitle}
                        </p>
                    </header>

                    {/* Living generative cover */}
                    <div className="relative mt-10 h-64 overflow-hidden rounded-3xl border border-white/8 bg-panel md:h-96">
                        <GenerativeCover slug={project.slug} category={project.category} />
                        <div
                            className="pointer-events-none absolute inset-0"
                            style={{
                                background:
                                    'radial-gradient(ellipse 90% 60% at 50% 115%, rgba(9,9,11,0.5) 0%, transparent 60%)',
                            }}
                        />
                    </div>

                    {/* Metrics */}
                    {project.metrics && (
                        <div className="mt-10 grid grid-cols-3 gap-4">
                            {project.metrics.map((m) => (
                                <div
                                    key={m.label}
                                    className="rounded-2xl border border-white/8 bg-white/2 p-4 text-center md:p-6"
                                >
                                    <div className="font-sora text-2xl font-bold text-cool-white md:text-4xl">
                                        {m.value}
                                    </div>
                                    <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-silver/60 md:text-xs">
                                        {m.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Body grid */}
                    <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr]">
                        {/* Left: narrative + highlights */}
                        <div>
                            {project.description && (
                                <>
                                    <h2 className="font-sora text-sm font-semibold uppercase tracking-wider text-violet">
                                        Overview
                                    </h2>
                                    <p className="mt-4 font-inter text-lg leading-relaxed text-cool-white/85">
                                        {project.description}
                                    </p>
                                </>
                            )}

                            <h2 className="mt-12 font-sora text-sm font-semibold uppercase tracking-wider text-violet">
                                Highlights
                            </h2>
                            <ul className="mt-5 space-y-4">
                                {project.highlights.map((h, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet/15">
                                            <Check className="h-3 w-3 text-violet" />
                                        </span>
                                        <span className="font-inter leading-relaxed text-cool-white/85">
                                            {h}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: sidebar */}
                        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
                            <div>
                                <h2 className="font-sora text-sm font-semibold uppercase tracking-wider text-violet">
                                    Tech Stack
                                </h2>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="rounded-full border border-white/10 bg-white/3 px-3 py-1 font-mono text-xs text-silver/85"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="font-sora text-sm font-semibold uppercase tracking-wider text-violet">
                                    Links
                                </h2>
                                {links.length > 0 ? (
                                    <div className="mt-4 flex flex-col gap-2.5">
                                        {links.map(([key, url]) => {
                                            const meta = linkMeta[key]
                                            const Icon = meta.Icon
                                            return (
                                                <a
                                                    key={key}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/2 px-4 py-3
                                                               transition-all duration-300 hover:border-violet/40 hover:bg-white/5"
                                                >
                                                    <Icon className="h-4 w-4 text-violet" />
                                                    <span className="font-sora text-sm text-cool-white">
                                                        {meta.label}
                                                    </span>
                                                    <ArrowUpRight className="ml-auto h-4 w-4 text-silver/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                                </a>
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <p className="mt-4 font-inter text-sm text-silver/60">
                                        Links coming soon — this build is being prepared for deployment.
                                    </p>
                                )}
                            </div>
                        </aside>
                    </div>

                    {/* Prev / Next */}
                    <nav className="mt-20 grid grid-cols-1 gap-4 border-t border-white/8 pt-10 sm:grid-cols-2">
                        <Link
                            href={`/projects/${prev.slug}`}
                            className="group rounded-2xl border border-white/8 bg-white/2 p-5 transition-all hover:border-violet/30 hover:bg-white/4"
                        >
                            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-silver/60">
                                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                                Previous
                            </span>
                            <span className="mt-2 block font-sora text-lg font-semibold text-cool-white group-hover:text-violet">
                                {prev.title}
                            </span>
                        </Link>
                        <Link
                            href={`/projects/${next.slug}`}
                            className="group rounded-2xl border border-white/8 bg-white/2 p-5 text-right transition-all hover:border-violet/30 hover:bg-white/4"
                        >
                            <span className="flex items-center justify-end gap-2 font-mono text-xs uppercase tracking-wider text-silver/60">
                                Next
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                            </span>
                            <span className="mt-2 block font-sora text-lg font-semibold text-cool-white group-hover:text-violet">
                                {next.title}
                            </span>
                        </Link>
                    </nav>
                </article>
            </main>

            <Footer />
        </>
    )
}
