"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, ArrowLeft, Link2, AlertCircle } from "lucide-react"

export default function Error414() {
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
            {/* Glitch effect on 414 */}
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
              414
            </motion.h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <h2 className="text-2xl font-semibold mb-4 text-white">آدرس درخواستی خیلی طولانی است!</h2>
              <div className="space-y-4 mb-8">
                <p className="text-gray-300">
                  متأسفانه آدرس (URL) درخواستی شما بیش از حد طولانی است و سرور قادر به پردازش آن نیست.
                </p>
                <div className="bg-white/5 rounded-xl p-4 text-right">
                  <h3 className="flex items-center gap-2 text-brand-primary font-semibold mb-2">
                    <AlertCircle className="w-5 h-5" />
                    چرا این خطا رخ داده است؟
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <Link2 className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>آدرس وارد شده حاوی پارامترهای بیش از حد یا داده‌های طولانی است</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Link2 className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>احتمالاً خطایی در کپی و پیست آدرس رخ داده است</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Link2 className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>ممکن است لینک اصلی شکسته یا نادرست باشد</span>
                    </li>
                  </ul>
                </div>
              </div>

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

