// SMS service configuration
const SMS_CONFIG = {
    baseUrl: "http://ippanel.com/class/sms/webservice/send_url.php",
    from: process.env.SMS_FROM_NUMBER,
    username: process.env.SMS_USERNAME,
    password: process.env.SMS_PASSWORD,
  }
  
  export async function sendSMS(to: string, message: string) {
    // Remove any spaces, dashes, or other characters from phone number
    const cleanPhone = to.replace(/\D/g, "")
  
    // Remove +98 or 98 prefix if exists and add 0
    const formattedPhone = cleanPhone.replace(/^(98|\+98)/, "0")
  
    try {
      const params = new URLSearchParams({
        from: SMS_CONFIG.from!,
        to: formattedPhone,
        msg: message,
        uname: SMS_CONFIG.username!,
        pass: SMS_CONFIG.password!,
      })
  
      const response = await fetch(`${SMS_CONFIG.baseUrl}?${params.toString()}`)
      const data = await response.text()
  
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
  
  