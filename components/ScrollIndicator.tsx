"use client"

import { useEffect, useState } from "react"

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = `${(scrollPx / winHeightPx) * 100}%`
      setScrollProgress((scrollPx / winHeightPx) * 100)
    }

    window.addEventListener("scroll", updateScrollProgress)
    updateScrollProgress() // Initial call

    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-black/10 z-50">
      <div
        className="h-full bg-brand-primary transition-all duration-300 ease-out"
        style={{
          width: `${scrollProgress}%`,
          boxShadow: "0 0 10px rgba(0, 220, 130, 0.5), 0 0 5px rgba(0, 220, 130, 0.3)",
        }}
      />
    </div>
  )
}

