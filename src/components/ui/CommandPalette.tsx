/* ==========================================================
 * COMMANDPALETTE.TSX — the site as an operable tool (⌘K)
 * Terminal-styled palette: fuzzy-jump to any act, open any
 * case study, grab the resume, copy the email, open socials.
 * ⌘K / Ctrl+K toggles; ↑↓ selects; Enter runs; Esc closes.
 * The navbar chip and the mobile floating button dispatch
 * the same `fp:palette` event.
 * ========================================================== */
"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Compass,
    FolderOpen,
    FileDown,
    Mail,
    Github,
    Linkedin,
    Copy,
    CornerDownLeft,
    Terminal,
} from 'lucide-react'
import { projects } from '@/data/projects'
import { PERSONAL } from '@/lib/constants'
import { useLenis } from '@/hooks/useLenis'

interface Command {
    id: string
    group: 'navigate' | 'projects' | 'actions'
    label: string
    hint?: string
    Icon: React.ComponentType<{ className?: string }>
    run: () => void
}

/* Substring-then-subsequence fuzzy match; lower score = better. */
function fuzzyScore(query: string, target: string): number | null {
    const q = query.toLowerCase().trim()
    const t = target.toLowerCase()
    if (!q) return 0
    const idx = t.indexOf(q)
    if (idx >= 0) return idx
    let qi = 0
    for (let ti = 0; ti < t.length && qi < q.length; ti++) {
        if (t[ti] === q[qi]) qi++
    }
    return qi === q.length ? 100 : null
}

const SECTIONS = [
    { id: 'hero', label: 'Input — the landing' },
    { id: 'about', label: 'Representation — about' },
    { id: 'work', label: 'The Deployment Log — projects' },
    { id: 'proof', label: 'Training — proof of work' },
    { id: 'how-i-work', label: 'Latent Space — capability map' },
    { id: 'education', label: 'Backprop — education' },
    { id: 'opportunities', label: 'Routing — ways to work together' },
    { id: 'contact', label: 'Output — contact' },
]

