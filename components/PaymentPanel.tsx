'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Send } from 'lucide-react'
import toast from 'react-hot-toast'

export default function PaymentPanel() {
  const [amount, setAmount] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSendPayment = async () => {
    if (!amount || !mobileNumber) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/stripe/create-payment-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          mobileNumber,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment link')
      }

      toast.success(`Payment link sent to ${mobileNumber}!`)
      setAmount('')
      setMobileNumber('')
    } catch (error: any) {
      toast.error(error.message || 'Failed to send payment link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
    >
      <div className="flex items-center gap-3 mb-4">
        <CreditCard className="w-6 h-6 text-emerald-400" />
        <h3 className="text-xl font-bold text-white">Send Payment Link</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Amount (USD)
          </label>
          <input
            type="number"
            placeholder="100.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="glass-input w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Mobile Number
          </label>
          <input
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="glass-input w-full"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSendPayment}
          disabled={loading}
          className="w-full glass-button flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            'Sending...'
          ) : (
            <>
              <Send size={20} />
              Send Payment Link
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}
