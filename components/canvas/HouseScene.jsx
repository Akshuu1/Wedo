'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  PerspectiveCamera, 
  Stars,
} from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WarpMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uSpeed: { value: 1.0 },
    uColor: { value: new THREE.Color("#ffffff") }, // STRICT WHITE
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uSpeed;
    uniform vec3 uColor;
    varying vec2 vUv;
    
    void main() {
      vec2 distUv = vUv + uMouse * 0.03;
      float lines = sin(distUv.x * 25.0 + uTime * 12.0 * uSpeed) * sin(distUv.y * 25.0);
      float glow = smoothstep(0.95, 1.0, lines);
      float alpha = smoothstep(0.0, 0.4, vUv.y) * smoothstep(1.0, 0.6, vUv.y);
      gl_FragColor = vec4(uColor, glow * alpha * (0.35 + uSpeed * 0.15));
    }
  `
}

function WarpTunnel() {
  const tunnelRef = useRef()
  const mouse = useThree((state) => state.mouse)
  const [targetSpeed, setTargetSpeed] = useState(1)
  const currentSpeed = useRef(1)
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, targetSpeed, 0.08)
    
    WarpMaterial.uniforms.uTime.value = t
    WarpMaterial.uniforms.uSpeed.value = currentSpeed.current
    WarpMaterial.uniforms.uMouse.value.lerp(mouse, 0.05)
    
    if (tunnelRef.current) {
      tunnelRef.current.rotation.z = t * 0.03
      tunnelRef.current.rotation.x = Math.PI / 2 + mouse.y * 0.1
      tunnelRef.current.rotation.y = mouse.x * 0.1
    }
  })

  useEffect(() => {
    const handleScroll = () => {
      setTargetSpeed(5)
      const timeout = setTimeout(() => setTargetSpeed(1), 500)
      return () => clearTimeout(timeout)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <group ref={tunnelRef}>
      <mesh>
        <cylinderGeometry args={[12, 1, 120, 48, 1, true]} />
        <shaderMaterial 
          args={[WarpMaterial]} 
          side={THREE.BackSide}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      
      {useMemo(() => [...Array(12)].map((_, i) => (
        <mesh key={i} position={[0, 40 - i * 10, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[11 - i * 0.6, 0.008, 8, 48]} />
          <meshBasicMaterial color="white" transparent opacity={0.1} />
        </mesh>
      )), [])}
    </group>
  )
}

function Scene() {
  const cameraRef = useRef()

  useEffect(() => {
    if (!cameraRef.current) return
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    })
    tl.to(cameraRef.current.position, { z: -80, ease: "none" }, 0)
    return () => tl.kill()
  }, [])

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 40]} fov={60} />
      {/* Strict white stars, no saturation */}
      <Stars radius={300} depth={100} count={3500} factor={6} saturation={0} fade speed={2} />
      <WarpTunnel />
      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom luminanceThreshold={0.9} intensity={2.5} radius={0.4} />
        {/* Removed Chromatic Aberration to eliminate colors */}
        <Vignette eskil={false} offset={0.1} darkness={1.4} />
      </EffectComposer>
    </>
  )
}

export default function HouseScene() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="fixed inset-0 bg-black" />

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <Canvas 
        dpr={1} 
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
