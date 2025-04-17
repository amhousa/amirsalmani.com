import "../globals.css"
import type { Metadata, Viewport } from "next"
import { Vazirmatn } from "next/font/google"
import EnBottomNavbar from "@/components/EnBottomNavbar"
import MovingBackground from "@/components/MovingBackground"
import type React from "react"
import CelebrationPopup from "@/components/CelebrationPopup"
import { Toaster } from "sonner"
import SessionTracker from "@/components/SessionTracker"
import EnDynamicChat from "@/components/EnDynamicChat"

const vazirmatn = Vazirmatn({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

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
  title: {
    default: "Amirhossein Salmani | Full Stack Developer",
    template: "%s | Amirhossein Salmani",
  },
  description:
    "Looking for a professional and modern website design? I'm Amirhossein Salmani, a full-stack developer specializing in AI model implementation, fast project delivery, and beautiful designs, ready to collaborate with your business.",
  keywords: [
    "Amirhossein Salmani",
    "Amir Salmani",
    "Web Design",
    "Digital Marketing",
    "AI Services",
    "Web Design Tehran",
    "Full Stack Developer",
    "Web Programming",
    "Mobile Development",
    "Portfolio",
    "Web Developer",
    "Programming",
  ],
  authors: [{ name: "Amirhossein Salmani", url: "https://amirsalmani.com" }],
  creator: "Amirhossein Salmani",
  publisher: "Amirhossein Salmani",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://amirsalmani.com/en",
    languages: {
      "en-US": "https://amirsalmani.com/en",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "fa_IR",
    url: "https://amirsalmani.com/en",
    siteName: "Amirhossein Salmani",
    title: "Amirhossein Salmani | Full Stack Developer",
    description:
      "Looking for a professional and modern website design? I'm Amirhossein Salmani, a full-stack developer specializing in AI model implementation, fast project delivery, and beautiful designs, ready to collaborate with your business.",
    images: [
      {
        url: "https://amirsalmani.com/og-image-en.jpg",
        width: 1200,
        height: 630,
        alt: "Amirhossein Salmani - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amirhossein Salmani | Full Stack Developer",
    description:
      "Looking for a professional and modern website design? I'm Amirhossein Salmani, a full-stack developer specializing in AI model implementation, fast project delivery, and beautiful designs, ready to collaborate with your business.",
    images: ["https://amirsalmani.com/x-image-en.jpg"],
    creator: "@amhousa",
    creatorId: "1467726470533754880",
  },
}

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" className="dark">
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
              name: "Amirhossein Salmani",
              url: "https://amirsalmani.com/en",
              image: "https://amirsalmani.com/images/about/me.svg",
              sameAs: [
                "https://github.com/amhousa",
                "https://linkedin.com/in/amirhosseinsalmani",
                "https://x.com/amhousa",
              ],
              jobTitle: "Full Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Amirhossein Salmani Development Team",
              },
              description: "Full Stack Developer specializing in AI model implementation",
            }),
          }}
        />
      </head>
      <body className={`${vazirmatn.className} bg-[#050301] text-dark-text`}>
        <Toaster position="top-center" expand={true} richColors />
        <MovingBackground />
        <CelebrationPopup />
        <SessionTracker />
        <main className="min-h-screen pb-16">{children}</main>
        <EnBottomNavbar />
        <EnDynamicChat />
      </body>
    </html>
  )
}
