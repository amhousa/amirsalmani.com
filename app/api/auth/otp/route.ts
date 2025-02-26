import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { sendSMS } from "@/lib/sms"

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
    const { phone } = await request.json()

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 })
    }

    // Generate a 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Create message
    const message = `کد تایید شما: ${otp}\nامیرحسین سلمانی`

    // First, store OTP in database
    const { error: dbError } = await supabase.from("otp_codes").insert({
      phone,
      code: otp,
      expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes expiry
    })

    if (dbError) {
      console.error("Database error:", dbError)
      throw new Error("Failed to store OTP")
    }

    // Then send SMS
    const smsResult = await sendSMS(phone, message)

    if (!smsResult.success) {
      // If SMS fails, delete the stored OTP
      await supabase.from("otp_codes").delete().eq("phone", phone).eq("code", otp)

      throw new Error("Failed to send SMS")
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error in OTP route:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

