'use client'

import Link from 'next/link'
import { RefreshCw } from 'lucide-react'

interface PageHeaderProps {
  title: string
  subtitle: string
  onRefresh?: () => void
  isLoading?: boolean
}

export function PageHeader({ title, subtitle, onRefresh, isLoading }: PageHeaderProps) {
  return (
    <div className="sticky top-0 z-40 premium-header p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#E8F0F7] to-[#00D9FF] bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-sm text-[#8FA3C0] mt-1 font-medium">{subtitle}</p>
          </div>
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="p-3 hover:bg-[#00D9FF]/20 hover:border-[#00D9FF]/60 rounded-lg transition-all duration-300 border border-[#1F2D47] group disabled:opacity-50"
              aria-label="Refresh data"
            >
              <RefreshCw className={`w-5 h-5 text-[#00D9FF] ${isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

interface BottomNavProps {
  activeTab?: string
}

export function BottomNavigation({ activeTab }: BottomNavProps) {
  const navRoutes: Record<string, string> = {
    Market: '/',
    Portfolio: '/portfolio',
    Watchlist: '/watchlist',
    Options: '/options',
    AI: '/ai',
    News: '/news',
    Profile: '/profile',
  }

  return (
    <nav className="premium-nav">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-around">
        {Object.entries(navRoutes).map(([label, route]) => (
          <Link key={label} href={route}>
            <span
              className={`flex flex-col items-center justify-center h-20 px-4 transition-all duration-300 group ${
                activeTab === label ? 'nav-item-active' : 'nav-item-inactive'
              }`}
            >
              <span className="text-2xl mb-2 transition-transform duration-300 group-hover:scale-110">
                {label === 'Market' && '📊'}
                {label === 'Portfolio' && '💼'}
                {label === 'Watchlist' && '⭐'}
                {label === 'Options' && '📈'}
                {label === 'AI' && '🤖'}
                {label === 'News' && '📰'}
                {label === 'Profile' && '👤'}
              </span>
              <span className={`text-xs font-bold uppercase tracking-wider ${activeTab === label ? 'text-[#00D9FF]' : 'text-[#8FA3C0]'}`}>
                {label}
              </span>
              {activeTab === label && (
                <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent"></div>
              )}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
