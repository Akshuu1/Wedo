'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Direct state update for instant response (no spring lag)
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.closest('.clip-panel')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
      {/* Outer Circle - Reactive but very fast */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center"
        animate={{ 
          x: mousePos.x, 
          y: mousePos.y,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.2)'
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />

      {/* Core Star - Minimal and Sharp */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white]"
        animate={{ 
          x: mousePos.x, 
          y: mousePos.y,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 0.5 : 1
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />
      
      {/* Technical HUD Crosshair */}
      <motion.div
        className="fixed top-0 left-0 text-white/40 font-mono text-[6px] tracking-widest"
        animate={{ 
          x: mousePos.x + 20, 
          y: mousePos.y + 20,
          opacity: isHovering ? 1 : 0
        }}
      >
        [LOCK_ON]
      </motion.div>
    </div>
  )
}
