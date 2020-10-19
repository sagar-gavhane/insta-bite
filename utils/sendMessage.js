export default async function sendMessage({ to, body }) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const client = require('twilio')(accountSid, authToken)

  await client.messages.create({
    body: body,
    from: 'whatsapp:+14155238886',
    to: to ? `whatsapp:+91${to}` : `whatsapp:+918624040905`,
  })
}
