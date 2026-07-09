import { NextRequest, NextResponse } from 'next/server'
import { isMarketOpen, getNextMarketOpen } from '@/lib/market-data'

export async function GET(request: NextRequest) {
  try {
    const open = isMarketOpen()
    const nextOpen = getNextMarketOpen()

    return NextResponse.json({
      success: true,
      data: {
        isOpen: open,
        status: open ? 'LIVE' : 'CLOSED',
        lastUpdated: new Date().toISOString(),
        nextOpenTime: !open ? nextOpen.toISOString() : null,
        marketHours: {
          open: '09:15 AM IST',
          close: '03:30 PM IST',
        },
      },
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch market status',
      },
      { status: 500 }
    )
  }
}
