'use client'

import { ArrowUpRight, ArrowDownRight, Trash2, Bell } from 'lucide-react'

interface WatchlistItem {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  high52w: number
  low52w: number
  marketCap: string
}

const mockWatchlist: WatchlistItem[] = [
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Limited',
    price: 1625.35,
    change: 45.25,
    changePercent: 2.86,
    high52w: 1950.0,
    low52w: 1200.0,
    marketCap: '11.5L Cr',
  },
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Limited',
    price: 1085.20,
    change: -15.80,
    changePercent: -1.44,
    high52w: 1350.0,
    low52w: 850.0,
    marketCap: '7.8L Cr',
  },
  {
    symbol: 'LT',
    name: 'Larsen & Toubro',
    price: 3225.50,
    change: 125.75,
    changePercent: 4.06,
    high52w: 3500.0,
    low52w: 2200.0,
    marketCap: '4.2L Cr',
  },
  {
    symbol: 'ITC',
    name: 'ITC Limited',
    price: 445.30,
    change: 8.70,
    changePercent: 1.99,
    high52w: 535.0,
    low52w: 360.0,
    marketCap: '3.8L Cr',
  },
  {
    symbol: 'SBIN',
    name: 'State Bank of India',
    price: 625.15,
    change: -12.85,
    changePercent: -2.01,
    high52w: 785.0,
    low52w: 480.0,
    marketCap: '6.2L Cr',
  },
]

export default function WatchlistPage() {
  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border p-4">
        <div className="max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Watchlist</h1>
            <p className="text-sm text-muted-foreground">{mockWatchlist.length} stocks tracked</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-3">
          {mockWatchlist.map((item) => {
            const isPositive = item.change >= 0

            return (
              <div key={item.symbol} className="glass-card p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold">{item.symbol}</div>
                    <div className="text-sm text-muted-foreground">{item.name}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-white/10 rounded transition-colors">
                      <Bell className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 hover:bg-white/10 rounded transition-colors">
                      <Trash2 className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                </div>

                <div className="flex items-end justify-between mb-3">
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold">{item.price.toFixed(2)}</div>
                    <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                      {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      {isPositive ? '+' : ''}
                      {item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-3 border-t border-white/10">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">52W High</div>
                    <div className="text-sm font-semibold">{item.high52w.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">52W Low</div>
                    <div className="text-sm font-semibold">{item.low52w.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Market Cap</div>
                    <div className="text-sm font-semibold">{item.marketCap}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {mockWatchlist.length === 0 && (
          <div className="glass-card p-12 text-center">
            <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Empty Watchlist</h3>
            <p className="text-muted-foreground">Add stocks to your watchlist to track them closely</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur border-t border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-around">
          <NavItem icon="📊" label="Market" />
          <NavItem icon="💼" label="Portfolio" />
          <NavItem icon="⭐" label="Watchlist" active />
          <NavItem icon="📈" label="Options" />
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
