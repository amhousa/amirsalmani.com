"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { HandIcon as Gesture, Info, ExternalLink } from "lucide-react"
import { isMobile } from "react-device-detect"
import { motion, AnimatePresence } from "framer-motion"
import { useSwipeable } from "react-swipeable"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
  }, [projects])

  const prevProject = useCallback(() => {
    setDirection(-1)
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)
  }, [projects])

  const handlers = useSwipeable({
    onSwipedLeft: nextProject,
    onSwipedRight: prevProject,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  const ProjectSection = ({ project, direction }: { project: Project; direction: number }) => {
    const [isHovered, setIsHovered] = useState(false)

    const variants = {
      initial: {
        x: direction > 0 ? 500 : -500,
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
        x: direction > 0 ? -500 : 500,
        opacity: 0,
        transition: {
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        },
      },
    }

    return (
      <motion.section
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={direction}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="container mx-auto px-4 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => isMobile && setIsHovered(!isHovered)}
        >
          <div className="relative max-w-4xl mx-auto">
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full rounded-2xl shadow-2xl"
            />

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent" />

                  <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                    <h2 className="text-2xl md:text-4xl font-bold mb-3 text-white">{project.title}</h2>

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

                    <Link
                      href={project.fullViewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-black/60 hover:bg-black/80 text-brand-primary px-6 py-3 rounded-xl transition-all duration-300 group w-fit"
                    >
                      <Info className="w-5 h-5" />
                      <span>مشاهده اطلاعات</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>
    )
  }

  return (
    <div
      {...handlers}
      className="fixed inset-0 bg-black text-white overflow-hidden"
      onTouchStart={handleTouchStart}
      onClick={handleTouchStart}
    >
      <AnimatePresence initial={false} custom={direction}>
        <ProjectSection key={activeProject} project={projects[activeProject]} direction={direction} />
      </AnimatePresence>

      <div className="fixed inset-y-0 left-0 right-0 hidden md:flex justify-between items-center pointer-events-none">
        <button
          onClick={prevProject}
          className="pointer-events-auto bg-white/10 hover:bg-white/20 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-r-full transition-colors"
          aria-label="Previous project"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button
          onClick={nextProject}
          className="pointer-events-auto bg-white/10 hover:bg-white/20 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-l-full transition-colors"
          aria-label="Next project"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {projects.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === activeProject ? "bg-brand-primary" : "bg-white/30"
            }`}
          />
        ))}
      </div>

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

