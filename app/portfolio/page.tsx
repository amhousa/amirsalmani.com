"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Info, ExternalLink, ChevronLeft, ChevronRight, X, Tag, Calendar, Clock } from "lucide-react"
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

export default function Portfolio() {
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

  const [activeProject, setActiveProject] = useState(0)
  const [showInfo, setShowInfo] = useState(false)
  const [viewMode, setViewMode] = useState<"fullscreen" | "grid">("fullscreen")
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const infoBoxRef = useRef<HTMLDivElement>(null)
  const projectsContainerRef = useRef<HTMLDivElement>(null)

  const filteredProjects = filterCategory ? projects.filter((project) => project.category === filterCategory) : projects

  const nextProject = useCallback(() => {
    setActiveProject((prev) => (prev + 1) % filteredProjects.length)
    setShowInfo(false)
  }, [filteredProjects.length])

  const prevProject = useCallback(() => {
    setActiveProject((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)
    setShowInfo(false)
  }, [filteredProjects.length])

  const toggleInfo = () => {
    setShowInfo((prev) => !prev)
  }

  const handleCategoryFilter = (category: string | null) => {
    setFilterCategory(category)
    setActiveProject(0)
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

  const categories = Array.from(new Set(projects.map((project) => project.category)))

  return (
    <div className="relative min-h-screen">
      <MovingBackground />

      {/* Header with view toggle and filters */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-dark-bg/80 backdrop-blur-md border-b border-white/5 px-4 py-3">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-brand-primary">نمونه کارها</h1>

          <div className="flex items-center gap-4">
            {/* Category filters */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
              <button
                onClick={() => handleCategoryFilter(null)}
                className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors ${
                  filterCategory === null ? "bg-brand-primary text-black" : "bg-white/10 hover:bg-white/20"
                }`}
              >
                همه
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors ${
                    filterCategory === category ? "bg-brand-primary text-black" : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View mode toggle */}
            <div className="flex items-center gap-2 border border-white/10 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("fullscreen")}
                className={`px-3 py-1.5 text-sm transition-colors ${
                  viewMode === "fullscreen" ? "bg-brand-primary text-black" : "hover:bg-white/10"
                }`}
              >
                تمام صفحه
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 text-sm transition-colors ${
                  viewMode === "grid" ? "bg-brand-primary text-black" : "hover:bg-white/10"
                }`}
              >
                گرید
              </button>
            </div>
          </div>
        </div>
      </div>

      {viewMode === "fullscreen" ? (
        <div className="fixed inset-0 pt-16 pb-16 overflow-hidden z-0">
          <div className="relative w-full h-full">
            {/* Project image container */}
            <div className="relative w-full h-full flex items-center justify-center px-4 md:px-16">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={filteredProjects[activeProject].image || "/placeholder.svg"}
                  alt={filteredProjects[activeProject].title}
                  fill
                  className="object-contain"
                  priority
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Project title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{filteredProjects[activeProject].title}</h2>
                  <p className="text-gray-300 mt-2 max-w-2xl">{filteredProjects[activeProject].description}</p>
                </div>
              </div>
            </div>

            {/* Info button */}
            <button
              id="info-button"
              className={`absolute top-20 md:top-24 left-4 md:left-8 z-20 group flex items-center gap-2 
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

            {/* Navigation buttons */}
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
                {activeProject + 1} / {filteredProjects.length}
              </div>
            </div>

            {/* Desktop Project Counter */}
            <div
              className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm 
                       border border-white/10 px-4 py-2 rounded-xl text-white text-sm"
            >
              {activeProject + 1} / {filteredProjects.length}
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
                  className="absolute top-32 md:top-36 left-4 right-4 md:left-8 md:right-auto w-auto md:w-full max-w-md z-10"
                >
                  <div className="glass-effect rounded-2xl p-6 border border-white/10">
                    <div className="relative">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-white">{filteredProjects[activeProject].title}</h2>
                        <button
                          onClick={() => setShowInfo(false)}
                          className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          <X className="w-5 h-5 text-gray-300" />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {filteredProjects[activeProject].tags?.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-xs bg-brand-primary/20 text-brand-primary border border-brand-primary/30 flex items-center gap-1"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-300">
                        {filteredProjects[activeProject].date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-brand-primary" />
                            <span>{filteredProjects[activeProject].date}</span>
                          </div>
                        )}
                        {filteredProjects[activeProject].client && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-brand-primary" />
                            <span>کارفرما: {filteredProjects[activeProject].client}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-gray-300 mb-4">{filteredProjects[activeProject].description}</p>

                      <div className="space-y-2 mb-6">
                        <h3 className="text-lg font-semibold text-white mb-2">ویژگی‌های کلیدی:</h3>
                        {filteredProjects[activeProject].highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                            {highlight}
                          </div>
                        ))}
                      </div>

                      <Link
                        href={filteredProjects[activeProject].fullViewUrl}
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
        </div>
      ) : (
        // Grid view
        <div className="container mx-auto pt-24 pb-20 px-4" ref={projectsContainerRef}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group relative glass-effect rounded-xl overflow-hidden border border-white/10 hover:border-brand-primary/50 transition-all duration-300"
              >
                <div className="relative aspect-video">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full text-xs bg-brand-primary/80 text-black font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => {
                        setActiveProject(filteredProjects.findIndex((p) => p.id === project.id))
                        setViewMode("fullscreen")
                        setShowInfo(true)
                      }}
                      className="flex items-center gap-1 text-sm text-brand-primary hover:text-brand-primary/80 transition-colors"
                    >
                      <Info className="w-4 h-4" />
                      مشاهده جزئیات
                    </button>

                    <Link
                      href={project.fullViewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-white hover:text-brand-primary transition-colors"
                      onClick={(e) => e.stopPropagation()}
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
      )}
    </div>
  )
}

