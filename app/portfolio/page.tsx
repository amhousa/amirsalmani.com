"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { HandIcon as Gesture, Info, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { isMobile } from "react-device-detect"
import { motion, AnimatePresence } from "framer-motion"
import { useSwipeable } from "react-swipeable"
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
  const [direction, setDirection] = useState(0)
  const [showSwipeGuide, setShowSwipeGuide] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const touchStartRef = useRef(false)

  useEffect(() => {
    if (isMobile && !touchStartRef.current) {
      setShowSwipeGuide(true)
      const timer = setTimeout(() => {
        setShowSwipeGuide(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleTouchStart = useCallback(() => {
    touchStartRef.current = true
    setShowSwipeGuide(false)
  }, [])

  const nextProject = useCallback(() => {
    setDirection(1)
    setActiveProject((prev) => (prev + 1) % projects.length)
    setShowInfo(false)
  }, [projects])

  const prevProject = useCallback(() => {
    setDirection(-1)
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)
    setShowInfo(false)
  }, [projects])

  const handlers = useSwipeable({
    onSwipedLeft: nextProject,
    onSwipedRight: prevProject,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  const ProjectSection = ({ project, direction }: { project: Project; direction: number }) => {
    const variants = {
      initial: {
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
      },
      animate: {
        x: 0,
        opacity: 1,
        transition: {
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        },
      },
      exit: {
        x: direction > 0 ? "-100%" : "100%",
        opacity: 0,
        transition: {
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        },
      },
    }

    return (
      <motion.div variants={variants} initial="initial" animate="animate" exit="exit" className="absolute inset-0">
        <div className="relative w-full h-full">
          {/* Full-screen image */}
          <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />

          {/* Info button */}
          <motion.button
            className="absolute top-6 right-6 z-20 group"
            onClick={() => setShowInfo(!showInfo)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="relative w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center
                          hover:bg-brand-primary/20 hover:border-brand-primary/50 border border-white/10 transition-all duration-300"
            >
              <Info className="w-6 h-6 text-white group-hover:text-brand-primary transition-colors" />
            </div>
          </motion.button>

          {/* Info panel */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute top-20 right-6 w-full max-w-md z-10"
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
                onClick={() => setShowInfo(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    )
  }

  return (
    <div {...handlers} className="fixed inset-0 bg-black text-white overflow-hidden" onTouchStart={handleTouchStart}>
      <AnimatePresence initial={false} custom={direction}>
        <ProjectSection key={activeProject} project={projects[activeProject]} direction={direction} />
      </AnimatePresence>

      {/* Navigation arrows */}
      <div className="fixed inset-y-0 left-0 right-0 flex justify-between items-center pointer-events-none px-4">
        <button
          onClick={prevProject}
          className="pointer-events-auto bg-black/60 hover:bg-brand-primary/20 border border-white/10 hover:border-brand-primary/50
                    w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous project"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextProject}
          className="pointer-events-auto bg-black/60 hover:bg-brand-primary/20 border border-white/10 hover:border-brand-primary/50
                    w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label="Next project"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Progress indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {projects.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === activeProject ? "bg-brand-primary" : "bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Swipe guide for mobile */}
      <AnimatePresence>
        {showSwipeGuide && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-x-4 bottom-24 md:hidden"
          >
            <div className="glass-effect rounded-2xl p-6 flex items-center justify-center relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{
                  x: ["0%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />

              <div className="flex items-center gap-4 relative z-10">
                <motion.div
                  animate={{
                    x: [0, 20, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Gesture className="w-8 h-8 text-white" />
                </motion.div>
                <p className="text-white text-sm">برای مشاهده نمونه کارهای بیشتر به چپ و راست بکشید</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

