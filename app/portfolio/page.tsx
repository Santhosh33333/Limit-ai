'use client'

import { ArrowUpRight, ArrowDownRight, Plus, MoreVertical, TrendingUp } from 'lucide-react'
import { PageHeader, BottomNavigation } from '@/components/PageHeader'

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
    <main className="min-h-screen bg-background pb-28">
      <PageHeader title="Portfolio" subtitle="Your investment holdings and performance" />

      {/* Portfolio Summary */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6">
            <div className="card-label mb-3 uppercase text-xs tracking-widest">Total Invested</div>
            <div className="card-value">₹{totalInvested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          </div>

          <div className="glass-card p-6">
            <div className="card-label mb-3 uppercase text-xs tracking-widest">Current Value</div>
            <div className="card-value">₹{totalCurrent.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          </div>

          <div className={`glass-card p-6 border-t-2 ${totalProfit >= 0 ? 'border-[#00FF88]/40' : 'border-[#FF3860]/40'}`}>
            <div className="card-label mb-2 uppercase text-xs tracking-widest">Total Gain/Loss</div>
            <div className={`card-value ${totalProfit >= 0 ? 'text-[#00FF88]' : 'text-[#FF3860]'}`}>
              {totalProfit >= 0 ? '+' : ''}₹{Math.abs(totalProfit).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
            <div className={`text-sm font-semibold mt-1 ${totalProfit >= 0 ? 'text-[#00FF88]' : 'text-[#FF3860]'}`}>
              {totalProfit >= 0 ? '+' : ''}{totalProfitPercent.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="glass-card p-6 overflow-x-auto">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-5 h-5 text-[#00D9FF]" />
            <h2 className="text-xl font-bold text-[#E8F0F7]">Your Holdings</h2>
          </div>
          <table className="w-full text-sm">
            <thead className="border-b border-[#1F2D47]">
              <tr>
                <th className="text-left py-4 card-label font-semibold text-xs uppercase tracking-widest">Stock</th>
                <th className="text-right py-4 card-label font-semibold text-xs uppercase tracking-widest">Qty</th>
                <th className="text-right py-4 card-label font-semibold text-xs uppercase tracking-widest">Avg Cost</th>
                <th className="text-right py-4 card-label font-semibold text-xs uppercase tracking-widest">Current</th>
                <th className="text-right py-4 card-label font-semibold text-xs uppercase tracking-widest">P&L %</th>
                <th className="text-right py-4 card-label font-semibold text-xs uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockHoldings.map((holding) => (
                <tr key={holding.symbol} className="border-b border-[#1F2D47]/50 hover:bg-[#1A2847]/40 transition-colors duration-300">
                  <td className="py-4">
                    <div className="font-semibold text-[#E8F0F7]">{holding.symbol}</div>
                    <div className="text-xs text-[#8FA3C0]">{holding.name}</div>
                  </td>
                  <td className="text-right py-4 font-semibold text-[#E8F0F7]">{holding.quantity}</td>
                  <td className="text-right py-4 font-semibold text-[#E8F0F7]">₹{holding.avgCost.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                  <td className="text-right py-4 font-semibold text-[#E8F0F7]">₹{holding.currentPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                  <td className={`text-right py-4 font-semibold ${holding.changePercent >= 0 ? 'text-[#00FF88]' : 'text-[#FF3860]'}`}>
                    {holding.changePercent >= 0 ? '+' : ''}{holding.changePercent.toFixed(2)}%
                  </td>
                  <td className="text-right py-4">
                    <button className="p-2 hover:bg-[#1A2847]/60 rounded-lg transition-colors border border-[#1F2D47] hover:border-[#00D9FF]/40">
                      <MoreVertical className="w-4 h-4 text-[#8FA3C0]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <BottomNavigation activeTab="Portfolio" />
    </main>
  )
}
