"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AuthCallbackPage() {
  const router = useRouter()
  const [seconds, setSeconds] = useState(5)

  useEffect(() => {
    if (seconds === 0) {
      router.push("/dashboard")
    }
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [seconds, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark-bg text-white">
      <div className="bg-brand-primary text-black rounded-xl px-8 py-6 shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-2">حساب کاربری شما با موفقیت فعال شد!</h1>
        <p className="mb-4">در حال انتقال به داشبورد... ({seconds})</p>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-brand-primary transition-all duration-1000"
            style={{ width: `${(seconds / 5) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
