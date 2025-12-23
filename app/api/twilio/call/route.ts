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

    // For testing: Use inline TwiML since localhost URLs don't work with Twilio
    // For production: Use a publicly accessible URL
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice" language="en-US">
    Hi. Welcome to Super App by Darby. We are happy to assist you. 
    This is an automated call system designed to help you with your needs. 
    Our team is dedicated to providing you with the best service possible. 
    We understand that your time is valuable, and we are committed to resolving your inquiries quickly and efficiently. 
    Please stay on the line and we will connect you with one of our representatives shortly. 
    Thank you for choosing Super App by Darby. We appreciate your business and look forward to serving you.
  </Say>
  <Pause length="2"/>
  <Say voice="alice" language="en-US">
    If you need immediate assistance, please press 1. Otherwise, please hold for the next available agent. 
    Someone will be with you shortly.
  </Say>
</Response>`
    
    // Create a call with inline TwiML (for localhost testing)
    const call = await client.calls.create({
      to: to,
      from: process.env.TWILIO_PHONE_NUMBER || '',
      twiml: twiml, // Use inline TwiML instead of URL
    })

    return NextResponse.json({
      success: true,
      callSid: call.sid,
      status: call.status,
    })
  } catch (error: any) {
    console.error('Twilio call error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to make call' },
      { status: 500 }
    )
  }
}
