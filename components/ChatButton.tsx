"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, Send, X, Loader } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Auto-resize textarea
  const autoResizeTextarea = () => {
    if (inputRef.current) {
      const cursorPosition = inputRef.current.selectionStart
      // Reset height to auto to get the correct scrollHeight
      inputRef.current.style.height = "auto"
      // Set the height to scrollHeight to fit the content
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`
      // Restore cursor position
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = cursorPosition
          inputRef.current.selectionEnd = cursorPosition
        }
      }, 0)
    }
  }

  // Handle input change with auto-resize
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    autoResizeTextarea()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto"
    }

    setIsLoading(true)

    try {
      const allMessages = [...messages, userMessage]

      // Add a placeholder for the assistant's message
      setMessages((prev) => [...prev, { role: "assistant", content: "" }])

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: allMessages }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch from API")
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error("Response body is null")

      const decoder = new TextDecoder()
      let assistantMessage = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split("\n\n")

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6))
              if (data.content) {
                assistantMessage += data.content
                // Update the last message (which is the assistant's message)
                setMessages((prev) => [...prev.slice(0, -1), { role: "assistant", content: assistantMessage }])
              } else if (data.error) {
                // Handle error messages
                setMessages((prev) => [
                  ...prev.slice(0, -1),
                  { role: "assistant", content: "خطایی رخ داد. لطفاً دوباره تلاش کنید." },
                ])
                break
              }
            } catch (e) {
              console.error("Error parsing SSE data:", e)
            }
          }
        }
      }
    } catch (error) {
      console.error("Error calling AI API:", error)
      setMessages((prev) => {
        // If there's already an empty assistant message, replace it
        if (prev.length > 0 && prev[prev.length - 1].role === "assistant" && prev[prev.length - 1].content === "") {
          return [
            ...prev.slice(0, -1),
            { role: "assistant", content: "متأسفانه در ارتباط با هوش مصنوعی مشکلی پیش آمد. لطفاً دوباره تلاش کنید." },
          ]
        }
        // Otherwise add a new error message
        return [
          ...prev,
          { role: "assistant", content: "متأسفانه در ارتباط با هوش مصنوعی مشکلی پیش آمد. لطفاً دوباره تلاش کنید." },
        ]
      })
    } finally {
      setIsLoading(false)
      // Re-focus the input after sending
      inputRef.current?.focus() // Directly focus without setTimeout
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 left-4 z-50 w-12 h-12 rounded-full bg-brand-primary text-black shadow-lg flex items-center justify-center hover:bg-brand-primary-dark transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <MessageSquare className="w-5 h-5" />
      </motion.button>

      {/* Chat Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

            <motion.div
              className="relative w-full max-w-md h-[500px] bg-dark-bg border border-white/10 rounded-2xl shadow-xl overflow-hidden flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20">
                <h3 className="font-bold text-brand-primary">گفتگو با دستیار هوشمند</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-400 mt-8">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-brand-primary/50" />
                    <p>چطور می‌توانم به شما کمک کنم؟</p>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-xl p-3 ${
                          message.role === "user" ? "bg-brand-primary text-black" : "bg-white/10 text-white"
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm">
                          {message.content ||
                            (isLoading && message.role === "assistant" ? (
                              <Loader className="w-4 h-4 animate-spin" />
                            ) : null)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-black/20">
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    id="chat-input"
                    name="chat-input"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="پیام خود را بنویسید..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-white resize-none min-h-[44px] focus:outline-none focus:border-brand-primary"
                    rows={1}
                    style={{ overflow: "hidden" }}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="p-3 rounded-xl bg-brand-primary text-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
