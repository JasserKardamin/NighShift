export const LoadingComponent = () => {
  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center">
        {/* Spinner */}
        <div className="w-16 h-16 bg-transparent border-4 border-slate-700 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
      </div>
    </div>
  );
};
