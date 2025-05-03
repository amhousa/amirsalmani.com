import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase-server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  const supabase = createServerClient()
  const body = await request.json()
  const { phoneNumber, email, name } = body

  try {
    // Get user session if exists
    const {
      data: { session },
    } = await supabase.auth.getSession()
    let userId = session?.user?.id

    // If no session, check if user exists by email
    if (!userId && email) {
      const { data: existingUser } = await supabase.from("profiles").select("id").eq("email", email).single()

      if (existingUser) {
        userId = existingUser.id
      } else {
        // Create new user profile
        const { data: newUser, error: createError } = await supabase
          .from("profiles")
          .insert([
            {
              email,
              phone: phoneNumber,
              full_name: name,
            },
          ])
          .select()
          .single()

        if (createError) throw createError
        userId = newUser.id
      }
    }

    // Store consultation request in database
    const { error: consultationError } = await supabase.from("consultations").insert([
      {
        user_id: userId,
        phone_number: phoneNumber,
        email,
        name,
        status: "pending",
      },
    ])

    if (consultationError) throw consultationError

    // Send email notification
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number.parseInt(process.env.MAIL_PORT || "465"),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"Consultation Request" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_TO,
      subject: "New Consultation Request",
      html: `
        <h1>New Consultation Request</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    })

    return NextResponse.json({
      message: "Request submitted successfully",
      userId,
    })
  } catch (error) {
    console.error("Consultation request error:", error)
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 })
  }
}

