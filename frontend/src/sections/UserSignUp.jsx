import { Link } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserSignUp = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState([]);

  const handleSignUp = async () => {
    if (passwords.password !== passwords.confirmPassword) {
      setError("Passwords must match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password: passwords.password,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        //console.log(data.errors[0].msg);
        setErrors(data.errors);
        return;
      }

      setErrors([]);
      console.log("User Created!", data);
    } catch (error) {
      // network errors only
      //console.error(error);
      setErrors(["Network error!"]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      {/* Decorative purple gradient blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-20"></div>

      <div className="w-full max-w-md px-6 relative z-10">
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-800">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2 ">Get Started</h2>
            <p className="text-gray-400">
              Create your account and start coding
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                type="text"
                placeholder="John Doe"
                onChange={(e) => setUserName(e.target.value)}
              />

              {errors
                .filter((error) => error.path == "username")
                .map((error) => (
                  <p className="text-red-500 text-sm mt-1" key={error.msg}>
                    *{error.msg}
                  </p>
                ))}
            </div>

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
              {errors
                .filter((error) => error.path == "email")
                .map((error) => (
                  <p className="text-red-500 text-sm mt-1" key={error.msg}>
                    *{error.msg}
                  </p>
                ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                type="password"
                placeholder="••••••••"
                onChange={(e) =>
                  setPasswords({ ...passwords, password: e.target.value })
                }
              />

              {errors
                .filter((error) => error.path == "password")
                .map((error) => (
                  <p className="text-red-500 text-sm mt-1" key={error.msg}>
                    *{error.msg}
                  </p>
                ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                type="password"
                placeholder="••••••••"
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex items-start text-sm">
              <input
                type="checkbox"
                className="mr-2 mt-1 rounded bg-slate-800 border-slate-700"
              />
              <label className="text-gray-400 cursor-pointer">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-indigo-400 hover:text-indigo-300 transition"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-indigo-400 hover:text-indigo-300 transition"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              onClick={handleSignUp}
              className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold rounded-lg active:scale-95 transform shadow-lg"
            >
              Create Account
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a
              to="/login"
              onClick={() => {
                navigate("/login");
              }}
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition cursor-pointer "
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
