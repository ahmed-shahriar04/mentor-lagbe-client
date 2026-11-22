export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20"></div>
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-600 animate-pulse">
        Loading MentorLagbe experience...
      </p>
    </div>
  );
}
