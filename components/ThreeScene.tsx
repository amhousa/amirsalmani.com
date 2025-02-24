"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Html, PerspectiveCamera, Grid } from "@react-three/drei"
import { motion } from "framer-motion"
import { Code, Palette, Globe, Cpu, Rocket, MessageSquare } from "lucide-react"
import type * as THREE from "three"

interface ServiceProps {
  position: [number, number, number]
  title: string
  description: string
  icon: any
  delay: number
}

const Service = ({ position, title, description, icon: Icon, delay }: ServiceProps) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Html position={position} center transform>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-64 glass-effect rounded-xl p-4 cursor-pointer transform transition-all duration-300"
        style={{
          transform: hovered ? "scale(1.05)" : "scale(1)",
          border: `1px solid ${hovered ? "rgba(0,220,130,0.5)" : "rgba(255,255,255,0.1)"}`,
        }}
      >
        <div className="w-10 h-10 rounded-lg bg-brand-primary/20 flex items-center justify-center mb-3">
          <Icon className="w-5 h-5 text-brand-primary" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
      </motion.div>
    </Html>
  )
}

const Scene = () => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })

  const services = [
    {
      position: [5, 3, 0],
      title: "توسعه وب",
      description: "طراحی و توسعه وب‌سایت‌های مدرن با استفاده از آخرین تکنولوژی‌ها",
      icon: Code,
      delay: 0.2,
    },
    {
      position: [-5, 3, 0],
      title: "طراحی رابط کاربری",
      description: "طراحی رابط‌های کاربری زیبا و کاربرپسند",
      icon: Palette,
      delay: 0.4,
    },
    {
      position: [0, 5, 0],
      title: "هوش مصنوعی",
      description: "پیاده‌سازی راهکارهای هوش مصنوعی در کسب و کار شما",
      icon: Cpu,
      delay: 0.6,
    },
    {
      position: [5, -3, 0],
      title: "سئو و دیجیتال مارکتینگ",
      description: "بهینه‌سازی سایت و افزایش بازدید ارگانیک",
      icon: Globe,
      delay: 0.8,
    },
    {
      position: [-5, -3, 0],
      title: "مشاوره استارتاپ",
      description: "مشاوره تخصصی برای راه‌اندازی استارتاپ",
      icon: Rocket,
      delay: 1.0,
    },
    {
      position: [0, -5, 0],
      title: "آموزش برنامه‌نویسی",
      description: "دوره‌های آموزشی تخصصی برنامه‌نویسی",
      icon: MessageSquare,
      delay: 1.2,
    },
  ]

  return (
    <group ref={groupRef}>
      {/* Axes */}
      <group>
        {/* X Axis */}
        <mesh position={[5, 0, 0]}>
          <boxGeometry args={[10, 0.05, 0.05]} />
          <meshBasicMaterial color="red" transparent opacity={0.5} />
        </mesh>
        {/* Y Axis */}
        <mesh position={[0, 5, 0]}>
          <boxGeometry args={[0.05, 10, 0.05]} />
          <meshBasicMaterial color="green" transparent opacity={0.5} />
        </mesh>
        {/* Z Axis */}
        <mesh position={[0, 0, 5]}>
          <boxGeometry args={[0.05, 0.05, 10]} />
          <meshBasicMaterial color="blue" transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Grids */}
      <Grid
        position={[0, 0, 0]}
        args={[20, 20]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#00dc82"
        sectionSize={5}
        fadeDistance={30}
        fadeStrength={1}
      />

      {/* Services */}
      {services.map((service, index) => (
        <Service key={index} {...service} />
      ))}
    </group>
  )
}

export default function ThreeScene({ onLoad }: { onLoad?: () => void }) {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[15, 15, 15]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00dc82" />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color="#00b368" />
        <Scene />
      </Canvas>
    </div>
  )
}

