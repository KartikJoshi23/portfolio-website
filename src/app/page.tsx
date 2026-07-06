/* ==========================================================
 * PAGE.TSX — "The Forward Pass"
 * The homepage as a five-act narrative: INIT (preloader) →
 * INPUT (hero) → REPRESENTATION (about) → INFERENCE (work) →
 * TRAINING (proof/skills/education) → OUTPUT (contact).
 * One persistent WebGL particle field (CanvasRoot) morphs
 * between formations as the acts change.
 * ========================================================== */
"use client"

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Preloader from '@/components/sections/Preloader'
import Hero from '@/components/sections/Hero'
import WhatSetsApart from '@/components/sections/WhatSetsApart'
import FeaturedWork from '@/components/sections/FeaturedWork'
import TechStack from '@/components/sections/TechStack'
import TrackRecord from '@/components/sections/TrackRecord'
import Education from '@/components/sections/Education'
import Opportunities from '@/components/sections/Opportunities'
import Contact from '@/components/sections/Contact'
import Interlude from '@/components/sections/Interlude'
import SceneStage from '@/components/scene/SceneStage'
import CanvasRoot from '@/components/webgl/CanvasRoot'
import ChapterRail from '@/components/ui/ChapterRail'
import CredibilityStrip from '@/components/ui/CredibilityStrip'
import ScrollProgressBar from '@/components/ui/ScrollProgressBar'
import CursorTrail from '@/components/ui/CursorTrail'

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    // Preserve deep-link to a section (e.g. arriving from /projects via "#work")
    if (!window.location.hash) {
      window.scrollTo(0, 0)
    }
  }, [])

  // Once content is mounted, honor an incoming hash by smooth-scrolling to it.
  useEffect(() => {
    if (!preloaderDone) return
    const hash = window.location.hash
    if (!hash) return
    const el = document.getElementById(hash.replace('#', ''))
    if (el) {
      requestAnimationFrame(() =>
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      )
    }
  }, [preloaderDone])

  return (
    <>
      <Navbar />
      <ScrollProgressBar />
      <ChapterRail />
      <CursorTrail />

      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* The photographic world behind the network (crossfades per act) */}
      <SceneStage />

      {/* The persistent particle field — the site's connective tissue */}
      <CanvasRoot />

      <main id="main-content" className="relative z-10">
        <Hero animateEntrance={preloaderDone} />

        {/* Lower acts: a soft obsidian wash keeps text readable while
            the field still shows through. Each section owns its own
            scroll choreography — no shared wrapper animation. */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 -top-40 h-40 bg-linear-to-b from-transparent to-obsidian/60" />
          <div className="relative bg-obsidian/60">
            <CredibilityStrip />
            <WhatSetsApart />
            <Interlude
              id="interlude-dubai"
              image="/scenes/interlude-dubai.jpg"
              label="interlude / deployment"
              lines={[
                { text: 'Trained in theory.' },
                { text: 'Deployed in Dubai.', em: true },
              ]}
              objectPosition="center 60%"
            />
            <FeaturedWork />
            <TrackRecord />
            <TechStack />
            <Education />
            <Opportunities />
            <Interlude
              id="interlude-dawn"
              image="/scenes/dawn.jpg"
              label="interlude / continuation"
              lines={[
                { text: 'The next model is' },
                { text: 'always in training.', em: true },
              ]}
              objectPosition="center 35%"
            />
            <Contact />
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
