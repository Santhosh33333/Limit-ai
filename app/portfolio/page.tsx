'use client'

import { ArrowUpRight, ArrowDownRight, Plus, MoreVertical } from 'lucide-react'

interface Holding {
  symbol: string
  name: string
  quantity: number
  avgCost: number
  currentPrice: number
  totalCost: number
  currentValue: number
  change: number
  changePercent: number
}

const mockHoldings: Holding[] = [
  {
    symbol: 'INFY',
    name: 'Infosys Limited',
    quantity: 50,
    avgCost: 1850.25,
    currentPrice: 1925.50,
    totalCost: 92512.5,
    currentValue: 96275.0,
    change: 3762.5,
    changePercent: 4.07,
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    quantity: 25,
    avgCost: 3600.0,
    currentPrice: 3750.25,
    totalCost: 90000.0,
    currentValue: 93756.25,
    change: 3756.25,
    changePercent: 4.17,
  },
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    quantity: 15,
    avgCost: 2850.75,
    currentPrice: 2920.50,
    totalCost: 42761.25,
    currentValue: 43807.5,
    change: 1046.25,
    changePercent: 2.45,
  },
]

export default function PortfolioPage() {
  const totalInvested = mockHoldings.reduce((sum, h) => sum + h.totalCost, 0)
  const totalCurrent = mockHoldings.reduce((sum, h) => sum + h.currentValue, 0)
  const totalProfit = totalCurrent - totalInvested
  const totalProfitPercent = (totalProfit / totalInvested) * 100

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Portfolio</h1>
              <p className="text-sm text-muted-foreground">Your holdings and performance</p>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 bg-[#10B981] hover:bg-[#059669] text-white rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
              <span className="text-sm font-medium">Add Stock</span>
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-6">
            <div className="card-label mb-2">Total Invested</div>
            <div className="card-value text-3xl">
              {totalInvested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="card-label mb-2">Current Value</div>
            <div className="card-value text-3xl">
              {totalCurrent.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
          </div>

          <div className={`glass-card p-6 ${totalProfit >= 0 ? 'border-[#10B981]/30' : 'border-[#EF4444]/30'}`}>
            <div className="card-label mb-2">Total P&L</div>
            <div className={`card-value text-3xl ${totalProfit >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
              {totalProfit >= 0 ? '+' : ''}
              {totalProfit.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
            <div
              className={`text-sm font-medium mt-2 ${totalProfit >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}
            >
              ({totalProfitPercent.toFixed(2)}%)
            </div>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Stock</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">Qty</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">Avg Cost</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">Current</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">P&L</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">Return %</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {mockHoldings.map((holding) => (
                  <tr key={holding.symbol} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold">{holding.symbol}</div>
                        <div className="text-xs text-muted-foreground">{holding.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">{holding.quantity}</td>
                    <td className="px-6 py-4 text-right">
                      {holding.avgCost.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {holding.currentPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </td>
                    <td className={`px-6 py-4 text-right font-semibold ${holding.change >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                      {holding.change >= 0 ? '+' : ''}
                      {holding.change.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </td>
                    <td className={`px-6 py-4 text-right font-semibold ${holding.changePercent >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                      {holding.changePercent >= 0 ? '+' : ''}
                      {holding.changePercent.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 hover:bg-white/10 rounded transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur border-t border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-around">
          <NavItem icon="📊" label="Market" />
          <NavItem icon="💼" label="Portfolio" active />
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
