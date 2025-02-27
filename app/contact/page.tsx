"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Phone,
  Mail,
  Send,
  MessageSquare,
  Clock,
  Instagram,
  X,
  Linkedin,
  Github,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react"
import MovingBackground from "@/components/MovingBackground"

type FormData = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
}

const contactMethods = [
  {
    icon: Phone,
    title: "تماس تلفنی",
    description: "در ساعات کاری پاسخگوی تماس شما هستم",
    items: [
      {
        text: "بزودی...",
        link: "#",
      },
    ],
  },
  {
    icon: Mail,
    title: "ایمیل",
    description: "در اسرع وقت به ایمیل شما پاسخ خواهم داد",
    items: [
      {
        text: "info@amirsalmani.com",
        link: "mailto:info@amirsalmani.com",
      },
    ],
  },
  {
    icon: Clock,
    title: "ساعات کاری",
    description: "شنبه تا پنج‌شنبه",
    items: [
      {
        text: "۱۰ صبح تا ۱۲ شب",
        link: "#",
      },
      {
        text: "جمعه‌ها: تعطیل",
        link: "#",
      },
    ],
  },
]

const socialLinks = [
  {
    name: "Instagram",
    url: "https://instagram.com/amirsalmanidev",
    icon: Instagram,
  },
  {
    name: "X",
    url: "https://x.com/amhousa",
    icon: X,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/amirhosseinsalmani",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    url: "https://github.com/amhousa",
    icon: Github,
  },
]

const faqs = [
  {
    q: "چگونه می‌توانم پروژه خود را به شما معرفی کنم؟",
    a: "شما می‌توانید از طریق فرم تماس، ایمیل یا تماس تلفنی، پروژه خود را معرفی کنید. پس از دریافت اطلاعات اولیه، جلسه‌ای برای بررسی دقیق‌تر هماهنگ خواهد شد.",
  },
  {
    q: "زمان پاسخگویی به درخواست‌ها چقدر است؟",
    a: "معمولاً در کمتر از ۲۴ ساعت کاری به درخواست‌ها پاسخ داده می‌شود. در موارد فوری می‌توانید از طریق تماس تلفنی با من در ارتباط باشید.",
  },
  {
    q: "آیا امکان جلسه حضوری وجود دارد؟",
    a: "بله، برای پروژه‌های بزرگ و در صورت نیاز، امکان برگزاری جلسه حضوری در تهران وجود دارد. جلسات معمولاً در دفتر کار یا محل مورد توافق طرفین برگزار می‌شود.",
  },
]

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to send message")

      setStatus("success")
      setFormData(initialFormData)
    } catch (error) {
      console.error("Error sending message:", error)
      setStatus("error")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen">
      <MovingBackground />

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              در تماس <span className="text-brand-primary">باشید</span>
            </h1>
            <p className="text-lg text-gray-300">
              برای مشاوره، همکاری یا هر گونه سوال با من در تماس باشید. آماده پاسخگویی به شما هستم.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-2xl p-6 text-center group hover:border-brand-primary/50 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-xl bg-brand-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <method.icon className="w-8 h-8 text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                <p className="text-gray-400 mb-4">{method.description}</p>
                {method.items.map((item, i) => (
                  <div key={i} className="mb-2 last:mb-0">
                    <a
                      href={item.link}
                      className="text-gray-300 hover:text-brand-primary transition-colors"
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                    >
                      {item.text}
                    </a>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/20 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">ارسال پیام</h2>
                  <p className="text-gray-400">فرم زیر را پر کنید تا در اسرع وقت با شما تماس بگیرم.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                      نام و نام خانوادگی
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary transition-colors"
                      placeholder="نام خود را وارد کنید"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                      ایمیل
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary transition-colors"
                      placeholder="example@domain.com"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                      شماره موبایل
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary transition-colors"
                      placeholder="09123456789"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                      موضوع
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary transition-colors"
                      placeholder="موضوع پیام خود را وارد کنید"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    پیام
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary transition-colors resize-none"
                    placeholder="پیام خود را بنویسید..."
                  ></textarea>
                </div>

                {status !== "idle" && (
                  <div
                    className={`p-4 rounded-xl ${
                      status === "success" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {status === "success" ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                      <span>
                        {status === "success"
                          ? "پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهم گرفت."
                          : "خطا در ارسال پیام. لطفاً دوباره تلاش کنید."}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-brand-primary text-black font-medium px-8 py-4 rounded-xl hover:bg-brand-primary/90 transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      در حال ارسال...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      ارسال پیام
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="relative py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-8">من را در شبکه‌های اجتماعی دنبال کنید</h2>
            <div className="flex justify-center gap-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-primary/20 hover:border-brand-primary/50 transition-all group"
                >
                  <social.icon className="w-6 h-6 text-gray-400 group-hover:text-brand-primary transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">سؤالات متداول</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="glass-effect rounded-xl p-6"
                >
                  <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                  <p className="text-gray-400">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

