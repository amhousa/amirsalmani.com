"use client"

import { useState, useCallback, useEffect } from "react"
import { Info, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { isMobile, isTablet } from "react-device-detect"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

interface Project {
  id: number
  title: string
  image: string
  description: string
  highlights: string[]
  fullViewUrl: string
  category: string
  tags?: string[]
}

export default function Portfolio() {
  const projects: Project[] = [
  {
    id: 1,
    title: "برنامه ساز GymHub",
    image:
      "/images/portfolio/gymhub.webp",
    description: "اپلیکیشن برنامه‌ریزی تمرینات بدنسازی با قابلیت چاپ برنامه هفتگی",
    highlights: ["برنامه‌ریزی هفتگی", "جستجوی تمرین", "قابلیت چاپ برنامه"],
    fullViewUrl: "https://gymhub.amirsalmani.com",
    category: "Web Application",
  },
  {
    id: 2,
    title: "نیلرام - قاب‌های موسیقی",
    image:
      "/images/portfolio/nilram.webp",
    description: "پلتفرم سفارش قاب‌های موسیقی با امکان شخصی‌سازی پیام‌های صوتی",
    highlights: ["طراحی سه‌بعدی", "رابط کاربری لوکس", "سیستم سفارش آنلاین"],
    fullViewUrl: "https://nilramgallery.ir",
    category: "E-commerce",
  },
  {
    id: 3,
    title: "کنترل پنل صنعتی کارما",
    image: "/images/portfolio/karma.webp",
    description: "سیستم مدیریت و کنترل تجهیزات صنعتی با رابط کاربری پیشرفته",
    highlights: ["اتوماسیون صنعتی", "مانیتورینگ آنلاین", "کنترل هوشمند"],
    fullViewUrl: "https://karmagreenco.com/",
    category: "Web Application",
  },
  {
    id: 4,
    title: "صرافی ارز دیجیتال X",
    image:
      "/images/portfolio/x-exchange.webp",
    description: "پلتفرم خرید و فروش ارزهای دیجیتال با رابط کاربری حرفه‌ای",
    highlights: ["معاملات آنی", "کیف پول امن", "نمودارهای پیشرفته"],
    fullViewUrl: "#",
    category: "Web Application",
  },
  {
    id: 5,
    title: "استارز هاب",
    image: "/images/portfolio/starshub.webp",
    description: "پلتفرم خرید و فروش ارز دیجیتال تلگرام با امکانات پیشرفته",
    highlights: ["پرداخت خودکار", "API اختصاصی", "پنل مدیریت"],
    fullViewUrl: "https://t.me/Stars_Hub_Bot",
    category: "Web Application",
  },
  {
    id: 6,
    title: "توتال نیوز",
    image: "/images/portfolio/totalnews.webp",
    description: "پورتال خبری چندزبانه در حوزه حمل و نقل و لجستیک",
    highlights: ["پشتیبانی از ۴ زبان", "سیستم مدیریت محتوا", "خبرنامه هوشمند"],
    fullViewUrl: "https://totalnews.com.tr/",
    category: "Web Application",
  },
  {
    id: 7,
    title: "گرین سورا",
    image: "/images/portfolio/greensora.webp",
    description: "وبسایت شرکت تولیدکننده محصولات پاکسازی آلودگی‌های نفتی",
    highlights: ["طراحی مدرن", "بهینه‌سازی SEO", "رابط کاربری جذاب"],
    fullViewUrl: "https://greensora.com/",
    category: "Landing Page",
  },
  {
    id: 8,
    title: "تعمیرات سامسونگ کرج",
    image: "/images/portfolio/karajsamsung.webp",
    description: "وبسایت خدمات تعمیر لوازم خانگی سامسونگ در کرج",
    highlights: ["رزرو آنلاین", "پیگیری سفارش", "مشاوره آنلاین"],
    fullViewUrl: "https://karajsamsung.com/",
    category: "Landing Page",
  },
  {
    id: 9,
    title: "جواهری گوهرآرا",
    image: "/images/portfolio/goharara.webp",
    description: "فروشگاه آنلاین جواهرات با طراحی لوکس و حرفه‌ای",
    highlights: ["گالری محصولات", "سبد خرید پیشرفته", "درگاه پرداخت امن"],
    fullViewUrl: "https://gohararajewellery.com/",
    category: "E-commerce",
  },
  {
    id: 10,
    title: "کیمیاکشت",
    image: "/images/portfolio/kimiakesht.webp",
    description: "فروشگاه آنلاین گیاهان و محصولات کشاورزی",
    highlights: ["مقالات آموزشی", "مشاوره تخصصی", "خرید آنلاین"],
    fullViewUrl: "https://kimiakesht.com/",
    category: "E-commerce",
  },
  {
    id: 11,
    title: "منوی آنلاین کافه یاد",
    image:
      "/images/portfolio/yadcafe.webp",
    description: "طراحی و توسعه منوی دیجیتال برای کافه",
    highlights: ["سفارش آنلاین", "مدیریت منو", "رابط کاربری جذاب"],
    fullViewUrl: "https://yad-cafe-menu-app.amirsalmani.com",
    category: "E-commerce",
  },
  {
    id: 12,
    title: "صفحه فرود نوآور",
    image:
      "/images/portfolio/noavar.webp",
    description: "طراحی صفحه فرود با انیمیشن‌های جذاب",
    highlights: ["طراحی مدرن", "انیمیشن‌های روان", "بهینه‌سازی SEO"],
    fullViewUrl: "https://noavar.amirsalmani.com",
    category: "UI/UX Design",
  },
  {
    id: 13,
    title: "بازی حافظه",
    image:
      "/images/portfolio/clever-monkey.webp",
    description: "بازی تقویت حافظه با رابط کاربری جذاب",
    highlights: ["گیم‌پلی روان", "امتیازبندی", "چندین مرحله"],
    fullViewUrl: "https://clever-monkey.amirsalmani.com",
    category: "Web Application",
  },
    // Add other projects here
  ]

  const [activeProject, setActiveProject] = useState(0)
  const [showInfo, setShowInfo] = useState(false)
  const isTouchDevice = isMobile || isTablet

  const nextProject = useCallback(() => {
    setActiveProject((prev) => (prev + 1) % projects.length)
    setShowInfo(false)
  }, [projects.length])

  const prevProject = useCallback(() => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)
    setShowInfo(false)
  }, [projects.length])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") prevProject()
      if (event.key === "ArrowLeft") nextProject()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextProject, prevProject])

  const ProjectSection = ({ project }: { project: Project }) => {
    return (
      <div className="relative w-full h-screen">
        {/* Full-screen image */}
        <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />

        {/* Info button */}
        <button
          className="absolute top-6 left-6 z-20 group flex items-center gap-2 bg-black/60 backdrop-blur-sm 
                    hover:bg-brand-primary/20 hover:border-brand-primary/50 border border-white/10 
                    px-4 py-2 rounded-xl transition-all duration-300"
          onClick={() => isTouchDevice && setShowInfo(!showInfo)}
          onMouseEnter={() => !isTouchDevice && setShowInfo(true)}
          onMouseLeave={() => !isTouchDevice && setShowInfo(false)}
        >
          <Info className="w-5 h-5 text-white group-hover:text-brand-primary transition-colors" />
          <span className="text-white group-hover:text-brand-primary transition-colors">مشاهده اطلاعات پروژه</span>
        </button>

        {/* Navigation buttons */}
        <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-6">
          {/* Previous button */}
          <motion.button
            onClick={prevProject}
            className="group relative flex items-center gap-2 bg-black/60 backdrop-blur-sm hover:bg-brand-primary/20 
                     border border-white/10 hover:border-brand-primary/50 px-6 py-3 rounded-2xl transition-all duration-300"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:text-brand-primary transition-colors" />
            <span className="hidden md:block text-white group-hover:text-brand-primary transition-colors">
              پروژه قبلی
            </span>
          </motion.button>

          {/* Next button */}
          <motion.button
            onClick={nextProject}
            className="group relative flex items-center gap-2 bg-black/60 backdrop-blur-sm hover:bg-brand-primary/20 
                     border border-white/10 hover:border-brand-primary/50 px-6 py-3 rounded-2xl transition-all duration-300"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="hidden md:block text-white group-hover:text-brand-primary transition-colors">
              پروژه بعدی
            </span>
            <ChevronLeft className="w-6 h-6 text-white group-hover:text-brand-primary transition-colors" />
          </motion.button>
        </div>

        {/* Info panel */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-20 left-6 w-full max-w-md z-10"
            >
              <div className="bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <div className="relative">
                  {/* Project title */}
                  <h2 className="text-2xl font-bold mb-4 text-white">{project.title}</h2>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs bg-brand-primary/20 text-brand-primary border border-brand-primary/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-4">{project.description}</p>

                  {/* Highlights */}
                  <div className="space-y-2 mb-6">
                    {project.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                        {highlight}
                      </div>
                    ))}
                  </div>

                  {/* View site button */}
                  <Link
                    href={project.fullViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-black font-medium 
                             px-6 py-3 rounded-xl transition-all duration-300 group w-full justify-center"
                  >
                    مشاهده وب‌سایت
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dark overlay when info is shown */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => isTouchDevice && setShowInfo(false)}
            />
          )}
        </AnimatePresence>

        {/* Project counter */}
        <div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm 
                       border border-white/10 px-4 py-2 rounded-xl text-white text-sm"
        >
          {activeProject + 1} / {projects.length}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      <ProjectSection project={projects[activeProject]} />
    </div>
  )
}

