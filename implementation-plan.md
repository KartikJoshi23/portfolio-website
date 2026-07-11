# Implementation Plan v3 — "Director's Cut"

*Two axes, one goal: make the site feel more like cinema, and make every
interaction feel engineered. Nothing below hijacks scroll, dims text, or
breaks the ordered layouts — those rules are locked from v1/v2 feedback.*

> **Status: awaiting approval.** Nothing gets built until you say go.
> Items marked ⚑ are optional — veto freely.

---

## Part 1 — The Cinematic Layer (feel like film)

### 1.1 The Opening Shot (hero entrance)
Right now the preloader lifts and the hero is simply *there*. Films open
with a move. After the boot lifts: the skyline scene starts ~8% zoomed-in
and slightly raised, then **settles down and back over ~2.5s** (a slow
crane-down) while the name decodes — one-shot entrance, never tied to
scroll. Costs nothing after it plays. Reduced motion: skipped.

### 1.2 Exposure Settle on act changes
Scene crossfades currently just fade. Film cuts "settle": each incoming
scene arrives **very slightly over-bright for ~400ms, then grades down**
into its final look — like an exposure adjusting. Subtle enough that you
feel it rather than see it.

### 1.3 Film Slates (scene annotations)
When you cross into a new act, a small mono chip fades in at the bottom
left for ~2s and dissolves: `scene 04 · training montage`, `scene 05 ·
the latent space`. Cinema's slate/clapboard, in HUD language. One-shot
per act per visit, never blocks anything, hidden on mobile.

### 1.4 Credits Footer
The footer becomes a **micro credits roll**: on scrolling into it, lines
rise like end credits — "Written, directed & engineered by Kartik Joshi" ·
"Cinematography: Three.js & GSAP" · "Shot on location in Dubai" — ending
on the EOF line that's already there. Short (five lines), plays once.

### 1.5 Boot log gets real telemetry
The preloader lines currently say fixed things. Two of them become real:
`> local time in dubai: 21:43 — ok` and `> render tier: high — ok` (from
the actual device probe). Anyone technical will notice it's *live* — that
moment of "wait, this is real" is worth more than any animation.

---

## Part 2 — The Interaction Layer (feel engineered)

### 2.1 Command Palette (⌘K / Ctrl+K) — the flagship
An AI-engineer's portfolio should be *operable*. One keystroke opens a
terminal-styled palette: type to jump to any section, open any project,
download the resume, copy your email, or toggle the field. Fuzzy match,
arrow keys, Enter, Esc. A quiet `⌘K` hint chip sits in the navbar; on
mobile a small floating button opens the same palette. This is the single
most "this person builds tools" interaction a portfolio can have.

### 2.2 Click pulse in the particle field
The cursor already charges nearby particles. A **click anywhere on the
background fires a radial pulse** through the network — a ripple of
brightness propagating outward through the links. One shot, ~1s decay,
pure delight, zero layout impact.

### 2.3 Skill ↔ Project cross-references
The Capability Map and the project data already share names (PyTorch,
FastAPI, Docker…). Hovering a skill pill that's used in a shipped project
shows a tiny chip: `→ used in Sentinel-Gate`. Clicking follows through to
that case study. The map stops being a list and becomes **an index into
the work** — recruiters love receipts.

### 2.4 Context-aware cursor
The custom cursor ring gains a word when it matters: `drag` over the
gallery track, `open` over project panels, `send` over the submit button.
Desktop only, one word, mono type — function labels, not decoration.

### 2.5 Cover tilt
Project covers get a gentle 3D perspective tilt following the cursor
(≤4°, spring-settled) — the TiltCard physics already in the codebase,
applied where eyes actually go. Combined with the existing cover-energy
hover, panels feel alive under the hand.

### 2.6 Terminal acknowledgment on contact
After a successful send, the form prints a response line under the
button, typed out in mono: `ack · signal received — expect a reply within
24h`. Closes the terminal fiction properly instead of just a green state.

### 2.7 Keyboard navigation on case studies ⚑
On project detail pages: ← / → move between projects (the prev/next cards
already exist — this just wires the keys), with a small hint chip.

---

## Part 3 — Decisions I need from you

1. **Sound design ⚑** — a single, very quiet UI "tick" on act boundaries
   and palette open, **off by default** behind a tiny mute toggle in the
   footer. Award-site standard, but genuinely divisive. In or out?
2. **Film slates (1.3)** — comfortable with the scene chips, or too much
   chrome? They're the most "visible" cinematic addition.
3. Anything in Part 2 you'd cut? The palette (2.1) is the anchor; the
   rest are independent.

---

## Part 4 — Build order (each part ends runnable)

| Part | Contents | Risk |
|------|----------|------|
| A | Command palette + navbar hint (2.1) | isolated, new component |
| B | Cinematic entrances: opening shot, exposure settle, slates (1.1–1.3) | touches SceneStage only |
| C | Field interactions: click pulse (2.2) + context cursor (2.4) | small, additive |
| D | Cross-refs + tilt + terminal ack (2.3, 2.5, 2.6) | per-section, independent |
| E | Boot telemetry + credits footer (1.5, 1.4) + optional 2.7 | trivial |
| F | Verification: build, reduced-motion, mobile, perf, localhost review | — |

Constraints carried forward: no vertical-scroll capture anywhere, all text
on imagery stays `.text-legible`, everything honors reduced motion and the
device-tier governor, mobile gets equivalent (not amputated) experiences.

---

*⏸ Awaiting your call on Part 3's three questions + overall approval.*
