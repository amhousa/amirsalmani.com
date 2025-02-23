"use client"

import Link from "next/link"
import { Home, User, Newspaper, Briefcase, Mail, Handshake } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const BottomNavbar = () => {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "خانه" },
    { href: "/about", icon: User, label: "درباره من" },
    { href: "/blog", icon: Newspaper, label: "وبلاگ" },
    { href: "/portfolio", icon: Briefcase, label: "نمونه کارها" },
    { href: "/cooperation", icon: Handshake, label: "همکاری" },
    { href: "/contact", icon: Mail, label: "تماس" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-effect">
      <div className="flex justify-around items-center h-16">
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

