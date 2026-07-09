'use client'

import { TrendingUp, Search } from 'lucide-react'
import { useState } from 'react'

interface OptionChainRow {
  strikePrice: number
  callOpenInterest: number
  callVolume: number
  callIV: number
  callLTP: number
  underlyingPrice: number
  putLTP: number
  putIV: number
  putVolume: number
  putOpenInterest: number
}

const mockOptionChain: OptionChainRow[] = [
  {
    strikePrice: 24000,
    callOpenInterest: 12540,
    callVolume: 450,
    callIV: 14.5,
    callLTP: 580.25,
    underlyingPrice: 24580,
    putLTP: 0.05,
    putIV: 12.8,
    putVolume: 120,
    putOpenInterest: 2450,
  },
  {
    strikePrice: 24200,
    callOpenInterest: 22100,
    callVolume: 780,
    callIV: 15.2,
    callLTP: 380.75,
    underlyingPrice: 24580,
    putLTP: 0.15,
    putIV: 13.2,
    putVolume: 250,
    putOpenInterest: 5620,
  },
  {
    strikePrice: 24400,
    callOpenInterest: 35400,
    callVolume: 1200,
    callIV: 16.1,
    callLTP: 180.50,
    underlyingPrice: 24580,
    putLTP: 0.85,
    putIV: 14.5,
    putVolume: 450,
    putOpenInterest: 8900,
  },
  {
    strikePrice: 24600,
    callOpenInterest: 28900,
    callVolume: 950,
    callIV: 15.8,
    callLTP: 80.25,
    underlyingPrice: 24580,
    putLTP: 85.50,
    putIV: 15.2,
    putVolume: 520,
    putOpenInterest: 12450,
  },
  {
    strikePrice: 24800,
    callOpenInterest: 18500,
    callVolume: 620,
    callIV: 15.1,
    callLTP: 15.75,
    underlyingPrice: 24580,
    putLTP: 285.20,
    putIV: 16.5,
    putVolume: 380,
    putOpenInterest: 6780,
  },
]

export default function OptionsPage() {
  const [searchSymbol, setSearchSymbol] = useState('NIFTY50')

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-bold">Options Chain</h1>
            <p className="text-sm text-muted-foreground">Real-time options data and analysis</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search symbol..."
                value={searchSymbol}
                onChange={(e) => setSearchSymbol(e.target.value.toUpperCase())}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#10B981] text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Underlying Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="glass-card p-4">
            <div className="card-label text-sm mb-1">Underlying: {searchSymbol}</div>
            <div className="text-2xl font-bold">24,580</div>
          </div>
          <div className="glass-card p-4">
            <div className="card-label text-sm mb-1">PCR Ratio</div>
            <div className="text-2xl font-bold">1.24</div>
          </div>
          <div className="glass-card p-4">
            <div className="card-label text-sm mb-1">Max Pain</div>
            <div className="text-2xl font-bold">24,500</div>
          </div>
          <div className="glass-card p-4">
            <div className="card-label text-sm mb-1">IV Rank</div>
            <div className="text-2xl font-bold">62%</div>
          </div>
        </div>

        {/* Options Chain Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th colSpan={5} className="px-4 py-3 text-center font-semibold text-[#10B981]">
                    CALLS
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">Strike</th>
                  <th colSpan={5} className="px-4 py-3 text-center font-semibold text-[#EF4444]">
                    PUTS
                  </th>
                </tr>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-2 text-right">OI</th>
                  <th className="px-4 py-2 text-right">Vol</th>
                  <th className="px-4 py-2 text-right">IV</th>
                  <th className="px-4 py-2 text-right">LTP</th>
                  <th className="px-4 py-2 text-right">Greeks</th>
                  <th className="px-4 py-2 text-center font-bold">-</th>
                  <th className="px-4 py-2 text-left">Greeks</th>
                  <th className="px-4 py-2 text-left">LTP</th>
                  <th className="px-4 py-2 text-left">IV</th>
                  <th className="px-4 py-2 text-left">Vol</th>
                  <th className="px-4 py-2 text-left">OI</th>
                </tr>
              </thead>
              <tbody>
                {mockOptionChain.map((row, idx) => (
                  <tr key={idx} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-right text-xs">{(row.callOpenInterest / 1000).toFixed(1)}K</td>
                    <td className="px-4 py-3 text-right text-xs">{row.callVolume}</td>
                    <td className="px-4 py-3 text-right text-xs text-[#10B981]">{row.callIV.toFixed(1)}</td>
                    <td className="px-4 py-3 text-right text-xs font-semibold">{row.callLTP.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right text-xs text-muted-foreground">Δ</td>
                    <td className="px-4 py-3 text-center font-bold bg-white/5">{row.strikePrice}</td>
                    <td className="px-4 py-3 text-left text-xs text-muted-foreground">Δ</td>
                    <td className="px-4 py-3 text-left text-xs font-semibold">{row.putLTP.toFixed(2)}</td>
                    <td className="px-4 py-3 text-left text-xs text-[#EF4444]">{row.putIV.toFixed(1)}</td>
                    <td className="px-4 py-3 text-left text-xs">{row.putVolume}</td>
                    <td className="px-4 py-3 text-left text-xs">{(row.putOpenInterest / 1000).toFixed(1)}K</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Section */}
        <div className="glass-card p-6 mt-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Option Chain Guide
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• PCR Ratio: Put-Call Ratio. Higher ratio indicates bullish sentiment</li>
            <li>• Max Pain: The strike price with maximum open interest, where most options expire worthless</li>
            <li>• IV: Implied Volatility. Higher IV means higher option premiums</li>
            <li>• OI: Open Interest. Number of outstanding option contracts</li>
            <li>• Greeks: Delta, Gamma, Theta, Vega - measures of option sensitivity</li>
          </ul>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur border-t border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-around">
          <NavItem icon="📊" label="Market" />
          <NavItem icon="💼" label="Portfolio" />
          <NavItem icon="⭐" label="Watchlist" />
          <NavItem icon="📈" label="Options" active />
          <NavItem icon="🤖" label="AI" />
          <NavItem icon="📰" label="News" />
          <NavItem icon="👤" label="Profile" />
        </div>
      </nav>
    </main>
  )
}

function NavItem({ icon, label, active }: { icon: string; label: string; active?: boolean }) {
  return (
    <button
      className={`flex flex-col items-center justify-center h-16 px-3 transition-colors ${
        active ? 'text-[#10B981]' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      <span className="text-xl mb-1">{icon}</span>
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}
