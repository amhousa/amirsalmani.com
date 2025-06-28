import { Redis } from "@upstash/redis"
import { cookies } from "next/headers"
import { nanoid } from "nanoid"

const redis = new Redis({
  url: process.env.REDIS_URL || "",
  token: process.env.REDIS_TOKEN || "",
})

const SESSION_TTL = 60 * 60 * 24 * 7 // 1 week in seconds

export async function getSession<T = any>(): Promise<T | null> {
  const cookieStore = cookies()
  const sessionId = cookieStore.get("session_id")?.value

  if (!sessionId) {
    return null
  }

  try {
    const session = await redis.get(`session:${sessionId}`)
    return session as T
  } catch (error) {
    console.error("Session get error:", error)
    return null
  }
}

export async function setSession<T>(data: T): Promise<string> {
  const cookieStore = cookies()
  let sessionId = cookieStore.get("session_id")?.value

  if (!sessionId) {
    sessionId = nanoid()
    cookieStore.set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: SESSION_TTL,
      path: "/",
      sameSite: "lax",
    })
  }

  try {
    await redis.set(`session:${sessionId}`, data, { ex: SESSION_TTL })
    return sessionId
  } catch (error) {
    console.error("Session set error:", error)
    throw error
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = cookies()
  const sessionId = cookieStore.get("session_id")?.value

  if (sessionId) {
    try {
      await redis.del(`session:${sessionId}`)
      cookieStore.delete("session_id")
    } catch (error) {
      console.error("Session destroy error:", error)
    }
  }
}

