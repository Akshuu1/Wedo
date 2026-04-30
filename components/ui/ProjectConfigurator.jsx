'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const SERVICES = [
  { id: 'web', name: 'Website Design', basePrice: 15000, time: 2 },
  { id: 'brand', name: 'Brand Identity', basePrice: 10000, time: 1 },
  { id: 'ui', name: 'UI/UX Design', basePrice: 12000, time: 2 },
  { id: 'social', name: 'Social Media', basePrice: 8000, time: 4 },
  { id: '3d', name: '3D Interactions', basePrice: 20000, time: 3 },
]

export default function ProjectConfigurator() {
  const [selected, setSelected] = useState(['web'])

  const toggleService = (id) => {
    setSelected(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id)
        : [...prev, id]
    )
  }

  const totalCost = selected.reduce((acc, id) => {
    const s = SERVICES.find(srv => srv.id === id)
    return acc + (s ? s.basePrice : 0)
  }, 0)

  const maxTime = selected.reduce((acc, id) => {
    const s = SERVICES.find(srv => srv.id === id)
    return Math.max(acc, (s ? s.time : 0))
  }, 0)

  return (
    <div className="w-full max-w-4xl mx-auto bg-black/80 backdrop-blur-md border border-white/10 p-8 text-left relative overflow-hidden group">
      <div className="hud-grid opacity-[0.03]" />
      
      {/* Scanning laser effect */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#E8002D]/50 shadow-[0_0_10px_#E8002D] animate-scan pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-12">
        
        {/* Left Side: Toggles */}
        <div className="md:col-span-3 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-[#E8002D] rounded-full animate-pulse" />
            <h3 className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/50">Interactive Configurator</h3>
          </div>
          
          <h4 className="font-syne font-black text-white text-2xl uppercase italic mb-8">
            Select Required <span className="text-[#E8002D]">Modules</span>
          </h4>

          <div className="flex flex-wrap gap-3">
            {SERVICES.map(s => {
              const isActive = selected.includes(s.id)
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleService(s.id)}
                  className={`relative z-20 px-4 py-3 font-mono text-[11px] uppercase tracking-widest border transition-all duration-300 ${
                    isActive 
                      ? 'border-[#E8002D] bg-[#E8002D]/10 text-white shadow-[inset_0_0_15px_rgba(232,0,45,0.2)]' 
                      : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#E8002D]' : 'bg-white/10'}`} />
                    {s.name}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Side: Estimate Output */}
        <div className="md:col-span-2 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-10 flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2">Estimated Investment</div>
            <div className="font-syne font-black text-4xl md:text-5xl text-white mb-8">
              ₹{totalCost.toLocaleString('en-IN')}
              <span className="font-mono text-[10px] text-white/20 ml-2 uppercase">+ GST</span>
            </div>

            <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2">Estimated Timeline</div>
            <div className="font-syne font-black text-2xl text-white mb-10 italic">
              {maxTime === 0 ? '0' : `${maxTime} - ${maxTime + 1} Weeks`}
            </div>
          </div>

          <Link href={`/contact?services=${selected.join(',')}`}>
            <button className="w-full bg-white text-black py-4 font-bold font-mono text-[11px] tracking-[0.3em] uppercase hover:bg-[#E8002D] hover:text-white transition-colors duration-300 flex items-center justify-center gap-3">
              Initialize Project
              <span className="text-lg leading-none">↗</span>
            </button>
          </Link>
        </div>

      </div>
    </div>
  )
}
