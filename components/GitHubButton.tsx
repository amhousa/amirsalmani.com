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
      className="fixed left-4 top-[50px] z-50 flex items-center gap-1.5 rounded-lg border-2 border-white/10 bg-black/80 px-3 py-1.5 text-white shadow-lg backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        boxShadow: "0 0 15px rgba(0, 220, 130, 0.3)",
      }}
    >
      <Github className="h-4 w-4" />
      <span className="text-xs font-medium">Use this template</span>
    </motion.a>
  )
}
