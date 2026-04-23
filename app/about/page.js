'use client'

import HouseScene from '@/components/canvas/HouseScene'
import { motion } from 'framer-motion'

const TEAM = [
  { name: "Akshat", role: "Developer", bio: "Passionate about building fast, reliable, and beautiful web systems." },
  { name: "Sneha", role: "Designer", bio: "Creative expert focused on making apps and websites look professional and premium." }
]

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black pt-48 pb-24 px-10 md:px-24 z-10 overflow-hidden">
      <div className="scanlines" />
      <HouseScene />

      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-12 h-[1px] bg-white/40" />
          <span className="text-white/40 font-mono text-[9px] tracking-[0.5em] uppercase font-bold">About WeDo</span>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-9xl font-syne font-black uppercase leading-[0.8] mb-24 text-white italic"
        >
          WE ARE<br/>
          <span className="text-white/20">WEDO.</span>
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-48">
          <div>
            <h2 className="text-3xl font-syne font-black text-white uppercase italic mb-8">Our Mission</h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              We started WeDo because we saw how difficult it was for businesses to get high-quality digital work without getting lost in technical jargon.
            </p>
            <p className="text-white/50 text-lg leading-relaxed">
              Our goal is simple: We build the digital tools you need to grow your business, handle your online presence, and make sure you look professional from day one.
            </p>
          </div>
          <div className="clip-panel p-12 bg-white/[0.02] border border-white/10">
            <h3 className="text-xl font-syne font-black text-white uppercase italic mb-6">Our Values</h3>
            <ul className="space-y-6">
              {[
                { t: "Honesty", d: "We are clear about what we can do and how long it will take." },
                { t: "Quality", d: "We don't cut corners. Every line of code and every design is crafted with care." },
                { t: "Growth", d: "Your success is our success. We want to see your business thrive." }
              ].map((item, i) => (
                <li key={i}>
                  <div className="text-white font-bold uppercase text-[10px] tracking-widest mb-1">{item.t}</div>
                  <div className="text-white/30 text-[10px] leading-relaxed uppercase">{item.d}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-48">
          <h2 className="text-4xl font-syne font-black text-white uppercase italic mb-16 text-center">The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {TEAM.map((member, i) => (
              <div key={i} className="group p-10 border border-white/5 hover:border-white/20 transition-all bg-white/[0.01]">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-3xl font-syne font-black text-white uppercase italic">{member.name}</h3>
                    <p className="text-white/30 font-mono text-[9px] uppercase tracking-widest mt-1">{member.role}</p>
                  </div>
                  <div className="w-12 h-[1px] bg-white/10" />
                </div>
                <p className="text-white/40 leading-relaxed text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-syne font-black text-white uppercase italic mb-12">How We Work</h2>
          <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Listen", "Plan", "Build", "Launch"].map((step, i) => (
              <div key={i}>
                <div className="text-white/10 font-syne font-black text-5xl mb-4">0{i+1}</div>
                <div className="text-white uppercase font-bold text-[10px] tracking-widest">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
