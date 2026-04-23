'use client'

import { useParams } from 'next/navigation'
import HouseScene from '@/components/canvas/HouseScene'
import { motion } from 'framer-motion'
import Link from 'next/link'

const PROJECTS = {
  'tech-nexus': {
    title: 'TechNexus Platform',
    type: 'Website',
    year: '2026',
    description: 'A professional dashboard built for a major tech company. We focused on making complex data easy to see and use.',
    tags: ['Design', 'Development', 'Strategy'],
    outcome: 'We helped them increase user engagement by 400% and kept the site running perfectly even during busy launches.'
  },
  'novastream': {
    title: 'NovaStream Site',
    type: 'Website',
    year: '2025',
    description: 'A modern, cinematic website designed for a leading media company. It’s built to be lightning-fast and easy for users to navigate.',
    tags: ['Branding', 'Web Dev', 'UI UX'],
    outcome: 'The site now handles over 1 million users with perfect speed and performance scores.'
  },
  'zeropoint': {
    title: 'ZeroPoint Branding',
    type: 'Brand System',
    year: '2026',
    description: 'A complete brand identity and website for a fintech startup. We created a unique look that helped them stand out in a crowded market.',
    tags: ['Logo Design', 'Web Design', 'Identity'],
    outcome: 'This new brand look helped the company raise over $10M in funding by making them look professional and established.'
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
             <span className="font-mono text-[9px] uppercase tracking-widest">← Back to Work</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.4em]">Project Case Study // {project.year}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-syne font-black text-white uppercase italic leading-[0.85] mb-12 lag-text">
               {project.title}
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
              <div className="text-white/20 font-mono text-[8px] mb-4 uppercase tracking-widest">The Result</div>
              <p className="text-white text-lg font-syne italic">{project.outcome}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-[4/5] bg-gradient-to-br from-white/5 to-transparent border border-white/10 clip-panel flex items-center justify-center overflow-hidden"
          >
            <div className="hud-grid opacity-20" />
            <div className="text-white/10 font-mono text-[10px] tracking-[2em] uppercase -rotate-90">Project Visual</div>
          </motion.div>
        </div>

        <div className="mt-64 flex flex-col items-center text-center">
           <h3 className="text-2xl font-syne font-black text-white uppercase italic mb-12">READY TO WORK WITH US?</h3>
           <Link href="/contact">
              <button className="clip-button">GET IN TOUCH →</button>
           </Link>
        </div>
      </div>
    </main>
  )
}
