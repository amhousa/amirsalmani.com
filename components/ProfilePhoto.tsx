"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface ProfilePhotoProps {
  src: string
  alt: string
  size?: number
  className?: string
}

export default function ProfilePhoto({ src, alt, size = 150, className = "" }: ProfilePhotoProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simulate loading delay for animation
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className={`profile-photo-container ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isLoaded ? 1 : 0,
        scale: isLoaded ? 1 : 0.8,
      }}
      transition={{ duration: 0.5 }}
      style={{ width: size, height: size }}
    >
      <div className="rotating-circle"></div>
      <div className="photo-glow"></div>
      <Image
        src={src || "/images/about/me.webp"}
        alt={alt}
        width={size}
        height={size}
        className="rounded-full object-cover border-2 border-brand-primary/30"
        priority
        onLoad={() => setIsLoaded(true)}
      />
    </motion.div>
  )
}

