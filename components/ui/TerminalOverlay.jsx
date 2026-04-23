'use client'

import { useState, useEffect } from 'react'

const statusLines = [
  "SCANNING_NETWORK_NODES...",
  "PROTOCOL_09_ENGAGED",
  "UPLINK_STABLE // 12.4GB/S",
  "CORE_TEMP_OPTIMAL",
  "ENCRYPTING_SIGNAL_PATH...",
  "READY_FOR_INITIATION",
  "VISUAL_FEED_CALIBRATED",
  "DATABASE_SYNC_COMPLETE"
]

export default function TerminalOverlay() {
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % statusLines.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    // Moved to bottom-right to avoid overlap with left-aligned stats/metrics
    <div className="fixed bottom-12 right-12 z-[1001] hidden lg:block pointer-events-none text-right">
      <div className="flex flex-col gap-1 items-end">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] font-mono text-white/60 tracking-[0.4em] uppercase font-bold">System_Status</span>
          <div className="w-2 h-2 bg-white animate-pulse" />
        </div>
        <div className="h-[50px] overflow-hidden">
          <div 
            className="transition-transform duration-500 ease-in-out"
            style={{ transform: `translateY(-${lineIndex * 15}px)` }}
          >
            {statusLines.map((line, i) => (
              <div key={i} className="terminal-line h-[15px]">
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
