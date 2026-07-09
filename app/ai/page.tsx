'use client'

import { Send, MessageCircle, Zap } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Hello! I am LAXHAN AI, your market intelligence assistant. I can help you analyze charts, understand market trends, explain options strategies, and provide market insights.',
    sender: 'assistant',
    timestamp: new Date(Date.now() - 5 * 60000),
  },
  {
    id: '2',
    text: 'Ask me anything about:\n• Chart patterns and technical analysis\n• Market trends and sentiment\n• Options strategies and greeks\n• Risk assessment and portfolio health\n• Stock analysis and research\n\nWhat would you like to know?',
    sender: 'assistant',
    timestamp: new Date(Date.now() - 4 * 60000),
  },
]

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'Based on current market data, NIFTY 50 shows a bullish pattern with prices respecting key support levels. The RSI is in the neutral zone, suggesting there is room for further upside.',
        'The Put-Call Ratio stands at 1.24, indicating a slightly bullish bias. Max Pain for current options is around 24,500, suggesting consolidation in this range.',
        'Your portfolio shows a diversified mix with good sector representation. However, you might want to review the concentration in IT stocks, as they represent about 45% of your holdings.',
        'For a Bull Call Spread strategy on NIFTY, consider selling the 24600 Call and buying the 24800 Call. This limits risk while maintaining upside potential.',
        'Implied Volatility is currently at 15.2%, which is near 6-month averages. This suggests fair option pricing without extreme complacency or fear.',
      ]

      const response = responses[Math.floor(Math.random() * responses.length)]

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'assistant',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setLoading(false)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-background pb-24 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#10B981]" />
            AI Assistant
          </h1>
          <p className="text-sm text-muted-foreground">Market intelligence powered by AI</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-md lg:max-w-2xl p-4 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-[#10B981]/20 border border-[#10B981]/30'
                    : 'glass-card'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                <div className="text-xs text-muted-foreground mt-2 opacity-70">
                  {message.timestamp.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="glass-card p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#10B981] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#10B981] rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-[#10B981] rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              placeholder="Ask about market trends, charts, options, or portfolio..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#10B981] text-sm disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-2.5 bg-[#10B981] hover:bg-[#059669] text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">Send</span>
            </button>
          </form>

          {/* Quick Actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            <QuickAction label="Explain RSI" />
            <QuickAction label="Market Analysis" />
            <QuickAction label="Options Strategy" />
            <QuickAction label="Portfolio Risk" />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur border-t border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-around">
          <NavItem icon="📊" label="Market" />
          <NavItem icon="💼" label="Portfolio" />
          <NavItem icon="⭐" label="Watchlist" />
          <NavItem icon="📈" label="Options" />
          <NavItem icon="🤖" label="AI" active />
          <NavItem icon="📰" label="News" />
          <NavItem icon="👤" label="Profile" />
        </div>
      </nav>
    </main>
  )
}

function QuickAction({ label }: { label: string }) {
  return (
    <button className="text-xs px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-colors">
      {label}
    </button>
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
