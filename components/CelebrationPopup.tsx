"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, PartyPopper, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import confetti from "canvas-confetti"

export default function CelebrationPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    // Check if the popup has been dismissed or postponed
    const popupStatus = localStorage.getItem("celebrationPopupStatus")
    const postponedTime = localStorage.getItem("celebrationPopupPostponedTime")

    if (!popupStatus) {
      setIsOpen(true)
      // Trigger confetti effect when popup opens
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00DC82", "#00B368", "#ffffff"],
      })
    } else if (popupStatus === "postponed" && postponedTime) {
      const postponedUntil = Number.parseInt(postponedTime)
      if (Date.now() > postponedUntil) {
        setIsOpen(true)
        localStorage.removeItem("celebrationPopupStatus")
        localStorage.removeItem("celebrationPopupPostponedTime")
        // Trigger confetti effect
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00DC82", "#00B368", "#ffffff"],
        })
      }
    }
    setIsInitialLoad(false)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem("celebrationPopupStatus", "dismissed")
  }

  const handlePostpone = () => {
    setIsOpen(false)
    // Postpone for 24 hours
    const postponeUntil = Date.now() + 24 * 60 * 60 * 1000
    localStorage.setItem("celebrationPopupStatus", "postponed")
    localStorage.setItem("celebrationPopupPostponedTime", postponeUntil.toString())
  }

  if (isInitialLoad) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose()
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg bg-dark-bg rounded-2xl overflow-hidden"
          >
            {/* Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-primary/20 to-transparent" />
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-primary/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-brand-primary/30 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative p-6 md:p-8">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-brand-primary/20 flex items-center justify-center">
                  <PartyPopper className="w-8 h-8 text-brand-primary" />
                </div>
              </div>

              {/* Text Content */}
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  جشنواره <span className="text-brand-primary">تخفیف ۲۰٪</span>
                </h2>
                <p className="text-gray-300 mb-2">به مناسبت سال نو، تمامی خدمات با ۲۰٪ تخفیف ارائه می‌شوند!</p>
                <p className="text-sm text-gray-400">این پیشنهاد فقط تا پایان فروردین معتبر است.</p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/services"
                  className="flex-1 bg-brand-primary text-black font-medium px-6 py-3 rounded-xl hover:bg-brand-primary/90 
                           transition-all flex items-center justify-center gap-2 group"
                  onClick={handleClose}
                >
                  مشاهده خدمات
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={handlePostpone}
                  className="flex-1 bg-white/10 text-white px-6 py-3 rounded-xl hover:bg-white/20 
                           transition-all flex items-center justify-center gap-2"
                >
                  <Clock className="w-5 h-5" />
                  یادآوری بعداً
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400">
                  کد تخفیف: <span className="text-brand-primary font-mono">NOWRUZ1403</span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

