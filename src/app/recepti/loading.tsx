export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <div className="relative bg-gradient-to-br from-primary-400 via-primary-500 to-accent-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-14 bg-white/20 rounded-lg w-3/4 mx-auto mb-6 animate-pulse" />
          <div className="h-6 bg-white/20 rounded-lg w-1/2 mx-auto animate-pulse" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="h-10 bg-warm-200 rounded-lg w-48 mb-10 animate-pulse" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md">
              <div className="aspect-[4/3] bg-warm-200 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="flex gap-2">
                  <div className="h-6 bg-warm-200 rounded-full w-24 animate-pulse" />
                  <div className="h-6 bg-warm-200 rounded-full w-20 animate-pulse" />
                </div>
                <div className="h-6 bg-warm-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-warm-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-warm-200 rounded w-2/3 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

