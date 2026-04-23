'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  PerspectiveCamera, 
  Stars,
  Float
} from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Depth-Enhanced Warp Shader ─────────────────────────── */
const WarpMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uSpeed: { value: 1.0 },
    uColor: { value: new THREE.Color("#ffffff") },
  },
  vertexShader: `
    varying vec2 vUv;
    varying float vZ;
    void main() {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vZ = mvPosition.z;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uSpeed;
    uniform vec3 uColor;
    varying vec2 vUv;
    varying float vZ;
    
    void main() {
      // Sharp, elegant energy lines
      float lines = sin(vUv.x * 25.0 + uTime * 15.0 * uSpeed) * sin(vUv.y * 25.0);
      float glow = smoothstep(0.97, 1.0, lines);
      
      // Enhanced Depth Fade: Creates a deeper 'void' look at the end
      float depthFade = clamp(1.0 - (abs(vZ) / 130.0), 0.0, 1.0);
      
      gl_FragColor = vec4(uColor, glow * depthFade * (0.35 + uSpeed * 0.15));
    }
  `
}

/* ─── Warp Tunnel Component ───────────────────────────────── */
function WarpTunnel() {
  const tunnelRef = useRef()
  const mouse = useThree((state) => state.mouse)
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    WarpMaterial.uniforms.uTime.value = t
    WarpMaterial.uniforms.uMouse.value.lerp(mouse, 0.05)
    
    if (tunnelRef.current) {
      tunnelRef.current.rotation.z = t * 0.02
      tunnelRef.current.rotation.x = Math.PI / 2 + mouse.y * 0.15
      tunnelRef.current.rotation.y = mouse.x * 0.15
    }
  })

  return (
    <group ref={tunnelRef}>
      <mesh>
        {/* Lengthened tunnel for more depth */}
        <cylinderGeometry args={[16, 1, 200, 48, 1, true]} />
        <shaderMaterial 
          args={[WarpMaterial]} 
          side={THREE.BackSide}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      
      {/* Increased rings from 12 to 20 for extra depth layers */}
      {useMemo(() => [...Array(20)].map((_, i) => (
        <mesh key={i} position={[0, 80 - i * 10, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[15 - i * 0.7, 0.005, 12, 64]} />
          <meshBasicMaterial color="white" transparent opacity={0.08 - (i * 0.002)} />
        </mesh>
      )), [])}
    </group>
  )
}

/* ─── Main Scene ──────────────────────────────────────────── */
function Scene() {
  const cameraRef = useRef()
  const mouse = useThree((state) => state.mouse)

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
    
    // Deeper zoom range
    tl.to(cameraRef.current.position, { z: -120, ease: "none" }, 0)
    
    return () => tl.kill()
  }, [])

  useFrame(() => {
    if (cameraRef.current) {
      const targetX = mouse.x * 8
      const targetY = mouse.y * 6
      cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, targetX, 0.05)
      cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, targetY, 0.05)
      cameraRef.current.lookAt(0, 0, cameraRef.current.position.z - 60)
    }
  })

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 45]} fov={65} />
      
      {/* Extra background layer for depth */}
      <Stars radius={400} depth={100} count={5000} factor={8} saturation={0} fade speed={1} />
      
      {/* Floating subtle debris for parallax depth */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Stars radius={100} depth={50} count={500} factor={4} saturation={0} />
      </Float>

      <WarpTunnel />
      
      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom luminanceThreshold={0.9} intensity={2.5} radius={0.4} />
        <Vignette eskil={false} offset={0.1} darkness={1.6} />
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