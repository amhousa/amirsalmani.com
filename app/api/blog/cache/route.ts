import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { redis } from "@/lib/redis"

// Function to build and cache blog posts
async function buildAndCachePostsData() {
  try {
    const postsDirectory = path.join(process.cwd(), "posts")

    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      return { error: "Posts directory not found" }
    }

    const fileNames = fs.readdirSync(postsDirectory)

    const posts = fileNames.map((fileName) => {
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
        category: data.category || "General",
        content: content.slice(0, 200) + "...", // First 200 characters for search
      }
    })

    // Sort posts by date
    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    // Store posts in Redis with one day expiration
    await redis.set("blog:posts", JSON.stringify(sortedPosts), { ex: 86400 }) // 24 hours

    // Create tag index for quick filtering
    const tagIndex: Record<string, string[]> = {}

    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        if (!tagIndex[tag]) {
          tagIndex[tag] = []
        }
        tagIndex[tag].push(post.slug)
      })
    })

    await redis.set("blog:tagIndex", JSON.stringify(tagIndex), { ex: 86400 })

    return { success: true, postsCount: posts.length }
  } catch (error) {
    console.error("Error building blog cache:", error)
    return { error: "Failed to build blog cache" }
  }
}

export async function GET() {
  const result = await buildAndCachePostsData()
  return NextResponse.json(result)
}

