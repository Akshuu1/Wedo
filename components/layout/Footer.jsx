'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function MissionClock() {
  const [elapsed, setElapsed] = useState('00:00:00')
  useEffect(() => {
    const start = Date.now()
    const t = setInterval(() => {
      const s = Math.floor((Date.now() - start) / 1000)
      const h = String(Math.floor(s / 3600)).padStart(2, '0')
      const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
      const sc = String(s % 60).padStart(2, '0')
      setElapsed(`${h}:${m}:${sc}`)
    }, 1000)
    return () => clearInterval(t)
  }, [])
  return <span className="text-white/50 font-mono text-[10px] tracking-widest">{elapsed}</span>
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [stars, setStars] = useState([])

  useEffect(() => {
    const generatedStars = [...Array(60)].map((_, i) => ({
      width: Math.random() > 0.9 ? '2px' : '1px',
      height: Math.random() > 0.9 ? '2px' : '1px',
      left: `${(i / 60) * 100}%`,
      top: `${10 + Math.random() * 80}%`,
      background: Math.random() > 0.95 ? '#E8002D' : '#ffffff',
      opacity: 0.2 + Math.random() * 0.6,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 3}s`
    }))
    setStars(generatedStars)
  }, [])

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/10">
      {/* Starfield strip at top */}
      <div className="w-full h-[60px] relative bg-black overflow-hidden">
        {stars.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: s.width,
              height: s.height,
              left: s.left,
              top: s.top,
              background: s.background,
              opacity: s.opacity,
              animation: `star-twinkle ${s.animationDuration} infinite`,
              animationDelay: s.animationDelay
            }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="py-24 px-10 md:px-24 bg-black/60 backdrop-blur-xl">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">

            {/* Brand */}
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-syne font-black text-white italic mb-2">
                WEDO<span className="text-[#E8002D]">.</span>
              </h2>
              <div className="text-[10px] font-mono text-white/60 uppercase tracking-[0.5em] mb-6">Mission_Control // Digital Studio</div>
              <p className="text-white/60 font-mono text-[12px] tracking-widest uppercase max-w-md leading-relaxed">
                ARCHITECTING DIGITAL WEAPONS FOR THE BOLD.<br />
                BUILT WITH SPEED, SCALED WITH PRECISION.
              </p>
            </div>

            {/* Links */}
            <div>
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] mb-6">Database</div>
              <ul className="space-y-4">
                {['Home', 'Services', 'Work', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="group flex items-center gap-3 w-fit">
                      <div className="w-1 h-1 bg-white/20 group-hover:bg-[#E8002D] transition-colors" />
                      <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest group-hover:text-white transition-colors">
                        {item}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Comms */}
            <div>
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] mb-6">Comms</div>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:hello@wedo.com" className="group flex items-center gap-3 w-fit">
                    <div className="w-1 h-1 bg-white/20 group-hover:bg-[#E8002D] transition-colors" />
                    <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest group-hover:text-white transition-colors">
                      Email
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className="group flex items-center gap-3 w-fit">
                    <div className="w-1 h-1 bg-white/20 group-hover:bg-[#E8002D] transition-colors" />
                    <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest group-hover:text-white transition-colors">
                      Instagram
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className="group flex items-center gap-3 w-fit">
                    <div className="w-1 h-1 bg-white/20 group-hover:bg-[#E8002D] transition-colors" />
                    <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest group-hover:text-white transition-colors">
                      LinkedIn
                    </span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
            <div className="text-[10px] font-mono text-white/50 uppercase tracking-[0.3em] text-center md:text-left">
              © {currentYear} WEDO STUDIO. ALL SYSTEMS SECURE.
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">SYSTEM ONLINE</span>
              </div>
              <MissionClock />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
