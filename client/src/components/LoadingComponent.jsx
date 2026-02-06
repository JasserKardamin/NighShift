export const LoadingComponent = ({
  minHeight = "100vh",
  maxHeight = "none",
}) => {
  return (
    <div
      className="relative bg-black text-white flex items-center justify-center overflow-hidden"
      style={{ minHeight, maxHeight }}
    >
      {/* Decorative purple gradient blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-10" />

      <div className="relative z-10 text-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-slate-700 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
      </div>
    </div>
  );
};
