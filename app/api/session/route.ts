import { NextResponse } from "next/server"
import { redisGet, redisSet } from "@/lib/redis"
import { cookies } from "next/headers"

// Helper to get a unique session ID
function getSessionId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export async function GET(request: Request) {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get("site_session_id")

    let sessionId = sessionCookie?.value

    // If no session exists, create one
    if (!sessionId) {
      sessionId = getSessionId()
      cookieStore.set("site_session_id", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    }

    // Get session data from Redis
    const sessionData = await redisGet(`session:${sessionId}`)

    if (sessionData) {
      return NextResponse.json(sessionData)
    }

    // If no session data, create new default session
    const newSessionData = {
      id: sessionId,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      pageViews: 0,
      isLoggedIn: false,
    }

    // Store session in Redis with expiry
    await redisSet(`session:${sessionId}`, newSessionData, { ex: 60 * 60 * 24 * 30 }) // 30 days

    return NextResponse.json(newSessionData)
  } catch (error) {
    console.error("Session error:", error)
    return NextResponse.json({ error: "Session error" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get("site_session_id")
    const sessionId = sessionCookie?.value

    if (!sessionId) {
      return NextResponse.json({ error: "No session found" }, { status: 400 })
    }

    const updates = await request.json()

    // Get existing session
    const sessionData = await redisGet(`session:${sessionId}`)

    if (!sessionData) {
      return NextResponse.json({ error: "Session expired" }, { status: 400 })
    }

    // Update session with new data
    const updatedData = {
      ...sessionData,
      ...updates,
      lastActive: new Date().toISOString(),
    }

    // Store updated session
    await redisSet(`session:${sessionId}`, updatedData, { ex: 60 * 60 * 24 * 30 }) // 30 days

    return NextResponse.json(updatedData)
  } catch (error) {
    console.error("Session update error:", error)
    return NextResponse.json({ error: "Session update error" }, { status: 500 })
  }
}

