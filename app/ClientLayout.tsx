"use client"

import "./globals.css"
// import { Vazirmatn } from "next/font/google"
import BottomNavbar from "@/components/BottomNavbar"
import MovingBackground from "@/components/MovingBackground"
import type React from "react"
// import CelebrationPopup from "@/components/CelebrationPopup"
import { Toaster } from "sonner"
import SessionTracker from "@/components/SessionTracker"
import DynamicChat from "@/components/DynamicChat"
import { useEffect, useState } from "react"

// const vazirmatn = Vazirmatn({
//   subsets: ["arabic"],
//   display: "swap",
//   preload: true,
//   adjustFontFallback: true,
// })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentPathname, setCurrentPathname] = useState("")
  useEffect(() => {
    setCurrentPathname(window.location.pathname)
  }, [])
  return (
    <html lang="fa" dir="rtl" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "امیرحسین سلمانی",
              alternateName: "Amirhossein Salmani",
              url: "https://amirsalmani.com",
              image: "https://amirsalmani.com/images/about/me.svg",
              sameAs: [
                "https://github.com/amhousa",
                "https://linkedin.com/in/amirhosseinsalmani",
                "https://x.com/amhousa",
              ],
              jobTitle: "توسعه‌دهنده فول‌استک",
              worksFor: {
                "@type": "Organization",
                name: "تیم توسعه امیرحسین سلمانی",
              },
              description: "توسعه‌دهنده فول‌استک با تخصص در پیاده‌سازی مدل‌های هوش مصنوعی",
            }),
          }}
        />
      </head>
      <body className={`font-sans bg-[#050301] text-dark-text`}>
        <Toaster position="top-center" expand={true} richColors />
        <MovingBackground />
        {/* <CelebrationPopup /> */}
        <SessionTracker />
        <main className={`min-h-screen ${currentPathname === "/" ? "" : "mb-16"}`}>{children}</main>
        <BottomNavbar />
        <DynamicChat />
      </body>
    </html>
  )
}
