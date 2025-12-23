import { NextRequest, NextResponse } from 'next/server'

type AfdcStation = {
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const fuelTypes = searchParams.get('fuel_type') || 'ELEC,E85'
    const radius = searchParams.get('radius') || '30'
    const limit = searchParams.get('limit') || '50'
    const location = 'Seattle,WA'

    // Use env when available, otherwise fall back to provided key
    const apiKey = process.env.NREL_API_KEY || 'm2bTbPodAOWG8jnmXP5slZ3tm1iwMvh4ww5aWs5t'
    const url = new URL('https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json')
    url.searchParams.set('fuel_type', fuelTypes)
    url.searchParams.set('location', location)
    url.searchParams.set('radius', radius)
    url.searchParams.set('limit', limit)
    if (apiKey) url.searchParams.set('api_key', apiKey)

    const res = await fetch(url.toString(), { cache: 'no-store' })
    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: 'AFDC request failed', detail: text }, { status: 502 })
    }
    const data = await res.json()

    const stations: AfdcStation[] = (data?.fuel_stations || [])
      .filter((s: any) => s.latitude && s.longitude)
      .map((s: any) => ({
        id: s.id,
        station_name: s.station_name,
        fuel_type_code: s.fuel_type_code,
        latitude: s.latitude,
        longitude: s.longitude,
        street_address: s.street_address,
        city: s.city,
        state: s.state,
        zip: s.zip,
      }))

    return NextResponse.json({ stations })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to load stations' }, { status: 500 })
  }
}


