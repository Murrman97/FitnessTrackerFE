import AuthContext from "../AuthContext";
import { useState, useEffect } from "react";
import { postLoginUser, getUserProfile, getUserRoutines } from "../api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRoutines, setUserRoutines] = useState([]);console.log(userRoutines);

  useEffect(() => {
    async function getUser() {
      if (localStorage.getItem("token")) {
        // Pretend this is from a fetchUser()
        const user = await getUserProfile(token);
        console.log("AUTH", user);
        setToken(localStorage.getItem("token"));
        setLoggedIn(true);
        setUser(user);

        if (localStorage.getItem("token")) {
          const getMyRoutines = async () => {
            const userRoutine = await getUserRoutines(user.username, token);
            setUserRoutines(userRoutine);
            console.log(userRoutines);
          };
          getMyRoutines();
        }
      } else {
        setUser({});
      }
    }
    getUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        loggedIn,
        setLoggedIn,
        userRoutines,
        setUserRoutines,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
