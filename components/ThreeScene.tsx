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
  const cubesRef = useRef<THREE.Group>(new THREE.Group())
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 10
    camera.position.y = 2
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputEncoding = THREE.sRGBEncoding
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create cubes group
    const cubesGroup = cubesRef.current
    scene.add(cubesGroup)

    // Create multiple cubes with different sizes and positions
    const createCube = (size: number, position: [number, number, number], delay: number) => {
      // Create glowing material
      const material = new THREE.MeshPhongMaterial({
        color: Math.random() > 0.5 ? 0x00dc82 : 0x00b368,
        transparent: true,
        opacity: 0.9,
        shininess: 100,
      })

      // Create edges for the cube
      const geometry = new THREE.BoxGeometry(size, size, size)
      const edges = new THREE.EdgesGeometry(geometry)
      const edgesMaterial = new THREE.LineBasicMaterial({
        color: 0x00dc82,
        transparent: true,
        opacity: 0.5,
      })
      const edgesLine = new THREE.LineSegments(edges, edgesMaterial)

      // Create cube mesh
      const cube = new THREE.Mesh(geometry, material)
      cube.position.set(...position)
      cube.add(edgesLine) // Add edges as child of cube

      // Add to group
      cubesGroup.add(cube)

      // Initial animation
      gsap.from(cube.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.5,
        delay,
        ease: "elastic.out(1, 0.5)",
      })

      // Floating animation
      gsap.to(cube.position, {
        y: position[1] + 0.5,
        duration: 2 + Math.random(),
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        delay: Math.random() * 2,
      })

      // Rotation animation
      gsap.to(cube.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 10 + Math.random() * 10,
        repeat: -1,
        ease: "none",
        delay: Math.random() * 2,
      })

      return cube
    }

    // Create multiple cubes
    const cubes = [
      createCube(2, [0, 0, 0], 0),
      createCube(1.5, [-3, 1, -2], 0.2),
      createCube(1.2, [3, -1, -1], 0.4),
      createCube(1, [-2, -2, -3], 0.6),
      createCube(0.8, [2, 2, -2], 0.8),
      createCube(1.3, [1, -1, -4], 1),
    ]

    // Add lights
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Point lights
    const createPointLight = (color: number, intensity: number, position: [number, number, number]) => {
      const light = new THREE.PointLight(color, intensity)
      light.position.set(...position)
      return light
    }

    const lights = [
      createPointLight(0x00dc82, 2, [5, 5, 5]),
      createPointLight(0x00b368, 1, [-5, -5, 5]),
      createPointLight(0x00dc82, 1.5, [0, 0, 7]),
    ]
    lights.forEach((light) => scene.add(light))

    // Add volumetric light effect
    const createLightCone = (position: [number, number, number], color: number) => {
      const geometry = new THREE.ConeGeometry(2, 10, 32)
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide,
      })
      const cone = new THREE.Mesh(geometry, material)
      cone.position.set(...position)
      cone.rotation.x = Math.PI
      return cone
    }

    const lightCones = [createLightCone([5, 10, 5], 0x00dc82), createLightCone([-5, 10, 5], 0x00b368)]
    lightCones.forEach((cone) => scene.add(cone))

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      // Gentle group rotation
      cubesGroup.rotation.y += 0.001

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
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1

      gsap.to(cubesGroup.rotation, {
        x: mouseY * 0.1,
        y: mouseX * 0.1,
        duration: 1,
      })

      // Move lights with mouse
      lights.forEach((light) => {
        gsap.to(light.position, {
          x: light.position.x + mouseX * 2,
          y: light.position.y + mouseY * 2,
          duration: 1,
        })
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

      // Dispose geometries and materials
      cubesGroup.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose())
          } else {
            object.material.dispose()
          }
        }
      })

      // Dispose light cones
      lightCones.forEach((cone) => {
        cone.geometry.dispose()
        cone.material.dispose()
      })
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

