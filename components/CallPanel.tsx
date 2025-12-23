'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, PhoneCall } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CallPanel() {
  const [loading, setLoading] = useState(false)
  const customerNumber = '+91 8943657704'

  const handleCall = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/twilio/call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: customerNumber,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initiate call')
      }

      toast.success(`Calling ${customerNumber}...`)
    } catch (error: any) {
      toast.error(error.message || 'Failed to make call')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card"
    >
      <div className="flex items-center gap-3 mb-4">
        <Phone className="w-6 h-6 text-emerald-400" />
        <h3 className="text-xl font-bold text-white">Call Customer</h3>
      </div>

      <div className="space-y-4">
        <div className="glass px-4 py-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PhoneCall className="w-5 h-5 text-emerald-400" />
            <span className="text-gray-200 font-medium">{customerNumber}</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCall}
          disabled={loading}
          className="w-full glass-button flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            'Calling...'
          ) : (
            <>
              <PhoneCall size={20} />
              Call Now
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}
