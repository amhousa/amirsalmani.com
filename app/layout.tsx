import "./globals.css"
import type { Metadata } from "next"
import { Vazirmatn } from "next/font/google"
import BottomNavbar from "@/components/BottomNavbar"
import MovingBackground from "@/components/MovingBackground"
import type React from "react"

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  adjustFontFallback: true,
  weight: ["400", "500", "600", "700"],
  variable: "--font-vazirmatn", // Add variable support
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL("https://amirsalmani.com"),
  title: {
    default: "امیرحسین سلمانی | توسعه‌دهنده فول‌استک",
    template: "%s | امیرحسین سلمانی",
  },
  description:
    "به دنبال طراحی سایتی حرفه‌ای و مدرن هستید؟ من، امیرحسین سلمانی، توسعه‌دهنده فول‌استک با تخصص در پیاده‌سازی مدل‌های هوش مصنوعی، تحویل سریع پروژه و طراحی‌های زیبا، آماده همکاری با کسب‌وکار شما هستم.",
  keywords: [
    "Amirhossein Salmani",
    "Amir Salmani",
    "مستر سلمانی",
    "امیرحسین سلمانی",
    "طراحی سایت",
    "دیجیتال مارکتینگ",
    "خدمات هوش مصنوعی",
    "طراحی سایت تهران",
    "توسعه‌دهنده فول‌استک",
    "برنامه‌نویسی وب",
    "توسعه موبایل",
    "نمونه کار",
    "توسعه‌دهنده وب",
    "برنامه‌نویسی",
  ],
  authors: [{ name: "امیرحسین سلمانی", url: "https://amirsalmani.com" }],
  creator: "امیرحسین سلمانی",
  publisher: "امیرحسین سلمانی",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://amirsalmani.com",
    languages: {
      "fa-IR": "https://amirsalmani.com",
      // "en-US": "https://amirsalmani.com/en",
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
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: ["/icon.svg"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/icon.svg",
        color: "#00DC82",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "fa_IR",
    alternateLocale: "en_US",
    url: "https://amirsalmani.com",
    siteName: "امیرحسین سلمانی",
    title: "امیرحسین سلمانی | توسعه‌دهنده فول‌استک",
    description:
      "به دنبال طراحی سایتی حرفه‌ای و مدرن هستید؟ من، امیرحسین سلمانی، توسعه‌دهنده فول‌استک با تخصص در پیاده‌سازی مدل‌های هوش مصنوعی، تحویل سریع پروژه و طراحی‌های زیبا، آماده همکاری با کسب‌وکار شما هستم.",
    images: [
      {
        url: "https://amirsalmani.com/og-image.jpg", //fix later
        width: 1200,
        height: 630,
        alt: "امیرحسین سلمانی - توسعه‌دهنده فول‌استک",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "امیرحسین سلمانی | توسعه‌دهنده فول‌استک",
    description:
      "به دنبال طراحی سایتی حرفه‌ای و مدرن هستید؟ من، امیرحسین سلمانی، توسعه‌دهنده فول‌استک با تخصص در پیاده‌سازی مدل‌های هوش مصنوعی، تحویل سریع پروژه و طراحی‌های زیبا، آماده همکاری با کسب‌وکار شما هستم.",
    images: ["https://amirsalmani.com/twitter-image.jpg"], //fix later
    creator: "@amirsalmani",
    creatorId: "1467726470533754880",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  verification: {
    google: "your-google-site-verification", //fix later
    yandex: "your-yandex-verification", //fix later
    yahoo: "your-yahoo-verification", //fix later
    other: {
      "norton-safeweb-site-verification": "your-norton-verification", //fix later
    },
  },
  appleWebApp: {
    capable: true,
    title: "امیرحسین سلمانی",
    statusBarStyle: "black-translucent",
  },
  applicationName: "امیرحسین سلمانی",
  category: "technology",
  classification: "Web Development, Full Stack Development, AI Services",
  referrer: "origin-when-cross-origin",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050301" },
  ],
  colorScheme: "dark",
  generator: "Next.js",
  applicationName: "امیرحسین سلمانی",
  keywords: ["طراحی سایت", "برنامه نویسی", "هوش مصنوعی", "دیجیتال مارکتینگ"],
  authors: [{ name: "امیرحسین سلمانی" }],
  creator: "امیرحسین سلمانی",
  publisher: "امیرحسین سلمانی",
  other: {
    "google-site-verification": "your-google-verification-code", //fix later
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className="dark">
    <head>
      {/* Preload critical fonts */}
      <link rel="preload" href="/icon.svg" as="image" type="image/svg+xml" />

      <link rel="icon" type="image/svg+xml" href="/icon.svg" />
      <link rel="mask-icon" href="/icon.svg" color="#00DC82" />
      <link rel="apple-touch-icon" href="/apple-icon.png" />
      <meta name="theme-color" content="#050301" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="امیرحسین سلمانی" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="امیرحسین سلمانی" />

      {/* Add preconnect for external resources */}

      {/* Add resource hints */}

      <link rel="alternate" type="application/rss+xml" title="RSS Feed for amirsalmani.com" href="/rss.xml" />
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
            image: "https://amirsalmani.com/images/about/me.webp",
            sameAs: [
              "https://github.com/yourusername",
              "https://linkedin.com/in/yourusername",
              "https://twitter.com/yourusername",
            ],
            jobTitle: "توسعه‌دهنده فول‌استک",
            worksFor: {
              "@type": "Organization",
              name: "مستر سلمانی",
            },
            description: "توسعه‌دهنده فول‌استک با تخصص در پیاده‌سازی مدل‌های هوش مصنوعی",
          }),
        }}
      />
    </head>
    <body className={`${vazirmatn.variable} font-sans bg-[#050301] text-dark-text`} style={{ colorScheme: "dark" }}>
      <MovingBackground priority />
      <main className="min-h-screen pb-16">{children}</main>
      <BottomNavbar />
    </body>
  </html>
  )
}

