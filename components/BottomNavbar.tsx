"use client"

import Link from "next/link"
import { Home, User, Newspaper, Briefcase, Mail, Handshake, Image } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const BottomNavbar = () => {
  const pathname = usePathname()

  // Hide bottom navigation in dashboard
  if (pathname.startsWith("/dashboard")) {
    return null
  }

  const navItems = [
    { href: "/", icon: Home, label: "خانه" },
    { href: "/about", icon: User, label: "درباره" },
    { href: "/portfolio", icon: Image, label: "نمونه کارها" },
    { href: "/services", icon: Briefcase, label: "خدمات" },
    { href: "/cooperation", icon: Handshake, label: "همکاری" },
    { href: "/blog", icon: Newspaper, label: "وبلاگ" },
    // { href: "/contact", icon: Mail, label: "تماس" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#050301]/80 backdrop-blur-md rounded-2xl border border-gray-800 px-1 py-1 mx-2 mb-1">
      <div className="flex justify-around items-center h-14">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center text-dark-text-muted hover:text-brand-primary transition-colors"
              aria-label={label}
            >
              <Icon className={cn("w-6 h-6", isActive ? "text-brand-primary" : "text-dark-text-muted")} />
              <span className={cn("text-xs mt-1", isActive ? "text-brand-primary" : "text-dark-text-muted")}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNavbar

