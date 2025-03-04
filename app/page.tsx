"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Terminal, Sparkles, Code, Cpu, Server, ArrowRight, ExternalLink, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"

const ThreeScene = dynamic(() => import("@/components/ThreeScene"), { ssr: false })

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [activeCodeIndex, setActiveCodeIndex] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Code snippets for the live coding effect
  const codeSnippets = [
    `function AI() {
  const future = await predict()
  return <Innovation />
}`,
    `const Web = {
  frontend: "React",
  backend: "Node.js",
  database: "PostgreSQL"
}`,
    `class Innovation {
  create() {
    return solutions.map(
      idea => transform(idea)
    )
  }
}`,
  ]

  // Auto-cycle through code snippets
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCodeIndex((prev) => (prev + 1) % codeSnippets.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Case studies data
  const caseStudies = [
    {
      title: "پلتفرم آموزش آنلاین",
      description: "طراحی و توسعه یک پلتفرم آموزشی با قابلیت پخش زنده و تعامل دو طرفه",
      metrics: [
        { label: "افزایش کاربران", value: "200%" },
        { label: "رضایت کاربران", value: "98%" },
      ],
      image: "/images/portfolio/case-study-1.jpg",
    },
    {
      title: "اپلیکیشن هوشمند مالی",
      description: "توسعه اپلیکیشن مدیریت مالی با استفاده از هوش مصنوعی",
      metrics: [
        { label: "دقت پیش‌بینی", value: "95%" },
        { label: "کاهش هزینه‌ها", value: "30%" },
      ],
      image: "/images/portfolio/case-study-2.jpg",
    },
  ]

  return (
    <div ref={containerRef} className="relative min-h-[300vh]">
      {/* Fixed background with 3D animation */}
      <div className="fixed inset-0 -z-10">
        <ThreeScene />
      </div>

      {/* Hero Section with Enhanced Value Proposition */}
      <motion.section style={{ y, opacity }} className="min-h-screen relative flex items-center justify-center p-4">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 rounded-full bg-brand-primary/20 text-brand-primary text-sm font-medium">
              توسعه‌دهنده فول‌استک و متخصص هوش مصنوعی
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            جایی که <span className="text-brand-primary">تکنولوژی</span>
            <br />و <span className="text-brand-primary">خلاقیت</span>
            <br />
            یکی می‌شوند
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8"
          >
            با بیش از ۵ سال تجربه در توسعه راهکارهای نوآورانه، من به شما کمک می‌کنم تا ایده‌هایتان را به واقعیت تبدیل
            کنید.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/cooperation"
              className="group px-8 py-3 bg-brand-primary text-black rounded-xl hover:bg-brand-primary/90 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              شروع همکاری
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#discover"
              className="group px-8 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              مشاهده نمونه کارها
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-16"
          >
            {[
              { value: "5+", label: "سال تجربه", icon: Code },
              { value: "50+", label: "پروژه موفق", icon: Server },
              { value: "30+", label: "مشتری راضی", icon: Sparkles },
              { value: "24/7", label: "پشتیبانی", icon: Cpu },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="glass-effect rounded-xl p-4 flex flex-col items-center justify-center"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-primary/20 flex items-center justify-center mb-2">
                  <stat.icon className="w-5 h-5 text-brand-primary" />
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Case Studies Section */}
      <section className="relative py-32" id="discover">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">نمونه کارهای موفق</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              نگاهی به برخی از پروژه‌های موفقی که با همکاری مشتریان عزیز به سرانجام رسیده‌اند.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass-effect rounded-2xl overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={study.image || "/placeholder.svg"}
                    alt={study.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                  <p className="text-gray-400 mb-4">{study.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {study.metrics.map((metric) => (
                      <div key={metric.label} className="text-center p-3 rounded-xl bg-white/5">
                        <div className="text-2xl font-bold text-brand-primary">{metric.value}</div>
                        <div className="text-sm text-gray-400">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/portfolio/${index + 1}`}
                    className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary/80 transition-colors"
                  >
                    مشاهده جزئیات
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-32 bg-gradient-to-b from-transparent to-black/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">خدمات تخصصی</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              با استفاده از جدیدترین تکنولوژی‌ها، راهکارهای نوآورانه برای کسب و کار شما ارائه می‌دهم.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6 hover:border-brand-primary/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                      <ChevronRight className="w-4 h-4 text-brand-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto"
          >
            <Terminal className="w-16 h-16 text-brand-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">آماده همکاری با شما هستم</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              برای مشاوره رایگان و بررسی نیازهای پروژه شما، همین حالا تماس بگیرید.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/cooperation"
                className="group px-8 py-3 bg-brand-primary text-black rounded-xl hover:bg-brand-primary/90 transition-all transform hover:scale-105 flex items-center gap-2"
              >
                درخواست مشاوره رایگان
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="group px-8 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all transform hover:scale-105 flex items-center gap-2"
              >
                تماس مستقیم
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

const services = [
  {
    icon: Code,
    title: "توسعه وب",
    description: "طراحی و توسعه وب‌سایت‌های مدرن و واکنش‌گرا",
    features: ["React و Next.js", "API RESTful", "PWA", "بهینه‌سازی SEO"],
  },
  {
    icon: Server,
    title: "توسعه بک‌اند",
    description: "طراحی و پیاده‌سازی زیرساخت‌های قدرتمند",
    features: ["Node.js", "PostgreSQL", "GraphQL", "Microservices"],
  },
  {
    icon: Cpu,
    title: "هوش مصنوعی",
    description: "پیاده‌سازی راهکارهای مبتنی بر هوش مصنوعی",
    features: ["پردازش زبان طبیعی", "یادگیری ماشین", "چت‌بات", "تحلیل داده"],
  },
]

