'use client'

import { motion } from 'framer-motion'
import { Calendar, Droplet, Wind, Cloud } from 'lucide-react'

interface WeatherDay {
  name: string
  high: number
  low: number
  conditions: string
  icon: string
}

interface WeatherCardProps {
  day: WeatherDay
  index: number
}

export default function WeatherCard({ day, index }: WeatherCardProps) {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const today = new Date().getDay()
  const displayName = index === 0 ? 'Today' : dayNames[(today + index) % 7]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card"
    >
      <div className="flex flex-col items-center text-center gap-2">
        <p className="text-sm font-semibold text-gray-200">{displayName}</p>
        <div className="text-3xl font-bold text-emerald-400">
          {day.high}°<span className="text-xl text-gray-400">/{day.low}°</span>
        </div>
        <div className="flex items-center gap-1 text-gray-300 text-sm">
          {day.conditions}
        </div>
        <div className="mt-2">
          {day.icon === 'sunny' && <Calendar className="w-8 h-8 text-yellow-400" />}
          {day.icon === 'cloudy' && <Cloud className="w-8 h-8 text-gray-400" />}
          {day.icon === 'rainy' && <Droplet className="w-8 h-8 text-blue-400" />}
          {day.icon === 'windy' && <Wind className="w-8 h-8 text-gray-400" />}
        </div>
      </div>
    </motion.div>
  )
}
