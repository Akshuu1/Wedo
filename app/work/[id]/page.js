'use client'

import { useParams } from 'next/navigation'
import HouseScene from '@/components/canvas/HouseScene'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ScrambleText from '@/components/ui/ScrambleText'

const PROJECTS = {
  'tech-nexus': {
    title: 'TechNexus Command',
    type: 'Web System',
    year: '2026',
    description: 'A high-performance digital command center built for a leading tech conglomerate. Focused on real-time data visualization and cinematic user flows.',
    tags: ['Next.js', 'WebGL', 'GSAP'],
    outcome: '400% increase in user engagement and zero downtime during high-traffic launches.'
  },
  'novastream': {
    title: 'NovaStream Engine',
    type: 'Streaming Platform',
    year: '2025',
    description: 'Architecting the future of media streaming with a brutalist, high-fidelity interface and lightning-fast content delivery.',
    tags: ['React', 'Three.js', 'Vercel'],
    outcome: 'Successful deployment to 1M+ active users with a 98+ Lighthouse score.'
  },
  'zeropoint': {
    title: 'ZeroPoint Identity',
    type: 'Brand System',
    year: '2026',
    description: 'Establishing market sovereignty through a visually aggressive and strategically deep brand identity system.',
    tags: ['Strategy', 'Identity', 'Visuals'],
    outcome: 'Secured $10M+ in Series A funding through a dominant market presentation.'
  }
}

export default function ProjectPage() {
  const { id } = useParams()
  const project = PROJECTS[id] || PROJECTS['tech-nexus']

  return (
    <main className="relative min-h-screen bg-black pt-64 pb-24 px-10 md:px-24 z-10 overflow-hidden">
      <div className="scanlines" />
      <HouseScene />

      <div className="max-w-screen-xl mx-auto relative z-10 pointer-events-auto">
        <div className="flex items-center gap-6 mb-12">
          <Link href="/work" className="text-white/40 hover:text-white transition-colors flex items-center gap-2">
             <span className="font-mono text-[9px] uppercase tracking-widest">← Return_to_Missions</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.4em]">Mission_Report // {project.year}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-syne font-black text-white uppercase italic leading-[0.85] mb-12 lag-text">
               <ScrambleText text={project.title} />
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-12 max-w-xl italic">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-16">
              {project.tags.map(tag => (
                <span key={tag} className="px-4 py-2 border border-white/10 text-white/40 font-mono text-[8px] uppercase tracking-widest">{tag}</span>
              ))}
            </div>

            <div className="clip-panel p-10 bg-white/[0.02]">
              <div className="text-white/20 font-mono text-[8px] mb-4 uppercase tracking-widest">Strategic_Outcome</div>
              <p className="text-white text-lg font-syne italic">{project.outcome}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-[4/5] bg-gradient-to-br from-white/5 to-transparent border border-white/10 clip-panel flex items-center justify-center overflow-hidden"
          >
            <div className="hud-grid opacity-20" />
            <div className="text-white/10 font-mono text-[10px] tracking-[2em] uppercase -rotate-90">Visual_Data_Locked</div>
          </motion.div>
        </div>

        {/* Tactical Footer for Project */}
        <div className="mt-64 flex flex-col items-center text-center">
           <h3 className="text-2xl font-syne font-black text-white uppercase italic mb-12">READY TO START YOUR MISSION?</h3>
           <Link href="/contact">
              <button className="clip-button">INITIATE COMMAND →</button>
           </Link>
        </div>
      </div>
    </main>
  )
}
