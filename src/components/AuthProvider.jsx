import AuthContext from "../AuthContext";
import { useState, useEffect } from "react";
import { postLoginUser, getUserProfile } from "../api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function getUser() {
      if (localStorage.getItem("token")) {
        // Pretend this is from a fetchUser()
        const user = await getUserProfile(token);
        console.log("AUTH", user)
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
