export function TuitionCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full">
      {/* Banner Skeleton with Shimmer Wave */}
      <div className="h-48 skeleton-box w-full relative !rounded-none">
        <div className="absolute top-3 left-3 w-20 h-6 bg-slate-300/80 rounded-full"></div>
        <div className="absolute top-3 right-3 w-16 h-6 bg-slate-300/80 rounded-full"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="w-24 h-4 skeleton-box"></div>
            <div className="w-20 h-4 skeleton-box"></div>
          </div>
          <div className="w-4/5 h-6 skeleton-box"></div>
          <div className="w-1/2 h-4 skeleton-box"></div>
          <div className="space-y-2 pt-1">
            <div className="w-full h-3 skeleton-box"></div>
            <div className="w-3/4 h-3 skeleton-box"></div>
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full skeleton-box !rounded-full"></div>
            <div className="space-y-1">
              <div className="w-20 h-3 skeleton-box"></div>
              <div className="w-14 h-2.5 skeleton-box"></div>
            </div>
          </div>
          <div className="w-20 h-8 skeleton-box !rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 5 }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex space-x-4">
        {[...Array(cols)].map((_, i) => (
          <div key={i} className="h-4 skeleton-box flex-1"></div>
        ))}
      </div>
      <div className="divide-y divide-slate-100">
        {[...Array(rows)].map((_, r) => (
          <div key={r} className="p-4 flex items-center space-x-4">
            <div className="w-8 h-8 skeleton-box !rounded-full shrink-0"></div>
            {[...Array(cols - 1)].map((_, c) => (
              <div key={c} className="h-4 skeleton-box flex-1"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="w-24 h-4 skeleton-box"></div>
        <div className="w-10 h-10 skeleton-box !rounded-xl"></div>
      </div>
      <div className="w-32 h-8 skeleton-box"></div>
      <div className="w-20 h-3 skeleton-box"></div>
    </div>
  );
}

export function TuitionDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="h-80 skeleton-box !rounded-3xl w-full"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="w-3/4 h-10 skeleton-box !rounded-xl"></div>
          <div className="w-full h-32 skeleton-box !rounded-2xl"></div>
        </div>
        <div className="space-y-6">
          <div className="w-full h-64 skeleton-box !rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
}
