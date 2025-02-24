"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { gsap } from "gsap"

interface ThreeSceneProps {
  onLoad?: () => void
}

export default function ThreeScene({ onLoad }: ThreeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cubeRef = useRef<THREE.Mesh | null>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create materials for each face of the cube
    const materials = [
      new THREE.MeshPhongMaterial({ color: 0x00dc82, transparent: true, opacity: 0.9 }), // Right
      new THREE.MeshPhongMaterial({ color: 0x00b368, transparent: true, opacity: 0.9 }), // Left
      new THREE.MeshPhongMaterial({ color: 0x00dc82, transparent: true, opacity: 0.9 }), // Top
      new THREE.MeshPhongMaterial({ color: 0x00b368, transparent: true, opacity: 0.9 }), // Bottom
      new THREE.MeshPhongMaterial({ color: 0x00dc82, transparent: true, opacity: 0.9 }), // Front
      new THREE.MeshPhongMaterial({ color: 0x00b368, transparent: true, opacity: 0.9 }), // Back
    ]

    // Create cube
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const cube = new THREE.Mesh(geometry, materials)
    scene.add(cube)
    cubeRef.current = cube

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    // Initial animation
    gsap.from(cube.rotation, {
      y: Math.PI * 2,
      duration: 2,
      ease: "power2.out",
    })

    gsap.from(cube.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
    })

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      cube.rotation.y += 0.002
      cube.rotation.x += 0.001

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return

      const width = window.innerWidth
      const height = window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Mouse movement effect
    const handleMouseMove = (event: MouseEvent) => {
      if (!cube) return

      const mouseX = (event.clientX / window.innerWidth) * 2 - 1
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1

      gsap.to(cube.rotation, {
        x: mouseY * 0.3,
        y: mouseX * 0.3,
        duration: 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Notify parent component when everything is loaded
    if (onLoad) {
      onLoad()
    }

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(frameRef.current)

      // Cleanup Three.js resources
      if (rendererRef.current) {
        rendererRef.current.dispose()
        containerRef.current?.removeChild(rendererRef.current.domElement)
      }
      if (geometry) geometry.dispose()
      materials.forEach((material) => material.dispose())
    }
  }, [onLoad])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10"
      style={{
        background: "radial-gradient(circle at center, rgba(0,220,130,0.1) 0%, transparent 70%)",
      }}
    />
  )
}
