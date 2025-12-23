'use client'

import { useEffect, useState } from 'react'

type Station = {
  id: number
  station_name: string
  fuel_type_code: string
  latitude: number
  longitude: number
  street_address?: string
  city?: string
  state?: string
  zip?: string
}

export default function StationsPanel() {
  const [stations, setStations] = useState<Station[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/stations')
        const json = await res.json()
        setStations(json.stations || [])
      } catch (e: any) {
        setError(e.message || 'Failed to load stations')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="glass-card p-4">Loading stations…</div>
  if (error) return <div className="glass-card p-4 text-red-400">{error}</div>

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-white">Seattle Stations (ELEC, E85)</h3>
        <span className="text-xs text-gray-300">{stations.length} results</span>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-gray-300">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Fuel</th>
              <th className="text-left p-2">Address</th>
              <th className="text-left p-2">Directions</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((s) => {
              const addr = [s.street_address, s.city, s.state, s.zip].filter(Boolean).join(', ')
              const dir = `https://www.google.com/maps/dir/?api=1&destination=${s.latitude},${s.longitude}`
              return (
                <tr key={s.id} className="border-t border-white/10 text-gray-200">
                  <td className="p-2">{s.station_name}</td>
                  <td className="p-2">{s.fuel_type_code}</td>
                  <td className="p-2">{addr}</td>
                  <td className="p-2"><a className="text-emerald-400 underline" href={dir} target="_blank" rel="noreferrer">Open</a></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}




