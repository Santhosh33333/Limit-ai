import { NextRequest, NextResponse } from 'next/server'
import { fetchMarketIndices, isMarketOpen, getNextMarketOpen } from '@/lib/market-data'

export async function GET(request: NextRequest) {
  try {
    const indices = await fetchMarketIndices()
    const marketOpen = isMarketOpen()

    return NextResponse.json({
      success: true,
      data: indices,
      marketStatus: {
        isOpen: marketOpen,
        nextOpenTime: !marketOpen ? getNextMarketOpen().toISOString() : null,
        lastUpdated: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch market indices',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
