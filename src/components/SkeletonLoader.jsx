export function TuitionCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm animate-pulse flex flex-col h-full">
      {/* Banner Skeleton */}
      <div className="h-48 bg-slate-200 w-full relative">
        <div className="absolute top-3 left-3 w-20 h-6 bg-slate-300 rounded-full"></div>
        <div className="absolute top-3 right-3 w-16 h-6 bg-slate-300 rounded-full"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="w-24 h-4 bg-slate-200 rounded"></div>
            <div className="w-20 h-4 bg-slate-200 rounded"></div>
          </div>
          <div className="w-4/5 h-6 bg-slate-200 rounded-lg"></div>
          <div className="w-1/2 h-4 bg-slate-100 rounded"></div>
          <div className="space-y-1.5 pt-1">
            <div className="w-full h-3 bg-slate-100 rounded"></div>
            <div className="w-3/4 h-3 bg-slate-100 rounded"></div>
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-200"></div>
            <div className="space-y-1">
              <div className="w-20 h-3 bg-slate-200 rounded"></div>
              <div className="w-14 h-2.5 bg-slate-100 rounded"></div>
            </div>
          </div>
          <div className="w-20 h-8 bg-slate-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 5 }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm animate-pulse">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex space-x-4">
        {[...Array(cols)].map((_, i) => (
          <div key={i} className="h-4 bg-slate-200 rounded flex-1"></div>
        ))}
      </div>
      <div className="divide-y divide-slate-100">
        {[...Array(rows)].map((_, r) => (
          <div key={r} className="p-4 flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0"></div>
            {[...Array(cols - 1)].map((_, c) => (
              <div key={c} className="h-4 bg-slate-100 rounded flex-1"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm animate-pulse space-y-3">
      <div className="flex items-center justify-between">
        <div className="w-24 h-4 bg-slate-200 rounded"></div>
        <div className="w-10 h-10 bg-slate-200 rounded-xl"></div>
      </div>
      <div className="w-32 h-8 bg-slate-300 rounded-lg"></div>
      <div className="w-20 h-3 bg-slate-100 rounded"></div>
    </div>
  );
}

export function TuitionDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse space-y-8">
      <div className="h-80 bg-slate-200 rounded-3xl w-full"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="w-3/4 h-10 bg-slate-200 rounded-xl"></div>
          <div className="w-full h-32 bg-slate-100 rounded-2xl"></div>
        </div>
        <div className="space-y-6">
          <div className="w-full h-64 bg-slate-200 rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
}
