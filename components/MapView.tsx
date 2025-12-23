'use client'

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

type Station = {
  id: number
  station_name: string
  fuel_type_code: string
  latitude: number
  longitude: number
}

export default function MapView() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [map, setMap] = useState<any>(null)
  const [stations, setStations] = useState<Station[]>([])

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!apiKey) {
      console.error('Google Maps API key not found. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local')
      setLoaded(true) // Set loaded to true to stop loading state
      return
    }

    if (!window.google) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`
      script.async = true
      script.defer = true
      window.initMap = initMap
      document.head.appendChild(script)
    } else if (mapRef.current) {
      initMap()
    }

    return () => {
      // Clean up the global function
      if ((window as any).initMap) {
        (window as any).initMap = undefined
      }
    }
  }, [])

  async function initMap() {
    if (!mapRef.current) return

    const seattle = { lat: 47.6062, lng: -122.3321 }

    const m = new window.google.maps.Map(mapRef.current, {
      center: seattle,
      zoom: 11,
      styles: [
        {
          featureType: 'all',
          elementType: 'geometry',
          stylers: [{ saturation: -100 }]
        }
      ]
    })
    setMap(m)
    setLoaded(true)

    // Center marker
    new window.google.maps.Marker({
      position: seattle,
      map: m,
      title: 'EverGreen Works - Seattle Operations',
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="%2322c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(40, 40)
      }
    })

    // Load stations
    try {
      const res = await fetch('/api/stations')
      const json = await res.json()
      setStations(json.stations || [])
      addStationMarkers(m, json.stations || [])
    } catch (e) {
      console.error('Failed to load stations', e)
    }
  }

  function addStationMarkers(m: any, list: Station[]) {
    if (!m || !window.google) return
    const info = new window.google.maps.InfoWindow()
    list.forEach((s) => {
      const color = s.fuel_type_code === 'ELEC' ? '#22c55e' : '#0ea5e9'
      const marker = new window.google.maps.Marker({
        position: { lat: s.latitude, lng: s.longitude },
        map: m,
        title: `${s.station_name} (${s.fuel_type_code})`,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(28, 28)
        }
      })

      marker.addListener('click', () => {
        const gmapsDir = `https://www.google.com/maps/dir/?api=1&destination=${s.latitude},${s.longitude}`
        info.setContent(`<div style="min-width:200px">
          <div style="font-weight:600;margin-bottom:4px">${s.station_name}</div>
          <div style="color:#64748b;margin-bottom:8px">Fuel: ${s.fuel_type_code}</div>
          <a href="${gmapsDir}" target="_blank" rel="noopener" style="color:#16a34a;font-weight:600">Get Directions</a>
        </div>`)
        info.open({ map: m, anchor: marker })
      })
    })
  }

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
          <p className="text-gray-500">Loading map...</p>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  )
}
