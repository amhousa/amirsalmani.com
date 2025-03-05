import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { MDXRemote } from "next-mdx-remote/rsc"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { mdxComponents } from "@/components/MdxComponents"
import ServiceAdvertisement from "@/components/ServiceAdvertisement"
import ScanningImage from "@/components/ScanningImage"

interface Post {
  slug: string
  title: string
  date: string
  content: string
  excerpt: string
  tags: string[]
  image: string
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "posts")
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ""),
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const fullPath = path.join(process.cwd(), "posts", `${params.slug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data } = matter(fileContents)

  return {
    title: data.title,
    description: data.excerpt,
    openGraph: {
      title: data.title,
      description: data.excerpt,
      type: "article",
      url: `https://amirsalmani.com/blog/${params.slug}`,
      images: [
        {
          url: data.ogImage || data.image,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
  }
}

function getAllPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), "posts")
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug: fileName.replace(/\.md$/, ""),
        title: data.title,
        date: data.date,
        content,
        excerpt: data.excerpt,
        tags: data.tags,
        image: data.image,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function getAdjacentPosts(currentSlug: string): { prev: Post | null; next: Post | null } {
  const posts = getAllPosts()
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug)

  return {
    prev: currentIndex > 0 ? posts[currentIndex - 1] : null,
    next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const fullPath = path.join(process.cwd(), "posts", `${params.slug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)
  const { prev, next } = getAdjacentPosts(params.slug)

  // Split content into paragraphs for better ad placement
  const paragraphs = content.split("\n\n")
  const midPoint = Math.floor(paragraphs.length / 2)

  // Group content into three sections for better ad distribution
  const firstSection = paragraphs.slice(0, midPoint - 2).join("\n\n")
  const middleSection = paragraphs.slice(midPoint - 2, midPoint + 2).join("\n\n")
  const lastSection = paragraphs.slice(midPoint + 2).join("\n\n")

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <article className="prose prose-lg dark:prose-invert prose-purple mx-auto rtl">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-brand-primary mb-3">{data.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{data.date}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {data.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mb-6">
          <ScanningImage
            src={data.image || "/placeholder.svg"}
            alt={data.title}
            className="aspect-video w-full rounded-lg"
          />
        </div>

        <div className="text-default prose-headings:text-brand-primary prose-a:text-brand-primary hover:prose-a:text-brand-primary/80 space-y-4">
          {/* First section */}
          <MDXRemote source={firstSection} components={mdxComponents} />

          {/* First ad integrated naturally with content */}
          <div className="not-prose my-6">
            <ServiceAdvertisement />
          </div>

          {/* Middle section */}
          <MDXRemote source={middleSection} components={mdxComponents} />

          {/* Second ad */}
          <div className="not-prose my-6">
            <ServiceAdvertisement />
          </div>

          {/* Last section */}
          <MDXRemote source={lastSection} components={mdxComponents} />
        </div>

        {/* Final ad before navigation */}
        <div className="not-prose mt-8 mb-6">
          <ServiceAdvertisement />
        </div>
      </article>

      <nav className="mt-8 flex justify-between items-center border-t border-gray-700 pt-6">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="flex items-center gap-2 text-gray-400 hover:text-brand-primary transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            <div className="text-right">
              <div className="text-sm text-gray-500">مطلب قبلی</div>
              <div className="font-medium">{prev.title}</div>
            </div>
          </Link>
        ) : (
          <div></div>
        )}

        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="flex items-center gap-2 text-gray-400 hover:text-brand-primary transition-colors"
          >
            <div className="text-left">
              <div className="text-sm text-gray-500">مطلب بعدی</div>
              <div className="font-medium">{next.title}</div>
            </div>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        ) : (
          <div></div>
        )}
      </nav>
    </div>
  )
}

