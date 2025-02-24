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
  const boxRef = useRef<THREE.Group>(new THREE.Group())
  const symbolsRef = useRef<THREE.Group>(new THREE.Group())
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

    // Create box group and add to scene
    const boxGroup = boxRef.current
    scene.add(boxGroup)

    // Create symbols group and add to scene
    const symbolsGroup = symbolsRef.current
    scene.add(symbolsGroup)

    // Create box faces with glowing edges
    const createBoxFace = (size: number, position: [number, number, number], rotation: [number, number, number]) => {
      const geometry = new THREE.PlaneGeometry(size, size)
      const material = new THREE.MeshPhongMaterial({
        color: 0x00dc82,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide,
      })

      const face = new THREE.Mesh(geometry, material)
      face.position.set(...position)
      face.rotation.set(...rotation)

      // Add glowing edges
      const edgesGeometry = new THREE.EdgesGeometry(geometry)
      const edgesMaterial = new THREE.LineBasicMaterial({
        color: 0x00dc82,
        transparent: true,
        opacity: 0.8,
      })
      const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial)
      face.add(edges)

      return face
    }

    // Create box faces
    const size = 4
    const faces = [
      // Bottom
      createBoxFace(size, [0, -size / 2, 0], [Math.PI / 2, 0, 0]),
      // Top
      createBoxFace(size, [0, size / 2, 0], [-Math.PI / 2, 0, 0]),
      // Front
      createBoxFace(size, [0, 0, size / 2], [0, 0, 0]),
      // Back
      createBoxFace(size, [0, 0, -size / 2], [0, Math.PI, 0]),
      // Left
      createBoxFace(size, [-size / 2, 0, 0], [0, -Math.PI / 2, 0]),
      // Right
      createBoxFace(size, [size / 2, 0, 0], [0, Math.PI / 2, 0]),
    ]

    faces.forEach((face) => boxGroup.add(face))

    // Create service symbols
    const createSymbol = (geometry: THREE.BufferGeometry, position: [number, number, number], scale = 1) => {
      const material = new THREE.MeshPhongMaterial({
        color: 0x00dc82,
        transparent: true,
        opacity: 0.9,
        shininess: 100,
      })

      const symbol = new THREE.Mesh(geometry, material)
      symbol.position.set(...position)
      symbol.scale.set(scale, scale, scale)

      // Add glow effect
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00dc82,
        transparent: true,
        opacity: 0.3,
        side: THREE.BackSide,
      })
      const glowMesh = new THREE.Mesh(geometry, glowMaterial)
      glowMesh.scale.multiplyScalar(1.1)
      symbol.add(glowMesh)

      return symbol
    }

    // Create different symbols
    const symbols = [
      // Code symbol (cube)
      createSymbol(new THREE.BoxGeometry(0.8, 0.8, 0.8), [0, 0, 0]),
      // UI symbol (circle)
      createSymbol(new THREE.TorusGeometry(0.4, 0.1, 16, 32), [-1, 1, 0]),
      // Database symbol (cylinder)
      createSymbol(new THREE.CylinderGeometry(0.3, 0.3, 0.6, 32), [1, -1, 0]),
      // Network symbol (icosahedron)
      createSymbol(new THREE.IcosahedronGeometry(0.4), [-1, -1, 0]),
      // Cloud symbol (sphere)
      createSymbol(new THREE.SphereGeometry(0.4, 32, 32), [1, 1, 0]),
    ]

    symbols.forEach((symbol) => {
      symbolsGroup.add(symbol)
      // Initially hide symbols inside the box
      symbol.position.y -= 2
      symbol.visible = false
    })

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

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

    // Animation timeline
    const tl = gsap.timeline({ delay: 0.5 })

    // Box opening animation
    tl.to(faces[1].rotation, {
      // Top face
      x: -Math.PI,
      duration: 2,
      ease: "power2.inOut",
    })
      .to(
        faces[2].rotation,
        {
          // Front face
          x: Math.PI / 2,
          duration: 2,
          ease: "power2.inOut",
        },
        "<",
      )
      .to(
        faces[3].rotation,
        {
          // Back face
          x: -Math.PI / 2,
          duration: 2,
          ease: "power2.inOut",
        },
        "<",
      )
      .to(
        faces[4].rotation,
        {
          // Left face
          z: -Math.PI / 2,
          duration: 2,
          ease: "power2.inOut",
        },
        "<",
      )
      .to(
        faces[5].rotation,
        {
          // Right face
          z: Math.PI / 2,
          duration: 2,
          ease: "power2.inOut",
        },
        "<",
      )

    // Symbols animation
    symbols.forEach((symbol, index) => {
      // Make symbol visible
      tl.set(symbol, { visible: true }, 1.5)

      // Float up and out of the box
      tl.to(
        symbol.position,
        {
          y: `+=${3 + Math.random() * 2}`,
          x: `+=${(Math.random() - 0.5) * 4}`,
          z: `+=${(Math.random() - 0.5) * 4}`,
          duration: 2,
          ease: "power2.out",
          delay: index * 0.2,
        },
        1.5,
      )

      // Start floating animation
      gsap.to(symbol.position, {
        y: `+=${0.5}`,
        duration: 2 + Math.random(),
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        delay: 3 + index * 0.2,
      })

      // Rotation animation
      gsap.to(symbol.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 10 + Math.random() * 5,
        repeat: -1,
        ease: "none",
        delay: 3 + index * 0.2,
      })
    })

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      // Gentle group rotation
      boxGroup.rotation.y += 0.001
      symbolsGroup.rotation.y += 0.0005

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

      gsap.to(boxGroup.rotation, {
        x: mouseY * 0.1,
        y: mouseX * 0.1,
        duration: 1,
      })

      gsap.to(symbolsGroup.rotation, {
        x: mouseY * 0.05,
        y: mouseX * 0.05,
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

      // Dispose all geometries and materials
      const disposeObject = (obj: THREE.Object3D) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          if (Array.isArray(obj.material)) {
            obj.material.forEach((material) => material.dispose())
          } else {
            obj.material.dispose()
          }
        }
        obj.children.forEach(disposeObject)
      }

      disposeObject(boxGroup)
      disposeObject(symbolsGroup)
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

