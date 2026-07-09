// Market Data Service
// This will integrate with real APIs for stock market data
// Currently using structured data with fallbacks

export interface MarketQuote {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  open: number
  high: number
  low: number
  previousClose: number
  volume: number
  timestamp: string
  marketStatus: 'open' | 'closed' | 'pre-market'
}

// Market Hours (IST - Indian Standard Time)
const MARKET_HOURS = {
  open: { hour: 9, minute: 15 },
  close: { hour: 15, minute: 30 },
}

export function isMarketOpen(): boolean {
  const now = new Date()
  const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))

  const dayOfWeek = istTime.getDay()
  // 0 = Sunday, 1 = Monday, 5 = Friday, 6 = Saturday
  if (dayOfWeek === 0 || dayOfWeek === 6) return false

  const hours = istTime.getHours()
  const minutes = istTime.getMinutes()
  const currentTime = hours * 60 + minutes
  const openTime = MARKET_HOURS.open.hour * 60 + MARKET_HOURS.open.minute
  const closeTime = MARKET_HOURS.close.hour * 60 + MARKET_HOURS.close.minute

  return currentTime >= openTime && currentTime <= closeTime
}

export function getNextMarketOpen(): Date {
  const now = new Date()
  const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))

  let nextOpen = new Date(istTime)
  nextOpen.setHours(MARKET_HOURS.open.hour, MARKET_HOURS.open.minute, 0, 0)

  const dayOfWeek = istTime.getDay()
  if (dayOfWeek === 5) {
    // Friday - next opening is Monday
    nextOpen.setDate(nextOpen.getDate() + 3)
  } else if (dayOfWeek === 6) {
    // Saturday - next opening is Monday
    nextOpen.setDate(nextOpen.getDate() + 2)
  } else if (dayOfWeek === 0) {
    // Sunday - next opening is Monday
    nextOpen.setDate(nextOpen.getDate() + 1)
  } else if (istTime > nextOpen) {
    // After market hours today - add 1 day
    nextOpen.setDate(nextOpen.getDate() + 1)
  }

  return nextOpen
}

// Mock data - Replace with real API calls
export const mockMarketData = {
  indices: [
    {
      symbol: 'NIFTY50',
      name: 'NIFTY 50',
      price: 24580.50,
      change: 125.75,
      changePercent: 0.51,
      open: 24480.25,
      high: 24620.85,
      low: 24420.10,
      previousClose: 24454.75,
      volume: 12456789,
    },
    {
      symbol: 'SENSEX',
      name: 'SENSEX',
      price: 80925.35,
      change: 312.40,
      changePercent: 0.39,
      open: 80695.95,
      high: 81025.15,
      low: 80580.20,
      previousClose: 80612.95,
      volume: 9876543,
    },
    {
      symbol: 'BANKNIFTY',
      name: 'BANK NIFTY',
      price: 52145.25,
      change: 198.50,
      changePercent: 0.38,
      open: 51980.75,
      high: 52285.90,
      low: 51920.35,
      previousClose: 51946.75,
      volume: 8765432,
    },
    {
      symbol: 'FINNIFTY',
      name: 'FINNIFTY',
      price: 22485.80,
      change: 95.20,
      changePercent: 0.42,
      open: 22420.60,
      high: 22535.45,
      low: 22380.15,
      previousClose: 22390.60,
      volume: 6543210,
    },
    {
      symbol: 'MIDCAP50',
      name: 'MIDCAP 50',
      price: 11285.45,
      change: 82.35,
      changePercent: 0.73,
      open: 11215.10,
      high: 11320.90,
      low: 11180.75,
      previousClose: 11203.10,
      volume: 5432109,
    },
    {
      symbol: 'SMALLCAP50',
      name: 'SMALLCAP 50',
      price: 9875.60,
      change: -45.20,
      changePercent: -0.46,
      open: 9945.80,
      high: 10025.35,
      low: 9820.15,
      previousClose: 9920.80,
      volume: 4321098,
    },
  ],
}

// Real API Integration Template
export async function fetchMarketIndices(): Promise<MarketQuote[]> {
  try {
    // TODO: Replace with actual API call
    // Example: const response = await fetch('https://api.nse-india.com/api/indices')
    
    // For now, return mock data
    const marketOpen = isMarketOpen()
    
    return mockMarketData.indices.map((index) => ({
      ...index,
      timestamp: new Date().toISOString(),
      marketStatus: marketOpen ? 'open' : 'closed',
    })) as MarketQuote[]
  } catch (error) {
    console.error('Error fetching market indices:', error)
    throw new Error('Failed to fetch market data')
  }
}

export async function fetchQuote(symbol: string): Promise<MarketQuote | null> {
  try {
    // TODO: Replace with actual API call
    // Example: const response = await fetch(`https://api.nse-india.com/api/quote/${symbol}`)
    
    const index = mockMarketData.indices.find((i) => i.symbol === symbol)
    if (!index) return null

    const marketOpen = isMarketOpen()

    return {
      ...index,
      timestamp: new Date().toISOString(),
      marketStatus: marketOpen ? 'open' : 'closed',
    } as MarketQuote
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error)
    return null
  }
}

export interface OHLC {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export async function fetchChartData(symbol: string, timeframe: string): Promise<OHLC[]> {
  try {
    // TODO: Replace with actual API call to get historical data
    // Example: const response = await fetch(`https://api.nse-india.com/api/chart/${symbol}/${timeframe}`)
    
    // Generate mock OHLC data for demonstration
    const data: OHLC[] = []
    let basePrice = 24580
    let currentTime = Math.floor(Date.now() / 1000) - 86400 * 30 // 30 days ago

    for (let i = 0; i < 100; i++) {
      const open = basePrice + (Math.random() - 0.5) * 200
      const close = open + (Math.random() - 0.5) * 300
      const high = Math.max(open, close) + Math.random() * 100
      const low = Math.min(open, close) - Math.random() * 100

      data.push({
        time: currentTime,
        open,
        high,
        low,
        close,
        volume: Math.floor(Math.random() * 10000000),
      })

      basePrice = close
      currentTime += 3600 // 1 hour increment
    }

    return data
  } catch (error) {
    console.error(`Error fetching chart data for ${symbol}:`, error)
    return []
  }
}

// Cache management
interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

class DataCache {
  private cache: Map<string, CacheEntry<any>> = new Map()

  set<T>(key: string, data: T, ttlSeconds: number = 300): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlSeconds * 1000,
    })
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  clear(): void {
    this.cache.clear()
  }
}

export const dataCache = new DataCache()
