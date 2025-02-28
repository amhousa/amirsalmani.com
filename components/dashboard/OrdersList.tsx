"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Package, Search, ChevronDown } from "lucide-react"

type OrdersListProps = {
  orders: any[]
}

export default function OrdersList({ orders }: OrdersListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.items.some((item: any) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between gap-4"
      >
        <h1 className="text-2xl md:text-3xl font-bold">سفارش‌های من</h1>

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
              <option value="pending">در انتظار پرداخت</option>
              <option value="processing">در حال پردازش</option>
              <option value="completed">تکمیل شده</option>
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
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
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
                      <div className="font-bold text-lg">سفارش #{order.id.slice(0, 8)}</div>
                      <div className="text-sm text-gray-400 mt-1">
                        {new Date(order.created_at).toLocaleDateString("fa-IR")}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {order.items.map((item: any, idx: number) => (
                          <span key={idx} className="text-xs bg-white/10 px-2 py-1 rounded-lg">
                            {item.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-lg font-bold">{order.total_amount.toLocaleString()} تومان</div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        order.status === "completed"
                          ? "bg-green-500/20 text-green-500"
                          : order.status === "cancelled"
                            ? "bg-red-500/20 text-red-500"
                            : "bg-yellow-500/20 text-yellow-500"
                      }`}
                    >
                      {order.status === "completed"
                        ? "تکمیل شده"
                        : order.status === "cancelled"
                          ? "لغو شده"
                          : "در حال پردازش"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">سفارشی یافت نشد</h3>
            <p className="text-gray-400">در حال حاضر هیچ سفارشی با معیارهای جستجوی شما وجود ندارد.</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

