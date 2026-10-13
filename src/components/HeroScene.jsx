import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles, Stars } from '@react-three/drei'
import { Suspense, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

/**
 * Vertical neon laser beams shooting into the sky above the distant city.
 */
function CityLaserBeams() {
  const beam1 = useRef()
  const beam2 = useRef()
  const beam3 = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (beam1.current) {
      beam1.current.material.opacity = 0.35 + Math.sin(t * 2.2) * 0.15
    }
    if (beam2.current) {
      beam2.current.material.opacity = 0.4 + Math.sin(t * 1.8 + 1) * 0.18
    }
    if (beam3.current) {
      beam3.current.material.opacity = 0.3 + Math.sin(t * 2.5 + 2) * 0.12
    }
  })

  return (
    <group position={[4.2, 0.8, -3]}>
      {/* Cyan Laser Beam */}
      <mesh ref={beam1} position={[0, 1.5, 0]} scale={[0.04, 6.5, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Ice Blue Laser Beam */}
      <mesh ref={beam2} position={[0.7, 1.8, 0]} scale={[0.05, 7.2, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#80dcff"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Violet Laser Beam */}
      <mesh ref={beam3} position={[1.4, 1.2, 0]} scale={[0.035, 5.8, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#c084fc"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

/**
 * Luminous Horizon Light Shimmer.
 */
function HorizonShimmer() {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.scale.x = 1 + Math.sin(t * 1.6) * 0.08
    meshRef.current.material.opacity = 0.45 + Math.sin(t * 2.4) * 0.15
  })

  return (
    <mesh ref={meshRef} position={[2.8, -0.6, -4]} scale={[4.5, 0.12, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        color="#c084fc"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

/**
 * Camera parallax controller responding to pointer coordinates.
 */
function CameraParallax({ pointer }) {
  useFrame((state) => {
    state.camera.position.x += (pointer.current.x * 0.35 - state.camera.position.x) * 0.04
    state.camera.position.y += (-pointer.current.y * 0.25 - state.camera.position.y) * 0.04
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

function Scene({ pointer }) {
  return (
    <>
      <CameraParallax pointer={pointer} />

      {/* Atmospheric Star and Nebula Particle Fields */}
      <Stars radius={30} depth={20} count={650} factor={2} saturation={0} fade speed={0.4} />
      <Sparkles count={120} scale={12} size={2.4} speed={0.35} color="#c084fc" />
      <Sparkles count={90} scale={14} size={2.2} speed={0.25} color="#38bdf8" />

      {/* Cyberpunk City Sky Light Beams & Horizon Shimmer */}
      <CityLaserBeams />
      <HorizonShimmer />
    </>
  )
}

export default function HeroScene() {
  const pointer = useRef({ x: 0, y: 0 })
  const [hasWebGL, setHasWebGL] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setHasWebGL(false)
    } catch {
      setHasWebGL(false)
    }

    const handlePointerMove = (e) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  if (!hasWebGL) return null

  return (
    <div
      className="hero-interactive-canvas"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Scene pointer={pointer} />
        </Suspense>
      </Canvas>
    </div>
  )
}