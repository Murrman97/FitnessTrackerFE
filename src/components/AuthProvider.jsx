import AuthContext from "../AuthContext";
import { useState, useEffect } from "react";
import { postLoginUser } from "../api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function getUser(username, password) {
      if (localStorage.getItem("token")) {
        // Pretend this is from a fetchUser()
        const user = await postLoginUser(username, password);
        setToken(localStorage.getItem("token"));
        setLoggedIn(true);
        setUser(user);
      } else {
        setUser({});
      }
    }
    getUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, loggedIn, setLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
