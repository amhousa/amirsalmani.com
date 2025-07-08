"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Copy, ExternalLink, Loader2, CreditCard, Wallet, Check, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// ... (اینترفیس FormData و تایپ PaymentMethod بدون تغییر باقی می‌مانند) ...
interface FormData {
  firstName: string
  lastName: string
  phone: string
  email: string
  website: string
  jobTitle: string
}
type PaymentMethod = "crypto" | "card"


export default function Payment() {
  const searchParams = useSearchParams()
  const packageName = searchParams.get("package")
  const usdAmount = searchParams.get("usd")

  const baseAmountTomans = Number(usdAmount) * 91000

  const [step, setStep] = useState(1)
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(900)
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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("crypto")
  const [discountCode, setDiscountCode] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState(0)

  // --- تغییرات اصلی ---
  const [tonPriceInTomans, setTonPriceInTomans] = useState<number>(0)
  const [tonAmount, setTonAmount] = useState<number>(0)
  const [isPriceLoading, setIsPriceLoading] = useState(true)

  // خواندن آدرس کیف پول از فایل .env.local
  const tonAddress = process.env.NEXT_PUBLIC_TON_WALLET_ADDRESS || ""
  // --- پایان تغییرات ---

  const cardInfo = {
    number: "6362-1410-0836-8814",
    holder: "امیرحسین سلمانی",
    bank: "بانک آینده",
    image: "/images/payment/card.webp",
  }

  // --- دریافت قیمت از CoinMarketCap ---
  useEffect(() => {
    // اطمینان از وجود آدرس کیف پول قبل از ادامه
    if (!tonAddress) {
      console.error("Toncoin wallet address is not set in .env.local")
      setError("آدرس کیف پول میزبان تنظیم نشده است.")
      setIsPriceLoading(false)
      return
    }

    const fetchTonPrice = async () => {
      setIsPriceLoading(true)
      try {
        // برای این API نیاز به ساخت یک Endpoint در Next.js دارید تا کلید API شما در سمت کلاینت لو نرود
        // این یک route handler در مسیر /api/cmc-price خواهد بود
        const response = await fetch('/api/get-price')
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch price from server");
        }
        const data = await response.json();
        setTonPriceInTomans(data.price);

      } catch (error: any) {
        console.error("Error fetching Toncoin price:", error)
        setError(error.message);
      } finally {
        setIsPriceLoading(false)
      }
    }
    fetchTonPrice()
  }, [tonAddress]) // اجرای مجدد در صورت تغییر آدرس

  const calculateFinalAmount = () => {
    let amount = baseAmountTomans
    if (paymentMethod === "crypto") {
      amount = amount * 0.9 // 10% crypto discount
    }
    if (appliedDiscount > 0) {
      amount = amount * (1 - appliedDiscount / 100)
    }
    return Math.round(amount)
  }

  useEffect(() => {
    if (tonPriceInTomans > 0) {
      const finalTomans = calculateFinalAmount()
      const calculatedTonAmount = finalTomans / tonPriceInTomans
      setTonAmount(Number(calculatedTonAmount.toFixed(4)))
    }
  }, [tonPriceInTomans, appliedDiscount, paymentMethod, baseAmountTomans])

  useEffect(() => {
    if (timeLeft > 0 && step === 2) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, step])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {}
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    // ... (بقیه کدهای این بخش بدون تغییر باقی می‌ماند)
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

  const applyDiscountCode = () => {
    if (discountCode.toUpperCase() === "ITDAY20") {
      setAppliedDiscount(20) // 20% discount
      setError("")
    } else {
      setError("کد تخفیف نامعتبر است")
      setAppliedDiscount(0)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    // ... (بقیه کدهای این بخش بدون تغییر باقی می‌ماند)
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
          amount: calculateFinalAmount(),
          paymentMethod,
          appliedDiscount,
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

  const handlePaymentConfirmation = async () => {
    // ... (بقیه کدهای این بخش بدون تغییر باقی می‌ماند)
    setLoading(true)
    try {
      const response = await fetch("/api/payment/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
          amount: calculateFinalAmount(),
          paymentMethod,
          packageName,
        }),
      })

      if (response.ok) {
        setTransactionStatus("success")
      } else {
        throw new Error("خطا در تأیید پرداخت")
      }
    } catch (error) {
      setError("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.")
    } finally {
      setLoading(false)
    }
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
              {/* Payment Method Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod("crypto")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === "crypto"
                      ? "border-brand-primary bg-brand-primary/10"
                      : "border-gray-700 hover:border-brand-primary/50"
                  }`}
                >
                  <Wallet
                    className={`w-6 h-6 mx-auto mb-2 ${
                      paymentMethod === "crypto" ? "text-brand-primary" : "text-gray-400"
                    }`}
                  />
                  <div className={`text-sm ${paymentMethod === "crypto" ? "text-brand-primary" : "text-gray-300"}`}>
                    پرداخت با تون‌کوین
                    <span className="block text-xs text-brand-primary/70">۱۰٪ تخفیف</span>
                  </div>
                </button>
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === "card"
                      ? "border-brand-primary bg-brand-primary/10"
                      : "border-gray-700 hover:border-brand-primary/50"
                  }`}
                >
                  <CreditCard
                    className={`w-6 h-6 mx-auto mb-2 ${
                      paymentMethod === "card" ? "text-brand-primary" : "text-gray-400"
                    }`}
                  />
                  <div className={`text-sm ${paymentMethod === "card" ? "text-brand-primary" : "text-gray-300"}`}>
                    کارت به کارت
                  </div>
                </button>
              </div>

              {/* Price Display */}
              <div className="bg-dark-bg border border-gray-800 rounded-xl p-4 text-center">
                <div className="text-sm text-gray-400 mb-1">مبلغ قابل پرداخت:</div>
                <div className="text-2xl font-bold text-white mb-2">
                  {calculateFinalAmount().toLocaleString()} تومان
                </div>
                 {/* --- نمایش مبلغ به تون‌کوین و قیمت لحظه‌ای --- */}
                {paymentMethod === 'crypto' && !isPriceLoading && tonAmount > 0 && (
                  <div className="mt-1 text-xs text-gray-400">
                    <div>
                      (معادل تقریبی 💎 {tonAmount.toLocaleString('fa-IR')} تون‌کوین)
                    </div>
                    <div className="mt-2 opacity-70">
                      هر تون‌کوین ≈ {tonPriceInTomans.toLocaleString('fa-IR')} تومان
                    </div>
                  </div>
                )}
                {paymentMethod === 'crypto' && isPriceLoading && (
                  <div className="flex justify-center items-center gap-2 text-xs text-gray-400">
                    <Loader2 className="w-3 h-3 animate-spin"/>
                    <span>در حال دریافت قیمت تون‌کوین...</span>
                  </div>
                )}
                 {/* --- پایان بخش نمایش --- */}
                {(paymentMethod === "crypto" || appliedDiscount > 0) && (
                  <div className="text-sm text-gray-400 mt-2">
                    <span className="line-through">{baseAmountTomans.toLocaleString()} تومان</span>
                    {paymentMethod === "crypto" && (
                      <span className="text-brand-primary mr-2">۱۰٪ تخفیف کریپتو</span>
                    )}
                    {appliedDiscount > 0 && <span className="text-brand-primary mr-2">۲۰٪ تخفیف کد</span>}
                  </div>
                )}
              </div>

              {/* ... (بقیه کدهای فرم بدون تغییر باقی می‌ماند) ... */}
               {/* Discount Code */}
               <div className="flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="کد تخفیف"
                  className="flex-1 px-4 py-2 bg-dark-bg border border-gray-700 rounded-xl text-white focus:outline-none focus:border-brand-primary"
                />
                <button
                  onClick={applyDiscountCode}
                  className="px-4 py-2 bg-brand-primary/20 text-brand-primary rounded-xl hover:bg-brand-primary/30 transition-colors"
                >
                  اعمال
                </button>
              </div>

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
                  className="w-full bg-brand-primary text-black font-medium px-6 py-3 rounded-xl hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      مرحله بعد
                      <ArrowLeft className="w-5 h-5" />
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
                  {paymentMethod === "crypto" ? (
                    <>
                      لطفاً مبلغ 💎 {tonAmount.toLocaleString('fa-IR')} تون‌کوین را به آدرس زیر واریز کنید.
                    </>
                  ) : (
                    <>لطفاً مبلغ {calculateFinalAmount().toLocaleString()} تومان را به کارت زیر واریز نمایید.</>
                  )}
                </p>
              </div>

              <div className="bg-dark-bg border border-gray-800 rounded-2xl p-6 mb-8">
                {paymentMethod === "crypto" ? (
                  <>
                  {/* --- نمایش اطلاعات پرداخت با تون‌کوین --- */}
                    <div className="flex justify-center mb-6">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ton://transfer/${tonAddress}?amount=${Math.round(tonAmount * 1_000_000_000)}`}
                        alt="Toncoin QR Code"
                        className="w-48 h-48 bg-white p-2 rounded-xl"
                      />
                    </div>

                    <div className="relative mb-6">
                      <input
                        type="text"
                        value={tonAddress}
                        readOnly
                        className="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-gray-300 font-mono text-sm text-left"
                      />
                      <button
                        onClick={() => copyToClipboard(tonAddress)}
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
                  </>
                ) : (
                  <>
                    {/* ... (کد بخش کارت به کارت بدون تغییر) ... */}
                     <div className="flex justify-center mb-6">
                      <img
                        src={cardInfo.image || "/placeholder.svg"}
                        alt="Bank Card"
                        className="w-full max-w-[300px] rounded-xl shadow-lg"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="text"
                          value={cardInfo.number}
                          readOnly
                          className="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-gray-300 font-mono text-sm text-left"
                        />
                        <button
                          onClick={() => copyToClipboard(cardInfo.number)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                          <Copy className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-300">به نام: {cardInfo.holder}</p>
                        <p className="text-gray-400 text-sm">{cardInfo.bank}</p>
                      </div>
                    </div>
                  </>
                )}

                <div className="text-center mt-6">
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-white mb-1">
                      {calculateFinalAmount().toLocaleString()} تومان
                    </p>
                    {paymentMethod === "crypto" && tonAmount > 0 && (
                        <p className="text-sm text-brand-primary">
                          💎 {tonAmount.toLocaleString('fa-IR')} TON
                        </p>
                    )}
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
                  {paymentMethod === "crypto" && (
                    <a
                      href={`https://tonscan.org/address/${tonAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-brand-primary hover:text-brand-primary/80 transition-colors"
                    >
                      مشاهده در Tonscan
                      <ExternalLink className="w-4 h-4 mr-1" />
                    </a>
                  )}
                </div>
              </div>

              {/* ... (بقیه کدهای این بخش بدون تغییر باقی می‌ماند) ... */}
              <div className="space-y-4">
                <button
                  onClick={handlePaymentConfirmation}
                  disabled={loading || transactionStatus === "success"}
                  className={`w-full px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 ${
                    transactionStatus === "success"
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : "bg-brand-primary text-black hover:bg-opacity-90"
                  }`}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : transactionStatus === "success" ? (
                    <>
                      <Check className="w-5 h-5" />
                      پرداخت با موفقیت انجام شد
                    </>
                  ) : (
                    "پرداخت را انجام دادم"
                  )}
                </button>

                <div className="space-y-2 text-sm text-gray-300">
                  <p>• پس از واریز وجه، دکمه «پرداخت را انجام دادم» را بزنید.</p>
                  <p>• در صورت نیاز به راهنمایی با پشتیبانی تماس بگیرید.</p>
                  {paymentMethod === "card" && <p>• لطفاً دقیقاً مبلغ درخواستی را واریز کنید.</p>}
                </div>
              </div>

              {transactionStatus === "success" && (
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500 rounded-xl text-green-500 text-center">
                  پرداخت با موفقیت ثبت شد. اطلاعات مشاوره به ایمیل شما ارسال خواهد شد.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}