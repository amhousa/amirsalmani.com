"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Phone } from "lucide-react"
import { showSuccess, showError } from "@/lib/toast"

export default function LoginClient() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phoneNumber,
      })

      if (error) throw error

      showSuccess("کد تایید به شماره موبایل شما ارسال شد")
      router.push("/verify")
    } catch (error) {
      console.error("Login error:", error)
      showError("خطا در ورود. لطفا دوباره تلاش کنید")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">ورود به حساب کاربری</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Phone className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="شماره موبایل"
              className="w-full pr-10 py-2 px-4 rounded-xl bg-white/5 border border-white/10 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-primary text-black py-3 px-6 rounded-xl font-medium hover:bg-brand-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "در حال ارسال..." : "دریافت کد تایید"}
          </button>
        </form>
      </div>
    </div>
  )
}

