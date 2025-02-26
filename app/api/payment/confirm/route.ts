import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  const body = await request.json()
  const { formData, amount, paymentMethod, packageName } = body

  try {
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
      subject: `New ${paymentMethod === "crypto" ? "Crypto" : "Card"} Payment Confirmation`,
      html: `
        <h1>New Payment Confirmation</h1>
        <h2>Client Information:</h2>
        <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Website:</strong> ${formData.website || "N/A"}</p>
        <p><strong>Job Title:</strong> ${formData.jobTitle || "N/A"}</p>
        <h2>Payment Details:</h2>
        <p><strong>Package:</strong> ${packageName}</p>
        <p><strong>Amount:</strong> ${amount.toLocaleString()} تومان</p>
        <p><strong>Payment Method:</strong> ${paymentMethod === "crypto" ? "Cryptocurrency" : "Card to Card"}</p>
        <p><strong>Status:</strong> Pending Verification</p>
      `,
    })

    // Email to client
    await transporter.sendMail({
      from: `"Payment Confirmation" <${process.env.MAIL_FROM}>`,
      to: formData.email,
      subject: "تأیید پرداخت شما",
      html: `
        <div dir="rtl" style="font-family: system-ui, -apple-system, sans-serif;">
          <h1>با تشکر از پرداخت شما</h1>
          <p>پرداخت شما با موفقیت ثبت شد و در حال بررسی است.</p>
          <h2>جزئیات پرداخت:</h2>
          <p><strong>بسته:</strong> ${packageName}</p>
          <p><strong>مبلغ:</strong> ${amount.toLocaleString()} تومان</p>
          <p><strong>روش پرداخت:</strong> ${paymentMethod === "crypto" ? "ارز دیجیتال" : "کارت به کارت"}</p>
          <p>پس از تأیید پرداخت، اطلاعات تکمیلی برای شما ارسال خواهد شد.</p>
          <p>در صورت هرگونه سؤال، می‌توانید به این ایمیل پاسخ دهید.</p>
        </div>
      `,
    })

    return NextResponse.json({ status: "success" })
  } catch (error) {
    console.error("Error sending confirmation emails:", error)
    return NextResponse.json({ status: "error" }, { status: 500 })
  }
}

