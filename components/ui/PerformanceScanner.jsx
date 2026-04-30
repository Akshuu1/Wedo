'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export default function PerformanceScanner() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setPercent(prev => {
          if (prev >= 98) {
            clearInterval(interval)
            return 98
          }
          return prev + 1
        })
      }, 30)
      return () => clearInterval(interval)
    }
  }, [isInView])

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto py-24 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left: Visualization */}
        <div className="relative aspect-square bg-white/[0.02] border border-white/10 rounded-full flex items-center justify-center overflow-hidden group">
          <div className="hud-grid opacity-[0.05]" />
          
          {/* Rotating Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 border border-dashed border-white/10 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-12 border border-dashed border-[#E8002D]/20 rounded-full"
          />

          <div className="text-center relative z-10">
            <motion.div 
              className="text-8xl md:text-9xl font-syne font-black text-white italic leading-none"
            >
              {percent}<span className="text-[#E8002D] text-4xl md:text-5xl">%</span>
            </motion.div>
            <div className="font-mono text-[10px] text-white/40 uppercase tracking-[0.4em] mt-4">Speed Boost</div>
          </div>

          {/* Scanning Line */}
          <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 w-full h-[2px] bg-[#E8002D] shadow-[0_0_15px_#E8002D] z-20 pointer-events-none"
          />
        </div>

        {/* Right: Content */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-[#E8002D]" />
            <span className="font-mono text-[11px] text-[#E8002D] uppercase tracking-[0.5em] font-bold">Speed Test Result</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-syne font-black text-white uppercase italic leading-[0.9]">
            WE BUILD <br/>
            <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', color: 'transparent' }}>WEBSITES THAT</span> <br/>
            NEVER <span className="text-[#E8002D]">SLOW DOWN.</span>
          </h2>

          <p className="text-white/50 text-lg leading-relaxed font-light">
            Most websites are slow and lose customers. <br/>
            Our <span className="text-white font-medium">WEDO Method</span> makes your site load instantly so your customers stay happy and keep buying.
          </p>

          <div className="grid grid-cols-2 gap-8 pt-8">
            <div className="space-y-2">
              <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Google Speed Score</div>
              <div className="text-2xl font-syne font-bold text-white italic">99/100</div>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Loading Time</div>
              <div className="text-2xl font-syne font-bold text-white italic">0.4 Seconds</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
