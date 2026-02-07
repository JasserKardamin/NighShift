export const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      {/* Decorative purple gradient blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-10"></div>

      <div className="relative z-10 text-center max-w-md px-6">
        {/* 404 Text */}
        <h1 className="text-9xl font-bold text-indigo-600 mb-4">404</h1>

        {/* Error Message */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
          <p className="text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
      </div>
    </div>
  );
};
