"use client"

import type React from "react"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus("در حال ارسال...")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus("پیام شما با موفقیت ارسال شد.")
        setFormData({ name: "", email: "", message: "" })
      } else {
        throw new Error("خطا در ارسال فرم")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setStatus("متأسفانه در ارسال پیام خطایی رخ داد. لطفاً دوباره تلاش کنید.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-brand-primary">تماس با من</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-white">
            نام
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-dark-bg border-2 border-brand-purple rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-purple text-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-white">
            ایمیل
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-dark-bg border-2 border-brand-purple rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-purple text-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block mb-2 text-white">
            پیام
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-dark-bg border-2 border-brand-purple rounded-2xl h-32 focus:outline-none focus:ring-2 focus:ring-brand-purple text-white"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-brand-purple text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors"
          disabled={loading}
        >
          {loading ? "در حال ارسال..." : "ارسال پیام"}
        </button>
      </form>
      {status && <p className="mt-4 text-center font-semibold text-white">{status}</p>}
      <div className="mt-8 text-center">
        <h2 className="text-xl font-bold mb-4 text-brand-purple">راه‌های دیگر ارتباطی</h2>
        <p className="text-white">ایمیل: {process.env.NEXT_PUBLIC_CONTACT_EMAIL}</p>
      </div>
    </div>
  )
}

