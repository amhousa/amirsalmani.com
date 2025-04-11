import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

// Function to build blog posts data without caching
async function buildPostsData() {
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

    return { success: true, posts: sortedPosts, tagIndex, postsCount: posts.length }
  } catch (error) {
    console.error("Error building blog data:", error)
    return { error: "Failed to build blog data" }
  }
}

export async function GET() {
  const result = await buildPostsData()
  return NextResponse.json(result)
}
