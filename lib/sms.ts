// SMS service configuration
const SMS_CONFIG = {
  baseUrl: "http://ippanel.com/class/sms/webservice/send_url.php",
  from: process.env.SMS_FROM_NUMBER,
  username: process.env.SMS_USERNAME,
  password: process.env.SMS_PASSWORD,
}

export async function sendSMS(to: string, message: string) {
  try {
    // Remove any non-digit characters
    let phoneNumber = to.replace(/\D/g, "")

    // Remove +98 or 98 prefix and ensure it starts with 0
    if (phoneNumber.startsWith("98")) {
      phoneNumber = "0" + phoneNumber.substring(2)
    } else if (!phoneNumber.startsWith("0")) {
      phoneNumber = "0" + phoneNumber
    }

    // Validate phone number format (must be 11 digits starting with 09)
    if (!phoneNumber.match(/^09\d{9}$/)) {
      throw new Error("Invalid phone number format")
    }

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message)

    const url = `${SMS_CONFIG.baseUrl}?from=${SMS_CONFIG.from}&to=${phoneNumber}&msg=${encodedMessage}&uname=${SMS_CONFIG.username}&pass=${SMS_CONFIG.password}`

    const response = await fetch(url)
    const data = await response.text()

    // Log the response for debugging
    console.log("SMS API Response:", data)

    // Check response based on API documentation
    if (data.includes("OK")) {
      return { success: true }
    } else {
      throw new Error(`SMS sending failed: ${data}`)
    }
  } catch (error) {
    console.error("Error sending SMS:", error)
    throw error
  }
}

