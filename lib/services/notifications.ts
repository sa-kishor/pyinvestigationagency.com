// Notification service using Twilio for WhatsApp only
// Set up your Twilio credentials in environment variables:
// TWILIO_ACCOUNT_SID
// TWILIO_AUTH_TOKEN
// TWILIO_WHATSAPP_NUMBER (for WhatsApp)

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER

/**
 * Send WhatsApp message using Twilio
 * @param toNumber - Recipient WhatsApp number (format: +91XXXXXXXXXX)
 * @param message - WhatsApp message content
 */
export async function sendWhatsAppNotification(toNumber: string, message: string) {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_NUMBER) {
    console.warn('Twilio WhatsApp not configured. Skipping WhatsApp notification.')
    console.log(`[WHATSAPP NOT SENT] To: ${toNumber}\nMessage: ${message}`)
    return { success: false, reason: 'Twilio WhatsApp not configured' }
  }

  try {
    const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString(
      'base64'
    )

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`,
          To: `whatsapp:${toNumber}`,
          Body: message,
        }).toString(),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Twilio API error: ${errorData.message}`)
    }

    const data = await response.json()
    console.log(`WhatsApp message sent successfully to ${toNumber}. SID: ${data.sid}`)
    return { success: true, messageSid: data.sid }
  } catch (error) {
    console.error(`Failed to send WhatsApp to ${toNumber}:`, error)
    return { success: false, error }
  }
}

/**
 * Send visitor tracking notification via WhatsApp
 * Notifies owner when someone accesses the website
 */
export async function sendVisitorTrackingNotification() {
  const ownerNumbers = ['+919487979832', '+917200841992']
  const message = `📱 New Website Visitor!\n\nSomeone just accessed the Py Investigation Agency website.\n\nTime: ${new Date().toLocaleString()}`

  const results = []
  for (const number of ownerNumbers) {
    try {
      const result = await sendWhatsAppNotification(number, message)
      results.push(result)
    } catch (error) {
      console.error(`Failed to notify owner ${number}:`, error)
    }
  }

  return results
}
