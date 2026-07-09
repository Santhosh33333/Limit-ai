import { NextRequest, NextResponse } from 'next/server'
import { fetchQuote } from '@/lib/market-data'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  try {
    const { symbol } = await params
    const quote = await fetchQuote(symbol.toUpperCase())

    if (!quote) {
      return NextResponse.json(
        {
          success: false,
          error: 'Quote not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: quote,
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch quote',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
