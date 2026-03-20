import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import useAxios from "../Hooks/useAxios";

const AuthProvider = ({ children }) => {
  const axios = useAxios();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(loading)
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
        setLoading(true);
      });
  }, [axios]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;