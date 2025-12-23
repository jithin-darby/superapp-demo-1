import { NextResponse } from 'next/server'

export async function GET() {
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

  return new NextResponse(twiml, {
    status: 200,
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
