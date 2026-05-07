'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import PerformanceScanner from '@/components/ui/PerformanceScanner'
import InteractiveLab from '@/components/ui/InteractiveLab'

// ─── Animation presets ───────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
})

const revealFromBottom = (delay = 0) => ({
  initial: { y: '110%' },
  animate: { y: 0 },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
})

// ─── Services data ───────────────────────────────
const SERVICES = [
  { num: '01', title: 'Website Design',  desc: 'Fast, beautiful, conversion-ready websites that make your brand look world-class' },
  { num: '02', title: 'Brand Identity',  desc: 'Full brand systems — logos, typography, palettes — that are impossible to ignore' },
  { num: '03', title: 'UI/UX Design',    desc: 'Intuitive interfaces that reduce friction and keep your users hooked' },
  { num: '04', title: 'Social Media',    desc: 'Content strategies and managed accounts that turn followers into customers' },
]

// ─── Stats data ──────────────────────────────────
const STATS = [
  { num: '100%', label: 'Client Satisfaction' },
  { num: '48H',  label: 'Avg Response Time' },
  { num: '2×',   label: 'Faster Than Agencies' },
  { num: '∞',    label: 'Creative Potential' },
]

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const heroY       = useTransform(scrollYProgress, [0, 0.3], [0, -120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0])

  return (
    <main ref={containerRef} className="relative bg-transparent">
      {/* CRT overlay */}
      <div className="scanlines pointer-events-none" />

      {/* ═══════ HERO ════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 xl:px-24 pt-28 pb-20 overflow-hidden">

        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 35% 50%, rgba(232,0,45,0.07) 0%, transparent 70%)' }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-screen-2xl mx-auto">
          {/* Desktop split grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 xl:gap-20 items-center">

            {/* LEFT — headline + CTAs */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

              {/* Agency tag */}
              <motion.div {...fadeUp(0.2)} className="flex items-center gap-4 mb-10">
                <div className="h-[1px] w-8 bg-[#E8002D]/60" />
                <span className="font-mono text-[11px] tracking-[0.5em] text-white/40 uppercase">Creative Agency / EST. 2024</span>
                <div className="h-[1px] w-8 bg-white/10 hidden lg:block" />
              </motion.div>

              {/* Big headline */}
              <h1 className="font-syne font-black uppercase leading-[0.95] tracking-[-0.04em] mb-10 heading-safe"
                  style={{ fontSize: 'clamp(3rem, 9vw, 9.5rem)' }}>
                <motion.div {...fadeUp(0.3)} className="italic">
                  <span className="text-white">WE BUILD </span>
                  <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.15)', color: 'transparent' }}>BRANDS</span>
                </motion.div>
                <motion.div {...fadeUp(0.4)}>
                  <span className="text-white">THAT </span>
                  <span className="text-[#E8002D] italic">WIN.</span>
                </motion.div>
              </h1>

              {/* Sub line */}
              <motion.p {...fadeUp(0.65)} className="max-w-xl text-white/55 text-base md:text-xl leading-relaxed mb-3">
                A creative studio crafting <strong className="text-white font-semibold">websites, brands</strong> and digital experiences that dominate the competition.
              </motion.p>
              <motion.p {...fadeUp(0.75)} className="font-mono text-[11px] text-white/25 tracking-[0.4em] uppercase mb-14">
                Strategy&nbsp;·&nbsp;Design&nbsp;·&nbsp;Development
              </motion.p>

              {/* CTAs */}
              <motion.div {...fadeUp(0.85)} className="flex flex-col sm:flex-row gap-4 items-center lg:items-start justify-center lg:justify-start">
                <Link href="/work">
                  <button className="clip-button w-56 py-[18px] glow-pulse">View Our Work →</button>
                </Link>
                <Link href="/contact">
                  <button className="w-56 py-[18px] border border-white/15 text-white/70 font-mono text-[11px] tracking-[0.3em] uppercase hover:border-[#E8002D] hover:text-white transition-all duration-300">
                    Start a Project
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* RIGHT — live metrics panel (desktop only) */}
            <motion.div {...fadeUp(0.5)} className="hidden lg:flex flex-col gap-4">
              {/* Available badge */}
              <div className="flex justify-end">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 bg-[#E8002D] rounded-full animate-pulse shadow-[0_0_8px_#E8002D]" />
                  <span className="font-mono text-[11px] text-white/50 uppercase tracking-widest">Available for Projects</span>
                </div>
              </div>

              {/* Stats mini grid */}
              <div className="clip-panel p-7 relative overflow-hidden">
                <div className="hud-grid opacity-[0.025]" />
                <div className="relative z-10">
                  <div className="telemetry-line mb-6">Live_Metrics</div>
                  <div className="grid grid-cols-2 gap-4">
                    {STATS.map((s, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                        className="border border-white/[0.06] p-5 hover:border-[#E8002D]/30 transition-colors duration-300"
                      >
                        <div className="font-syne font-black text-3xl text-white mb-1">{s.num}</div>
                        <div className="font-mono text-[10px] text-white/30 tracking-widest uppercase leading-snug">{s.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Location line */}
              <div className="flex items-center gap-3 px-1">
                <div className="w-2 h-2 rounded-full bg-[#E8002D] animate-ping opacity-70" />
                <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest">New Delhi, India — Remote Worldwide</span>
              </div>
            </motion.div>
          </div>

          {/* HUD corner decorations */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-[#E8002D]/30 pointer-events-none" />
          <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-[#E8002D]/30 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-white/10 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-white/10 pointer-events-none" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          {...fadeUp(1.4)}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] text-white/20 uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            className="w-[1px] h-8 bg-gradient-to-b from-[#E8002D] to-transparent"
          />
        </motion.div>
      </section>

      {/* ═══════ STATS BAR — mobile only (desktop sees stats in hero) ════ */}
      <section className="relative z-10 border-y border-white/[0.06] bg-black/60 backdrop-blur-xl lg:hidden">
        <div className="max-w-screen-2xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.06]">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center justify-center py-6 px-4 gap-1"
            >
              <span className="font-syne font-black text-3xl text-white">{s.num}</span>
              <span className="font-mono text-[10px] text-white/35 tracking-[0.3em] uppercase text-center">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ INTERACTIVE LAB ════════════════════════════ */}
      <section className="relative z-10">
        <InteractiveLab />
      </section>

      {/* ═══════ WHO WE ARE ══════════════════════════ */}
      <section className="relative z-10 section-gap px-6 md:px-16 xl:px-24">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
            >
              <div className="telemetry-line mb-6 text-white/70 justify-center lg:justify-start">About Our Team</div>
              <h2 className="font-syne font-black text-white uppercase italic leading-[1.1] md:leading-[0.88] tracking-tight mb-8 heading-safe text-center lg:text-left"
                  style={{ fontSize: 'clamp(2.2rem, 7vw, 5.5rem)' }}>
                WHO WE<br />
                <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.15)', color: 'transparent' }}>ARE</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-5 text-center lg:text-left">
                We are a small, focused creative team obsessed with making businesses look incredible online. No bloated agencies, no confusing jargon — just sharp design and real results.
              </p>
              <p className="text-white/40 text-sm leading-relaxed mb-10 text-center lg:text-left">
                Whether you need a brand new website or a complete brand overhaul, we handle everything from concept to launch — fast.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Link href="/about">
                  <button className="font-mono text-[11px] tracking-[0.4em] uppercase text-[#E8002D] border-b border-[#E8002D]/40 pb-1 hover:border-[#E8002D] transition-all">
                    Our Story →
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right — stats panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
            className="clip-panel p-10 relative overflow-hidden"
          >
            <div className="hud-grid opacity-[0.025]" />
            <div className="relative z-10">
              <div className="telemetry-line mb-8 text-white/80">Performance_Data</div>
              <div className="flex flex-col gap-7">
                {[
                  { l: 'Success Rate',    v: '100%', p: 100 },
                  { l: 'On-Time Delivery',  v: '95%',  p: 95  },
                  { l: 'Client Retention',  v: '100%', p: 100 },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="font-mono text-[12px] text-white/80 uppercase tracking-widest">{stat.l}</span>
                      <span className="font-mono text-[12px] font-bold text-white">{stat.v}</span>
                    </div>
                    <div className="speed-bar">
                      <motion.div
                        className="speed-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.p}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.3, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/[0.06]">
                <div className="font-mono text-[11px] text-white/70 uppercase tracking-widest mb-3">Our Stack</div>
                <div className="flex flex-wrap gap-3 md:gap-2">
                  {['Next.js', 'React', 'Framer', 'Figma', 'Three.js', 'GSAP'].map((tech) => (
                    <span key={tech} className="font-mono text-[11px] md:text-[10px] text-white/80 border border-white/20 bg-white/[0.03] px-4 py-2 md:px-3 md:py-1 hover:border-[#E8002D]/40 hover:text-white transition-all">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ COMPARISON ═════════════════════════ */}
      <section className="relative z-10 section-gap px-6 md:px-16 xl:px-24 border-t border-white/[0.05] bg-[#030303]">
        <div className="max-w-screen-2xl mx-auto relative">
          
          {/* Animated Background Glows */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#E8002D]/[0.03] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20 relative z-10 px-4"
          >
            <div className="telemetry-line justify-center mb-6 text-white/70">Efficiency Analysis</div>
            <h2 className="font-syne font-black text-white uppercase italic leading-[1.1] md:leading-tight tracking-tight text-center"
                style={{ fontSize: 'clamp(1.2rem, 6vw, 5rem)' }}>
              WEDO <span className="text-[#E8002D]">VS</span> <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)', color: 'transparent' }}>TRADITIONAL</span>
            </h2>
          </motion.div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
            
            {/* VS Badge — desktop only (absolute between two cols) */}
            <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-20 h-20 items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute inset-0 border border-[#E8002D]/40 rounded-full"
              />
              <div className="w-14 h-14 bg-black border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(232,0,45,0.2)]">
                <span className="font-syne font-black text-[#E8002D] text-2xl italic">VS</span>
              </div>
            </div>

            {/* Traditional Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative p-8 md:p-16 border border-white/[0.05] bg-black/40 backdrop-blur-sm lg:rounded-l-3xl overflow-hidden"
            >
              <div className="hud-grid opacity-[0.02]" />
              <div className="relative z-10">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-10">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <h3 className="font-mono text-white/30 text-[12px] tracking-[0.4em] uppercase font-bold">Standard Model</h3>
                </div>
                
                <div className="space-y-12">
                  {[
                    { l: 'Timeline', v: 'Weeks to Months', p: 30, desc: 'Slow, bureaucratic approval loops' },
                    { l: 'Pricing',  v: 'Opaque Retainers', p: 40, desc: 'Hidden costs & monthly billing bloat' },
                    { l: 'Workflow', v: 'Bloated Teams',   p: 25, desc: 'Too many meetings, not enough doing' },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col gap-4">
                      <div className="flex justify-between items-end">
                        <span className="font-syne font-black text-white/20 text-xl uppercase italic">{item.l}</span>
                        <span className="font-mono text-[11px] text-white/40 uppercase tracking-widest">{item.v}</span>
                      </div>
                      <div className="h-[2px] w-full bg-white/5 relative">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.p}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: i * 0.1 }}
                          className="absolute h-full bg-white/20"
                        />
                      </div>
                      <p className="font-mono text-[11px] text-white/20 uppercase tracking-tighter italic">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Mobile VS separator */}
            <div className="lg:hidden flex items-center justify-center py-8 border-t border-b border-white/[0.05] bg-black">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-16 bg-white/10" />
                <div className="w-14 h-14 bg-black border border-[#E8002D]/30 rounded-full flex items-center justify-center">
                  <span className="font-syne font-black text-[#E8002D] text-xl italic">VS</span>
                </div>
                <div className="h-[1px] w-16 bg-white/10" />
              </div>
            </div>

            {/* WeDo Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative p-8 md:p-16 border border-[#E8002D]/20 bg-[#E8002D]/[0.02] backdrop-blur-md lg:rounded-r-3xl overflow-hidden shadow-[inset_0_0_50px_rgba(232,0,45,0.02)]"
            >
              <div className="hud-grid opacity-[0.04]" />
              <div className="absolute top-0 right-0 p-8">
                <div className="w-2 h-2 rounded-full bg-[#E8002D] animate-ping" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-10">
                  <div className="w-2 h-2 rounded-full bg-[#E8002D]" />
                  <h3 className="font-mono text-white text-[12px] tracking-[0.4em] uppercase font-bold">The WeDo Method</h3>
                </div>

                <div className="space-y-12">
                  {[
                    { l: 'Timeline', v: '48H Turnaround', p: 95, desc: 'Execution at the speed of thought' },
                    { l: 'Pricing',  v: 'Fixed Project Fees', p: 100, desc: 'No retainers. No hidden overhead.' },
                    { l: 'Workflow', v: 'Direct Access',    p: 98, desc: 'Elite specialists. No middlemen.' },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col gap-4">
                      <div className="flex justify-between items-end">
                        <span className="font-syne font-black text-white text-xl uppercase italic group-hover:text-[#E8002D] transition-colors">{item.l}</span>
                        <span className="font-mono text-[11px] text-[#E8002D] uppercase tracking-widest font-bold">{item.v}</span>
                      </div>
                      <div className="h-[2px] w-full bg-white/5 relative">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.p}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: i * 0.1 }}
                          className="absolute h-full bg-[#E8002D] shadow-[0_0_15px_rgba(232,0,45,0.8)]"
                        />
                      </div>
                      <p className="font-mono text-[11px] text-white/50 uppercase tracking-tighter italic">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Footer Info */}
          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 px-4"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.5em]">System Status</span>
              <div className="flex gap-1">
                {[1,1,1,0].map((v, i) => (
                  <div key={i} className={`w-3 h-1 ${v ? 'bg-[#E8002D]' : 'bg-white/10'}`} />
                ))}
              </div>
            </div>
            <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest text-center">Efficiency Rating: 99.4% Optimized for Performance</p>
          </motion.div>
        </div>
      </section>

      {/* ═══════ SERVICES ════════════════════════════ */}
      <section className="relative z-10 section-gap px-6 md:px-16 xl:px-24 border-t border-white/[0.05]" id="services">
        <div className="max-w-screen-2xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="mb-14"
          >
            <div className="telemetry-line mb-5 text-white/70 justify-center md:justify-start">What We Do</div>
            <h2 className="font-syne font-black text-white uppercase italic leading-[1.1] md:leading-[0.88] tracking-tight heading-safe text-center md:text-left"
                style={{ fontSize: 'clamp(2rem, 8vw, 6rem)' }}>
              WHAT WE DO
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-white/[0.06]">
            {SERVICES.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="group relative bg-black p-10 border-b border-r border-white/[0.06] last:border-r-0 hover:bg-[#E8002D]/[0.03] transition-all duration-500 overflow-hidden"
              >
                <div className="hud-grid opacity-[0.015]" />
                {/* Red edge flash on hover */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#E8002D] group-hover:w-full transition-all duration-500" />
                <div className="relative z-10 text-center md:text-left">
                  <span className="font-mono text-[#E8002D]/70 text-[12px] tracking-[0.4em] mb-6 block">{s.num}</span>
                  <h3 className="font-syne font-black text-white uppercase text-xl mb-3 tracking-tight group-hover:text-[#E8002D] transition-colors duration-400">{s.title}</h3>
                  <div className="expand-line mb-5 mx-auto md:mx-0" />
                  <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="flex justify-center mt-10"
          >
            <Link href="/services">
              <button className="clip-button py-4 w-52">All Services →</button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════ PROCESS ═════════════════════════════ */}
      <section className="relative z-10 section-gap px-6 md:px-16 xl:px-24 border-t border-white/[0.05]">
        <div className="max-w-screen-2xl mx-auto">
          <div className="telemetry-line mb-5 text-white/70 justify-center md:justify-start">Our Process</div>
          <h2 className="font-syne font-black text-white uppercase italic leading-[1.1] md:leading-[0.88] tracking-tight mb-16 heading-safe text-center md:text-left"
              style={{ fontSize: 'clamp(2rem, 7vw, 6rem)' }}>
            HOW WE WORK
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { s: '01', t: 'Listen', d: 'Understanding your mission & goals' },
              { s: '02', t: 'Plan',   d: 'Mapping out the perfect strategy' },
              { s: '03', t: 'Build',  d: 'Precision engineering & design' },
              { s: '04', t: 'Launch', d: 'Deployment to the digital orbit' }
            ].map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative p-8 border border-white/[0.05] bg-white/[0.01] clip-panel"
              >
                <div className="text-5xl font-syne font-black text-white/5 mb-4 leading-none text-center sm:text-left">{h.s}</div>
                <h4 className="font-syne font-black text-white text-xl uppercase tracking-tight mb-3 text-center sm:text-left">{h.t}</h4>
                <p className="text-white/40 text-[12px] font-mono uppercase tracking-[0.15em] leading-relaxed text-center sm:text-left">{h.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ════════════════════════ */}
      <section className="relative z-10 section-gap px-6 md:px-16 xl:px-24 border-t border-white/[0.05]">
        <div className="max-w-screen-2xl mx-auto">
          <div className="telemetry-line justify-center mb-16">Client Feedback</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { q: "WeDo built our entire website from scratch. Our sales have grown significantly since the launch.", a: "Akash Sharma", r: "Business Owner" },
              { q: "They handle our Instagram and branding perfectly. We finally have a professional online presence.", a: "Sneha Kapur", r: "Marketing Manager" },
              { q: "Fast work, easy communication, and high quality. Exactly what our startup needed.", a: "Rahul Verma", r: "Tech Founder" }
            ].map((sig, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1 }} 
                viewport={{ once: true }} 
                className="p-10 border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.03] transition-all flex flex-col justify-between min-h-[280px] relative overflow-hidden"
              >
                <div className="hud-grid opacity-[0.02]" />
                <div className="text-lg font-syne font-medium text-white/80 italic mb-8 leading-snug relative z-10">"{sig.q}"</div>
                <div className="relative z-10">
                  <div className="text-[12px] font-mono text-white uppercase tracking-widest mb-1 font-bold">{sig.a}</div>
                  <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{sig.r}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PERFORMANCE SCANNER ════════════════════════════ */}
      <section className="relative z-10 border-t border-white/[0.05]">
        <PerformanceScanner />
      </section>



      {/* ═══════ MARQUEE ═════════════════════════════ */}
      <section className="relative z-10 py-16 border-t border-white/[0.05] overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="flex gap-16 whitespace-nowrap w-max"
        >
          {[...Array(16)].map((_, i) => (
            <span key={i} className="font-syne font-black italic select-none"
                  style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', WebkitTextStroke: '1.5px rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.04)' }}>
              WEDO AGENCY&nbsp;·&nbsp;
            </span>
          ))}
        </motion.div>
      </section>
    </main>
  )
}
