"use client"

import { useRef, useEffect, useCallback } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

function FloatingCube() {
  const cubeRef = useRef<THREE.Mesh>(null)
  const edgesRef = useRef<THREE.LineSegments>(null)
  const sparkRef = useRef<THREE.PointLight>(null)
  const sparkMeshRef = useRef<THREE.Mesh>(null)
  const targetRotation = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0 })
  const lastSparkTime = useRef(0)
  const sparkDuration = 0.15 // Duration of spark effect in seconds

  useFrame(({ clock }) => {
    if (cubeRef.current && edgesRef.current && sparkRef.current && sparkMeshRef.current) {
      // Update cube rotation
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05

      cubeRef.current.rotation.x = currentRotation.current.x
      cubeRef.current.rotation.y = currentRotation.current.y + Math.PI * 0.25
      edgesRef.current.rotation.copy(cubeRef.current.rotation)

      // Subtle floating animation
      const time = clock.getElapsedTime()
      const floatY = Math.sin(time * 0.5) * 0.2
      cubeRef.current.position.y = floatY
      edgesRef.current.position.y = floatY

      // Handle spark effect fade out
      const timeSinceLastSpark = time - lastSparkTime.current
      if (timeSinceLastSpark < sparkDuration) {
        const fadeOut = 1 - timeSinceLastSpark / sparkDuration
        sparkRef.current.intensity = fadeOut * 2
        sparkMeshRef.current.material.opacity = fadeOut
      } else {
        sparkRef.current.intensity = 0
        sparkMeshRef.current.material.opacity = 0
      }
    }
  })

  // Function to trigger spark effect
  const triggerSpark = useCallback((position: THREE.Vector3) => {
    if (sparkRef.current && sparkMeshRef.current) {
      lastSparkTime.current = performance.now() * 0.001
      sparkRef.current.position.copy(position)
      sparkMeshRef.current.position.copy(position)
    }
  }, [])

  // Make triggerSpark available to parent
  useEffect(() => {
    if (cubeRef.current) {
      cubeRef.current.userData.triggerSpark = triggerSpark
    }
  }, [triggerSpark])

  return (
    <group scale={[2, 2, 2]}>
      <mesh ref={cubeRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="#050301" transparent opacity={0.1} />
      </mesh>

      <lineSegments ref={edgesRef}>
        <edgesGeometry args={[new THREE.BoxGeometry(2, 2, 2)]} />
        <lineBasicMaterial color="#00dc82" linewidth={1.5} />
      </lineSegments>

      {/* Spark effect */}
      <pointLight ref={sparkRef} color="#00dc82" intensity={0} distance={4} decay={2} />
      <mesh ref={sparkMeshRef}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#00dc82" transparent opacity={0} />
      </mesh>
    </group>
  )
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null)
  const cubeRef = useRef<THREE.Mesh | null>(null)
  const particleCount = 200
  const particleSpeed = 0.02
  const particlePositions = useRef<Float32Array>()
  const particleVelocities = useRef<{ x: number; y: number; z: number }[]>([])

  // Initialize particle positions and velocities
  useEffect(() => {
    if (particlesRef.current) {
      particlePositions.current = new Float32Array(particleCount * 3)
      particleVelocities.current = []

      for (let i = 0; i < particleCount; i++) {
        // Distribute particles in a sphere
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const radius = 15 + Math.random() * 5 // Distance from center

        particlePositions.current[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
        particlePositions.current[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        particlePositions.current[i * 3 + 2] = radius * Math.cos(phi)

        // Add velocity towards center
        particleVelocities.current.push({
          x: -particlePositions.current[i * 3] * particleSpeed,
          y: -particlePositions.current[i * 3 + 1] * particleSpeed,
          z: -particlePositions.current[i * 3 + 2] * particleSpeed,
        })
      }

      particlesRef.current.geometry.setAttribute("position", new THREE.BufferAttribute(particlePositions.current, 3))
    }
  }, [])

  useFrame(() => {
    if (particlesRef.current && particlePositions.current && particleVelocities.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      const cubePosition = new THREE.Vector3()
      const cubeSize = new THREE.Vector3(4, 4, 4) // Cube size with some margin

      // Get the cube's world position if available
      if (cubeRef.current) {
        cubeRef.current.getWorldPosition(cubePosition)
      }

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3

        // Update positions
        positions[i3] += particleVelocities.current[i].x
        positions[i3 + 1] += particleVelocities.current[i].y
        positions[i3 + 2] += particleVelocities.current[i].z

        // Check for cube collision
        const particlePos = new THREE.Vector3(positions[i3], positions[i3 + 1], positions[i3 + 2])
        if (
          Math.abs(particlePos.x - cubePosition.x) < cubeSize.x / 2 &&
          Math.abs(particlePos.y - cubePosition.y) < cubeSize.y / 2 &&
          Math.abs(particlePos.z - cubePosition.z) < cubeSize.z / 2
        ) {
          // Trigger spark effect at collision point
          if (cubeRef.current?.userData.triggerSpark) {
            cubeRef.current.userData.triggerSpark(particlePos)
          }

          // Reset particle to outer radius
          const theta = Math.random() * Math.PI * 2
          const phi = Math.acos(2 * Math.random() - 1)
          const radius = 15 + Math.random() * 5

          positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
          positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
          positions[i3 + 2] = radius * Math.cos(phi)

          // Update velocity
          particleVelocities.current[i] = {
            x: -positions[i3] * particleSpeed,
            y: -positions[i3 + 1] * particleSpeed,
            z: -positions[i3 + 2] * particleSpeed,
          }
        }

        // Reset particles that get too close to center
        const distanceToCenter = Math.sqrt(
          positions[i3] * positions[i3] + positions[i3 + 1] * positions[i3 + 1] + positions[i3 + 2] * positions[i3 + 2],
        )

        if (distanceToCenter < 2) {
          const theta = Math.random() * Math.PI * 2
          const phi = Math.acos(2 * Math.random() - 1)
          const radius = 15 + Math.random() * 5

          positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
          positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
          positions[i3 + 2] = radius * Math.cos(phi)

          particleVelocities.current[i] = {
            x: -positions[i3] * particleSpeed,
            y: -positions[i3 + 1] * particleSpeed,
            z: -positions[i3 + 2] * particleSpeed,
          }
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <>
      <FloatingCube ref={cubeRef} />
      <points ref={particlesRef}>
        <bufferGeometry />
        <pointsMaterial size={0.05} color="#00DC82" transparent opacity={0.5} sizeAttenuation={true} />
      </points>
    </>
  )
}

export default function ThreeScene({ onLoad }: { onLoad?: () => void }) {
  useEffect(() => {
    if (onLoad) {
      const timer = setTimeout(onLoad, 500)
      return () => clearTimeout(timer)
    }
  }, [onLoad])

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <color attach="background" args={["#050301"]} />

        {/* Ambient light for general illumination */}
        <ambientLight intensity={0.2} />

        {/* Point lights for dramatic effect */}
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00DC82" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00DC82" />

        {/* Main scene elements */}
        <Particles />

        {/* Subtle camera movement */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}

