'use client'

import HouseScene from '@/components/canvas/HouseScene'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import ScrambleText from '@/components/ui/ScrambleText'

function TiltCard({ children, className }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  )
}

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  return (
    <main ref={containerRef} className="relative bg-transparent">
      <div className="scanlines" />
      <HouseScene />

      {/* Hero Section - Optimized for Mobile & Spacing */}
      <section className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 py-16 md:py-24">
        <motion.div style={{ y: y1, opacity }} className="relative z-10 w-full max-w-6xl">
          <div className="flex items-center justify-center gap-3 mb-8 md:mb-12">
            <div className="w-8 md:w-12 h-[1px] bg-white/20" />
            <span className="text-white/40 font-mono text-[8px] md:text-[9px] tracking-[0.4em] uppercase font-bold">
               Protocol_01 // Digital_Studio
            </span>
            <div className="w-8 md:w-12 h-[1px] bg-white/20" />
          </div>

          <h1 className="font-syne font-extrabold text-white text-[clamp(2.5rem,10vw,7.5rem)] uppercase tracking-tight leading-[0.9] mb-8 md:mb-12 lag-text">
            NOT JUST<br/>
            <span className="text-white/20">WEBSITES.</span>
          </h1>

          <p className="max-w-xl mx-auto text-[10px] md:text-sm text-white/40 font-sans leading-relaxed mb-12 md:mb-20 px-2 uppercase tracking-[0.15em] font-medium">
            WE ARCHITECT DIGITAL WEAPONS FOR THE BOLD. <br className="hidden md:block"/> 
            SCALABLE ASSETS, HIGH-FIDELITY DESIGN, AND PURE PERFORMANCE.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center justify-center">
            <Link href="/work" className="w-full sm:w-auto"><button className="clip-button w-full sm:w-64 py-4 md:py-5">EXPLORE MISSIONS</button></Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-64 px-6 py-4 md:py-5 border border-white/10 text-white font-black text-[8px] md:text-[9px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all">
                INITIATE CONTACT
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Strategic Arsenal Section - Balanced Spacing */}
      <section className="relative py-24 md:py-48 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            className="lg:sticky lg:top-32 z-10"
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="w-8 h-[1px] bg-white/40" />
              <span className="text-[8px] md:text-[9px] font-mono text-white/40 uppercase tracking-[0.4em]">
                Strategic_Arsenal
              </span>
            </div>
            <h2 className="font-syne font-extrabold text-white text-4xl md:text-7xl uppercase tracking-tighter leading-[1] mb-8 md:mb-12 lag-text">
              WEAPONS OF<br/><span className="text-white/20">INFLUENCE.</span>
            </h2>
            <p className="text-white/50 text-sm md:text-lg leading-relaxed mb-10 md:mb-16 max-w-md">
              We don't build pages; we build authority. Our digital assets are engineered to dominate market attention and convert visitors into believers.
            </p>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="p-6 md:p-8 border border-white/10 bg-white/[0.01]">
                <div className="text-2xl md:text-3xl font-syne font-extrabold text-white mb-1">99.9%</div>
                <div className="text-[7px] md:text-[8px] font-mono text-white/30 uppercase tracking-widest">Uptime</div>
              </div>
              <div className="p-6 md:p-8 border border-white/10 bg-white/[0.01]">
                <div className="text-2xl md:text-3xl font-syne font-extrabold text-white mb-1">400%</div>
                <div className="text-[7px] md:text-[8px] font-mono text-white/30 uppercase tracking-widest">Growth</div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:gap-12 relative z-0">
            {[
              { t: "HIGH-FIDELITY DESIGN", d: "Cinematic interfaces that blend luxury with brutalism, leaving a permanent digital footprint." },
              { t: "PERFORMANCE FIRST", d: "Engineered for speed. We maintain 95+ performance scores even with complex 3D visuals." },
              { t: "SCALABLE SYSTEMS", d: "Architecture designed to grow with your ambition, from startup to global enterprise." }
            ].map((item, i) => (
              <TiltCard key={i} className="clip-panel p-10 md:p-16 group">
                <div className="hud-grid opacity-10" />
                <h4 className="font-syne font-extrabold text-white text-xl md:text-3xl uppercase tracking-tighter mb-4 md:mb-6">
                   {item.t}
                </h4>
                <p className="text-white/40 text-[9px] md:text-[11px] font-mono uppercase tracking-[0.25em] leading-relaxed">{item.d}</p>
                <div className="mt-8 md:mt-10 w-10 md:w-12 h-[1px] bg-white/20 group-hover:w-20 md:group-hover:w-24 group-hover:bg-white transition-all duration-700" />
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Intercepted Signals - Reduced Vertical Padding */}
      <section className="relative py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-16 md:mb-24">
            <div className="w-8 h-[1px] bg-white/20" />
            <span className="text-[8px] md:text-[9px] font-mono text-white/40 uppercase tracking-[0.4em]">
               Intercepted_Signals
            </span>
            <div className="w-8 h-[1px] bg-white/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { q: "WEDO built us a digital command center. Our conversion metrics tripled in record time.", a: "Commander J. Doe", r: "CEO // TechNexus" },
              { q: "The level of cinematic detail is unmatched. It feels like a high-performance engine.", a: "Officer Sarah V.", r: "Director // NovaStream" },
              { q: "Strategic, fast, and visually aggressive. Exactly what we needed for market dominance.", a: "Unit 742", r: "Founder // ZeroPoint" }
            ].map((signal, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="p-8 md:p-12 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex flex-col justify-between min-h-[250px] md:min-h-[300px]">
                <div>
                   <div className="font-mono text-[6px] md:text-[7px] text-white/10 mb-6 md:mb-8 uppercase tracking-widest">Signal_ID // 0{i+1}</div>
                   <div className="text-lg md:text-xl font-syne font-medium text-white/80 italic mb-10 md:mb-12 leading-snug">"{signal.q}"</div>
                </div>
                <div>
                   <div className="text-[8px] md:text-[9px] font-mono text-white uppercase tracking-widest mb-1">{signal.a}</div>
                   <div className="text-[6px] md:text-[7px] font-mono text-white/20 uppercase tracking-widest">{signal.r}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Compact Spacing */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="max-w-5xl mx-auto">
          <h2 className="font-syne font-extrabold text-white text-4xl md:text-8xl uppercase tracking-tight leading-[1] mb-10 md:mb-12 lag-text">
            JOIN THE<br/><span className="text-white/10">COMMAND.</span>
          </h2>
          <p className="text-white/40 text-sm md:text-2xl mb-12 md:mb-24 max-w-2xl mx-auto uppercase tracking-tighter font-light">
            Ready to deploy your next high-performance digital asset? Let's initiate the mission protocol.
          </p>
          <Link href="/contact" className="inline-block"><button className="clip-button px-12 md:px-16 scale-100 md:scale-110">INITIATE MISSION →</button></Link>
        </motion.div>
      </section>
    </main>
  )
}
