import { NextRequest, NextResponse } from 'next/server'
import { fetchChartData } from '@/lib/market-data'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  try {
    const { symbol } = await params
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get('timeframe') || '1h'

    const chartData = await fetchChartData(symbol.toUpperCase(), timeframe)

    if (chartData.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No chart data available',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: chartData,
      symbol: symbol.toUpperCase(),
      timeframe,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch chart data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
