"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Send, X, Loader2, RefreshCw, User, Bot } from "lucide-react"

type Message = {
  role: "user" | "assistant" | "system"
  content: string
}

interface DynamicChatProps {
  initialSystemPrompt?: string
  title?: string
  placeholder?: string
  buttonText?: string
  fullScreen?: boolean
  className?: string
}

// Function to convert URLs in text to clickable links
const convertLinksToAnchors = (text: string): React.ReactNode[] => {
  if (!text) return []
  
  // Regex to match URLs (with or without http/https)
  const urlRegex = /(https?:\/\/[^\s]+)|(\b(www\.)[^\s]+\b)/g
  
  // Split the text by URLs
  const parts = text.split(urlRegex)
  
  // Filter out undefined/empty parts and process each part
  const result: React.ReactNode[] = []
  let index = 0
  
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (!part) continue
    
    // If this part matches a URL, make it a link
    if (part.match(urlRegex) || part.startsWith('www.') || part.startsWith('http')) {
      let url = part
      
      // Add protocol if missing
      if (url.startsWith('www.') && !url.startsWith('http')) {
        url = 'https://' + url
      }
      
      result.push(
        <a 
          key={index++}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-primary underline hover:text-brand-primary-dark"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          {part}
        </a>
      )
    } else {
      result.push(<span key={index++}>{part}</span>)
    }
  }
  
  return result
}

