"use client"

import Link from "next/link"
import { Home, User, Newspaper, Briefcase, Mail, Handshake, ImageIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const EnBottomNavbar = () => {
  const pathname = usePathname()

  // Hide bottom navigation in dashboard
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/en/dashboard")) {
    return null
  }

  const navItems = [
    { href: "/en", icon: Home, label: "Home" },
    { href: "/en/about", icon: User, label: "About" },
    { href: "/en/services", icon: Briefcase, label: "Services" },
    { href: "/en/portfolio", icon: ImageIcon, label: "Portfolio" },
    { href: "/en/blog", icon: Newspaper, label: "Blog" },
    { href: "/en/cooperation", icon: Handshake, label: "Cooperation" },
    { href: "/en/contact", icon: Mail, label: "Contact" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#050301]/80 backdrop-blur-md border-t border-white/5 pb-3">
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

export default EnBottomNavbar
