'use client'

import Link from 'next/link'
import { ArrowUpRight, ArrowDownRight, RefreshCw, TrendingUp, Clock, Zap, BarChart3, AlertCircle, CheckCircle } from 'lucide-react'
import { useMarketIndices } from '@/lib/hooks'
import type { MarketQuote } from '@/lib/market-data'

function MarketStatus({ isOpen, nextOpenTime }: { isOpen: boolean; nextOpenTime?: string }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        {isOpen ? (
          <>
            <div className="w-3 h-3 bg-[#00D9FF] rounded-full animate-pulse pulse-glow"></div>
            <span className="text-sm font-bold text-[#00D9FF] tracking-wider">LIVE MARKET</span>
          </>
        ) : (
          <>
            <div className="w-3 h-3 bg-[#8FA3C0] rounded-full"></div>
            <span className="text-sm font-bold text-[#8FA3C0]">MARKET CLOSED</span>
            {nextOpenTime && (
              <span className="text-xs text-[#8FA3C0] ml-3 font-medium">
                Opens{' '}
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
      <div className="flex items-center gap-2 text-xs text-[#8FA3C0]">
        <Clock className="w-4 h-4" />
        <span>Live</span>
      </div>
    </div>
  )
}

function IndexCard({ index }: { index: MarketQuote }) {
  const isPositive = index.change >= 0

  return (
    <div className="index-card group">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="card-label mb-2 uppercase text-xs tracking-widest font-semibold">{index.name}</div>
          <div className="card-value">
            {index.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </div>
        </div>
        <div className="ml-4">
          {isPositive ? (
            <div className="bg-[#00FF88]/20 p-2 rounded-lg border border-[#00FF88]/40">
              <ArrowUpRight className="w-5 h-5 text-[#00FF88]" />
            </div>
          ) : (
            <div className="bg-[#FF3860]/20 p-2 rounded-lg border border-[#FF3860]/40">
              <ArrowDownRight className="w-5 h-5 text-[#FF3860]" />
            </div>
          )}
        </div>
      </div>

      <div className={`text-sm font-bold tracking-wide ${isPositive ? 'text-[#00FF88]' : 'text-[#FF3860]'}`}>
        {isPositive ? '+' : ''}
        {index.change.toFixed(2)} <span className="text-xs opacity-75">({index.changePercent.toFixed(2)}%)</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-[#00D9FF]/20">
        <div className="space-y-1">
          <div className="card-label text-xs uppercase tracking-wider">Open</div>
          <div className="text-sm font-semibold text-[#E8F0F7]">{index.open.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
        </div>
        <div className="space-y-1">
          <div className="card-label text-xs uppercase tracking-wider">High</div>
          <div className="text-sm font-semibold text-[#E8F0F7]">{index.high.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
        </div>
        <div className="space-y-1">
          <div className="card-label text-xs uppercase tracking-wider">Low</div>
          <div className="text-sm font-semibold text-[#E8F0F7]">{index.low.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
        </div>
        <div className="space-y-1">
          <div className="card-label text-xs uppercase tracking-wider">Vol</div>
          <div className="text-sm font-semibold text-[#E8F0F7]">{(index.volume / 1000000).toFixed(1)}M</div>
        </div>
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="index-card animate-pulse">
      <div className="h-4 bg-[#2D3B57]/60 rounded mb-3 w-24"></div>
      <div className="h-10 bg-[#2D3B57]/60 rounded mb-4"></div>
      <div className="h-5 bg-[#2D3B57]/40 rounded mb-5 w-28"></div>
      <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-[#00D9FF]/20">
        <div className="h-4 bg-[#2D3B57]/50 rounded"></div>
        <div className="h-4 bg-[#2D3B57]/50 rounded"></div>
        <div className="h-4 bg-[#2D3B57]/50 rounded"></div>
        <div className="h-4 bg-[#2D3B57]/50 rounded"></div>
      </div>
    </div>
  )
}

function NotificationBanner() {
  return (
    <div className="mb-6 glass-card p-4 border-[#00FF88]/40 flex items-center gap-4">
      <div className="flex-shrink-0">
        <CheckCircle className="w-6 h-6 text-[#00FF88]" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-[#E8F0F7]">Market data updated</p>
        <p className="text-xs text-[#8FA3C0]">Live prices refreshed just now</p>
      </div>
      <button className="text-xs text-[#8FA3C0] hover:text-[#00D9FF] transition-colors">Dismiss</button>
    </div>
  )
}

function SponsorBanner() {
  return (
    <div className="sponsor-card mb-6 border-0">
      <div className="sponsor-content">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00D9FF] to-[#7B68EE] rounded-lg flex items-center justify-center shadow-lg shadow-[#00D9FF]/20">
                <Zap className="w-6 h-6 text-[#0A0E27]" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[#00D9FF] text-sm md:text-base truncate">Free Demat Opening</h3>
              <p className="text-xs text-[#8FA3C0]">Start trading with zero account opening fees - powered by Zerodha</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-[#00D9FF] to-[#00D9FF] text-[#0A0E27] rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-[#00D9FF]/50 transition-all duration-300 whitespace-nowrap flex-shrink-0">
            Open Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { indices, loading, error, marketStatus, refetch } = useMarketIndices()

  return (
    <main className="min-h-screen bg-background pb-28">
      {/* Premium Header */}
      <div className="sticky top-0 z-40 premium-header p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#E8F0F7] to-[#00D9FF] bg-clip-text text-transparent">LAXHAN AI</h1>
              <p className="text-sm text-[#8FA3C0] mt-1 font-medium">Market Intelligence Platform</p>
            </div>
            <button
              onClick={() => refetch()}
              disabled={loading}
              className="p-3 hover:bg-[#00D9FF]/20 hover:border-[#00D9FF]/60 rounded-lg transition-all duration-300 border border-[#1F2D47] group disabled:opacity-50"
              aria-label="Refresh market data"
              title="Refresh market data"
            >
              <RefreshCw className={`w-5 h-5 text-[#00D9FF] ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            </button>
          </div>

          <MarketStatus isOpen={marketStatus.isOpen} nextOpenTime={marketStatus.nextOpenTime} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Real-time Notification */}
        {!loading && <NotificationBanner />}

        {error && (
          <div className="glass-card p-4 mb-6 border-[#FF3860]/40 bg-[#FF3860]/10 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#FF3860] flex-shrink-0" />
            <p className="text-sm font-medium text-[#FF3860]">Error: {error}</p>
          </div>
        )}

        {/* Sponsor Banner */}
        <SponsorBanner />

        {/* Market Indices Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <BarChart3 className="w-5 h-5 text-[#00D9FF]" />
            <h2 className="text-lg font-bold text-[#E8F0F7] uppercase tracking-wider">Market Indices</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#00D9FF]/50 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : indices.map((index) => <IndexCard key={index.symbol} index={index} />)}
          </div>
        </div>

        {/* Advanced Features Section */}
        <div className="glass-card p-8 text-center border-[#00D9FF]/30">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#00D9FF]/30 to-[#7B68EE]/30 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-[#00D9FF]" />
          </div>
          <h3 className="text-2xl font-bold text-[#E8F0F7] mb-3">Advanced Charting</h3>
          <p className="text-[#8FA3C0] max-w-2xl mx-auto leading-relaxed">Professional-grade charting with technical indicators, candlestick analysis, multiple timeframes, and real-time data visualization</p>
          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-[#00D9FF] to-[#7B68EE] text-[#0A0E27] rounded-lg font-bold hover:shadow-lg hover:shadow-[#00D9FF]/30 transition-all duration-300">
            View Charts →
          </button>
        </div>
      </div>

      {/* Premium Bottom Navigation */}
      <nav className="premium-nav">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-around">
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
      <span className={`flex flex-col items-center justify-center h-20 px-4 transition-all duration-300 group ${active ? 'nav-item-active' : 'nav-item-inactive'}`}>
        <span className="text-2xl mb-2 transition-transform duration-300 group-hover:scale-110">{icon}</span>
        <span className={`text-xs font-bold uppercase tracking-wider ${active ? 'text-[#00D9FF]' : 'text-[#8FA3C0]'}`}>{label}</span>
        {active && <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent"></div>}
      </span>
    </Link>
  )
}
