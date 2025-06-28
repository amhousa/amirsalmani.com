import { Recipient, EmailParams, MailerSend } from "mailersend"

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || "",
})

type SendEmailParams = {
  to: string
  toName: string
  subject: string
  html: string
  text: string
}

export async function sendEmail({ to, toName, subject, html, text }: SendEmailParams) {
  const recipients = [new Recipient(to, toName)]

  const emailParams = new EmailParams()
    .setFrom(process.env.MAIL_FROM || "info@amirsalmani.com")
    .setFromName("امیرحسین سلمانی")
    .setRecipients(recipients)
    .setSubject(subject)
    .setHtml(html)
    .setText(text)

  try {
    await mailersend.send(emailParams)
    return { success: true }
  } catch (error) {
    console.error("MailerSend Error:", error)
    throw error
  }
}

export function generateConsultationEmail(phoneNumber: string) {
  return {
    subject: "درخواست مشاوره جدید",
    html: `
      <div style="direction: rtl; font-family: Vazirmatn, sans-serif;">
        <h1>درخواست مشاوره جدید</h1>
        <p><strong>شماره تماس:</strong> ${phoneNumber}</p>
      </div>
    `,
    text: `درخواست مشاوره جدید\n\nشماره تماس: ${phoneNumber}`,
  }
}

export function generateContactEmail(data: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}) {
  return {
    subject: `پیام جدید: ${data.subject}`,
    html: `
      <div style="direction: rtl; font-family: Vazirmatn, sans-serif;">
        <h1>پیام جدید از فرم تماس</h1>
        <p><strong>نام:</strong> ${data.name}</p>
        <p><strong>ایمیل:</strong> ${data.email}</p>
        <p><strong>تلفن:</strong> ${data.phone}</p>
        <p><strong>موضوع:</strong> ${data.subject}</p>
        <p><strong>پیام:</strong></p>
        <p>${data.message}</p>
      </div>
    `,
    text: `پیام جدید از فرم تماس\n\nنام: ${data.name}\nایمیل: ${data.email}\nتلفن: ${data.phone}\nموضوع: ${data.subject}\n\nپیام:\n${data.message}`,
  }
}

export function generateAutoReplyEmail(name: string, subject: string) {
  return {
    subject: "پیام شما دریافت شد",
    html: `
      <!DOCTYPE html>
      <html dir="rtl" lang="fa">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>پیام شما دریافت شد</title>
        <style>
          body {
            font-family: Vazirmatn, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #050301;
            color: #ffffff;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            padding: 20px;
            background: linear-gradient(135deg, rgba(0,220,130,0.15) 0%, rgba(0,220,130,0) 100%);
            border-radius: 12px;
            margin-bottom: 20px;
          }
          .content {
            background-color: rgba(255,255,255,0.05);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
          }
          .footer {
            text-align: center;
            color: rgba(255,255,255,0.6);
            font-size: 14px;
          }
          .highlight {
            color: #00DC82;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>پیام شما دریافت شد</h1>
          </div>
          <div class="content">
            <p>سلام ${name} عزیز،</p>
            <p>از تماس شما متشکرم. پیام شما با موضوع "${subject}" دریافت شد.</p>
            <p>در اسرع وقت به پیام شما پاسخ خواهم داد.</p>
            <p class="highlight">با تشکر،<br>امیرحسین سلمانی</p>
          </div>
          <div class="footer">
            <p>این یک ایمیل خودکار است. لطفاً به آن پاسخ ندهید.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `سلام ${name} عزیز،\n\nاز تماس شما متشکرم. پیام شما با موضوع "${subject}" دریافت شد.\n\nدر اسرع وقت به پیام شما پاسخ خواهم داد.\n\nبا تشکر،\nامیرحسین سلمانی\n\nاین یک ایمیل خودکار است. لطفاً به آن پاسخ ندهید.`,
  }
}

