import { TuitionCardSkeleton } from '@/components/SkeletonLoader';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Header Skeleton */}
      <div className="space-y-3 max-w-xl animate-pulse">
        <div className="w-24 h-4 bg-emerald-100 rounded-full"></div>
        <div className="w-64 h-8 bg-slate-200 rounded-xl"></div>
        <div className="w-full h-4 bg-slate-100 rounded"></div>
      </div>

      {/* Grid of Skeleton Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <TuitionCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
