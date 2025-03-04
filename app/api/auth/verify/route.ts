import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { redis } from "@/lib/redis"

// Initialize Supabase Admin client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role key for admin operations
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
)

export async function POST(request: Request) {
  try {
    const { phone, code } = await request.json()

    if (!phone || !code) {
      return NextResponse.json({ error: "Phone and code are required" }, { status: 400 })
    }

    // Check if OTP exists and is valid in Redis
    const storedOTP = await redis.get(`otp:${phone}`)

    if (!storedOTP || storedOTP !== code) {
      return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 })
    }

    // Delete used OTP from Redis
    await redis.del(`otp:${phone}`)

    // Get or create user
    let userId: string

    const { data: existingUser } = await supabase.from("profiles").select("id").eq("phone", phone).single()

    if (existingUser) {
      userId = existingUser.id
    } else {
      // Create new user
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        phone,
        phone_confirmed: true,
        email_confirm: true,
      })

      if (createError) throw createError
      userId = newUser.id
    }

    // Create new session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.admin.createSession({
      user_id: userId,
    })

    if (sessionError) throw sessionError

    // Set the session cookie
    const cookieStore = cookies()
    cookieStore.set("sb-access-token", session?.access_token || "", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
    cookieStore.set("sb-refresh-token", session?.refresh_token || "", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    return NextResponse.json({
      session,
      success: true,
    })
  } catch (error: any) {
    console.error("Error in verify route:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

