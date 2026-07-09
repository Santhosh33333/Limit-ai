'use client'

import Link from 'next/link'
import { ArrowLeft, Download, Share2, Maximize2 } from 'lucide-react'
import { useChartData } from '@/lib/hooks'
import { use } from 'react'

interface PageProps {
  params: Promise<{ symbol: string }>
}

const TIMEFRAMES = ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w', '1M']
const CHART_TYPES = ['Candlestick', 'Line', 'Area']
const INDICATORS = ['EMA', 'SMA', 'VWAP', 'MACD', 'RSI', 'Bollinger Bands']

export default function ChartPage({ params }: PageProps) {
  const { symbol } = use(params)
  const [timeframe, setTimeframe] = React.useState('1h')
  const [chartType, setChartType] = React.useState('Candlestick')
  const [selectedIndicators, setSelectedIndicators] = React.useState<string[]>([])

  const { data: chartData, loading, error } = useChartData(symbol, timeframe)

  const toggleIndicator = (indicator: string) => {
    setSelectedIndicators((prev) =>
      prev.includes(indicator) ? prev.filter((i) => i !== indicator) : [...prev, indicator]
    )
  }

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{symbol}</h1>
              <p className="text-sm text-muted-foreground">Advanced charting with technical analysis</p>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Timeframes */}
            <div className="flex gap-2 flex-wrap">
              {TIMEFRAMES.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1.5 text-sm rounded transition-colors ${
                    timeframe === tf
                      ? 'bg-[#10B981] text-white'
                      : 'bg-white/10 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Chart Type */}
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="px-3 py-1.5 bg-white/10 border border-white/20 rounded text-sm focus:outline-none focus:border-[#10B981]"
            >
              {CHART_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {/* Actions */}
            <div className="ml-auto flex gap-2">
              <button className="p-1.5 hover:bg-white/10 rounded transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-1.5 hover:bg-white/10 rounded transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-1.5 hover:bg-white/10 rounded transition-colors">
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Chart Container */}
        <div className="glass-card p-6 mb-6 min-h-[500px] flex items-center justify-center">
          {loading ? (
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-white/20 border-t-[#10B981] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading chart data...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-red-400 font-medium mb-2">Error Loading Chart</p>
              <p className="text-muted-foreground text-sm">{error}</p>
            </div>
          ) : chartData.length === 0 ? (
            <div className="text-center">
              <p className="text-muted-foreground">No chart data available</p>
              <p className="text-xs text-muted-foreground mt-2">Real data integration coming soon</p>
            </div>
          ) : (
            <div className="w-full h-full text-center text-muted-foreground">
              <p className="mb-4">TradingView Lightweight Charts integration</p>
              <p className="text-sm">Chart rendering with {chartData.length} candles</p>
              <p className="text-sm mt-2">Timeframe: {timeframe} | Type: {chartType}</p>
            </div>
          )}
        </div>

        {/* Indicators */}
        <div className="glass-card p-6 mb-6">
          <h3 className="font-semibold mb-4">Technical Indicators</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {INDICATORS.map((indicator) => (
              <button
                key={indicator}
                onClick={() => toggleIndicator(indicator)}
                className={`px-3 py-2 rounded text-sm transition-colors ${
                  selectedIndicators.includes(indicator)
                    ? 'bg-[#10B981] text-white'
                    : 'bg-white/10 hover:bg-white/20 border border-white/20'
                }`}
              >
                {indicator}
              </button>
            ))}
          </div>
        </div>

        {/* Volume Chart */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Volume</h3>
          <div className="h-32 bg-white/5 rounded flex items-center justify-center text-muted-foreground">
            Volume chart visualization
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur border-t border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-around">
          <NavItem icon="📊" label="Market" href="/" />
          <NavItem icon="💼" label="Portfolio" href="/portfolio" />
          <NavItem icon="⭐" label="Watchlist" href="/watchlist" />
          <NavItem icon="📈" label="Options" href="/options" />
          <NavItem icon="🤖" label="AI" href="/ai" />
          <NavItem icon="📰" label="News" href="/news" />
          <NavItem icon="👤" label="Profile" href="/profile" />
        </div>
      </nav>
    </main>
  )
}

function NavItem({ icon, label, href }: { icon: string; label: string; href: string }) {
  return (
    <Link href={href}>
      <span className="flex flex-col items-center justify-center h-16 px-3 transition-colors text-muted-foreground hover:text-foreground">
        <span className="text-xl mb-1">{icon}</span>
        <span className="text-xs font-medium">{label}</span>
      </span>
    </Link>
  )
}

import React from 'react'
