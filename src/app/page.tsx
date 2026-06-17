/* ==========================================================
 * PAGE.TSX — Blueprint v4.0
 * Main page: assembles all sections in updated order
 * Background: FloatingParticles + AuroraBackground
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
import FloatingParticles from '@/components/ui/FloatingParticles'
import NeuralField from '@/components/ui/NeuralField'
import ChapterRail from '@/components/ui/ChapterRail'
import Choreograph from '@/components/ui/Choreograph'
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
      {/* Navbar */}
      <Navbar />

      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Chapter navigation rail (desktop) */}
      <ChapterRail />

      {/* Custom Cursor */}
      <CursorTrail />

      {/* Preloader */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* Ambient background layers */}
      <NeuralField />
      <FloatingParticles />

      <main id="main-content" className="relative z-10">
        <Hero animateEntrance={preloaderDone} />

        {/* Lower content: a soft obsidian wash keeps text readable while
            the live strands still flow through the gaps. Each block is
            choreographed to rise + settle as it crosses the viewport. */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 -top-40 h-40 bg-linear-to-b from-transparent to-obsidian/70" />
          <div className="relative bg-obsidian/70">
            <Choreograph intensity={0.6}><CredibilityStrip /></Choreograph>
            <Choreograph><WhatSetsApart /></Choreograph>
            <Choreograph><FeaturedWork /></Choreograph>
            <Choreograph><TrackRecord /></Choreograph>
            <Choreograph><TechStack /></Choreograph>
            <Choreograph><Education /></Choreograph>
            <Choreograph><Opportunities /></Choreograph>
            <Choreograph intensity={0.6}><Contact /></Choreograph>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
