'use client'

import HouseScene from '@/components/canvas/HouseScene'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-black pt-64 pb-24 px-10 md:px-24 z-10 overflow-hidden">
      <div className="scanlines" />
      <HouseScene />

      <div className="max-w-screen-xl mx-auto relative z-10 pointer-events-auto">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-12 h-[1px] bg-white/40" />
          <span className="text-white/40 font-mono text-[9px] tracking-[0.5em] uppercase font-bold">Our Services</span>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-7xl md:text-9xl font-syne font-black uppercase leading-[0.8] mb-32 text-white italic"
        >
          WHAT WE<br/>
          <span className="text-white/20">OFFER.</span>
        </motion.h1>

        {/* Simplified Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-48">
          {[
            { t: "WEBSITE DESIGN", d: "We build fast, modern websites that look great on phones and computers." },
            { t: "UI/UX DESIGN", d: "We design simple and easy-to-use interfaces for your customers." },
            { t: "SOCIAL MEDIA", d: "We handle your Instagram and LinkedIn to help your brand grow." },
            { t: "BRAND IDENTITY", d: "We create your logo and brand style so you look professional." },
            { t: "VIDEO & MOTION", d: "We create simple animations and videos to tell your brand story." },
            { t: "CONSULTING", d: "We help you plan the best way to grow your business online." }
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

        {/* Simplified Comparison */}
        <section className="mb-48">
          <h2 className="text-4xl md:text-6xl font-syne font-black text-white uppercase italic mb-16 text-center">WHY CHOOSE US?<br/><span className="text-white/20">OUR PROMISE.</span></h2>
          
          <div className="clip-panel p-0 overflow-hidden border border-white/10 bg-white/[0.01]">
            <div className="grid grid-cols-2 md:grid-cols-3 border-b border-white/10">
              <div className="p-8 border-r border-white/10 font-mono text-[9px] text-white/20 tracking-[0.5em] uppercase font-bold">Feature</div>
              <div className="p-8 border-r border-white/10 font-mono text-[9px] text-white tracking-[0.5em] uppercase font-black bg-white/5 text-center">WEDO</div>
              <div className="p-8 font-mono text-[9px] text-white/20 tracking-[0.5em] uppercase font-bold text-center hidden md:block">Others</div>
            </div>

            {[
              { f: "Website Speed", w: "Ultra Fast", o: "Slow & Laggy" },
              { f: "Design Style", w: "Modern & Unique", o: "Generic Templates" },
              { f: "Mobile Experience", w: "Perfect on Phones", o: "Hard to Use" },
              { f: "Communication", w: "Direct & Easy", o: "Technical Jargon" },
              { f: "Results", w: "Focus on Growth", o: "Just a Website" }
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-2 md:grid-cols-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                <div className="p-8 border-r border-white/5 font-mono text-[10px] text-white/60 uppercase">{row.f}</div>
                <div className="p-8 border-r border-white/5 font-mono text-[10px] text-white uppercase font-black bg-white/[0.03] text-center">{row.w}</div>
                <div className="p-8 font-mono text-[10px] text-white/20 uppercase text-center hidden md:block">{row.o}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-32 border border-white/5 bg-white/[0.01] clip-panel">
          <h2 className="text-3xl md:text-5xl font-syne font-black text-white uppercase italic mb-12">READY TO START?</h2>
          <Link href="/contact">
            <button className="clip-button scale-110">TALK TO US TODAY →</button>
          </Link>
        </section>
      </div>
    </main>
  )
}
