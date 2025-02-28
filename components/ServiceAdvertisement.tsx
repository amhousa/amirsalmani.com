"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ServiceAdvertisement() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-8 p-6 rounded-xl bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 border border-brand-primary/20"
    >
      <h3 className="text-xl font-bold text-brand-primary mb-3">نیاز به مشاوره دارید؟</h3>
      <p className="text-gray-300 mb-4">
        برای دریافت مشاوره تخصصی در زمینه طراحی سایت و توسعه کسب‌وکار آنلاین، همین حالا با من تماس بگیرید.
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-primary text-black font-medium rounded-lg hover:bg-brand-primary/90 transition-colors"
      >
        درخواست مشاوره
        <ArrowLeft className="w-5 h-5 order-last" />
      </Link>
    </motion.div>
  )
}

