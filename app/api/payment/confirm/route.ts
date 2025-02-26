import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Email templates
const userEmailTemplate = (data: {
  packageName: string
  amount: number
  paymentMethod: string
}) => `
<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>تأیید پرداخت</title>
  <style>
    /* Reset styles for email clients */
    body, table, td, div, p, a {
      font-family: Vazirmatn, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;
    }
    
    /* Dark theme colors */
    .body {
      background-color: #050301;
      margin: 0;
      padding: 0;
      width: 100%;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #0A0605;
    }
    
    .header {
      text-align: center;
      padding: 30px 0;
      background: linear-gradient(135deg, rgba(0,220,130,0.15) 0%, rgba(0,220,130,0) 100%);
      border-radius: 12px;
      margin-bottom: 30px;
    }
    
    .logo {
      width: 80px;
      height: 80px;
      margin-bottom: 20px;
    }
    
    .title {
      color: #00DC82;
      font-size: 24px;
      font-weight: bold;
      margin: 0;
      padding: 0;
    }
    
    .content {
      background-color: rgba(255,255,255,0.05);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 30px;
    }
    
    .details {
      border-spacing: 0;
      width: 100%;
      margin-bottom: 20px;
    }
    
    .details td {
      padding: 12px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    
    .details td:first-child {
      color: rgba(255,255,255,0.6);
      width: 40%;
    }
    
    .details td:last-child {
      color: #ffffff;
    }
    
    .button {
      display: inline-block;
      padding: 14px 28px;
      background-color: #00DC82;
      color: #000000;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      margin-top: 20px;
    }
    
    .footer {
      text-align: center;
      color: rgba(255,255,255,0.4);
      font-size: 14px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }

    .status-pending {
      color: #00DC82;
      font-weight: bold;
    }

    @media only screen and (max-width: 600px) {
      .container {
        padding: 10px;
      }
      
      .content {
        padding: 16px;
      }
    }
  </style>
</head>
<body>
  <div class="body">
    <div class="container">
      <div class="header">
        <img src="https://amirsalmani.com/icon.svg" alt="لوگو" class="logo">
        <h1 class="title">با تشکر از پرداخت شما</h1>
      </div>
      
      <div class="content">
        <p style="color: #ffffff; margin-bottom: 24px;">
          پرداخت شما با موفقیت ثبت شد و در حال بررسی است.
        </p>
        
        <table class="details">
          <tr>
            <td>بسته:</td>
            <td>${data.packageName}</td>
          </tr>
          <tr>
            <td>مبلغ:</td>
            <td>${data.amount.toLocaleString()} تومان</td>
          </tr>
          <tr>
            <td>روش پرداخت:</td>
            <td>${data.paymentMethod === "crypto" ? "ارز دیجیتال" : "کارت به کارت"}</td>
          </tr>
          <tr>
            <td>وضعیت:</td>
            <td><span class="status-pending">در حال بررسی</span></td>
          </tr>
        </table>
        
        <p style="color: #ffffff; margin-bottom: 24px;">
          پس از تأیید پرداخت، اطلاعات تکمیلی برای شما ارسال خواهد شد.
        </p>
        
        <center>
          <a href="https://amirsalmani.com/dashboard" class="button">
            مشاهده وضعیت سفارش
          </a>
        </center>
      </div>
      
      <div class="footer">
        <p>
          در صورت هرگونه سؤال، می‌توانید به این ایمیل پاسخ دهید.
        </p>
        <p style="margin-top: 12px;">
          © ${new Date().getFullYear()} امیرحسین سلمانی. تمامی حقوق محفوظ است.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`

