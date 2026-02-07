import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userAuthLoading, setUserAuthLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/user/auth", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setUserAuthLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, userAuthLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier access in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
