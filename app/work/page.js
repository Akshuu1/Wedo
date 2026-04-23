'use client'

import HouseScene from '@/components/canvas/HouseScene'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ScrambleText from '@/components/ui/ScrambleText'

const MISSIONS = [
  { id: 'tech-nexus', t: "TechNexus Command", d: "High-performance digital system for real-time visualization.", type: "SYSTEM", year: "2026" },
  { id: 'novastream', t: "NovaStream Engine", d: "Cinematic media streaming architecture with 98+ performance.", type: "ENGINE", year: "2025" },
  { id: 'zeropoint', t: "ZeroPoint Identity", d: "Visually aggressive brand sovereignty for high-tier fintech.", type: "IDENTITY", year: "2026" }
]

export default function WorkPage() {
  return (
    <main className="relative min-h-screen bg-black pt-64 pb-24 px-10 md:px-24 z-10 overflow-hidden">
      <div className="scanlines" />
      <HouseScene />

      <div className="max-w-screen-xl mx-auto relative z-10 pointer-events-auto">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-12 h-[1px] bg-white/40" />
          <span className="text-white/40 font-mono text-[9px] tracking-[0.5em] uppercase font-bold">Protocol_03 // Mission_Logs</span>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-7xl md:text-9xl font-syne font-black uppercase leading-[0.8] mb-32 text-white italic"
        >
          ACTIVE<br/>
          <span className="text-white/20">MISSIONS.</span>
        </motion.h1>

        {/* Mission Grid */}
        <div className="grid grid-cols-1 gap-12">
          {MISSIONS.map((mission, i) => (
            <Link key={mission.id} href={`/work/${mission.id}`}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative clip-panel p-10 md:p-16 hover:bg-white/5 transition-all cursor-pointer border border-white/10"
              >
                <div className="hud-grid opacity-10" />
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em]">{mission.type} // {mission.year}</span>
                      <div className="w-8 h-[1px] bg-white/10" />
                    </div>
                    <h3 className="text-4xl md:text-6xl font-syne font-black text-white uppercase italic mb-4 group-hover:translate-x-4 transition-transform duration-500">
                      <ScrambleText text={mission.t} delay={500 + (i * 200)} />
                    </h3>
                    <p className="text-white/40 text-lg md:text-xl font-sans italic max-w-xl">{mission.d}</p>
                  </div>
                  <div className="w-16 h-16 border border-white/20 flex items-center justify-center text-white/20 font-mono text-xs group-hover:border-white group-hover:text-white transition-all rounded-full group-hover:rotate-45">
                    →
                  </div>
                </div>
                
                {/* HUD Elements */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <div className="w-1 h-1 bg-white/20" />
                  <div className="w-1 h-1 bg-white/20" />
                  <div className="w-1 h-1 bg-white/20 animate-pulse" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
