"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Video, MessageSquare, Search, Filter, ChevronDown } from "lucide-react"

type ConsultationsListProps = {
  consultations: any[]
}

export default function ConsultationsList({ consultations }: ConsultationsListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter consultations based on search term and status
  const filteredConsultations = consultations.filter((consultation) => {
    const matchesSearch = consultation.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || consultation.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500/20 text-blue-500"
      case "completed":
        return "bg-green-500/20 text-green-500"
      case "cancelled":
        return "bg-red-500/20 text-red-500"
      case "pending":
      default:
        return "bg-yellow-500/20 text-yellow-500"
    }
  }

  // Get status text in Persian
  const getStatusText = (status: string) => {
    switch (status) {
      case "scheduled":
        return "برنامه‌ریزی شده"
      case "completed":
        return "انجام شده"
      case "cancelled":
        return "لغو شده"
      case "pending":
      default:
        return "در انتظار"
    }
  }

  // Get consultation type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-5 h-5" />
      case "chat":
        return <MessageSquare className="w-5 h-5" />
      default:
        return <Calendar className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between gap-4"
      >
        <h1 className="text-2xl md:text-3xl font-bold">مشاوره‌های من</h1>

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
        {filteredConsultations.length > 0 ? (
          <div className="space-y-4">
            {filteredConsultations.map((consultation, index) => (
              <motion.div
                key={consultation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/20 flex items-center justify-center">
                      {getTypeIcon(consultation.type)}
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">{consultation.title}</h3>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{consultation.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{consultation.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(consultation.status)}`}>
                      {getStatusText(consultation.status)}
                    </span>

                    {consultation.status === "scheduled" && (
                      <button className="px-4 py-2 bg-brand-primary text-black rounded-xl text-sm font-medium">
                        پیوستن
                      </button>
                    )}

                    {consultation.status === "pending" && (
                      <button className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 rounded-xl text-sm font-medium">
                        پرداخت
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">هیچ مشاوره‌ای یافت نشد</h3>
            <p className="text-gray-400 mb-6">در حال حاضر هیچ مشاوره‌ای با معیارهای جستجوی شما وجود ندارد.</p>
            <button className="px-6 py-2 bg-brand-primary text-black rounded-xl font-medium">رزرو مشاوره جدید</button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

