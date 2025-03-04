import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { sendSMS } from "@/lib/sms"
import { redis } from "@/lib/redis"

// Initialize Supabase Admin client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export async function POST(request: Request) {
  try {
    const { phone } = await request.json()

    if (!phone) {
      return NextResponse.json({ error: "شماره موبایل الزامی است" }, { status: 400 })
    }

    // Generate a 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Create message
    const message = `کد تایید شما: ${otp}
امیرحسین سلمانی`

    try {
      // First try to send SMS
      const smsResult = await sendSMS(phone, message)

      if (smsResult.success) {
        // Store OTP in Redis with 5-minute expiration instead of database
        await redis.set(`otp:${phone}`, otp, { ex: 300 }) // 5 minutes expiry

        return NextResponse.json({ success: true })
      }
    } catch (error: any) {
      console.error("Error in sending SMS or storing OTP:", error)
      return NextResponse.json({ error: "خطا در ارسال پیامک. لطفاً دوباره تلاش کنید." }, { status: 500 })
    }
  } catch (error: any) {
    console.error("Error in OTP route:", error)
    return NextResponse.json({ error: error.message || "خطای داخلی سرور" }, { status: 500 })
  }
}

