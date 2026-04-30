'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Stars } from '@react-three/drei'

import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Very subtle F1 speed-line shader ── */
const SpeedLineMaterial = {
  uniforms: {
    uTime:  { value: 0 },
    uColor: { value: new THREE.Color('#E8002D') },
  },
  vertexShader: `
    varying vec2 vUv;
    varying float vZ;
    void main() {
      vUv = uv;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vZ = mv.z;
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3  uColor;
    varying vec2  vUv;
    varying float vZ;
    void main() {
      float lines = sin(vUv.x * 80.0 + uTime * 6.0) * 0.5 + 0.5;
      float sharp = pow(lines, 40.0);
      float depth  = clamp(1.0 - abs(vZ) / 100.0, 0.0, 1.0);
      // Only show at top/bottom edges, fade in center
      float edgeMask = 1.0 - smoothstep(0.0, 0.5, abs(vUv.y - 0.5) * 2.0);
      gl_FragColor = vec4(uColor, sharp * depth * 0.08 * (1.0 - edgeMask));
    }
  `
}

function SpeedLines() {
  const ref = useRef()
  useFrame((s) => {
    SpeedLineMaterial.uniforms.uTime.value = s.clock.elapsedTime
    if (ref.current) ref.current.rotation.z = s.clock.elapsedTime * 0.01
  })
  return (
    <group ref={ref}>
      <mesh>
        <cylinderGeometry args={[20, 2, 300, 80, 1, true]} />
        <shaderMaterial
          args={[SpeedLineMaterial]}
          side={THREE.BackSide}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function Scene() {
  const cameraRef = useRef()
  const mouse = useThree((s) => s.mouse)

  useEffect(() => {
    if (!cameraRef.current) return
    const tl = gsap.timeline({
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1 }
    })
    tl.to(cameraRef.current.position, { z: -80, ease: 'none' }, 0)
    return () => tl.kill()
  }, [])

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, mouse.x * 3, 0.03)
      cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, mouse.y * 2, 0.03)
      cameraRef.current.lookAt(0, 0, cameraRef.current.position.z - 40)
    }
  })

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 35]} fov={60} />
      {/* Clean sparse stars — 2500 max so they don't crowd */}
      <Stars radius={250} depth={50} count={2500} factor={3} saturation={0} fade speed={0.2} />
      <SpeedLines />
    </>
  )
}

export default function HouseScene() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="fixed inset-0 bg-black" />
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <Canvas dpr={1} gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}>
        <Scene />
      </Canvas>
    </div>
  )
}