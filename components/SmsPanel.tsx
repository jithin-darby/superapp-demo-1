'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Star } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SmsPanel() {
  const [loading, setLoading] = useState(false)
  const [mobileNumber, setMobileNumber] = useState('')

  const handleSendSms = async () => {
    if (!mobileNumber) {
      toast.error('Please enter a mobile number')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/twilio/sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: mobileNumber,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send SMS')
      }

      toast.success('NPS Survey sent successfully!')
      setMobileNumber('')
    } catch (error: any) {
      toast.error(error.message || 'Failed to send SMS')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card"
    >
      <div className="flex items-center gap-3 mb-4">
        <MessageSquare className="w-6 h-6 text-emerald-400" />
        <h3 className="text-xl font-bold text-white">Send NPS SMS Survey</h3>
      </div>

      <div className="space-y-4">
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

        <div className="glass p-4 rounded-lg text-sm text-gray-300">
          <p className="font-semibold mb-2 text-gray-200">Preview:</p>
          <p>Hey there! 👋 This is EverGreen Works. Thanks for choosing us for your lawn care today!</p>
          <p className="mt-2">On a scale of 1 to 10, how likely are you to recommend us to your friends?</p>
          <p className="mt-2">Reply with a number (1 = Not likely, 10 = Definitely will!)</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSendSms}
          disabled={loading}
          className="w-full glass-button flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            'Sending...'
          ) : (
            <>
              <Star size={20} />
              Send NPS Survey
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}
