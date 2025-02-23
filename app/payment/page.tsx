"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Copy, ExternalLink, ArrowRight, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FormData {
  firstName: string
  lastName: string
  phone: string
  email: string
  website: string
  jobTitle: string
}

export default function Payment() {
  const searchParams = useSearchParams()
  const packageName = searchParams.get("package")
  const amount = searchParams.get("amount")
  const usdAmount = searchParams.get("usd")

  const [step, setStep] = useState(1)
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    website: "",
    jobTitle: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [transactionStatus, setTransactionStatus] = useState<"pending" | "success" | "failed">("pending")

  // Example Ethereum address - replace with your actual address
  const ethAddress = "0xCA20e9adF87541bAdc8a3e5d2f928128ea4b8d3B"

  useEffect(() => {
    if (timeLeft > 0 && step === 2) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, step])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (step === 2) {
      // Check transaction status every 30 seconds
      interval = setInterval(checkTransaction, 30000)
    }
    return () => clearInterval(interval)
  }, [step])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(ethAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email) {
      setError("لطفاً تمام فیلدهای ضروری را پر کنید")
      return false
    }
    if (!formData.email.includes("@")) {
      setError("لطفاً یک ایمیل معتبر وارد کنید")
      return false
    }
    if (!formData.phone.match(/^(\+98|0)?9\d{9}$/)) {
      setError("لطفاً یک شماره موبایل معتبر وارد کنید")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await fetch("/api/payment/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          packageName,
          amount,
          usdAmount,
        }),
      })

      if (response.ok) {
        setStep(2)
      } else {
        throw new Error("خطا در ثبت اطلاعات")
      }
    } catch (error) {
      setError("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.")
    } finally {
      setLoading(false)
    }
  }

  const checkTransaction = async () => {
    try {
      const response = await fetch("/api/payment/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: ethAddress,
          amount,
          formData,
        }),
      })

      const data = await response.json()
      if (data.status === "success") {
        setTransactionStatus("success")
        // Stop checking once successful
        return true
      }
    } catch (error) {
      console.error("Error checking transaction:", error)
    }
    return false
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-brand-primary">پرداخت {packageName}</h1>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? "bg-brand-primary" : "bg-gray-600"}`} />
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? "bg-brand-primary" : "bg-gray-600"}`} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                      نام *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-xl text-white focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                      نام خانوادگی *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-xl text-white focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    شماره موبایل *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    pattern="^(\+98|0)?9\d{9}$"
                    className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-xl text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    ایمیل *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-xl text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-1">
                    آدرس وب‌سایت
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-xl text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-300 mb-1">
                    عنوان شغلی
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-xl text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-primary text-white px-6 py-3 rounded-xl hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      مرحله بعد
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-4">
                <p className="text-gray-300">
                  لطفاً مبلغ {amount} ETH را به آدرس زیر ارسال کنید.
                  <br />
                  <span className="text-sm">معادل ${usdAmount}</span>
                </p>
              </div>

              <div className="bg-dark-bg border border-gray-800 rounded-2xl p-6 mb-8">
                <div className="flex justify-center mb-6">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ethereum:${ethAddress}?amount=${amount}`}
                    alt="QR Code"
                    className="w-48 h-48 bg-white p-2 rounded-xl"
                  />
                </div>

                <div className="relative mb-6">
                  <input
                    type="text"
                    value={ethAddress}
                    readOnly
                    className="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-gray-300 font-mono text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  {copied && (
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green-500 text-sm">
                      کپی شد!
                    </span>
                  )}
                </div>

                <div className="text-center">
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-white mb-1">${usdAmount}</p>
                    <p className="text-lg text-gray-400">{amount} ETH</p>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full mb-4">
                    <div
                      className="bg-brand-primary h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.max(0, Math.min(100, (timeLeft / 900) * 100))}%`,
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-300 mb-4">زمان باقی‌مانده: {formatTime(timeLeft)}</p>
                  <a
                    href={`https://etherscan.io/address/${ethAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-brand-primary hover:text-brand-primary/80 transition-colors"
                  >
                    مشاهده در EtherScan
                    <ExternalLink className="w-4 h-4 mr-1" />
                  </a>
                </div>
              </div>

              <div className="space-y-4 text-sm text-gray-300">
                <p>• پس از واریز وجه، تراکنش به صورت خودکار بررسی خواهد شد.</p>
                <p>• در صورت نیاز به راهنمایی با پشتیبانی تماس بگیرید.</p>
                <p>• مبلغ دقیقاً باید برابر با مقدار درخواستی باشد.</p>
              </div>

              {transactionStatus === "success" && (
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500 rounded-xl text-green-500 text-center">
                  پرداخت با موفقیت انجام شد. اطلاعات مشاوره به ایمیل شما ارسال خواهد شد.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

