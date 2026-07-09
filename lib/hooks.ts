'use client'

import { useState, useEffect } from 'react'
import type { MarketQuote, OHLC } from './market-data'

export function useMarketIndices() {
  const [indices, setIndices] = useState<MarketQuote[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [marketStatus, setMarketStatus] = useState<{
    isOpen: boolean
    nextOpenTime?: string
  }>({
    isOpen: false,
  })

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/market/indices')
      const json = await response.json()

      if (!json.success) throw new Error(json.error)

      setIndices(json.data)
      setMarketStatus(json.marketStatus)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // Refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return { indices, loading, error, marketStatus, refetch: fetchData }
}

export function useMarketQuote(symbol: string) {
  const [quote, setQuote] = useState<MarketQuote | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    if (!symbol) return

    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/market/quote/${symbol}`)
      const json = await response.json()

      if (!json.success) throw new Error(json.error)
      setQuote(json.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quote')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30 * 1000)
    return () => clearInterval(interval)
  }, [symbol])

  return { quote, loading, error, refetch: fetchData }
}

export function useChartData(symbol: string, timeframe: string = '1h') {
  const [data, setData] = useState<OHLC[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    if (!symbol) return

    try {
      setLoading(true)
      setError(null)
      const response = await fetch(
        `/api/market/chart/${symbol}?timeframe=${timeframe}`
      )
      const json = await response.json()

      if (!json.success) throw new Error(json.error)
      setData(json.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch chart data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [symbol, timeframe])

  return { data, loading, error, refetch: fetchData }
}
