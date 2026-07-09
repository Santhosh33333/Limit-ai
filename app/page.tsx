'use client'

import Link from 'next/link'
import { ArrowUpRight, ArrowDownRight, RefreshCw, TrendingUp, Clock } from 'lucide-react'
import { useMarketIndices } from '@/lib/hooks'
import type { MarketQuote } from '@/lib/market-data'

function MarketStatus({ isOpen, nextOpenTime }: { isOpen: boolean; nextOpenTime?: string }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        {isOpen ? (
          <>
            <div className="w-3 h-3 bg-[#10B981] rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-[#10B981]">LIVE</span>
          </>
        ) : (
          <>
            <div className="w-3 h-3 bg-muted rounded-full"></div>
            <span className="text-sm font-semibold text-muted-foreground">MARKET CLOSED</span>
            {nextOpenTime && (
              <span className="text-xs text-muted-foreground ml-2">
                Opens at{' '}
                {new Date(nextOpenTime).toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'Asia/Kolkata',
                })}
              </span>
            )}
          </>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>Updated now</span>
      </div>
    </div>
  )
}

function IndexCard({ index }: { index: MarketQuote }) {
  const isPositive = index.change >= 0

  return (
    <div className="index-card">
      <div className="flex items-start justify-between">
        <div>
          <div className="card-label mb-1">{index.name}</div>
          <div className="card-value text-3xl">
            {index.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </div>
        </div>
        {isPositive ? (
          <ArrowUpRight className="w-5 h-5 text-[#10B981]" />
        ) : (
          <ArrowDownRight className="w-5 h-5 text-[#EF4444]" />
        )}
      </div>

      <div className={`text-sm font-semibold ${isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
        {isPositive ? '+' : ''}
        {index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10">
        <div>
          <div className="card-label text-xs">Open</div>
          <div className="text-sm font-semibold">{index.open.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
        </div>
        <div>
          <div className="card-label text-xs">High</div>
          <div className="text-sm font-semibold">{index.high.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
        </div>
        <div>
          <div className="card-label text-xs">Low</div>
          <div className="text-sm font-semibold">{index.low.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
        </div>
        <div>
          <div className="card-label text-xs">Vol</div>
          <div className="text-sm font-semibold">{(index.volume / 1000000).toFixed(1)}M</div>
        </div>
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="index-card animate-pulse">
      <div className="h-6 bg-white/10 rounded mb-2 w-20"></div>
      <div className="h-8 bg-white/10 rounded mb-3"></div>
      <div className="h-4 bg-white/10 rounded mb-4 w-32"></div>
      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10">
        <div className="h-4 bg-white/10 rounded"></div>
        <div className="h-4 bg-white/10 rounded"></div>
        <div className="h-4 bg-white/10 rounded"></div>
        <div className="h-4 bg-white/10 rounded"></div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { indices, loading, error, marketStatus, refetch } = useMarketIndices()

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Market</h1>
              <p className="text-sm text-muted-foreground">Real-time market indices</p>
            </div>
            <button
              onClick={() => refetch()}
              disabled={loading}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
              aria-label="Refresh market data"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <MarketStatus isOpen={marketStatus.isOpen} nextOpenTime={marketStatus.nextOpenTime} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {error && (
          <div className="glass-card p-4 mb-4 bg-danger/20 border-danger/30">
            <p className="text-sm font-medium">Error: {error}</p>
          </div>
        )}

        {/* Market Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : indices.map((index) => <IndexCard key={index.symbol} index={index} />)}
        </div>

        {/* Charts Section Coming Soon */}
        <div className="glass-card p-8 text-center">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">Professional Charts Coming Soon</h3>
          <p className="text-muted-foreground">Advanced charting with technical indicators, candlestick analysis, and real-time data visualization</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur border-t border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-around">
          <NavItem icon="📊" label="Market" active />
          <NavItem icon="💼" label="Portfolio" />
          <NavItem icon="⭐" label="Watchlist" />
          <NavItem icon="📈" label="Options" />
          <NavItem icon="🤖" label="AI" />
          <NavItem icon="📰" label="News" />
          <NavItem icon="👤" label="Profile" />
        </div>
      </nav>
    </main>
  )
}

function NavItem({ icon, label, active, href }: { icon: string; label: string; active?: boolean; href?: string }) {
  const navRoutes: Record<string, string> = {
    Market: '/',
    Portfolio: '/portfolio',
    Watchlist: '/watchlist',
    Options: '/options',
    AI: '/ai',
    News: '/news',
    Profile: '/profile',
  }

  const route = href || navRoutes[label] || '/'

  return (
    <Link href={route}>
      <span className={`flex flex-col items-center justify-center h-16 px-3 transition-colors ${active ? 'text-[#10B981]' : 'text-muted-foreground hover:text-foreground'}`}>
        <span className="text-xl mb-1">{icon}</span>
        <span className="text-xs font-medium">{label}</span>
      </span>
    </Link>
  )
}
