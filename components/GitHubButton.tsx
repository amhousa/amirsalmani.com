"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github } from "lucide-react"

export default function GitHubButton() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.a
      href="https://github.com/yourusername/your-repo-template"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed left-4 top-[50px] z-50 flex items-center gap-2 rounded-xl bg-black px-4 py-3 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(10px)",
        border: "2px solid transparent",
        borderImage: "linear-gradient(to right, #ff00cc, #3333ff, #00ccff) 1",
        animation: "borderAnimation 3s linear infinite",
      }}
    >
      <Github className="h-5 w-5" />
      <span className="text-sm font-medium">Use this template on GitHub</span>

      <style jsx global>{`
        @keyframes borderAnimation {
          0% {
            border-image: linear-gradient(to right, #ff00cc, #3333ff, #00ccff) 1;
          }
          50% {
            border-image: linear-gradient(to right, #00ccff, #ff00cc, #3333ff) 1;
          }
          100% {
            border-image: linear-gradient(to right, #3333ff, #00ccff, #ff00cc) 1;
          }
        }
      `}</style>
    </motion.a>
  )
}
