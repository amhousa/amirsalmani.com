import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase-server"
import { sendSMS } from "@/lib/sms"

export async function POST(request: Request) {
  try {
    const { phone } = await request.json()

    // Generate a 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Create message
    const message = `کد تایید شما: ${otp}\nامیرحسین سلمانی`

    // Send SMS
    await sendSMS(phone, message)

    // Store OTP in Supabase
    const supabase = createServerClient()

    // Store OTP with expiration (5 minutes)
    const { error } = await supabase.from("otp_codes").insert({
      phone,
      code: otp,
      expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending OTP:", error)
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
  }
}

