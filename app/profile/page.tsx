'use client'

import React, { useState } from 'react'
import { User, Settings, Bell, Lock, LogOut, ChevronRight, Zap } from 'lucide-react'

export default function ProfilePage() {
  const [userName] = useState('Trader')
  const [email] = useState('user@laxhanai.com')
  
  return (
    <main className="min-h-screen bg-background pb-28">
      {/* Premium Header */}
      <div className="sticky top-0 z-40 premium-header p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#E8F0F7] to-[#00D9FF] bg-clip-text text-transparent">Profile</h1>
          <p className="text-sm text-[#8FA3C0] mt-1 font-medium">Account settings and preferences</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* User Info Card */}
        <div className="glass-card p-6 mb-6 border-t border-[#00D9FF]/40">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#00D9FF] to-[#7B68EE] rounded-full flex items-center justify-center shadow-lg shadow-[#00D9FF]/30">
              <User className="w-8 h-8 text-[#0A0E27]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#E8F0F7]">{userName}</h2>
              <p className="text-sm text-[#8FA3C0]">{email}</p>
              <p className="text-xs text-[#00D9FF] mt-1 font-medium flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Premium Member
              </p>
            </div>
          </div>

          <button className="w-full px-4 py-2 bg-gradient-to-r from-[#00D9FF]/20 to-[#7B68EE]/20 hover:from-[#00D9FF]/30 hover:to-[#7B68EE]/30 border border-[#00D9FF]/40 rounded-lg transition-all duration-300 font-medium text-sm text-[#00D9FF]">
            Edit Profile
          </button>
        </div>

        {/* Settings Sections */}
        <div className="space-y-4">
          {/* Notifications */}
          <div className="glass-card overflow-hidden border-[#1F2D47]">
            <div className="p-6 border-b border-[#1F2D47]">
              <h3 className="font-semibold flex items-center gap-2 text-[#E8F0F7]">
                <Bell className="w-5 h-5 text-[#00D9FF]" />
                Notifications
              </h3>
            </div>
            <div className="divide-y divide-[#1F2D47]">
              <SettingsToggle label="Price Alerts" description="Get notified when stocks reach target prices" />
              <SettingsToggle label="News Alerts" description="Receive financial news and market updates" />
              <SettingsToggle label="Earnings Alerts" description="Notifications for earnings releases" />
              <SettingsToggle label="Portfolio Changes" description="Updates when holdings change significantly" />
            </div>
          </div>

          {/* Security */}
          <div className="glass-card overflow-hidden border-[#1F2D47]">
            <div className="p-6 border-b border-[#1F2D47]">
              <h3 className="font-semibold flex items-center gap-2 text-[#E8F0F7]">
                <Lock className="w-5 h-5 text-[#00D9FF]" />
                Security
              </h3>
            </div>
            <div className="divide-y divide-[#1F2D47]">
              <SettingsItem label="Change Password" description="Update your account password" />
              <SettingsItem label="Two-Factor Authentication" description="Enable 2FA for added security" />
              <SettingsItem label="Login History" description="View recent login activity" />
            </div>
          </div>

          {/* Preferences */}
          <div className="glass-card overflow-hidden border-[#1F2D47]">
            <div className="p-6 border-b border-[#1F2D47]">
              <h3 className="font-semibold flex items-center gap-2 text-[#E8F0F7]">
                <Settings className="w-5 h-5 text-[#00D9FF]" />
                Preferences
              </h3>
            </div>
            <div className="divide-y divide-[#1F2D47]">
              <SettingsSelect label="Theme" options={['Dark', 'Light', 'System']} />
              <SettingsSelect label="Currency" options={['INR', 'USD', 'EUR']} />
              <SettingsSelect label="Time Format" options={['24 Hour', '12 Hour']} />
              <SettingsSelect label="Chart Style" options={['Candlestick', 'Line', 'Area']} />
            </div>
          </div>

          {/* Account */}
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h3 className="font-semibold">Account</h3>
            </div>
            <div className="divide-y divide-white/10">
              <SettingsItem label="Download Data" description="Export your portfolio and trade history" />
              <SettingsItem label="Delete Account" description="Permanently delete your account and data" alert />
            </div>
          </div>

          {/* Logout */}
          <button className="w-full px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg transition-colors font-medium flex items-center justify-center gap-2">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>

        {/* Info Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground space-y-2">
          <p>LAXHAN AI v1.0</p>
          <div className="flex items-center justify-center gap-4">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Help & Support
            </a>
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
          <NavItem icon="🤖" label="AI" />
          <NavItem icon="📰" label="News" />
          <NavItem icon="👤" label="Profile" active />
        </div>
      </nav>
    </main>
  )
}

function SettingsToggle({ label, description }: { label: string; description: string }) {
  const [enabled, setEnabled] = useState(true)
  
  return (
    <div className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-12 h-6 rounded-full transition-colors ${
          enabled ? 'bg-[#10B981]' : 'bg-white/20'
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )
}

function SettingsItem({ label, description, alert }: { label: string; description: string; alert?: boolean }) {
  return (
    <div className={`p-6 flex items-center justify-between hover:bg-white/5 transition-colors ${alert ? 'border-l-2 border-red-500' : ''}`}>
      <div>
        <div className={`font-medium ${alert ? 'text-red-400' : ''}`}>{label}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </div>
  )
}

function SettingsSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
      <div className="font-medium">{label}</div>
      <select className="bg-white/10 border border-white/20 rounded px-3 py-1 text-sm focus:outline-none focus:border-[#10B981]">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
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
