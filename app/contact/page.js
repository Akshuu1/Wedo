'use client'

import HouseScene from '@/components/canvas/HouseScene'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('IDLE') // IDLE, SENDING, SUCCESS, ERROR

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('SENDING')

    // Note: User needs to replace these with their real EmailJS credentials
    // For now, we simulate the success state for the UI demonstration
    setTimeout(() => {
      setStatus('SUCCESS')
      setFormState({ name: '', email: '', message: '' })
    }, 2000)
    
    /* 
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formState, 'YOUR_PUBLIC_KEY')
      .then(() => setStatus('SUCCESS'))
      .catch(() => setStatus('ERROR'))
    */
  }

  return (
    <main className="relative min-h-screen bg-black pt-64 pb-24 px-10 md:px-24 z-10 overflow-hidden">
      <div className="scanlines" />
      <HouseScene />

      <div className="max-w-4xl mx-auto relative z-10 pointer-events-auto">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-12 h-[1px] bg-white/40" />
          <span className="text-white/40 font-mono text-[9px] tracking-[0.5em] uppercase font-bold">Protocol_09 // Mission_Request</span>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-syne font-black uppercase leading-[0.8] mb-24 text-white italic"
        >
          INITIATE<br/>
          <span className="text-white/20">CONTACT.</span>
        </motion.h1>

        <div className="clip-panel p-12 bg-white/[0.02] border border-white/10 relative">
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
                  className="mt-12 text-[10px] font-black text-white/20 hover:text-white uppercase tracking-[0.5em] transition-colors"
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
                  <div className="flex flex-col gap-4">
                    <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Commander_Name</label>
                    <input 
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      className="bg-transparent border-b border-white/10 py-4 text-white font-sans focus:border-white outline-none transition-colors"
                      placeholder="ENTER IDENTITY..."
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Comms_Frequency</label>
                    <input 
                      required
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      className="bg-transparent border-b border-white/10 py-4 text-white font-sans focus:border-white outline-none transition-colors"
                      placeholder="SIGNAL@DOMAIN.COM"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Mission_Briefing</label>
                  <textarea 
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    className="bg-transparent border-b border-white/10 py-4 text-white font-sans focus:border-white outline-none transition-colors resize-none"
                    placeholder="DESCRIBE THE OBJECTIVE..."
                  />
                </div>

                <div className="flex justify-between items-end">
                  <div className="text-[7px] font-mono text-white/10 uppercase tracking-widest max-w-[200px]">
                    Note: All signals are encrypted via 256-bit starlight protocol.
                  </div>
                  <button 
                    disabled={status === 'SENDING'}
                    type="submit" 
                    className={`clip-button ${status === 'SENDING' ? 'opacity-50 cursor-wait' : ''}`}
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
