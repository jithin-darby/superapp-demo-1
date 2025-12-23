'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import WeatherCard from '@/components/WeatherCard'
import MapView from '@/components/MapView'
import StationsPanel from '@/components/StationsPanel'
import { MapPin } from 'lucide-react'

interface WeatherDay {
  name: string
  high: number
  low: number
  conditions: string
  icon: string
}

export default function HomePage() {
  const [weatherData, setWeatherData] = useState<WeatherDay[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock NOAA data - In production, you'd fetch from NOAA API
    const mockWeatherData: WeatherDay[] = [
      { name: 'Monday', high: 72, low: 58, conditions: 'Partly Cloudy', icon: 'cloudy' },
      { name: 'Tuesday', high: 68, low: 55, conditions: 'Sunny', icon: 'sunny' },
      { name: 'Wednesday', high: 65, low: 52, conditions: 'Rainy', icon: 'rainy' },
      { name: 'Thursday', high: 70, low: 57, conditions: 'Partly Cloudy', icon: 'cloudy' },
      { name: 'Friday', high: 73, low: 60, conditions: 'Sunny', icon: 'sunny' },
      { name: 'Saturday', high: 75, low: 62, conditions: 'Sunny', icon: 'sunny' },
      { name: 'Sunday', high: 71, low: 59, conditions: 'Windy', icon: 'windy' },
    ]

    // Simulate loading delay
    setTimeout(() => {
      setWeatherData(mockWeatherData)
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="min-h-screen p-6">
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto pt-20"
      >
        <div className="flex items-center gap-3 mb-8">
          <MapPin className="w-8 h-8 text-emerald-400" />
          <div>
            <h1 className="text-4xl font-bold text-white">
              EverGreen Works
            </h1>
            <p className="text-gray-300">Seattle Operations Dashboard</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Left Panel - Weather Forecast */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="glass-card p-4 mb-4">
              <h2 className="text-xl font-bold text-white mb-2">
                NOAA 7-Day Forecast
              </h2>
              <p className="text-sm text-gray-300">Seattle, WA</p>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="glass-card h-32 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {weatherData.map((day, index) => (
                  <WeatherCard key={index} day={day} index={index} />
                ))}
              </div>
            )}
          </motion.div>

          {/* Right Panel - Google Maps */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-6 h-[600px]"
          >
            <MapView />
          </motion.div>
        </div>

        <div className="mt-6">
          <StationsPanel />
        </div>
      </motion.div>
    </div>
  )
}
