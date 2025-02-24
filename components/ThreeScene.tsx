"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"

function Cube() {
  const meshRef = useRef<THREE.Mesh>(null)
  const edgesRef = useRef<THREE.LineSegments>(null)
  const targetRotation = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientY / window.innerHeight - 0.5) * Math.PI * 0.3
      const y = (event.clientX / window.innerWidth - 0.5) * Math.PI * 0.3
      targetRotation.current = { x, y }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame(() => {
    if (meshRef.current && edgesRef.current) {
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05

      meshRef.current.rotation.x = currentRotation.current.x
      meshRef.current.rotation.y = currentRotation.current.y + Math.PI * 0.25
      edgesRef.current.rotation.copy(meshRef.current.rotation)

      // Subtle floating animation
      const floatY = Math.sin(Date.now() * 0.001) * 0.1
      meshRef.current.position.y = floatY
      edgesRef.current.position.y = floatY
    }
  })

  return (
    <group scale={[2.5, 2.5, 2.5]}>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="#050301" transparent opacity={0.1} />
      </mesh>

      <lineSegments ref={edgesRef}>
        <edgesGeometry args={[new THREE.BoxGeometry(2, 2, 2)]} />
        <lineBasicMaterial color="#00dc82" linewidth={1.5} />
      </lineSegments>
    </group>
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
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <color attach="background" args={["#050301"]} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00dc82" />
        <Cube />
      </Canvas>
    </div>
  )
}

