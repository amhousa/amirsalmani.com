
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber } = body;
    if (!phoneNumber) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number.parseInt(process.env.MAIL_PORT || "465"),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Consultation Request" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_TO,
      subject: "New Consultation Request",
      html: `<h1>New Consultation Request</h1><p><strong>Phone Number:</strong> ${phoneNumber}</p>`,
    });

    return NextResponse.json({ message: "Request submitted successfully" });
  } catch (error) {
    console.error("Consultation request error:", error);
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}

