"use client"

import Link from "next/link"
import { Home, User, Newspaper, Briefcase, Mail } from "lucide-react"
import React from "react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const BottomNavbar = () => {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-effect">
      <div className="flex justify-around items-center h-16">
        <NavItem href="/" icon={<Home />} label="خانه" isActive={pathname === "/"} />
        <NavItem href="/about" icon={<User />} label="درباره من" isActive={pathname === "/about"} />
        <NavItem href="/blog" icon={<Newspaper />} label="وبلاگ" isActive={pathname === "/blog"} />
        <NavItem href="/portfolio" icon={<Briefcase />} label="نمونه کارها" isActive={pathname === "/portfolio"} />
        <NavItem href="/contact" icon={<Mail />} label="تماس" isActive={pathname === "/contact"} />
      </div>
    </nav>
  )
}

const NavItem = ({
  href,
  icon,
  label,
  isActive,
}: { href: string; icon: React.ReactNode; label: string; isActive: boolean }) => (
  <Link
    href={href}
    className="flex flex-col items-center text-dark-text-muted hover:text-brand-primary transition-colors"
    aria-label={label}
  >
    {React.cloneElement(icon as React.ReactElement, {
      className: cn("w-6 h-6", isActive ? "text-brand-primary" : "text-dark-text-muted"),
    })}
    <span className={cn("text-xs mt-1", isActive ? "text-brand-primary" : "text-dark-text-muted")}>{label}</span>
  </Link>
)

export default BottomNavbar

