export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 rounded-full border-2 border-[#1F2D47]"></div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00D9FF] border-r-[#00D9FF] animate-spin"></div>
      </div>
    </div>
  )
}

export function SkeletonLoader() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="glass-card p-6 animate-pulse">
          <div className="h-4 bg-[#2D3B57]/60 rounded mb-3 w-24"></div>
          <div className="h-8 bg-[#2D3B57]/60 rounded mb-3"></div>
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} className="h-4 bg-[#2D3B57]/50 rounded"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
