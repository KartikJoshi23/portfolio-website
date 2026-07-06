# Kartik Joshi — Portfolio

**"The Forward Pass"** — an immersive portfolio for an AI engineer, built as a
scroll-driven narrative: the visitor is a signal, the site is the network,
and scrolling is inference.

**Live:** https://kartik-joshi.vercel.app

## The narrative

| Act | Section | Signature motion |
|-----|---------|------------------|
| INIT | Preloader | Terminal boot sequence → particle bloom handoff |
| 01 / INPUT | Hero | WebGL neural constellation, decode-in headline, cursor signal probe |
| 02 / REPRESENTATION | About | Masked line reveals, value cards assembling on a drawn signal spine |
| 03 / INFERENCE | Selected Work | Pinned horizontal gallery (GSAP scrub), generative canvas covers per project |
| 04 / TRAINING | Proof of Work | Converging loss-curve timeline with epoch nodes and falling loss readouts |
| 05 / LATENT SPACE | Capability Map | Interactive skill embedding map with cluster re-embedding filters |
| 06 / BACKPROP | Education | Gradient-pulse rail with clip-path card wipes |
| 07 / ROUTING | Opportunities | Signal trunk splitting into three conductive branch routes |
| 08 / OUTPUT | Contact | Terminal-session form, converged-node glow, emission pulse on submit |
| EOF | Footer | Decode-in sign-off, ghost wordmark |

One persistent WebGL particle field (React Three Fiber) morphs between
per-section formations as you scroll — the connective tissue of the story.

## Stack

- **Next.js 16** (App Router, static output) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-based theme tokens)
- **GSAP + ScrollTrigger** — scroll choreography (pinning, scrubbing, drawn paths)
- **Lenis** — smooth scroll, driven from `gsap.ticker` (single RAF loop)
- **Framer Motion** — pointer/state micro-interactions, FLIP layout
- **Three.js via @react-three/fiber** — the morphing particle field

## Performance & accessibility

- WebGL is code-split (`next/dynamic`, `ssr: false`) — never blocks LCP
- Device-tier probe (`useDeviceTier`) + runtime FPS governor: weak GPUs
  automatically step down to a static ambient gradient
- Particles capped (≤2.4k), DPR clamped at 1.5, frameloop paused when hidden
- `prefers-reduced-motion`: boot skipped, pins/scrubs disabled, content
  rendered in final resting state
- Project covers are generative canvas code — zero image weight

## Development

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build (all routes static/SSG)
```

### Editing content

All content lives in typed data files — no CMS:

- `src/data/projects.ts` — projects (archive, covers, detail pages update automatically)
- `src/data/skills.ts` — capability map clusters
- `src/data/achievements.ts` — training epochs + publication
- `src/data/education.ts`, `src/data/opportunities.ts`
- `src/lib/constants.ts` — personal info, act definitions

Deployed on Vercel.
