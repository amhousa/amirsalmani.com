"use client"

import { useEffect, useRef, useCallback } from "react"

const MovingBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const FPS = 30 // Limit FPS to reduce main thread work

  const animate = useCallback((currentTime: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Throttle frame rate
    if (currentTime - lastTimeRef.current < 1000 / FPS) {
      animationFrameRef.current = requestAnimationFrame(animate)
      return
    }
    lastTimeRef.current = currentTime

    // Clear canvas with base color
    ctx.fillStyle = "#050301"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Use offscreen canvas for gradients
    const offscreen = new OffscreenCanvas(canvas.width, canvas.height)
    const offscreenCtx = offscreen.getContext("2d")
    if (!offscreenCtx) return

    // Draw gradients on offscreen canvas
    const gradients = [
      {
        x: canvas.width * 0.3 + Math.sin(currentTime * 0.0002) * 100,
        y: canvas.height * 0.5 + Math.cos(currentTime * 0.0002) * 100,
        radius: 300,
        color: "#00DC82",
      },
      {
        x: canvas.width * 0.7 + Math.cos(currentTime * 0.0002) * 100,
        y: canvas.height * 0.5 + Math.sin(currentTime * 0.0002) * 100,
        radius: 300,
        color: "#00B368",
      },
    ]

    gradients.forEach((gradient) => {
      const grd = offscreenCtx.createRadialGradient(gradient.x, gradient.y, 0, gradient.x, gradient.y, gradient.radius)
      grd.addColorStop(0, `${gradient.color}20`)
      grd.addColorStop(1, "transparent")

      offscreenCtx.fillStyle = grd
      offscreenCtx.beginPath()
      offscreenCtx.arc(gradient.x, gradient.y, gradient.radius, 0, Math.PI * 2)
      offscreenCtx.fill()
    })

    // Draw offscreen canvas to main canvas
    ctx.drawImage(offscreen, 0, 0)

    animationFrameRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [animate])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" style={{ background: "#050301" }} />
}

export default MovingBackground

