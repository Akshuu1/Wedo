'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import CustomCursor from '@/components/ui/CustomCursor'
import Navbar from './Navbar'
import Loader from './Loader'
import Footer from './Footer'
import SoundController from '@/components/ui/SoundController'
import TerminalOverlay from '@/components/ui/TerminalOverlay'

export default function ClientLayout({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-black">
      <Loader />
      <Navbar />
      <CustomCursor />
      <SoundController />
      <TerminalOverlay />
      <main className="relative z-10 min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  )
}
