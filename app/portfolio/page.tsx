"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { useSwipeable } from "react-swipeable"

interface Project {
  id: number
  title: string
  image: string
  description: string
  highlights: string[]
  fullViewUrl: string
  category: string
}

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
},
]

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoSkipping, setIsAutoSkipping] = useState(true)

  const nextProject = useCallback(() => {
    if (activeProject < projects.length - 1) {
      setDirection(1)
      setActiveProject((prev) => prev + 1)
    } else {
      // Restart from the beginning
      setDirection(-1)
      setActiveProject(0)
    }
    setIsAutoSkipping(false)
  }, [activeProject])

  const prevProject = useCallback(() => {
    if (activeProject > 0) {
      setDirection(-1)
      setActiveProject((prev) => prev - 1)
    } else {
      // Wrap to the end
      setDirection(1)
      setActiveProject(projects.length - 1)
    }
    setIsAutoSkipping(false)
  }, [activeProject])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isAutoSkipping) {
      timer = setTimeout(() => {
        nextProject()
      }, 5000)
    }

    return () => clearTimeout(timer)
  }, [nextProject, isAutoSkipping])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") prevProject()
      if (event.key === "ArrowLeft") nextProject()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [prevProject, nextProject])

  const handlers = useSwipeable({
    onSwipedLeft: nextProject,
    onSwipedRight: prevProject,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  if (!projects || projects.length === 0) {
    return (
      <div className="fixed inset-0 bg-black text-white flex items-center justify-center">
        <p>No projects available.</p>
      </div>
    )
  }

  return (
    <div {...handlers} className="fixed inset-0 bg-black text-white overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <ProjectSection key={activeProject} project={projects[activeProject]} direction={direction} />
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="fixed inset-y-0 left-0 right-0 flex justify-between items-center pointer-events-none">
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

      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {projects.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === activeProject ? "bg-brand-purple" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

interface ProjectSectionProps {
  project: Project
  direction: number
}

function ProjectSection({ project, direction }: ProjectSectionProps) {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  if (!project) return null

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, x: 300 * direction }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 * direction }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      <div className="relative z-10 max-w-4xl mx-auto p-4 md:p-8 text-center">
        <motion.h2
          className="text-2xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4 text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ delay: 0.2 }}
        >
          {project.title}
        </motion.h2>
        <motion.p
          className="text-sm md:text-xl mb-4 md:mb-8 text-white/90"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ delay: 0.4 }}
        >
          {project.description}
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4 md:mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ delay: 0.6 }}
        >
          {project.highlights.map((highlight, index) => (
            <span
              key={index}
              className="bg-brand-purple text-white px-2 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm"
            >
              {highlight}
            </span>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href={project.fullViewUrl}
            className="inline-flex items-center bg-brand-purple text-white px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-opacity-90 transition-colors text-sm md:text-base"
          >
            مشاهده کامل <ExternalLink className="mr-2 h-3 w-3 md:h-4 md:w-4" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
