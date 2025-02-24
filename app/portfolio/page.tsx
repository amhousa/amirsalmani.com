"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

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

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)

  const openModal = useCallback((project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
    document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
  }, [])

  const closeModal = useCallback(() => {
    setSelectedProject(null)
    setIsModalOpen(false)
    document.body.style.overflow = "auto" // Restore scrolling
  }, [])

  const nextProject = useCallback(() => {
    setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length)
    setSelectedProject(projects[currentProjectIndex])
  }, [currentProjectIndex, projects])

  const prevProject = useCallback(() => {
    setCurrentProjectIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
    setSelectedProject(projects[currentProjectIndex])
  }, [currentProjectIndex, projects])

  useEffect(() => {
    if (isModalOpen) {
      setSelectedProject(projects[currentProjectIndex])
    }
  }, [currentProjectIndex, isModalOpen, projects])

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const projectDetailsVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" },
  }

  const [isZoomed, setIsZoomed] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-8">پروژه‌های من</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-700">{project.description}</p>
              <button
                onClick={() => openModal(project)}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                مشاهده جزئیات
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-lg overflow-hidden max-w-4xl w-full m-4 relative"
              variants={projectDetailsVariants}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Image
                  ref={imageRef}
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  width={1200}
                  height={800}
                  className={`w-full h-auto object-cover cursor-pointer transition-transform duration-300 ${
                    isZoomed ? "scale-150 transform-origin-center" : ""
                  }`}
                  onClick={toggleZoom}
                />
                <div
                  className="absolute top-4 left-4 bg-white bg-opacity-75 rounded-full p-2 cursor-pointer"
                  onClick={closeModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="M6 6 18 18" />
                  </svg>
                </div>
                <div className="absolute top-4 right-4 bg-white bg-opacity-75 rounded-full p-2 cursor-pointer">
                  <Link href={selectedProject.fullViewUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink />
                  </Link>
                </div>
              </div>

              <div className="p-8">
                <h2 className="text-3xl font-semibold mb-4">{selectedProject.title}</h2>
                <p className="text-gray-700 mb-6">{selectedProject.description}</p>
                <h3 className="text-xl font-semibold mb-2">ویژگی‌ها</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {selectedProject.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
                <div className="flex justify-between mt-6">
                  <button
                    onClick={prevProject}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                  >
                    <ChevronRight />
                    قبلی
                  </button>
                  <button
                    onClick={nextProject}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                  >
                    بعدی
                    <ChevronLeft />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

