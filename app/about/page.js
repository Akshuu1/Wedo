'use client'

import { motion } from 'framer-motion'
import { PinContainer } from '@/components/ui/3d-pin'

const TEAM = [
  {
    name: 'Akshat',
    role: 'Founder & Lead Designer',
    bio: 'Crafting digital experiences with a focus on high-end aesthetics and technical excellence.',
    image: '/team/akshat.jpg'
  },
  {
    name: 'Sarah',
    role: 'Strategic Director',
    bio: 'Expert in brand growth and connecting premium identities with the right audiences.',
    image: '/team/sarah.jpg'
  }
]

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black pt-40 md:pt-64 pb-24 px-6 md:px-16 xl:px-24 z-10 overflow-hidden">
      <div className="scanlines" />

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-12 h-[1px] bg-white/40" />
          <span className="text-white/40 font-mono text-[11px] tracking-widest md:tracking-[0.5em] uppercase font-bold text-center md:text-left">Protocol_01 // Operational_Intel</span>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[clamp(2rem,8vw,7rem)] font-syne font-black uppercase leading-[1.1] md:leading-tight mb-20 md:mb-32 italic text-center lg:text-left"
        >
          <span className="text-white">WHO WE </span>
          <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', color: 'transparent' }}>ARE.</span>
        </motion.h1>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 mb-24 md:mb-48 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-10"
          >
            <h2 className="text-4xl md:text-5xl font-syne font-black text-white uppercase italic leading-[1.1] md:leading-[0.9] heading-safe">
              WE ARE A DEDICATED TEAM THAT CREATES <span className="text-[#E8002D]">STUNNING</span> DIGITAL EXPERIENCES.
            </h2>
            <div className="w-24 h-[2px] bg-[#E8002D]" />
            <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              No confusing jargon — just results that help your business succeed. Whether you need a brand new website or a social media overhaul, we make the process simple and stress-free.
            </p>
          </motion.div>
          
          <div className="relative">
            <div className="clip-panel p-10 bg-white/[0.02] border border-white/5">
              <div className="hud-grid opacity-20" />
              <div className="font-mono text-[10px] text-white/20 uppercase tracking-widest mb-10">System_Metrics</div>
              <div className="space-y-8">
                {['Quality_Output', 'Mission_Success', 'Client_Retention'].map((stat, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between font-mono text-[11px] text-white/50 uppercase tracking-widest">
                      <span>{stat}</span>
                      <span className="text-white">100%</span>
                    </div>
                    <div className="h-[2px] w-full bg-white/5 relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                        className="absolute inset-y-0 left-0 bg-[#E8002D]"
                        style={{ boxShadow: '0 0 10px #E8002D' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <section className="mb-24 md:mb-48">
          <div className="text-center mb-20 md:mb-32">
            <h2 className="text-4xl md:text-6xl font-syne font-black text-white uppercase italic mb-6 heading-safe">THE CREW.</h2>
            <p className="text-white/60 font-mono text-[10px] tracking-[0.4em] uppercase">Specialized operatives in creative field.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
            {TEAM.map((member, i) => (
              <div key={i} className="flex justify-center">
                <PinContainer title={member.role} href="#">
                  <div className="flex basis-[20rem] flex-col p-8 tracking-tight text-slate-100/50 sm:basis-[24rem] h-[30rem] w-[24rem]">
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold font-syne text-2xl text-slate-100 uppercase italic">
                      {member.name}
                    </h3>
                    <div className="text-base !m-0 !p-0 font-mono text-[10px] tracking-widest text-[#E8002D] uppercase mb-4">
                      {member.role}
                    </div>
                    <div className="w-full h-[1px] bg-white/10 mb-8" />
                    <p className="text-base text-white/50 leading-relaxed italic font-light">
                      "{member.bio}"
                    </p>
                    <div className="absolute bottom-6 right-6 w-12 h-12 border border-white/10 flex items-center justify-center font-mono text-[10px] text-white/20 uppercase group-hover/card:border-white group-hover/card:text-white transition-all">
                      WD_0{i+1}
                    </div>
                  </div>
                </PinContainer>
              </div>
            ))}
          </div>
        </section>

        {/* Workflow Section */}
        <section className="text-center pb-24 border-t border-white/5 pt-20 md:pt-32">
          <h2 className="text-4xl md:text-7xl font-syne font-black text-white uppercase italic mb-16 md:mb-24 heading-safe">HOW WE WORK.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Listen", "Plan", "Build", "Launch"].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="relative py-12 border border-white/5 bg-white/[0.01] clip-panel group hover:bg-white/[0.03] transition-all"
              >
                <div className="text-white/5 font-syne font-black text-6xl md:text-9xl absolute -top-4 left-1/2 -translate-x-1/2 select-none group-hover:text-white/10 transition-colors">0{i+1}</div>
                <div className="relative z-10 text-white uppercase font-black text-[12px] tracking-[0.3em] mt-8">{step}</div>
                <div className="mt-4 w-6 h-[1px] bg-white/10 mx-auto group-hover:w-12 group-hover:bg-white transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
