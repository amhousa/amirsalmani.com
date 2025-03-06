"use client"

import DynamicChat from "@/components/DynamicChat"
import { motion } from "framer-motion"
import { MessageSquare, Code, User } from "lucide-react"
import MovingBackground from "@/components/MovingBackground"

export default function ChatDemo() {
  return (
    <div className="min-h-screen">
      <MovingBackground />

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4 text-brand-primary">گفتگوی هوشمند با دستیار</h1>
            <p className="text-xl text-gray-300">از دستیار هوشمند دیجیتال برای پاسخگویی به سؤالات خود استفاده کنید</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-2xl p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">گفتگوی طبیعی</h2>
                <p className="text-gray-300 mb-4">
                  این هوش مصنوعی توانایی درک و پاسخگویی به سؤالات پیچیده را دارد. از تکنولوژی پیشرفته Together AI با مدل
                  DeepSeek-V3 استفاده می‌کند تا تجربه گفتگویی طبیعی و روان را برایتان فراهم کند.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-8">
            <DynamicChat
              fullScreen={true}
              title="گفتگو با دستیار هوشمند"
              initialSystemPrompt="You are a helpful AI assistant for Amir Salmani's website. You are friendly, concise, and helpful. You speak Persian (Farsi) fluently, but can respond in English if asked. You know that Amir Salmani is a fullstack developer and consultant based in Iran. Your primary goal is to assist users with their questions and provide accurate information."
              className="shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="glass-effect-light rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-brand-primary" />
                </div>
                <h3 className="font-bold">کمک در برنامه‌نویسی</h3>
              </div>
              <p className="text-gray-400 text-sm">
                سؤالات خود در مورد توسعه وب، برنامه‌نویسی و مشکلات کدنویسی را بپرسید.
              </p>
            </div>

            <div className="glass-effect-light rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-brand-primary" />
                </div>
                <h3 className="font-bold">راهنمایی شخصی</h3>
              </div>
              <p className="text-gray-400 text-sm">
                مشاوره در زمینه‌های مختلف توسعه وب و بهترین شیوه‌های پیاده‌سازی پروژه‌ها.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

