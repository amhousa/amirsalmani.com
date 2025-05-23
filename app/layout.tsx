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

// Import Bon font

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
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/icon.svg", color: "#00DC82" }],
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
        url: "https://amirsalmani.com/og-image.jpg",
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
    images: ["https://amirsalmani.com/x-image.jpg"],
    creator: "@amhousa",
    creatorId: "1467726470533754880",
  },
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
    other: {
      "norton-safeweb-site-verification":
        "21BJFR818NHI04SL5SVNKZ2WAFQE53-ZMLANNST-M26A3EQYXDYRYKUN961FDSBCH5-EC1J0S9173CUYXAIHZA3LL83YPJ3G5B-JDXTHB6TQH791K6J99KI0B9OB5MSX",
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
  generator: "Next.js",
  applicationName: "امیرحسین سلمانی",
  keywords: ["طراحی سایت", "برنامه نویسی", "هوش مصنوعی", "دیجیتال مارکتینگ"],
  authors: [{ name: "امیرحسین سلمانی" }],
  creator: "امیرحسین سلمانی",
  publisher: "امیرحسین سلمانی",
  other: {
    "google-site-verification": "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}
