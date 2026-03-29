/* ==========================================================
 * PAGE.TSX — Blueprint v4.0
 * Main page: assembles all sections in updated order
 * Background: FloatingParticles + BackgroundOrbs
 * ========================================================== */
"use client"

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Preloader from '@/components/sections/Preloader'
import Hero from '@/components/sections/Hero'
import WhatSetsApart from '@/components/sections/WhatSetsApart'
import SelectedWork from '@/components/sections/SelectedWork'
import TechStack from '@/components/sections/TechStack'
import TrackRecord from '@/components/sections/TrackRecord'
import Education from '@/components/sections/Education'
import Opportunities from '@/components/sections/Opportunities'
import Contact from '@/components/sections/Contact'
import FloatingParticles from '@/components/ui/FloatingParticles'
import BackgroundOrbs from '@/components/ui/BackgroundOrbs'
import CredibilityStrip from '@/components/ui/CredibilityStrip'
import ScrollProgressBar from '@/components/ui/ScrollProgressBar'
import CursorTrail from '@/components/ui/CursorTrail'

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Custom Cursor */}
      <CursorTrail />

      {/* Preloader */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* Ambient background layers */}
      <FloatingParticles />
      <BackgroundOrbs />

      <main id="main-content">
        <Hero animateEntrance={preloaderDone} />
        <CredibilityStrip />
        <WhatSetsApart />
        <SelectedWork />
        <TrackRecord />
        <TechStack />
        <Education />
        <Opportunities />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
