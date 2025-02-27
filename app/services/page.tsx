"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Palette, Globe, Cpu, Rocket, MessageSquare, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
// import ThreeScene from "@/components/ThreeScene"

export default function ServicesClient() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)

  return (
    <div className="relative">
      {/* Hero Section with 3D Animation */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* <ThreeScene onLoad={() => setSceneLoaded(true)} /> */}

        {/* Content overlay */}
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              خدمات{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-primary/70">
                تخصصی
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto px-4">
              با استفاده از تجربه و تخصص در حوزه‌های مختلف، آماده ارائه خدمات حرفه‌ای به کسب و کار شما هستم.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-4 flex-wrap"
            >
              <Link
                href="/cooperation"
                className="px-8 py-3 bg-brand-primary text-black rounded-xl hover:bg-brand-primary/90 transition-all transform hover:scale-105"
              >
                شروع همکاری
              </Link>
              <Link
                href="#services"
                className="px-8 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all transform hover:scale-105"
              >
                مشاهده خدمات
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-400">اسکرول کنید</span>
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
              className="w-1 h-8 rounded-full bg-gradient-to-b from-brand-primary to-transparent"
            />
          </div>
        </motion.div>
      </section>

      {/* Rest of the services content */}
      <div id="services" className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-dark-bg border border-gray-800 rounded-2xl p-6 hover:border-brand-primary/50 transition-all duration-300"
            >
              {/* Keep existing service card content */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent rounded-2xl" />
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

        {/* FAQ Section */}
        <div className="mt-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 text-center text-brand-primary"
          >
            سؤالات متداول
          </motion.h2>

          {/* Keep existing FAQ content */}
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((category) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-dark-bg border border-gray-800 rounded-2xl overflow-hidden"
              >
                {/* Keep existing FAQ category content */}
                <button
                  className="w-full px-6 py-4 flex justify-between items-center bg-black/20 hover:bg-black/30 transition-colors"
                  onClick={() => setOpenCategory(openCategory === category.category ? null : category.category)}
                >
                  <span className="text-lg font-semibold text-white">{category.category}</span>
                  {openCategory === category.category ? (
                    <ChevronUp className="w-5 h-5 text-brand-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                <AnimatePresence>
                  {openCategory === category.category && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {/* Keep existing FAQ questions content */}
                      <div className="px-6 py-4 space-y-4">
                        {category.questions.map((faq) => (
                          <div key={faq.q} className="border-b border-gray-800 last:border-0 pb-4 last:pb-0">
                            {/* Keep existing FAQ question content */}
                            <button
                              className="w-full text-right flex justify-between items-center group"
                              onClick={() => setOpenQuestion(openQuestion === faq.q ? null : faq.q)}
                            >
                              <span className="text-white group-hover:text-brand-primary transition-colors">
                                {faq.q}
                              </span>
                              {openQuestion === faq.q ? (
                                <ChevronUp className="w-4 h-4 text-brand-primary flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-brand-primary flex-shrink-0" />
                              )}
                            </button>

                            <AnimatePresence>
                              {openQuestion === faq.q && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <p className="mt-2 text-gray-400 text-sm whitespace-pre-line">{faq.a}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

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
    price: "از ۱۷ میلیون تومان",
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
    price: "از ۱۰ میلیون تومان",
    link: "/cooperation",
  },
  {
    icon: Globe,
    title: "سئو و دیجیتال مارکتینگ",
    description: "بهینه‌سازی سایت برای موتورهای جستجو و افزایش بازدید ارگانیک",
    features: ["تحقیق کلمات کلیدی", "بهینه‌سازی محتوا", "لینک‌سازی داخلی و خارجی", "بهبود سرعت سایت", "گزارش‌های تحلیلی"],
    price: "از ۷ میلیون تومان",
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
    price: "از ۵ میلیون تومان",
    link: "/cooperation",
  },
]

const faqs = [
  {
    category: "خدمات و قیمت‌گذاری",
    questions: [
      {
        q: "هزینه پروژه‌ها چگونه محاسبه می‌شود؟",
        a: "هزینه هر پروژه بر اساس پیچیدگی، زمان مورد نیاز و ویژگی‌های درخواستی محاسبه می‌شود. قیمت‌های پایه در هر سرویس ذکر شده است و برای دریافت قیمت دقیق می‌توانید درخواست مشاوره رایگان دهید.",
      },
      {
        q: "آیا امکان پرداخت اقساطی وجود دارد؟",
        a: "بله، برای پروژه‌های بزرگ امکان پرداخت مرحله‌ای (30% ابتدای پروژه، 40% حین اجرا و 30% در پایان) وجود دارد. همچنین برای دوره‌های آموزشی، امکان پرداخت اقساطی فراهم است.",
      },
      {
        q: "مدت زمان اجرای پروژه چقدر است؟",
        a: "زمان اجرای پروژه بستگی به حجم و پیچیدگی آن دارد. معمولاً پروژه‌های کوچک 2-4 هفته و پروژه‌های متوسط 1-3 ماه زمان می‌برند. زمان دقیق در جلسه مشاوره مشخص می‌شود.",
      },
    ],
  },
  {
    category: "فرآیند کار",
    questions: [
      {
        q: "مراحل شروع همکاری چگونه است؟",
        a: "1. درخواست مشاوره رایگان\n2. جلسه بررسی نیازها و اهداف\n3. ارائه پروپوزال و قیمت\n4. عقد قرارداد و پرداخت پیش‌پرداخت\n5. شروع پروژه طبق زمان‌بندی",
      },
      {
        q: "آیا در طول پروژه امکان اعمال تغییرات وجود دارد؟",
        a: "بله، تا 20% تغییرات جزئی در محدوده اولیه پروژه بدون هزینه اضافی قابل انجام است. تغییرات بیشتر یا خارج از محدوده اولیه، مستلزم توافق جدید خواهد بود.",
      },
      {
        q: "گزارش پیشرفت پروژه چگونه ارائه می‌شود؟",
        a: "گزارش‌های هفتگی از پیشرفت پروژه ارائه می‌شود و جلسات آنلاین منظم برای بررسی روند کار برگزار می‌شود. همچنین دسترسی به سیستم مدیریت پروژه برای پیگیری لحظه‌ای فراهم است.",
      },
    ],
  },
  {
    category: "پشتیبانی و خدمات پس از تحویل",
    questions: [
      {
        q: "چه مدت پشتیبانی رایگان ارائه می‌شود؟",
        a: "تمام پروژه‌ها شامل 3 ماه پشتیبانی رایگان هستند که شامل رفع باگ و مشکلات احتمالی می‌شود. پس از آن، می‌توانید از بسته‌های پشتیبانی ماهانه استفاده کنید.",
      },
      {
        q: "آموزش استفاده از سیستم چگونه است؟",
        a: "در پایان پروژه، جلسات آموزشی برای تیم شما برگزار می‌شود. همچنین مستندات کامل فنی و راهنمای کاربری در اختیارتان قرار می‌گیرد.",
      },
      {
        q: "آیا سورس کد پروژه تحویل داده می‌شود؟",
        a: "بله، پس از تسویه کامل، تمام سورس کدها به همراه مستندات فنی تحویل داده می‌شود. کدها به صورت تمیز و با رعایت اصول برنامه‌نویسی نوشته می‌شوند.",
      },
    ],
  },
  {
    category: "تکنولوژی و امنیت",
    questions: [
      {
        q: "از چه تکنولوژی‌هایی استفاده می‌شود؟",
        a: "برای فرانت‌اند از React، Next.js و TypeScript استفاده می‌شود. در بک‌اند از Node.js و فریم‌ورک‌های مدرن بهره می‌بریم. پایگاه داده و تکنولوژی‌ها بر اساس نیاز پروژه انتخاب می‌شوند.",
      },
      {
        q: "امنیت پروژه چگونه تضمین می‌شود؟",
        a: "از بهترین شیوه‌های امنیتی مانند رمزنگاری داده‌ها، احراز هویت دو مرحله‌ای و محافظت در برابر حملات رایج استفاده می‌شود. همچنین تست‌های امنیتی منظم انجام می‌شود.",
      },
      {
        q: "آیا قابلیت مقیاس‌پذیری وجود دارد؟",
        a: "بله، معماری پروژه‌ها به گونه‌ای طراحی می‌شود که قابلیت مقیاس‌پذیری داشته باشند. از تکنیک‌های مدرن مانند میکروسرویس‌ها و کانتینرسازی استفاده می‌شود.",
      },
    ],
  },
]
