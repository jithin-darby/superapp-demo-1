import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { to } = await request.json()

    if (!to) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    // Twilio credentials from environment variables
    const twilio = require('twilio')
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID || '',
      process.env.TWILIO_AUTH_TOKEN || ''
    )

    const message = `Hey there! 👋 This is EverGreen Works. Thanks for choosing us for your lawn care today!
On a scale of 1 to 10, how likely are you to recommend us to your friends?
Reply with a number (1 = Not likely, 10 = Definitely will!)`

    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER || ''
    console.log('Sending SMS to:', to)
    console.log('From:', twilioPhoneNumber)
    console.log('Message:', message)

    const sms = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: to,
    })

    console.log('SMS sent successfully!')
    console.log('Message SID:', sms.sid)
    console.log('Status:', sms.status)
    console.log('To:', sms.to)
    console.log('Error Code:', sms.errorCode)
    console.log('Error Message:', sms.errorMessage)

    return NextResponse.json({
      success: true,
      messageSid: sms.sid,
      status: sms.status,
    })
  } catch (error: any) {
    console.error('Twilio SMS error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send SMS' },
      { status: 500 }
    )
  }
}
