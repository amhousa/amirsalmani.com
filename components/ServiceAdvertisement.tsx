"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ServiceAdvertisementProps {
  color?: string
  buttonText?: string
  buttonHref?: string
  className?: string
}

const adTexts = [
  "آیا به دنبال راه‌اندازی کسب و کار آنلاین هستید؟ ما می‌توانیم به شما کمک کنیم!",
  "طراحی سایت حرفه‌ای با بهترین قیمت و کیفیت برتر",
  "سئو و بهینه‌سازی سایت شما برای موتورهای جستجو",
  "خدمات هوش مصنوعی و یادگیری ماشین برای کسب و کار شما",
  "توسعه اپلیکیشن‌های موبایل با جدیدترین تکنولوژی‌ها",
]

export default function ServiceAdvertisement({
  color = "#00DC82",
  buttonText = "دریافت مشاوره رایگان",
  buttonHref = "/contact",
  className,
}: ServiceAdvertisementProps) {
  const [adText, setAdText] = useState<string>("")

  useEffect(() => {
    // Randomly select an ad text when component mounts
    const randomIndex = Math.floor(Math.random() * adTexts.length)
    setAdText(adTexts[randomIndex])
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("relative p-6 md:p-8 my-8 rounded-2xl overflow-hidden", className)}
      style={{
        background: `linear-gradient(135deg, ${color}20 0%, transparent 100%)`,
        border: `1px solid ${color}30`,
      }}
    >
      {/* Background glow effect */}
      <div
        className="absolute inset-0 opacity-30 blur-3xl"
        style={{
          background: `radial-gradient(circle at center, ${color}20 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <p className="text-lg md:text-xl font-medium text-white mb-6">{adText}</p>

        <motion.a
          href={buttonHref}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors"
          style={{
            backgroundColor: color,
            color: "black",
          }}
        >
          {buttonText}
          <ArrowLeft className="w-5 h-5" />
        </motion.a>
      </div>
    </motion.div>
  )
}

