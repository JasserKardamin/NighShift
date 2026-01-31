import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }
      console.log(data.token);

      localStorage.setItem("token", data.token);
      // redirect or update app state
    } catch (error) {
      console.log(error);
      setError("Server error");
    }
    return;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      {/* Decorative purple gradient blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-20"></div>

      <div className="w-full max-w-md px-6 relative z-10">
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-800">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">
              Sign in to continue your coding journey
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                type="email"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p>{error}</p>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 rounded bg-slate-800 border-slate-700"
                />
                Remember me
              </label>
              <a
                href="#"
                className="text-indigo-400 hover:text-indigo-300 transition"
              >
                Forgot password?
              </a>
            </div>

            <button
              onClick={handleLogin}
              className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold rounded-lg active:scale-95 transform shadow-lg"
            >
              Sign In
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <a
              onClick={() => navigate("/register")}
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