export default function CommandPalette() {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState(0)
    const [copied, setCopied] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const pathname = usePathname()
    const { scrollTo } = useLenis()

    const close = useCallback(() => {
        setOpen(false)
        setQuery('')
        setSelected(0)
        setCopied(false)
    }, [])

    const gotoSection = useCallback(
        (id: string) => {
            close()
            if (pathname !== '/') {
                router.push(`/#${id}`)
                return
            }
            scrollTo(`#${id}`, { offset: id === 'hero' ? 0 : -80 })
        },
        [close, pathname, router, scrollTo]
    )

    const commands = useMemo<Command[]>(
        () => [
            ...SECTIONS.map((s) => ({
                id: `nav-${s.id}`,
                group: 'navigate' as const,
                label: s.label,
                Icon: Compass,
                run: () => gotoSection(s.id),
            })),
            ...projects.map((p) => ({
                id: `proj-${p.slug}`,
                group: 'projects' as const,
                label: p.title,
                hint: p.category,
                Icon: FolderOpen,
                run: () => {
                    close()
                    router.push(`/projects/${p.slug}`)
                },
            })),
            {
                id: 'act-resume',
                group: 'actions',
                label: 'Download resume',
                hint: 'pdf',
                Icon: FileDown,
                run: () => {
                    close()
                    window.open(PERSONAL.resumePath, '_blank')
                },
            },
            {
                id: 'act-email',
                group: 'actions',
                label: 'Copy email address',
                hint: PERSONAL.email,
                Icon: Copy,
                run: () => {
                    navigator.clipboard?.writeText(PERSONAL.email)
                    setCopied(true)
                    setTimeout(close, 900)
                },
            },
            {
                id: 'act-mail',
                group: 'actions',
                label: 'Send an email',
                Icon: Mail,
                run: () => {
                    close()
                    window.open(`mailto:${PERSONAL.email}`, '_self')
                },
            },
            {
                id: 'act-github',
                group: 'actions',
                label: 'Open GitHub',
                Icon: Github,
                run: () => {
                    close()
                    window.open(PERSONAL.github, '_blank', 'noopener')
                },
            },
            {
                id: 'act-linkedin',
                group: 'actions',
                label: 'Open LinkedIn',
                Icon: Linkedin,
                run: () => {
                    close()
                    window.open(PERSONAL.linkedin, '_blank', 'noopener')
                },
            },
        ],
        [close, gotoSection, router]
    )

    const results = useMemo(() => {
        const scored = commands
            .map((c) => ({ c, score: fuzzyScore(query, c.label + ' ' + (c.hint ?? '')) }))
            .filter((r): r is { c: Command; score: number } => r.score !== null)
        scored.sort((a, b) => a.score - b.score)
        return scored.map((r) => r.c)
    }, [commands, query])

    /* Global shortcuts + open events. */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                setOpen((o) => !o)
            } else if (e.key === 'Escape') {
                close()
            }
        }
        const onOpen = () => setOpen(true)
        window.addEventListener('keydown', onKey)
        window.addEventListener('fp:palette', onOpen)
        return () => {
            window.removeEventListener('keydown', onKey)
            window.removeEventListener('fp:palette', onOpen)
        }
    }, [close])

    /* Focus + scroll lock while open. */
    useEffect(() => {
        if (!open) return
        const t = setTimeout(() => inputRef.current?.focus(), 30)
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            clearTimeout(t)
            document.body.style.overflow = prev
        }
    }, [open])

    /* Keep the selected row visible. */
    useEffect(() => {
        const el = listRef.current?.querySelector(`[data-idx="${selected}"]`)
        el?.scrollIntoView({ block: 'nearest' })
    }, [selected])

    const onInputKey = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelected((s) => Math.min(s + 1, results.length - 1))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelected((s) => Math.max(s - 1, 0))
        } else if (e.key === 'Enter') {
            e.preventDefault()
            results[selected]?.run()
        }
    }

    let lastGroup: string | null = null
    const groupTitles: Record<Command['group'], string> = {
        navigate: 'go to',
        projects: 'case studies',
        actions: 'actions',
    }

    return (
        <>
            {/* Mobile trigger — desktop has the navbar ⌘K chip */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open command palette"
                className="glass-panel fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full
                           text-silver transition-colors hover:text-cyan lg:hidden"
            >
                <Terminal className="h-4.5 w-4.5" />
            </button>

        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="fixed inset-0 z-100 flex items-start justify-center bg-obsidian/70 backdrop-blur-sm px-4 pt-[16vh]"
                    onPointerDown={(e) => {
                        if (e.target === e.currentTarget) close()
                    }}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Command palette"
                >
                    <motion.div
                        initial={{ opacity: 0, y: -14, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="glass-panel hud-corners w-full max-w-xl overflow-hidden rounded-2xl shadow-[0_30px_120px_rgba(0,0,0,0.5)]"
                    >
                        {/* Prompt */}
                        <div className="flex items-center gap-3 border-b border-white/8 px-5 py-4">
                            <span className="font-mono text-[13px] text-cyan" aria-hidden="true">
                                &gt;
                            </span>
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value)
                                    setSelected(0)
                                }}
                                onKeyDown={onInputKey}
                                placeholder="jump to a section, open a project, run an action…"
                                className="w-full bg-transparent font-mono text-sm text-cool-white placeholder:text-silver/50 outline-none"
                                spellCheck={false}
                            />
                            <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-silver/70">
                                esc
                            </kbd>
                        </div>

                        {/* Results */}
                        <div ref={listRef} className="max-h-[46vh] overflow-y-auto py-2">
                            {results.length === 0 && (
                                <p className="px-5 py-6 text-center font-mono text-[12px] text-silver/60">
                                    no match — the network returned null
                                </p>
                            )}
                            {results.map((cmd, i) => {
                                const showGroup = cmd.group !== lastGroup
                                lastGroup = cmd.group
                                const active = i === selected
                                return (
                                    <div key={cmd.id}>
                                        {showGroup && (
                                            <p className="px-5 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-silver/45">
                                                {groupTitles[cmd.group]}
                                            </p>
                                        )}
                                        <button
                                            type="button"
                                            data-idx={i}
                                            onClick={cmd.run}
                                            onMouseEnter={() => setSelected(i)}
                                            className={`flex w-full items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                                                active ? 'bg-violet/15' : ''
                                            }`}
                                        >
                                            <cmd.Icon
                                                className={`h-4 w-4 shrink-0 ${
                                                    active ? 'text-cyan' : 'text-silver/60'
                                                }`}
                                            />
                                            <span className="flex-1 truncate font-inter text-sm text-cool-white/90">
                                                {copied && cmd.id === 'act-email'
                                                    ? 'Copied ✓'
                                                    : cmd.label}
                                            </span>
                                            {cmd.hint && (
                                                <span className="max-w-40 truncate font-mono text-[10px] text-silver/50">
                                                    {cmd.hint}
                                                </span>
                                            )}
                                            {active && (
                                                <CornerDownLeft className="h-3.5 w-3.5 text-silver/50" />
                                            )}
                                        </button>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Footer strip */}
                        <div className="flex items-center justify-between border-t border-white/8 px-5 py-2.5">
                            <span className="font-mono text-[10px] text-silver/50">
                                ↑↓ navigate · ↵ run
                            </span>
                            <span className="font-mono text-[10px] text-silver/50">
                                kartik@forward-pass
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    )
}
