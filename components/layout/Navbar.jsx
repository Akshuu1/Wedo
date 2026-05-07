'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

// ── Magnetic Link Component ──
function MagneticLink({ children, href, active, onClick }) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <Link href={href} onClick={onClick}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        className="relative px-4 py-2 group cursor-pointer"
      >
        <span className={`relative z-10 text-[12px] font-bold tracking-[0.3em] uppercase transition-colors duration-300 ${active ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
          {children}
        </span>
        {active && (
          <motion.div
            layoutId="nav-pill"
            className="absolute inset-0 bg-white/10 rounded-full"
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
        )}
      </motion.div>
    </Link>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  
  // Navbar hides on scroll down, shows on scroll up
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const previous = scrollY.getPrevious()
      if (latest > previous && latest > 150) {
        setHidden(true)
      } else {
        setHidden(false)
      }
    })
  }, [scrollY])

  const navItems = [
    { name: 'Services', path: '/services' },
    { name: 'Work',     path: '/work' },
    { name: 'About',    path: '/about' },
  ]

  // Menu Animation Variants
  const menuVariants = {
    initial: { scaleY: 0 },
    animate: { scaleY: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    exit: { scaleY: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 } }
  }

  const linkVariants = {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { y: '100%', opacity: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <>
      <motion.nav 
        variants={{ visible: { y: 0 }, hidden: { y: '-150%' } }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-0 w-full z-[10001] pointer-events-none px-6 flex justify-center"
      >
        <div className="pointer-events-auto flex items-center justify-between bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 w-full max-w-5xl xl:max-w-7xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-2 h-2 bg-[#E8002D] rounded-full animate-pulse shadow-[0_0_10px_#E8002D]" />
            <span className="text-sm font-black font-syne tracking-tighter text-white uppercase italic leading-none">
              WEDO<span className="text-[#E8002D]">.</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <MagneticLink key={item.name} href={item.path} active={pathname === item.path}>
                {item.name}
              </MagneticLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link href="/contact">
              <button className="bg-white text-black px-5 py-2 rounded-full font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-[#E8002D] hover:text-white transition-colors duration-300">
                Let's Talk
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-[10002]"
          >
            <motion.div animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }} className="w-6 h-[1.5px] bg-white transform origin-center" />
            <motion.div animate={{ opacity: isOpen ? 0 : 1 }} className="w-6 h-[1.5px] bg-white" />
            <motion.div animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }} className="w-6 h-[1.5px] bg-white transform origin-center" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[10000] bg-black origin-top flex flex-col justify-between p-6 md:p-10"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

            <div className="flex-1 flex flex-col justify-center gap-4 relative z-10 mt-20">
              {[...navItems, { name: 'Contact', path: '/contact' }].map((item, index) => (
                <div key={item.name} className="overflow-hidden">
                  <motion.div
                    variants={linkVariants}
                    custom={index}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Link href={item.path} onClick={() => setIsOpen(false)} aria-label={`Navigate to ${item.name}`} className="group flex items-baseline gap-4 w-fit">
                      <span className="text-[12px] md:text-[12px] font-mono text-white/30">0{index + 1}</span> 
                      <span className={`text-[clamp(2rem,10vw,5rem)] md:text-6xl font-syne font-black uppercase italic transition-colors duration-300 ${pathname === item.path ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
                        {item.name}
                      </span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.8 }}
              className="relative z-10 flex justify-between items-end border-t border-white/10 pt-8"
            >
              <div className="font-mono text-[12px] text-white/50 uppercase tracking-widest">
                System Active<br/>WEDO © 2024
              </div>
              <div className="flex gap-4">
                <a href="#" className="font-mono text-[12px] text-white hover:text-[#E8002D] uppercase tracking-widest">IG</a>
                <a href="#" className="font-mono text-[12px] text-white hover:text-[#E8002D] uppercase tracking-widest">IN</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
