'use client'

import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'
import ProjectConfigurator from '@/components/ui/ProjectConfigurator'

function Floating3D() {
  return (
    <div className="w-full h-[400px] md:h-[600px] absolute top-0 left-0 pointer-events-none opacity-40">
      <Canvas
        onCreated={({ gl }) => {
          gl.shadowMap.type = THREE.PCFShadowMap
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Sphere args={[1, 100, 200]} scale={2.5}>
              <MeshDistortMaterial
                color="#E8002D"
                attach="material"
                distort={0.4}
                speed={1.5}
                roughness={0.2}
                metalness={0.8}
              />
            </Sphere>
          </Float>
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}

const SERVICES = [
  {
    num: '01',
    title: 'Website Design',
    desc: 'Fast, beautiful, and easy-to-manage websites built specifically for your business.',
    tags: ['Next.js', 'React', 'Animation']
  },
  {
    num: '02',
    title: 'Brand Identity',
    desc: 'Logos, colors, and designs that make your brand stand out from the competition.',
    tags: ['Logo', 'Styleguide', 'Assets']
  },
  {
    num: '03',
    title: 'UI/UX Design',
    desc: 'Smooth and user-friendly interfaces that keep your customers engaged.',
    tags: ['Figma', 'Prototyping', 'UX']
  },
  {
    num: '04',
    title: 'Social Media',
    desc: 'We manage your social platforms to help you grow your audience naturally.',
    tags: ['Strategy', 'Management', 'Ads']
  }
]

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-black pt-40 md:pt-64 pb-24 px-6 md:px-24 overflow-hidden">
      <div className="scanlines" />
      <Floating3D />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-12 h-[1px] bg-white/40" />
          <span className="text-white/60 font-mono text-[11px] tracking-[0.5em] uppercase font-bold">What We Offer</span>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[clamp(1.4rem,6vw,5.5rem)] md:text-[clamp(3rem,8vw,7rem)] font-syne font-black uppercase leading-tight mb-20 md:mb-32 italic text-center"
        >
          <span className="text-white">OUR </span>
          <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', color: 'transparent' }}>SERVICES.</span>
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {SERVICES.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-black p-10 md:p-16 overflow-hidden hover:bg-white/[0.02] transition-all"
            >
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#E8002D] group-hover:w-full transition-all duration-700" />
              
              <div className="flex justify-between items-start mb-12">
                <span className="font-mono text-[#E8002D] text-xs font-bold tracking-widest">{service.num}</span>
                <div className="flex gap-2">
                  {service.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 border border-white/20 text-[10px] font-mono text-white/60 uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-syne font-black text-white uppercase italic mb-6 tracking-tighter group-hover:text-[#E8002D] transition-colors">
                {service.title}
              </h2>
              
              <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md font-light">
                {service.desc}
              </p>

              <div className="mt-12 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-[10px] font-black text-white uppercase tracking-[0.4em] flex items-center gap-4">
                  GET STARTED <span className="text-[#E8002D]">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-32">
          <ProjectConfigurator />
        </div>
      </div>
    </main>
  )
}
