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
  const globeRef = useRef<THREE.Group>(new THREE.Group())
  const linesRef = useRef<THREE.Group>(new THREE.Group())
  const particlesRef = useRef<THREE.Points | null>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 15
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

    // Create globe group and add to scene
    const globeGroup = globeRef.current
    scene.add(globeGroup)

    // Create lines group and add to scene
    const linesGroup = linesRef.current
    scene.add(linesGroup)

    // Create globe
    const createGlobe = () => {
      const radius = 5
      const segments = 64

      // Create base sphere
      const sphereGeometry = new THREE.SphereGeometry(radius, segments, segments)
      const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x00dc82,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide,
      })
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      globeGroup.add(sphere)

      // Create grid lines
      const gridMaterial = new THREE.LineBasicMaterial({
        color: 0x00dc82,
        transparent: true,
        opacity: 0.3,
      })

      // Latitude lines
      for (let i = 0; i < 10; i++) {
        const latitude = (i / 9) * Math.PI
        const latitudeGeometry = new THREE.CircleGeometry(radius * Math.sin(latitude), segments)
        latitudeGeometry.vertices.shift() // Remove center vertex
        const latitudeLine = new THREE.LineLoop(latitudeGeometry, gridMaterial)
        latitudeLine.rotation.x = Math.PI / 2
        latitudeLine.position.y = radius * Math.cos(latitude)
        globeGroup.add(latitudeLine)
      }

      // Longitude lines
      for (let i = 0; i < 20; i++) {
        const longitude = (i / 20) * Math.PI * 2
        const points = []
        for (let j = 0; j <= segments; j++) {
          const phi = (j / segments) * Math.PI
          points.push(
            new THREE.Vector3(
              radius * Math.sin(phi) * Math.cos(longitude),
              radius * Math.cos(phi),
              radius * Math.sin(phi) * Math.sin(longitude),
            ),
          )
        }
        const longitudeGeometry = new THREE.BufferGeometry().setFromPoints(points)
        const longitudeLine = new THREE.Line(longitudeGeometry, gridMaterial)
        globeGroup.add(longitudeLine)
      }

      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(radius * 1.2, segments, segments)
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          c: { type: "f", value: 0.3 },
          p: { type: "f", value: 3.8 },
          glowColor: { type: "c", value: new THREE.Color(0x00dc82) },
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          uniform float c;
          uniform float p;
          varying vec3 vNormal;
          void main() {
            float intensity = pow(c - dot(vNormal, vec3(0.0, 0.0, 1.0)), p);
            gl_FragColor = vec4(glowColor, intensity);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      })
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial)
      globeGroup.add(glowMesh)
    }

    // Create connection lines
    const createConnectionLines = () => {
      const numLines = 20
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00dc82,
        transparent: true,
        opacity: 0.5,
      })

      for (let i = 0; i < numLines; i++) {
        const points = []
        const radius = 5

        // Create random start and end points on the globe
        const startPhi = Math.random() * Math.PI * 2
        const startTheta = Math.random() * Math.PI
        const endPhi = Math.random() * Math.PI * 2
        const endTheta = Math.random() * Math.PI

        const start = new THREE.Vector3(
          radius * Math.sin(startTheta) * Math.cos(startPhi),
          radius * Math.cos(startTheta),
          radius * Math.sin(startTheta) * Math.sin(startPhi),
        )

        const end = new THREE.Vector3(
          radius * Math.sin(endTheta) * Math.cos(endPhi),
          radius * Math.cos(endTheta),
          radius * Math.sin(endTheta) * Math.sin(endPhi),
        )

        // Create curved line between points
        const midPoint = start.clone().add(end).multiplyScalar(0.5)
        midPoint.normalize().multiplyScalar(radius * 1.5)

        // Create curve
        const curve = new THREE.QuadraticBezierCurve3(start, midPoint, end)
        points.push(...curve.getPoints(50))

        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const line = new THREE.Line(geometry, lineMaterial)
        linesGroup.add(line)

        // Animate line
        gsap.fromTo(
          line.material,
          { opacity: 0 },
          {
            opacity: 0.5,
            duration: 2,
            delay: i * 0.1,
            repeat: -1,
            yoyo: true,
          },
        )
      }
    }

    // Create particle system
    const createParticles = () => {
      const particlesGeometry = new THREE.BufferGeometry()
      const particleCount = 1000

      const positions = new Float32Array(particleCount * 3)
      const sizes = new Float32Array(particleCount)

      for (let i = 0; i < particleCount; i++) {
        const radius = 7
        const phi = Math.random() * Math.PI * 2
        const theta = Math.random() * Math.PI

        positions[i * 3] = radius * Math.sin(theta) * Math.cos(phi)
        positions[i * 3 + 1] = radius * Math.cos(theta)
        positions[i * 3 + 2] = radius * Math.sin(theta) * Math.sin(phi)

        sizes[i] = Math.random() * 0.1
      }

      particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      particlesGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

      const particlesMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(0x00dc82) },
        },
        vertexShader: `
          attribute float size;
          uniform float time;
          varying vec3 vColor;
          void main() {
            vColor = vec3(0.0, 0.86, 0.51); // Brand color
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float strength = distance(gl_PointCoord, vec2(0.5));
            strength = 1.0 - strength;
            strength = pow(strength, 3.0);
            gl_FragColor = vec4(vColor, strength);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      const particles = new THREE.Points(particlesGeometry, particlesMaterial)
      particlesRef.current = particles
      scene.add(particles)
    }

    // Initialize components
    createGlobe()
    createConnectionLines()
    createParticles()

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x00dc82, 2)
    pointLight1.position.set(10, 10, 10)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x00b368, 1)
    pointLight2.position.set(-10, -10, -10)
    scene.add(pointLight2)

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      // Rotate globe
      globeGroup.rotation.y += 0.001
      linesGroup.rotation.y += 0.001

      // Update particle uniforms
      if (particlesRef.current) {
        particlesRef.current.material.uniforms.time.value += 0.01
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

    // Mouse movement effect
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1

      gsap.to(globeGroup.rotation, {
        x: mouseY * 0.3,
        y: mouseX * 0.5,
        duration: 1,
      })

      gsap.to(linesGroup.rotation, {
        x: mouseY * 0.3,
        y: mouseX * 0.5,
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

      disposeObject(globeGroup)
      disposeObject(linesGroup)
      if (particlesRef.current) {
        particlesRef.current.geometry.dispose()
        particlesRef.current.material.dispose()
      }
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

