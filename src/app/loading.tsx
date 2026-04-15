// app/loading.tsx
export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse">
      {/* Skeleton for Hero */}
      <div className="w-full h-[500px] bg-gray-200" />

      {/* Skeleton for Vendors Section */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="h-8 w-48 bg-gray-300 mb-6 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Skeleton for other sections */}
      <div className="w-full h-96 bg-gray-100 mt-10" />
    </main>
  );
}