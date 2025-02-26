"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, Search, Filter, ChevronDown, Download, CheckCircle, XCircle, Clock } from "lucide-react"

type PaymentHistoryProps = {
  payments: any[]
}

export default function PaymentHistory({ payments }: PaymentHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter payments based on search term and status
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transaction_id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "successful":
        return "bg-green-500/20 text-green-500"
      case "failed":
        return "bg-red-500/20 text-red-500"
      case "pending":
      default:
        return "bg-yellow-500/20 text-yellow-500"
    }
  }

  // Get status text in Persian
  const getStatusText = (status: string) => {
    switch (status) {
      case "successful":
        return "موفق"
      case "failed":
        return "ناموفق"
      case "pending":
      default:
        return "در حال پردازش"
    }
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "successful":
        return <CheckCircle className="w-4 h-4" />
      case "failed":
        return <XCircle className="w-4 h-4" />
      case "pending":
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between gap-4"
      >
        <h1 className="text-2xl md:text-3xl font-bold">تاریخچه پرداخت‌ها</h1>

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
        {filteredPayments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-right py-4 px-4 font-medium text-gray-400">شناسه تراکنش</th>
                  <th className="text-right py-4 px-4 font-medium text-gray-400">توضیحات</th>
                  <th className="text-right py-4 px-4 font-medium text-gray-400">تاریخ</th>
                  <th className="text-right py-4 px-4 font-medium text-gray-400">مبلغ (تومان)</th>
                  <th className="text-right py-4 px-4 font-medium text-gray-400">وضعیت</th>
                  <th className="text-right py-4 px-4 font-medium text-gray-400"></th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment, index) => (
                  <motion.tr
                    key={payment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.03 }}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="py-4 px-4 text-sm font-mono">{payment.transaction_id}</td>
                    <td className="py-4 px-4">{payment.description}</td>
                    <td className="py-4 px-4 text-sm text-gray-400">{payment.date}</td>
                    <td className="py-4 px-4 font-medium">{payment.amount.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}
                      >
                        {getStatusIcon(payment.status)}
                        {getStatusText(payment.status)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {payment.status === "successful" && (
                        <button className="p-2 text-gray-400 hover:text-white">
                          <Download className="w-5 h-5" />
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <CreditCard className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">هیچ پرداختی یافت نشد</h3>
            <p className="text-gray-400 mb-6">در حال حاضر هیچ پرداختی با معیارهای جستجوی شما وجود ندارد.</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

