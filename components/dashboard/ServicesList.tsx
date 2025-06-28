"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Package, Search, Filter, ChevronDown, Calendar, Clock } from "lucide-react"

type ServicesListProps = {
  services: any[]
}

export default function ServicesList({ services }: ServicesListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter services based on search term and status
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || service.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-500"
      case "expired":
        return "bg-red-500/20 text-red-500"
      case "pending":
      default:
        return "bg-yellow-500/20 text-yellow-500"
    }
  }

  // Get status text in Persian
  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "فعال"
      case "expired":
        return "منقضی شده"
      case "pending":
      default:
        return "در انتظار"
    }
  }

  // Calculate days remaining for service
  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between gap-4"
      >
        <h1 className="text-2xl md:text-3xl font-bold">سرویس‌های من</h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="جستجو..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-4 pr-10 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="relative">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl cursor-pointer">
              <Filter className="w-5 h-5 text-gray-400" />
              <span>وضعیت: {statusFilter === "all" ? "همه" : getStatusText(statusFilter)}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {/* Dropdown for status filter - in a real app, you'd implement this with proper state management */}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-effect rounded-2xl p-6"
      >
        {filteredServices.length > 0 ? (
          <div className="space-y-4">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/20 flex items-center justify-center">
                      <Package className="w-6 h-6 text-brand-primary" />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">{service.title}</h3>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>تاریخ شروع: {service.start_date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>تاریخ پایان: {service.end_date}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(service.status)}`}>
                      {getStatusText(service.status)}
                    </span>

                    {service.status === "active" && (
                      <div className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-xs">
                        {getDaysRemaining(service.end_date)} روز باقی‌مانده
                      </div>
                    )}

                    {service.status === "expired" && (
                      <button className="px-4 py-2 bg-brand-primary text-black rounded-xl text-sm font-medium">
                        تمدید
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress bar for active services */}
                {service.status === "active" && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>پیشرفت</span>
                      <span>{Math.round((getDaysRemaining(service.end_date) / service.duration) * 100)}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-brand-primary h-2 rounded-full"
                        style={{
                          width: `${Math.round((getDaysRemaining(service.end_date) / service.duration) * 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">هیچ سرویسی یافت نشد</h3>
            <p className="text-gray-400 mb-6">در حال حاضر هیچ سرویسی با معیارهای جستجوی شما وجود ندارد.</p>
            <button className="px-6 py-2 bg-brand-primary text-black rounded-xl font-medium">خرید سرویس جدید</button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

