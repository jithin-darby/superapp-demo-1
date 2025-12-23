import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const { amount, mobileNumber } = await request.json()

    if (!amount || !mobileNumber) {
      return NextResponse.json(
        { error: 'Amount and mobile number are required' },
        { status: 400 }
      )
    }

    // Create a price first, then create payment link
    const price = await stripe.prices.create({
      unit_amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      product_data: {
        name: 'EverGreen Works Service Payment',
      },
    })

    // Create payment link
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
    })

    // Send SMS via Twilio
    try {
      const twilio = require('twilio')
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID || '',
        process.env.TWILIO_AUTH_TOKEN || ''
      )

      await client.messages.create({
        body: `Hello from EverGreen Works! Complete your payment here: ${paymentLink.url}`,
        from: process.env.TWILIO_PHONE_NUMBER || '',
        to: mobileNumber,
      })
      console.log('Payment link SMS sent successfully!')
    } catch (smsError: any) {
      console.error('SMS sending failed:', smsError.message)
      // Still return success if payment link was created, even if SMS fails
    }

    return NextResponse.json({
      success: true,
      paymentLink: paymentLink.url,
    })
  } catch (error: any) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create payment link' },
      { status: 500 }
    )
  }
}
