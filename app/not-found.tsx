"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl p-8 text-center relative overflow-hidden"
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-primary/10 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3,
              ease: "linear",
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Glitch effect on 404 */}
            <motion.h1
              className="text-8xl font-bold mb-4 text-brand-primary relative"
              animate={{
                textShadow: ["0 0 10px #00dc82", "2px 2px 10px #00dc82", "-2px -2px 10px #00dc82", "0 0 10px #00dc82"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              404
            </motion.h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <h2 className="text-2xl font-semibold mb-4 text-white">صفحه مورد نظر پیدا نشد!</h2>
              <p className="text-gray-300 mb-8">
                متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا به آدرس دیگری منتقل شده است.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 bg-brand-primary text-black px-6 py-3 rounded-xl hover:bg-opacity-90 transition-colors w-full sm:w-auto"
                >
                  <Home className="w-5 h-5" />
                  بازگشت به خانه
                </Link>
                <button
                  onClick={() => window.history.back()}
                  className="flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-colors w-full sm:w-auto"
                >
                  <ArrowLeft className="w-5 h-5" />
                  صفحه قبلی
                </button>
              </div>
            </motion.div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-brand-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-primary/20 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </div>
  )
}

