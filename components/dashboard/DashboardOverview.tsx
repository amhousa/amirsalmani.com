"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Package, CreditCard, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

type DashboardOverviewProps = {
  user: any
  consultationsCount: number
  servicesCount: number
  paymentsTotal: number
}

export default function DashboardOverview({
  user,
  consultationsCount,
  servicesCount,
  paymentsTotal,
}: DashboardOverviewProps) {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("صبح بخیر")
    else if (hour < 18) setGreeting("عصر بخیر")
    else setGreeting("شب بخیر")
  }, [])

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-2xl p-6 md:p-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          {greeting}, <span className="text-brand-primary">{user.full_name || "کاربر عزیز"}</span>
        </h1>
        <p className="text-gray-400 mb-6">
          به داشبورد شخصی خود خوش آمدید. خلاصه فعالیت‌های شما در اینجا نمایش داده می‌شود.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-brand-primary" />
            </div>
            <div>
              <div className="text-sm text-gray-400">مشاوره‌ها</div>
              <div className="text-2xl font-bold">{consultationsCount}</div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/20 flex items-center justify-center">
              <Package className="w-6 h-6 text-brand-primary" />
            </div>
            <div>
              <div className="text-sm text-gray-400">سرویس‌ها</div>
              <div className="text-2xl font-bold">{servicesCount}</div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/20 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-brand-primary" />
            </div>
            <div>
              <div className="text-sm text-gray-400">مجموع پرداخت‌ها</div>
              <div className="text-2xl font-bold">{paymentsTotal.toLocaleString()} تومان</div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 glass-effect rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">فعالیت‌های اخیر</h2>
            <Link href="#" className="text-brand-primary text-sm">
              مشاهده همه
            </Link>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="font-medium">پرداخت موفق</div>
                  <div className="text-sm text-gray-400">دیروز</div>
                </div>
                <p className="text-sm text-gray-400">پرداخت شما برای مشاوره با موفقیت انجام شد.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center mt-1">
                <Calendar className="w-5 h-5 text-brand-primary" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="font-medium">مشاوره جدید</div>
                  <div className="text-sm text-gray-400">۲ روز پیش</div>
                </div>
                <p className="text-sm text-gray-400">یک جلسه مشاوره جدید برای شما ثبت شد.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mt-1">
                <Package className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="font-medium">سرویس جدید</div>
                  <div className="text-sm text-gray-400">هفته گذشته</div>
                </div>
                <p className="text-sm text-gray-400">سرویس طراحی وب با موفقیت برای شما فعال شد.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold mb-6">جلسات آینده</h2>

          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-brand-primary" />
                <div className="font-medium">مشاوره طراحی وب</div>
              </div>
              <div className="text-sm text-gray-400 mb-3">فردا، ساعت ۱۵:۰۰</div>
              <button className="w-full py-2 bg-brand-primary text-black rounded-xl text-sm font-medium">
                پیوستن به جلسه
              </button>
            </div>

            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-brand-primary" />
                <div className="font-medium">بررسی پروژه</div>
              </div>
              <div className="text-sm text-gray-400 mb-3">پنج‌شنبه، ساعت ۱۱:۰۰</div>
              <button className="w-full py-2 bg-white/10 text-white hover:bg-white/20 rounded-xl text-sm font-medium">
                یادآوری
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

