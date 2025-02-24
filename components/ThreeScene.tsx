"use client"

import { useEffect, useRef, useMemo } from "react"
import * as THREE from "three"
import { gsap } from "gsap"
import { Text } from "@react-three/drei"

interface ThreeSceneProps {
  onLoad?: () => void
}

export default function ThreeScene({ onLoad }: ThreeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const boxRef = useRef<THREE.Group | null>(null)
  const symbolsRef = useRef<THREE.Group | null>(null)
  const frameRef = useRef<number>(0)

  // Create symbols data
  const symbols = useMemo(
    () => [
      { text: "⚛", position: [-1, 0, 0], delay: 0 }, // React
      { text: "🔷", position: [1, 0, 0], delay: 0.2 }, // Diamond
      { text: "⚡", position: [0, 1, 0], delay: 0.4 }, // Lightning
      { text: "🚀", position: [-1, -1, 0], delay: 0.6 }, // Rocket
      { text: "💻", position: [1, 1, 0], delay: 0.8 }, // Computer
      { text: "🔮", position: [0, -1, 0], delay: 1 }, // Crystal Ball
      { text: "🎨", position: [-1, 1, 0], delay: 1.2 }, // Art
      { text: "🔧", position: [1, -1, 0], delay: 1.4 }, // Tool
    ],
    [],
  )

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5
    camera.position.y = 2
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create box group
    const boxGroup = new THREE.Group()
    scene.add(boxGroup)
    boxRef.current = boxGroup

    // Create box sides with glowing edges
    const boxGeometry = new THREE.BoxGeometry(2, 2, 2)
    const edges = new THREE.EdgesGeometry(boxGeometry)
    const edgesMaterial = new THREE.LineBasicMaterial({
      color: 0x00dc82,
      transparent: true,
      opacity: 0.8,
    })
    const edgesLine = new THREE.LineSegments(edges, edgesMaterial)
    boxGroup.add(edgesLine)

    // Create semi-transparent faces
    const faceMaterial = new THREE.MeshPhongMaterial({
      color: 0x00dc82,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
    })
    const boxMesh = new THREE.Mesh(boxGeometry, faceMaterial)
    boxGroup.add(boxMesh)

    // Create symbols group
    const symbolsGroup = new THREE.Group()
    scene.add(symbolsGroup)
    symbolsRef.current = symbolsGroup

    // Add symbols
    symbols.forEach((symbol) => {
      const text = new Text()
      text.text = symbol.text
      text.fontSize = 0.5
      text.position.set(...symbol.position)
      text.color = 0x00dc82
      text.anchorX = "center"
      text.anchorY = "middle"
      text.scale.set(0, 0, 0) // Start scaled to 0
      symbolsGroup.add(text)

      // Animate symbol appearance
      gsap.to(text.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
        delay: symbol.delay + 1,
        ease: "elastic.out(1, 0.5)",
      })

      // Add floating animation
      gsap.to(text.position, {
        y: text.position.y + 0.5,
        duration: 2,
        delay: symbol.delay + 1,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
      })
    })

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x00dc82, 2)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    // Initial box animation
    gsap.from(boxGroup.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
      onComplete: () => {
        // Animate box opening
        gsap.to(boxGroup.rotation, {
          x: Math.PI / 6,
          y: Math.PI / 6,
          duration: 1,
          ease: "power2.out",
        })
      },
    })

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      // Gentle box rotation
      if (boxGroup) {
        boxGroup.rotation.y += 0.001
      }

      // Gentle symbols rotation
      if (symbolsGroup) {
        symbolsGroup.rotation.y += 0.0005
      }

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

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      if (!boxGroup) return

      const mouseX = (event.clientX / window.innerWidth) * 2 - 1
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1

      gsap.to(boxGroup.rotation, {
        x: mouseY * 0.1 + Math.PI / 6,
        y: mouseX * 0.1 + Math.PI / 6,
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
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose())
          } else {
            object.material.dispose()
          }
        }
      })
    }
  }, [symbols, onLoad])

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

