'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const PROJECTS = [
  {
    id: 'project-1',
    title: 'Aero Dynamics',
    category: 'Web Design',
    year: '2024',
    tags: ['Next.js', 'Three.js', 'Framer']
  },
  {
    id: 'project-2',
    title: 'Neon Pulse',
    category: 'Brand Identity',
    year: '2023',
    tags: ['Logo', 'Brand', 'Design']
  },
  {
    id: 'project-3',
    title: 'Stellar App',
    category: 'UI/UX Design',
    year: '2023',
    tags: ['Mobile', 'UI', 'UX']
  },
  {
    id: 'project-4',
    title: 'Void Studio',
    category: 'E-Commerce',
    year: '2024',
    tags: ['Shopify', 'Web', 'Dev']
  }
]

export default function WorkPage() {
  return (
    <main className="relative min-h-screen bg-black pt-40 md:pt-64 pb-24 px-6 md:px-24 z-10 overflow-hidden">
      <div className="scanlines" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-12 h-[1px] bg-white/40" />
          <span className="text-white/60 font-mono text-[11px] tracking-widest md:tracking-[0.5em] uppercase font-bold text-center md:text-left">Protocol_04 // Project_Archive</span>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[clamp(2rem,8vw,7rem)] font-syne font-black uppercase leading-[1.1] md:leading-tight mb-20 md:mb-32 italic text-center"
        >
          <span className="text-white">OUR </span>
          <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', color: 'transparent' }}>WORK.</span>
        </motion.h1>

        <div className="flex flex-col border-t border-white/10">
          {PROJECTS.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/work/${project.id}`} className="group relative py-12 md:py-20 flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 hover:px-8 transition-all duration-500 hover:bg-white/[0.01]">
                <div className="absolute left-0 top-0 w-[2px] h-0 bg-[#E8002D] group-hover:h-full transition-all duration-500" />
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[#E8002D] text-[10px] tracking-widest">0{i+1}</span>
                    <div className="flex flex-wrap gap-3 md:gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[11px] md:text-[10px] font-mono text-white/40 md:text-white/20 uppercase tracking-widest">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <h2 className="text-4xl md:text-7xl font-syne font-black text-white uppercase italic group-hover:tracking-widest transition-all duration-500 heading-safe">
                    {project.title}
                  </h2>
                </div>

                <div className="flex items-center gap-8 md:gap-16 mt-8 md:mt-0">
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-white/60 uppercase tracking-widest mb-1">{project.category}</div>
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{project.year}</div>
                  </div>
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#E8002D] group-hover:border-[#E8002D] transition-all duration-500">
                    <span className="text-xl text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