const adminEmailTemplate = (data: {
  formData: any
  packageName: string
  amount: number
  paymentMethod: string
}) => `
<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>اعلان پرداخت جدید</title>
  <style>
    /* Reset styles for email clients */
    body, table, td, div, p, a {
      font-family: Vazirmatn, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;
    }
    
    /* Dark theme colors */
    .body {
      background-color: #050301;
      margin: 0;
      padding: 0;
      width: 100%;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #0A0605;
    }
    
    .header {
      text-align: center;
      padding: 30px 0;
      background: linear-gradient(135deg, rgba(0,220,130,0.15) 0%, rgba(0,220,130,0) 100%);
      border-radius: 12px;
      margin-bottom: 30px;
    }
    
    .title {
      color: #00DC82;
      font-size: 24px;
      font-weight: bold;
      margin: 0;
      padding: 0;
    }
    
    .content {
      background-color: rgba(255,255,255,0.05);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 30px;
    }
    
    .section-title {
      color: #00DC82;
      font-size: 18px;
      margin: 0 0 16px 0;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(0,220,130,0.2);
    }
    
    .details {
      border-spacing: 0;
      width: 100%;
      margin-bottom: 20px;
    }
    
    .details td {
      padding: 12px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    
    .details td:first-child {
      color: rgba(255,255,255,0.6);
      width: 40%;
    }
    
    .details td:last-child {
      color: #ffffff;
    }
    
    .button {
      display: inline-block;
      padding: 14px 28px;
      background-color: #00DC82;
      color: #000000;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      margin-top: 20px;
    }
    
    .footer {
      text-align: center;
      color: rgba(255,255,255,0.4);
      font-size: 14px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }

    .status-pending {
      color: #00DC82;
      font-weight: bold;
    }

    @media only screen and (max-width: 600px) {
      .container {
        padding: 10px;
      }
      
      .content {
        padding: 16px;
      }
    }
  </style>
</head>
<body>
  <div class="body">
    <div class="container">
      <div class="header">
        <img src="https://amirsalmani.com/icon.svg" alt="لوگو" class="logo">
        <h1 class="title">پرداخت جدید دریافت شد</h1>
      </div>
      
      <div class="content">
        <h2 class="section-title">اطلاعات مشتری</h2>
        <table class="details">
          <tr>
            <td>نام و نام خانوادگی:</td>
            <td>${data.formData.firstName} ${data.formData.lastName}</td>
          </tr>
          <tr>
            <td>ایمیل:</td>
            <td>${data.formData.email}</td>
          </tr>
          <tr>
            <td>شماره تماس:</td>
            <td>${data.formData.phone}</td>
          </tr>
          <tr>
            <td>وب‌سایت:</td>
            <td>${data.formData.website || "ندارد"}</td>
          </tr>
          <tr>
            <td>عنوان شغلی:</td>
            <td>${data.formData.jobTitle || "ندارد"}</td>
          </tr>
        </table>
        
        <h2 class="section-title">جزئیات پرداخت</h2>
        <table class="details">
          <tr>
            <td>بسته:</td>
            <td>${data.packageName}</td>
          </tr>
          <tr>
            <td>مبلغ:</td>
            <td>${data.amount.toLocaleString()} تومان</td>
          </tr>
          <tr>
            <td>روش پرداخت:</td>
            <td>${data.paymentMethod === "crypto" ? "ارز دیجیتال" : "کارت به کارت"}</td>
          </tr>
          <tr>
            <td>وضعیت:</td>
            <td><span class="status-pending">نیازمند بررسی</span></td>
          </tr>
        </table>
        
        <center>
          <a href="https://amirsalmani.com/admin/payments" class="button">
            مدیریت پرداخت‌ها
          </a>
        </center>
      </div>
      
      <div class="footer">
        <p>
          این ایمیل به صورت خودکار ارسال شده است. لطفاً به آن پاسخ ندهید.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`

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
      subject: `پرداخت جدید - ${paymentMethod === "crypto" ? "ارز دیجیتال" : "کارت به کارت"}`,
      html: adminEmailTemplate({
        formData,
        packageName,
        amount,
        paymentMethod,
      }),
    })

    // Email to client
    await transporter.sendMail({
      from: `"امیرحسین سلمانی" <${process.env.MAIL_FROM}>`,
      to: formData.email,
      subject: "تأیید پرداخت شما",
      html: userEmailTemplate({
        packageName,
        amount,
        paymentMethod,
      }),
    })

    return NextResponse.json({ status: "success" })
  } catch (error) {
    console.error("Error sending confirmation emails:", error)
    return NextResponse.json({ status: "error" }, { status: 500 })
  }
}

