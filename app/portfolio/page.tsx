"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import MovingBackground from "@/components/MovingBackground"

interface Project {
  id: number
  title: string
  image: string
  description: string
  highlights: string[]
  fullViewUrl: string
  category: string
  tags?: string[]
  date?: string
  client?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "برنامه ساز GymHub",
    image: "/images/portfolio/gymhub.webp",
    description: "اپلیکیشن برنامه‌ریزی تمرینات بدنسازی با قابلیت چاپ برنامه هفتگی",
    highlights: ["برنامه‌ریزی هفتگی", "جستجوی تمرین", "قابلیت چاپ برنامه", "اشتراک‌گذاری برنامه"],
    fullViewUrl: "https://gymhub.amirsalmani.com",
    category: "Web Application",
    tags: ["React", "Next.js", "Tailwind CSS"],
    date: "1402/08/15",
    client: "باشگاه فیتنس پارس",
  },
  {
    id: 2,
    title: "نیلرام - قاب‌های موسیقی",
    image: "/images/portfolio/nilram.webp",
    description: "پلتفرم سفارش قاب‌های موسیقی با امکان شخصی‌سازی پیام‌های صوتی",
    highlights: ["طراحی سه‌بعدی", "رابط کاربری لوکس", "سیستم سفارش آنلاین", "پرداخت امن"],
    fullViewUrl: "https://nilramgallery.ir",
    category: "E-commerce",
    tags: ["React", "Three.js", "Node.js"],
    date: "1402/06/20",
    client: "گالری نیلرام",
  },
  {
    id: 3,
    title: "کنترل پنل صنعتی کارما",
    image: "/images/portfolio/karma.webp",
    description: "سیستم مدیریت و کنترل تجهیزات صنعتی با رابط کاربری پیشرفته",
    highlights: ["اتوماسیون صنعتی", "مانیتورینگ آنلاین", "کنترل هوشمند", "گزارش‌گیری پیشرفته"],
    fullViewUrl: "https://karmagreenco.com/",
    category: "Web Application",
    tags: ["Vue.js", "Express", "WebSockets"],
    date: "1402/04/10",
    client: "شرکت کارما گرین",
  },
  {
    id: 4,
    title: "صرافی ارز دیجیتال X",
    image: "/images/portfolio/x-exchange.webp",
    description: "پلتفرم خرید و فروش ارزهای دیجیتال با رابط کاربری حرفه‌ای",
    highlights: ["معاملات آنی", "کیف پول امن", "نمودارهای پیشرفته", "احراز هویت دو مرحله‌ای"],
    fullViewUrl: "#",
    category: "Web Application",
    tags: ["React", "Redux", "Node.js", "MongoDB"],
    date: "1402/02/05",
    client: "صرافی ایکس",
  },
  {
    id: 5,
    title: "استارز هاب",
    image: "/images/portfolio/starshub.webp",
    description: "پلتفرم خرید و فروش ارز دیجیتال تلگرام با امکانات پیشرفته",
    highlights: ["پرداخت خودکار", "API اختصاصی", "پنل مدیریت", "پشتیبانی ۲۴/۷"],
    fullViewUrl: "https://t.me/Stars_Hub_Bot",
    category: "Web Application",
    tags: ["Telegram Bot API", "Node.js", "MongoDB"],
    date: "1401/11/15",
    client: "استارز هاب",
  },
  {
    id: 6,
    title: "توتال نیوز",
    image: "/images/portfolio/totalnews.webp",
    description: "پورتال خبری چندزبانه در حوزه حمل و نقل و لجستیک",
    highlights: ["پشتیبانی از ۴ زبان", "سیستم مدیریت محتوا", "خبرنامه هوشمند", "اپلیکیشن موبایل"],
    fullViewUrl: "https://totalnews.com.tr/",
    category: "Web Application",
    tags: ["WordPress", "PHP", "MySQL", "React Native"],
    date: "1401/09/20",
    client: "توتال نیوز",
  },
  {
    id: 7,
    title: "گرین سورا",
    image: "/images/portfolio/greensora.webp",
    description: "وبسایت شرکت تولیدکننده محصولات پاکسازی آلودگی‌های نفتی",
    highlights: ["طراحی مدرن", "بهینه‌سازی SEO", "رابط کاربری جذاب", "چندزبانه"],
    fullViewUrl: "https://greensora.com/",
    category: "Landing Page",
    tags: ["HTML", "CSS", "JavaScript", "WordPress"],
    date: "1401/07/10",
    client: "شرکت گرین سورا",
  },
  {
    id: 8,
    title: "تعمیرات سامسونگ کرج",
    image: "/images/portfolio/karajsamsung.webp",
    description: "وبسایت خدمات تعمیر لوازم خانگی سامسونگ در کرج",
    highlights: ["رزرو آنلاین", "پیگیری سفارش", "مشاوره آنلاین", "بهینه‌سازی برای موتورهای جستجو"],
    fullViewUrl: "https://karajsamsung.com/",
    category: "Landing Page",
    tags: ["WordPress", "Elementor", "PHP"],
    date: "1401/05/15",
    client: "مرکز خدمات سامسونگ کرج",
  },
  {
    id: 9,
    title: "جواهری گوهرآرا",
    image: "/images/portfolio/goharara.webp",
    description: "فروشگاه آنلاین جواهرات با طراحی لوکس و حرفه‌ای",
    highlights: ["گالری محصولات", "سبد خرید پیشرفته", "درگاه پرداخت امن", "مدیریت موجودی"],
    fullViewUrl: "https://gohararajewellery.com/",
    category: "E-commerce",
    tags: ["WooCommerce", "WordPress", "PHP", "MySQL"],
    date: "1401/03/20",
    client: "جواهری گوهرآرا",
  },
  {
    id: 10,
    title: "کیمیاکشت",
    image: "/images/portfolio/kimiakesht.webp",
    description: "فروشگاه آنلاین گیاهان و محصولات کشاورزی",
    highlights: ["مقالات آموزشی", "مشاوره تخصصی", "خرید آنلاین", "ارسال سریع"],
    fullViewUrl: "https://kimiakesht.com/",
    category: "E-commerce",
    tags: ["WooCommerce", "WordPress", "PHP"],
    date: "1401/01/10",
    client: "کیمیاکشت",
  },
  {
    id: 11,
    title: "منوی آنلاین کافه یاد",
    image: "/images/portfolio/yadcafe.webp",
    description: "طراحی و توسعه منوی دیجیتال برای کافه",
    highlights: ["سفارش آنلاین", "مدیریت منو", "رابط کاربری جذاب", "پرداخت درون برنامه‌ای"],
    fullViewUrl: "https://yad-cafe-menu-app.amirsalmani.com",
    category: "E-commerce",
    tags: ["React", "Firebase", "PWA"],
    date: "1400/11/15",
    client: "کافه یاد",
  },
  {
    id: 12,
    title: "صفحه فرود نوآور",
    image: "/images/portfolio/noavar.webp",
    description: "طراحی صفحه فرود با انیمیشن‌های جذاب",
    highlights: ["طراحی مدرن", "انیمیشن‌های روان", "بهینه‌سازی SEO", "سازگار با موبایل"],
    fullViewUrl: "https://noavar.amirsalmani.com",
    category: "UI/UX Design",
    tags: ["HTML", "CSS", "JavaScript", "GSAP"],
    date: "1400/09/20",
    client: "استارتاپ نوآور",
  },
  {
    id: 13,
    title: "بازی حافظه",
    image: "/images/portfolio/clever-monkey.webp",
    description: "بازی تقویت حافظه با رابط کاربری جذاب",
    highlights: ["گیم‌پلی روان", "امتیازبندی", "چندین مرحله", "ذخیره پیشرفت"],
    fullViewUrl: "https://clever-monkey.amirsalmani.com",
    category: "Web Application",
    tags: ["JavaScript", "HTML5 Canvas", "CSS3"],
    date: "1400/07/10",
    client: "پروژه شخصی",
  },
]

