export const LoadingComponent = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      {/* Decorative purple gradient blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-10"></div>

      <div className="relative z-10 text-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-slate-700 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
      </div>
    </div>
  );
};
