'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
 
  useEffect(() => {
    setMounted(true)
    const mobileCheck = window.matchMedia('(pointer: coarse)').matches
    setIsMobile(mobileCheck)
    if (mobileCheck) return

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('hover-magnetic')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // Do not render on server or mobile/touch devices
  if (!mounted || isMobile) {
    return null
  }

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[10000]" style={{ mixBlendMode: 'difference' }}>
      
      {/* ── Main Dot ── */}
      <motion.div
        className="fixed top-0 left-0 bg-white rounded-full"
        animate={{ 
          x: mousePos.x, 
          y: mousePos.y,
          width: isHovering ? 80 : 8,
          height: isHovering ? 80 : 8,
          translateX: '-50%',
          translateY: '-50%',
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: isHovering ? 100 : 300, 
          damping: isHovering ? 15 : 20, 
          mass: 0.5 
        }}
      />

      {/* ── Magnetic Ring (Outer) ── */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          width: isHovering ? 0 : 40,
          height: isHovering ? 0 : 40,
          opacity: isHovering ? 0 : 0.4,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 20,
          mass: 0.8
        }}
      />

      {/* ── Hover Text (View / Explore) ── */}
      <motion.div
        className="fixed top-0 left-0 font-syne font-bold text-black uppercase text-[10px] tracking-widest whitespace-nowrap"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1 : 0,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ duration: 0.2 }}
      >
        Click
      </motion.div>
    </div>
  )
}
