"use client"

import { useEffect, useRef } from "react"

export default function ArticleImageEnhancer() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    // Find all images in the article content
    const images = contentRef.current.querySelectorAll("img")

    // Wrap each image in a container for the scanning effect
    images.forEach((img) => {
      // Skip if already wrapped
      if (img.parentElement?.classList.contains("image-container")) return

      // Create container
      const container = document.createElement("div")
      container.className = "image-container"

      // Replace image with container + image
      const parent = img.parentElement
      parent?.insertBefore(container, img)
      container.appendChild(img)
    })
  }, [])

  return <div ref={contentRef} className="article-content" />
}

