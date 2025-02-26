import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase-server"

export async function POST(request: Request) {
  try {
    const { phone, code } = await request.json()
    const supabase = createServerClient()

    // Check if OTP exists and is valid
    const { data: otpData, error: otpError } = await supabase
      .from("otp_codes")
      .select("*")
      .eq("phone", phone)
      .eq("code", code)
      .gt("expires_at", new Date().toISOString())
      .single()

    if (otpError || !otpData) {
      return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 })
    }

    // Delete used OTP
    await supabase.from("otp_codes").delete().eq("phone", phone)

    // Check if user exists
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.admin.getUserByPhone(phone)

    if (userError && userError.message !== "User not found") {
      throw userError
    }

    if (!user) {
      // Create new user
      const {
        data: { user: newUser },
        error: createError,
      } = await supabase.auth.admin.createUser({
        phone,
        phone_confirm: true,
      })

      if (createError) throw createError
    }

    // Generate session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.admin.createSession({
      phone,
    })

    if (sessionError) throw sessionError

    return NextResponse.json({
      session,
      success: true,
    })
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 })
  }
}

