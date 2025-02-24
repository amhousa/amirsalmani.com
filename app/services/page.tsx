"use client"

import { motion } from "framer-motion"
import { Code, Palette, Globe, Cpu, Rocket, MessageSquare } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Code,
    title: "توسعه وب",
    description: "طراحی و توسعه وب‌سایت‌های مدرن و واکنش‌گرا با استفاده از آخرین تکنولوژی‌ها",
    features: [
      "طراحی رابط کاربری مدرن",
      "توسعه فرانت‌اند با React و Next.js",
      "توسعه بک‌اند با Node.js",
      "بهینه‌سازی عملکرد و SEO",
      "API RESTful و GraphQL",
    ],
    price: "از ۱۵ میلیون تومان",
    link: "/cooperation",
  },
  {
    icon: Palette,
    title: "طراحی رابط کاربری",
    description: "طراحی رابط‌های کاربری زیبا و کاربرپسند با تمرکز بر تجربه کاربری عالی",
    features: [
      "طراحی رابط کاربری موبایل و دسکتاپ",
      "پروتوتایپ و وایرفریم",
      "انیمیشن و موشن",
      "سیستم طراحی و استایل‌گاید",
      "تست کاربردپذیری",
    ],
    price: "از ۸ میلیون تومان",
    link: "/cooperation",
  },
  {
    icon: Globe,
    title: "سئو و دیجیتال مارکتینگ",
    description: "بهینه‌سازی سایت برای موتورهای جستجو و افزایش بازدید ارگانیک",
    features: ["تحقیق کلمات کلیدی", "بهینه‌سازی محتوا", "لینک‌سازی داخلی و خارجی", "بهبود سرعت سایت", "گزارش‌های تحلیلی"],
    price: "از ۵ میلیون تومان",
    link: "/cooperation",
  },
  {
    icon: Cpu,
    title: "هوش مصنوعی",
    description: "پیاده‌سازی راهکارهای هوش مصنوعی و یادگیری ماشین در کسب و کار شما",
    features: ["چت‌بات‌های هوشمند", "پردازش زبان طبیعی", "سیستم‌های توصیه‌گر", "تشخیص تصویر", "تحلیل داده"],
    price: "از ۲۰ میلیون تومان",
    link: "/cooperation",
  },
  {
    icon: Rocket,
    title: "مشاوره استارتاپ",
    description: "مشاوره تخصصی برای راه‌اندازی و توسعه استارتاپ‌های تکنولوژی محور",
    features: [
      "تحلیل بازار و رقبا",
      "انتخاب تکنولوژی مناسب",
      "طراحی معماری نرم‌افزار",
      "مقیاس‌پذیری و عملکرد",
      "امنیت و حریم خصوصی",
    ],
    price: "از ۳ میلیون تومان",
    link: "/cooperation",
  },
  {
    icon: MessageSquare,
    title: "آموزش برنامه‌نویسی",
    description: "دوره‌های آموزشی تخصصی برنامه‌نویسی وب و موبایل",
    features: ["آموزش React و Next.js", "برنامه‌نویسی Node.js", "توسعه API", "پایگاه داده و SQL", "DevOps و استقرار"],
    price: "از ۲ میلیون تومان",
    link: "/cooperation",
  },
]

export default function Services() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4 text-brand-primary"
        >
          خدمات تخصصی
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-300 max-w-2xl mx-auto"
        >
          با استفاده از تجربه و تخصص در حوزه‌های مختلف، آماده ارائه خدمات حرفه‌ای به کسب و کار شما هستم.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-dark-bg border border-gray-800 rounded-2xl p-6 hover:border-brand-primary/50 transition-all duration-300"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent rounded-2xl" />

            {/* Content */}
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-brand-primary/20 flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-brand-primary" />
              </div>

              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-brand-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 mb-4 min-h-[3rem]">{service.description}</p>

              <div className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-brand-primary font-semibold">{service.price}</span>
                <Link
                  href={service.link}
                  className="inline-flex items-center justify-center px-4 py-2 bg-brand-primary text-black rounded-xl 
                           hover:bg-brand-primary/90 transition-colors font-medium"
                >
                  سفارش
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

