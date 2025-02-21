import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import type { Metadata } from "next"
import Image from "next/image"

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
      url: `https://www.amirhosseinsalmani.com/blog/${params.slug}`,
      images: [
        {
          url: data.ogImage,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const fullPath = path.join(process.cwd(), "posts", `${params.slug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)
  const processedContent = await remark().use(html, { sanitize: false }).process(content)
  const contentHtml = processedContent.toString()

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <article className="prose prose-lg dark:prose-invert prose-purple mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-brand-purple">{data.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{data.date}</p>
          <div className="flex flex-wrap gap-2 mt-4">
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

        <div className="aspect-square relative mb-8 rounded-lg overflow-hidden">
          <Image src={data.image || "/placeholder.svg"} alt={data.title} fill className="object-cover" />
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: contentHtml.replace(/<h1>.*?<\/h1>/, "") }}
          className="text-default prose-headings:text-brand-purple prose-a:text-brand-purple hover:prose-a:text-brand-purple/80"
        />
      </article>
    </div>
  )
}

