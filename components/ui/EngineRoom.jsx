'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function EngineRoom() {
  const [metrics, setMetrics] = useState({
    cpu: 12,
    mem: 45,
    ping: 24,
    uptime: '00:00:00'
  })

  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 15) + 5,
        mem: Math.floor(Math.random() * 10) + 40,
        ping: Math.floor(Math.random() * 5) + 20,
        uptime: new Date(Date.now() - startTime).toISOString().substr(11, 8)
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-10 left-10 z-[40] hidden lg:block pointer-events-none">
      <div className="flex flex-col gap-4">
        
        {/* Status Card 1: Core Metrics */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-black/40 backdrop-blur-md border border-white/10 p-4 w-48 clip-panel"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 bg-[#E8002D] rounded-full animate-pulse" />
            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">System_Health</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px]">
              <span className="text-white/20 uppercase">Core_Load</span>
              <span className="text-white">{metrics.cpu}%</span>
            </div>
            <div className="w-full h-[2px] bg-white/5 overflow-hidden">
              <motion.div 
                animate={{ width: `${metrics.cpu}%` }}
                className="h-full bg-[#E8002D]"
              />
            </div>
            
            <div className="flex justify-between font-mono text-[10px] mt-2">
              <span className="text-white/20 uppercase">Latency</span>
              <span className="text-white">{metrics.ping}ms</span>
            </div>
          </div>
        </motion.div>

        {/* Status Card 2: Mission Clock */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black/40 backdrop-blur-md border border-white/10 p-4 w-48 clip-panel"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Session_Uptime</span>
          </div>
          <div className="font-mono text-xl text-white tracking-tighter">
            {metrics.uptime}
          </div>
        </motion.div>

        {/* Status Card 3: Active Protocol */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-black/40 backdrop-blur-md border border-white/10 p-3 w-48 border-l-2 border-l-[#E8002D]"
        >
          <div className="font-mono text-[8px] text-[#E8002D] uppercase tracking-[0.3em] mb-1">Status: Active</div>
          <div className="font-syne font-bold text-[10px] text-white uppercase italic">
            Next.js_Turbo_v15.0
          </div>
        </motion.div>

      </div>
    </div>
  )
}
