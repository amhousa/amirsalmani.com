import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  const body = await request.json()
  const { address, amount, formData } = body

  try {
    // Here you would:
    // 1. Check the Ethereum network for the transaction
    // 2. Verify the payment amount matches
    // 3. If successful, send confirmation email

    // For demo purposes, let's simulate checking the blockchain
    const transactionFound = Math.random() > 0.5 // Simulate 50% success rate

    if (transactionFound) {
      // Send confirmation email
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number.parseInt(process.env.MAIL_PORT || "465"),
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      })

      // Email to admin
      await transporter.sendMail({
        from: `"Payment Notification" <${process.env.MAIL_FROM}>`,
        to: process.env.MAIL_TO,
        subject: "New Payment Received",
        html: `
          <h1>New Payment Received</h1>
          <h2>Client Information:</h2>
          <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Website:</strong> ${formData.website}</p>
          <p><strong>Job Title:</strong> ${formData.jobTitle}</p>
          <h2>Payment Details:</h2>
          <p><strong>Amount:</strong> ${amount} ETH</p>
          <p><strong>Address:</strong> ${address}</p>
        `,
      })

      // Email to client
      await transporter.sendMail({
        from: `"Consultation Confirmation" <${process.env.MAIL_FROM}>`,
        to: formData.email,
        subject: "Your Consultation Details",
        html: `
          <h1>Thank you for your payment!</h1>
          <p>Your consultation has been confirmed. Here are the next steps:</p>
          <ol>
            <li>We will contact you within 24 hours to schedule your consultation.</li>
            <li>Please prepare any specific questions or requirements you'd like to discuss.</li>
            <li>Make sure you have a stable internet connection for the online meeting.</li>
          </ol>
          <p>If you have any questions, feel free to reply to this email.</p>
        `,
      })

      return NextResponse.json({ status: "success" })
    }

    return NextResponse.json({ status: "pending" })
  } catch (error) {
    console.error("Error checking payment:", error)
    return NextResponse.json({ status: "error" }, { status: 500 })
  }
}