export default function DynamicChat({
  initialSystemPrompt = `Provide information and assistance related to amirsalmani.com, including its purpose, services, and content, while maintaining a professional and approachable tone, and direct users to the Contact page for inquiries outside the scope of the website‛s content.
english name: amhousa
persian name: امحوسا
# Steps

1. **Understand the Query**: Determine the nature of the user‛s inquiry to provide a relevant response.
2. **Respond Based on Website Content**: If the query pertains to the website‛s sections (Home, About, Portfolio, Blog, Contact), provide accurate and concise information.
3. **Direct to Contact Page**: For queries outside the scope of the website‛s content, politely suggest contacting Amirhossein Salmani directly via the Contact page.
4. **Maintain Professional Tone**: Ensure all responses are friendly, approachable, and professional.

# Output Format

- **Relevant Information**: Direct answers to queries about the website‛s content and services.
- **Direction to Contact Page**: For queries that cannot be answered based on the website‛s content, provide a polite message suggesting contact via the Contact page.

# Examples

### Example 1
**Query**: What is the purpose of amirsalmani.com?
**Response**: amirsalmani.com is a platform showcasing Amirhossein Salmani‛s portfolio in web development and technology insights.

### Example 2
**Query**: How can I get in touch with Amirhossein Salmani for a custom web development project?
**Response**: For inquiries about custom projects or services not listed on the website, please visit the Contact page to reach out directly to Amirhossein Salmani.

### Example 3
**Query**: What are the key sections of amirsalmani.com?
**Response**: The key sections of amirsalmani.com include Home, About, Portfolio, Blog, and Contact, each providing unique insights into Amirhossein Salmani‛s work and services.

# Notes

- Ensure responses are concise and directly address the user‛s query.
- Consistently maintain a professional and friendly tone in all interactions.
- Direct users to the appropriate section of the website or the Contact page as necessary.
- Avoid providing speculative or unsubstantiated information; rely solely on the content available on amirsalmani.com.`,
  title = "گفتگو با دستیار هوشمند",
  placeholder = "پیام خود را بنویسید...",
  buttonText,
  fullScreen = false,
  className = "",
}: DynamicChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [systemPrompt, setSystemPrompt] = useState(initialSystemPrompt)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

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
      // Store current selection positions
      const selectionStart = inputRef.current.selectionStart
      const selectionEnd = inputRef.current.selectionEnd

      // Reset height to auto to get the correct scrollHeight
      inputRef.current.style.height = "auto"

      // Set the height to scrollHeight to fit the content
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`

      // Restore selection positions after React has updated the DOM
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.focus()
          inputRef.current.selectionStart = selectionStart
          inputRef.current.selectionEnd = selectionEnd
        }
      })
    }
  }

  // Handle input change with auto-resize
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    // Call autoResize after state update to ensure DOM is stable
    setTimeout(autoResizeTextarea, 0)
  }

  const handleResetChat = () => {
    if (confirm("آیا مطمئن هستید که می‌خواهید گفتگو را از اول شروع کنید؟")) {
      setMessages([])
    }
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
      const allMessages = [{ role: "system" as const, content: systemPrompt }, ...messages, userMessage]

      // Add a placeholder for the assistant's message
      setMessages((prev) => [...prev, { role: "assistant", content: "" }])

      // Use Together API directly
      const response = await fetch("/api/dynamic-chat/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: allMessages.filter((msg) => msg.role !== "system"),
          systemPrompt: systemPrompt,
        }),
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
                  {
                    role: "assistant",
                    content: "متأسفانه در ارتباط با هوش مصنوعی مشکلی پیش آمد. لطفاً دوباره تلاش کنید.",
                  },
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

  // New: helper function to parse markdown links [title](url) from text
  const parseMarkdownLinks = (text: string): React.ReactNode[] => {
    if (!text) return []
    
    // Regex for Markdown links [text](url)
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    const parts = text.split(markdownLinkRegex)
    
    const result: React.ReactNode[] = []
    let index = 0
    
    for (let i = 0; i < parts.length; i += 3) {
      // Regular text
      if (parts[i]) {
        // Process regular text for URLs
        const textNodes = convertLinksToAnchors(parts[i])
        textNodes.forEach(node => result.push(React.cloneElement(node as React.ReactElement, { key: `text-${index++}` })))
      }
      
      // If we have a markdown link (linkText, url)
      if (parts[i + 1] && parts[i + 2]) {
        result.push(
          <a
            key={`link-${index++}`}
            href={parts[i + 2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary underline hover:text-brand-primary-dark"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {parts[i + 1]}
          </a>
        )
      }
    }
    
    return result
  }

  const renderMessageContent = (content: string) => {
    // Process both markdown links and regular URLs
    return parseMarkdownLinks(content)
  }

  const ChatContent = () => (
    <div className={`flex flex-col ${fullScreen ? "h-full" : "h-[500px]"}`} style={{ justifyContent: 'flex-end', minHeight: 0, height: '100%' }}>
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20">
        <h3 className="font-bold text-brand-primary">{title}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleResetChat}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            title="شروع مجدد گفتگو"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          {!fullScreen && (
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-8">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-brand-primary/50" />
            <p>چطور می‌توانم به شما کمک کنم؟</p>
          </div>
        ) : (
          messages.map(
            (message, index) =>
              message.role !== "system" && (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        message.role === "user" ? "bg-brand-primary" : "bg-white/10"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-4 h-4 text-black" />
                      ) : (
                        <Bot className="w-4 h-4 text-brand-primary" />
                      )}
                    </div>
                                          <div
                      className={`rounded-xl p-3 ${
                        message.role === "user" ? "bg-brand-primary text-black" : "bg-white/10 text-white"
                      }`}
                    >
                      {message.content ? (
                        <div className="whitespace-pre-wrap text-sm">
                          {renderMessageContent(message.content)}
                        </div>
                      ) : (
                        isLoading && message.role === "assistant" ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : null
                      )}
                    </div>
                  </div>
                </div>
              ),
          )
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex items-end gap-2">
          <input
            id="chat-message"
            name="chat-message"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-brand-primary"
            autoComplete="off"
            autoFocus
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 rounded-xl bg-brand-primary text-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {buttonText ? buttonText : <Send className="w-5 h-5" />}
          </button>
        </div>
      </form>
    </div>
  )

  // For fullscreen mode, render directly
  if (fullScreen) {
    return (
      <div className={`bg-dark-bg border border-white/10 rounded-2xl shadow-xl overflow-hidden ${className}`}>
        <ChatContent />
      </div>
    )
  }

  // For floating button mode
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
        <img src="/images/astronaut.webp" className="w-10 h-10" />
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
              className={`relative w-full max-w-md bg-dark-bg border border-white/10 rounded-2xl shadow-xl overflow-hidden ${className}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ChatContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
