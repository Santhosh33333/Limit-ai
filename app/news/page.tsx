'use client'

import { TrendingUp, TrendingDown, Newspaper } from 'lucide-react'

interface NewsItem {
  id: string
  title: string
  source: string
  timestamp: string
  sentiment: 'bullish' | 'neutral' | 'bearish'
  impact: string
  excerpt: string
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Infosys Reports Strong Q3 Results, Raises FY25 Guidance',
    source: 'Economic Times',
    timestamp: '2 hours ago',
    sentiment: 'bullish',
    impact: 'High',
    excerpt: 'Infosys delivered strong Q3 results with revenue growth of 8.5% YoY and raised its full-year guidance citing strong demand...',
  },
  {
    id: '2',
    title: 'RBI Keeps Key Rates Unchanged at 6.5%',
    source: 'Business Today',
    timestamp: '4 hours ago',
    sentiment: 'neutral',
    impact: 'Medium',
    excerpt: 'Reserve Bank of India maintained its repo rate at 6.5%, signaling a pause in the rate hiking cycle as inflation moderates...',
  },
  {
    id: '3',
    title: 'TCS Announces Special Dividend of 20 Per Share',
    source: 'Mint',
    timestamp: '6 hours ago',
    sentiment: 'bullish',
    impact: 'Medium',
    excerpt: 'Tata Consultancy Services announced a special dividend of Rs 20 per share, returning capital to shareholders amid strong cash generation...',
  },
  {
    id: '4',
    title: 'Reliance Faces Headwinds in Oil Refining Margins',
    source: 'Reuters',
    timestamp: '8 hours ago',
    sentiment: 'bearish',
    impact: 'High',
    excerpt: 'Oil refining margins in Asia have declined sharply, impacting profitability for major refiners including Reliance Industries...',
  },
  {
    id: '5',
    title: 'HDFC Bank Launches New Digital Banking Platform',
    source: 'Hindu Business Line',
    timestamp: '10 hours ago',
    sentiment: 'neutral',
    impact: 'Low',
    excerpt: 'HDFC Bank unveiled its latest digital banking platform with enhanced features for improved customer experience and service...',
  },
  {
    id: '6',
    title: 'Market Closes Higher on Banking Stocks Rally',
    source: 'CNBC-TV18',
    timestamp: '1 day ago',
    sentiment: 'bullish',
    impact: 'Medium',
    excerpt: 'Stock market ended on a positive note with banking stocks leading the rally, supported by positive earnings and recovery in loan growth...',
  },
]

export default function NewsPage() {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/30'
      case 'bearish':
        return 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/30'
      default:
        return 'text-blue-400 bg-blue-400/10 border-blue-400/30'
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return <TrendingUp className="w-4 h-4" />
      case 'bearish':
        return <TrendingDown className="w-4 h-4" />
      default:
        return <Newspaper className="w-4 h-4" />
    }
  }

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border p-4">
        <div className="max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Financial News</h1>
            <p className="text-sm text-muted-foreground">{mockNews.length} latest market updates</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {mockNews.map((article) => (
            <div key={article.id} className="glass-card p-5 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg leading-snug mb-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                </div>
                <div className={`px-2.5 py-1 rounded border flex items-center gap-1.5 whitespace-nowrap text-sm ${getSentimentColor(article.sentiment)}`}>
                  {getSentimentIcon(article.sentiment)}
                  <span className="capitalize font-medium">{article.sentiment}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span>{article.source}</span>
                  <span>{article.timestamp}</span>
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-white/5 rounded">
                  Impact: {article.impact}
                </span>
              </div>
            </div>
          ))}
        </div>

        {mockNews.length === 0 && (
          <div className="glass-card p-12 text-center">
            <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No News Available</h3>
            <p className="text-muted-foreground">Check back later for market updates and news</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur border-t border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-around">
          <NavItem icon="📊" label="Market" />
          <NavItem icon="💼" label="Portfolio" />
          <NavItem icon="⭐" label="Watchlist" />
          <NavItem icon="📈" label="Options" />
          <NavItem icon="🤖" label="AI" />
          <NavItem icon="📰" label="News" active />
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
