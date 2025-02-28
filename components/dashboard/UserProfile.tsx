"use client"

import type React from "react"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { User, Mail, Phone, Save } from "lucide-react"
import { showSuccess, showError } from "@/lib/toast"

export default function UserProfile({ user }: { user: any }) {
  const [formData, setFormData] = useState({
    full_name: user.full_name || "",
    email: user.email || "",
    phone: user.phone || "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.from("profiles").update(formData).eq("id", user.id)

      if (error) throw error

      showSuccess("Profile updated successfully")
    } catch (error) {
      console.error("Error updating profile:", error)
      showError("Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">پروفایل کاربری</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData((prev) => ({ ...prev, full_name: e.target.value }))}
              placeholder="نام و نام خانوادگی"
              className="w-full pr-10 py-2 px-4 rounded-xl bg-white/5 border border-white/10 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors"
            />
          </div>

          <div className="relative">
            <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="ایمیل"
              className="w-full pr-10 py-2 px-4 rounded-xl bg-white/5 border border-white/10 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors"
            />
          </div>

          <div className="relative">
            <Phone className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="شماره موبایل"
              className="w-full pr-10 py-2 px-4 rounded-xl bg-white/5 border border-white/10 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-brand-primary text-black py-3 px-6 rounded-xl font-medium hover:bg-brand-primary/90 transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            "در حال ذخیره..."
          ) : (
            <>
              <Save className="w-5 h-5" />
              ذخیره تغییرات
            </>
          )}
        </button>
      </form>
    </div>
  )
}

