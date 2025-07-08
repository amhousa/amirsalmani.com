import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import ClientLayout from "./ClientLayout"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050301" },
  ],
  colorScheme: "dark",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://amirsalmani.com"),
  
  // Title & Description
  title: {
    default: "امیرحسین سلمانی | توسعه‌دهنده فول‌استک و متخصص هوش مصنوعی",
    template: "%s | امیرحسین سلمانی",
  },
  description:
    "به دنبال طراحی سایتی حرفه‌ای و مدرن هستید؟ من، امیرحسین سلمانی، توسعه‌دهنده فول‌استک با تخصص در پیاده‌سازی مدل‌های هوش مصنوعی، تحویل سریع پروژه و طراحی‌های زیبا، آماده همکاری با کسب‌وکار شما هستم.",
    
  // Keywords (ادغام شده و بهینه)
  keywords: [
    "امیرحسین سلمانی",
    "توسعه‌دهنده فول‌استک",
    "طراحی سایت تهران",
    "خدمات هوش مصنوعی",
    "برنامه نویسی وب",
    "توسعه‌دهنده Next.js",
    "توسعه‌دهنده Node.js",
    "Amirhossein Salmani",
    "Amir Salmani",
    "Full-Stack Developer",
    "AI Services",
    "Web Development",
  ],

  // Authorship (ادغام شده و کامل)
  authors: [{ name: "امیرحسین سلمانی", url: "https://amirsalmani.com" }],
  creator: "امیرحسین سلمانی",
  publisher: "امیرحسین سلمانی",
  
  // General
  applicationName: "امیرحسین سلمانی",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  category: "technology",
  classification: "Web Development, Full Stack Development, AI Services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Canonical & Robots
  alternates: {
    canonical: "https://amirsalmani.com",
    languages: {
      "fa-IR": "https://amirsalmani.com",
      "en": "https://amirsalmani.com/en"
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons & Manifest
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/icon.svg", color: "#00DC82" }],
  },
  manifest: "/site.webmanifest",

  // Social Media (Open Graph & Twitter)
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://amirsalmani.com",
    siteName: "امیرحسین سلمانی",
    title: "امیرحسین سلمانی | توسعه‌دهنده فول‌استک",
    description: "توسعه‌دهنده فول‌استک با تخصص در هوش مصنوعی، آماده همکاری برای ساخت وب‌سایت‌های حرفه‌ای و مدرن.",
    images: [
      {
        url: "/og-image.jpg", // Relative URL is fine if metadataBase is set
        width: 1200,
        height: 630,
        alt: "امیرحسین سلمانی - توسعه‌دهنده فول‌استک",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "امیرحسین سلمانی | توسعه‌دهنده فول‌استک",
    description: "توسعه‌دهنده فول‌استک با تخصص در هوش مصنوعی، آماده همکاری برای ساخت وب‌سایت‌های حرفه‌ای و مدرن.",
    images: ["/x-image.jpg"], // Relative URL is fine
    creator: "@amhousa",
  },
  
  // Verification (کدهای خود را اینجا جایگزین کنید)
  verification: {
    google: "YOUR-GOOGLE-VERIFICATION-CODE",
    yandex: "YOUR-YANDEX-VERIFICATION-CODE",
    other: {
      "norton-safeweb-site-verification": "YOUR-NORTON-CODE",
    },
  },
  
  // PWA & Mobile
  appleWebApp: {
    capable: true,
    title: "امیرحسین سلمانی",
    statusBarStyle: "black-translucent",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}