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
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"])
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
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  )
}

const SERVICES = [
  { num: "01", title: "Website Design", desc: "We build beautiful, fast websites that work perfectly on all devices. From simple landing pages to complex business sites." },
  { num: "02", title: "Social Media", desc: "We handle your Instagram and LinkedIn. We create the content, plan the strategy, and help you grow your audience." },
  { num: "03", title: "UI/UX Design", desc: "We design easy-to-use apps and websites that your customers will love. We focus on making things simple and effective." },
  { num: "04", title: "Branding", desc: "We create your logo, choose your colors, and build your entire brand identity from the ground up." },
]

const HOW = [
  { step: "01", title: "Free Chat", desc: "We talk about your business, what you need, and how we can help you grow." },
  { step: "02", title: "The Plan", desc: "We create a simple, clear strategy to get you the results you want." },
  { step: "03", title: "Building", desc: "We design and build everything. You get regular updates until it's perfect." },
  { step: "04", title: "Launch", desc: "We go live! We also stay around to make sure everything keeps running smoothly." },
]

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  return (
    <main ref={containerRef} className="relative bg-transparent">
      <div className="scanlines" />
      <HouseScene />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 pt-28 pb-16">
        <motion.div style={{ y: y1, opacity }} className="relative z-10 w-full max-w-5xl">

          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-white/20" />
            <span className="text-white/40 font-mono text-[8px] tracking-[0.4em] uppercase font-bold">
              Creative Agency · India
            </span>
            <div className="w-8 h-[1px] bg-white/20" />
          </div>

          <h1 className="text-[clamp(3rem,10vw,8rem)] font-syne font-extrabold uppercase leading-[0.88] tracking-tight mb-6 flex flex-col items-center lag-text">
            <div className="flex overflow-hidden">
               <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="text-white">WE</motion.span>
               <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} className="text-white ml-4">BUILD</motion.span>
            </div>
            <div className="flex overflow-hidden">
               <motion.span initial={{ y: "-100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }} className="text-white/20 text-outline">BRANDS.</motion.span>
            </div>
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-white/70 font-sans leading-relaxed mb-4">
            <strong className="text-white font-semibold">WEDO</strong> helps your business grow by building high-quality websites and managing your social media. We make things simple, fast, and effective.
          </p>
          <p className="max-w-xl mx-auto text-[10px] md:text-xs text-white/30 font-mono uppercase tracking-[0.2em] mb-12">
            Web Design · Social Media · Branding · UI/UX
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link href="/services" className="w-full sm:w-auto">
              <button className="clip-button w-full sm:w-60 py-4 uppercase tracking-widest text-[9px] font-black">Our Services</button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-64 px-6 py-4 border border-white/10 text-white font-black text-[9px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all">
                Talk to Us
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* About WEDO Strip */}
      <section className="relative z-10 py-16 md:py-20 px-6 md:px-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-white/10">
            {[
              { label: "Who We Are", body: "We are a creative team in India. We help small businesses and startups build their online presence without any technical headache." },
              { label: "What We Do", body: "We handle your website, design your logo, and manage your social media so you can focus on running your business." },
              { label: "Why Choose Us", body: "We value clear communication and fast results. No difficult jargon—just high-quality work that helps you grow." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="md:px-12 first:pl-0 last:pr-0"
              >
                <div className="text-[8px] font-mono text-white/30 uppercase tracking-[0.4em] mb-3">{`0${i+1} // ${item.label}`}</div>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-24 md:py-32 px-6 md:px-12" id="services">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-white/40" />
            <span className="text-[8px] font-mono text-white/30 uppercase tracking-[0.4em]">What We Offer</span>
          </div>
          <h2 className="font-syne font-extrabold text-white text-4xl md:text-6xl uppercase tracking-tight leading-[1] mb-16 md:mb-20">
            SERVICES
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {SERVICES.map((s, i) => (
              <TiltCard key={i} className="clip-panel p-8 md:p-12 group cursor-pointer">
                <div className="hud-grid opacity-5" />
                <div className="flex items-start justify-between mb-6">
                  <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">{s.num}</span>
                  <div className="w-8 h-[1px] bg-white/10 group-hover:w-16 group-hover:bg-white transition-all duration-500 mt-2" />
                </div>
                <h3 className="font-syne font-extrabold text-white text-xl md:text-2xl uppercase tracking-tight mb-4">
                  {s.title}
                </h3>
                <p className="text-white/40 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] leading-relaxed">
                  {s.desc}
                </p>
              </TiltCard>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/services">
              <button className="border border-white/10 text-white/50 hover:text-white hover:border-white px-8 py-4 font-black text-[9px] tracking-[0.4em] uppercase transition-all">
                See All Services →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-white/40" />
            <span className="text-[8px] font-mono text-white/30 uppercase tracking-[0.4em]">The Process</span>
          </div>
          <h2 className="font-syne font-extrabold text-white text-4xl md:text-6xl uppercase tracking-tight leading-[1] mb-16">
            HOW WE WORK
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {HOW.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {i < HOW.length - 1 && (
                  <div className="hidden lg:block absolute top-4 left-full w-full h-[1px] bg-white/10 z-0" />
                )}
                <div className="text-5xl font-syne font-black text-white/5 mb-4 leading-none">{h.step}</div>
                <h4 className="font-syne font-extrabold text-white text-xl uppercase tracking-tight mb-3">{h.title}</h4>
                <p className="text-white/40 text-xs font-mono uppercase tracking-[0.15em] leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="w-8 h-[1px] bg-white/20" />
            <span className="text-[8px] md:text-[9px] font-mono text-white/40 uppercase tracking-[0.4em]">
              What Clients Say
            </span>
            <div className="w-8 h-[1px] bg-white/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { q: "WeDo built our entire website from scratch. Our sales have grown significantly since the launch.", a: "Akash Sharma", r: "Business Owner" },
              { q: "They handle our Instagram and branding perfectly. We finally have a professional online presence.", a: "Sneha Kapur", r: "Marketing Manager" },
              { q: "Fast work, easy communication, and high quality. Exactly what our startup needed.", a: "Rahul Verma", r: "Tech Founder" }
            ].map((signal, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="p-8 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex flex-col justify-between min-h-[220px]">
                <div className="text-base md:text-lg font-syne font-medium text-white/80 italic mb-8 leading-snug">"{signal.q}"</div>
                <div>
                  <div className="text-[9px] font-mono text-white uppercase tracking-widest mb-1">{signal.a}</div>
                  <div className="text-[7px] font-mono text-white/20 uppercase tracking-widest">{signal.r}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 text-center border-t border-white/5">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
          <div className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em] mb-8">Ready to grow?</div>
          <h2 className="font-syne font-extrabold text-white text-4xl md:text-8xl uppercase tracking-tight leading-[1] mb-8 lag-text">
            LET'S WORK<br/><span className="text-white/20">TOGETHER.</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base mb-12 max-w-xl mx-auto leading-relaxed">
            Ready to take your business online? Whether you need a website, social media help, or a new logo—we’re here to help. Talk to us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="clip-button w-full sm:w-64 py-4 uppercase tracking-widest text-[9px] font-black">Get in Touch →</button>
            </Link>
            <Link href="/work" className="w-full sm:w-auto">
              <button className="w-full sm:w-64 px-6 py-4 border border-white/10 text-white font-black text-[9px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all">
                Our Work
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
