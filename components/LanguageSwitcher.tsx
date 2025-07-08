"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Globe } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

type Language = {
  code: string
  name: string
  flag: string
  dir: "ltr" | "rtl"
}

const languages: Language[] = [
  {
    code: "fa",
    name: "فارسی",
    flag: "/images/flags/ir.svg",
    dir: "rtl",
  },
  // {
  //   code: "en",
  //   name: "English",
  //   flag: "/images/flags/us.svg",
  //   dir: "ltr",
  // },
]

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Determine current language from URL
  const currentLang = pathname.startsWith("/en") ? "en" : "fa"

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Function to get the equivalent path in another language
  const getLanguagePath = (lang: string) => {
    if (lang === "en") {
      // If switching to English
      return pathname.startsWith("/en") ? pathname : `/en${pathname}`
    } else {
      // If switching to Persian
      return pathname.startsWith("/en") ? pathname.substring(3) || "/" : pathname
    }
  }

  return (
    <div className="fixed right-4 top-[50px] z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-xl border-2 border-white/10 bg-black/80 px-3 py-1.5 text-white shadow-lg backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: "0 0 15px rgba(0, 220, 130, 0.3)",
        }}
      >
        <Globe className="h-4 w-4" />
        <span className="text-xs font-medium">{currentLang === "fa" ? "FA" : "EN"}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-36 rounded-xl border border-white/10 bg-black/90 p-1 shadow-lg backdrop-blur-md"
          >
            {languages.map((lang) => (
              <Link
                key={lang.code}
                href={getLanguagePath(lang.code)}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 transition-colors hover:bg-white/10 ${
                  currentLang === lang.code ? "bg-brand-primary/20 text-brand-primary" : "text-white"
                }`}
              >
                <div className="relative h-4 w-6 overflow-hidden rounded">
                  <Image src={lang.flag || "/placeholder.svg"} alt={lang.name} fill className="object-cover" />
                </div>
                <span className="text-sm">{lang.name}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
