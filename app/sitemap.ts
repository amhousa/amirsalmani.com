import type { MetadataRoute } from "next"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

// Cache the sitemap for 24 hours
let sitemapCache: MetadataRoute.Sitemap | null = null
let lastGenerated = 0
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Return cached sitemap if available and not expired
  if (sitemapCache && Date.now() - lastGenerated < CACHE_DURATION) {
    return sitemapCache
  }

  // Base URL for the website
  const baseUrl = "https://amirsalmani.com"

  // Function to format date to ISO 8601
  const formatDate = (date: Date) => date.toISOString()

  // Get current date for static pages
  const currentDate = formatDate(new Date())

  // Static pages with their metadata
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cooperation`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
  ]

  try {
    // Get blog posts
    const postsDirectory = path.join(process.cwd(), "posts")

    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.warn("Posts directory not found, skipping blog posts in sitemap")
      sitemapCache = staticPages
      lastGenerated = Date.now()
      return staticPages
    }

    const fileNames = fs.readdirSync(postsDirectory)
      .filter(fileName => fileName.endsWith('.md'))

    const blogPosts = await Promise.all(
      fileNames.map(async (fileName) => {
        try {
          const fullPath = path.join(postsDirectory, fileName)
          const fileContents = fs.readFileSync(fullPath, "utf8")
          const { data } = matter(fileContents)
          const slug = fileName.replace(/\.md$/, "")

          // Handle missing or invalid date
          let date = new Date()
          if (data.date) {
            try {
              // Convert Persian date format to ISO date
              const persianDate = data.date // Format: "1403/12/01"
              const [year, month, day] = persianDate.split("/")
              const gregorianYear = Number.parseInt(year) - 979 + 2000
              date = new Date(gregorianYear, Number.parseInt(month) - 1, Number.parseInt(day))
            } catch (error) {
              console.warn(`Invalid date format in ${fileName}, using current date`)
            }
          }

          return {
            url: `${baseUrl}/blog/${slug}`,
            lastModified: formatDate(date),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          }
        } catch (error) {
          console.error(`Error processing ${fileName}:`, error)
          return null
        }
      }),
    )

    // Filter out any null values from failed processing
    const validBlogPosts = blogPosts.filter((post): post is MetadataRoute.Sitemap[0] => post !== null)

    // Combine all URLs
    const sitemap = [...staticPages, ...validBlogPosts]

    // Cache the result
    sitemapCache = sitemap
    lastGenerated = Date.now()

    return sitemap
  } catch (error) {
    console.error("Error generating sitemap:", error)

    // Return static pages if there's an error
    return staticPages
  }
}

