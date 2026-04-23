'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  // Aggressive Spaceship Shape
  const shipClip = "polygon(15px 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 15px 100%, 0 50%)"

  return (
    <nav className="fixed top-0 left-0 w-full z-[10001] px-4 md:px-0 py-6 pointer-events-none">
      <div className="container mx-auto flex justify-center pointer-events-auto">
        
        {/* Spaceship Container */}
        <div className="relative w-full max-w-4xl h-14 md:h-16 group">
          
          {/* Border layer (Outer Shape) */}
          <div 
            className="absolute inset-0 bg-white/20 transition-all duration-500 group-hover:bg-white/40 flex items-center justify-center p-[1px]"
            style={{ clipPath: shipClip }}
          >
            {/* Content layer (Inner Shape) */}
            <div 
              className="w-full h-full bg-black/90 backdrop-blur-3xl flex items-center justify-between px-6 md:px-12"
              style={{ clipPath: shipClip }}
            >
              
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 md:gap-3 group/logo">
                <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center border border-white/20 rounded-sm group-hover/logo:border-white transition-colors">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl font-black font-syne tracking-tighter text-white uppercase italic leading-none">
                    WEDO
                  </span>
                  <span className="text-[5px] md:text-[6px] font-mono tracking-[0.4em] text-white/40 uppercase hidden sm:block">
                    COMMAND.CTRL
                  </span>
                </div>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-10">
                {navItems.slice(0, 3).map((item, index) => (
                  <Link 
                    key={item.name} 
                    href={item.path}
                    className="relative group/link py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[6px] font-mono text-white/20">0{index + 1}</span>
                      <span className={`text-[10px] font-black tracking-[0.3em] uppercase transition-all
                        ${pathname === item.path ? 'text-white' : 'text-white/40 group-hover/link:text-white'}
                      `}>
                        {item.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Desktop CTA */}
              <div className="hidden md:block">
                <Link href="/contact">
                  <button className="bg-white text-black px-6 py-2 font-black text-[9px] tracking-widest uppercase hover:scale-105 transition-transform" style={{ clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0% 100%)" }}>
                    INITIATE
                  </button>
                </Link>
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex flex-col gap-1 w-6 items-end group/toggle"
              >
                <div className={`h-[1px] bg-white transition-all duration-300 ${isOpen ? 'w-6 rotate-45 translate-y-1' : 'w-6'}`} />
                <div className={`h-[1px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-4'}`} />
                <div className={`h-[1px] bg-white transition-all duration-300 ${isOpen ? 'w-6 -rotate-45 -translate-y-1' : 'w-5'}`} />
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-[1000] md:hidden pointer-events-auto"
          >
            <div 
              className="bg-white/20 p-[1px]"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)" }}
            >
              <div 
                className="bg-black/95 backdrop-blur-3xl p-8 flex flex-col gap-8"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)" }}
              >
                {navItems.map((item, index) => (
                  <Link 
                    key={item.name} 
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between group/mob"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[8px] font-mono text-white/20">0{index + 1}</span>
                      <span className="text-2xl font-syne font-black text-white uppercase italic">
                        {item.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
