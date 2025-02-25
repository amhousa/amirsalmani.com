"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

function DesertTerrain() {
  const terrainRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  // Custom shader for the terrain
  const terrainShader = {
    vertexShader: `
      varying vec3 vPosition;
      varying float vElevation;
      
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;

        vPosition = position;
        vElevation = position.z;
        
        gl_Position = projectedPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vPosition;
      varying float vElevation;
      
      void main() {
        float alpha = 0.3;
        vec3 color = vec3(0.0, 0.86, 0.51); // #00DC82
        
        // Add some depth to the color based on elevation
        float elevationColor = (vElevation + 2.0) * 0.2;
        color += elevationColor;
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
  }

  useFrame(({ clock }) => {
    if (terrainRef.current) {
      // Animate the terrain
      const time = clock.getElapsedTime()
      const position = terrainRef.current.geometry.attributes.position
      const originalPosition = terrainRef.current.geometry.attributes.position.array.slice()

      for (let i = 0; i < position.count; i++) {
        const x = originalPosition[i * 3]
        const y = originalPosition[i * 3 + 1]

        // Create wave effect
        const wave = Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time) * 0.5

        position.array[i * 3 + 2] = wave
      }

      position.needsUpdate = true
    }
  })

  return (
    <mesh ref={terrainRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -2, -5]}>
      <planeGeometry args={[30, 30, 50, 50]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={terrainShader.vertexShader}
        fragmentShader={terrainShader.fragmentShader}
        transparent={true}
        wireframe={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 1000

  useEffect(() => {
    if (particlesRef.current) {
      const positions = new Float32Array(particleCount * 3)

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 30
        positions[i * 3 + 1] = (Math.random() - 0.5) * 30
        positions[i * 3 + 2] = (Math.random() - 0.5) * 30
      }

      particlesRef.current.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    }
  }, [])

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial size={0.05} color="#00DC82" transparent opacity={0.5} sizeAttenuation={true} />
    </points>
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
        <DesertTerrain />
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

