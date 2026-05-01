'use client'

import { useEffect, useState, Suspense } from 'react'
import Navbar from './Navbar'
import Loader from './Loader'
import Footer from './Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import SoundController from '@/components/ui/SoundController'
import SoleChatbot from '@/components/ui/SoleChatbot'
import TerminalOverlay from '@/components/ui/TerminalOverlay'
import dynamic from 'next/dynamic'

const CarLoader = dynamic(() => import('@/components/canvas/CarLoader'), { 
  ssr: false,
})

export default function ClientLayout({ children }) {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Cinematic 3-second loader
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 3) + 1
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => setLoading(false), 900)
          return 100
        }
        return next
      })
    }, 45)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden w-full">
      {/* Global 3D Background — always mounted so car is visible during load */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <CarLoader progress={progress} />
        </Suspense>
      </div>

      {/* Cinematic loader overlay */}
      <Loader loading={loading} progress={progress} />

      {/* Main site — fades in smoothly after loader */}
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.8s ease',
          pointerEvents: loading ? 'none' : 'auto',
          position: 'relative',
        }}
      >
        <Navbar />
        <CustomCursor />
        <SoundController />
        <SoleChatbot />

        <main className="relative z-10">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  )
}
