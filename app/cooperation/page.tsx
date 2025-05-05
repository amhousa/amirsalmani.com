"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Check, ChevronDown, ChevronUp, Wallet } from "lucide-react"
import Link from "next/link"

const packages = [
  {
    name: "مشاوره اولیه",
    priceUSD: 10,
    priceETH: 0.004,
    currency: "ETH",
    features: ["۳۰ دقیقه مشاوره آنلاین", "بررسی نیازها و اهداف", "ارائه راهکارهای پیشنهادی"],
    description: "مناسب برای آشنایی اولیه و بررسی امکان همکاری",
  },
  {
    name: "توسعه وب",
    priceUSD: 150,
    priceETH: 0.055,
    currency: "ETH",
    features: [
      "۱۰ ساعت برنامه‌نویسی",
      "توسعه فرانت‌اند و بک‌اند",
      "بهینه‌سازی عملکرد",
      "طراحی رابط کاربری",
      "پشتیبانی ۳ ماهه رایگان",
    ],
    description: "مناسب برای پروژه‌های توسعه وب با تکنولوژی‌های مدرن",
    popular: true,
  },
  {
    name: "هوش مصنوعی",
    priceUSD: 200,
    priceETH: 0.8,
    currency: "ETH",
    features: [
      "۱۵ ساعت برنامه‌نویسی",
      "پیاده‌سازی مدل‌های هوش مصنوعی",
      "توسعه چت‌بات",
      "پردازش زبان طبیعی",
      "بهینه‌سازی عملکرد",
    ],
    description: "مناسب برای پروژه‌های هوش مصنوعی و یادگیری ماشین",
  },
]

const faqs = [
  {
    question: "روند شروع همکاری چگونه است؟",
    answer:
      "پس از پرداخت هزینه مشاوره اولیه، یک جلسه ۳۰ دقیقه‌ای برگزار می‌شود. در این جلسه نیازها و اهداف پروژه بررسی شده و برآورد زمان و هزینه ارائه می‌شود.",
  },
  {
    question: "آیا امکان پرداخت ریالی وجود دارد؟",
    answer: "بله، برای پروژه‌های داخل ایران امکان پرداخت ریالی فراهم است. در جلسه مشاوره جزئیات بیشتر ارائه می‌شود.",
  },
  {
    question: "مدت زمان اجرای پروژه چقدر است؟",
    answer: "زمان اجرای پروژه بستگی به پیچیدگی و حجم کار دارد. در جلسه مشاوره اولیه، برآورد دقیق زمانی ارائه می‌شود.",
  },
  {
    question: "چه تضمینی برای کیفیت کار وجود دارد؟",
    answer:
      "تمام پروژه‌ها با رعایت استانداردهای روز توسعه داده می‌شوند و ۳ ماه پشتیبانی رایگان دارند. همچنین پرداخت‌ها به صورت مرحله‌ای انجام می‌شود.",
  },
]

export default function Cooperation() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [status, setStatus] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("در حال پردازش...")

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      })

      if (response.ok) {
        setStatus("درخواست شما با موفقیت ثبت شد. به زودی با شما تماس خواهیم گرفت.")
        setPhoneNumber("")
      } else {
        throw new Error("خطا در ثبت درخواست")
      }
    } catch (error) {
      setStatus("متأسفانه خطایی رخ داد. لطفاً دوباره تلاش کنید.")
    }
  }

  return (
    <div className="container w-full overflow-x-hidden px-4 sm:px-4 lg:px-4 py-8">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-brand-primary">شرایط همکاری</h1>
        <p className="text-lg mb-8 text-gray-300">
          با بیش از ۵ سال تجربه در توسعه وب و هوش مصنوعی، آماده همکاری در پروژه‌های شما هستم.
        </p>
      </section>

      {/* Packages */}
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-16">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-2xl p-6 ${
              pkg.popular
                ? "bg-brand-primary bg-opacity-90 border-2 border-brand-primary"
                : "bg-dark-bg border border-gray-800"
            }`}
          >
            {pkg.popular && (
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-primary text-white px-4 py-1 rounded-full text-sm">
                پرطرفدار
              </span>
            )}
            <h3 className={`text-2xl font-bold mb-2 ${pkg.popular ? "text-black" : "text-brand-primary"}`}>
              {pkg.name}
            </h3>
            <div className="flex items-baseline mb-4">
              <span className={`text-3xl font-bold ${pkg.popular ? "text-black" : "text-white"}`}>${pkg.priceUSD}</span>
              <span className={`mr-2 text-sm ${pkg.popular ? "text-black/70" : "text-gray-400"}`}>
                ({pkg.priceETH} ETH)
              </span>
            </div>
            <p className={`mb-6 ${pkg.popular ? "text-black/80" : "text-gray-300"}`}>{pkg.description}</p>
            <ul className="space-y-3 mb-6">
              {pkg.features.map((feature) => (
                <li key={feature} className={`flex items-center ${pkg.popular ? "text-black/90" : "text-gray-300"}`}>
                  <Check className={`w-5 h-5 mr-2 ${pkg.popular ? "text-black" : "text-brand-primary"}`} />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href={`/payment?package=${pkg.name}&amount=${pkg.priceETH}&usd=${pkg.priceUSD}`}
              className={`block w-full text-center py-3 rounded-xl transition-colors ${
                pkg.popular ? "bg-black text-white hover:bg-black/90" : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              <Wallet className="inline-block w-5 h-5 ml-2 -mt-1" />
              پرداخت و شروع
            </Link>
          </motion.div>
        ))}
      </section>

      {/* Phone Number Form */}
      <section className="w-full max-w-4xl mx-auto mb-16 px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4 text-brand-primary">دریافت مشاوره رایگان</h2>
          <p className="text-gray-300">شماره تماس خود را وارد کنید تا در اولین فرصت با شما تماس بگیریم.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="شماره تماس"
              className="w-full px-4 py-3 bg-dark-bg border-2 border-gray-800 rounded-xl focus:outline-none focus:border-brand-primary text-white"
              required
              pattern="^(\+98|0)?9\d{9}$"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-brand-primary text-white px-6 py-3 rounded-xl hover:bg-opacity-90 transition-colors"
          >
            ثبت درخواست مشاوره
          </button>
        </form>
        {status && <p className="mt-4 text-center text-gray-300">{status}</p>}
      </section>

      {/* FAQs */}
      <section className="mt-24 space-y-6">
        <h2 className="text-2xl font-bold mb-8 text-center text-brand-primary">سؤالات متداول</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-800 rounded-xl overflow-hidden">
              <button
                className="w-full px-6 py-4 text-right bg-dark-bg flex justify-between items-center"
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              >
                <span className="font-medium text-white">{faq.question}</span>
                {openFaqIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openFaqIndex === index && <div className="px-6 py-4 bg-dark-bg/50 text-gray-300">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
