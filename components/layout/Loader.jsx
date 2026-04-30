'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const BOOT_LINES = [
  { t: 60,   text: 'WEDO_CORE v2.4 — SYSTEM BOOT', color: 'text-white/60' },
  { t: 800,  text: 'Mounting 3D Engine... OK', color: 'text-green-400/70' },
  { t: 1400, text: 'Calibrating telemetry sensors... OK', color: 'text-green-400/70' },
  { t: 2000, text: 'Linking orbital navigation grid... OK', color: 'text-green-400/70' },
  { t: 2600, text: 'Initializing creative core... OK', color: 'text-green-400/70' },
  { t: 3200, text: '>>> READY TO LAUNCH', color: 'text-[#E8002D]' },
]

export default function Loader({ loading, progress }) {
  const [lines, setLines] = useState([])

  useEffect(() => {
    const timers = BOOT_LINES.map(({ t, text, color }) =>
      setTimeout(() => setLines((p) => [...p, { text, color }]), t)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col"
          style={{
            background: 'radial-gradient(ellipse at 50% 80%, rgba(232,0,45,0.04) 0%, #000 60%)',
          }}
        >
          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none z-10"
            style={{ background: 'linear-gradient(rgba(0,0,0,0) 50%, rgba(255,255,255,0.012) 50%)', backgroundSize: '100% 3px' }}
          />

          {/* HUD Corner brackets */}
          {[
            'top-6 left-6 border-t border-l',
            'top-6 right-6 border-t border-r',
            'bottom-6 left-6 border-b border-l',
            'bottom-6 right-6 border-b border-r',
          ].map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`absolute w-12 h-12 border-[#E8002D] ${cls}`}
            />
          ))}

          {/* Top accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E8002D] to-transparent origin-left"
          />

          {/* Center content */}
          <div className="flex-1 flex flex-col items-center justify-center gap-10 relative z-10 px-8">

            {/* F1 Start Lights */}
            <div className="flex gap-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    backgroundColor: progress >= (i + 1) * 20 ? '#E8002D' : '#1a0000',
                    boxShadow: progress >= (i + 1) * 20
                      ? '0 0 16px #E8002D, 0 0 40px rgba(232,0,45,0.6)'
                      : '0 0 0px transparent',
                    scale: progress >= (i + 1) * 20 ? [1, 1.25, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-7 h-7 rounded-full border border-[#E8002D]/20"
                />
              ))}
            </div>

            {/* Agency name */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20, letterSpacing: '0.8em' }}
                animate={{ opacity: 1, y: 0, letterSpacing: '0.25em' }}
                transition={{ duration: 1.4, delay: 0.2 }}
                className="font-syne font-black text-white text-[clamp(3rem,10vw,7rem)] uppercase leading-none"
              >
                WEDO
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="font-mono text-[9px] text-[#E8002D] tracking-[0.7em] uppercase mt-3"
              >
                CREATIVE AGENCY
              </motion.div>
            </div>

            {/* Terminal boot log */}
            <div className="w-full max-w-lg border border-white/[0.06] bg-white/[0.015] backdrop-blur-sm p-5 font-mono text-[10px] min-h-[130px] space-y-1.5">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${line.color}`}
                >
                  <span className="text-white/20 select-none">›</span>
                  <span>{line.text}</span>
                </motion.div>
              ))}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.7 }}
                className="inline-block w-[6px] h-[12px] bg-[#E8002D] ml-5"
              />
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-lg">
              <div className="flex justify-between font-mono text-[9px] text-white/30 uppercase tracking-widest mb-2">
                <span>Loading_Assets</span>
                <motion.span className="text-white" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 1 }}>
                  {Math.round(progress)}%
                </motion.span>
              </div>
              <div className="h-[2px] w-full bg-white/[0.06] relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#E8002D]"
                  style={{ boxShadow: '0 0 16px #E8002D, 0 0 40px rgba(232,0,45,0.4)' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.08 }}
                />
                <motion.div
                  className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={{ left: `${Math.max(0, progress - 8)}%` }}
                  transition={{ duration: 0.08 }}
                />
              </div>
            </div>
          </div>

          {/* Bottom telemetry */}
          <div className="relative z-10 px-8 pb-6 flex justify-between font-mono text-[8px] text-white/20 uppercase tracking-widest">
            <span>GPS: 28.6139°N 77.2090°E</span>
            <span>ENGINE: ACTIVE</span>
            <span>WEDO_SYS © 2024</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
