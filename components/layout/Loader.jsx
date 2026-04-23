'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Loader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setLoading(false), 500)
          return 100
        }
        return prev + Math.floor(Math.random() * 15) + 5
      })
    }, 150)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center pointer-events-auto"
        >
          <div className="relative flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-white font-black font-syne text-6xl md:text-8xl tracking-tighter italic mb-12"
            >
              WEDO<span className="text-white/20">.SYS</span>
            </motion.div>
            
            <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_white]"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="mt-6 flex justify-between w-64 text-[8px] font-mono text-white/40 uppercase tracking-widest">
              <span>Initializing_Orbit</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
          </div>

          <div className="absolute bottom-12 left-12 text-[7px] font-mono text-white/10 uppercase tracking-[0.5em]">
            Protocol_v9.0 // Space_Command
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
