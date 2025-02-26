"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { motion } from "framer-motion"
import { Phone, Lock, ArrowLeft } from "lucide-react"
import MovingBackground from "@/components/MovingBackground"

export default function LoginClient() {
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(0)
  const router = useRouter()
  const supabase = createClientComponentClient()

  // Format phone number to ensure it starts with 0
  const formatPhoneNumber = (value: string) => {
    // Remove any non-digit characters
    let digits = value.replace(/\D/g, "")

    // If the number starts with 98 or +98, remove it
    if (digits.startsWith("98")) {
      digits = digits.substring(2)
    }

    // Ensure number starts with 0
    if (!digits.startsWith("0")) {
      digits = "0" + digits
    }

    return digits
  }

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const formattedPhone = formatPhoneNumber(phone)

      // Validate phone number format
      if (!formattedPhone.match(/^09\d{9}$/)) {
        throw new Error("لطفاً یک شماره موبایل معتبر وارد کنید")
      }

      const response = await fetch("/api/auth/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: formattedPhone }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "خطا در ارسال کد تایید")
      }

      setStep("otp")
      startCountdown()
    } catch (error: any) {
      console.error("Error sending OTP:", error)
      setError(error.message || "خطا در ارسال کد تایید. لطفاً دوباره تلاش کنید.")
    } finally {
      setLoading(false)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const formattedPhone = formatPhoneNumber(phone)

      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: formattedPhone,
          code: otp,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "کد تایید نامعتبر است")
      }

      // Set the session
      await supabase.auth.setSession(data.session)

      // Redirect to dashboard
      router.push("/dashboard")
      router.refresh()
    } catch (error: any) {
      console.error("Error verifying OTP:", error)
      setError(error.message || "کد تایید نامعتبر است. لطفاً دوباره تلاش کنید.")
    } finally {
      setLoading(false)
    }
  }

  const startCountdown = () => {
    setCountdown(120) // 2 minutes countdown
    const timer = setInterval(() => {
      setCountdown((current) => {
        if (current <= 1) {
          clearInterval(timer)
          return 0
        }
        return current - 1
      })
    }, 1000)
  }

  const handleResendOtp = async () => {
    if (countdown > 0) return

    setError("")
    setLoading(true)

    try {
      const formattedPhone = formatPhoneNumber(phone)

      const response = await fetch("/api/auth/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: formattedPhone }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "خطا در ارسال مجدد کد تایید")
      }

      startCountdown()
    } catch (error: any) {
      console.error("Error resending OTP:", error)
      setError(error.message || "خطا در ارسال مجدد کد تایید. لطفاً دوباره تلاش کنید.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <MovingBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-effect rounded-2xl p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-brand-primary">ورود به حساب کاربری</h1>
          <p className="text-gray-400">
            {step === "phone"
              ? "لطفاً شماره موبایل خود را وارد کنید تا کد تایید برای شما ارسال شود."
              : "کد تایید ارسال شده به شماره موبایل خود را وارد کنید."}
          </p>
        </div>

        {step === "phone" ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">شماره موبایل</label>
              <div className="relative">
                <Phone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09123456789"
                  className="w-full pl-4 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary"
                  required
                  pattern="^(0|\+98|98)?9\d{9}$"
                  dir="ltr"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">مثال: 09123456789</p>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-brand-primary text-black rounded-xl font-medium hover:bg-opacity-90 transition-colors"
            >
              {loading ? (
                "در حال ارسال..."
              ) : (
                <>
                  دریافت کد تایید
                  <ArrowLeft className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-gray-400">کد تایید</label>
                <button type="button" onClick={() => setStep("phone")} className="text-sm text-brand-primary">
                  تغییر شماره موبایل
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="کد تایید را وارد کنید"
                  className="w-full pl-4 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary"
                  required
                  maxLength={6}
                  dir="ltr"
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-400">کد ۶ رقمی ارسال شده به شماره {phone} را وارد کنید</p>
                {countdown > 0 ? (
                  <span className="text-sm text-gray-400">
                    {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, "0")}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="text-sm text-brand-primary"
                  >
                    ارسال مجدد کد
                  </button>
                )}
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-brand-primary text-black rounded-xl font-medium hover:bg-opacity-90 transition-colors"
            >
              {loading ? (
                "در حال بررسی..."
              ) : (
                <>
                  ورود به حساب کاربری
                  <ArrowLeft className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  )
}

