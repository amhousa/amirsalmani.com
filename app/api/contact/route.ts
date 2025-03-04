import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { withRateLimit } from "@/lib/api-rate-limit"

export async function POST(request: Request) {
  // Apply rate limiting - allow 5 requests per 60 seconds per IP
  const rateLimitResponse = await withRateLimit(request, {
    limit: 5,
    window: 60,
  })

  if (rateLimitResponse) {
    return rateLimitResponse
  }

  const body = await request.json()

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number.parseInt(process.env.MAIL_PORT || "465"),
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.MAIL_FROM}>`,
    to: process.env.MAIL_TO,
    subject: "New Contact Form Submission",
    text: `
      Name: ${body.name}
      Email: ${body.email}
      Message: ${body.message}
    `,
    html: `
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Message:</strong> ${body.message}</p>
    `,
    headers: {
      "x-liara-tag": "portfolio_contact_form",
    },
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    return NextResponse.json({ message: "Email sent successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}

