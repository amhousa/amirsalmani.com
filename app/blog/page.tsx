"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Tag, Calendar, Clock, Filter, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import debounce from "lodash/debounce"
import MovingBackground from "@/components/MovingBackground"

interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  image: string
  category?: string
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string, category: string | null) => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (query) params.append("q", query)
        if (category) params.append("category", category)

        const response = await fetch(`/api/blog/search?${params.toString()}`)
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }, 300),
    [],
  )

  // Initial load and category extraction
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/blog/search")
        const data = await response.json()
        setPosts(data)

        // Extract unique categories from posts
        const allCategories = Array.from(new Set(data.flatMap((post: BlogPost) => post.tags)))
        setCategories(allCategories)
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Search effect
  useEffect(() => {
    debouncedSearch(searchQuery, selectedCategory)
    return () => {
      debouncedSearch.cancel()
    }
  }, [searchQuery, selectedCategory, debouncedSearch])

  return (
    <div className="relative min-h-screen">
      <MovingBackground />

      {/* Header with search and filters */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-dark-bg/80 backdrop-blur-md border-b border-white/5 px-4 py-3">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-brand-primary">وبلاگ</h1>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {/* Search input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="جستجو..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary text-white"
              />
            </div>

            {/* Category filters */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === null ? "bg-brand-primary text-black" : "bg-white/10 hover:bg-white/20"
                }`}
              >
                همه
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === category ? "bg-brand-primary text-black" : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog posts grid */}
      <div className="container mx-auto pt-28 pb-20 px-4">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-12"
            >
              <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
            </motion.div>
          ) : posts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {posts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative glass-effect rounded-xl overflow-hidden border border-white/10 hover:border-brand-primary/50 transition-all duration-300"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative aspect-video">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                    </div>

                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary border border-brand-primary/30"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h2 className="text-xl font-bold mb-2 text-white group-hover:text-brand-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {Math.ceil(post.excerpt.length / 200)} دقیقه
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <Filter className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">نتیجه‌ای یافت نشد</h3>
              <p className="text-gray-400">متأسفانه هیچ مطلبی با معیارهای جستجوی شما پیدا نشد.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

