import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import useAxios from "../Hooks/useAxios";

const AuthProvider = ({ children }) => {
  const axios = useAxios();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ start true

  useEffect(() => {
    axios
      .get("/profile", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false); // ✅ end false
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;