import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import Image from "next/image"
import { Clock, Calendar, Tag } from "lucide-react"
import { cn } from "@/lib/utils"

interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  image: string
}

export default async function Blog({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1
  const postsDirectory = path.join(process.cwd(), "posts")
  const fileNames = fs.readdirSync(postsDirectory)

  const posts: BlogPost[] = fileNames
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data } = matter(fileContents)
      return {
        slug: fileName.replace(/\.md$/, ""),
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        tags: data.tags,
        image: data.image,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const POSTS_PER_PAGE = 6
  const totalPosts = posts.length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const currentPosts = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-brand-primary">وبلاگ</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <article key={post.slug} className="blog-card group frosted-glass rounded-xl overflow-hidden">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative h-48 card-image">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent" />
              </div>
              <div className="p-6 card-content">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <span className="flex items-center gap-1 glass-button px-2 py-1 rounded-full">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1 glass-button px-2 py-1 rounded-full">
                    <Clock className="w-4 h-4" />
                    {Math.ceil(post.excerpt.length / 200)} دقیقه
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-2 text-brand-primary group-hover:text-brand-primary/80 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="glass-button inline-flex items-center text-xs px-3 py-1 rounded-full text-white/80"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Link
              key={pageNum}
              href={`/blog?page=${pageNum}`}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 glass-button",
                pageNum === page ? "bg-brand-primary text-dark-bg font-semibold" : "hover:bg-white/10",
              )}
            >
              {pageNum}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

