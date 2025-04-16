"use client"

import { useState, useEffect } from "react"
import { Github } from "lucide-react"
import { motion } from "framer-motion"

export default function GitHubButton() {
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="fixed top-[50px] left-5 z-50">
      <div className="relative group">
        {/* Animated RGB border */}
        <div
          className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 
                      rounded-xl opacity-75 group-hover:opacity-100 blur-sm 
                      animate-gradient-x transition duration-200"
        ></div>

        {/* Button */}
        <motion.a
          href="https://github.com/amhousa/website-template"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl
                   hover:bg-black/90 transition-all duration-300 border border-transparent"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github className="w-5 h-5" />
          <span className="font-medium">Use this template on GitHub</span>
        </motion.a>
      </div>
    </div>
  )
}
