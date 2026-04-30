'use client'

import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Image, ScrollControls, Scroll, Float, Text, MeshReflectorMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'

const PROJECTS = [
  { url: 'https://picsum.photos/seed/wedo1/800/1000', title: 'Aero Dynamics', pos: [-2, 0, 0], scale: [3, 4] },
  { url: 'https://picsum.photos/seed/wedo2/800/600', title: 'Space Command', pos: [2, 1, -2], scale: [3, 2.5] },
  { url: 'https://picsum.photos/seed/wedo3/600/800', title: 'Cyber Pulse', pos: [-3, 2, -4], scale: [2, 3] },
  { url: 'https://picsum.photos/seed/wedo4/800/600', title: 'Neon Velocity', pos: [3, -1, -5], scale: [4, 3] },
]

function ProjectCard({ url, title, pos, scale, ...props }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.material.zoom = THREE.MathUtils.damp(ref.current.material.zoom, hovered ? 1.1 : 1, 4, delta)
    ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, hovered ? 0 : 0.8, 4, delta)
  })

  return (
    <group position={pos}>
      <Image 
        ref={ref} 
        url={url} 
        scale={scale} 
        onPointerOver={() => hover(true)} 
        onPointerOut={() => hover(false)}
        transparent
        opacity={0.9}
      />
      <Text
        position={[0, -scale[1]/2 - 0.5, 0]}
        fontSize={0.2}
        anchorX="center"
        anchorY="middle"
        color="white"
      >
        {title.toUpperCase()}
      </Text>
    </group>
  )
}

function Rig() {
  const { camera, mouse } = useThree()
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 2, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 2, 0.05)
    camera.lookAt(0, 0, -5)
  })
  return null
}

export default function InteractiveLab() {
  return (
    <div className="w-full h-[600px] bg-black relative border-y border-white/5">
      <div className="absolute top-10 left-10 z-10 space-y-2 pointer-events-none">
        <div className="flex items-center gap-4">
          <div className="w-8 h-[1px] bg-[#E8002D]" />
          <span className="font-mono text-[10px] text-[#E8002D] uppercase tracking-[0.4em] font-bold">Interactive Gallery</span>
        </div>
        <h2 className="text-4xl font-syne font-black text-white uppercase italic">Interactive <span className="text-white/20">Lab</span></h2>
        <p className="text-white/40 font-mono text-[9px] uppercase tracking-widest">Use mouse to explore our digital archive</p>
      </div>

      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 5, 15]} />
        
        <Suspense fallback={null}>
          <ScrollControls pages={2} horizontal={false}>
            <Scroll>
              {PROJECTS.map((p, i) => (
                <ProjectCard key={i} {...p} />
              ))}
              
              {/* Ground Reflection */}
              <mesh position={[0, -4, -5]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[20, 20]} />
                <MeshReflectorMaterial
                  blur={[300, 100]}
                  resolution={1024}
                  mixBlur={1}
                  mixStrength={40}
                  roughness={1}
                  depthScale={1.2}
                  minDepthThreshold={0.4}
                  maxDepthThreshold={1.4}
                  color="#101010"
                  metalness={0.5}
                />
              </mesh>
            </Scroll>
            
            <Rig />
            <Environment preset="city" />
          </ScrollControls>
        </Suspense>
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
      </Canvas>

      <div className="absolute bottom-10 right-10 z-10 pointer-events-none">
        <div className="text-right space-y-1">
          <div className="font-mono text-[8px] text-white/20 uppercase tracking-[0.2em]">Live</div>
          <div className="font-mono text-[10px] text-white uppercase tracking-[0.3em]">3D Exploration Mode</div>
        </div>
      </div>
    </div>
  )
}
