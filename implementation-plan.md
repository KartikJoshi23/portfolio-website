# Implementation Plan v4 — "Final Reel"

*Benchmark: the @jerrythewebdev / creative-dev scene (kinetic typography,
velocity marquees, curved wipes, letter-roll hovers, stacking decks).
Filtered through this site's locked rules: no scroll capture, readability
first, ordered layouts, nothing overdone.*

> **Status: awaiting approval.**

---

## 0. Honest audit vs. that scene

Already ahead of it: morphing WebGL field, graded photo scenes, live boot
telemetry, ⌘K palette, generative covers. What that scene has that we
genuinely lack: **a kinetic type identity** (their #1 signature), **one
velocity-reactive marquee**, **a curved route wipe**, and **detail-page
parity** (our case studies are plainer than our homepage). Their cursor
image-trails and scroll-jacked galleries: deliberately skipped — they'd
break our rules.

---

## Part A — Kinetic Type System (the identity upgrade)
1. **Char-level masked heading reveals** site-wide: every section heading
   rises per-character from behind a mask with a 2° rotation that
   straightens — one consistent, recognizable motion signature
   (upgrades the existing SplitText, honors reduced motion).
2. **Letter-roll hovers** on nav links + footer links: on hover each
   character rolls up and is replaced from below, staggered ~20ms.
   The micro-interaction that scene is famous for; cheap; site-wide.

## Part B — The Data Tape (one marquee, done right)
A single full-bleed mono strip between About and the Deployment Log
title card: `APPLIED AI · SHIPPED ▸ DUBAI ▸ TOP 10 GLOBAL ▸ PUBLISHED ▸`
looping infinitely, **speed and skew reacting to scroll velocity** (the
bus already exists). Styled as HUD tape (thin rules above/below, low
contrast) so it reads as system chrome, not advertising. One only.

## Part C — Cinematic Connections
1. **Curved route wipe**: the flat obsidian panel in route transitions
   becomes the classic curved-edge SVG wipe (bulges in the direction of
   travel, settles flat) — same duration, dramatically better shape.
2. **Case-study parity pass**: detail pages get the scene treatment —
   a dim graded backdrop, char-masked title, metrics that count up,
   and the same act-label voice. Recruiters deep-link here; it must
   feel like the same film.
3. **404 "signal lost"** page: particle field + decode text
   `404 · signal lost — rerouting`, one button home. Completes the world.

## Part D — Depth Details (all micro, all optional-feel)
1. Panel index numerals parallax slightly against their card on hover.
2. Education/Proof cards get the cover-tilt treatment (consistency).
3. Marquee + slates + tape all disabled under reduced motion (as ever).

## Part E — Verification
tsc/eslint/build, reduced-motion, mobile, no-overlap sweep at 1366/1536,
localhost review.

**Explicitly skipped from that scene** (violates locked rules): cursor
image trails (fights the signal probe), scroll-hijacked horizontal
sections (rejected three times), stacking sticky decks (trap-adjacent),
noise/liquid distortion on text (readability).

---

*⏸ Approve as-is, or veto any lettered part.*
