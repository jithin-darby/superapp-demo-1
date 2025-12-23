'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import PaymentPanel from '@/components/PaymentPanel'
import CallPanel from '@/components/CallPanel'
import SmsPanel from '@/components/SmsPanel'
import { Settings } from 'lucide-react'

export default function AdminPage() {
  return (
    <div className="min-h-screen p-6">
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto pt-20"
      >
        <div className="flex items-center gap-3 mb-8">
          <Settings className="w-8 h-8 text-emerald-400" />
          <div>
            <h1 className="text-4xl font-bold text-white">
              EverGreen Works
            </h1>
            <p className="text-gray-300">Admin Control Panel</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <PaymentPanel />
          <CallPanel />
          <SmsPanel />
        </div>
      </motion.div>
    </div>
  )
}
