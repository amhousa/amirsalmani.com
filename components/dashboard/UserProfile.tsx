"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Phone, MapPin, Briefcase, Save, Camera } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

type UserProfileProps = {
  user: any
}

export default function UserProfile({ user }: UserProfileProps) {
  const supabase = createClientComponentClient()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    full_name: user.full_name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    job_title: user.job_title || "",
    bio: user.bio || "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: "", type: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ text: "", type: "" })

    try {
      const { error } = await supabase.from("profiles").update(formData).eq("id", user.id)

      if (error) throw error

      setMessage({ text: "اطلاعات با موفقیت به‌روزرسانی شد", type: "success" })
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
      setMessage({ text: "خطا در به‌روزرسانی اطلاعات", type: "error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold"
      >
        پروفایل کاربری
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-effect rounded-2xl p-6"
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-brand-primary/20 flex items-center justify-center mb-4">
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url || "/placeholder.svg"}
                    alt={user.full_name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-brand-primary" />
                )}
              </div>

              <button className="absolute bottom-4 right-0 w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center">
                <Camera className="w-4 h-4 text-black" />
              </button>
            </div>

            <h2 className="text-xl font-bold">{user.full_name || "کاربر"}</h2>
            <p className="text-gray-400">{user.job_title || "عنوان شغلی"}</p>
          </div>

          {/* Profile Form */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">اطلاعات شخصی</h3>

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 rounded-lg text-sm font-medium"
                >
                  ویرایش
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 rounded-lg text-sm font-medium"
                >
                  انصراف
                </button>
              )}
            </div>

            {message.text && (
              <div
                className={`p-3 rounded-lg mb-4 ${
                  message.type === "success" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">نام و نام خانوادگی</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary"
                    />
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                      <User className="w-5 h-5 text-gray-400" />
                      <span>{user.full_name || "تعیین نشده"}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">ایمیل</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary"
                    />
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span>{user.email || "تعیین نشده"}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">شماره موبایل</label>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span>{user.phone || "تعیین نشده"}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">عنوان شغلی</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="job_title"
                      value={formData.job_title}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary"
                    />
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                      <Briefcase className="w-5 h-5 text-gray-400" />
                      <span>{user.job_title || "تعیین نشده"}</span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">آدرس</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary"
                    />
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>{user.address || "تعیین نشده"}</span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">درباره من</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary"
                    ></textarea>
                  ) : (
                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl min-h-[100px]">
                      {user.bio || "اطلاعاتی وارد نشده است."}
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 py-2 bg-brand-primary text-black rounded-lg font-medium"
                >
                  {loading ? (
                    "در حال ذخیره..."
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      ذخیره تغییرات
                    </>
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

