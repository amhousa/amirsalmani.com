"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface SnowflakeProps {
  x: number
  y: number
  radius: number
  speed: number
  opacity: number
}

const Snowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const snowflakes: SnowflakeProps[] = []
    const numberOfSnowflakes = 200

    for (let i = 0; i < numberOfSnowflakes; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.5,
      })
    }

    function drawSnowflake(ctx: CanvasRenderingContext2D, snowflake: SnowflakeProps) {
      ctx.beginPath()
      ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${snowflake.opacity})`
      ctx.fill()
    }

    function moveSnowflake(snowflake: SnowflakeProps) {
      snowflake.y += snowflake.speed
      snowflake.x += Math.sin(snowflake.y * 0.01) * 0.5

      if (snowflake.y > canvas.height) {
        snowflake.y = 0
        snowflake.x = Math.random() * canvas.width
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      snowflakes.forEach((snowflake) => {
        drawSnowflake(ctx, snowflake)
        moveSnowflake(snowflake)
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />
}

export default Snowfall

