"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Lock, Mail, User, AlertCircle } from "lucide-react"
import MovingBackground from "@/components/MovingBackground"
import { toast } from "sonner"

type LoginMethod = "phone" | "email"

export default function LoginClient() {
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("email") // Set email as default
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast.success("ورود موفقیت‌آمیز", {
        style: {
          background: "#00DC82",
          color: "black",
        },
      })
      router.push("/dashboard")
      router.refresh()
    } catch (error: any) {
      console.error("Error signing in:", error)
      if (error.message.includes("Invalid login credentials")) {
        setError("ایمیل یا رمز عبور اشتباه است")
      } else {
        setError(error.message || "خطا در ورود به حساب کاربری")
      }
      toast.error("خطا در ورود به حساب کاربری", {
        style: {
          background: "#ff4444",
          color: "white",
        },
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      // Sign in immediately after sign up since we don't require email verification
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      toast.success("ثبت نام موفقیت‌آمیز", {
        style: {
          background: "#00DC82",
          color: "black",
        },
      })
      router.push("/dashboard")
      router.refresh()
    } catch (error: any) {
      console.error("Error signing up:", error)
      if (error.message.includes("User already registered")) {
        setError("این ایمیل قبلاً ثبت شده است")
      } else {
        setError(error.message || "خطا در ثبت نام")
      }
      toast.error("خطا در ثبت نام", {
        style: {
          background: "#ff4444",
          color: "white",
        },
      })
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
          <p className="text-gray-400">خوش آمدید! لطفاً روش ورود خود را انتخاب کنید.</p>
        </div>

        {/* Login Method Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => {
              setLoginMethod("email")
              setError("")
            }}
            className={`flex-1 py-2 rounded-xl transition-colors ${
              loginMethod === "email" ? "bg-brand-primary text-black" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            ورود با ایمیل
          </button>
          <button
            onClick={() => {
              setError("")
              // Show coming soon message instead of changing login method
              setError("ورود با موبایل به زودی فعال خواهد شد...")
            }}
            className="flex-1 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 opacity-75"
          >
            ورود با موبایل (به زودی)
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key="email"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">ایمیل</label>
                <div className="relative">
                  <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    className="w-full pl-4 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary"
                    required
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">رمز عبور</label>
                <div className="relative">
                  <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="رمز عبور خود را وارد کنید"
                    className="w-full pl-4 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-xl">
                  <AlertCircle className="w-5 h-5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-3">
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
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleEmailSignUp}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-colors"
                >
                  {loading ? (
                    "در حال بررسی..."
                  ) : (
                    <>
                      ثبت نام با ایمیل
                      <User className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

