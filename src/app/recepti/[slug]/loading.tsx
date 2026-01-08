export default function Loading() {
  return (
    <article className="min-h-screen">
      {/* Hero Image Skeleton */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] bg-warm-300 animate-pulse">
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            <div className="h-4 bg-warm-400/50 rounded w-32 mb-4" />
            <div className="h-14 bg-warm-400/50 rounded w-3/4 mb-4" />
            <div className="h-6 bg-warm-400/50 rounded w-1/2" />
          </div>
        </div>
      </div>

      {/* Recipe Content Skeleton */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Meta Info Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 -mt-16 relative z-10 mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-8 w-8 bg-warm-200 rounded-full mx-auto mb-2 animate-pulse" />
                <div className="h-3 bg-warm-200 rounded w-20 mx-auto mb-2 animate-pulse" />
                <div className="h-6 bg-warm-200 rounded w-16 mx-auto animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Ingredients Skeleton */}
          <div className="md:col-span-1">
            <div className="bg-warm-50 rounded-2xl p-6">
              <div className="h-8 bg-warm-200 rounded w-32 mb-6 animate-pulse" />
              <div className="space-y-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-4 bg-warm-200 rounded animate-pulse" style={{ width: `${70 + Math.random() * 30}%` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Steps Skeleton */}
          <div className="md:col-span-2">
            <div className="h-8 bg-warm-200 rounded w-32 mb-6 animate-pulse" />
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-warm-200 rounded-full animate-pulse" />
                  <div className="flex-1 space-y-2 pt-2">
                    <div className="h-4 bg-warm-200 rounded animate-pulse" />
                    <div className="h-4 bg-warm-200 rounded w-3/4 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

