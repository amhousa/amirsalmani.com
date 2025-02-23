"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Copy, ExternalLink } from "lucide-react"

export default function Payment() {
  const searchParams = useSearchParams()
  const packageName = searchParams.get("package")
  const amount = searchParams.get("amount")
  const usdAmount = searchParams.get("usd")
  const [copied, setCopied] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState("pending") // pending, success, failed
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds

  // Example Ethereum address - replace with your actual address
  const ethAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-brand-primary">پرداخت {packageName}</h1>
          <p className="text-gray-300">
            لطفاً مبلغ {amount} ETH را به آدرس زیر ارسال کنید.
            <br />
            <span className="text-sm">معادل ${usdAmount}</span>
            <br />
            پس از تأیید تراکنش، با شما تماس خواهیم گرفت.
          </p>
        </div>

        <div className="bg-dark-bg border border-gray-800 rounded-2xl p-6 mb-8">
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
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green-500 text-sm">کپی شد!</span>
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
      </div>
    </div>
  )
}

