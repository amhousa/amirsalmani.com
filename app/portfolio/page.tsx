"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { Info, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
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
}

export default function Portfolio() {
  const projects: Project[] = [
    {
      id: 1,
      title: "برنامه ساز GymHub",
      image: "/images/portfolio/gymhub.webp",
      description: "اپلیکیشن برنامه‌ریزی تمرینات بدنسازی با قابلیت چاپ برنامه هفتگی",
      highlights: ["برنامه‌ریزی هفتگی", "جستجوی تمرین", "قابلیت چاپ برنامه"],
      fullViewUrl: "https://gymhub.amirsalmani.com",
      category: "Web Application",
    },
    {
      id: 2,
      title: "نیلرام - قاب‌های موسیقی",
      image: "/images/portfolio/nilram.webp",
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
      image: "/images/portfolio/x-exchange.webp",
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
      image: "/images/portfolio/yadcafe.webp",
      description: "طراحی و توسعه منوی دیجیتال برای کافه",
      highlights: ["سفارش آنلاین", "مدیریت منو", "رابط کاربری جذاب"],
      fullViewUrl: "https://yad-cafe-menu-app.amirsalmani.com",
      category: "E-commerce",
    },
    {
      id: 12,
      title: "صفحه فرود نوآور",
      image: "/images/portfolio/noavar.webp",
      description: "طراحی صفحه فرود با انیمیشن‌های جذاب",
      highlights: ["طراحی مدرن", "انیمیشن‌های روان", "بهینه‌سازی SEO"],
      fullViewUrl: "https://noavar.amirsalmani.com",
      category: "UI/UX Design",
    },
    {
      id: 13,
      title: "بازی حافظه",
      image: "/images/portfolio/clever-monkey.webp",
      description: "بازی تقویت حافظه با رابط کاربری جذاب",
      highlights: ["گیم‌پلی روان", "امتیازبندی", "چندین مرحله"],
      fullViewUrl: "https://clever-monkey.amirsalmani.com",
      category: "Web Application",
    },
    // Add other projects here
  ]

  const [activeProject, setActiveProject] = useState(0)
  const [showInfo, setShowInfo] = useState(false)
  const infoBoxRef = useRef<HTMLDivElement>(null)

  const nextProject = useCallback(() => {
    setActiveProject((prev) => (prev + 1) % projects.length)
    setShowInfo(false)
  }, [projects.length])

  const prevProject = useCallback(() => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)
    setShowInfo(false)
  }, [projects.length])

  const toggleInfo = () => {
    setShowInfo((prev) => !prev)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") prevProject()
      if (event.key === "ArrowLeft") nextProject()
      if (event.key === "Escape" && showInfo) setShowInfo(false)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [nextProject, prevProject, showInfo])

  // Handle clicks outside the info panel to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (infoBoxRef.current && !infoBoxRef.current.contains(event.target as Node)) {
        // Check if the click was on the info button
        const infoButton = document.getElementById("info-button")
        if (!infoButton?.contains(event.target as Node)) {
          setShowInfo(false)
        }
      }
    }

    if (showInfo) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showInfo])

  const ProjectSection = ({ project }: { project: Project }) => {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center">
        {/* Info button */}
        <button
          id="info-button"
          className={`absolute top-4 md:top-8 left-4 md:left-8 z-20 group flex items-center gap-2 
                    backdrop-blur-sm border border-white/10 px-4 py-2 rounded-xl transition-all duration-300
                    ${showInfo ? "bg-brand-primary/20 border-brand-primary/50" : "bg-black/60 hover:bg-brand-primary/20 hover:border-brand-primary/50"}`}
          onClick={toggleInfo}
        >
          <Info
            className={`w-5 h-5 transition-colors ${showInfo ? "text-brand-primary" : "text-white group-hover:text-brand-primary"}`}
          />
          <span
            className={`transition-colors ${showInfo ? "text-brand-primary" : "text-white group-hover:text-brand-primary"}`}
          >
            مشاهده اطلاعات پروژه
          </span>
        </button>

        {/* Project image container */}
        <div className="relative w-full h-full max-h-[calc(100vh-10rem)] md:max-h-[calc(100vh-8rem)] flex items-center justify-center px-4 md:px-16">
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10">
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-contain"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        </div>

        {/* Mobile Navigation and Counter */}
        <div className="md:hidden fixed bottom-20 left-0 right-0 flex flex-col items-center gap-4 pb-4">
          <div className="flex justify-between w-full px-4">
            <motion.button
              onClick={prevProject}
              className="flex items-center gap-2 bg-black/60 backdrop-blur-sm hover:bg-brand-primary/20 
                       border border-white/10 hover:border-brand-primary/50 px-4 py-2 rounded-xl transition-all duration-300"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5 text-white" />
              <span className="text-white">پروژه قبلی</span>
            </motion.button>

            <motion.button
              onClick={nextProject}
              className="flex items-center gap-2 bg-black/60 backdrop-blur-sm hover:bg-brand-primary/20 
                       border border-white/10 hover:border-brand-primary/50 px-4 py-2 rounded-xl transition-all duration-300"
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white">پروژه بعدی</span>
              <ChevronLeft className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          <div className="bg-black/60 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-xl text-white text-sm">
            {activeProject + 1} / {projects.length}
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex absolute inset-y-0 left-8 right-8 items-center justify-between pointer-events-none">
          <motion.button
            onClick={prevProject}
            className="pointer-events-auto group relative flex items-center gap-2 bg-black/60 backdrop-blur-sm hover:bg-brand-primary/20 
                     border border-white/10 hover:border-brand-primary/50 px-6 py-3 rounded-2xl transition-all duration-300"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:text-brand-primary transition-colors" />
            <span className="text-white group-hover:text-brand-primary transition-colors">پروژه قبلی</span>
          </motion.button>

          <motion.button
            onClick={nextProject}
            className="pointer-events-auto group relative flex items-center gap-2 bg-black/60 backdrop-blur-sm hover:bg-brand-primary/20 
                     border border-white/10 hover:border-brand-primary/50 px-6 py-3 rounded-2xl transition-all duration-300"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white group-hover:text-brand-primary transition-colors">پروژه بعدی</span>
            <ChevronLeft className="w-6 h-6 text-white group-hover:text-brand-primary transition-colors" />
          </motion.button>
        </div>

        {/* Desktop Project Counter */}
        <div
          className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm 
                     border border-white/10 px-4 py-2 rounded-xl text-white text-sm"
        >
          {activeProject + 1} / {projects.length}
        </div>

        {/* Info panel */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              ref={infoBoxRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-16 md:top-24 left-4 right-4 md:left-8 md:right-auto w-auto md:w-full max-w-md z-10"
            >
              <div className="bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <div className="relative">
                  <h2 className="text-2xl font-bold mb-4 text-white">{project.title}</h2>
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
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="space-y-2 mb-6">
                    {project.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                        {highlight}
                      </div>
                    ))}
                  </div>
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
      </div>
    )
  }

  return (
    <>
      <MovingBackground />
      <div className="fixed inset-0 overflow-hidden z-0">
        <ProjectSection project={projects[activeProject]} />
      </div>
    </>
  )
}

