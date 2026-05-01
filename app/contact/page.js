'use client'

import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, Suspense } from 'react'

const HouseScene = dynamic(() => import('@/components/canvas/HouseScene'), { ssr: false })

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('IDLE') // IDLE, SENDING, SUCCESS, ERROR

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('SENDING')

    // Simulate success
    setTimeout(() => {
      setStatus('SUCCESS')
      setFormState({ name: '', email: '', message: '' })
    }, 2000)
  }

  return (
    <main className="relative min-h-screen bg-black pt-40 md:pt-64 pb-24 px-6 md:px-24 z-10 overflow-hidden">
      <div className="scanlines" />
      
      {/* 3D Background specifically for contact page */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <Suspense fallback={null}>
          <HouseScene />
        </Suspense>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 pointer-events-auto">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-12 h-[1px] bg-white/40" />
          <span className="text-white/40 font-mono text-[11px] tracking-widest md:tracking-[0.5em] uppercase font-bold text-center md:text-left">Protocol_09 // Mission_Request</span>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[clamp(2rem,8vw,7rem)] font-syne font-black uppercase leading-[1.1] md:leading-tight mb-16 md:mb-24 italic text-center"
        >
          <span className="text-white">INITIATE </span>
          <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', color: 'transparent' }}>CONTACT.</span>
        </motion.h1>

        <div className="clip-panel p-8 md:p-16 bg-white/[0.02] border border-white/10 relative overflow-hidden">
          <div className="hud-grid opacity-10" />
          
          <AnimatePresence mode="wait">
            {status === 'SUCCESS' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-20 text-center"
              >
                <div className="text-4xl font-syne font-black text-white mb-6 uppercase italic tracking-tighter">Mission Confirmed.</div>
                <p className="text-white/40 font-mono text-[10px] tracking-widest uppercase">Signal intercepted // Expect response within 24 orbit cycles.</p>
                <button 
                  onClick={() => setStatus('IDLE')}
                  className="mt-12 text-[10px] font-black text-[#E8002D] hover:text-white uppercase tracking-[0.5em] transition-colors"
                >
                  [ RESET_TERMINAL ]
                </button>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="flex flex-col gap-2 md:gap-4">
                    <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Your Name</label>
                    <input 
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      className="bg-transparent border-b border-white/10 py-4 text-white font-sans focus:border-[#E8002D] outline-none transition-colors"
                      placeholder="ENTER IDENTITY..."
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:gap-4">
                    <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Email Address</label>
                    <input 
                      required
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      className="bg-transparent border-b border-white/10 py-4 text-white font-sans focus:border-[#E8002D] outline-none transition-colors"
                      placeholder="SIGNAL@DOMAIN.COM"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:gap-4">
                  <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Project Details</label>
                  <textarea 
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    className="bg-transparent border-b border-white/10 py-4 text-white font-sans focus:border-[#E8002D] outline-none transition-colors resize-none"
                    placeholder="DESCRIBE THE OBJECTIVE..."
                  />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="text-[10px] font-mono text-white/10 uppercase tracking-widest max-w-[250px] text-center md:text-left">
                    Note: All signals are encrypted via 256-bit starlight protocol. Data sovereignty is maintained.
                  </div>
                  <button 
                    disabled={status === 'SENDING'}
                    type="submit" 
                    className={`clip-button w-full md:w-auto ${status === 'SENDING' ? 'opacity-50 cursor-wait' : ''}`}
                  >
                    {status === 'SENDING' ? 'SENDING...' : 'TRANSMIT SIGNAL →'}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
