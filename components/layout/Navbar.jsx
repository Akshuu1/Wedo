'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useScroll } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrolled(latest > 50)
    })
  }, [scrollY])

  const navItems = [
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
  ]

  const shipClipPath = "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)"

  return (
    <nav className={`fixed top-0 left-0 w-full z-[1001] transition-all duration-700 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="container mx-auto px-6 max-w-screen-xl flex justify-center">
        
        <div 
          className={`flex items-center justify-between px-12 py-3 transition-all duration-500 w-full max-w-4xl relative
            ${scrolled ? 'bg-black/80 backdrop-blur-2xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]' : 'bg-black/20 backdrop-blur-md border border-white/10'}
          `}
          style={{ clipPath: shipClipPath }}
        >
          <Link href="/" className="relative z-10 flex items-center gap-3 group">
            <div className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-sm group-hover:border-white transition-colors">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black font-syne tracking-tighter text-white uppercase italic leading-none">
                WEDO
              </span>
              <span className="text-[6px] font-mono tracking-[0.5em] text-white/40 uppercase">
                COMMAND.CTRL
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-10 relative z-10">
            {navItems.map((item, index) => (
              <Link 
                key={item.name} 
                href={item.path}
                className={`flex flex-col group relative`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[6px] font-mono text-white/20">0{index + 1}</span>
                  <span className={`text-[10px] font-black tracking-[0.3em] uppercase transition-colors duration-300
                    ${pathname === item.path ? 'text-white' : 'text-white/40 group-hover:text-white'}
                  `}>
                    {item.name}
                  </span>
                </div>
                {pathname === item.path && (
                  <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 w-full h-[1px] bg-white shadow-[0_0_10px_white]" />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center relative z-10">
            <Link href="/contact">
              <div className="relative overflow-hidden group cursor-pointer border border-white/20 bg-white/5 px-6 py-2 transition-all hover:bg-white hover:text-black">
                <span className="relative z-10 text-[8px] font-black tracking-[0.2em] uppercase transition-colors">
                  INITIATE
                </span>
              </div>
            </Link>
          </div>
          
        </div>
      </div>
    </nav>
  )
}
