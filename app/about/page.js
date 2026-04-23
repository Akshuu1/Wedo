'use client'

import HouseScene from '@/components/canvas/HouseScene'
import { motion } from 'framer-motion'
import { PinContainer } from '@/components/ui/3d-pin'

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black pt-64 pb-24 px-10 md:px-24 z-10 overflow-hidden">
      <div className="scanlines" />
      <HouseScene />

      <div className="max-w-screen-xl mx-auto relative z-10 pointer-events-auto">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-12 h-[1px] bg-white/40" />
          <span className="text-white/40 font-mono text-[9px] tracking-[0.5em] uppercase font-bold">Protocol_02 // Command_Central</span>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-7xl md:text-9xl font-syne font-black uppercase leading-[0.8] mb-32 text-white italic"
        >
          THE<br/>
          <span className="text-white/20">COMMAND.</span>
        </motion.h1>

        {/* Founder Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-64">
          <PinContainer title="Mission Commander // Akshat" href="https://linkedin.com">
            <div className="flex basis-[20rem] flex-col p-4 tracking-tight text-slate-100/50 sm:basis-[25rem] w-[20rem] h-[25rem] md:w-[25rem] md:h-[30rem]">
              <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">Akshat</h3>
              <div className="text-base !m-0 !p-0 font-normal">
                <span className="text-slate-500 ">
                  Lead Architect and Visionary. Engineering digital weapons that redefine market standards.
                </span>
              </div>
              <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-white/10 to-transparent border border-white/5 items-center justify-center">
                <span className="text-[10px] font-mono text-white/20 tracking-[1em] uppercase">Visual_Data_Corrupt</span>
              </div>
            </div>
          </PinContainer>

          <PinContainer title="Strategic Lead // Sneha" href="https://linkedin.com">
            <div className="flex basis-[20rem] flex-col p-4 tracking-tight text-slate-100/50 sm:basis-[25rem] w-[20rem] h-[25rem] md:w-[25rem] md:h-[30rem]">
              <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">Sneha</h3>
              <div className="text-base !m-0 !p-0 font-normal">
                <span className="text-slate-500 ">
                  Strategy and Operations. Synchronizing brand narrative with technical excellence.
                </span>
              </div>
              <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-white/10 to-transparent border border-white/5 items-center justify-center">
                <span className="text-[10px] font-mono text-white/20 tracking-[1em] uppercase">Visual_Data_Corrupt</span>
              </div>
            </div>
          </PinContainer>
        </div>

        {/* Operational Workflow */}
        <section className="mb-64">
          <h2 className="text-4xl md:text-6xl font-syne font-black text-white uppercase italic mb-24 text-center">OPERATIONAL<br/><span className="text-white/20">WORKFLOW.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: "01", t: "INITIATE", d: "Deep dive into mission objectives and strategic alignment." },
              { t: "ARCHITECT", d: "High-fidelity blueprinting and cinematic UI/UX design." },
              { t: "DEPLOY", d: "Rapid engineering using cutting-edge technical stacks." },
              { t: "DOMINATE", d: "Growth tracking, performance audits, and scaling." }
            ].map((step, i) => (
              <div key={i} className="clip-panel p-8 group hover:bg-white/10 transition-all">
                <div className="text-white/20 font-mono text-xs mb-8">STEP_{i+1}</div>
                <h4 className="text-2xl font-syne font-black text-white mb-4 italic uppercase">{step.t}</h4>
                <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest">{step.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Agency Manifesto */}
        <section className="clip-panel p-12 md:p-24 text-center bg-white/[0.02]">
          <div className="hud-grid opacity-10" />
          <h2 className="text-3xl md:text-5xl font-syne font-black text-white uppercase italic mb-12">THE MANIFESTO.</h2>
          <p className="text-xl md:text-3xl text-white/60 font-sans leading-relaxed max-w-4xl mx-auto italic tracking-tight">
            "WE BELIEVE IN DIGITAL SOVEREIGNTY. <br/>
            EVERY PIXEL IS A STRATEGIC MOVE. <br/>
            EVERY LINE OF CODE IS A MISSION OBJECTIVE. <br/>
            WE DON'T COMPETE; WE REDEFINE THE FIELD."
          </p>
        </section>
      </div>
    </main>
  )
}
