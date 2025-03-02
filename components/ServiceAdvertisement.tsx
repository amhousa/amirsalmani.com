"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Code, Cpu, Rocket, Brain, Lightbulb, Gem } from "lucide-react"

// Array of different ad messages with matching icons
const adMessages = [
  {
    title: "نیاز به مشاوره تخصصی دارید؟",
    description:
      "تیم حرفه‌ای ما با بیش از ۵ سال تجربه در توسعه وب و هوش مصنوعی، آماده ارائه راهکارهای نوآورانه برای کسب‌وکار شماست.",
    cta: "دریافت مشاوره رایگان",
    icon: Brain,
    gradient: "from-[#00DC82]/5 via-transparent to-transparent",
  },
  {
    title: "به دنبال راه‌حل‌های هوشمند هستید؟",
    description:
      "از طراحی سایت مدرن تا پیاده‌سازی هوش مصنوعی، تیم توسعه امیرحسین سلمانی با جدیدترین تکنولوژی‌ها همراه شماست.",
    cta: "شروع همکاری",
    icon: Cpu,
    gradient: "from-[#00B368]/5 via-transparent to-transparent",
  },
  {
    title: "آماده ورود به دنیای دیجیتال هستید؟",
    description: "با بهره‌گیری از React، Next.js و هوش مصنوعی، کسب‌وکار شما را به سطح بعدی می‌بریم.",
    cta: "مشاوره آنلاین",
    icon: Rocket,
    gradient: "from-[#009B57]/5 via-transparent to-transparent",
  },
  {
    title: "به دنبال توسعه‌دهنده حرفه‌ای هستید؟",
    description:
      "تیم ما با تخصص در فول‌استک و هوش مصنوعی، پروژه‌های شما را با بالاترین کیفیت و استانداردهای روز دنیا پیاده‌سازی می‌کند.",
    cta: "تماس با ما",
    icon: Code,
    gradient: "from-[#00DC82]/5 via-transparent to-transparent",
  },
  {
    title: "ایده‌های خلاقانه دارید؟",
    description:
      "با ترکیب خلاقیت و تکنولوژی، ایده‌های شما را به واقعیت تبدیل می‌کنیم. از طراحی تا اجرا، در کنار شما هستیم.",
    cta: "شروع پروژه",
    icon: Lightbulb,
    gradient: "from-[#00B368]/5 via-transparent to-transparent",
  },
  {
    title: "به دنبال کیفیت برتر هستید؟",
    description: "با استفاده از بهترین تکنولوژی‌ها و متدهای توسعه، خدماتی در سطح جهانی به کسب‌وکار شما ارائه می‌دهیم.",
    cta: "درخواست مشاوره",
    icon: Gem,
    gradient: "from-[#009B57]/5 via-transparent to-transparent",
  },
]

export default function ServiceAdvertisement() {
  // Randomly select one message
  const message = adMessages[Math.floor(Math.random() * adMessages.length)]
  const Icon = message.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-8 p-6 rounded-xl bg-gradient-to-br from-[#012E1F] to-[#001A10] border border-[#014D40]/20 relative overflow-hidden group"
      style={{ zIndex: -1 }}
    >
      {/* Background Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute -left-6 top-2 -translate-y-1/2 pointer-events-none"
      >
        <Icon className="w-64 h-64 text-[#00DC82]/5 transform -rotate-12 transition-transform duration-500 group-hover:scale-110" />
      </motion.div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${message.gradient}`} />

      {/* Content */}
      <div className="relative z-[5]">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-bold text-[#00DC82] mb-3"
        >
          {message.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white/90 mb-4 max-w-[80%] leading-relaxed"
        >
          {message.description}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-7 py-3 bg-black/95 text-[#00DC82] text-sm font-medium rounded-xl transition-all duration-300 hover:bg-black/80"
            style={{ textDecoration: "none" }}
          >
            {message.cta}
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

