"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Home, Calendar, Package, CreditCard, User, LogOut, Menu, X, Bell } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import DashboardOverview from "@/components/dashboard/DashboardOverview"
import ConsultationsList from "@/components/dashboard/ConsultationsList"
import ServicesList from "@/components/dashboard/ServicesList"
import PaymentHistory from "@/components/dashboard/PaymentHistory"
import UserProfile from "@/components/dashboard/UserProfile"
import MovingBackground from "@/components/MovingBackground"

type DashboardProps = {
  user: any
  consultations: any[]
  services: any[]
  payments: any[]
}

export default function DashboardClient({ user, consultations, services, payments }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  const tabs = [
    { id: "overview", label: "داشبورد", icon: Home },
    { id: "consultations", label: "مشاوره‌ها", icon: Calendar },
    { id: "services", label: "سرویس‌ها", icon: Package },
    { id: "payments", label: "پرداخت‌ها", icon: CreditCard },
    { id: "profile", label: "پروفایل", icon: User },
  ]

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <MovingBackground />

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-dark-bg/80 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-white">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
        <div className="text-xl font-bold text-brand-primary">داشبورد</div>
        <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center">
          <Bell className="w-5 h-5 text-brand-primary" />
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-20 bg-dark-bg/95 backdrop-blur-md pt-16 lg:hidden"
          >
            <div className="flex flex-col p-4">
              <div className="flex flex-col items-center mb-8">
                <div className="w-20 h-20 rounded-full bg-brand-primary/20 flex items-center justify-center mb-3">
                  <User className="w-10 h-10 text-brand-primary" />
                </div>
                <h2 className="text-xl font-bold">{user.full_name || "کاربر"}</h2>
                <p className="text-gray-400">{user.phone || "شماره موبایل"}</p>
              </div>

              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      activeTab === tab.id ? "bg-brand-primary text-black" : "hover:bg-white/5"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors mt-4"
                >
                  <LogOut className="w-5 h-5" />
                  <span>خروج</span>
                </button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 right-0 w-64 flex-col bg-dark-bg/80 backdrop-blur-md border-l border-white/5 z-10">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-2xl font-bold text-brand-primary">داشبورد</h1>
        </div>

        <div className="flex-1 overflow-auto py-6 px-4">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activeTab === tab.id ? "bg-brand-primary text-black" : "hover:bg-white/5"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center">
              <User className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <div className="font-medium">{user.full_name || "کاربر"}</div>
              <div className="text-sm text-gray-400">{user.phone || "شماره موبایل"}</div>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>خروج از حساب</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pr-64 pt-16 lg:pt-0 min-h-screen">
        <div className="container mx-auto p-4 lg:p-8">
          {activeTab === "overview" && (
            <DashboardOverview
              user={user}
              consultationsCount={consultations.length}
              servicesCount={services.length}
              paymentsTotal={payments.reduce((sum, payment) => sum + payment.amount, 0)}
            />
          )}

          {activeTab === "consultations" && <ConsultationsList consultations={consultations} />}

          {activeTab === "services" && <ServicesList services={services} />}

          {activeTab === "payments" && <PaymentHistory payments={payments} />}

          {activeTab === "profile" && <UserProfile user={user} />}
        </div>
      </main>
    </div>
  )
}

