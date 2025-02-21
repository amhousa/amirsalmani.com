import "./globals.css"
import type { Metadata } from "next"
import { Vazirmatn } from "next/font/google"
import BottomNavbar from "@/components/BottomNavbar"
import MovingBackground from "@/components/MovingBackground"
import type React from "react"

// Optimize font loading
const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap", // Prevent font render blocking
  preload: true,
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: "امیرحسین سلمانی | توسعه‌دهنده فول‌استک",
  description: "وبسایت شخصی امیرحسین سلمانی، توسعه‌دهنده فول‌استک",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "امیرحسین سلمانی",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: "#050301",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="mask-icon" href="/icon.svg" color="#00DC82" />
        <meta name="theme-color" content="#050301" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="امیرحسین سلمانی" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="امیرحسین سلمانی" />
      </head>
      <body className={`${vazirmatn.className} bg-[#050301] text-dark-text`}>
        <MovingBackground />
        <main className="min-h-screen pb-16">{children}</main>
        <BottomNavbar />
      </body>
    </html>
  )
}

