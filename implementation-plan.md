# Implementation Plan v2 — "The Forward Pass: Grounded"

*Taking the site from "impressive dark portfolio" to "cinematic experience" —
by grounding the abstract network in the real world, with photography-driven
scenes and a scroll experience no template can produce.*

> **Status: awaiting approval.** v1 (the Forward Pass overhaul) is live on
> localhost and approved in structure. This plan covers the experience upgrade
> you asked for: real-world imagery, richer storyline, and a signature
> scrolling experience. Nothing below gets built until you say go.

---

## 1. The Concept

v1 tells the story of a signal moving through a network — but the story lives
entirely in abstract space (particles, lines, glyphs). v2 grounds each act of
that story in the **real world where your work actually happens**:

> *A signal is abstract. The places it changes are real.*

Concretely: a full-screen, slowly-moving **photographic scene** sits behind
each act, graded into the site's obsidian/violet/cyan palette so it reads as
one visual system with the particle field — not a stock-photo collage. As you
scroll between acts, the world behind the content **changes with the story**:

| Act | Scene behind it | Why |
|-----|-----------------|-----|
| INPUT (hero) | Dubai skyline at night, long-exposure | where you are — the city as a circuit |
| REPRESENTATION (about) | dark workspace / code on glass | where the thinking happens |
| INFERENCE (work) | scene dims to near-black | the work IS the visual — panels stay the hero |
| TRAINING (proof) | stadium/arena lights or hackathon crowd | competition under pressure |
| LATENT SPACE (skills) | star field / observatory sky | the map metaphor, literalized |
| BACKPROP (education) | SP Jain / campus architecture lines | where the weights formed |
| OUTPUT (contact) | dawn horizon over the city | the signal leaves the network |

Between key acts, two **cinematic interludes** (see §3) give the site the
"chapter" feeling of award-winning editorial sites.

---

## 2. The Scene Stage (the core new system)

One fixed, full-viewport background layer — the "stage" — that lives behind
everything (below the particle field, above the base color):

- **Crossfade on act change.** An IntersectionObserver watches act boundaries
  (same mechanism the particle field already uses). Scenes crossfade over
  ~900ms with a subtle scale settle (1.06 → 1.0) — no hard cuts.
- **Depth on scroll.** Each scene parallaxes slowly (GSAP scrub, ±6% y) so the
  world feels deep behind the content, never wallpaper-flat.
- **Palette grading, in CSS.** Every image gets the same treatment: heavy
  obsidian multiply + violet/cyan duotone tint + vignette + the existing film
  grain. Result: photographs that look like they were shot inside the site.
- **Legibility guarantee.** A radial content-shadow behind text columns at all
  times; scenes run at 20–35% final opacity. The obsidian wash from v1 stays.
- **Discipline.** The particle field stays on top — the two layers share the
  palette, so the network appears to float *in* the world.

**Performance:** scenes are next/image with AVIF, ~1600px wide, blurred
placeholders, lazy-loaded one act ahead; only the active + adjacent scene stay
mounted. Low-tier devices and reduced-motion get a single static graded image
(hero) or none. Target: no measurable LCP change (hero text renders first).

---

## 3. Cinematic Interludes (the "wow" scroll moments)

Two full-bleed pinned moments, placed at the story's turning points. Each pins
for ~1.5 viewport heights while three things happen on scrub:

1. The photograph **Ken-Burns scales** (1.15 → 1.0) and its duotone lifts
   slightly — like an image developing.
2. An oversized editorial statement reveals **through a text mask**, line by
   line, locked to scroll progress.
3. A thin HUD frame draws itself around the viewport edges.

- **Interlude I — after About, before Work:**
  Dubai skyline scene. Copy: *"Trained in theory. **Deployed in Dubai.**"*
  — sets up the work gallery as "what got deployed."
- **Interlude II — after Opportunities, before Contact:**
  Dawn/horizon scene. Copy: *"The next model is **always in training.**"*
  — sets up contact as an invitation, not a form.

Mobile: interludes become non-pinned full-bleed images with the same masked
text reveal (no pin on touch — same rule as the gallery).

---

## 4. Scroll Experience Upgrades (site-wide)

- **Scroll velocity awareness.** Lenis velocity feeds two things: the particle
  field's drift energy (fast scroll = the network streams) and a ±1.5°
  skew-settle on the work panels while traversing — the signature "alive"
  feel of high-end sites, kept subtle.
- **Act-boundary signal flashes.** Crossing into a new act fires a one-shot
  thin horizontal light-line sweep at the viewport edge + the ChapterRail
  entry pulses — the "you've entered a new layer" beat.
- **Hero exit upgrade.** As the hero scrolls out, the skyline scene scale-
  pushes forward slightly (dolly-in) — you scroll *into* the city.
- **Work gallery depth.** While panels traverse horizontally, the near-black
  stage drifts opposite at 10% speed — real parallax depth behind the cards.
- Everything stays inside v1's ordered layouts — motion adds depth, not chaos.

---

## 5. Asset Plan (needs your input — see approval note)

Seven images total (2 interlude "hero" shots + 5 scene backdrops). Because
they're heavily graded and dimmed, they must be **high-resolution, dark-toned,
simple compositions** — busy images will fight the content.

**Option A (recommended, most authentic):** you provide personal shots —
Dubai skyline from your area, SP Jain campus, a hackathon photo, your
workspace. Anything ≥1920px wide works; I grade them to match.

**Option B:** I source them from **Unsplash** (free license, commercial use,
no attribution required — safe for a portfolio). I'd pick: Dubai skyline
night, dark code-on-screen macro, stadium lights, star field, modern
architecture lines, dawn horizon. **I'll need your explicit OK to download
these** — I'll list the exact photos I chose in the build report so you can
veto any.

**Option A+B mix** is fine (e.g., your Dubai photo + Unsplash star field).

Also optional, same mechanism for later: real screenshots of AlgoViz /
Scanner / Traffic dashboards could replace or sit behind the generative
covers on detail pages. Not required for this phase.

---

## 6. What Does NOT Change

Per your feedback so far, these are locked: hero headshot + gradient ring,
restrained type scale, uniform project panels, ordered bento Capability Map,
shimmer tagline, ~4s preloader, all v1 content and data files.

---

## 7. Build Parts (sequential, each ends runnable)

- **Part A — Scene Stage system**: the fixed stage layer, act-boundary
  crossfades, grading treatment, parallax scrub, tier/reduced-motion
  fallbacks. Ships with temporary gradient placeholders so it's reviewable
  before final images land.
- **Part B — Assets in**: your photos and/or approved Unsplash set, AVIF
  conversion, blur placeholders, per-scene grading tuned.
- **Part C — Interludes I & II**: pinned Ken-Burns + masked editorial text +
  HUD frame; mobile fallback.
- **Part D — Scroll feel**: velocity-reactive field + panel skew, act-boundary
  light sweeps, hero dolly-out, gallery parallax depth.
- **Part E — Verification**: production build, perf audit (LCP/CLS budgets),
  reduced-motion pass, mobile sweep, then localhost review.

---

*⏸ Awaiting your approval on: (1) the overall concept, (2) the scene/interlude
copy in §1/§3, and (3) the asset route — Option A (your photos), Option B
(Unsplash, with your OK to download), or a mix.*
