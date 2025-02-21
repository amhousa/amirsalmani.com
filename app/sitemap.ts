import type { MetadataRoute } from "next"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL for the website
  const baseUrl = "https://amirsalmani.com"

  // Function to format date to ISO 8601
  const formatDate = (date: Date) => {
    return date.toISOString()
  }

  // Get current date for static pages
  const currentDate = formatDate(new Date())

  // Static pages
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
  ]

  // Get blog posts
  const postsDirectory = path.join(process.cwd(), "posts")
  const fileNames = fs.readdirSync(postsDirectory)

  const blogPosts = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContents)
    const slug = fileName.replace(/\.md$/, "")

    // Convert Persian date format to ISO date
    const persianDate = data.date // Format: "1403/12/01"
    const [year, month, day] = persianDate.split("/")
    const gregorianYear = Number.parseInt(year) - 979 + 2000 // Convert from Persian to Gregorian year
    const date = new Date(gregorianYear, Number.parseInt(month) - 1, Number.parseInt(day))

    return {
      url: `${baseUrl}/blog/${slug}`,
      lastModified: formatDate(date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }
  })

  // // Get language versions
  // const languagePages = [
  //   {
  //     url: `${baseUrl}/en`,
  //     lastModified: currentDate,
  //     changeFrequency: "weekly" as const,
  //     priority: 0.9,
  //   },
  //   {
  //     url: `${baseUrl}/de`,
  //     lastModified: currentDate,
  //     changeFrequency: "weekly" as const,
  //     priority: 0.9,
  //   },
  // ]

  // Combine all URLs
  return [...staticPages, ...blogPosts]
}

