"use client"

import Image from "next/image"
import { useState, useRef } from "react"

interface ScanningImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export default function ScanningImage({ src, alt, width, height, className = "" }: ScanningImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className={`image-container ${className}`}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "auto",
        aspectRatio: !height && width ? "16/9" : undefined,
      }}
    >
      {width && height ? (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          onLoad={() => setIsLoaded(true)}
          className={`rounded-lg ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
        />
      ) : (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-auto rounded-lg ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
        />
      )}
    </div>
  )
}

