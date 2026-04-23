'use client'

import HouseScene from '@/components/canvas/HouseScene'
import { motion } from 'framer-motion'

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-black pt-64 pb-24 px-10 md:px-24 z-10 overflow-hidden">
      <div className="scanlines" />
      <HouseScene />

      <div className="max-w-screen-xl mx-auto relative z-10 pointer-events-auto">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-12 h-[1px] bg-white/40" />
          <span className="text-white/40 font-mono text-[9px] tracking-[0.5em] uppercase font-bold">Protocol_04 // Service_Capabilities</span>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-7xl md:text-9xl font-syne font-black uppercase leading-[0.8] mb-32 text-white italic"
        >
          CAPABILITY<br/>
          <span className="text-white/20">MATRIX.</span>
        </motion.h1>

        {/* Capability Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-64">
          {[
            { t: "WEBSITE DEVELOPMENT", d: "High-performance, scalable web architecture built with Next.js and Three.js." },
            { t: "UI/UX DESIGN", d: "Cinematic, user-centric interfaces that blend brutalism with luxury aesthetics." },
            { t: "SOCIAL HANDLING", d: "Aesthetic curation and growth strategy to scale your brand's digital presence." },
            { t: "BRAND IDENTITY", d: "Strategic visual identities that establish authority and market sovereignty." },
            { t: "MOTION GRAPHICS", d: "High-fidelity animations and 3D visual effects for immersive storytelling." },
            { t: "STRATEGIC CONSULTING", d: "Data-driven roadmaps to navigate the complex digital landscape." }
          ].map((service, i) => (
            <div key={i} className="clip-panel p-12 hover:bg-white/5 group transition-all">
              <div className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/20 font-mono text-[8px] mb-8 group-hover:border-white group-hover:text-white transition-all">
                0{i+1}
              </div>
              <h3 className="text-2xl font-syne font-black text-white uppercase italic mb-6 leading-none">{service.t}</h3>
              <p className="text-white/40 font-mono text-[10px] tracking-widest uppercase leading-relaxed">{service.d}</p>
            </div>
          ))}
        </div>

        {/* Comparison Matrix: Why WeDo? */}
        <section className="mb-64">
          <h2 className="text-4xl md:text-6xl font-syne font-black text-white uppercase italic mb-24 text-center">WHY WE DO?<br/><span className="text-white/20">STRATEGIC_EDGE.</span></h2>
          
          <div className="clip-panel p-0 overflow-hidden border border-white/10 bg-white/[0.01]">
            <div className="grid grid-cols-3 border-b border-white/10">
              <div className="p-8 border-r border-white/10 font-mono text-[9px] text-white/20 tracking-[0.5em] uppercase font-bold">Feature</div>
              <div className="p-8 border-r border-white/10 font-mono text-[9px] text-white tracking-[0.5em] uppercase font-black bg-white/5 text-center">WEDO COMMAND</div>
              <div className="p-8 font-mono text-[9px] text-white/20 tracking-[0.5em] uppercase font-bold text-center">Others</div>
            </div>

            {[
              { f: "Performance (Lighthouse)", w: "95+ Score", o: "60-70 Average" },
              { f: "Design Language", w: "Cinematic Brutalism", o: "Generic Templates" },
              { f: "Architecture", w: "Scalable Systems", o: "Monolithic Bloat" },
              { f: "Strategic Intent", w: "Market Sovereignty", o: "Simple Presence" },
              { f: "User Interaction", w: "High-Fidelity SFX/Motion", o: "Static Interactions" }
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                <div className="p-8 border-r border-white/5 font-mono text-[10px] text-white/60 uppercase">{row.f}</div>
                <div className="p-8 border-r border-white/5 font-mono text-[10px] text-white uppercase font-black bg-white/[0.03] text-center">{row.w}</div>
                <div className="p-8 font-mono text-[10px] text-white/20 uppercase text-center">{row.o}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-40 border border-white/5 bg-white/[0.01] clip-panel">
          <div className="hud-grid opacity-10" />
          <h2 className="text-3xl md:text-5xl font-syne font-black text-white uppercase italic mb-12">READY TO DEPLOY?</h2>
          <Link href="/contact">
            <button className="clip-button scale-110">INITIATE MISSION PROTOCOL →</button>
          </Link>
        </section>
      </div>
    </main>
  )
}

import Link from 'next/link'