export default function Portfolio() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

  // Get unique categories
  const categories = Array.from(new Set(projects.map((project) => project.category)))

  // Filter projects based on search and category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !categoryFilter || project.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="relative min-h-screen">
      <MovingBackground />

      {/* Header with search and filters - Updated z-index */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-white/5 px-4 py-3">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-brand-primary">نمونه کارها</h1>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {/* Search input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="جستجو..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary text-white"
              />
            </div>

            {/* Category filters */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
              <button
                onClick={() => setCategoryFilter(null)}
                className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors ${
                  categoryFilter === null ? "bg-brand-primary text-black" : "bg-white/10 hover:bg-white/20"
                }`}
              >
                همه
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors ${
                    categoryFilter === category ? "bg-brand-primary text-black" : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid - Updated padding-top */}
      <div className="container mx-auto px-4 pt-[140px] sm:pt-[120px] pb-20">
        {" "}
        {/* Adjusted padding-top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative glass-effect rounded-xl overflow-hidden border border-white/10 hover:border-brand-primary/50 transition-all duration-300"
            >
              <div className="relative aspect-video">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-lg bg-brand-primary/20 text-brand-primary border border-brand-primary/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400">{project.date}</div>
                  <Link
                    href={project.fullViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-brand-primary hover:text-brand-primary/80 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    مشاهده
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

