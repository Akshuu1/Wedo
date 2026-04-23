'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 py-24 px-10 md:px-24 bg-black/40 backdrop-blur-xl border-t border-white/5">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-syne font-black text-white italic mb-8">WEDO<span className="text-white/20">.</span></h2>
            <p className="text-white/40 font-mono text-[10px] tracking-widest uppercase max-w-md leading-relaxed">
              ARCHITECTING DIGITAL WEAPONS FOR THE BOLD. <br/>
              HIGH-PERFORMANCE DESIGN // SCALABLE ASSETS // STRATEGIC DOMINANCE.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] mb-4">Navigation</span>
            {['Services', 'Work', 'About', 'Contact'].map((link) => (
              <Link key={link} href={`/${link.toLowerCase()}`} className="text-white/60 hover:text-white transition-colors font-mono text-[10px] tracking-[0.3em] uppercase">
                {link}
              </Link>
            ))}
          </div>

          {/* Status / Contact */}
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] mb-4">Command_Status</span>
            <div className="flex flex-col gap-2">
              <span className="text-white/60 font-mono text-[9px] tracking-widest uppercase underline underline-offset-4 decoration-white/20">ESTABLISHED // 2026</span>
              <span className="text-white/60 font-mono text-[9px] tracking-widest uppercase">BASED // WORLDWIDE</span>
            </div>
            <div className="mt-4">
              <Link href="/contact">
                <button className="text-[9px] font-black text-white px-4 py-2 border border-white/20 hover:bg-white hover:text-black transition-all uppercase tracking-[0.5em]">
                  [ START_MISSION ]
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
          <div className="flex gap-12 text-[7px] font-mono text-white/20 uppercase tracking-[0.5em]">
            <span>© {currentYear} WEDO SPACE COMMAND</span>
            <span>SYSTEM_V1.0</span>
          </div>
          
          <div className="flex gap-8">
            {['Instagram', 'X', 'LinkedIn'].map((social) => (
              <a key={social} href="#" className="text-[7px] font-mono text-white/20 hover:text-white transition-colors uppercase tracking-[0.4em]">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
