'use client'

import HouseScene from '@/components/canvas/HouseScene'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PinContainer } from '@/components/ui/3d-pin'
import { useRef } from 'react'

const TEAM = [
  { name: "Akshat", role: "Developer", bio: "Engineering high-performance systems with a focus on speed and aesthetic precision.", color: "from-blue-500 to-cyan-500" },
  { name: "Sneha", role: "Designer", bio: "Crafting luxury minimalist experiences that turn brand stories into visual masterpieces.", color: "from-purple-500 to-pink-500" }
]

function FadeInText({ text, className }) {
  return (
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {text}
    </motion.p>
  )
}

export default function AboutPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  return (
    <main ref={containerRef} className="relative min-h-screen bg-black pt-48 pb-48 px-6 md:px-24 z-10 overflow-hidden">
      <div className="scanlines" />
      <HouseScene />

      {/* Hero Header with Splitted Design */}
      <motion.div style={{ opacity, scale }} className="max-w-screen-xl mx-auto relative z-10 mb-64">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-12 h-[1px] bg-white/40" />
          <span className="text-white/40 font-mono text-[9px] tracking-[0.5em] uppercase font-bold">The Studio</span>
        </div>

        <h1 className="text-6xl md:text-[12rem] font-syne font-black uppercase leading-[0.75] mb-8 text-white italic tracking-tighter flex flex-col">
          <div className="flex overflow-hidden">
             <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}>PURE</motion.span>
          </div>
          <div className="flex overflow-hidden">
             <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }} className="text-white/10 text-outline">VISION.</motion.span>
          </div>
        </h1>
      </motion.div>

      {/* Mission Section with Interactive Cards */}
      <section className="max-w-screen-xl mx-auto relative z-10 mb-80">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
          <div className="sticky top-48">
            <h2 className="text-4xl font-syne font-black text-white uppercase italic mb-12 flex items-center gap-4">
              <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] not-italic">01</span>
              Our Mission
            </h2>
            <div className="space-y-12">
              <FadeInText 
                text="We started WeDo because the digital world became too complicated. Too many buzzwords, not enough results."
                className="text-white/70 text-2xl md:text-4xl font-syne font-medium leading-[1.1] italic"
              />
              <FadeInText 
                text="Our goal is to bring back clarity. We build the high-end tools you need to dominate your market, minus the headache."
                className="text-white/40 text-lg md:text-xl leading-relaxed"
              />
            </div>
          </div>

          <div className="space-y-8">
            {[
              { t: "Honesty", d: "Zero jargon. Pure transparency in timelines and capabilities." },
              { t: "Precision", d: "Every pixel and every line of code serves a specific business purpose." },
              { t: "Dominance", d: "We don't just help you compete; we help you own your digital space." }
            ].map((val, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="clip-panel p-12 bg-white/[0.01] border border-white/5 hover:border-white/20 transition-all group overflow-hidden relative"
              >
                <div className="hud-grid opacity-5" />
                <h3 className="text-2xl font-syne font-black text-white uppercase italic mb-4 group-hover:translate-x-2 transition-transform">{val.t}</h3>
                <p className="text-white/30 text-sm uppercase tracking-widest leading-relaxed">{val.d}</p>
                <div className="absolute top-0 right-0 p-4 text-[10px] font-mono text-white/5 uppercase">Value_0{i+1}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with Enhanced 3D Interaction */}
      <section className="mb-80 relative z-10">
        <div className="text-center mb-48">
           <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.8em] mb-4">Core Operatives</div>
           <h2 className="text-5xl md:text-8xl font-syne font-black text-white uppercase italic tracking-tighter">THE TEAM.</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-48 md:gap-12 max-w-6xl mx-auto">
          {TEAM.map((member, i) => (
            <div key={i} className="flex items-center justify-center">
              <PinContainer
                title={member.role}
                href={`#`}
                containerClassName="w-full"
              >
                <div className="flex basis-full flex-col p-10 tracking-tight text-slate-100/50 sm:basis-1/2 w-[22rem] h-[24rem] bg-black group/card relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-50" />
                  <div className="relative z-10">
                    <h3 className="max-w-xs !pb-2 !m-0 font-syne font-black text-4xl text-white uppercase italic tracking-tighter">
                      {member.name}
                    </h3>
                    <div className="text-[10px] !m-0 !p-0 font-mono text-white/40 uppercase tracking-[0.4em] mb-8">
                      {member.role}
                    </div>
                    <div className="w-full h-[1px] bg-white/10 mb-8" />
                    <p className="text-base text-white/50 leading-relaxed italic font-light">
                      "{member.bio}"
                    </p>
                  </div>
                  <div className="absolute bottom-6 right-6 w-12 h-12 border border-white/10 flex items-center justify-center font-mono text-[8px] text-white/20 uppercase group-hover/card:border-white group-hover/card:text-white transition-all">
                    WD_0{i+1}
                  </div>
                </div>
              </PinContainer>
            </div>
          ))}
        </div>
      </section>

      {/* How We Work - High End Reveal */}
      <section className="text-center relative z-10 py-32 border-t border-white/5">
        <h2 className="text-4xl md:text-7xl font-syne font-black text-white uppercase italic mb-24">HOW WE WORK.</h2>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {["Listen", "Plan", "Build", "Launch"].map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative py-12 border border-white/5 bg-white/[0.01] clip-panel group hover:bg-white/[0.03] transition-all"
            >
              <div className="text-white/5 font-syne font-black text-9xl absolute -top-4 left-1/2 -translate-x-1/2 select-none group-hover:text-white/10 transition-colors">0{i+1}</div>
              <div className="relative z-10 text-white uppercase font-black text-xs tracking-[0.4em] mt-8">{step}</div>
              <div className="mt-4 w-8 h-[1px] bg-white/10 mx-auto group-hover:w-16 group-hover:bg-white transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
