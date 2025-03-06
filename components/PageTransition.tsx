"use client"

import { useState, useEffect, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"

// This component safely uses useSearchParams inside Suspense
function PageTransitionInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [prevPath, setPrevPath] = useState("")

  useEffect(() => {
    const url = pathname + searchParams.toString()

    // Only trigger animation when path changes
    if (prevPath !== "" && prevPath !== url) {
      setIsLoading(true)

      // Simulate page loading time
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 800)

      return () => clearTimeout(timer)
    }

    setPrevPath(url)
  }, [pathname, searchParams, prevPath])

  if (!isLoading) return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-bg/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border-t-2 border-brand-primary"></div>
        <div
          className="absolute inset-0 rounded-full border-r-2 border-brand-primary opacity-75"
          style={{ transform: "rotate(45deg)" }}
        ></div>
        <div
          className="absolute inset-0 rounded-full border-b-2 border-brand-primary opacity-50"
          style={{ transform: "rotate(90deg)" }}
        ></div>
      </motion.div>
    </motion.div>
  )
}

// Main component that wraps the inner component with Suspense
export default function PageTransition() {
  return (
    <Suspense fallback={null}>
      <PageTransitionInner />
    </Suspense>
  )
}

