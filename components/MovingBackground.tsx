"use client"

import { useEffect, useRef } from "react"

const MovingBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Create gradient points
    const gradients = [
      {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        radius: 300,
        color: "#00DC82",
      },
      {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        radius: 300,
        color: "#00B368",
      },
    ]

    const animate = () => {
      // Clear canvas with base color
      ctx.fillStyle = "#050301"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw gradients
      gradients.forEach((gradient) => {
        // Move gradient
        gradient.x += gradient.dx
        gradient.y += gradient.dy

        // Bounce off edges
        if (gradient.x < 0 || gradient.x > canvas.width) gradient.dx *= -1
        if (gradient.y < 0 || gradient.y > canvas.height) gradient.dy *= -1

        // Create radial gradient
        const grd = ctx.createRadialGradient(gradient.x, gradient.y, 0, gradient.x, gradient.y, gradient.radius)
        grd.addColorStop(0, `${gradient.color}20`)
        grd.addColorStop(1, "transparent")

        // Draw gradient
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(gradient.x, gradient.y, gradient.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" style={{ background: "#050301" }} />
}

export default MovingBackground

