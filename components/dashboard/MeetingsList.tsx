"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Search, ChevronDown, Clock, Video } from "lucide-react"

type MeetingsListProps = {
  meetings: any[]
}

export default function MeetingsList({ meetings }: MeetingsListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter meetings based on search and status
  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch =
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || meeting.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between gap-4"
      >
        <h1 className="text-2xl md:text-3xl font-bold">جلسات من</h1>

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
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary appearance-none"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="scheduled">برنامه‌ریزی شده</option>
              <option value="completed">برگزار شده</option>
              <option value="cancelled">لغو شده</option>
            </select>
            <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-effect rounded-2xl p-6"
      >
        {filteredMeetings.length > 0 ? (
          <div className="space-y-4">
            {filteredMeetings.map((meeting, index) => (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/20 flex items-center justify-center">
                      <Video className="w-6 h-6 text-brand-primary" />
                    </div>

                    <div>
                      <div className="font-bold text-lg">{meeting.title}</div>
                      {meeting.description && <div className="text-sm text-gray-400 mt-1">{meeting.description}</div>}
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(meeting.meeting_date).toLocaleDateString("fa-IR")}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(meeting.meeting_date).toLocaleTimeString("fa-IR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {meeting.duration} دقیقه
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {meeting.meeting_link && (
                      <a
                        href={meeting.meeting_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-brand-primary text-black rounded-xl text-sm font-medium"
                      >
                        ورود به جلسه
                      </a>
                    )}
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        meeting.status === "completed"
                          ? "bg-green-500/20 text-green-500"
                          : meeting.status === "cancelled"
                            ? "bg-red-500/20 text-red-500"
                            : "bg-yellow-500/20 text-yellow-500"
                      }`}
                    >
                      {meeting.status === "completed"
                        ? "برگزار شده"
                        : meeting.status === "cancelled"
                          ? "لغو شده"
                          : "برنامه‌ریزی شده"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">جلسه‌ای یافت نشد</h3>
            <p className="text-gray-400">در حال حاضر هیچ جلسه‌ای با معیارهای جستجوی شما وجود ندارد.</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

