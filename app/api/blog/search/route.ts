import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { redis } from "@/lib/redis"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.toLowerCase() || ""
  const category = searchParams.get("category")

  try {
    // Check if posts exist in Redis cache
    const cachedPosts = await redis.get("blog:posts")

    let posts

    if (cachedPosts) {
      // Use cached posts if available
      posts = JSON.parse(cachedPosts as string)
    } else {
      // If not cached, read from filesystem
      const postsDirectory = path.join(process.cwd(), "posts")
      const fileNames = fs.readdirSync(postsDirectory)

      posts = fileNames.map((fileName) => {
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        return {
          slug: fileName.replace(/\.md$/, ""),
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          tags: data.tags,
          image: data.image,
          category: data.category || "General", // Default category if none specified
          content: content.slice(0, 200) + "...", // First 200 characters for search
        }
      })

      // Store in cache for future requests
      await redis.set("blog:posts", JSON.stringify(posts), { ex: 86400 }) // 24 hours
    }

    // Filter posts based on search query and category
    const filteredPosts = posts.filter((post) => {
      const matchesQuery = query
        ? post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
        : true

      const matchesCategory = category ? post.tags.includes(category) : true

      return matchesQuery && matchesCategory
    })

    // Sort posts by date (newest first)
    const sortedPosts = filteredPosts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    return NextResponse.json(sortedPosts)
  } catch (error) {
    console.error("Error in blog search:", error)
    return NextResponse.json({ error: "Failed to search posts" }, { status: 500 })
  }
}

