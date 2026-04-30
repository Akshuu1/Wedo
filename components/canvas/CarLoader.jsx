'use client'

import { useRef, useEffect, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useFBX, PerspectiveCamera, Center, Environment, MeshReflectorMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

// ── Cinematic Koenigsegg ──
function Koenigsegg({ progress }) {
  const fbx = useFBX('/models/koenigsegg.fbx')
  const groupRef = useRef()
  const { viewport } = useThree()
  
  // Scale based on device
  const isMobile = viewport.width < 5
  const baseScale = isMobile ? 0.004 : 0.006

  useEffect(() => {
    fbx.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        
        // Sleek, expensive graphite metallic paint
        child.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#1a1a1c'), // Dark graphite
          metalness: 0.8,
          roughness: 0.15,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          reflectivity: 1.0,
          emissive: new THREE.Color('#000000'),
        })
      }
    })
  }, [fbx])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    
    // Intro spin
    if (progress < 100) {
      groupRef.current.rotation.y += delta * 1.5
      return
    }

    // Interactive Mode
    const scrollY = window.scrollY || 0
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight)
    const scrollPct = scrollY / maxScroll

    // 1. Move car up slightly on scroll
    const targetY = THREE.MathUtils.lerp(0, 3, scrollPct)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05)

    if (!isMobile) {
      // 2. Desktop: Mouse-based parallax (tilt & turn)
      const mx = (state.mouse.x * Math.PI) / 8
      const my = (state.mouse.y * Math.PI) / 16
      
      // Base rotation + mouse rotation
      const targetRotZ = mx
      const targetRotX = -my * 0.5
      const targetRotY = -Math.PI / 2.2 + mx * 0.2 // Slightly look towards mouse
      
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.03)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.03)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.03)
    } else {
      // 3. Mobile: Constant cinematic slow pan
      groupRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <Center top position={[0, 0, 0]}>
      <primitive
        ref={groupRef}
        object={fbx}
        scale={baseScale}
        rotation={[0, -Math.PI / 2.2, 0]}
      />
    </Center>
  )
}

// ── Cinematic Lighting Setup ──
function StudioLights() {
  const { viewport } = useThree()
  const isMobile = viewport.width < 5

  return (
    <>
      <ambientLight intensity={0.2} />
      
      {/* Soft overhead softbox */}
      <spotLight 
        position={[0, 20, 0]} 
        angle={0.8} 
        penumbra={0.5} 
        intensity={40} 
        color="#ffffff" 
      />

      {/* Front/Side key light */}
      <spotLight 
        position={[-15, 10, 15]} 
        angle={0.4} 
        penumbra={0.5} 
        intensity={60} 
        color="#ffffff" 
        castShadow 
        shadow-bias={-0.0001}
      />

      {/* Clean white rim light from the back */}
      <spotLight position={[10, 5, -15]} angle={0.5} penumbra={0.8} intensity={50} color="#ffffff" />
    </>
  )
}

// ── Floating Light Particles ──
function DustParticles() {
  const count = 40
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 0.5 + Math.random() * 1.5
      const speed = 0.01 + Math.random() / 200
      const xFactor = -10 + Math.random() * 20
      const yFactor = -5 + Math.random() * 10
      const zFactor = -10 + Math.random() * 20
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      
      dummy.position.set(
        xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <circleGeometry args={[0.04, 8]} />
      <meshBasicMaterial color="#E8002D" transparent opacity={0.6} />
    </instancedMesh>
  )
}

function Scene({ progress }) {
  const { viewport } = useThree()
  const isMobile = viewport.width < 5

  return (
    <>
      {/* 
        Camera is low and wide for a dramatic, imposing look. Zoomed out heavily per request.
      */}
      <PerspectiveCamera makeDefault position={[0, 1.5, isMobile ? 26 : 20]} fov={isMobile ? 45 : 35} />
      
      <color attach="background" args={['#000000']} />
      
      {/* Heavy fog to blend the horizon line into blackness */}
      <fog attach="fog" color="#000000" near={10} far={30} />

      <StudioLights />
      
      {/* Ground: High-end showroom mirror finish */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={80}
          roughness={0.2}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.8}
          mirror={1}
        />
      </mesh>

      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <Koenigsegg progress={progress} />
      </Float>

      {!isMobile && <DustParticles />}

      <Environment preset="night" />
    </>
  )
}

export default function CarLoader({ progress }) {
  return (
    <div className="w-full h-full cursor-none">
      <Canvas
        shadows
        gl={{ 
          antialias: false, 
          powerPreference: 'high-performance', 
          stencil: false, 
          depth: true,
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.type = THREE.PCFShadowMap
        }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  )
}
