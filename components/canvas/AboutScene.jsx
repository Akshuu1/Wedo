'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

/* ─── Floating Geometric Ring ─────────────────────────────── */
function FloatingRing({ radius, tube, position, rotationSpeed, phase }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    ref.current.rotation.x = Math.sin(t * rotationSpeed + phase) * 0.4
    ref.current.rotation.y = t * rotationSpeed * 0.7
    ref.current.rotation.z = Math.cos(t * rotationSpeed * 0.5 + phase) * 0.3
    ref.current.position.y = position[1] + Math.sin(t * 0.4 + phase) * 0.8
  })
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[radius, tube, 8, 64]} />
      <meshBasicMaterial color="white" transparent opacity={0.06} wireframe />
    </mesh>
  )
}

/* ─── Particle Field ──────────────────────────────────────── */
function ParticleField() {
  const ref = useRef()
  const mouse = useThree(s => s.mouse)

  const { positions, speeds } = useMemo(() => {
    const count = 600
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30
      spd[i] = Math.random() * 0.4 + 0.1
    }
    return { positions: pos, speeds: spd }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const pos = ref.current.geometry.attributes.position.array
    for (let i = 0; i < 600; i++) {
      pos[i * 3 + 1] += speeds[i] * 0.01
      if (pos[i * 3 + 1] > 25) pos[i * 3 + 1] = -25
    }
    ref.current.geometry.attributes.position.needsUpdate = true
    // Subtle mouse parallax
    ref.current.rotation.x = mouse.y * -0.05
    ref.current.rotation.y = mouse.x * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="white" size={0.04} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

/* ─── Cinematic Grid Floor ────────────────────────────────── */
function GridFloor() {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.material.opacity = 0.03 + Math.sin(clock.elapsedTime * 0.5) * 0.01
  })
  return (
    <gridHelper ref={ref} args={[80, 40, 'white', 'white']} position={[0, -12, 0]} rotation={[0, 0, 0]}>
      <meshBasicMaterial color="white" transparent opacity={0.03} />
    </gridHelper>
  )
}

/* ─── Large slow sphere for depth ────────────────────────── */
function DepthSphere() {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.03
    ref.current.rotation.x = clock.elapsedTime * 0.01
  })
  return (
    <mesh ref={ref} position={[4, 0, -15]}>
      <icosahedronGeometry args={[6, 1]} />
      <meshBasicMaterial color="white" transparent opacity={0.015} wireframe />
    </mesh>
  )
}

/* ─── Main Scene ──────────────────────────────────────────── */
function Scene() {
  const cameraRef = useRef()
  const mouse = useThree(s => s.mouse)

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.position.x += (mouse.x * 2 - cameraRef.current.position.x) * 0.03
      cameraRef.current.position.y += (mouse.y * 1 - cameraRef.current.position.y) * 0.03
      cameraRef.current.lookAt(0, 0, 0)
    }
  })

  const rings = useMemo(() => [
    { radius: 6,  tube: 0.012, position: [-6,  2, -8],  rotationSpeed: 0.18, phase: 0 },
    { radius: 4,  tube: 0.010, position: [ 7, -1, -5],  rotationSpeed: 0.24, phase: 1.2 },
    { radius: 8,  tube: 0.008, position: [ 0,  4, -12], rotationSpeed: 0.12, phase: 2.4 },
    { radius: 3,  tube: 0.014, position: [-4, -3, -4],  rotationSpeed: 0.30, phase: 0.8 },
    { radius: 10, tube: 0.006, position: [ 3,  0, -18], rotationSpeed: 0.08, phase: 3.1 },
    { radius: 5,  tube: 0.010, position: [ 9,  5, -10], rotationSpeed: 0.20, phase: 1.7 },
  ], [])

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 20]} fov={65} />
      <Stars radius={200} depth={80} count={2500} factor={4} saturation={0} fade speed={1} />
      <ParticleField />
      <GridFloor />
      <DepthSphere />
      {rings.map((r, i) => <FloatingRing key={i} {...r} />)}
      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom luminanceThreshold={0.5} intensity={1.5} radius={0.6} />
        <Vignette eskil={false} offset={0.1} darkness={1.6} />
      </EffectComposer>
    </>
  )
}

/* ─── Export ──────────────────────────────────────────────── */
export default function AboutScene() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="fixed inset-0 bg-black" />

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
